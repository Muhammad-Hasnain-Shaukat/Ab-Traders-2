import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck, Award } from 'lucide-react';

interface Slide {
  id: number;
  tag: string;
  headline: string;
  supporting: string;
  primaryBtnText: string;
  primaryBtnLink: string;
  secondaryBtnText?: string;
  secondaryBtnLink?: string;
  desktopImage: string;
  mobileImage: string;
  alt: string;
}

const SLIDES: Slide[] = [
  {
    id: 1,
    tag: 'INDUSTRIAL & COMMERCIAL SUPPLY',
    headline: 'Packaging, engineered.',
    supporting: 'Heavy-duty trigger sprayers, HDPE bottles, and precision containers for commercial scale across Pakistan.',
    primaryBtnText: 'Explore Catalog',
    primaryBtnLink: '/shop',
    secondaryBtnText: 'Get Bulk Quote',
    secondaryBtnLink: '/quote',
    desktopImage: '/images/hero/hero-slide-1-desktop.jpg',
    mobileImage: '/images/hero/hero-slide-1-mobile.jpg',
    alt: 'High-performance white trigger spray bottles and chemical containers for commercial packaging',
  },
  {
    id: 2,
    tag: 'LUXURY COSMETIC CONTAINERS',
    headline: 'Made for your brand.',
    supporting: 'Premium amber glass droppers, essential oil vials, and finishing touches engineered for high-performance skincare brands.',
    primaryBtnText: 'Cosmetic Packaging',
    primaryBtnLink: '/shop?category=cosmetic-packaging',
    secondaryBtnText: 'Custom Branding',
    secondaryBtnLink: '/custom-branding',
    desktopImage: '/images/hero/hero-slide-2-desktop.jpg',
    mobileImage: '/images/hero/hero-slide-2-mobile.jpg',
    alt: 'Curated collection of amber glass droppers and cosmetic essential oil bottles',
  },
  {
    id: 3,
    tag: 'PHARMACEUTICAL & MEDICAL GLASS',
    headline: 'Built for compliance.',
    supporting: 'UV-protective amber glass DIN bottles, syrup containers, and tamper-evident safety closures for healthcare laboratories.',
    primaryBtnText: 'Request Bulk Quote',
    primaryBtnLink: '/quote',
    secondaryBtnText: 'View All Products',
    secondaryBtnLink: '/shop',
    desktopImage: '/images/hero/hero-slide-3-desktop.jpg',
    mobileImage: '/images/hero/hero-slide-3-mobile.jpg',
    alt: 'Amber glass pharmaceutical syrup and medicine bottles with tamper-evident caps',
  },
];

