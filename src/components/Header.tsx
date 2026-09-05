import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Search, ShoppingBag, ArrowRight, Phone } from 'lucide-react';
import { useQuote } from '../context/QuoteContext';

interface HeaderProps {
  onOpenMobileMenu: () => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMobileMenu, onOpenSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { totalItemsCount } = useQuote();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-200 shadow-sm">
      {/* Single Ultra-Slim Sky Blue Navigation Bar (Height: ~48-52px) */}
      <div 
        className={`bg-[#0284C7] text-white transition-all duration-200 border-b border-sky-500/50 ${
          isScrolled ? 'py-1.5 sm:py-2 shadow-md bg-[#0369A1]/95 backdrop-blur-md' : 'py-2 sm:py-2.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2">
            
            {/* Left: Mobile Menu & Logo */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={onOpenMobileMenu}
                type="button"
                className="lg:hidden p-1.5 -ml-1 text-white hover:bg-sky-700/60 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Open navigation menu"
              >
                <Menu className="w-5 h-5" />
              </button>

              <Link to="/" className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-lg">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white text-[#0284C7] flex items-center justify-center font-black text-xs sm:text-sm tracking-tight shadow-sm transition-transform duration-200 group-hover:scale-105">
                  AB
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-sm sm:text-base font-extrabold tracking-tight text-white leading-none">
                    AB TRADERS
                  </span>
                  <span className="hidden xs:inline-block text-[9px] font-bold text-sky-100 uppercase tracking-wider">
                    Wholesale
                  </span>
                </div>
              </Link>
            </div>

            {/* Center: Desktop Navigation Links (Slim) */}
            <nav className="hidden lg:flex items-center space-x-1 font-semibold text-xs text-sky-100">
              <Link
                to="/"
                className={`px-3 py-1 rounded-md transition-colors ${
                  location.pathname === '/' 
                    ? 'bg-sky-800 text-white font-bold shadow-xs' 
                    : 'hover:bg-sky-700/60 hover:text-white'
                }`}
              >
                Home
              </Link>
              <Link
                to="/shop"
                className={`px-3 py-1 rounded-md transition-colors ${
                  location.pathname.startsWith('/shop') 
                    ? 'bg-sky-800 text-white font-bold shadow-xs' 
                    : 'hover:bg-sky-700/60 hover:text-white'
                }`}
              >
                Catalog
              </Link>
              <Link
                to="/custom-branding"
                className={`px-3 py-1 rounded-md transition-colors ${
                  location.pathname === '/custom-branding' 
                    ? 'bg-sky-800 text-white font-bold shadow-xs' 
                    : 'hover:bg-sky-700/60 hover:text-white'
                }`}
              >
                Custom Branding
              </Link>
              <Link
                to="/industries"
                className={`px-3 py-1 rounded-md transition-colors ${
                  location.pathname === '/industries' 
                    ? 'bg-sky-800 text-white font-bold shadow-xs' 
                    : 'hover:bg-sky-700/60 hover:text-white'
                }`}
              >
                Industries
              </Link>
              <Link
                to="/about"
                className={`px-3 py-1 rounded-md transition-colors ${
                  location.pathname === '/about' 
                    ? 'bg-sky-800 text-white font-bold shadow-xs' 
                    : 'hover:bg-sky-700/60 hover:text-white'
                }`}
              >
                About
              </Link>
              <Link
                to="/contact"
                className={`px-3 py-1 rounded-md transition-colors ${
                  location.pathname === '/contact' 
                    ? 'bg-sky-800 text-white font-bold shadow-xs' 
                    : 'hover:bg-sky-700/60 hover:text-white'
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* Right: Quick Actions (Phone, Search, Quote Bag) */}
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              {/* Direct Quick Call Button (High-conversion on mobile) */}
              <a
                href="tel:03278822358"
                className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-950 bg-sky-100 hover:bg-white px-2.5 py-1 rounded-md transition-colors shadow-2xs"
                title="Call Ramiz Qaiser"
              >
                <Phone className="w-3 h-3 text-[#0284C7]" />
                <span className="hidden sm:inline">0327-8822358</span>
                <span className="sm:hidden">Call</span>
              </a>

              {/* Search Trigger */}
              <button
                onClick={onOpenSearch}
                type="button"
                className="p-1.5 text-sky-100 hover:text-white hover:bg-sky-700/60 rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Search packaging products"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Quote Basket Trigger with badge */}
              <Link
                to="/quote"
                className="p-1.5 text-sky-100 hover:text-white hover:bg-sky-700/60 rounded-md transition-colors relative focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label={`View quote basket with ${totalItemsCount} items`}
              >
                <ShoppingBag className="w-4 h-4" />
                {totalItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[17px] h-[17px] bg-amber-400 text-slate-950 text-[10px] font-black rounded-full flex items-center justify-center px-0.5 shadow-sm">
                    {totalItemsCount}
                  </span>
                )}
              </Link>

              {/* Desktop Fast Quote CTA */}
              <Link
                to="/quote"
                className="hidden md:inline-flex items-center gap-1 bg-white hover:bg-sky-50 text-[#0284C7] font-bold text-xs px-3 py-1 rounded-md tracking-wide transition-all shadow-2xs"
              >
                <span>Quote</span>
                <ArrowRight className="w-3 h-3 text-[#0284C7]" />
              </Link>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
};
