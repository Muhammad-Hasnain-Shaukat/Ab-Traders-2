export type CategoryId = 
  | 'plastic-bottles'
  | 'glass-bottles'
  | 'cosmetic-packaging'
  | 'spray-pump'
  | 'spray-pump-bottles'
  | 'jars-containers'
  | 'caps-closures'
  | 'jerry-cans';

export type IndustryId = 
  | 'cosmetics'
  | 'pharmaceuticals'
  | 'food-beverages'
  | 'personal-care'
  | 'chemical-industrial';

export type MaterialType = 
  | 'PET'
  | 'HDPE'
  | 'Glass'
  | 'Amber Glass'
  | 'Frosted Glass'
  | 'PP'
  | 'Acrylic'
  | 'Aluminium';

export interface ProductVariant {
  capacity: string;
  sku: string;
  moq: number;
  dimensions?: string;
  neckFinish?: string;
  image?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CategoryId;
  categoryName: string;
  industry: IndustryId[];
  material: MaterialType;
  description: string;
  features: string[];
  specs: {
    material: string;
    neckFinish: string;
    colour: string[];
    closureOptions: string[];
    dimensions?: string;
    weight?: string;
  };
  capacities: string[];
  variants: ProductVariant[];
  moq: number;
  featured?: boolean;
  images: string[];
}

export interface QuoteItem {
  productId: string;
  productName: string;
  productSlug: string;
  categoryName: string;
  material: string;
  image: string;
  capacity: string;
  quantity: number;
  moq: number;
  customBranding: boolean;
  notes?: string;
}

export interface QuoteEnquiryInput {
  fullName: string;
  companyName?: string;
  phone: string;
  email: string;
  city: string;
  brandingRequirements: 'none' | 'screen_printing' | 'labelling' | 'custom_mould' | 'full_custom';
  additionalNotes?: string;
  preferredContact: 'whatsapp' | 'phone' | 'email';
  items: QuoteItem[];
}

export interface QuoteEnquiryResponse {
  success: boolean;
  referenceNumber: string;
  message: string;
  createdAt: string;
}
