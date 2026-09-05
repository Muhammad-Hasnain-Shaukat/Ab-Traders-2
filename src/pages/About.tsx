import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, ArrowRight, ShieldCheck, Layers, Award } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="pt-24 pb-16 sm:pt-28 sm:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-beige/80 border border-gold/40 text-[11px] uppercase tracking-luxury text-gold-dark font-medium mb-3">
          <span>About AB TRADERS</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl text-charcoal font-normal tracking-tight">
          Packaging Partners Built on Reliability
        </h1>
        <p className="text-sm sm:text-base text-charcoal-600 mt-3 leading-relaxed">
          Sourcing, supply coordination, and custom finishes for bottles, jars, and closures across Pakistan.
        </p>
      </div>

      {/* Main Narrative */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
        <div className="lg:col-span-7 space-y-6 text-sm sm:text-base text-charcoal-700 leading-relaxed">
          <h2 className="font-serif text-2xl sm:text-3xl text-charcoal font-normal">
            Helping businesses build their product presence.
          </h2>

          <p>
            AB TRADERS operates as a specialized packaging supply partner based in Lahore, Pakistan. We supply commercial containers to emerging cosmetic brands, pharmaceutical and herbal laboratories, food processors, and chemical cleaning manufacturers nationwide.
          </p>

          <p>
            Rather than relying on generic containers with unpredictable batch variations, we work directly with certified moulders and glass blowers to secure uniform wall thickness, accurate neck-thread dimensions, and consistent closure seating.
          </p>

          <p>
            Whether an enterprise requires regular pallet dispatches of custom cosmetic PET bottles or a boutique skincare start-up needs 500 amber glass dropper bottles with custom silk-screen branding, we ensure realistic timelines, fair wholesale tier rates, and dedicated support.
          </p>

          <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-beige">
            <div className="p-4 bg-white border border-beige rounded-xl">
              <Award className="w-5 h-5 text-gold mb-2" />
              <h4 className="font-serif text-sm font-semibold text-charcoal">Quality Checked</h4>
              <p className="text-xs text-charcoal-500 mt-1">Leak & thread checked before final dispatch.</p>
            </div>

            <div className="p-4 bg-white border border-beige rounded-xl">
              <Layers className="w-5 h-5 text-gold mb-2" />
              <h4 className="font-serif text-sm font-semibold text-charcoal">Broad Range</h4>
              <p className="text-xs text-charcoal-500 mt-1">Glass, PET, HDPE, and specialized closures.</p>
            </div>

            <div className="p-4 bg-white border border-beige rounded-xl">
              <ShieldCheck className="w-5 h-5 text-gold mb-2" />
              <h4 className="font-serif text-sm font-semibold text-charcoal">Direct Logistics</h4>
              <p className="text-xs text-charcoal-500 mt-1">Safe transit packaging to any city in Pakistan.</p>
            </div>
          </div>
        </div>

        {/* Operational Overview Card */}
        <div className="lg:col-span-5 bg-white border border-beige rounded-2xl p-6 sm:p-8 shadow-soft space-y-6">
          <h3 className="font-serif text-xl font-semibold text-charcoal">
            Supply & Logistics Hub
          </h3>

          <div className="space-y-4 text-xs sm:text-sm">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-charcoal">Commercial Hub & Shop</p>
                <p className="text-charcoal-600">Shop # 2604/D, Papar Mandi Naya Bazar, Near Niween Masjid, Shah Alam Market, Lahore</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-gold shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-charcoal">Direct Contacts (Ramiz Qaiser)</p>
                <a href="tel:03278822358" className="text-charcoal-600 hover:text-gold block">
                  0327-8822358 / 0322-5080132
                </a>
                <a href="tel:04237364617" className="text-charcoal-600 hover:text-gold block">
                  PTCL: 042-37364617
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-gold shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-charcoal">Operating Hours</p>
                <p className="text-charcoal-600">Monday – Saturday: 9:00 AM – 7:00 PM PKT</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-beige">
            <Link
              to="/quote"
              className="w-full inline-flex items-center justify-center gap-2 bg-charcoal hover:bg-charcoal-800 text-ivory text-xs font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              <span>Request Wholesale Sourcing Quote</span>
              <ArrowRight className="w-4 h-4 text-gold" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
