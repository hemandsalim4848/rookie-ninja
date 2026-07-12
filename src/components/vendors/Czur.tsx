'use client';

import { useState, useEffect, useRef } from 'react';

const cz = {
  accent: '#0982cb',
};

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const heroSlides = [
  {
    id: 'scanners',
    badge: 'Official Distributor',
    lines: ['Scan Smarter.', 'Work Faster.'],
    accentLine: 1,
    desc: 'CZUR intelligent overhead scanners capture books, documents, and IDs in seconds — with auto-flattening, OCR, and zero binding damage.',
    cta: { label: 'Explore Scanners', href: '#book-scanners', solid: true },
    bg: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1781893191/rookie-ninja/products/et.webp',
  },
  {
    id: 'conference',
    badge: 'Conference & AV',
    lines: ['Meetings. Redefined.', 'All-in-One.'],
    accentLine: 0,
    desc: 'The CZUR StarryHub combines a 4K camera, 2400 ANSI projector, and 360° audio in a single device — no cables, no clutter.',
    cta: { label: 'View Conference Solutions', href: '#multi-function', solid: false },
    bg: 'https://products.rookie-ninja.com/wp-content/uploads/2026/01/DH-Czur-StarryHub-Product-Image-16-scaled-1-600x600-1.webp',
  },
];

// Section 3 — image switcher: Aura Scanners only
const bookScanners = [
  {
    id: 'aura-pro',
    eyebrow: 'Portable Book Scanning',
    title: 'Aura Pro',
    intro: 'Compact, eye-friendly, and powerful — designed for home users, students, and educators who scan books every day.',
    bullets: [
      '14MP CMOS | A3/A4 book scanning',
      '2-second fast scan per page',
      'Laser-assisted curve flattening',
      'OCR in 180+ languages',
      'PDF, Word, Excel export',
    ],
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1781893186/rookie-ninja/products/lg_1000p_481c29e8-feb5-4e60-ae72-62cebe1d7d29.webp',
    slug: 'czur-aura-pro-portable-book-scanner',
  },
  {
    id: 'aura-x-pro',
    eyebrow: 'Portable Book Scanning — Enhanced',
    title: 'Aura X Pro',
    intro: 'Everything in the Aura Pro, plus a foot pedal and side lighting for hands-free, glare-free scanning in any environment.',
    bullets: [
      '14MP CMOS | A3/A4 book scanning',
      'Foot pedal for hands-free page turning',
      'Side LED lights for even illumination',
      'Laser-assisted curve flattening',
      'OCR in 180+ languages',
    ],
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1783074480/rookie-ninja/products/jh4qvcedqqzyt2sbjgjz.webp',
    slug: 'czur-aura-x-pro-portable-book-scanner',
  },
];

// Section 5 — underline tabs + product cards: full ET series
const etTabs = {
  flagship: {
    heading: 'ET Max & ET Ultra',
    desc: 'Flagship overhead scanners built for offices, institutions, and content creators who need high-speed capture, intelligent correction, and real-time HDMI presentation in a single device.',
    products: [
      {
        image: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1781893191/rookie-ninja/products/et.webp',
        title: 'CZUR ET Max',
        intro: 'Two pages in 1.5s, ABBYY OCR, HDMI out — built for high-volume office and institutional scanning.',
        bullets: ['16–38MP | Two pages in 1.5s', 'A3 support | Anti-reflection LED', 'OCR by ABBYY — 180+ languages', 'HDMI + Zoom compatible', 'Barcode & QR recognition'],
        slug: 'czur-et-max',
      },
      {
        image: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1781893206/rookie-ninja/products/CZUR-ET-ULTRA.webp',
        title: 'CZUR ET Ultra',
        intro: 'Smart overhead scanning with auto page-turn detection, finger removal, and live visual presenter capability.',
        bullets: ['Dual-page capture in 1.5s | A3', 'Smart tilt + auto-crop', 'Finger removal + page completion', 'HDMI output | Zoom compatible', 'Batch PDF + auto-scan mode'],
        slug: 'czur-et-ultra',
      },
    ],
  },
  ultraclear: {
    heading: 'ET24 Pro & ET25 Pro',
    desc: 'Ultra-high-resolution professional scanners with 3-laser alignment, dual LED side lighting, and hands-free operation — for the most demanding document digitisation workflows.',
    products: [
      {
        image: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1781893215/rookie-ninja/products/et-24-pro.webp',
        title: 'CZUR ET24 Pro',
        intro: '24MP with 3-laser alignment and dual LED lighting — the professional benchmark for A3 scanning.',
        bullets: ['24MP CMOS | 5696×4272', '~1.5s per page | A3 support', '3-laser alignment | Dual LED + side lights', 'Hand button + foot pedal', 'PDF, Word, Excel export'],
        slug: 'czur-et24-pro',
      },
      {
        image: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1781893230/rookie-ninja/products/et-25-pro-bg.webp',
        title: 'CZUR ET25 Pro',
        intro: '25MP ultra-clear — the highest resolution in the ET series, with fixed-focus optics and Linux support.',
        bullets: ['25MP CMOS | 5824×4368', 'Fixed-focus optics | Dual LED + side lights', '3-laser alignment | ~1.5s scan', 'HDMI full HD output', 'Windows, macOS & Linux'],
        slug: 'czur-et25-pro',
      },
    ],
  },
  smart: {
    heading: 'ET16 Plus & ET18 Pro',
    desc: 'Reliable smart scanning for offices, libraries, schools, and personal archives — with professional-grade image processing and full HD HDMI presentation.',
    products: [
      {
        image: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1781893209/rookie-ninja/products/lg_1000p_ddc092c5-f57b-4efb-90f8-8ffcd996dd99.webp',
        title: 'CZUR ET16 Plus',
        intro: '16MP smart book scanner with ABBYY OCR and HDMI output — ideal for offices and classroom presentations.',
        bullets: ['16MP CMOS | A3 support up to 480×360mm', '~1.5s scan speed', 'OCR by ABBYY — 180+ languages', 'Auto curve flattening + finger removal', 'Full HD HDMI visual presenter'],
        slug: 'czur-et16-plus-smart-book-scanner',
      },
      {
        image: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1781893209/rookie-ninja/products/lg_1000p_ddc092c5-f57b-4efb-90f8-8ffcd996dd99.webp',
        title: 'CZUR ET18 Pro',
        intro: '18MP with auto page-turn detection — scans a full book hands-free with intelligent correction at every step.',
        bullets: ['18MP CMOS | A3 support', 'Auto page-turn detection', 'Auto curve flattening, tilt correction', 'OCR in 180+ languages', 'Full HD HDMI visual presenter'],
        slug: 'czur-et18-pro-smart-book-scanner',
      },
    ],
  },
};

