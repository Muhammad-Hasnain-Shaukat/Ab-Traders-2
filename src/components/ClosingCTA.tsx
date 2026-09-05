import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, PhoneCall, MessageCircle } from 'lucide-react';

export const ClosingCTA: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-[#0284C7] to-[#0369A1] text-white py-14 sm:py-18 relative overflow-hidden">
      {/* Decorative ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-64 h-64 bg-sky-300/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="max-w-2xl mx-auto">
          {/* Label */}
          <p className="text-[11px] uppercase tracking-wider text-sky-100 font-extrabold mb-2.5">
            Wholesale Packaging Supply • Lahore
          </p>

          {/* Heading */}
          <h2 className="font-sans text-2xl sm:text-3xl lg:text-4xl text-white font-black tracking-tight leading-tight mb-3.5">
            Get Direct Factory Rates for Your Brand
          </h2>

          {/* Description */}
          <p className="text-xs sm:text-sm text-sky-100 font-normal leading-relaxed mb-7 max-w-lg mx-auto">
            Connect directly with Ramiz Qaiser at our Shah Alam Market wholesale showroom. Fast nationwide dispatch with custom branding services.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/quote"
              className="inline-flex items-center gap-2 bg-white hover:bg-sky-50 text-[#0284C7] text-xs sm:text-sm font-extrabold px-6 py-3 rounded-xl tracking-wide transition-all shadow-md active:scale-[0.98]"
            >
              <span>Request Wholesale Quote</span>
              <ArrowRight className="w-4 h-4 text-[#0284C7]" />
            </Link>

            <a
              href="https://wa.me/923278822358?text=Hello%20Ramiz%20Qaiser,%20I%20am%20enquiring%20about%20AB%20TRADERS%20wholesale%20packaging"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-sky-800/80 hover:bg-sky-800 text-white border border-sky-300/40 text-xs sm:text-sm font-bold px-5 py-3 rounded-xl tracking-wide transition-all shadow-sm"
            >
              <MessageCircle className="w-4 h-4 text-white" />
              <span>WhatsApp Direct</span>
            </a>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-[11px] text-sky-100">
            <a href="tel:03278822358" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <PhoneCall className="w-3.5 h-3.5 text-sky-200" />
              <span className="font-bold">0327-8822358</span>
            </a>
            <span>•</span>
            <span>Shah Alam Market, Lahore</span>
            <span>•</span>
            <span>All Pakistan Logistics</span>
          </div>
        </div>
      </div>
    </section>
  );
};
