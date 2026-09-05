import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// In-memory rate limiter: maximum 30 requests per minute per IP
const requestCounts = new Map<string, { count: number; resetAt: number }>();
const rateLimitMiddleware = (req: Request, res: Response, next: () => void) => {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const entry = requestCounts.get(ip);

  if (!entry || now > entry.resetAt) {
    requestCounts.set(ip, { count: 1, resetAt: now + 60000 });
    return next();
  }

  if (entry.count >= 30) {
    return res.status(429).json({
      success: false,
      message: 'Too many requests. Please wait a moment before submitting again.',
    });
  }

  entry.count++;
  next();
};

app.use(rateLimitMiddleware);

// Validation schema for incoming quote enquiries
const quoteItemSchema = z.object({
  productId: z.string(),
  productName: z.string(),
  categoryName: z.string(),
  material: z.string(),
  capacity: z.string(),
  quantity: z.number().int().positive(),
  customBranding: z.boolean().default(false),
  notes: z.string().optional(),
});

const quoteEnquirySchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  companyName: z.string().optional(),
  phone: z.string().min(10, 'Valid contact number is required'),
  email: z.string().email('Valid business email is required'),
  city: z.string().min(2, 'City is required'),
  brandingRequirements: z.string(),
  additionalNotes: z.string().optional(),
  preferredContact: z.string().default('whatsapp'),
  items: z.array(quoteItemSchema).min(1, 'At least one packaging item is required'),
});

// Helper: Generate professional reference code like "ABT-2026-7842"
function generateReferenceNumber(): string {
  const year = new Date().getFullYear();
  const randomPart = Math.floor(1000 + Math.random() * 9000);
  return `ABT-${year}-${randomPart}`;
}

// Health check endpoint
app.get('/api/health', async (_req: Request, res: Response) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({
      status: 'healthy',
      database: 'connected',
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'unhealthy',
      database: 'disconnected',
      error: error.message,
    });
  }
});

// Submit quote enquiry
app.post('/api/quotes', async (req: Request, res: Response) => {
  try {
    const parsed = quoteEnquirySchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: 'Invalid submission data',
        errors: parsed.error.format(),
      });
    }

    const data = parsed.data;
    const referenceNumber = generateReferenceNumber();

    const enquiry = await prisma.quoteEnquiry.create({
      data: {
        referenceNumber,
        fullName: data.fullName,
        companyName: data.companyName || null,
        phone: data.phone,
        email: data.email,
        city: data.city,
        brandingRequirements: data.brandingRequirements,
        additionalNotes: data.additionalNotes || null,
        preferredContact: data.preferredContact,
        totalItemCount: data.items.reduce((sum, item) => sum + item.quantity, 0),
        items: {
          create: data.items.map((item) => ({
            productId: item.productId,
            productName: item.productName,
            categoryName: item.categoryName,
            material: item.material,
            capacity: item.capacity,
            quantity: item.quantity,
            customBranding: item.customBranding,
            notes: item.notes || null,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    console.log(`[AB TRADERS] New Quote Enquiry Stored: ${enquiry.referenceNumber} (${enquiry.fullName} - ${enquiry.city})`);

    res.status(201).json({
      success: true,
      referenceNumber: enquiry.referenceNumber,
      message: 'Quotation enquiry successfully saved to database',
      createdAt: enquiry.createdAt,
    });
  } catch (error: any) {
    console.error('[AB TRADERS API Error] Failed to save quote enquiry:', error);
    res.status(500).json({
      success: false,
      message: 'Database storage error. Please check server logs and configuration.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// Check status by reference (does NOT expose sensitive customer details publicly)
app.get('/api/quotes/:reference', async (req: Request, res: Response) => {
  try {
    const { reference } = req.params;
    const enquiry = await prisma.quoteEnquiry.findUnique({
      where: { referenceNumber: reference },
      select: {
        referenceNumber: true,
        status: true,
        city: true,
        totalItemCount: true,
        createdAt: true,
        items: {
          select: {
            productName: true,
            capacity: true,
            quantity: true,
            customBranding: true,
          },
        },
      },
    });

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Quotation reference not found',
      });
    }

    res.json({
      success: true,
      enquiry,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve enquiry status',
    });
  }
});

// General contact messages
app.post('/api/contact', async (req: Request, res: Response) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required',
      });
    }

    const contact = await prisma.contactMessage.create({
      data: {
        name,
        email,
        phone: phone || null,
        subject: subject || 'General Enquiry',
        message,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Contact enquiry recorded successfully',
      id: contact.id,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to save contact message',
    });
  }
});

app.listen(port, () => {
  console.log(`[AB TRADERS Server] Running on http://localhost:${port}`);
});
