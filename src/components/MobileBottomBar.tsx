import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Phone, MessageSquare, Home, Grid } from 'lucide-react';
import { useQuote } from '../context/QuoteContext';

export const MobileBottomBar: React.FC = () => {
  const location = useLocation();
  const { totalItemsCount } = useQuote();

  const isHome = location.pathname === '/';
  const isShop = location.pathname.startsWith('/shop');
  const isQuote = location.pathname === '/quote';

  return (
    <nav 
      aria-label="Mobile Bottom Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-sky-100 shadow-[0_-4px_20px_rgba(14,165,233,0.08)] px-2 py-1.5 safe-bottom"
    >
      <div className="flex items-center justify-around">
        {/* Home */}
        <Link
          to="/"
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg text-[10px] font-medium transition-colors ${
            isHome ? 'text-sky-600 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span>Home</span>
        </Link>

        {/* Catalog */}
        <Link
          to="/shop"
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg text-[10px] font-medium transition-colors ${
            isShop ? 'text-sky-600 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Grid className="w-5 h-5 mb-0.5" />
          <span>Catalog</span>
        </Link>

        {/* Call Direct */}
        <a
          href="tel:03278822358"
          className="flex flex-col items-center justify-center py-1 px-3 rounded-lg text-[10px] font-medium text-slate-500 hover:text-slate-800 transition-colors"
        >
          <Phone className="w-5 h-5 mb-0.5 text-sky-600" />
          <span>Call</span>
        </a>

        {/* WhatsApp Direct */}
        <a
          href="https://wa.me/923278822358?text=Hello%20Ramiz%20Qaiser,%20I%20am%20enquiring%20about%20AB%20TRADERS%20wholesale%20bottles"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1 px-3 rounded-lg text-[10px] font-bold text-sky-600 hover:text-sky-700 transition-colors"
        >
          <MessageSquare className="w-5 h-5 mb-0.5" />
          <span>WhatsApp</span>
        </a>

        {/* Quote Bag */}
        <Link
          to="/quote"
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg text-[10px] font-medium relative transition-colors ${
            isQuote ? 'text-sky-600 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 mb-0.5" />
            {totalItemsCount > 0 && (
              <span className="absolute -top-1.5 -right-2 min-w-[16px] h-[16px] bg-sky-600 text-white text-[9px] font-black rounded-full flex items-center justify-center px-0.5 shadow-sm">
                {totalItemsCount}
              </span>
            )}
          </div>
          <span>Quote</span>
        </Link>
      </div>
    </nav>
  );
};
