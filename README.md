# AB TRADERS — Packaging Solutions Platform

A complete, premium, mobile-first bottle and packaging supplier web platform designed for **AB TRADERS**, Pakistan.

---

## 🎨 Visual Identity & Architecture

- **Palette**: Warm ivory (`#F7F4EF`), warm beige (`#E8E0D5`), taupe (`#B4A38B`), muted gold (`#AD8B59`), charcoal (`#24211C`), and deep brown (`#332A20`).
- **Typography**: Editorial serif headings (`Playfair Display`) paired with clean modern body typography (`Plus Jakarta Sans`).
- **Photography**: Realistic studio photography of glass and plastic containers on natural stone pedestals with subtle botanical leaf shadows and soft directional morning sunlight.
- **Branding**: Full replacement of placeholder branding with **AB TRADERS** on navigation, hero slides, and product labels.

---

## 🚀 Key Features

1. **Top Photographic Hero Slider**:
   - 3 curated slides with separate desktop and mobile compositions:
     - Slide 1: General Packaging (*"Packaging, refined."*) with stone pedestal arrangement and branded bottles.
     - Slide 2: Cosmetic Packaging (*"Made for your brand."*) with pumps, droppers, and jars.
     - Slide 3: Bulk Supply (*"Built for your business."*) with plastic containers and jerry cans.
   - Smooth 700ms crossfade, 6-second autoplay with pause/play toggle, touch swipe gestures, and keyboard accessible dot navigation.
2. **Explore Categories**:
   - 7 distinct categories with real photography: Plastic Bottles, Glass Bottles, Cosmetic Packaging, Spray & Pump Bottles, Jars & Containers, Caps & Closures, Jerry Cans.
3. **Service Benefits Strip**:
   - Soft beige horizontal panel detailing Quality-Focused Sourcing, Bulk Enquiries, Custom Branding, Delivery Enquiries, and Packaging Assistance.
4. **Interactive Packaging Catalogue (`/shop`)**:
   - Live search input, multi-faceted filtering (Category, Material, Industry use).
   - Active filter chips with "Clear all" reset action.
   - Sorting by Name (A–Z / Z–A) and MOQ.
   - Mobile filter drawer.
5. **Product Detail Pages (`/product/:slug`)**:
   - Multi-image gallery with thumbnail switcher.
   - Technical specifications table (material, neck finish, color, closure options, dimensions, MOQ).
   - Quantity selector with bulk discount guidance.
   - Optional "Include Custom Branding" checkbox.
   - "Add to Quote Basket" button with instant toast notification.
   - Related products carousel/grid.
6. **Wholesale Quote Basket & Enquiry System (`/quote`)**:
   - Client-side persistence using `localStorage`.
   - Form fields validated with Zod & React Hook Form.
   - Support for Pakistan phone numbers (e.g., `0300 1234567` or `+92 300 1234567`) and international formats.
   - Persistent storage in database via Express API & Prisma ORM.
   - Generation of unique reference code (e.g., `ABT-2026-7434`).
   - Direct WhatsApp quotation shortcut link pre-filled with the quote basket items.
7. **Complete Supporting Pages**:
   - `/custom-branding` — Silk-screen UV printing, hot foil stamping, custom masterbatch coloring, and label application.
   - `/industries` — Packaging for Cosmetics, Pharmaceuticals, Food & Beverages, Personal Care, and Chemical/Industrial.
   - `/about` — Authentic, restrained overview of nationwide packaging supply.
   - `/contact` — Direct verified phone, WhatsApp, email, and business hours.
   - `/privacy` & `/terms` — Commercial policies flagged for business review.
   - `/404` — Helpful not found page with search and quick links.

---

## 🛠 Tech Stack

- **Frontend**: React 19, Vite, TypeScript, Tailwind CSS v4 (`@tailwindcss/vite`), React Router v7, Lucide React, React Hook Form, Zod.
- **Backend**: Node.js, Express, Prisma ORM, CORS, Dotenv.
- **Database**: SQLite for zero-friction local persistence out-of-the-box (`dev.db`), with immediate PostgreSQL production switch via `DATABASE_URL`.

---

## 💻 Local Setup & Running Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Copy `.env.example` to `.env`:
```env
DATABASE_URL="file:./dev.db"
PORT=5000
VITE_COMPANY_PHONE="+92 300 8472910"
VITE_COMPANY_WHATSAPP="923008472910"
VITE_COMPANY_EMAIL="enquiries@abtraderspackaging.com"
VITE_COMPANY_CITY="Lahore, Pakistan"
VITE_API_URL="http://localhost:5000"
```

### 3. Initialize the Database
```bash
npx prisma db push
```

### 4. Start the Backend API Server
```bash
npm run server
```
Server runs at `http://localhost:5000`.

### 5. Start the Vite Frontend Server
In another terminal:
```bash
npm run dev
```
Open `http://localhost:5173/` in your browser.

---

## 🗄 Switching to PostgreSQL in Production

1. In `prisma/schema.prisma`, change the provider:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```
2. In your production `.env`, update the connection string:
```env
DATABASE_URL="postgresql://username:password@your-postgres-host:5432/ab_traders?schema=public"
```
3. Deploy the schema:
```bash
npx prisma db push
```
