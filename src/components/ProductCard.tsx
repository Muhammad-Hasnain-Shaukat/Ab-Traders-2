import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Eye, Layers } from 'lucide-react';
import type { Product } from '../types';
import { useQuote } from '../context/QuoteContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useQuote();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(
      {
        productId: product.id,
        productName: product.name,
        productSlug: product.slug,
        categoryName: product.categoryName,
        material: product.material,
        image: product.images[0],
        capacity: product.capacities[0] || 'Standard',
        moq: product.moq,
        customBranding: false,
      },
      product.moq
    );
  };

  return (
    <div className="group flex flex-col bg-white rounded-2xl border border-sky-100/90 shadow-sm hover:shadow-md hover:border-sky-400 transition-all duration-200 overflow-hidden">
      {/* Architectural Arched Gallery Showroom Stage (Statuesque Portrait) */}
      <Link
        to={`/product/${product.slug}`}
        className="block relative aspect-[4/5] p-2.5 sm:p-3 overflow-hidden bg-slate-50/40 border-b border-sky-100/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
      >
        {/* Arched Studio Showroom Alcove */}
        <div className="absolute inset-2 sm:inset-2.5 rounded-t-[36px] sm:rounded-t-[44px] rounded-b-2xl bg-gradient-to-b from-sky-100/70 via-white to-sky-50/40 border border-sky-100/80 shadow-[inset_0_2px_8px_rgba(2,132,199,0.07)] transition-all duration-300 group-hover:border-sky-300 group-hover:shadow-[inset_0_2px_12px_rgba(2,132,199,0.12)]" />

        {/* 3D Studio Pedestal Shadow Beneath Bottle */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-3/5 h-2.5 bg-slate-900/10 rounded-full blur-[3px] transition-all duration-300 group-hover:w-2/3 group-hover:opacity-75" />

        {/* Floating Product Bottle Presentation */}
        <div className="relative z-10 w-full h-full p-2 flex items-center justify-center">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="max-w-full max-h-full object-contain transition-all duration-300 group-hover:scale-108 group-hover:-translate-y-1.5 drop-shadow-[0_6px_10px_rgba(15,23,42,0.08)]"
          />
        </div>

        {/* Top Floating Badges */}
        <div className="absolute top-3.5 left-3.5 right-3.5 z-20 flex items-center justify-between pointer-events-none">
          {/* Material Tag */}
          <span className="bg-white/95 backdrop-blur-xs text-[#0284C7] text-[10px] font-extrabold tracking-wider uppercase px-2 py-0.5 rounded-full border border-sky-200/90 shadow-2xs">
            {product.material}
          </span>

          {/* MOQ Tag */}
          <span className="bg-slate-900/85 backdrop-blur-xs text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-2xs">
            MOQ: {product.moq.toLocaleString()}
          </span>
        </div>
      </Link>

      {/* Product Information */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category */}
          <p className="text-[10px] font-bold uppercase tracking-wider text-sky-600 mb-1 flex items-center gap-1">
            <Layers className="w-2.5 h-2.5 text-sky-500" />
            <span>{product.categoryName}</span>
          </p>

          {/* Product Title */}
          <Link
            to={`/product/${product.slug}`}
            className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#0284C7] transition-colors line-clamp-2 leading-snug focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded"
          >
            {product.name}
          </Link>

          {/* Available Sizes / Capacities */}
          <div className="mt-2.5 flex flex-wrap gap-1 items-center">
            {product.capacities.slice(0, 3).map((cap) => (
              <span
                key={cap}
                className="text-[10px] font-bold bg-sky-50 text-sky-900 border border-sky-100 px-1.5 py-0.5 rounded-md"
              >
                {cap}
              </span>
            ))}
            {product.capacities.length > 3 && (
              <span className="text-[10px] text-slate-400 font-semibold">+{product.capacities.length - 3}</span>
            )}
          </div>
        </div>

        {/* Pricing Status & Wholesale Guarantee */}
        <div className="mt-3 pt-2.5 border-t border-sky-100/70 flex items-center justify-between text-[11px]">
          <span className="font-extrabold text-[#0284C7]">Factory Rate</span>
          <span className="text-slate-500 font-medium">Bulk Ready</span>
        </div>

        {/* Mobile-Optimized Action Buttons */}
        <div className="flex flex-col sm:grid sm:grid-cols-2 gap-1.5 sm:gap-2 mt-3">
          <Link
            to={`/product/${product.slug}`}
            className="w-full inline-flex items-center justify-center gap-1.5 text-[11px] sm:text-xs font-bold text-slate-700 bg-sky-50/80 hover:bg-sky-100 hover:text-sky-950 py-2 sm:py-2.5 px-2.5 rounded-xl transition-colors text-center leading-none whitespace-nowrap border border-sky-200/80 active:scale-[0.98]"
          >
            <Eye className="w-3.5 h-3.5 text-[#0284C7] shrink-0" />
            <span>Details</span>
          </Link>

          <button
            onClick={handleQuickAdd}
            type="button"
            className="w-full inline-flex items-center justify-center gap-1.5 text-[11px] sm:text-xs font-bold text-white bg-[#0284C7] hover:bg-[#0369A1] py-2 sm:py-2.5 px-2.5 rounded-xl transition-all shadow-sm shadow-sky-500/20 active:scale-[0.97] leading-none whitespace-nowrap"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-white shrink-0" />
            <span>Add to Bag</span>
          </button>
        </div>
      </div>
    </div>
  );
};
