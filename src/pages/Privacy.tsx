import React from 'react';
import { AlertCircle } from 'lucide-react';

export const Privacy: React.FC = () => {
  return (
    <div className="pt-24 pb-16 sm:pt-28 sm:pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Draft Review Banner */}
      <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3 text-xs text-amber-800">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold">Notice for Business Review</p>
          <p className="mt-0.5">
            This document represents a draft privacy policy template for AB TRADERS. Please have your legal counsel review and update it prior to commercial deployment.
          </p>
        </div>
      </div>

      <div className="bg-white border border-beige rounded-2xl p-6 sm:p-10 shadow-soft space-y-6 text-xs sm:text-sm text-charcoal-700 leading-relaxed">
        <div>
          <span className="text-[11px] uppercase tracking-luxury text-gold-dark font-semibold">
            Legal & Compliance
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-normal text-charcoal mt-1">
            Privacy Policy
          </h1>
          <p className="text-xs text-charcoal-400 mt-1">
            Last Updated: September 2026 • AB TRADERS, Lahore, Pakistan
          </p>
        </div>

        <section className="space-y-2 border-t border-beige pt-4">
          <h2 className="font-serif text-base font-semibold text-charcoal">
            1. Information We Collect
          </h2>
          <p>
            When you request a wholesale quotation, contact our packaging desk, or use our digital services, we may collect the following business contact information:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li>Full Name and Company or Brand Representation</li>
            <li>Commercial Delivery Address, City, and Postal Details within Pakistan</li>
            <li>Telephone numbers and WhatsApp contact handles</li>
            <li>Business email address</li>
            <li>Packaging specifications, requested quantities, and custom branding requirements</li>
          </ul>
        </section>

        <section className="space-y-2 border-t border-beige pt-4">
          <h2 className="font-serif text-base font-semibold text-charcoal">
            2. How We Use Your Information
          </h2>
          <p>
            The collected information is solely utilized to process commercial packaging quotations, coordinate freight and courier logistics across Pakistan, and maintain business records. We do not sell, rent, or lease customer data to third-party marketing networks.
          </p>
        </section>

        <section className="space-y-2 border-t border-beige pt-4">
          <h2 className="font-serif text-base font-semibold text-charcoal">
            3. Database Retention and Security
          </h2>
          <p>
            Quotations and inquiry messages submitted through our website are stored securely in internal database tables accessible only to authorized commercial staff. We employ reasonable technical safeguards to protect personal and business details.
          </p>
        </section>

        <section className="space-y-2 border-t border-beige pt-4">
          <h2 className="font-serif text-base font-semibold text-charcoal">
            4. Contacting Us Regarding Your Data
          </h2>
          <p>
            To review, modify, or request deletion of your quotation history or contact details from our records, please reach out to <a href="mailto:enquiries@abtraderspackaging.com" className="text-gold font-medium underline">enquiries@abtraderspackaging.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
};
