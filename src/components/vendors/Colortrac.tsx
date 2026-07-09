'use client';

import { useState, useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────
   THEME
───────────────────────────────────────────── */
const c = {
  bg:     '#ffffff',
  alt:    '#f9fafb',
  alt2:   '#f8fafc',
  accent: '#004E33',
  accentHover: '#003824',
  gold:   '#FEC214',
  line:   'rgba(0,0,0,0.08)',
  text:   '#0f1320',
  dim:    '#6b7280',
  mute:   '#9ca3af',
};

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const heroSlides = [
  {
    badge: 'Official Distributor',
    heading: 'SmartLF',
    accentWord: 'SCi Series.',
    desc: 'From the compact SCi 25 to the wide-format SCi 42 — SingleSensor™ technology delivering fast, high-quality scanning for CAD, maps, and technical documents.',
    cta: { label: 'View Scanners', href: '#smartlf-sci', solid: true },
    bg: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1782246611/SmartLF-SCi_42_front_no-stand_w-FADGI_800x600px-556x417-1_rkf9zk.webp',
  },
  {
    badge: 'CCD Wide Format',
    heading: 'SmartLF',
    accentWord: 'SGi Series.',
    desc: 'CCD technology without the cost — full high-definition scanning for thick media, maps, artwork, and any type of document in 36" and 44" widths.',
    cta: { label: 'View Scanners', href: '#smartlf-sgi', solid: true },
    bg: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1782246609/SmartLF-SCi_angled_800x600px-3-556x417-1_efyovn.webp',
  },
  {
    badge: 'Portable Wide Format',
    heading: 'SmartLF',
    accentWord: 'Scan!',
    desc: "The world's first truly portable wide format scanner — no PC, software, or peripherals needed. Scan on site, wherever the project takes you.",
    cta: { label: 'View Scanners', href: '#smartlf-scan', solid: true },
    bg: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1782246610/SmartLF-SCi_front_tablet_800x600px-3-556x417-1_gaq6vv.webp',
  },
];

const navLinks = [
  { label: 'SmartLF SCi',      href: '#smartlf-sci'  },
  { label: 'SmartLF SGi',      href: '#smartlf-sgi'  },
  { label: 'SmartLF ivo 6000', href: '#smartlf-ivo'  },
  { label: 'SmartLF Scan!',    href: '#smartlf-scan' },
  { label: 'Other Scanners',   href: '#other-scanners'},
];

const sciCards = [
  {
    tag: '42" Wide Format',
    title: 'SmartLF SCi 42',
    slug: 'smartlf-sci-42',
    desc: 'Delivers high quality and speed for everyday scanning tasks.',
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1782246611/SmartLF-SCi_42_front_no-stand_w-FADGI_800x600px-556x417-1_rkf9zk.webp',
    features: [
      'Perfect for engineering, construction, line drawings, maps and plans',
      'Vibrant color and excellent size accuracy',
      'SingleSensor™ technology for large format image quality',
      'SUREDRIVE powered soft-roller system',
      'Designed for high volume, low maintenance',
      'FADGI *** (3-star rating) with SmartWorks Imaging',
      'Energy Star® compliant',
    ],
  },
  {
    tag: '36" Wide Format',
    title: 'SmartLF SCi 36',
    slug: 'smartlf-sci-36',
    desc: 'Get the job done fast, with no stopping or waiting.',
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1782246611/SmartLF-SCi_front_800x600px-3-556x417-1_lqbjfn.webp',
    features: [
      'Perfect for engineering, construction, line drawings, maps and plans',
      'Vibrant color and excellent size accuracy',
      'SingleSensor™ technology for large format image quality',
      'SUREDRIVE powered soft-roller system',
      'Designed for high volume, low maintenance',
      'FADGI *** (3-star rating) with SmartWorks Imaging',
      'Energy Star® compliant',
    ],
  },
  {
    tag: '25" Compact',
    title: 'SmartLF SCi 25',
    slug: 'smartlf-sci-25',
    desc: 'High speed and quality for up to 25 inches.',
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1782246610/SmartLF-SCi_angled_no-stand_800x600px-556x417-1_siucmm.webp',
    features: [
      'Perfect for engineering, construction, line drawings, maps and plans',
      'Vibrant color and excellent size accuracy',
      'SingleSensor™ technology for large format image quality',
      'SUREDRIVE powered soft-roller system',
      'Designed for high volume, low maintenance',
      'FADGI *** (3-star rating) with SmartWorks Imaging',
      'Energy Star® compliant',
    ],
  },
];

const ivoTabs = [
  {
    id: 'overview',
    label: 'Overview',
    heading: 'SmartLF ivo 6000',
    intro: 'Contact-free large format scanning for artwork, PCBs, textiles, framed pieces, and any delicate or thick media — no physical contact with the original required.',
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1783615710/SmartLF-ivo-6000_Contact-free-large-format-art-scanner_Sideview_Artwork_Stock_Teal-image-1_xxo23g.webp',
    cardTitle: 'Contact-Free Scanning',
    slug: 'smartlf-ivo-6000',
    points: [
      'Scan sizes up to 42 × 60 × 5.1"',
      'Up to 1200 dpi high optical resolution',
      'No physical contact with original media',
      'Ideal for framed art, PCBs, textiles, and thick media',
      'Energy Star 3.0 certified',
    ],
  },
  {
    id: 'colour',
    label: 'Colour Accuracy',
    heading: 'Colour Accuracy',
    intro: 'ICC Color Management powered by X-Rite® combined with closed loop calibration ensures your scanned output is accurately matched to your printer.',
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1782246609/FADGI-3-star_800x600px-556x417-1_kqkklm.webp',
    cardTitle: 'ICC & X-Rite® Colour',
    points: [
      'ICC Color Management powered by X-Rite®',
      'Includes closed loop calibration (CLC)',
      'Pairs scanned input with your printer output',
      'Ideal for fine art reprographics and print inspection',
      'Consistent, accurate colour reproduction',
    ],
  },
  {
    id: 'lighting',
    label: '3D Lighting',
    heading: '3D Surface Effect',
    intro: 'Four configurable angles of lighting produce a versatile 3D surface effect — revealing texture, relief, and detail invisible under standard flat illumination.',
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1782246609/SmartLF-SCi_angled_800x600px-3-556x417-1_efyovn.webp',
    cardTitle: 'Versatile 3D Lighting',
    points: [
      'Four options for different angles of lighting',
      'Reveals surface texture, relief, and fine detail',
      'Ideal for apparel, embossed, and relief artwork',
      'PCB quality inspection under raking light',
      'Captures what flat scanners miss',
    ],
  },
  {
    id: 'compliance',
    label: 'Compliance',
    heading: 'Standards & Compliance',
    intro: 'The SmartLF ivo 6000 meets the highest digitization standards — FADGI 4-star, ISO 19264-1, and Energy Star 3.0 — for archival and professional use.',
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1782246609/Energy-Star_800x600px-556x417-1_tkuu63.webp',
    cardTitle: 'FADGI 4-Star & ISO Certified',
    points: [
      'Complies with FADGI (4 stars) — highest rating',
      'Meets ISO 19264-1 digitization standard',
      'Energy Star 3.0 certified',
      'Suitable for cultural heritage digitization',
      'Meets archival and museum-grade requirements',
    ],
  },
];

const scanItems = [
  {
    num: '01',
    title: 'SmartLF Scan! 24"',
    tag: 'Portable Wide Format',
    heading: 'SmartLF Scan! 24"',
    desc: 'Small, light, easy to use, portable and self-contained. Scan up to A1/D-size drawings on site — no PC, software or peripherals required.',
    features: [
      '24" — no PC, software or peripherals required',
      'Scan to USB, internal memory or PC',
      'Designed to support collaboration and sharing',
      'Intended for technical drawings in live projects',
      'Energy Star® compliant',
    ],
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1782246609/SmartLF-SCi_angled_no-stand_800x600px-556x417-2_hjmgzn.webp',
    cap: 'SmartLF Scan! 24"',
    slug: 'smartlf-scan',
  },
  {
    num: '02',
    title: 'SmartLF Scan! 36"',
    tag: 'Portable Wide Format',
    heading: 'SmartLF Scan! 36"',
    desc: 'Full A0/E-size portable scanning on site. The 36" model handles the largest technical drawings without returning to the office.',
    features: [
      '36" — up to A0 / E size drawings',
      'No PC, software or peripherals required',
      'Scan to USB, internal memory or PC',
      'Designed to support collaboration and sharing',
      'Intended for technical drawings in live projects',
      'Energy Star® compliant',
    ],
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1782246609/SmartLF-SCi_front_800x600px-3-556x417-2_manzaq.webp',
    cap: 'SmartLF Scan! 36"',
    slug: 'smartlf-scan',
  },
];

const otherCards = [
  {
    tag: '42" MFP Solution',
    title: 'SCi 42 Professional MFP Solution',
    slug: 'smartlf-sci-42-professional-mfp-solution',
    desc: 'Ultra-compact 42" wide format copier for E-size / A0 drawings, combined with SmartWorks TOUCH MFP scan and copy software. Ideal for: Artwork, Blueprints, CAD Drawings, Live Projects, Technical, Site Plans, Posters.',
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1782246610/SmartLF-SCi_42_front_no-stand_w-FADGI_800x600px-556x417-2_f3gafa.webp',
  },
  {
    tag: '36" MFP Solution',
    title: 'SCi 36 Professional MFP Solution',
    slug: 'smartlf-sci-36-professional-mfp-solution',
    desc: 'Flexible wide format document copier for E-size / A0 drawings in a compact footprint, powered by SmartWorks TOUCH MFP. Ideal for: Artwork, Blueprints, CAD Drawings, Live Projects, Technical, Site Plans, Posters.',
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1782246609/SmartLF-SCi_front_800x600px-3-556x417-2_manzaq.webp',
  },
  {
    tag: '25" MFP Solution',
    title: 'SCi 25 Professional MFP Solution',
    slug: 'smartlf-sci-25-professional-mfp-solution',
    desc: 'Ultra-compact 25" wide format copier for D-size / A1 drawings, powered by SmartWorks TOUCH MFP. Ideal for: Artwork, Blueprints, CAD Drawings, Live Projects, Technical, Site Plans, Posters.',
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1782246609/SmartLF-SCi_angled_no-stand_800x600px-556x417-2_hjmgzn.webp',
  },
];

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function ColortracPage() {
  const [slide, setSlide]         = useState(0);
  const [progress, setProgress]   = useState(0);
  const [isSticky, setIsSticky]   = useState(false);
  const [activeIvoTab, setActiveIvoTab] = useState(0);
  const [activeScan, setActiveScan]     = useState(0);
  const [winW, setWinW]           = useState(1200);
  const progressRef = useRef<number>(0);
  const startRef    = useRef<number>(0);
  const rafRef      = useRef<number>(0);
  const headerRef   = useRef<HTMLDivElement>(null);
  const sliderRef   = useRef<HTMLDivElement>(null);
  const DURATION    = 5000;
  const isMobile  = winW < 768;
  const isTablet  = winW < 900;

  /* ── SLIDE TIMER ── */
  useEffect(() => {
    function tick(ts: number) {
      if (!startRef.current) startRef.current = ts;
      const pct = Math.min(((ts - startRef.current) / DURATION) * 100, 100);
      progressRef.current = pct;
      setProgress(pct);
      if (pct < 100) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setSlide(s => (s + 1) % heroSlides.length);
      }
    }
    startRef.current = 0;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [slide]);

  /* ── WINDOW WIDTH ── */
  useEffect(() => {
    function onResize() { setWinW(window.innerWidth); }
    setWinW(window.innerWidth);
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  /* ── STICKY SUBNAV ── */
  useEffect(() => {
    function onScroll() {
      const sliderH = sliderRef.current ? sliderRef.current.offsetHeight : 0;
      setIsSticky(window.scrollY >= sliderH);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── SUBNAV BODY CLASS ── */
  useEffect(() => {
    if (isSticky) {
      document.body.classList.add('ka-subnav-active');
    } else {
      document.body.classList.remove('ka-subnav-active');
    }
    return () => document.body.classList.remove('ka-subnav-active');
  }, [isSticky]);

  /* ── SCROLL REVEAL ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('ct-visible');
          observer.unobserve(e.target);
        }
      }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.ct-reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  function goTo(idx: number) {
    setSlide(((idx % heroSlides.length) + heroSlides.length) % heroSlides.length);
  }

  const sl = heroSlides[slide];

  return (
    <>
      <style>{`
        @keyframes ctPulse {
          0%,100%{ opacity:1; transform:scale(1); }
          50%{ opacity:.5; transform:scale(.8); }
        }
        .ct-reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.65s cubic-bezier(0.22,1,0.36,1), transform 0.65s cubic-bezier(0.22,1,0.36,1);
        }
        .ct-reveal.ct-visible { opacity: 1; transform: translateY(0); }
        .ct-reveal-d1 { transition-delay: 0.12s; }
        .ct-reveal-d2 { transition-delay: 0.24s; }
        .ct-reveal-d3 { transition-delay: 0.36s; }
        @keyframes ctFadeIn { from { opacity:0; } to { opacity:1; } }
      `}</style>

      {/* ── HERO SLIDER ── */}
      <div ref={sliderRef} style={{ position: 'relative', width: '100%', height: isMobile ? 550 : 680, overflow: 'hidden', background: '#000', fontFamily: "'Poppins', sans-serif" }}>

        {heroSlides.map((s, i) => (
          <div key={i} style={{
            position: 'absolute', inset: 0,
            display: 'flex',
            alignItems: isMobile ? 'flex-end' : 'center',
            paddingBottom: isMobile ? 80 : 0,
            opacity: i === slide ? 1 : 0,
            transition: 'opacity 0.9s cubic-bezier(0.77,0,0.175,1)',
            zIndex: i === slide ? 2 : 1,
          }}>
            {/* BG */}
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: `url('${s.bg}')`,
              backgroundSize: 'cover', backgroundPosition: 'center',
              transform: i === slide ? 'scale(1)' : 'scale(1.06)',
              transition: 'transform 6s ease',
              filter: 'brightness(0.38)',
            }} />
            {/* gradient overlay */}
            <div style={{
              position: 'absolute', inset: 0,
              background: isMobile
                ? 'linear-gradient(180deg, transparent 10%, rgba(0,0,0,0.85) 70%)'
                : 'linear-gradient(90deg, rgba(0,0,0,0.72) 38%, transparent 80%)',
              zIndex: 0,
            }} />
            {/* content */}
            <div style={{ position: 'relative', zIndex: 3, width: '100%', maxWidth: 1220, margin: '0 auto', padding: '0 24px' }}>
              <div style={{
                maxWidth: isMobile ? '100%' : 580,
                opacity: i === slide ? 1 : 0,
                transform: i === slide ? 'translateY(0)' : 'translateY(24px)',
                transition: 'opacity 0.7s ease 0.4s, transform 0.7s ease 0.4s',
              }}>
                {/* badge */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                  <span style={{
                    display: 'inline-block', background: c.accent, color: '#fff',
                    fontSize: isMobile ? 10 : 11, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase',
                    padding: isMobile ? '4px 10px' : '5px 12px', borderRadius: 2,
                  }}>{s.badge}</span>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: c.gold, animation: 'ctPulse 2s infinite', display: 'inline-block' }} />
                </div>
                {/* heading */}
                <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: isMobile ? 'clamp(34px,10vw,48px)' : 'clamp(48px,6vw,78px)', color: '#fff', lineHeight: 0.95, marginBottom: 16, fontWeight: 700, letterSpacing: 1 }}>
                  {s.heading}<br />
                  <span style={{ color: c.gold }}>{s.accentWord}</span>
                </h1>
                {/* desc */}
                <p style={{ fontSize: isMobile ? 13 : 15, color: 'rgba(255,255,255,0.72)', lineHeight: 1.6, marginBottom: isMobile ? 22 : 32, fontWeight: 300, maxWidth: isMobile ? '100%' : 420 }}>
                  {s.desc}
                </p>
                {s.cta && (
                  <a href={s.cta.href}
                     onClick={e => { e.preventDefault(); document.querySelector(s.cta!.href)?.scrollIntoView({ behavior: 'smooth' }); }}
                     style={{
                    display: 'inline-block', padding: isMobile ? '10px 20px' : '13px 28px',
                    background: s.cta.solid ? '#fff' : 'transparent',
                    color: s.cta.solid ? '#0d0d0d' : '#fff',
                    border: '2px solid #fff',
                    fontSize: isMobile ? 12 : 13, fontWeight: 600, letterSpacing: 1,
                    textTransform: 'uppercase', textDecoration: 'none', cursor: 'pointer',
                  }}>{s.cta.label}</a>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* dots */}
        <div style={{
          position: 'absolute', bottom: isMobile ? 34 : 28,
          left: isMobile ? 24 : '50%',
          transform: isMobile ? 'none' : 'translateX(calc(-570px + 20px))',
          display: 'flex', gap: 10, zIndex: 10,
        }}>
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} style={{
              width: 10, height: 10, borderRadius: '50%', border: 'none', padding: 0, cursor: 'pointer',
              background: i === slide ? c.accent : 'rgba(255,255,255,0.35)',
              transform: i === slide ? 'scale(1.3)' : 'scale(1)',
              transition: 'background 0.3s, transform 0.3s',
            }} />
          ))}
        </div>

        {/* progress bar */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, height: 3, background: c.accent, width: `${progress}%`, zIndex: 10, transition: 'width 0.1s linear' }} />
      </div>

      {/* ── STICKY SUBNAV ── */}
      <div ref={headerRef} style={{
        position: isSticky ? 'fixed' : 'relative',
        top: isSticky ? 0 : undefined,
        left: 0, right: 0,
        width: '100%',
        background: '#fff',
        borderBottom: '1px solid rgba(0,0,0,0.09)',
        boxShadow: isSticky ? '0 2px 20px rgba(0,0,0,0.12)' : 'none',
        transition: 'box-shadow 0.3s ease',
        zIndex: 9999,
        fontFamily: "'Poppins', sans-serif",
      }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: isMobile ? '0 16px' : '0 20px', height: isMobile ? 52 : 58, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: isMobile ? 12 : 20, overflow: 'hidden' }}>
          {/* links */}
          <div style={{ display: 'flex', alignItems: 'center', flex: 1, gap: isMobile ? 4 : 28, overflowX: 'auto', scrollbarWidth: 'none' }}>
            {navLinks.map((lnk, i) => (
              <a key={i} href={lnk.href} style={{
                fontSize: isMobile ? 12 : 13, fontWeight: 500, color: '#111', textDecoration: 'none',
                whiteSpace: 'nowrap', padding: isMobile ? '4px 10px' : '4px 0', position: 'relative',
                letterSpacing: 0.15, transition: 'color 0.2s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = c.accent;
                (el.querySelector('.ct-underline') as HTMLElement | null)?.style.setProperty('width', '100%');
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = '#111';
                (el.querySelector('.ct-underline') as HTMLElement | null)?.style.setProperty('width', '0');
              }}>
                {lnk.label}
                <span className="ct-underline" style={{
                  position: 'absolute', bottom: 0, left: 0, width: 0, height: 2,
                  background: c.accent, borderRadius: 2, transition: 'width 0.25s ease',
                }} />
              </a>
            ))}
          </div>
          {/* CTA */}
          <a href="#smartlf-ivo" style={{
            flexShrink: 0, padding: isMobile ? '7px 14px' : '10px 22px', background: c.accent, color: c.gold,
            fontSize: isMobile ? 12 : 13, fontWeight: 600, letterSpacing: 0.2, textDecoration: 'none',
            borderRadius: 50, whiteSpace: 'nowrap', transition: 'background 0.2s, transform 0.15s',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = c.accentHover; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = c.accent; }}>
            Get a Quote
          </a>
        </div>
      </div>
      {isSticky && <div style={{ height: isMobile ? 52 : 58 }} />}

      {/* ══ SECTION 1: SmartLF SCi — 3 CARDS ══ */}
      <section id="smartlf-sci" style={{ width: '100%', background: c.alt, padding: isMobile ? '40px 16px' : '72px 20px', fontFamily: "'Poppins', sans-serif" }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div className="ct-reveal" style={{ textAlign: 'center', marginBottom: isMobile ? 28 : 48 }}>
            <h2 style={{ fontSize: isMobile ? 24 : 36, fontWeight: 700, color: c.text, marginBottom: 14 }}>SmartLF SCi</h2>
            <p style={{ fontSize: isMobile ? 14 : 15, color: c.dim, lineHeight: 1.65, maxWidth: 560, margin: '0 auto' }}>
              SingleSensor™ wide format scanners delivering high quality and speed for everyday scanning tasks — engineering, construction, maps, and plans.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : 'repeat(3, 1fr)', gap: isMobile ? 20 : 24 }}>
            {sciCards.map((card, i) => (
              <div key={i} className={`ct-reveal ct-reveal-d${i + 1}`} style={{
                background: '#fff', borderRadius: 16, border: `1px solid ${c.line}`, overflow: 'hidden',
                boxShadow: '0 2px 16px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column',
                transition: 'box-shadow 0.3s ease, transform 0.3s ease',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.12)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 16px rgba(0,0,0,0.06)'; }}>
                {/* image */}
                <div style={{ width: '100%', height: 220, overflow: 'hidden', background: '#f8f9fb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={card.image} alt={card.title} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 16, display: 'block', transition: 'transform 0.5s ease' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; }} />
                </div>
                {/* body */}
                <div style={{ padding: '24px 24px 28px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: c.accent, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 8 }}>{card.tag}</p>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: c.text, marginBottom: 10, lineHeight: 1.3 }}>{card.title}</h3>
                  <p style={{ fontSize: 13.5, color: c.dim, lineHeight: 1.65, marginBottom: 16 }}>{card.desc}</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 7 }}>
                    {card.features.map((f, j) => (
                      <li key={j} style={{ fontSize: 13, fontWeight: 500, color: '#374151', paddingLeft: 16, position: 'relative', lineHeight: 1.4 }}>
                        <span style={{ position: 'absolute', left: 0, top: 6, width: 6, height: 6, borderRadius: '50%', background: c.accent, display: 'inline-block' }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div style={{ marginTop: 20 }}>
                    <a href={`/colortrac/${card.slug}`}
                       style={{ display: 'inline-block', fontSize: 13, fontWeight: 600, padding: '7px 18px', border: `1.5px solid ${c.accent}`, color: c.accent, borderRadius: 4, textDecoration: 'none', transition: 'background 0.2s, color 0.2s' }}
                       onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = c.accent; el.style.color = '#fff'; }}
                       onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = 'transparent'; el.style.color = c.accent; }}>
                      View Product
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 2: SmartLF SGi — ALTERNATING ══ */}
      <section id="smartlf-sgi" style={{ width: '100%', background: c.bg, padding: isMobile ? '48px 16px' : '80px 20px', fontFamily: "'Poppins', sans-serif" }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div className="ct-reveal" style={{ marginBottom: isMobile ? 32 : 64 }}>
            <h2 style={{ fontSize: isMobile ? 22 : 34, fontWeight: 700, color: c.text, marginBottom: 12 }}>SmartLF SGi</h2>
            <p style={{ fontSize: isMobile ? 14 : 16, color: '#64748b', maxWidth: 700, lineHeight: 1.7 }}>
              The SmartLF SGi scanner series gives you the benefit of CCD technology without the cost — delivering full high-definition scanning for thick media and demanding documents.
            </p>
          </div>

          <div className="ct-reveal ct-reveal-d1" style={{ display: 'flex', flexDirection: isTablet ? 'column' : 'row', alignItems: isTablet ? 'stretch' : 'center', gap: isTablet ? 36 : 80, padding: isTablet ? '36px 0' : '60px 0', borderBottom: `1px solid #f1f5f9` }}>
            <div style={{ flex: 1 }}>
              <h4 style={{ fontSize: 12, fontWeight: 700, color: c.accent, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 10 }}>CCD Wide Format</h4>
              <h3 style={{ fontSize: isMobile ? 20 : 28, fontWeight: 700, color: c.text, marginBottom: 14, lineHeight: 1.2 }}>SmartLF SGi Series</h3>
              <p style={{ fontSize: 15, color: '#64748b', lineHeight: 1.75, marginBottom: 24 }}>
                SmartLF SGi thick-media scanners deliver full high-definition. Perfect for any type of document.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {['Perfect for any type of document', 'Realistic color and excellent size accuracy', 'Accepts thick media up to 15mm', 'Designed for high volume, low maintenance', 'Choose between 36" and 44"', 'FADGI *** (3-star rating) with SmartWorks Imaging', 'Energy Star® compliant'].map((f, i) => (
                  <li key={i} style={{ fontSize: 14, fontWeight: 500, color: '#374151', paddingLeft: 18, position: 'relative', lineHeight: 1.5 }}>
                    <span style={{ position: 'absolute', left: 0, top: 7, width: 7, height: 7, borderRadius: '50%', background: c.accent, display: 'inline-block' }} />
                    {f}
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: 24 }}>
                <a href="/colortrac/smartlf-sgi"
                   style={{ display: 'inline-block', fontSize: 13, fontWeight: 600, padding: '7px 18px', border: `1.5px solid ${c.accent}`, color: c.accent, borderRadius: 4, textDecoration: 'none', transition: 'background 0.2s, color 0.2s' }}
                   onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = c.accent; el.style.color = '#fff'; }}
                   onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = 'transparent'; el.style.color = c.accent; }}>
                  View Product
                </a>
              </div>
            </div>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src="https://res.cloudinary.com/df52xzi3y/image/upload/v1782246610/SmartLF-SCi_front_tablet_800x600px-3-556x417-1_gaq6vv.webp"
                alt="SmartLF SGi Series"
                style={{ width: '100%', maxWidth: 420, height: isMobile ? 200 : isTablet ? 240 : 320, objectFit: 'contain', borderRadius: 16 }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 3A: SmartLF ivo 6000 — DARK + FORM ══ */}
      <section id="smartlf-ivo" style={{ width: '100%', background: 'linear-gradient(90deg, #002a1c, #004E33)', padding: isMobile ? '60px 16px' : '80px 20px', color: '#fff', fontFamily: "'Poppins', sans-serif" }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', display: 'grid', gridTemplateColumns: isTablet ? '1fr' : '1fr 420px', gap: isTablet ? 40 : 60, alignItems: 'center' }}>
          {/* left */}
          <div className="ct-reveal">
            <h2 style={{ fontSize: isMobile ? 24 : 36, fontWeight: 700, marginBottom: 20, color: '#fff', lineHeight: 1.2 }}>SmartLF ivo 6000</h2>
            <p style={{ fontSize: 15, color: '#cbd5e1', lineHeight: 1.7, marginBottom: 20 }}>
              A next-generation, contact-free large format scanner designed for the digitization of artwork, large format PCBs, textiles, framed art pieces, and other delicate or thick media.
            </p>
            <div style={{ fontSize: 14, color: '#cbd5e1', lineHeight: 2 }}>
              <strong style={{ color: '#fff', fontSize: 13, letterSpacing: 0.5, textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Ideal for scanning</strong>
              • Contact-free scanning &amp; Fine art reprographics<br />
              • Artwork, Apparel &amp; Posters<br />
              • PCB quality inspection &amp; Print inspection<br />
              • Thick Media &amp; delicate originals
            </div>
          </div>
          {/* form */}
          <div className="ct-reveal ct-reveal-d1" style={{ background: 'rgba(255,255,255,0.06)', padding: isMobile ? 22 : 30, borderRadius: 14, border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)' }}>
            <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 20, color: '#fff' }}>Inquire for Distribution</h3>
            <IvoForm accentGold={c.gold} accentGreen={c.accent} />
          </div>
        </div>
      </section>

      {/* ══ SECTION 3B: SmartLF ivo 6000 — TABS ══ */}
      <section style={{ background: c.alt2, width: '100%', fontFamily: "'Poppins', sans-serif" }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '40px 16px' : '72px 20px' }}>
          {/* tab nav */}
          <div className="ct-reveal" style={{ display: 'flex', flexWrap: 'wrap', borderBottom: '2px solid #eee', marginBottom: 40, gap: 10 }}>
            {ivoTabs.map((tab, i) => (
              <button key={i} onClick={() => setActiveIvoTab(i)} style={{
                padding: '15px 22px', cursor: 'pointer', fontWeight: 700, fontSize: 14,
                textTransform: 'uppercase', letterSpacing: 1,
                color: activeIvoTab === i ? c.accent : '#888',
                border: 'none', background: 'none', fontFamily: "'Poppins', sans-serif",
                position: 'relative',
              }}>
                {tab.label}
                {activeIvoTab === i && (
                  <span style={{ position: 'absolute', bottom: -2, left: 0, width: '100%', height: 3, background: c.accent, display: 'block' }} />
                )}
              </button>
            ))}
          </div>
          {/* tab panel */}
          {ivoTabs.map((tab, i) => (
            <div key={i} style={{
              display: activeIvoTab === i ? 'grid' : 'none',
              gridTemplateColumns: isTablet ? '1fr' : '1fr 2fr', gap: isTablet ? 28 : 50,
              animation: 'ctFadeIn 0.5s ease',
            }}>
              <div>
                <h2 style={{ fontSize: isMobile ? 22 : 34, color: '#000', marginBottom: 20, lineHeight: 1.2, fontWeight: 700 }}>{tab.heading}</h2>
                <p style={{ fontSize: 15, lineHeight: 1.8, color: '#555' }}>{tab.intro}</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 28 }}>
                <div style={{ background: '#fff', border: '1px solid #eee', padding: 24, textAlign: 'left', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
                  <img src={tab.image} alt={tab.cardTitle} style={{ width: '100%', height: 200, objectFit: 'contain', marginBottom: 16, borderRadius: 6, padding: 12 }} />
                  <h4 style={{ fontSize: 18, marginBottom: 12, color: '#000', fontWeight: 700 }}>{tab.cardTitle}</h4>
                  <p style={{ fontSize: 14, lineHeight: 1.9, color: '#555' }}>
                    {tab.points.map((pt, j) => (
                      <span key={j}>• {pt}<br /></span>
                    ))}
                  </p>
                  {'slug' in tab && (
                    <div style={{ marginTop: 16 }}>
                      <a href={`/colortrac/${tab.slug}`}
                         style={{ display: 'inline-block', fontSize: 13, fontWeight: 600, padding: '7px 18px', border: `1.5px solid ${c.accent}`, color: c.accent, borderRadius: 4, textDecoration: 'none', transition: 'background 0.2s, color 0.2s' }}
                         onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = c.accent; el.style.color = '#fff'; }}
                         onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = 'transparent'; el.style.color = c.accent; }}>
                        View Product
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ SECTION 4: SmartLF Scan! — ACCORDION ══ */}
      <section id="smartlf-scan" style={{ width: '100%', background: c.alt, padding: isMobile ? '40px 16px' : '72px 20px', fontFamily: "'Poppins', sans-serif" }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div className="ct-reveal" style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: isMobile ? 22 : 34, fontWeight: 700, color: '#000', marginBottom: 6 }}>SmartLF Scan!</h2>
            <p style={{ fontSize: 15, color: c.dim }}>The world's first truly portable wide format scanner — scan anywhere, no PC or software required.</p>
          </div>
          <div className="ct-reveal ct-reveal-d1" style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', border: `1px solid #e5e7eb`, borderRadius: 8, overflow: 'hidden', minHeight: isMobile ? 'auto' : 460 }}>
            {/* list */}
            <div style={{ borderRight: isMobile ? 'none' : '1px solid #e5e7eb', borderBottom: isMobile ? '1px solid #e5e7eb' : 'none', display: 'flex', flexDirection: 'column', background: '#fff' }}>
              {scanItems.map((item, i) => (
                <div key={i} onClick={() => setActiveScan(i)} style={{
                  borderBottom: i < scanItems.length - 1 ? '1px solid #e5e7eb' : 'none',
                  cursor: 'pointer',
                  background: activeScan === i ? '#e6f2ed' : '#fff',
                  transition: 'background 0.2s',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '18px 24px' }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: c.accent, letterSpacing: 1, minWidth: 24 }}>{item.num}</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: activeScan === i ? c.accent : '#1f2937', flex: 1, lineHeight: 1.4 }}>{item.title}</span>
                    <span style={{ fontSize: 18, color: activeScan === i ? c.accent : '#d1d5db', transform: activeScan === i ? 'rotate(90deg)' : 'none', transition: 'transform 0.3s, color 0.3s' }}>›</span>
                  </div>
                </div>
              ))}
            </div>
            {/* panel */}
            <div style={{ background: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
              {scanItems.map((item, i) => (
                <div key={i} style={{ display: activeScan === i ? 'flex' : 'none', flexDirection: 'column', height: '100%', padding: 36, gap: 20 }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: c.accent, textTransform: 'uppercase', letterSpacing: 1, margin: 0 }}>{item.tag}</p>
                  <h3 style={{ fontSize: 22, fontWeight: 700, color: c.text, margin: '6px 0 10px', lineHeight: 1.3 }}>{item.heading}</h3>
                  <p style={{ fontSize: 14, color: c.dim, lineHeight: 1.75, margin: 0 }}>{item.desc}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {item.features.map((f, j) => (
                      <div key={j} style={{ fontSize: 13, color: '#374151', display: 'flex', alignItems: 'flex-start', gap: 8, lineHeight: 1.5 }}>
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: c.accent, flexShrink: 0, marginTop: 6, display: 'inline-block' }} />
                        {f}
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: 12, marginTop: 'auto', paddingTop: 20 }}>
                    <div style={{ flex: 1, borderRadius: 6, overflow: 'hidden', border: '1px solid #e5e7eb', background: '#fff' }}>
                      <img src={item.image} alt={item.cap} style={{ width: '100%', height: 180, objectFit: 'contain', display: 'block', padding: 10 }} />
                      <a href={`/colortrac/${item.slug}`} style={{ display: 'block', fontSize: 11, fontWeight: 700, textAlign: 'center', background: c.accent, color: c.gold, padding: '6px 0', letterSpacing: 0.5, textTransform: 'uppercase', textDecoration: 'none' }}>
                        View Product
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 5: OTHER SCANNERS ══ */}
      <section id="other-scanners" style={{ width: '100%', background: c.bg, padding: isMobile ? '40px 16px' : '80px 20px', fontFamily: "'Poppins', sans-serif" }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div className="ct-reveal" style={{ marginBottom: isMobile ? 28 : 48 }}>
            <h2 style={{ fontSize: isMobile ? 22 : 34, fontWeight: 700, color: c.text, marginBottom: 10 }}>Other Scanners</h2>
            <p style={{ fontSize: 15, color: c.dim, lineHeight: 1.7, maxWidth: 600 }}>
              Ultra-compact wide format scan and copy systems — SmartLF SCi scanners combined with SmartWorks TOUCH MFP software for flexible document workflow.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap: isMobile ? 14 : 24 }}>
            {otherCards.map((card, i) => (
              <div key={i} className={`ct-reveal ct-reveal-d${i + 1}`} style={{
                background: c.alt, borderRadius: 16, border: '1px solid #e5e7eb', padding: '28px 20px',
                textAlign: 'center', transition: 'box-shadow 0.3s ease, transform 0.3s ease',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 28px rgba(0,78,51,0.10)`; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; }}>
                <img src={card.image} alt={card.title} style={{ width: '100%', height: 140, objectFit: 'contain', marginBottom: 18 }} />
                <p style={{ fontSize: 11, fontWeight: 700, color: c.accent, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 8 }}>{card.tag}</p>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: c.text, marginBottom: 8 }}>{card.title}</h3>
                <p style={{ fontSize: 13, color: c.dim, lineHeight: 1.6, marginBottom: 16 }}>{card.desc}</p>
                <a href={`/colortrac/${card.slug}`}
                   style={{ display: 'inline-block', fontSize: 13, fontWeight: 600, padding: '7px 18px', border: `1.5px solid ${c.accent}`, color: c.accent, borderRadius: 4, textDecoration: 'none', transition: 'background 0.2s, color 0.2s' }}
                   onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = c.accent; el.style.color = '#fff'; }}
                   onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = 'transparent'; el.style.color = c.accent; }}>
                  View Product
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ── IVO FORM (isolated to avoid re-render on tab/accordion state) ── */
function IvoForm({ accentGold, accentGreen }: { accentGold: string; accentGreen: string }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;
    try {
      const res = await fetch('https://formspree.io/f/xdajrzpv', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form),
      });
      setStatus(res.ok ? 'done' : 'error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'done') return (
    <p style={{ color: '#86efac', fontSize: 15, textAlign: 'center', padding: '20px 0' }}>
      Thank you! We'll be in touch shortly.
    </p>
  );

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <input name="name" type="text" placeholder="Full Name" required style={{ width: '100%', padding: '12px 14px', borderRadius: 6, border: 'none', background: 'rgba(255,255,255,0.12)', color: '#fff', fontSize: 14, outline: 'none' }} />
      <input name="email" type="email" placeholder="Business Email" required style={{ width: '100%', padding: '12px 14px', borderRadius: 6, border: 'none', background: 'rgba(255,255,255,0.12)', color: '#fff', fontSize: 14, outline: 'none' }} />
      <select name="category" required style={{ width: '100%', padding: '12px 14px', borderRadius: 6, border: 'none', background: 'rgba(255,255,255,0.12)', color: '#e5e7eb', fontSize: 14, outline: 'none' }}>
        <option value="" style={{ background: '#fff', color: '#000' }}>Select Product Category</option>
        <option style={{ background: '#fff', color: '#000' }}>SmartLF SCi 42</option>
        <option style={{ background: '#fff', color: '#000' }}>SmartLF SCi 36</option>
        <option style={{ background: '#fff', color: '#000' }}>SmartLF SCi 25</option>
        <option style={{ background: '#fff', color: '#000' }}>SmartLF SGi Series</option>
        <option style={{ background: '#fff', color: '#000' }}>SmartLF ivo 6000</option>
        <option style={{ background: '#fff', color: '#000' }}>SmartLF Scan!</option>
        <option style={{ background: '#fff', color: '#000' }}>Professional MFP Solution</option>
      </select>
      <button type="submit" disabled={status === 'sending'} style={{ marginTop: 10, padding: 13, background: accentGold, color: accentGreen, fontWeight: 700, border: 'none', borderRadius: 6, cursor: 'pointer', letterSpacing: 1, transition: 'all 0.3s ease', fontSize: 14 }}>
        {status === 'sending' ? 'SENDING…' : 'SEND INQUIRY'}
      </button>
      {status === 'error' && <p style={{ color: '#fca5a5', fontSize: 13, textAlign: 'center' }}>Something went wrong. Please try again.</p>}
    </form>
  );
}
