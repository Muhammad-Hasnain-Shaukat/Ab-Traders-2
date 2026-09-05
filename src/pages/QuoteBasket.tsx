import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
  Sparkles,
  Send,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  Building2,
  User,
  Phone,
  Mail,
  MapPin,
} from 'lucide-react';
import { useQuote } from '../context/QuoteContext';

// Pakistan + International phone validation regex
const phoneRegex = /^(\+92|0092|0)?3[0-9]{2}[0-9]{7}$|^\+?[1-9]\d{1,14}$/;

const quoteFormSchema = z.object({
  fullName: z.string().min(2, 'Please enter your full name (minimum 2 characters)'),
  companyName: z.string().optional(),
  phone: z
    .string()
    .min(10, 'Please enter a valid phone number')
    .refine((val) => phoneRegex.test(val.replace(/[\s-]/g, '')), {
      message: 'Please enter a valid Pakistani (e.g. 0300 1234567 or +92 300 1234567) or international number',
    }),
  email: z.string().email('Please enter a valid business email address'),
  city: z.string().min(2, 'Please specify your city for delivery dispatch'),
  brandingRequirements: z.enum(['none', 'screen_printing', 'labelling', 'custom_mould', 'full_custom']),
  preferredContact: z.enum(['whatsapp', 'phone', 'email']),
  additionalNotes: z.string().optional(),
});

type QuoteFormData = z.infer<typeof quoteFormSchema>;

