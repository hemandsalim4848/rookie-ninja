'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

const slides = [
  {
    id: 1,
    label: 'Value Added Distribution',
    heading: 'Empowering the',
    highlight: 'Middle East & Africa',
    sub: 'Cutting-edge technology solutions and world-class distribution partnerships across MEA.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1800&q=80',
    cta: { label: 'Contact Us', href: '/contact' },
    ctaGhost: { label: 'View Portfolio', href: '/portfolio' },
  },
  {
    id: 2,
    label: 'Technology Distribution',
    heading: 'Connecting Brands to',
    highlight: 'Channel Partners',
    sub: 'We represent the best-known IT brands — delivering sales, pre-sales and after-sales support across 42+ countries.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1800&q=80',
    cta: { label: 'Our Vendors', href: '/vendors' },
    ctaGhost: { label: 'Learn More', href: '/about' },
  },
  {
    id: 3,
    label: 'Adept · Agile · Awesome',
    heading: 'A Partner Built for',
    highlight: 'Your Growth',
    sub: 'From print and scan to cybersecurity and gaming — we distribute across every major IT category with speed and precision.',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1800&q=80',
    cta: { label: 'Our Solutions', href: '/portfolio' },
    ctaGhost: { label: 'Why Rookie Ninja', href: '/about' },
  },
];

const stats = [
  { target: 15, label: 'Years Active'    },
  { target: 40, label: 'Vendor Partners' },
  { target: 12, label: 'Countries'       },
];

