import React from 'react';
import { AlertCircle } from 'lucide-react';

export const Terms: React.FC = () => {
  return (
    <div className="pt-24 pb-16 sm:pt-28 sm:pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Draft Review Banner */}
      <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3 text-xs text-amber-800">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold">Notice for Business Review</p>
          <p className="mt-0.5">
            This document outlines standard wholesale commercial terms for AB TRADERS. Please review and calibrate with internal company trading terms before commercial finalization.
          </p>
        </div>
      </div>

      <div className="bg-white border border-beige rounded-2xl p-6 sm:p-10 shadow-soft space-y-6 text-xs sm:text-sm text-charcoal-700 leading-relaxed">
        <div>
          <span className="text-[11px] uppercase tracking-luxury text-gold-dark font-semibold">
            Commercial Terms
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-normal text-charcoal mt-1">
            Terms & Conditions
          </h1>
          <p className="text-xs text-charcoal-400 mt-1">
            Last Updated: September 2026 • AB TRADERS, Lahore, Pakistan
          </p>
        </div>

        <section className="space-y-2 border-t border-beige pt-4">
          <h2 className="font-serif text-base font-semibold text-charcoal">
            1. Wholesale Enquiries & Quotations
          </h2>
          <p>
            Submission of a quotation request via our website does not constitute a binding sales agreement until an official written proforma quotation is confirmed by AB TRADERS and accepted by the client. Prices and delivery timelines are subject to confirmation based on raw material resin indices, order quantities, and production scheduling.
          </p>
        </section>

        <section className="space-y-2 border-t border-beige pt-4">
          <h2 className="font-serif text-base font-semibold text-charcoal">
            2. Minimum Order Quantities (MOQ)
          </h2>
          <p>
            All listed packaging containers, pumps, and closures have specified wholesale Minimum Order Quantities (MOQs). Orders below minimum thresholds may incur broken-carton surcharges or be redirected to authorized regional distributors.
          </p>
        </section>

        <section className="space-y-2 border-t border-beige pt-4">
          <h2 className="font-serif text-base font-semibold text-charcoal">
            3. Customer Formulation Compatibility
          </h2>
          <p>
            The buyer is solely responsible for determining the suitability and chemical compatibility of the packaging container (glass, PET, HDPE, PP) with their intended filling formulation (liquids, essential oils, active acids, surfactants, solvents). AB TRADERS offers sample units for testing upon request.
          </p>
        </section>

        <section className="space-y-2 border-t border-beige pt-4">
          <h2 className="font-serif text-base font-semibold text-charcoal">
            4. Dispatch, Freight, and Transit
          </h2>
          <p>
            Unless explicitly agreed otherwise in writing, goods are supplied Ex-Works or delivered to customer-specified freight transport terminals in Lahore, Karachi, Rawalpindi, or other commercial stations across Pakistan. Transit insurance and freight charges are billed per individual commercial arrangement.
          </p>
        </section>
      </div>
    </div>
  );
};
