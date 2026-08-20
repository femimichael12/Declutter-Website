import { useEffect, useState, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Info } from 'lucide-react';

type Slide = {
  id: string;
  productSlug: string;
  headline: string;
  subheadline: string;
  primaryCta: string;
  primaryLink: string;
  secondaryCta: string;
  secondaryLink: string;
  image: string;
  accent: string;
};

const slides: Slide[] = [
  {
    id: 'slide-1',
    productSlug: 'iphone-16-pro-max-256gb',
    headline: 'Meet the New iPhone 16 Pro Max',
    subheadline: 'Titanium design. Apple Intelligence. Incredible battery life. Experience Apple\u2019s most advanced iPhone.',
    primaryCta: 'Shop iPhone 16 Pro Max',
    primaryLink: '/product/iphone-16-pro-max-256gb',
    secondaryCta: 'View Details',
    secondaryLink: '/product/iphone-16-pro-max-256gb',
    image: 'https://images.pexels.com/photos/16005007/pexels-photo-16005007.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
    accent: '#2563EB',
  },
  {
    id: 'slide-2',
    productSlug: 'samsung-galaxy-s24-ultra',
    headline: 'Galaxy AI Changes Everything',
    subheadline: 'Capture every detail with the 200MP camera and unleash the power of Galaxy AI.',
    primaryCta: 'Explore Galaxy S25 Ultra',
    primaryLink: '/product/samsung-galaxy-s24-ultra',
    secondaryCta: 'View Details',
    secondaryLink: '/product/samsung-galaxy-s24-ultra',
    image: 'https://images.pexels.com/photos/38691715/pexels-photo-38691715.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
    accent: '#10B981',
  },
  {
    id: 'slide-3',
    productSlug: 'macbook-pro-14-m4-pro',
    headline: 'Power Without Limits',
    subheadline: 'Designed for creators, developers, and professionals with the incredible Apple M4 chip.',
    primaryCta: 'Shop MacBook Pro',
    primaryLink: '/product/macbook-pro-14-m4-pro',
    secondaryCta: 'View Details',
    secondaryLink: '/product/macbook-pro-14-m4-pro',
    image: 'https://images.pexels.com/photos/4006158/pexels-photo-4006158.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
    accent: '#2563EB',
  },
  {
    id: 'slide-4',
    productSlug: 'playstation-5-slim',
    headline: 'Next-Level Gaming Starts Here',
    subheadline: 'Ultra-fast SSD, ray tracing, and immersive gameplay with the PlayStation 5 Slim.',
    primaryCta: 'Buy PS5 Slim',
    primaryLink: '/product/playstation-5-slim',
    secondaryCta: 'View Details',
    secondaryLink: '/product/playstation-5-slim',
    image: 'https://images.pexels.com/photos/11633745/pexels-photo-11633745.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
    accent: '#10B981',
  },
  {
    id: 'slide-5',
    productSlug: 'lg-2hp-inverter-air-conditioner',
    headline: 'Stay Cool All Year',
    subheadline: 'Energy-efficient cooling with powerful inverter technology.',
    primaryCta: 'Shop Air Conditioners',
    primaryLink: '/product/lg-2hp-inverter-air-conditioner',
    secondaryCta: 'View Details',
    secondaryLink: '/product/lg-2hp-inverter-air-conditioner',
    image: 'https://images.pexels.com/photos/8082565/pexels-photo-8082565.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
    accent: '#2563EB',
  },
  {
    id: 'slide-6',
    productSlug: 'samsung-55-qled-4k-tv',
    headline: 'Cinema Comes Home',
    subheadline: 'Experience breathtaking picture quality and immersive entertainment.',
    primaryCta: 'Shop Smart TVs',
    primaryLink: '/product/samsung-55-qled-4k-tv',
    secondaryCta: 'View Details',
    secondaryLink: '/product/samsung-55-qled-4k-tv',
    image: 'https://images.pexels.com/photos/13348768/pexels-photo-13348768.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
    accent: '#10B981',
  },
  {
    id: 'slide-7',
    productSlug: 'dell-xps-15',
    headline: 'Performance Meets Elegance',
    subheadline: 'Premium design with incredible performance for work and creativity.',
    primaryCta: 'Shop Laptops',
    primaryLink: '/product/dell-xps-15',
    secondaryCta: 'View Details',
    secondaryLink: '/product/dell-xps-15',
    image: 'https://images.pexels.com/photos/450035/pexels-photo-450035.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
    accent: '#2563EB',
  },
];

