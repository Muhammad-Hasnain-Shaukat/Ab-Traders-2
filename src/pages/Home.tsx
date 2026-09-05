import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { HeroSlider } from '../components/HeroSlider';
import { CategoryCard } from '../components/CategoryCard';
import { BenefitsStrip } from '../components/BenefitsStrip';
import { ProductCard } from '../components/ProductCard';
import { IndustryCard } from '../components/IndustryCard';
import { CustomBrandingSection } from '../components/CustomBrandingSection';
import { QuotationProcess } from '../components/QuotationProcess';
import { AboutSection } from '../components/AboutSection';
import { ClosingCTA } from '../components/ClosingCTA';
import { CATEGORIES, PRODUCTS, INDUSTRIES } from '../data/products';

export const Home: React.FC = () => {
  const featuredProducts = PRODUCTS.slice(0, 8);

  return (
    <div className="space-y-0">
      {/* 1. Hero Image Slider */}
      <HeroSlider />

      {/* 2. Explore Categories (7 accurate categories) */}
      <section className="py-12 sm:py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <p className="text-[11px] uppercase tracking-luxury text-gold-dark font-medium mb-1.5">
            Shop by Category
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-charcoal font-normal tracking-tight">
            All Types of Bottles, One Place
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-600 mt-2">
            Find the right packaging and closures for your formulation and brand.
          </p>
        </div>

        {/* 6 Columns on wide screens, 3 on tablet, 2 on mobile phones */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {CATEGORIES.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>

        {/* View All Categories Button */}
        <div className="mt-8 sm:mt-10 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-transparent hover:bg-beige/50 text-charcoal border border-beige-dark text-xs sm:text-sm font-semibold px-6 py-3 rounded-md transition-all hover:border-gold/60"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4 text-gold" />
          </Link>
        </div>
      </section>

      {/* 3. Service Benefits Strip */}
      <BenefitsStrip />

      {/* 4. Selected Products Showcase */}
      <section className="py-12 sm:py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-beige/80 border border-gold/40 text-[11px] uppercase tracking-luxury text-gold-dark font-medium mb-2">
              <Sparkles className="w-3 h-3 text-gold" />
              <span>Selected Packaging</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-charcoal font-normal tracking-tight">
              Featured Packaging Stock
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-600 mt-1">
              Popular bottles and jars ready for bulk wholesale orders and custom branding.
            </p>
          </div>

          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-charcoal hover:text-gold transition-colors shrink-0"
          >
            <span>Browse Full Catalogue</span>
            <ArrowRight className="w-4 h-4 text-gold" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. Industries We Serve */}
      <section className="py-12 sm:py-16 bg-sky-50/40 border-y border-sky-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-end mb-8 sm:mb-12">
            <div className="lg:col-span-8">
              <p className="text-[11px] uppercase tracking-wider text-[#0284C7] font-extrabold mb-1.5">
                Packaging for Every Industry
              </p>
              <h2 className="font-sans text-2xl sm:text-3xl lg:text-4xl text-slate-900 font-extrabold tracking-tight">
                Trusted by Businesses Across Pakistan
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-xl">
                We supply packaging solutions tailored to industry-specific handling, filling lines, and barrier requirements across the country.
              </p>
            </div>

            <div className="lg:col-span-4 lg:text-right">
              <Link
                to="/industries"
                className="inline-flex items-center gap-2 bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs sm:text-sm font-bold px-5 py-3 rounded-xl transition-all shadow-sm active:scale-[0.98]"
              >
                <span>Explore Industries</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </Link>
            </div>
          </div>

          {/* 5 Industry Cards with V-Curve Frames */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
            {INDUSTRIES.map((industry) => (
              <IndustryCard key={industry.id} industry={industry} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Custom Branding Feature */}
      <CustomBrandingSection />

      {/* 7. Quotation Process */}
      <QuotationProcess />

      {/* 8. About AB TRADERS */}
      <AboutSection />

      {/* 9. Closing CTA Band */}
      <ClosingCTA />
    </div>
  );
};
