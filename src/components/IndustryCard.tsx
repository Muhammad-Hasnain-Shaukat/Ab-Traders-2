import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { IndustryInfo } from '../data/products';

interface IndustryCardProps {
  industry: IndustryInfo;
}

export const IndustryCard: React.FC<IndustryCardProps> = ({ industry }) => {
  return (
    <Link
      to={`/shop?industry=${industry.id}`}
      className="group relative flex flex-col bg-white rounded-2xl border border-sky-100/90 overflow-hidden shadow-xs hover:shadow-md hover:border-sky-400 transition-all duration-300"
    >
      {/* Industry Photography with Architectural V-Curve Frame on Desktop */}
      <div className="relative aspect-[4/3] bg-sky-50/60 overflow-hidden border-b border-sky-100/70 sm:border-b-0">
        <img
          src={industry.image}
          alt={`Packaging solutions for ${industry.name}`}
          loading="lazy"
          className="w-full h-full object-cover object-center sm:object-[center_42%] transition-transform duration-500 group-hover:scale-108"
        />

        {/* Ambient Dark Gradient for Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Architectural V-Curve Frame Cutout Overlay - Desktop Only (Hidden on Mobile) */}
        <div className="hidden sm:block absolute -bottom-[1px] left-0 right-0 z-10 pointer-events-none">
          {/* White Bottom Card Fill following the V-Curve */}
          <svg viewBox="0 0 100 24" preserveAspectRatio="none" className="w-full h-5 sm:h-6 text-white fill-current block">
            <path d="M0,0 C28,2 44,20 50,20 C56,20 72,2 100,0 L100,24 L0,24 Z" />
          </svg>
          {/* Sky Blue Accent Border Tracing the V-Curve */}
          <svg viewBox="0 0 100 24" preserveAspectRatio="none" className="absolute top-0 left-0 w-full h-5 sm:h-6 pointer-events-none">
            <path
              d="M0,0 C28,2 44,20 50,20 C56,20 72,2 100,0"
              fill="none"
              stroke="#0EA5E9"
              strokeWidth="1.5"
              className="opacity-70 group-hover:opacity-100 group-hover:stroke-[#0284C7] transition-all duration-300"
            />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          <h4 className="font-sans text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#0284C7] transition-colors">
            {industry.name}
          </h4>
          <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1 font-medium">
            {industry.tagline}
          </p>
        </div>

        <div className="mt-3 pt-2.5 border-t border-sky-100/70 flex items-center justify-between text-xs font-bold text-[#0284C7] group-hover:text-[#0369A1] transition-colors">
          <span>Explore Industry</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1 text-[#0284C7]" />
        </div>
      </div>
    </Link>
  );
};
