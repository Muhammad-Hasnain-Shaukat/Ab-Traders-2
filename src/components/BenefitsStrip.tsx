import React from 'react';
import { Award, Layers, Sparkles, Truck, Headphones } from 'lucide-react';

interface Benefit {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

const BENEFITS: Benefit[] = [
  {
    icon: <Award className="w-6 h-6 text-gold" />,
    title: 'Quality-Focused Sourcing',
    desc: 'Durable, consistent materials inspected for packaging integrity.',
  },
  {
    icon: <Layers className="w-6 h-6 text-gold" />,
    title: 'Bulk Enquiries',
    desc: 'Direct wholesale supply and tiered volume pricing for businesses.',
  },
  {
    icon: <Sparkles className="w-6 h-6 text-gold" />,
    title: 'Custom Branding',
    desc: 'Silk-screen printing, labelling, and custom closure finishes.',
  },
  {
    icon: <Truck className="w-6 h-6 text-gold" />,
    title: 'Delivery Enquiries',
    desc: 'Reliable logistics coordination across Karachi, Lahore & nationwide.',
  },
  {
    icon: <Headphones className="w-6 h-6 text-gold" />,
    title: 'Packaging Assistance',
    desc: 'Technical guidance on materials, neck finishes, and compatibility.',
  },
];

export const BenefitsStrip: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-6 lg:p-7 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-6 lg:gap-4 divide-y sm:divide-y-0 lg:divide-x divide-slate-200/70">
          {BENEFITS.map((item, index) => (
            <div
              key={index}
              className={`flex items-start gap-3.5 ${
                index > 0 ? 'pt-4 sm:pt-0 lg:pl-4' : ''
              }`}
            >
              <div className="p-2.5 rounded-xl bg-ivory/80 border border-beige shadow-2xs shrink-0 mt-0.5">
                {item.icon}
              </div>
              <div className="min-w-0">
                <h4 className="text-xs sm:text-sm font-semibold text-charcoal tracking-tight leading-snug">
                  {item.title}
                </h4>
                <p className="text-[11px] sm:text-xs text-charcoal-600 mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
