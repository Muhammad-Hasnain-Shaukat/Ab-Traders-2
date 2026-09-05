import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export const CustomBranding: React.FC = () => {
  const brandingOptions = [
    {
      title: 'Silk-Screen UV Printing',
      desc: 'Crisp, tactile single and multi-colour direct printing on glass and plastic cylindrical bottles. Highly durable, resistant to essential oils, solvents, and water exposure.',
      points: ['Direct ink transfer on glass & PET', 'Fine typography and logo reproduction', 'Gold, silver, black, white, and bespoke pantones'],
    },
    {
      title: 'Hot Foil Stamping',
      desc: 'Elevate your cosmetic and luxury personal care packaging with reflective metallic gold, rose gold, and silver foil accents applied with heat precision.',
      points: ['Mirror-reflective metallic finish', 'Ideal for premium cosmetic jars and serum droppers', 'Compatible with matte and gloss container surfaces'],
    },
    {
      title: 'Custom Masterbatch Colouring',
      desc: 'For HDPE, PP, and PET orders at volume scale, customize container body colours to match your exact brand identity rather than standard translucent stock.',
      points: ['Custom Pantone colour matching', 'Solid, translucent, and pastel shades', 'UV stabilizer additives for formula protection'],
    },
    {
      title: 'Waterproof Label Printing & Application',
      desc: 'Durable BOPP (biaxially oriented polypropylene) self-adhesive labels with matte soft-touch, high-gloss, or metallic foil laminate finishes.',
      points: ['Full wrap-around and front/back dual labels', 'Oil-proof and water-resistant adhesive backing', 'Precision machine or manual alignment guidance'],
    },
  ];

  return (
    <div className="pt-24 pb-16 sm:pt-28 sm:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-beige/80 border border-gold/40 text-[11px] uppercase tracking-luxury text-gold-dark font-medium mb-3">
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span>Tailored Packaging Finishes</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl text-charcoal font-normal tracking-tight">
          Your Brand. Beautifully Packaged.
        </h1>
        <p className="text-sm sm:text-base text-charcoal-600 mt-3 leading-relaxed">
          Transform stock bottles and containers into signature retail packaging with our comprehensive custom decoration, printing, and closure finishing services in Pakistan.
        </p>
      </div>

      {/* Main Feature Showcase */}
      <div className="bg-white border border-beige rounded-2xl overflow-hidden shadow-soft mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 space-y-5">
            <h2 className="font-serif text-2xl sm:text-3xl text-charcoal font-normal">
              Direct Silk-Screen & Foil Stamping
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed">
              We coordinate technical printing directly with container specifications. You provide your vector artwork, and our packaging team validates bottle curvature, printable surface area, and ink compatibility.
            </p>
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-xs text-charcoal-700">
                <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                <span>Pre-production digital proofing and alignment verification</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-charcoal-700">
                <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                <span>Chemical & rub resistance testing before batch dispatch</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-charcoal-700">
                <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                <span>Flexible minimum order quantities starting from 500 units</span>
              </div>
            </div>
            <div className="pt-4">
              <Link
                to="/quote"
                className="inline-flex items-center gap-2 bg-charcoal hover:bg-charcoal-800 text-ivory text-xs sm:text-sm font-semibold px-6 py-3 rounded-md transition-colors"
              >
                <span>Request Custom Branding Quote</span>
                <ArrowRight className="w-4 h-4 text-gold" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 h-full min-h-[300px] sm:min-h-[400px] bg-beige/30 relative overflow-hidden">
            <picture className="w-full h-full block">
              <source media="(max-width: 640px)" srcSet="/images/hero/hero-slide-1-mobile.jpg" />
              <img
                src="/images/hero/hero-slide-1-desktop.jpg"
                alt="Custom printed bottles and cosmetic packaging on natural stone"
                className="w-full h-full object-cover object-[72%_center]"
              />
            </picture>
          </div>
        </div>
      </div>

      {/* Grid of Branding Capabilities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {brandingOptions.map((opt, i) => (
          <div
            key={i}
            className="bg-white border border-beige rounded-xl p-6 sm:p-8 shadow-2xs space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-semibold text-charcoal">{opt.title}</h3>
              <span className="text-xs font-mono font-bold text-gold">0{i + 1}</span>
            </div>
            <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">{opt.desc}</p>
            <ul className="space-y-1.5 pt-2 border-t border-beige/60">
              {opt.points.map((pt, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs text-charcoal-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Workflow Steps */}
      <div className="bg-ivory border border-beige rounded-2xl p-6 sm:p-10 text-center max-w-3xl mx-auto space-y-6">
        <h3 className="font-serif text-2xl font-normal text-charcoal">
          How to Initiate a Custom Branding Project
        </h3>
        <p className="text-xs sm:text-sm text-charcoal-600">
          Select your desired bottle or jar from our catalogue, select the "Include Custom Branding" option, and attach your logo requirements or contact our design desk directly on WhatsApp.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/quote"
            className="inline-flex items-center gap-2 bg-charcoal text-ivory text-xs sm:text-sm font-semibold px-6 py-3 rounded-md"
          >
            <span>Start Quotation</span>
            <ArrowRight className="w-4 h-4 text-gold" />
          </Link>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-white border border-beige text-charcoal text-xs sm:text-sm font-semibold px-6 py-3 rounded-md hover:bg-beige/40"
          >
            <span>Browse Compatible Bottles</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
