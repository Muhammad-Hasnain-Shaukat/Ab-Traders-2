import React, { useState } from 'react';
import { Phone, MapPin, Clock, MessageCircle, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to submit contact enquiry.');
      }

      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Unable to submit your message right now.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-16 sm:pt-28 sm:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-beige/80 border border-gold/40 text-[11px] uppercase tracking-luxury text-gold-dark font-medium mb-3">
          <span>Get in Touch</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl text-charcoal font-normal tracking-tight">
          Contact AB TRADERS
        </h1>
        <p className="text-sm sm:text-base text-charcoal-600 mt-3 leading-relaxed">
          Reach our commercial packaging team for sample requests, quotation queries, or custom branding consultations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-beige rounded-2xl p-6 sm:p-8 shadow-2xs space-y-6">
            <h2 className="font-serif text-xl font-semibold text-charcoal">
              Packaging Support & Sourcing Desk
            </h2>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-lg bg-ivory border border-beige shrink-0 text-gold">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-charcoal">Shop & Distribution Address</p>
                  <p className="text-charcoal-600 mt-0.5">
                    Shop # 2604/D, Papar Mandi Naya Bazar, Near Niween Masjid, Shah Alam Market, Lahore, Pakistan
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-lg bg-ivory border border-beige shrink-0 text-gold">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-charcoal">Direct Mobile (Ramiz Qaiser)</p>
                  <a href="tel:03278822358" className="text-charcoal-600 hover:text-gold block mt-0.5">
                    0327-8822358
                  </a>
                  <a href="tel:03225080132" className="text-charcoal-600 hover:text-gold block mt-0.5">
                    0322-5080132
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-lg bg-ivory border border-beige shrink-0 text-emerald-600">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-charcoal">Direct WhatsApp</p>
                  <a
                    href="https://wa.me/923278822358?text=Hello%20Ramiz%20Qaiser,%20I%20have%20an%20enquiry%20for%20AB%20TRADERS"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-700 hover:underline block mt-0.5 font-medium"
                  >
                    0327-8822358 (Connect on WhatsApp)
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-lg bg-ivory border border-beige shrink-0 text-gold">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-charcoal">Landline (PTCL)</p>
                  <a
                    href="tel:04237364617"
                    className="text-charcoal-600 hover:text-gold block mt-0.5"
                  >
                    042-37364617
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-lg bg-ivory border border-beige shrink-0 text-gold">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-charcoal">Operating Hours</p>
                  <p className="text-charcoal-600 mt-0.5">
                    Monday to Saturday: 9:00 AM – 7:00 PM PKT<br />
                    Sunday: Closed (WhatsApp enquiries answered next business day)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white border border-beige rounded-2xl p-6 sm:p-8 shadow-soft space-y-6">
          <div>
            <h2 className="font-serif text-xl font-semibold text-charcoal">
              Send a Direct Message
            </h2>
            <p className="text-xs text-charcoal-500 mt-1">
              Have a general inquiry or specific packaging question? Submit your message and our team will get back to you promptly.
            </p>
          </div>

          {isSubmitted ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3">
              <CheckCircle2 className="w-8 h-8 text-emerald-700 mx-auto" />
              <h3 className="font-serif text-lg font-semibold text-emerald-900">
                Message Sent Successfully
              </h3>
              <p className="text-xs text-emerald-800 max-w-sm mx-auto">
                Thank you for contacting AB TRADERS. One of our commercial packaging representatives will respond to your message shortly.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="mt-2 text-xs font-semibold text-emerald-900 underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-xs text-red-700">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    Your Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Asim Raza"
                    className="w-full bg-ivory border border-beige rounded-md px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    Email Address <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full bg-ivory border border-beige rounded-md px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0300 1234567"
                    className="w-full bg-ivory border border-beige rounded-md px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    Subject / Enquiry Type <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Amber Bottle Samples / Bulk Inquiry"
                    className="w-full bg-ivory border border-beige rounded-md px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">
                  Message <span className="text-red-600">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can our packaging specialists assist you?"
                  className="w-full bg-ivory border border-beige rounded-md p-3 text-xs text-charcoal focus:outline-none focus:border-gold resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 bg-charcoal hover:bg-charcoal-800 text-ivory text-xs font-semibold py-3 px-6 rounded-md shadow-sm transition-all"
              >
                {isSubmitting ? <span>Sending...</span> : (
                  <>
                    <Send className="w-4 h-4 text-gold" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