// Section 6 — left-nav accordion panel (mirrors KA "Production Scanners")
const compactScanners = [
  {
    num: '01',
    navTitle: 'Shine Ultra — Portable A3 Scanner',
    tag: 'Portable A3',
    heading: 'CZUR Shine Ultra',
    desc: 'A compact A3 smart scanner with auto-focus and stepless LED dimming — ready for offices, classrooms, and personal archives.',
    features: [
      '13MP CMOS | A3 support up to 480×360mm',
      'Auto-focus lens | ≤1s scan speed',
      'Stepless LED dimming for consistent illumination',
      'Smart paging, auto-crop, tilt correction',
      'OCR 180+ languages | PDF, Word, Excel export',
      'Foot pedal control | Windows & macOS',
    ],
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1781893280/rookie-ninja/products/lg_1000p_abbf0dcb-f25a-41e0-9293-87ab66b74ecc.webp',
    slug: 'czur-shine-ultra-portable-scanner',
  },
  {
    num: '02',
    navTitle: 'Shine Ultra Pro 24MP — High-Definition A3',
    tag: 'High-Definition A3',
    heading: 'CZUR Shine Ultra Pro 24MP',
    desc: 'Ultra-high-definition A3 scanning with a foldable aluminium arm — built for offices, libraries, and education at serious scale.',
    features: [
      '24MP CMOS | 5696×4272 resolution',
      'A3 support | ≤1s scan speed',
      'Adjustable LED lighting — consistent in low light',
      'Auto-crop, tilt correction, curve flattening',
      'OCR 180+ languages | PDF, Word, Excel export',
      'Foldable aluminium arm — portable design',
    ],
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1781893286/rookie-ninja/products/61ds0n1Y7ZL__AC_SX466_.webp',
    slug: 'czur-shine-ultra-pro-24mp-document-scanner',
  },
  {
    num: '03',
    navTitle: 'Lens 1200 Pro — Compact A4 Scanner',
    tag: 'Compact A4',
    heading: 'CZUR Lens 1200 Pro',
    desc: 'A USB-C powered compact A4 scanner with zero pre-scan delay, barcode and QR recognition, and OCR in 185 languages.',
    features: [
      '12MP CMOS | A4 | ≤1s scan, zero pre-scan delay',
      'USB Type-C powered — no external adapter',
      'OCR in 185 languages | PDF, Word, Excel',
      'Barcode & QR code recognition',
      'Auto-crop, tilt correction, background purification',
      'Visual presenter + video recording',
    ],
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1781893268/rookie-ninja/products/lg_1000p_22f82602-4ebf-4425-afb3-3470afe03cfe.webp',
    slug: 'czur-lens-1200-pro',
  },
  {
    num: '04',
    navTitle: 'M3000 Pro V3 — Professional Archive Scanner',
    tag: 'Professional Archive',
    heading: 'CZUR M3000 Pro V3',
    desc: 'A professional-grade A3 overhead scanner with 48MP capture and tri-laser curve flattening — built for libraries, archives, and service centres.',
    features: [
      '48MP HD CMOS | 470 DPI optical resolution',
      'Tri-laser curve flattening | A3 support',
      'Top and side LED for uniform illumination',
      'Auto-crop, blank page detection, hole filling',
      'OCR 180+ languages | PDF, Word, Excel, TIFF',
      '2.4-inch LCD display | Foot pedal + hand button',
    ],
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1781893276/rookie-ninja/products/lg_1000p_48ec2413-e4e2-48a8-879f-ae472aabad60.webp',
    slug: 'czur-m3000-pro-v3-pro-book-scanner',
  },
];

