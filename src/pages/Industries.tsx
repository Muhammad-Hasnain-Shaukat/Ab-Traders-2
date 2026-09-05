import React from 'react';
import { Link } from 'react-router-dom';
import { Factory, ArrowRight, ShieldCheck } from 'lucide-react';
import { INDUSTRIES, PRODUCTS } from '../data/products';

export const Industries: React.FC = () => {
  return (
    <div className="pt-24 pb-16 sm:pt-28 sm:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-beige/80 border border-gold/40 text-[11px] uppercase tracking-luxury text-gold-dark font-medium mb-3">
          <Factory className="w-3.5 h-3.5 text-gold" />
          <span>Sector Solutions</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl text-charcoal font-normal tracking-tight">
          Industries We Serve
        </h1>
        <p className="text-sm sm:text-base text-charcoal-600 mt-3 leading-relaxed">
          Packaging containers matched to filling machinery, barrier specifications, and shelf display requirements across Pakistani businesses.
        </p>
      </div>

      {/* Sourcing Guidance Alert */}
      <div className="mb-12 bg-ivory border border-beige rounded-xl p-4 sm:p-5 flex items-start gap-3.5 max-w-3xl mx-auto">
        <ShieldCheck className="w-5 h-5 text-gold shrink-0 mt-0.5" />
        <div className="text-xs text-charcoal-700 space-y-1">
          <p className="font-semibold text-charcoal">Compatibility & Verification Notice</p>
          <p className="leading-relaxed">
            Different formulations have unique chemical viscosity, acidity, and barrier requirements. While our containers are manufactured from standard virgin resin and quality glass, we strongly advise requesting product samples to conduct specific leak, torque, and shelf-life testing prior to commercial filling.
          </p>
        </div>
      </div>

      {/* Industries Breakdown */}
      <div className="space-y-12">
        {INDUSTRIES.map((industry, index) => {
          const matchingProducts = PRODUCTS.filter((p) => p.industry.includes(industry.id));

          return (
            <div
              key={industry.id}
              className="bg-white border border-beige rounded-2xl overflow-hidden shadow-2xs grid grid-cols-1 lg:grid-cols-12 items-center"
            >
              {/* Photo */}
              <div
                className={`lg:col-span-5 h-64 lg:h-full min-h-[280px] bg-beige/30 relative overflow-hidden ${
                  index % 2 === 1 ? 'lg:order-last' : ''
                }`}
              >
                <img
                  src={industry.image}
                  alt={industry.name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Information */}
              <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 space-y-4">
                <span className="text-[11px] uppercase tracking-luxury text-gold-dark font-semibold">
                  Sector {index + 1}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-charcoal font-normal">
                  {industry.name}
                </h2>
                <p className="text-xs sm:text-sm font-medium text-gold-dark">
                  {industry.tagline}
                </p>
                <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                  {industry.desc}
                </p>

                {/* Example packaging formats */}
                <div className="pt-2">
                  <p className="text-xs font-semibold text-charcoal mb-2">Recommended Packaging:</p>
                  <div className="flex flex-wrap gap-2">
                    {matchingProducts.map((p) => (
                      <Link
                        key={p.id}
                        to={`/product/${p.slug}`}
                        className="text-xs bg-ivory hover:bg-beige/60 border border-beige px-3 py-1.5 rounded text-charcoal transition-colors truncate max-w-xs"
                      >
                        {p.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <Link
                    to={`/shop?industry=${industry.id}`}
                    className="inline-flex items-center gap-2 bg-charcoal hover:bg-charcoal-800 text-ivory text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-md transition-colors"
                  >
                    <span>View All {industry.name} Packaging</span>
                    <ArrowRight className="w-4 h-4 text-gold" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
