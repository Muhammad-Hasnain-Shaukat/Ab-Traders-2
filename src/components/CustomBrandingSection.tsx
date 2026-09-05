import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Palette, Stamp, CheckCircle2, ArrowRight } from 'lucide-react';

export const CustomBrandingSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white border border-beige rounded-2xl overflow-hidden shadow-soft">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          {/* Left Text Content */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-beige/80 border border-gold/40 text-[11px] uppercase tracking-luxury text-gold-dark font-medium mb-4">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>Tailored Finishes</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl text-charcoal font-normal tracking-tight leading-tight mb-4">
              Your brand. Beautifully packaged.
            </h2>

            <p className="text-sm sm:text-base text-charcoal-700 leading-relaxed mb-6 sm:mb-8 max-w-xl">
              From clean minimalist silk-screen printing to tamper-evident labelling and bespoke cap colours, we help local Pakistani brands and growing businesses transform stock containers into distinctive signature packaging.
            </p>

            {/* Feature List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-ivory border border-beige shrink-0 mt-0.5">
                  <Stamp className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-charcoal">Label Application</h4>
                  <p className="text-xs text-charcoal-600 mt-0.5">
                    Waterproof BOPP vinyl, metallic foil stickers, and full-wrap sleeve guidance.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-ivory border border-beige shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-charcoal">Printing Enquiries</h4>
                  <p className="text-xs text-charcoal-600 mt-0.5">
                    Direct UV silk-screen printing and hot-stamp gold or silver foil application.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-ivory border border-beige shrink-0 mt-0.5">
                  <Palette className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-charcoal">Colour & Closures</h4>
                  <p className="text-xs text-charcoal-600 mt-0.5">
                    Custom masterbatch resin colours, matte sprays, and metallic dispensing collars.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-ivory border border-beige shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-charcoal">Selection Assistance</h4>
                  <p className="text-xs text-charcoal-600 mt-0.5">
                    Physical samples, neck-thread verification, and formula compatibility testing.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div>
              <Link
                to="/custom-branding"
                className="inline-flex items-center gap-2 bg-charcoal hover:bg-charcoal-800 text-ivory text-xs sm:text-sm font-semibold px-6 py-3 rounded-md transition-all shadow-sm hover:shadow active:scale-[0.98]"
              >
                <span>Discuss Custom Branding</span>
                <ArrowRight className="w-4 h-4 text-gold" />
              </Link>
            </div>
          </div>

          {/* Right Image Feature */}
          <div className="lg:col-span-5 h-full min-h-[280px] sm:min-h-[380px] lg:min-h-[460px] bg-beige/40 relative overflow-hidden border-t lg:border-t-0 lg:border-l border-beige">
            <picture className="w-full h-full block">
              <source media="(max-width: 640px)" srcSet="/images/hero/hero-slide-1-mobile.jpg" />
              <img
                src="/images/hero/hero-slide-1-desktop.jpg"
                alt="AB TRADERS cosmetic and pharmaceutical custom packaging collection on stone display"
                loading="lazy"
                className="w-full h-full object-cover object-[72%_center]"
              />
            </picture>
            {/* Overlay badge */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 bg-ivory/95 backdrop-blur-sm border border-beige/90 rounded-xl p-3.5 shadow-soft">
              <p className="text-xs font-semibold text-charcoal">Wholesale Branding Support</p>
              <p className="text-[11px] text-charcoal-600 mt-0.5">
                Low MOQ starting from 500 units on selected custom printing batches.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
