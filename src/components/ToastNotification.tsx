import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, X } from 'lucide-react';
import { useQuote } from '../context/QuoteContext';

export const ToastNotification: React.FC = () => {
  const { lastAddedItem, resetNotification, totalItemsCount } = useQuote();

  if (!lastAddedItem) return null;

  return (
    <aside
      aria-label="Quote basket update"
      className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-charcoal text-ivory rounded-xl p-4 shadow-2xl border border-charcoal-700 animate-slide-up"
    >
      <div className="flex items-start gap-3">
        <div className="p-1.5 rounded-full bg-gold/20 text-gold shrink-0 mt-0.5">
          <CheckCircle2 className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-xs font-semibold text-ivory">Added to Quote Basket</h4>
          <p className="text-xs text-charcoal-200 truncate mt-0.5">{lastAddedItem}</p>
          <div className="mt-2.5 flex items-center gap-3">
            <Link
              to="/quote"
              onClick={resetNotification}
              className="inline-flex items-center gap-1 text-xs font-semibold text-gold hover:underline"
            >
              <span>View Basket ({totalItemsCount})</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
        <button
          onClick={resetNotification}
          className="text-charcoal-400 hover:text-ivory p-1 -mr-1 -mt-1 transition-colors"
          aria-label="Dismiss notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};