export const QuoteBasket: React.FC = () => {
  const { items, removeItem, updateQuantity, toggleCustomBranding, clearBasket } = useQuote();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [submittedReference, setSubmittedReference] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      fullName: '',
      companyName: '',
      phone: '',
      email: '',
      city: 'Lahore',
      brandingRequirements: 'none',
      preferredContact: 'whatsapp',
      additionalNotes: '',
    },
  });

  const onSubmit = async (data: QuoteFormData) => {
    if (items.length === 0) {
      setSubmissionError('Your quote basket is empty. Please add packaging items before submitting.');
      return;
    }

    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          items: items.map((i) => ({
            productId: i.productId,
            productName: i.productName,
            categoryName: i.categoryName,
            material: i.material,
            capacity: i.capacity,
            quantity: i.quantity,
            customBranding: i.customBranding,
          })),
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to record quote enquiry in the database.');
      }

      setSubmittedReference(result.referenceNumber);
      clearBasket();
    } catch (err: any) {
      console.error('Quote submission error:', err);
      setSubmissionError(
        err.message || 'Unable to connect to the quotation service. Please ensure the backend server is running.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate WhatsApp link with summary
  const generateWhatsAppMessage = () => {
    const summary = items
      .map((i) => `• ${i.productName} (${i.capacity}) - Qty: ${i.quantity}${i.customBranding ? ' [Branding]' : ''}`)
      .join('%0A');
    const text = `Hello AB TRADERS, I would like to request a bulk wholesale quotation:%0A%0A${summary}`;
    return `https://wa.me/923008472910?text=${text}`;
  };

  // Success Confirmation View
  if (submittedReference) {
    return (
      <div className="pt-28 pb-24 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-2xl border border-beige p-8 sm:p-12 shadow-soft space-y-6">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-700">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <p className="text-xs uppercase tracking-luxury text-gold-dark font-semibold">
              Quotation Request Received
            </p>
            <h1 className="font-serif text-3xl font-normal text-charcoal">
              Thank You for Your Enquiry
            </h1>
            <p className="text-sm text-charcoal-600 max-w-md mx-auto">
              Your quotation enquiry has been registered in our database. Our commercial desk will review your packaging and volume requirements promptly.
            </p>
          </div>

          <div className="bg-ivory border border-beige rounded-xl p-4 max-w-sm mx-auto">
            <p className="text-xs text-charcoal-400 uppercase tracking-luxury">Quote Reference ID</p>
            <p className="text-xl font-mono font-bold text-charcoal mt-1 tracking-wider">
              {submittedReference}
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={`https://wa.me/923008472910?text=Hello%20AB%20TRADERS,%20I%20have%20submitted%20quotation%20reference%20${submittedReference}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold px-6 py-3 rounded-md transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Connect on WhatsApp</span>
            </a>

            <Link
              to="/shop"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-charcoal hover:bg-charcoal-800 text-ivory text-xs font-semibold px-6 py-3 rounded-md transition-colors"
            >
              <span>Explore More Packaging</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 sm:pt-28 sm:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="border-b border-beige pb-6 mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-beige/80 border border-gold/40 text-[11px] uppercase tracking-luxury text-gold-dark font-medium mb-2">
          <ShoppingBag className="w-3.5 h-3.5 text-gold" />
          <span>Wholesale Enquiry Matrix</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl text-charcoal font-normal tracking-tight">
          Quote Basket & Quotation Request
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-600 mt-1 max-w-2xl">
          Review your selected packaging specifications, specify batch quantities, and submit your enquiry to receive a tailored bulk price quotation.
        </p>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Basket Items */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between pb-2">
            <h2 className="font-serif text-lg font-semibold text-charcoal">
              Selected Packaging ({items.length} {items.length === 1 ? 'item' : 'items'})
            </h2>
            {items.length > 0 && (
              <button
                onClick={clearBasket}
                className="text-xs text-charcoal-400 hover:text-red-700 transition-colors"
              >
                Clear basket
              </button>
            )}
          </div>

          {items.length === 0 ? (
            <div className="bg-white rounded-2xl border border-beige p-10 text-center space-y-4 shadow-2xs">
              <ShoppingBag className="w-12 h-12 mx-auto text-charcoal-300" />
              <h3 className="font-serif text-base font-semibold text-charcoal">
                Your quote basket is empty
              </h3>
              <p className="text-xs text-charcoal-500 max-w-sm mx-auto">
                Explore our catalogue of glass, PET, and cosmetic bottles and select products to request bulk wholesale pricing.
              </p>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 bg-charcoal text-ivory text-xs font-semibold px-5 py-2.5 rounded-md hover:bg-charcoal-800 transition-colors"
              >
                <span>Browse Packaging Catalogue</span>
                <ArrowRight className="w-3.5 h-3.5 text-gold" />
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.capacity}`}
                  className="bg-white rounded-xl border border-beige p-3.5 sm:p-4 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center gap-4 transition-all"
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-ivory rounded-lg border border-beige/80 p-1.5 shrink-0 flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase tracking-wider text-gold-dark font-medium">
                      {item.categoryName} • {item.material}
                    </span>
                    <Link
                      to={`/product/${item.productSlug}`}
                      className="text-xs sm:text-sm font-semibold text-charcoal hover:text-gold transition-colors block truncate"
                    >
                      {item.productName}
                    </Link>
                    <p className="text-xs text-charcoal-500 mt-0.5">
                      Selected Size: <span className="font-semibold text-charcoal">{item.capacity}</span>
                    </p>

                    {/* Branding Toggle */}
                    <button
                      type="button"
                      onClick={() => toggleCustomBranding(item.productId, item.capacity)}
                      className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2 py-0.5 rounded mt-2 border transition-all ${
                        item.customBranding
                          ? 'bg-beige/70 text-charcoal-900 border-gold/50'
                          : 'bg-ivory text-charcoal-400 border-beige/60 hover:text-charcoal'
                      }`}
                    >
                      <Sparkles className="w-3 h-3 text-gold" />
                      <span>{item.customBranding ? 'Custom Branding Requested' : '+ Add Branding'}</span>
                    </button>
                  </div>

                  {/* Quantity and Remove */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-beige/50">
                    <div className="flex items-center border border-beige rounded-md bg-ivory">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            item.capacity,
                            Math.max(item.moq, item.quantity - 100)
                          )
                        }
                        className="p-1.5 text-charcoal-600 hover:text-charcoal"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <input
                        type="number"
                        min={item.moq}
                        step={100}
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(
                            item.productId,
                            item.capacity,
                            Math.max(1, parseInt(e.target.value) || item.moq)
                          )
                        }
                        className="w-16 text-center bg-transparent text-xs font-semibold text-charcoal focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.productId, item.capacity, item.quantity + 100)
                        }
                        className="p-1.5 text-charcoal-600 hover:text-charcoal"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeItem(item.productId, item.capacity)}
                      className="p-1.5 text-charcoal-400 hover:text-red-700 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Direct WhatsApp Quick Link */}
              <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200/60 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-emerald-700" />
                  <span className="text-xs font-semibold text-emerald-900">
                    Prefer direct WhatsApp chat?
                  </span>
                </div>
                <a
                  href={generateWhatsAppMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-emerald-800 hover:underline"
                >
                  Send List to WhatsApp →
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Right: Quotation Details Form */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-beige p-5 sm:p-7 shadow-soft space-y-6 sticky top-24">
          <div>
            <h2 className="font-serif text-lg font-semibold text-charcoal">
              Wholesale Quotation Form
            </h2>
            <p className="text-xs text-charcoal-500 mt-1">
              All quotes are reviewed by our Lahore commercial desk. You will receive volume rates, carton counts, and transit estimates.
            </p>
          </div>

          {submissionError && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2.5 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Submission failed</p>
                <p>{submissionError}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">
                Full Name <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  {...register('fullName')}
                  placeholder="e.g. Tariq Mehmood"
                  className="w-full bg-ivory border border-beige rounded-md pl-9 pr-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                />
              </div>
              {errors.fullName && (
                <p className="text-[11px] text-red-600 mt-1">{errors.fullName.message}</p>
              )}
            </div>

            {/* Company Name */}
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">
                Company / Brand Name <span className="text-charcoal-400 font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  {...register('companyName')}
                  placeholder="e.g. Pure Botanical Laboratories"
                  className="w-full bg-ivory border border-beige rounded-md pl-9 pr-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                />
              </div>
            </div>

            {/* Phone & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">
                  Phone / WhatsApp <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    {...register('phone')}
                    placeholder="0300 1234567"
                    className="w-full bg-ivory border border-beige rounded-md pl-9 pr-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                  />
                </div>
                {errors.phone && (
                  <p className="text-[11px] text-red-600 mt-1">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">
                  Email Address <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    {...register('email')}
                    placeholder="name@company.com"
                    className="w-full bg-ivory border border-beige rounded-md pl-9 pr-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                  />
                </div>
                {errors.email && (
                  <p className="text-[11px] text-red-600 mt-1">{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* City */}
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">
                Destination City (Pakistan) <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  {...register('city')}
                  placeholder="e.g. Lahore, Karachi, Islamabad, Faisalabad..."
                  className="w-full bg-ivory border border-beige rounded-md pl-9 pr-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                />
              </div>
              {errors.city && (
                <p className="text-[11px] text-red-600 mt-1">{errors.city.message}</p>
              )}
            </div>

            {/* Branding Requirements */}
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">
                Custom Branding Requirement
              </label>
              <select
                {...register('brandingRequirements')}
                className="w-full bg-ivory border border-beige rounded-md px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold cursor-pointer"
              >
                <option value="none">Plain Stock (No Custom Branding)</option>
                <option value="screen_printing">UV Silk-Screen Logo Printing</option>
                <option value="labelling">Label Printing & Application</option>
                <option value="custom_mould">Custom Colour / Closure Matching</option>
                <option value="full_custom">Full Custom Branding Package</option>
              </select>
            </div>

            {/* Preferred Contact Method */}
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">
                Preferred Reply Channel
              </label>
              <div className="grid grid-cols-3 gap-2">
                <label className="flex items-center gap-1.5 p-2 bg-ivory border border-beige rounded cursor-pointer text-xs">
                  <input
                    type="radio"
                    value="whatsapp"
                    {...register('preferredContact')}
                    className="accent-gold"
                  />
                  <span>WhatsApp</span>
                </label>
                <label className="flex items-center gap-1.5 p-2 bg-ivory border border-beige rounded cursor-pointer text-xs">
                  <input
                    type="radio"
                    value="phone"
                    {...register('preferredContact')}
                    className="accent-gold"
                  />
                  <span>Phone Call</span>
                </label>
                <label className="flex items-center gap-1.5 p-2 bg-ivory border border-beige rounded cursor-pointer text-xs">
                  <input
                    type="radio"
                    value="email"
                    {...register('preferredContact')}
                    className="accent-gold"
                  />
                  <span>Email</span>
                </label>
              </div>
            </div>

            {/* Additional Notes */}
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">
                Additional Notes / Target Delivery Dates
              </label>
              <textarea
                {...register('additionalNotes')}
                rows={3}
                placeholder="Specify cap color preferences, product filling details, or expected order schedule..."
                className="w-full bg-ivory border border-beige rounded-md p-2.5 text-xs text-charcoal focus:outline-none focus:border-gold resize-none"
              />
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              disabled={isSubmitting || items.length === 0}
              className={`w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-md text-xs sm:text-sm font-semibold shadow-sm transition-all ${
                items.length === 0
                  ? 'bg-beige text-charcoal-400 cursor-not-allowed'
                  : 'bg-charcoal hover:bg-charcoal-800 text-ivory active:scale-[0.98]'
              }`}
            >
              {isSubmitting ? (
                <span>Submitting Enquiry...</span>
              ) : (
                <>
                  <Send className="w-4 h-4 text-gold" />
                  <span>Submit Wholesale Quotation Enquiry</span>
                </>
              )}
            </button>
          </form>

          <p className="text-[11px] text-charcoal-400 text-center">
            Your quotation request is recorded securely in our database. No credit card required.
          </p>
        </div>
      </div>
    </div>
  );
};
