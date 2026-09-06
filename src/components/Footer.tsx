import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../data/products';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0F172A] text-slate-300 border-t border-slate-800 pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          {/* Brand & Summary */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="/images/logo-light.png"
                alt="AB TRADERS Logo"
                className="h-11 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold tracking-tight text-ivory">
                  AB TRADERS
                </span>
                <span className="text-[9px] tracking-luxury uppercase text-gold font-medium">
                  Packaging Solutions
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-[#A8A29E] leading-relaxed max-w-sm">
              Cosmetic & PET bottle manufacturer and wholesale packaging supplier in Lahore, Pakistan. Managed by <span className="text-ivory font-medium">Ramiz Qaiser</span>.
            </p>

            <div className="pt-2 text-xs text-[#A8A29E] space-y-1.5">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span>Shop # 2604/D, Papar Mandi Naya Bazar, Near Niween Masjid, Shah Alam Market, Lahore</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gold shrink-0" />
                <span>Mon – Sat: 9:00 AM – 7:00 PM PKT</span>
              </p>
            </div>
          </div>

          {/* Product Categories */}
          <div>
            <h4 className="text-xs uppercase tracking-luxury text-ivory font-semibold mb-4">
              Categories
            </h4>
            <ul className="space-y-2 text-xs">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/shop?category=${cat.id}`}
                    className="text-[#A8A29E] hover:text-gold transition-colors block py-0.5"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/shop"
                  className="text-gold hover:text-gold-light font-medium inline-flex items-center gap-1 pt-1"
                >
                  <span>All Categories</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs uppercase tracking-luxury text-ivory font-semibold mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-[#A8A29E]">
              <li>
                <Link to="/shop" className="hover:text-gold transition-colors block py-0.5">
                  Packaging Shop
                </Link>
              </li>
              <li>
                <Link to="/custom-branding" className="hover:text-gold transition-colors block py-0.5">
                  Custom Branding
                </Link>
              </li>
              <li>
                <Link to="/industries" className="hover:text-gold transition-colors block py-0.5">
                  Industries We Serve
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gold transition-colors block py-0.5">
                  About AB TRADERS
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold transition-colors block py-0.5">
                  Contact & Location
                </Link>
              </li>
              <li>
                <Link to="/quote" className="hover:text-gold transition-colors block py-0.5">
                  Wholesale Quote Basket
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Wholesale Contact */}
          <div>
            <h4 className="text-xs uppercase tracking-luxury text-ivory font-semibold mb-4">
              Contact & Enquiries
            </h4>
            <div className="space-y-2.5 text-xs">
              <div>
                <p className="text-[#78716C] text-[10px] uppercase tracking-wider">Contact Person</p>
                <p className="text-ivory font-medium">Ramiz Qaiser</p>
              </div>

              <div>
                <p className="text-[#78716C] text-[10px] uppercase tracking-wider">Mobile & WhatsApp</p>
                <a
                  href="https://wa.me/923278822358?text=Hello%20Ramiz%20Qaiser,%20I%20am%20enquiring%20about%20AB%20TRADERS%20bottles"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 font-medium hover:text-emerald-300 transition-colors block mt-0.5"
                >
                  0327-8822358
                </a>
              </div>

              <div>
                <p className="text-[#78716C] text-[10px] uppercase tracking-wider">Secondary Mobile</p>
                <a
                  href="https://wa.me/923225080132"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ivory font-medium hover:text-gold transition-colors block mt-0.5"
                >
                  0322-5080132
                </a>
              </div>

              <div>
                <p className="text-[#78716C] text-[10px] uppercase tracking-wider">Landline (PTCL)</p>
                <a
                  href="tel:04237364617"
                  className="text-ivory font-medium hover:text-gold transition-colors block mt-0.5"
                >
                  042-37364617
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#78716C]">
          <p>© {new Date().getFullYear()} AB TRADERS. All rights reserved. Wholesale Packaging Supplier, Pakistan.</p>

          <div className="flex items-center space-x-6">
            <Link to="/privacy" className="hover:text-[#A8A29E] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-[#A8A29E] transition-colors">
              Terms & Conditions
            </Link>
            <Link to="/contact" className="hover:text-[#A8A29E] transition-colors">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