const AUTOPLAY_MS = 5000;

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const lastTickRef = useRef<number>(0);

  const next = useCallback(() => setCurrent((p) => (p + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    if (isHovered) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }
    lastTickRef.current = performance.now();

    function tick(now: number) {
      const elapsed = now - lastTickRef.current;
      const pct = Math.min(elapsed / AUTOPLAY_MS, 1);
      setProgress(pct);
      if (pct >= 1) {
        setCurrent((p) => (p + 1) % slides.length);
        lastTickRef.current = now;
      }
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isHovered, current]);

  const slide = slides[current];

  return (
    <section
      className="relative w-full overflow-hidden bg-navy-950"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-[420px] sm:h-[520px] lg:h-[640px] xl:h-[680px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0"
          >
            {/* Ken Burns image */}
            <motion.div
              initial={{ scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: 5.5, ease: 'easeOut' }}
              className="absolute inset-0"
            >
              <img
                src={slide.image}
                alt={slide.headline}
                className="h-full w-full object-cover"
                loading="eager"
              />
            </motion.div>

            {/* Dark gradient overlays for readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/60 to-navy-950/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-navy-950/30" />
          </motion.div>
        </AnimatePresence>

        {/* Content */}
        <div className="relative z-10 flex h-full items-center">
          <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
                className="max-w-xl lg:max-w-2xl"
              >
                {/* Accent bar */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="mb-5 h-1 w-16 origin-left rounded-full"
                  style={{ backgroundColor: slide.accent }}
                />

                <h1 className="font-display text-3xl font-extrabold leading-[1.1] text-white sm:text-4xl lg:text-5xl xl:text-6xl text-balance">
                  {slide.headline}
                </h1>

                <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/75 sm:text-base lg:text-lg">
                  {slide.subheadline}
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link
                    to={slide.primaryLink}
                    className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-navy-900 shadow-lg shadow-black/20 transition-all hover:scale-[1.03] hover:shadow-xl active:scale-[0.98] sm:text-base"
                  >
                    {slide.primaryCta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    to={slide.secondaryLink}
                    className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20 hover:border-white/40 active:scale-[0.98] sm:text-base"
                  >
                    <Info className="h-4 w-4" />
                    {slide.secondaryCta}
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Arrow controls */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 z-20 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/30 text-white backdrop-blur-md transition-all hover:bg-black/50 hover:scale-110 sm:left-5 sm:h-12 sm:w-12"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 z-20 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/30 text-white backdrop-blur-md transition-all hover:bg-black/50 hover:scale-110 sm:right-5 sm:h-12 sm:w-12"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Progress indicators */}
        <div className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2 flex items-center gap-2 sm:gap-3">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setCurrent(i)}
              className="group relative h-1.5 overflow-hidden rounded-full transition-all duration-500"
              style={{
                width: i === current ? '40px' : '20px',
                backgroundColor: i === current ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.35)',
              }}
              aria-label={`Go to slide ${i + 1}`}
            >
              {i === current && (
                <div
                  className="absolute inset-0 origin-left rounded-full"
                  style={{
                    width: `${progress * 100}%`,
                    backgroundColor: s.accent,
                  }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Slide counter */}
        <div className="absolute bottom-5 right-5 z-20 hidden items-center gap-2 rounded-full border border-white/15 bg-black/30 px-4 py-1.5 text-xs font-medium text-white/80 backdrop-blur-md sm:flex">
          <span className="font-bold text-white">{String(current + 1).padStart(2, '0')}</span>
          <span className="text-white/40">/</span>
          <span>{String(slides.length).padStart(2, '0')}</span>
        </div>
      </div>
    </section>
  );
}
