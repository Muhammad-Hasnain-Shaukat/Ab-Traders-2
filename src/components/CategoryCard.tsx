import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { CategoryInfo } from '../data/products';

interface CategoryCardProps {
  category: CategoryInfo;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link
      to={`/shop?category=${category.id}`}
      className="group flex flex-col bg-white rounded-2xl p-3 sm:p-3.5 border border-sky-100/90 shadow-xs hover:shadow-md hover:border-sky-400 transition-all duration-200 text-center relative overflow-hidden"
    >
      {/* Product Image Stage: Architectural Gallery Niche */}
      <div className="w-full aspect-[4/5] relative rounded-t-[32px] sm:rounded-t-[36px] rounded-b-xl bg-gradient-to-b from-sky-100/70 via-white to-sky-50/40 p-2 mb-3 overflow-hidden border border-sky-100/80 shadow-[inset_0_2px_6px_rgba(2,132,199,0.06)] flex items-center justify-center transition-all duration-300 group-hover:border-sky-300">
        {/* Soft 3D base shadow */}
        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-3/5 h-2 bg-slate-900/10 rounded-full blur-[2px]" />

        <img
          src={category.image}
          alt={category.name}
          loading="lazy"
          className="relative z-10 max-h-full max-w-full object-contain drop-shadow-[0_4px_8px_rgba(15,23,42,0.07)] transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1"
        />
      </div>

      {/* Category Name */}
      <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#0284C7] transition-colors line-clamp-1 mb-1">
        {category.name}
      </h3>

      {/* Explore text link with arrow */}
      <div className="mt-auto inline-flex items-center justify-center gap-1 text-[11px] sm:text-xs font-bold text-[#0284C7] group-hover:text-[#0369A1] transition-colors">
        <span>Explore Category</span>
        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1 text-[#0284C7]" />
      </div>
    </Link>
  );
};