// Section 7 — pill tabs + 2-col panels
const mfTabs = [
  {
    num: '01',
    label: 'StarryHub',
    panels: [
      {
        tag: 'All-in-One Conference System',
        title: 'CZUR StarryHub Q1S Pro',
        desc: 'Combines a 2400 ANSI DLP projector, 4K Ultra HD camera, and 360° audio array into one device. AI speaker tracking keeps the active presenter in frame automatically — no cables, no clutter.',
        features: [
          '4K Ultra HD camera | 120° wide-angle view',
          '2400 ANSI lumens DLP projector',
          'AI speaker tracking — auto framing',
          '6-mic 360° audio pickup array',
          'Wireless screen sharing | Android StarryOS',
        ],
        image: 'https://products.rookie-ninja.com/wp-content/uploads/2026/01/czur-starryhub-q1-pro-600x698-1.webp',
        slug: 'czur-starryhub-q1s-pro',
      },
    ],
  },
  {
    num: '02',
    label: 'Document & Web Camera',
    panels: [
      {
        tag: '4K Document Camera',
        title: 'CZUR Fancy S Pro',
        desc: 'One device replaces three — scans A3 documents, records 4K video at 15fps, streams Full HD 1080p at 60fps, and includes a built-in microphone for remote meetings.',
        features: [
          '12MP CMOS | 4K video at 15fps',
          '1080p 60fps webcam streaming',
          'A3 scanning area | adjustable multi-joint arm',
          'Built-in microphone',
          'Adjustable LED lighting',
        ],
        image: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1781893235/rookie-ninja/products/d4318ff39996531f594cf0978cb3c9e0_1024x1024.webp',
        slug: 'czur-fancy-s-pro',
      },
      {
        tag: 'Webcam',
        title: 'CZUR Halo X Pro',
        desc: 'Two Full HD cameras on a single device — main rotates 180°, secondary 270°. Perfect for multi-angle demonstrations, online presentations, and streaming.',
        features: [
          'Dual 1080p cameras | up to 30fps',
          'Main camera 180° + secondary 270° rotation',
          'Wide-angle lens for more coverage',
          'Built-in microphone',
          'USB plug-and-play | Windows & macOS',
        ],
        image: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1781893257/rookie-ninja/products/41LRQRCqCyL__SL1500_.webp',
        slug: 'czur-halo-x-pro',
      },
    ],
  },
];

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function CzurPage() {
  const [heroIdx, setHeroIdx]         = useState(0);
  const [progress, setProgress]       = useState(0);
  const rafRef                        = useRef<number | null>(null);
  const startRef                      = useRef<number | null>(null);
  const heroRef                       = useRef<HTMLElement>(null);
  const DURATION                      = 5000;

  const [isSticky, setIsSticky]       = useState(false);
  const [bookActive, setBookActive]   = useState(0);
  const [bookImgFade, setBookImgFade] = useState(false);
  const [etTab, setEtTab]             = useState<'flagship' | 'ultraclear' | 'smart'>('flagship');
  const [compactActive, setCompactActive] = useState(0);
  const [mfTab, setMfTab]             = useState(0);
  const [formState, setFormState]     = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  /* ── Hero progress ── */
  const tick = (ts: number) => {
    if (!startRef.current) startRef.current = ts;
    const pct = Math.min(((ts - startRef.current) / DURATION) * 100, 100);
    setProgress(pct);
    if (pct < 100) { rafRef.current = requestAnimationFrame(tick); }
    else { setHeroIdx(i => (i + 1) % heroSlides.length); }
  };
  const resetProgress = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    startRef.current = null; setProgress(0);
    rafRef.current = requestAnimationFrame(tick);
  };
  const goSlide = (n: number) => { setHeroIdx(((n % heroSlides.length) + heroSlides.length) % heroSlides.length); resetProgress(); };
  useEffect(() => { resetProgress(); return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }; }, [heroIdx]); // eslint-disable-line

  /* ── Sticky nav ── */
  useEffect(() => {
    const onScroll = () => { if (!heroRef.current) return; setIsSticky(heroRef.current.getBoundingClientRect().bottom <= 0); };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    if (isSticky) document.body.classList.add('ka-subnav-active');
    else document.body.classList.remove('ka-subnav-active');
    return () => document.body.classList.remove('ka-subnav-active');
  }, [isSticky]);

  /* ── Scroll reveal ── */
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('cz-visible'); obs.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.cz-reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  /* ── Book scanner image swap ── */
  const switchBook = (idx: number) => {
    if (idx === bookActive) return;
    setBookImgFade(true);
    setTimeout(() => { setBookActive(idx); setBookImgFade(false); }, 300);
  };

  /* ── Form ── */
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setFormState('sending');
    try {
      const form = e.currentTarget;
      const res  = await fetch('https://formspree.io/f/xdajrzpv', { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      if (res.ok) { setFormState('success'); form.reset(); } else setFormState('error');
    } catch { setFormState('error'); }
  };

  const slide      = heroSlides[heroIdx];
  const etContent  = etTabs[etTab];
  const mfContent  = mfTabs[mfTab];

  return (
    <main style={{ background: '#fff', color: '#0A1628', fontFamily: 'var(--font-poppins)', overflowX: 'hidden' }}>

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section ref={heroRef} className="cz-hero" style={{ position: 'relative', width: '100%', overflow: 'hidden', background: '#000' }}>
        {heroSlides.map((s, i) => (
          <div key={s.id} className="cz-slide"
               style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', opacity: i === heroIdx ? 1 : 0, transition: 'opacity 0.9s cubic-bezier(0.77,0,0.175,1)', zIndex: i === heroIdx ? 2 : 1 }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: `url('${s.bg}')`, backgroundSize: 'cover', backgroundPosition: 'center', transform: i === heroIdx ? 'scale(1)' : 'scale(1.06)', transition: 'transform 6s ease', filter: 'brightness(0.35)' }} />
            <div className="cz-vignette" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(0,0,0,0.75) 38%, transparent 80%)' }} />
            <div className="cz-hero-container" style={{ position: 'relative', zIndex: 3, width: '100%', maxWidth: 1220, margin: '0 auto', padding: '0 20px' }}>
              <div className="cz-hero-content" style={{ maxWidth: 580, opacity: i === heroIdx ? 1 : 0, transform: i === heroIdx ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 0.7s ease 0.4s, transform 0.7s ease 0.4s' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: cz.accent, color: '#fff', fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', padding: '5px 12px', marginBottom: 18, borderRadius: 2 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff', opacity: 0.9, display: 'inline-block', animation: 'czPulse 2s infinite' }} />
                  {s.badge}
                </span>
                <h1 className="cz-hero-heading" style={{ fontSize: 'clamp(40px, 6vw, 78px)', color: '#fff', lineHeight: 0.95, marginBottom: 18, fontWeight: 700, letterSpacing: 1 }}>
                  {s.lines.map((line, li) => <span key={li} style={{ display: 'block', color: li === s.accentLine ? cz.accent : '#fff' }}>{line}</span>)}
                </h1>
                <p className="cz-hero-desc" style={{ fontSize: 15, color: 'rgba(255,255,255,0.72)', lineHeight: 1.65, marginBottom: 32, fontWeight: 300, maxWidth: 420 }}>{s.desc}</p>
                <a href={s.cta.href} className="cz-hero-btn"
                   onClick={e => { e.preventDefault(); document.querySelector(s.cta.href)?.scrollIntoView({ behavior: 'smooth' }); }}
                   style={{ display: 'inline-block', padding: '13px 28px', background: s.cta.solid ? '#fff' : 'transparent', color: s.cta.solid ? '#0d0d0d' : '#fff', border: '2px solid #fff', fontSize: 13, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', textDecoration: 'none', borderRadius: 2, transition: 'background 0.25s, color 0.25s, border-color 0.25s' }}
                   onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = cz.accent; el.style.borderColor = cz.accent; el.style.color = '#fff'; }}
                   onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = s.cta.solid ? '#fff' : 'transparent'; el.style.borderColor = '#fff'; el.style.color = s.cta.solid ? '#0d0d0d' : '#fff'; }}>
                  {s.cta.label}
                </a>
              </div>
            </div>
          </div>
        ))}
        <div className="cz-dots" style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(calc(-570px + 20px))', display: 'flex', gap: 10, zIndex: 10 }}>
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => goSlide(i)} style={{ width: 10, height: 10, borderRadius: '50%', padding: 0, border: 'none', cursor: 'pointer', background: i === heroIdx ? cz.accent : 'rgba(255,255,255,0.35)', transform: i === heroIdx ? 'scale(1.3)' : 'scale(1)', transition: 'background 0.3s, transform 0.3s' }} />
          ))}
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, height: 3, background: cz.accent, width: `${progress}%`, zIndex: 10, transition: 'width 0.1s linear' }} />
      </section>

      {/* ══════════════════════════════════════════
          STICKY NAV
      ══════════════════════════════════════════ */}
      {isSticky && <div style={{ height: 58 }} />}
      <div style={{ width: '100%', background: '#fff', borderBottom: '1px solid rgba(0,0,0,0.09)', position: isSticky ? 'fixed' : 'relative', top: isSticky ? 0 : undefined, left: 0, right: 0, zIndex: isSticky ? 9999 : 999, boxShadow: isSticky ? '0 2px 20px rgba(0,0,0,0.12)' : 'none', transition: 'box-shadow 0.3s ease' }}>
        <div className="cz-nav-inner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'nowrap', gap: 20, maxWidth: 1140, width: '100%', margin: '0 auto', height: 58, padding: '0 20px' }}>
          <ul className="cz-nav-links" style={{ display: 'flex', alignItems: 'center', flex: 1, gap: 36, listStyle: 'none', margin: 0, padding: 0, overflowX: 'auto', scrollbarWidth: 'none' }}>
            {[
              { label: 'Aura Scanners',            href: '#book-scanners' },
              { label: 'ET Scanners',              href: '#et-scanners' },
              { label: 'Shine & Lens Scanners',    href: '#compact-scanners' },
              { label: 'StarryHub & Cameras',         href: '#multi-function' },
            ].map(link => (
              <li key={link.href} style={{ flexShrink: 0 }}>
                <a href={link.href} style={{ display: 'inline-block', fontSize: 14, fontWeight: 500, color: '#111', textDecoration: 'none', letterSpacing: '0.15px', whiteSpace: 'nowrap', position: 'relative', paddingBottom: 3, transition: 'color 0.2s' }}
                   onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = cz.accent; (el.querySelector('.cz-ul') as HTMLElement | null)?.style.setProperty('width', '100%'); }}
                   onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = '#111'; (el.querySelector('.cz-ul') as HTMLElement | null)?.style.setProperty('width', '0'); }}>
                  {link.label}
                  <span className="cz-ul" style={{ position: 'absolute', bottom: 0, left: 0, width: 0, height: 2, background: cz.accent, borderRadius: 2, transition: 'width 0.25s ease' }} />
                </a>
              </li>
            ))}
          </ul>
          <a href="#et-scanners" style={{ flexShrink: 0, padding: '11px 26px', background: cz.accent, color: '#fff', fontSize: 14, fontWeight: 600, textDecoration: 'none', borderRadius: 50, whiteSpace: 'nowrap', transition: 'transform 0.15s' }}
             onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)'; }}
             onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)'; }}>
            Get a Quote
          </a>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          BOOK & DOCUMENT SCANNERS  (= KA: Office Scanners)
      ══════════════════════════════════════════ */}
      <section id="book-scanners" style={{ width: '100%', padding: '80px 20px', background: '#fff' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div className="cz-reveal" style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 700, color: '#0f1320', marginBottom: 10 }}>Aura Scanners</h2>
            <p style={{ fontSize: 16, color: '#64748b', maxWidth: 700, lineHeight: 1.7 }}>Compact, portable overhead scanners designed for everyday book and document scanning at home, school, or the office.</p>
          </div>
          <div className="cz-scanner-layout cz-reveal cz-reveal-d1" style={{ display: 'flex', gap: 60, alignItems: 'center', justifyContent: 'center', minHeight: 500 }}>
            {/* Left — switcher items */}
            <div className="cz-scanner-items" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
              {bookScanners.map((item, idx) => (
                <div key={item.id} onClick={() => switchBook(idx)}
                     style={{ cursor: 'pointer', padding: 24, borderRadius: 16, border: bookActive === idx ? '1px solid #e2e8f0' : '1px solid transparent', background: bookActive === idx ? '#fff' : 'transparent', boxShadow: bookActive === idx ? '0 10px 25px -5px rgba(0,0,0,0.05)' : 'none', transition: 'all 0.3s ease' }}
                     onMouseEnter={e => { if (bookActive !== idx) (e.currentTarget as HTMLDivElement).style.background = '#f8fafc'; }}
                     onMouseLeave={e => { if (bookActive !== idx) (e.currentTarget as HTMLDivElement).style.background = 'transparent'; }}>
                  <p style={{ color: cz.accent, fontSize: 13, textTransform: 'uppercase', marginBottom: 8, letterSpacing: '0.5px', fontWeight: 600 }}>{item.eyebrow}</p>
                  <h3 style={{ fontSize: 22, marginBottom: 14, color: '#0f1320', fontWeight: 600 }}>{item.title}</h3>
                  <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.7, margin: 0 }}>{item.intro}</p>
                  {bookActive === idx && (
                    <>
                      <ul style={{ marginTop: 12, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>
                        {item.bullets.map(b => (
                          <li key={b} style={{ fontSize: 14, color: '#475569', lineHeight: 1.8, display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ width: 5, height: 5, borderRadius: '50%', background: cz.accent, flexShrink: 0, display: 'inline-block' }} />{b}
                          </li>
                        ))}
                      </ul>
                      <div style={{ marginTop: 16 }}>
                        <a href={`/czur/${item.slug}`}
                           style={{ display: 'inline-block', fontSize: 13, fontWeight: 600, padding: '7px 18px', border: `1.5px solid ${cz.accent}`, color: cz.accent, borderRadius: 4, textDecoration: 'none', transition: 'background 0.2s, color 0.2s' }}
                           onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = cz.accent; el.style.color = '#fff'; }}
                           onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = 'transparent'; el.style.color = cz.accent; }}>
                          View Product
                        </a>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
            {/* Right — image */}
            <div className="cz-scanner-img-wrap" style={{ flex: 1.2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={bookScanners[bookActive].image} alt={bookScanners[bookActive].title} className="cz-scanner-img"
                   style={{ width: '100%', maxWidth: 600, height: 450, objectFit: 'contain', borderRadius: 20, opacity: bookImgFade ? 0 : 1, transition: 'opacity 0.4s ease' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PROFESSIONAL ET SCANNERS  (= KA: Network/Connected dark section + form)
      ══════════════════════════════════════════ */}
      <section id="et-scanners" style={{ width: '100%', background: 'linear-gradient(90deg, #0b1a2e, #0d223d)', padding: '80px 20px', color: '#fff' }}>
        <div className="cz-comm-inner" style={{ maxWidth: 1140, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 420px', gap: 60, alignItems: 'center' }}>
          <div className="cz-reveal">
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 700, marginBottom: 20, color: '#fff', lineHeight: 1.2 }}>ET Scanners</h2>
            <p style={{ fontSize: 15, color: '#cbd5e1', lineHeight: 1.7 }}>
              The CZUR ET series delivers professional-grade overhead scanning for offices, libraries, educational institutions, and service centres — combining high-resolution capture, intelligent auto-correction, advanced OCR, and built-in HDMI presentation into a single, space-saving device.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 24 }}>
              {['ET Max', 'ET Ultra', 'ET24 Pro', 'ET25 Pro', 'ET18 Pro', 'ET16 Plus'].map(name => (
                <span key={name} style={{ fontSize: 12, fontWeight: 600, padding: '5px 14px', background: 'rgba(255,255,255,0.08)', border: `1px solid ${cz.accent}`, color: '#e2e8f0', borderRadius: 4 }}>{name}</span>
              ))}
            </div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.06)', padding: 30, borderRadius: 14, border: '1px solid rgba(255,255,255,0.1)' }}>
            <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 20, color: '#fff' }}>Inquire for Distribution</h3>
            {formState === 'success' ? (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>✓</div>
                <p style={{ color: '#86efac', fontWeight: 600, fontSize: 15 }}>Inquiry sent successfully!</p>
                <p style={{ color: '#cbd5e1', fontSize: 13, marginTop: 6 }}>We&apos;ll be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {['text:name:Full Name', 'email:email:Business Email'].map(raw => {
                  const [type, name, placeholder] = raw.split(':');
                  return <input key={name} type={type} name={name} placeholder={placeholder} required style={{ width: '100%', padding: '12px 14px', borderRadius: 6, border: 'none', background: 'rgba(255,255,255,0.12)', color: '#fff', fontSize: 14, outline: 'none', fontFamily: 'var(--font-poppins)' }} />;
                })}
                <select name="category" required style={{ width: '100%', padding: '12px 14px', borderRadius: 6, border: 'none', background: 'rgba(255,255,255,0.12)', color: '#e5e7eb', fontSize: 14, outline: 'none', fontFamily: 'var(--font-poppins)' }}>
                  <option value="" style={{ background: '#fff', color: '#000' }}>Select Product Category</option>
                  {['Aura Scanners', 'ET Scanners', 'Shine & Lens Scanners', 'StarryHub Conference', 'Document & Web Camera'].map(o => (
                    <option key={o} style={{ background: '#fff', color: '#000' }}>{o}</option>
                  ))}
                </select>
                {formState === 'error' && <p style={{ fontSize: 12, color: '#fca5a5' }}>Something went wrong. Please try again.</p>}
                <button type="submit" disabled={formState === 'sending'} style={{ marginTop: 10, padding: 13, background: cz.accent, color: '#fff', fontWeight: 600, border: 'none', borderRadius: 6, cursor: formState === 'sending' ? 'not-allowed' : 'pointer', letterSpacing: 1, fontSize: 13, opacity: formState === 'sending' ? 0.7 : 1, transition: 'opacity 0.2s', fontFamily: 'var(--font-poppins)' }}>
                  {formState === 'sending' ? 'SENDING…' : 'SEND INQUIRY'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── ET model tabs  (= KA: Network scanner tabs section) ── */}
      <section style={{ width: '100%', padding: '40px 20px 60px', background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', borderBottom: '2px solid #eee', marginBottom: 40, gap: 10 }}>
            {([['flagship', 'ET Max & ET Ultra'], ['ultraclear', 'ET24 Pro & ET25 Pro'], ['smart', 'ET16 Plus & ET18 Pro']] as const).map(([key, label]) => (
              <button key={key} onClick={() => setEtTab(key)}
                      style={{ padding: '15px 22px', cursor: 'pointer', fontWeight: 700, fontSize: 14, textTransform: 'uppercase', letterSpacing: 1, color: etTab === key ? cz.accent : '#888', border: 'none', background: 'none', position: 'relative', fontFamily: 'var(--font-poppins)' }}>
                {label}
                {etTab === key && <span style={{ position: 'absolute', bottom: -2, left: 0, width: '100%', height: 3, background: cz.accent, display: 'block' }} />}
              </button>
            ))}
          </div>
          <div className="cz-net-panel" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 50 }}>
            <div>
              <h2 style={{ fontSize: 'clamp(20px, 3vw, 34px)', color: '#000', marginBottom: 20, lineHeight: 1.2 }}>{etContent.heading}</h2>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: '#555' }}>{etContent.desc}</p>
            </div>
            <div className="cz-net-products" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 30 }}>
              {etContent.products.map(p => (
                <div key={p.title} style={{ background: '#fff', border: '1px solid #eee', padding: 24, borderRadius: 8, display: 'flex', flexDirection: 'column' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt={p.title} className="cz-net-img" style={{ width: '100%', height: 260, objectFit: 'cover', marginBottom: 20, borderRadius: 6 }} />
                  <h4 style={{ fontSize: 22, margin: '10px 0 14px', color: '#000' }}>{p.title}</h4>
                  <p style={{ fontSize: 14, color: '#555', marginBottom: 8 }}>{p.intro}</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {p.bullets.map(b => (
                      <li key={b} style={{ fontSize: 14, color: '#555', lineHeight: 1.9, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: cz.accent, flexShrink: 0, display: 'inline-block' }} />{b}
                      </li>
                    ))}
                  </ul>
                  <div style={{ marginTop: 18 }}>
                    <a href={`/czur/${p.slug}`}
                       style={{ display: 'inline-block', fontSize: 13, fontWeight: 600, padding: '7px 18px', border: `1.5px solid ${cz.accent}`, color: cz.accent, borderRadius: 4, textDecoration: 'none', transition: 'background 0.2s, color 0.2s' }}
                       onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = cz.accent; el.style.color = '#fff'; }}
                       onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = 'transparent'; el.style.color = cz.accent; }}>
                      View Product
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          COMPACT & SPECIALIST SCANNERS  (= KA: Production Scanners)
      ══════════════════════════════════════════ */}
      <section id="compact-scanners" style={{ width: '100%', background: '#f8fafc', padding: '60px 20px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="cz-reveal" style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 700, color: '#000', marginBottom: 6 }}>Shine & Lens Scanners</h2>
            <p style={{ fontSize: 15, color: '#6b7280' }}>From portable A4 to high-resolution professional archive — lightweight, fast, and built for every environment.</p>
          </div>
          <div className="cz-prod-body cz-reveal cz-reveal-d1" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden', minHeight: 520 }}>
            {/* Left nav */}
            <div className="cz-prod-list" style={{ borderRight: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', background: '#fff' }}>
              {compactScanners.map((item, idx) => (
                <div key={item.num} onClick={() => setCompactActive(idx)} style={{ borderBottom: idx < compactScanners.length - 1 ? '1px solid #e5e7eb' : 'none', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '18px 24px', background: compactActive === idx ? '#eff6ff' : '#fff', transition: 'background 0.2s' }}
                       onMouseEnter={e => { if (compactActive !== idx) (e.currentTarget as HTMLDivElement).style.background = '#f9fafb'; }}
                       onMouseLeave={e => { if (compactActive !== idx) (e.currentTarget as HTMLDivElement).style.background = '#fff'; }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: cz.accent, letterSpacing: 1, minWidth: 24 }}>{item.num}</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: compactActive === idx ? cz.accent : '#1f2937', flex: 1, lineHeight: 1.4 }}>{item.navTitle}</span>
                    <span style={{ fontSize: 18, color: compactActive === idx ? cz.accent : '#d1d5db', transition: 'transform 0.3s, color 0.3s', transform: compactActive === idx ? 'rotate(90deg)' : 'none' }}>›</span>
                  </div>
                </div>
              ))}
            </div>
            {/* Right panel */}
            <div style={{ background: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
              {compactScanners.map((item, idx) => (
                <div key={item.num} style={{ display: compactActive === idx ? 'flex' : 'none', flexDirection: 'column', height: '100%', padding: '36px 36px 28px', gap: 20 }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: cz.accent, textTransform: 'uppercase', letterSpacing: 1, margin: 0 }}>{item.tag}</p>
                  <h3 style={{ fontSize: 22, fontWeight: 700, color: '#0f1320', margin: '6px 0 10px', lineHeight: 1.3 }}>{item.heading}</h3>
                  <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.75, margin: 0 }}>{item.desc}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {item.features.map(f => (
                      <div key={f} style={{ fontSize: 13, color: '#374151', display: 'flex', alignItems: 'flex-start', gap: 8, lineHeight: 1.5 }}>
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: cz.accent, flexShrink: 0, marginTop: 6 }} />{f}
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 'auto', paddingTop: 20 }}>
                    <div style={{ borderRadius: 6, overflow: 'hidden', border: '1px solid #e5e7eb', background: '#fff' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.image} alt={item.heading} style={{ width: '100%', height: 200, objectFit: 'contain', display: 'block' }} />
                      <a href={`/czur/${item.slug}`} style={{ display: 'block', fontSize: 11, fontWeight: 700, textAlign: 'center', background: cz.accent, color: '#fff', padding: '6px 0', letterSpacing: '0.5px', textTransform: 'uppercase', textDecoration: 'none' }}>
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

      {/* ══════════════════════════════════════════
          MULTI-FUNCTION & CONFERENCE  (= KA: Flatbed Accessories)
      ══════════════════════════════════════════ */}
      <section id="multi-function" style={{ width: '100%', background: '#fff', padding: '60px 20px 80px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="cz-reveal" style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 700, color: '#000', marginBottom: 6 }}>StarryHub & Cameras</h2>
            <p style={{ fontSize: 15, color: '#6b7280' }}>All-in-one conference systems and document cameras — built for modern meeting rooms and hybrid workspaces.</p>
          </div>

          {/* Pill tabs */}
          <div className="cz-flat-tabs cz-reveal cz-reveal-d1" style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
            {mfTabs.map((tab, i) => (
              <button key={i} onClick={() => setMfTab(i)}
                      style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 24px', borderRadius: 4, cursor: 'pointer', border: `1.5px solid ${mfTab === i ? cz.accent : '#e5e7eb'}`, background: mfTab === i ? cz.accent : '#fff', transition: 'all 0.2s', fontFamily: 'var(--font-poppins)' }}>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: mfTab === i ? 'rgba(255,255,255,0.6)' : '#9ca3af' }}>{tab.num}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: mfTab === i ? '#fff' : '#374151' }}>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Panel content */}
          <div className="cz-flat-grid" style={{ display: 'grid', gridTemplateColumns: mfContent.panels.length === 1 ? '1fr 1fr' : '1fr 1fr', gap: 1, background: '#f3f4f6', border: '1px solid #f3f4f6', borderRadius: 10, overflow: 'hidden' }}>
            {mfContent.panels.length === 1 ? (
              <>
                {/* Single product — left: details, right: image */}
                <div style={{ background: '#fff', padding: 36, display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: cz.accent, textTransform: 'uppercase', letterSpacing: '1.2px', margin: 0 }}>{mfContent.panels[0].tag}</p>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0f1320', margin: 0, lineHeight: 1.4 }}>{mfContent.panels[0].title}</h3>
                  <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.75, margin: 0 }}>{mfContent.panels[0].desc}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                    {mfContent.panels[0].features.map(f => (
                      <div key={f} style={{ fontSize: 13, color: '#374151', display: 'flex', alignItems: 'flex-start', gap: 9, lineHeight: 1.5 }}>
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: cz.accent, flexShrink: 0, marginTop: 5 }} />{f}
                      </div>
                    ))}
                  </div>
                  <a href={`/czur/${mfContent.panels[0].slug}`} style={{ marginTop: 8, display: 'inline-block', fontSize: 13, fontWeight: 600, color: cz.accent, textDecoration: 'none' }}>View Product →</a>
                </div>
                <div style={{ background: '#fff', padding: 36, display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: cz.accent, textTransform: 'uppercase', letterSpacing: '1.2px', margin: 0 }}>Product Image</p>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0f1320', margin: 0, lineHeight: 1.4 }}>{mfContent.panels[0].title}</h3>
                  <div style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid #e5e7eb', marginTop: 4, background: '#fff' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={mfContent.panels[0].image} alt={mfContent.panels[0].title} style={{ width: '100%', height: 260, objectFit: 'contain', display: 'block' }} />
                  </div>
                </div>
              </>
            ) : (
              mfContent.panels.map(panel => (
                <div key={panel.slug} style={{ background: '#fff', padding: 36, display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: cz.accent, textTransform: 'uppercase', letterSpacing: '1.2px', margin: 0 }}>{panel.tag}</p>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0f1320', margin: 0, lineHeight: 1.4 }}>{panel.title}</h3>
                  <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.75, margin: 0 }}>{panel.desc}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                    {panel.features.map(f => (
                      <div key={f} style={{ fontSize: 13, color: '#374151', display: 'flex', alignItems: 'flex-start', gap: 9, lineHeight: 1.5 }}>
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: cz.accent, flexShrink: 0, marginTop: 5 }} />{f}
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 'auto', paddingTop: 8, display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid #e5e7eb', background: '#fff' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={panel.image} alt={panel.title} style={{ width: '100%', height: 200, objectFit: 'contain', display: 'block' }} />
                    </div>
                    <a href={`/czur/${panel.slug}`} style={{ display: 'inline-block', fontSize: 13, fontWeight: 600, color: cz.accent, textDecoration: 'none' }}>View Product →</a>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          RESPONSIVE + ANIMATIONS
      ══════════════════════════════════════════ */}
      <style>{`
        @keyframes czPulse { 0%,100%{ opacity:1; transform:scale(1); } 50%{ opacity:.5; transform:scale(.8); } }
        .cz-reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.65s cubic-bezier(0.22,1,0.36,1), transform 0.65s cubic-bezier(0.22,1,0.36,1); }
        .cz-reveal.cz-visible { opacity: 1; transform: translateY(0); }
        .cz-reveal-d1 { transition-delay: 0.12s; }
        .cz-hero { height: 680px; }

        @media (max-width: 1024px) {
          .cz-comm-inner   { grid-template-columns: 1fr !important; gap: 40px !important; }
          .cz-net-panel    { grid-template-columns: 1fr !important; gap: 32px !important; }
          .cz-prod-body    { grid-template-columns: 1fr !important; }
          .cz-prod-list    { border-right: none !important; border-bottom: 1px solid #e5e7eb !important; }
          .cz-flat-grid    { grid-template-columns: 1fr !important; }
          .cz-scanner-layout { flex-direction: column-reverse !important; gap: 32px !important; min-height: unset !important; }
          .cz-scanner-img  { height: 320px !important; }
        }
        @media (max-width: 768px) {
          .cz-hero         { height: 420px !important; }
          .cz-slide        { align-items: flex-end !important; padding-bottom: 70px !important; }
          .cz-vignette     { background: linear-gradient(180deg, transparent 10%, rgba(0,0,0,0.85) 70%) !important; }
          .cz-hero-container { padding: 0 24px !important; }
          .cz-hero-content { max-width: 100% !important; }
          .cz-dots         { left: 24px !important; transform: none !important; bottom: 22px !important; }
          .cz-nav-inner    { height: 52px !important; gap: 12px !important; padding: 0 16px !important; }
          .cz-nav-links    { gap: 4px !important; }
          .cz-nav-links li a { font-size: 12.5px !important; }
          .cz-net-products { grid-template-columns: 1fr !important; }
          .cz-net-img      { height: 200px !important; }
          .cz-scanner-img  { height: 260px !important; }
        }
        @media (max-width: 480px) {
          .cz-hero         { height: 550px !important; }
          .cz-hero-heading { letter-spacing: 0 !important; }
          .cz-hero-desc    { font-size: 13px !important; margin-bottom: 20px !important; }
          .cz-hero-btn     { padding: 10px 20px !important; font-size: 12px !important; }
          .cz-flat-tabs    { flex-direction: column !important; }
          .cz-flat-tabs button { width: 100% !important; justify-content: flex-start !important; }
        }
      `}</style>
    </main>
  );
}