export default function Hero() {
  const [current, setCurrent]   = useState(0);
  const [prev, setPrev]         = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);
  const [progress, setProgress] = useState(0);
  const statsRef                = useRef<HTMLDivElement>(null);
  const intervalRef             = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef             = useRef<ReturnType<typeof setInterval> | null>(null);
  const DURATION                = 5000;

  const goTo = useCallback((index: number) => {
    if (animating || index === current) return;
    setPrev(current);
    setCurrent(index);
    setAnimating(true);
    setProgress(0);
    setTimeout(() => {
      setPrev(null);
      setAnimating(false);
    }, 800);
  }, [animating, current]);

  const next = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, goTo]);

  // Auto advance
  useEffect(() => {
    const startProgress = () => {
      setProgress(0);
      progressRef.current = setInterval(() => {
        setProgress(p => {
          if (p >= 100) return 100;
          return p + (100 / (DURATION / 50));
        });
      }, 50);
    };

    intervalRef.current = setInterval(next, DURATION);
    startProgress();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [next]);

  // Reset on slide change
  useEffect(() => {
    if (progressRef.current) clearInterval(progressRef.current);
    setProgress(0);
    progressRef.current = setInterval(() => {
      setProgress(p => Math.min(100, p + (100 / (DURATION / 50))));
    }, 50);
    return () => { if (progressRef.current) clearInterval(progressRef.current); };
  }, [current]);

  // Count-up
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          entry.target.querySelectorAll<HTMLElement>('[data-target]').forEach(el => {
            countUp(el, parseInt(el.dataset.target ?? '0'), 1800);
          });
        });
      },
      { threshold: 0.4 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const slide     = slides[current];
  const prevSlide = prev !== null ? slides[prev] : null;

  return (
    <section className="relative min-h-screen overflow-hidden bg-navy">

      {/* ── Slide images ── */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          className="absolute inset-0 z-0 transition-opacity duration-[800ms]"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img src={s.image} alt={s.heading}
               className="w-full h-full object-cover" />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0"
               style={{
                 background: 'linear-gradient(105deg, rgba(8,18,34,0.92) 0%, rgba(8,18,34,0.7) 50%, rgba(8,18,34,0.4) 100%)'
               }} />
        </div>
      ))}

      {/* ── Dot grid ── */}
      <div className="absolute inset-0 z-[1] pointer-events-none"
           style={{
             backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
             backgroundSize: '36px 36px',
           }} />

      {/* ── Main content ── */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6
                      flex flex-col justify-center min-h-screen
                      pt-[100px] pb-[120px]">

        <div className="max-w-2xl">

          {/* Label pill */}
          <div
            key={`label-${current}`}
            className="inline-flex items-center gap-2 text-[10.5px] font-medium
                       tracking-[0.15em] uppercase text-accent mb-7 px-3.5
                       py-1.5 pl-2 rounded-full border border-[rgba(21,167,220,0.25)]
                       bg-[rgba(21,167,220,0.12)] animate-fade-up">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-blink-dot" />
            {slide.label}
          </div>

          {/* Heading */}
          <h1
            key={`heading-${current}`}
            className="font-display font-bold text-white leading-[1.08]
                       tracking-[-0.025em] mb-6 animate-fade-up
                       text-[clamp(36px,5.5vw,66px)]">
            {slide.heading}<br />
            <span className="text-accent">{slide.highlight}</span>
          </h1>

          {/* Subtitle */}
          <p
            key={`sub-${current}`}
            className="font-body text-[16px] font-light text-white/65
                       leading-[1.75] mb-10 max-w-[480px] animate-fade-up">
            {slide.sub}
          </p>

          {/* CTAs */}
          <div
            key={`cta-${current}`}
            className="flex items-center gap-3 flex-wrap animate-fade-up
                       max-sm:flex-col max-sm:items-stretch">
            <a href={slide.cta.href}
               className="inline-flex items-center justify-center gap-2
                          font-body text-sm font-medium text-white bg-accent
                          px-7 py-3.5 rounded-xl no-underline accent-glow
                          transition-all duration-200
                          hover:opacity-90 hover:-translate-y-0.5">
              {slide.cta.label}
              <ArrowIcon />
            </a>
            <a href={slide.ctaGhost.href}
               className="inline-flex items-center justify-center gap-2
                          font-body text-sm text-white/70
                          border border-white/[0.15] px-6 py-3.5 rounded-xl
                          no-underline transition-all duration-200
                          hover:text-white hover:border-white/[0.3]
                          hover:bg-white/[0.07]">
              {slide.ctaGhost.label}
            </a>
          </div>

        </div>


      </div>

      {/* ── Slide controls — bottom right ── */}
      <div className="absolute bottom-10 right-6 z-20
                      max-w-6xl mx-auto flex flex-col items-end gap-4"
           style={{ right: 'max(24px, calc((100vw - 72rem) / 2 + 24px))' }}>

        {/* Slide counter */}
        <div className="flex items-center gap-3">
          <span className="font-display text-[28px] font-bold text-white leading-none">
            {String(current + 1).padStart(2, '0')}
          </span>
          <div className="w-px h-8 bg-white/20" />
          <span className="font-display text-[16px] text-white/30 leading-none">
            {String(slides.length).padStart(2, '0')}
          </span>
        </div>

        {/* Progress bars + nav */}
        <div className="flex items-center gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (intervalRef.current) clearInterval(intervalRef.current);
                goTo(i);
                intervalRef.current = setInterval(next, DURATION);
              }}
              className="relative h-[3px] rounded-full overflow-hidden
                         cursor-pointer transition-all duration-300
                         bg-white/20"
              style={{ width: i === current ? '48px' : '24px' }}
            >
              {i === current && (
                <div
                  className="absolute left-0 top-0 h-full bg-accent rounded-full"
                  style={{ width: `${progress}%`, transition: 'width 0.05s linear' }}
                />
              )}
            </button>
          ))}

          {/* Prev / Next */}
          <div className="flex items-center gap-2 ml-2">
            <button
              onClick={() => {
                if (intervalRef.current) clearInterval(intervalRef.current);
                goTo((current - 1 + slides.length) % slides.length);
                intervalRef.current = setInterval(next, DURATION);
              }}
              className="w-9 h-9 rounded-full border border-white/15
                         flex items-center justify-center text-white/60
                         transition-all duration-200
                         hover:bg-white/10 hover:text-white hover:border-white/30">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M10 4L6 8l4 4" stroke="currentColor"
                      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              onClick={() => {
                if (intervalRef.current) clearInterval(intervalRef.current);
                goTo((current + 1) % slides.length);
                intervalRef.current = setInterval(next, DURATION);
              }}
              className="w-9 h-9 rounded-full border border-white/15
                         flex items-center justify-center text-white/60
                         transition-all duration-200
                         hover:bg-white/10 hover:text-white hover:border-white/30">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M6 4l4 4-4 4" stroke="currentColor"
                      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

      </div>

      {/* ── Slide thumbnails — right side ── */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20
                      hidden xl:flex flex-col gap-3"
           style={{ right: 'max(24px, calc((100vw - 72rem) / 2 - 120px))' }}>
        {slides.map((s, i) => (
          <button
            key={i}
            onClick={() => {
              if (intervalRef.current) clearInterval(intervalRef.current);
              goTo(i);
              intervalRef.current = setInterval(next, DURATION);
            }}
            className={`relative w-[80px] h-[56px] rounded-lg overflow-hidden
                        transition-all duration-300 border-2
                        ${i === current
                          ? 'border-accent scale-105 shadow-[0_0_20px_rgba(21,167,220,0.4)]'
                          : 'border-white/10 opacity-50 hover:opacity-80'}`}
          >
            <img src={s.image} alt=""
                 className="w-full h-full object-cover" />
            {i !== current && (
              <div className="absolute inset-0 bg-navy/40" />
            )}
          </button>
        ))}
      </div>

    </section>
  );
}

function countUp(el: HTMLElement, target: number, duration: number): void {
  const startTime = performance.now();
  function step(now: number): void {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);
    el.textContent = String(Math.floor(eased * target));
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = String(target);
  }
  requestAnimationFrame(step);
}

function ArrowIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
      <path d="M3 8h10M9 4l4 4-4 4"
            stroke="currentColor" strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}