export const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Check reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    if (mediaQuery.matches) {
      setIsPlaying(false);
    }
    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      if (e.matches) setIsPlaying(false);
    };
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Screen auto-adjuster: dynamically calculate 100% viewport height across mobile browsers
  useEffect(() => {
    const updateViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    updateViewportHeight();
    window.addEventListener('resize', updateViewportHeight);
    window.addEventListener('orientationchange', updateViewportHeight);

    return () => {
      window.removeEventListener('resize', updateViewportHeight);
      window.removeEventListener('orientationchange', updateViewportHeight);
    };
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  // Autoplay management: pause on hover, page visibility hidden, or manual stop
  useEffect(() => {
    if (!isPlaying || isHovered || prefersReducedMotion) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearInterval(interval);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isPlaying, isHovered, prefersReducedMotion, nextSlide]);

  // Touch swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      setIsPlaying(false);
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const activeSlide = SLIDES[currentSlide];

  return (
    <section
      ref={sliderRef}
      className="relative w-full bg-ivory overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
      aria-label="Hero Packaging Highlights"
    >
      {/* ========================================================================= */}
      {/* MOBILE LAYOUT (< md): Auto-adjusting hero for complete first-view fit     */}
      {/* ========================================================================= */}
      <div
        className="md:hidden flex flex-col justify-between px-4 sm:px-6 pt-13 sm:pt-14 pb-2 sm:pb-3 w-full min-h-[480px] h-[100svh] max-h-[100svh]"
        style={{
          height: 'calc(var(--vh, 1vh) * 100)',
          maxHeight: 'calc(var(--vh, 1vh) * 100)',
        }}
      >
        {/* 1. Header & Text Group (Always completely visible at top) */}
        <div className="shrink-0 space-y-1.5 sm:space-y-2">
          {/* Section Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100/90 border border-sky-200 text-[10px] uppercase tracking-wider text-sky-800 font-bold shadow-2xs">
            <span className="text-sky-600">●</span>
            <span>{activeSlide.tag}</span>
          </div>

          {/* Headline */}
          <h1 className="font-sans text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
            {activeSlide.headline}
          </h1>

          {/* Supporting line */}
          <p className="text-xs text-slate-600 font-normal leading-relaxed line-clamp-2">
            {activeSlide.supporting}
          </p>
        </div>

        {/* 2. Photography Frame - Flexibly auto-adjusts to fill remaining screen height */}
        <div className="flex-1 min-h-[180px] relative w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm my-2 sm:my-2.5">
          {SLIDES.map((slide, index) => {
            const isActive = index === currentSlide;
            return (
              <div
                key={`mobile-img-${slide.id}`}
                className={`absolute inset-0 transition-opacity duration-600 ease-in-out ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <picture className="w-full h-full">
                  <source media="(max-width: 767px)" srcSet={slide.mobileImage} />
                  <img
                    src={slide.mobileImage || slide.desktopImage}
                    alt={slide.alt}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    className="w-full h-full object-cover object-center"
                  />
                </picture>
              </div>
            );
          })}
        </div>

        {/* 3. Actions - Two buttons always anchored comfortably on first view */}
        <div className="shrink-0 grid grid-cols-2 gap-2.5 sm:gap-3 pb-0.5">
          <Link
            to={activeSlide.primaryBtnLink}
            className="inline-flex items-center justify-center gap-1.5 bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold py-2.5 sm:py-3 px-2.5 rounded-lg tracking-normal shadow-xs active:scale-[0.98] text-center leading-tight"
          >
            <span>{activeSlide.primaryBtnText}</span>
            <ArrowRight className="w-3.5 h-3.5 text-white shrink-0" />
          </Link>

          {activeSlide.secondaryBtnText && (
            <Link
              to={activeSlide.secondaryBtnLink || '/quote'}
              className="inline-flex items-center justify-center bg-white hover:bg-sky-50 text-slate-800 border border-slate-300 text-xs font-bold py-2.5 sm:py-3 px-2.5 rounded-lg tracking-normal shadow-2xs text-center leading-tight active:scale-[0.98]"
            >
              <span>{activeSlide.secondaryBtnText}</span>
            </Link>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* DESKTOP LAYOUT (md: and up): Side-by-side with stone pedestal on right     */}
      {/* ========================================================================= */}
      <div className="hidden md:flex relative min-h-[600px] lg:min-h-[680px] items-center pt-14 pb-12 lg:pt-16 lg:pb-14">
        {/* Background photographic slides */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {SLIDES.map((slide, index) => {
            const isActive = index === currentSlide;
            return (
              <div
                key={`desktop-slide-${slide.id}`}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
                aria-hidden={!isActive}
              >
                <img
                  src={slide.desktopImage}
                  alt={slide.alt}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  className="w-full h-full object-cover object-right"
                />
                {/* Clean ambient lighting overlay for high legibility on text side */}
                <div className="absolute inset-0 w-3/5 pointer-events-none bg-gradient-to-r from-white via-white/90 to-transparent" />
              </div>
            );
          })}
        </div>

        {/* Foreground Desktop Live HTML Content - Original tight spacing, no added space */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="max-w-xl lg:max-w-2xl -translate-y-5 lg:-translate-y-7">
            {SLIDES.map((slide, index) => {
              const isActive = index === currentSlide;
              return (
                <div
                  key={`desktop-text-${slide.id}`}
                  className={`transition-all duration-500 ease-out ${
                    isActive ? 'block opacity-100 translate-y-0' : 'hidden opacity-0 translate-y-2'
                  }`}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Slide ${index + 1} of ${SLIDES.length}`}
                >
                  {/* Uppercase section label badge */}
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] uppercase tracking-wider font-bold mb-5 shadow-2xs bg-sky-100 border border-sky-200 text-sky-800">
                    <span className="text-sky-600">●</span>
                    <span>{slide.tag}</span>
                  </div>

                  {/* Main Headline */}
                  <h1 className="font-sans text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.12] mb-5 text-slate-900">
                    {slide.headline}
                  </h1>

                  {/* Supporting description */}
                  <p className="text-base sm:text-lg font-normal leading-relaxed max-w-lg mb-7 text-slate-600">
                    {slide.supporting}
                  </p>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-3.5 mb-9">
                    <Link
                      to={slide.primaryBtnLink}
                      tabIndex={isActive ? 0 : -1}
                      className="inline-flex items-center justify-center gap-2 text-sm font-bold px-7 py-3.5 rounded-xl tracking-wide transition-all shadow-md hover:shadow-sky-500/25 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 bg-[#0284C7] hover:bg-[#0369A1] text-white"
                    >
                      <span>{slide.primaryBtnText}</span>
                      <ArrowRight className="w-4 h-4 text-white" />
                    </Link>

                    {slide.secondaryBtnText && (
                      <Link
                        to={slide.secondaryBtnLink || '/quote'}
                        tabIndex={isActive ? 0 : -1}
                        className="inline-flex items-center justify-center gap-2 text-sm font-bold px-6 py-3.5 rounded-xl tracking-wide transition-all active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 bg-white hover:bg-sky-50 text-slate-800 border border-slate-300 shadow-xs"
                      >
                        <span>{slide.secondaryBtnText}</span>
                      </Link>
                    )}
                  </div>

                  {/* 3 Quick Trust Pillars */}
                  <div className="grid grid-cols-3 gap-3 pt-4 max-w-lg border-t border-slate-200">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-[#0284C7] shrink-0" />
                      <div>
                        <p className="text-xs font-semibold leading-tight text-slate-900">
                          Quality-Focused
                        </p>
                        <p className="text-[11px] text-slate-500">
                          Inspected materials
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#0284C7] shrink-0" />
                      <div>
                        <p className="text-xs font-semibold leading-tight text-slate-900">
                          Wholesale Direct
                        </p>
                        <p className="text-[11px] text-slate-500">
                          Competitive volume rates
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-[#0284C7] shrink-0" />
                      <div>
                        <p className="text-xs font-semibold leading-tight text-slate-900">
                          Nationwide Supply
                        </p>
                        <p className="text-[11px] text-slate-500">
                          Karachi, Lahore, Islamabad
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
