import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, FileText, CheckCircle, ArrowRight } from 'lucide-react';

export const QuotationProcess: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Choose your packaging',
      desc: 'Browse our glass, PET, HDPE containers, jars, and closure options. Add items and desired capacities to your quote basket.',
      icon: <Layers className="w-5 h-5 text-gold" />,
    },
    {
      number: '02',
      title: 'Share quantity & branding needs',
      desc: 'Specify your anticipated volume, delivery city in Pakistan, and whether you require custom silk-screen printing or plain stock.',
      icon: <FileText className="w-5 h-5 text-gold" />,
    },
    {
      number: '03',
      title: 'Receive a tailored quotation',
      desc: 'Our wholesale team calculates competitive tiered volume pricing and provides dispatch timelines directly to your WhatsApp or email.',
      icon: <CheckCircle className="w-5 h-5 text-gold" />,
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-ivory border-y border-beige/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <p className="text-[11px] uppercase tracking-luxury text-gold-dark font-medium mb-2">
            Clear & Direct
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-charcoal font-normal tracking-tight">
            How Our Quotation Works
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-600 mt-2 max-w-md mx-auto">
            A straightforward process designed for businesses, commercial buyers, and growing brand founders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative bg-white rounded-xl p-6 sm:p-7 border border-beige shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-ivory border border-beige shadow-2xs">
                    {step.icon}
                  </div>
                  <span className="font-serif text-2xl font-bold text-beige-dark">
                    {step.number}
                  </span>
                </div>

                <h3 className="font-serif text-base sm:text-lg font-semibold text-charcoal mb-2">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-beige/60">
                <span className="text-[11px] font-semibold text-gold uppercase tracking-wider">
                  Step {index + 1}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/quote"
            className="inline-flex items-center gap-2 bg-charcoal hover:bg-charcoal-800 text-ivory text-xs sm:text-sm font-semibold px-6 py-3 rounded-md transition-all shadow-sm active:scale-[0.98]"
          >
            <span>Start Your Bulk Quotation</span>
            <ArrowRight className="w-4 h-4 text-gold" />
          </Link>
        </div>
      </div>
    </section>
  );
};
