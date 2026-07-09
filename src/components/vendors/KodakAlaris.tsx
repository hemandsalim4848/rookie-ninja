'use client';

import { useState, useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────
   THEME
───────────────────────────────────────────── */
const ka = {
  bg:     '#ffffff',
  alt:    '#f8fbff',
  navy:   '#0A1628',
  accent: '#007680',
  line:   'rgba(10,22,40,0.08)',
  text:   '#0A1628',
  dim:    '#6b7280',
  mute:   '#9ca3af',
};

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const heroSlides = [
  {
    id: 'software',
    badge: 'Official Distributor',
    lines: ['Paper to Insights.', 'Instantly.'],
    accentLine: 1,
    desc: 'Eliminate manual document processing with Kodak Alaris intelligent capture and automation software — built for every department, every workflow.',
    cta: { label: 'Explore Software', href: '#software-solutions', solid: true },
    bg: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1782152344/i4x50-Photo-Using-the-Scanner-Closeup.png-1_nvl59w.webp',
  },
  {
    id: 'scanners',
    badge: 'Document Scanners',
    lines: ['Built to Scan.', 'Built to Last'],
    accentLine: 1,
    desc: 'From compact office scanners to ultra-fast production workhorses — Kodak Alaris delivers reliable, high-accuracy scanning for every environment.',
    cta: { label: 'View Scanners', href: '#office-scanners', solid: false },
    bg: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1782152343/Scanner-Lifestyle.jpg_m2cwhg.webp',
  },
];

const officeScanners = [
  {
    id: 'e1000',
    eyebrow: 'Simple Scanning',
    title: 'E1000 Series',
    bullets: [
      'E1030 — 30ppm | 80 Sheet ADF',
      'E1040 — 40ppm | 80 Sheet ADF',
      'Dual Light Illumination (DLI)',
      '9 Quick Scan Jobs',
      'Modular passport and legal flatbed available',
    ],
    intro: 'Fast, reliable desktop scanning for front-office and customer-facing workflows.',
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1782152343/alaris_e1035_scanner-sq.jpg_rhpnuw.webp',
    links: [
      { label: 'E1030', href: '/kodak-alaris/kodak-e1030-document-scanner' },
      { label: 'E1040', href: '/kodak-alaris/kodak-e1040-document-scanner' },
    ],
  },
  {
    id: 's2000',
    eyebrow: 'Professional A4',
    title: 'S2000 Series',
    bullets: [
      'S2050 — 50ppm | 80 Sheet ADF',
      'S2070 — 70ppm | 80 Sheet ADF',
      'S2085f — 85ppm | 300 Sheet ADF',
      'Active Feeding System (AFS)',
      'Surepath™ intelligent document feed technology',
    ],
    intro: 'Professional sheet-fed solutions with robust feeding and embedded image processing.',
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1782152343/S2000_bss1gy.webp',
    links: [
      { label: 'S2050', href: '/kodak-alaris/kodak-s2050-scanner' },
      { label: 'S2070', href: '/kodak-alaris/kodak-s2070-scanner' },
      { label: 'S2085f', href: '/kodak-alaris/kodak-s2085f-scanner' },
    ],
  },
];

const networkData = {
  shared: {
    heading: 'Shared Network Scanners',
    desc: 'Productive shared network scanning for up to 20 jobs per department — with zero IT complexity. Wi-Fi and Ethernet ready out of the box, featuring embedded image processing and Dual Light Illumination.',
    products: [{
      image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1782152342/alaris-passport-flatbed-accessory.jpg_iply8c.webp',
      title: 'S2000w Series',
      bullets: [
        'S2060w — 60ppm | 80 Sheet ADF',
        'S2080w — 80ppm | 80 Sheet ADF',
        'Embedded image processing',
        'Dual Light Illumination (DLI)',
        'Wi-Fi and Ethernet connectivity',
      ],
      intro: 'Productive shared network scanning — up to 20 jobs per department, no IT complexity.',
      links: [
        { label: 'S2060w', href: '/kodak-alaris/kodak-s2060w-scanner' },
        { label: 'S2080w', href: '/kodak-alaris/kodak-s2080w-scanner' },
      ],
    }],
  },
  standalone: {
    heading: 'Standalone Scanners',
    desc: 'PC-free scanning kiosks that are powerful, secure, and ready to deploy straight out of the box — no connected PC, no complex IT setup required.',
    products: [{
      image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1782152344/kodak-alaris-scanstation-730ex-scanner_ezu73d.webp',
      title: 'Scan Station 730EX Plus',
      bullets: [
        '70ppm | 75 Sheet ADF',
        'Large intuitive colour touchscreen',
        'Supports LDAP and Active Directory',
        'No connected PC required',
      ],
      intro: 'PC-free customisable scanning kiosk — powerful, secure, and ready to deploy.',
      links: [
        { label: 'Scan Station 730EX Plus', href: '/kodak-alaris/kodak-scan-station-730ex-plus-scanner' },
        { label: 'Scan Station 710', href: '/kodak-alaris/kodak-scan-station-710-scanner' },
      ],
    }],
  },
};

const productionScanners = [
  {
    num: '01',
    navTitle: 'Compact Production — S3000 Series',
    tag: 'Compact Production',
    heading: 'S3000 Series',
    desc: 'High-volume compact scanners for busy back-office and departmental environments.',
    features: [
      'S3060 — 60ppm | 300 Sheet ADF',
      'S3100 / S3100f — 100ppm | 300 Sheet ADF',
      'S3120 Max — 120ppm | 500 Sheet ADF',
      'S3140 Max — 140ppm | 500 Sheet ADF',
      'Surepath™ intelligent document feed technology',
      'USB and wired Ethernet',
    ],
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1782152342/S3140_Max_Scanner.png_z3oyry.webp?h=7e49063a&itok=2zMnsBE8',
    imageLabel: 'S3000 Series',
    links: [
      { label: 'S3060', href: '/kodak-alaris/kodak-s3060-scanner' },
      { label: 'S3100', href: '/kodak-alaris/kodak-s3100-scanner' },
      { label: 'S3120 Max', href: '/kodak-alaris/kodak-s3120-max-scanner' },
      { label: 'S3140 Max', href: '/kodak-alaris/kodak-s3140-max-scanner' },
    ],
  },
  {
    num: '02',
    navTitle: 'Ultra-Fast Production — i4000 / i5000 Series',
    tag: 'Ultra-Fast Production',
    heading: 'i4000 / i5000 Series',
    desc: 'The most powerful production scanners — built for BPOs, mailrooms and service bureaus.',
    features: [
      'i4250 — 110ppm | i4650 — 145ppm | i4850 — 160ppm',
      'i5250 — 150ppm | i5650 — 180ppm | i5850 — 210ppm',
      'i5650S / i5850S — with three-way sorting',
      'Surepath™ intelligent document feed technology',
      'Unlimited duty cycle',
    ],
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1782152342/i5650_Scanner.png_x5s8cs.webp?h=7e49063a&itok=5jJvezef',
    imageLabel: 'i4000 / i5000 Series',
    links: [
      { label: 'i4650', href: '/kodak-alaris/kodak-i4650-scanner' },
      { label: 'i4850', href: '/kodak-alaris/kodak-i4850-scanner' },
    ],
  },
  {
    num: '03',
    navTitle: 'High Capacity — S5000 Series',
    tag: 'High Capacity Production',
    heading: 'S5000 Series',
    desc: 'High speed, high capacity scanners — FADGI 2023 compliant, built for large-scale document digitisation.',
    features: [
      'S5160 — 160ppm | S5180 — 180ppm | S5210 — 210ppm',
      '750 Sheet ADF | High speed, high capacity scanning',
      'Surepath™ intelligent document feed technology',
      'USB and wired Ethernet',
      'FADGI 2023: General Collections 3-Star and MTR Compliant',
    ],
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1782152342/03_S5160_HERO_LF_closed.png_t4eh6p.webp?h=60f9f39d&itok=TJpEOnkT',
    imageLabel: 'S5000 Series',
  },
];

const KA_NAV_LINKS = [
  { label: 'Software Solutions',           href: '#software-solutions' },
  { label: 'Office Scanners',              href: '#office-scanners' },
  { label: 'Network / Connected Scanners', href: '#network-connected-scanners' },
  { label: 'Production Scanners',          href: '#production-scanners' },
  { label: 'Flatbed Accessories',          href: '#flatbed-accessories' },
];

function KaNavInner({ accent }: { accent: string }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      flexWrap: 'nowrap', gap: 20,
      maxWidth: 1140, width: '100%', margin: '0 auto',
      height: 58, padding: '0 20px',
    }}>
      <ul style={{
        display: 'flex', alignItems: 'center', flex: 1,
        gap: 36, listStyle: 'none', margin: 0, padding: 0,
        overflowX: 'auto', scrollbarWidth: 'none',
      }}>
        {KA_NAV_LINKS.map(link => (
          <li key={link.href} style={{ flexShrink: 0 }}>
            <a href={link.href}
               style={{
                 display: 'inline-block', fontSize: 14, fontWeight: 500,
                 color: '#111', textDecoration: 'none', letterSpacing: '0.15px',
                 whiteSpace: 'nowrap', position: 'relative', paddingBottom: 3,
                 transition: 'color 0.2s',
               }}
               onMouseEnter={e => {
                 const el = e.currentTarget as HTMLAnchorElement;
                 el.style.color = accent;
                 (el.querySelector('.ka-underline') as HTMLElement | null)?.style.setProperty('width', '100%');
               }}
               onMouseLeave={e => {
                 const el = e.currentTarget as HTMLAnchorElement;
                 el.style.color = '#111';
                 (el.querySelector('.ka-underline') as HTMLElement | null)?.style.setProperty('width', '0');
               }}>
              {link.label}
              <span className="ka-underline" style={{
                position: 'absolute', bottom: 0, left: 0, width: 0, height: 2,
                background: accent, borderRadius: 2, transition: 'width 0.25s ease',
              }} />
            </a>
          </li>
        ))}
      </ul>
      <a href="#network-connected-scanners"
         style={{
           flexShrink: 0, padding: '11px 26px',
           background: accent, color: '#fff',
           fontSize: 14, fontWeight: 600,
           textDecoration: 'none', borderRadius: 50, whiteSpace: 'nowrap',
           transition: 'transform 0.15s',
         }}
         onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)'; }}
         onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)'; }}>
        Get a Quote
      </a>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function KodakAlarisPage() {

  const [heroIdx, setHeroIdx]             = useState(0);
  const [progress, setProgress]           = useState(0);
  const rafRef                            = useRef<number | null>(null);
  const startRef                          = useRef<number | null>(null);
  const heroRef                           = useRef<HTMLElement>(null);
  const DURATION                          = 5000;

  const [isSticky, setIsSticky]           = useState(false);
  const [activeScanner, setActiveScanner] = useState(0);
  const [imgFade, setImgFade]             = useState(false);
  const [netTab, setNetTab]               = useState<'shared' | 'standalone'>('shared');
  const [prodActive, setProdActive]       = useState(0);
  const [flatTab, setFlatTab]             = useState(0);
  const [formState, setFormState]         = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  /* ── Hero progress ── */
  const tick = (ts: number) => {
    if (!startRef.current) startRef.current = ts;
    const pct = Math.min(((ts - startRef.current) / DURATION) * 100, 100);
    setProgress(pct);
    if (pct < 100) {
      rafRef.current = requestAnimationFrame(tick);
    } else {
      setHeroIdx(i => (i + 1) % heroSlides.length);
    }
  };

  const resetProgress = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    startRef.current = null;
    setProgress(0);
    rafRef.current = requestAnimationFrame(tick);
  };

  const goSlide = (n: number) => {
    setHeroIdx(((n % heroSlides.length) + heroSlides.length) % heroSlides.length);
    resetProgress();
  };

  useEffect(() => {
    resetProgress();
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [heroIdx]);

  /* ── Sticky nav ── */
  useEffect(() => {
    const onScroll = () => {
      if (!heroRef.current) return;
      setIsSticky(heroRef.current.getBoundingClientRect().bottom <= 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (isSticky) {
      document.body.classList.add('ka-subnav-active');
    } else {
      document.body.classList.remove('ka-subnav-active');
    }
    return () => document.body.classList.remove('ka-subnav-active');
  }, [isSticky]);

  /* ── Scroll reveal ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('ka-visible'); observer.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.ka-reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* ── Scanner image swap ── */
  const switchScanner = (idx: number) => {
    if (idx === activeScanner) return;
    setImgFade(true);
    setTimeout(() => { setActiveScanner(idx); setImgFade(false); }, 300);
  };

  /* ── Form submit ── */
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('sending');
    try {
      const form = e.currentTarget;
      const res  = await fetch('https://formspree.io/f/xdajrzpv', {
        method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' },
      });
      if (res.ok) { setFormState('success'); form.reset(); }
      else setFormState('error');
    } catch { setFormState('error'); }
  };

  const slide      = heroSlides[heroIdx];
  const netContent = networkData[netTab];

  return (
    <main style={{ background: ka.bg, color: ka.text, fontFamily: 'var(--font-poppins)', overflowX: 'hidden' }}>

      {/* ══════════════════════════════════════════
          HERO SLIDER
      ══════════════════════════════════════════ */}
      <section ref={heroRef} className="ka-hero" style={{ position: 'relative', width: '100%', overflow: 'hidden', background: '#000' }}>

        {heroSlides.map((s, i) => (
          <div key={s.id} className="ka-slide"
               style={{
                 position: 'absolute', inset: 0, display: 'flex', alignItems: 'center',
                 opacity: i === heroIdx ? 1 : 0,
                 transition: 'opacity 0.9s cubic-bezier(0.77,0,0.175,1)',
                 zIndex: i === heroIdx ? 2 : 1,
               }}>
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: `url('${s.bg}')`,
              backgroundSize: 'cover', backgroundPosition: 'center',
              transform: i === heroIdx ? 'scale(1)' : 'scale(1.06)',
              transition: 'transform 6s ease',
              filter: 'brightness(0.38)',
            }} />
            <div className="ka-vignette" style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(90deg, rgba(0,0,0,0.72) 38%, transparent 80%)',
            }} />
            <div className="ka-hero-container"
                 style={{ position: 'relative', zIndex: 3, width: '100%', maxWidth: 1220, margin: '0 auto', padding: '0 20px' }}>
              <div className="ka-hero-content"
                   style={{
                     maxWidth: 580,
                     opacity: i === heroIdx ? 1 : 0,
                     transform: i === heroIdx ? 'translateY(0)' : 'translateY(24px)',
                     transition: 'opacity 0.7s ease 0.4s, transform 0.7s ease 0.4s',
                   }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8, background: ka.accent, color: '#fff',
                  fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase',
                  padding: '5px 12px', marginBottom: 18, borderRadius: 2,
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff', opacity: 0.9, display: 'inline-block', animation: 'kaPulse 2s infinite' }} />
                  {s.badge}
                </span>
                <h1 className="ka-hero-heading"
                    style={{ fontSize: 'clamp(40px, 6vw, 78px)', color: '#fff', lineHeight: 0.95, marginBottom: 18, fontWeight: 700, letterSpacing: 1 }}>
                  {s.lines.map((line, li) => (
                    <span key={li} style={{ display: 'block', color: li === s.accentLine ? ka.accent : '#fff' }}>{line}</span>
                  ))}
                </h1>
                <p className="ka-hero-desc"
                   style={{ fontSize: 15, color: 'rgba(255,255,255,0.72)', lineHeight: 1.65, marginBottom: 32, fontWeight: 300, maxWidth: 420 }}>
                  {s.desc}
                </p>
                <a href={s.cta.href} className="ka-hero-btn"
                   onClick={e => { e.preventDefault(); document.querySelector(s.cta.href)?.scrollIntoView({ behavior: 'smooth' }); }}
                   style={{
                     display: 'inline-block', padding: '13px 28px',
                     background: s.cta.solid ? '#fff' : 'transparent',
                     color: s.cta.solid ? '#0d0d0d' : '#fff',
                     border: '2px solid #fff',
                     fontSize: 13, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase',
                     textDecoration: 'none', borderRadius: 2,
                     transition: 'background 0.25s, color 0.25s, border-color 0.25s',
                   }}
                   onMouseEnter={e => {
                     const el = e.currentTarget as HTMLAnchorElement;
                     el.style.background = ka.accent; el.style.borderColor = ka.accent; el.style.color = '#fff';
                   }}
                   onMouseLeave={e => {
                     const el = e.currentTarget as HTMLAnchorElement;
                     el.style.background = s.cta.solid ? '#fff' : 'transparent';
                     el.style.borderColor = '#fff';
                     el.style.color = s.cta.solid ? '#0d0d0d' : '#fff';
                   }}>
                  {s.cta.label}
                </a>
              </div>
            </div>
          </div>
        ))}

        {/* Dots */}
        <div className="ka-dots"
             style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(calc(-570px + 20px))', display: 'flex', gap: 10, zIndex: 10 }}>
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => goSlide(i)}
                    style={{
                      width: 10, height: 10, borderRadius: '50%', padding: 0, border: 'none', cursor: 'pointer',
                      background: i === heroIdx ? ka.accent : 'rgba(255,255,255,0.35)',
                      transform: i === heroIdx ? 'scale(1.3)' : 'scale(1)',
                      transition: 'background 0.3s, transform 0.3s',
                    }} />
          ))}
        </div>

        {/* Progress bar */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, height: 3,
          background: ka.accent, width: `${progress}%`,
          zIndex: 10, transition: 'width 0.1s linear',
        }} />
      </section>

      {/* ══════════════════════════════════════════
          STICKY NAV
      ══════════════════════════════════════════ */}
      {/* Inline nav — visible below hero in page flow */}
      <div style={{
        width: '100%', background: '#fff',
        borderBottom: `1px solid rgba(0,0,0,0.09)`,
        visibility: isSticky ? 'hidden' : 'visible',
      }}>
        <KaNavInner accent={ka.accent} />
      </div>

      {/* Fixed nav — slides in from top after hero exits */}
      <div className="ka-nav-wrap" style={{
        width: '100%', background: '#fff',
        borderBottom: `1px solid rgba(0,0,0,0.09)`,
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1001,
        boxShadow: '0 2px 20px rgba(0,0,0,0.12)',
        transform: isSticky ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
      }}>
        <KaNavInner accent={ka.accent} />
      </div>

      {/* ══════════════════════════════════════════
          SOFTWARE SOLUTIONS
      ══════════════════════════════════════════ */}
      <section id="software-solutions" style={{ width: '100%', background: '#f8fafc', padding: '72px 20px' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div className="ka-reveal" style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700, color: ka.text, marginBottom: 14, letterSpacing: -0.3 }}>
              Software Solutions
            </h2>
            <p style={{ fontSize: 15, color: '#64748b', lineHeight: 1.65, maxWidth: 560, margin: '0 auto' }}>
              Intelligent document capture and automation software from Kodak Alaris — purpose-built to digitise, classify, and route information across every business workflow.
            </p>
          </div>
          <div className="ka-sw-grid ka-reveal ka-reveal-d1" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
            {[
              {
                tag: 'Document Capture',
                title: 'KODAK Capture Pro Software',
                desc: 'A powerful capture platform that automates the conversion of paper documents into high-quality digital information — with intelligent image processing, OCR, and flexible ECM integration.',
                image: 'https://products.rookie-ninja.com/wp-content/uploads/2026/05/KODAK-Capture-Pro.png.webp',
                href: '/kodak-alaris/kodak-capture-pro-software',
                features: ['High-volume document capture', 'Advanced OCR & barcode recognition', 'Intelligent image processing', 'Supports multiple scanner brands', 'Enterprise workflow automation'],
              },
              {
                tag: 'Intelligent Document Processing',
                title: 'KODAK Info Input Solution',
                desc: 'An AI-powered IDP platform that automates the entire document journey — from multi-channel capture to data extraction, validation, and seamless integration with business systems.',
                image: 'https://products.rookie-ninja.com/wp-content/uploads/2026/05/KODAK-Info-Input-Solution-1.png.webp',
                href: '/kodak-alaris/kodak-info-input-solution',
                features: ['AI-powered document processing', 'Automated data extraction', 'Paper & digital capture', 'Low-code workflow automation', 'Business system integration'],
              },
            ].map((card, i) => (
              <div key={i} className={`ka-reveal ka-reveal-d${i + 1}`}
                   style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', overflow: 'hidden', boxShadow: '0 2px 16px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', transition: 'box-shadow 0.3s ease, transform 0.3s ease' }}
                   onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = '0 8px 32px rgba(0,0,0,0.12)'; }}
                   onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(0)'; el.style.boxShadow = '0 2px 16px rgba(0,0,0,0.06)'; }}>
                <div style={{ width: '100%', height: 220, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #f1f5f9' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={card.image} alt={card.title} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 24, display: 'block' }} />
                </div>
                <div style={{ padding: '24px 24px 28px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: ka.accent, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 8 }}>{card.tag}</p>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: ka.text, marginBottom: 10, lineHeight: 1.3 }}>{card.title}</h3>
                  <p style={{ fontSize: 13.5, color: '#64748b', lineHeight: 1.65, marginBottom: 16 }}>{card.desc}</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 7, flex: 1 }}>
                    {card.features.map((f, j) => (
                      <li key={j} style={{ fontSize: 13, fontWeight: 500, color: '#374151', paddingLeft: 16, position: 'relative', lineHeight: 1.4 }}>
                        <span style={{ position: 'absolute', left: 0, top: 6, width: 6, height: 6, borderRadius: '50%', background: ka.accent, display: 'inline-block' }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href={card.href} style={{
                    marginTop: 20, display: 'inline-block', padding: '10px 20px',
                    background: ka.accent, color: '#fff', fontSize: 13, fontWeight: 600,
                    borderRadius: 50, textDecoration: 'none', alignSelf: 'flex-start',
                    transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.85'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1'; }}>
                    View Product
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          OFFICE SCANNERS
      ══════════════════════════════════════════ */}
      <section id="office-scanners" style={{ width: '100%', padding: '80px 20px', background: '#fff' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>

          <div className="ka-reveal" style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 700, color: '#0f1320', marginBottom: 10 }}>
              KODAK Document Scanners
            </h2>
            <p style={{ fontSize: 16, color: '#64748b', maxWidth: 700, lineHeight: 1.7 }}>
              Reliable desktop and professional A4 scanning solutions for modern business workflows.
            </p>
          </div>

          <div className="ka-scanner-layout ka-reveal ka-reveal-d1"
               style={{ display: 'flex', gap: 60, alignItems: 'center', justifyContent: 'center', minHeight: 500 }}>

            {/* Left — items */}
            <div className="ka-scanner-items" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
              {officeScanners.map((item, idx) => (
                <div key={item.id} onClick={() => switchScanner(idx)}
                     style={{
                       cursor: 'pointer', padding: 24, borderRadius: 16,
                       border: activeScanner === idx ? '1px solid #e2e8f0' : '1px solid transparent',
                       background: activeScanner === idx ? '#fff' : 'transparent',
                       boxShadow: activeScanner === idx ? '0 10px 25px -5px rgba(0,0,0,0.05)' : 'none',
                       transition: 'all 0.3s ease',
                     }}
                     onMouseEnter={e => { if (activeScanner !== idx) (e.currentTarget as HTMLDivElement).style.background = '#f8fafc'; }}
                     onMouseLeave={e => { if (activeScanner !== idx) (e.currentTarget as HTMLDivElement).style.background = 'transparent'; }}>
                  <p style={{ color: ka.accent, fontSize: 13, textTransform: 'uppercase', marginBottom: 8, letterSpacing: '0.5px', fontWeight: 600 }}>
                    {item.eyebrow}
                  </p>
                  <h3 style={{ fontSize: 22, marginBottom: 14, color: '#0f1320', fontWeight: 600 }}>{item.title}</h3>
                  <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.7, margin: 0 }}>{item.intro}</p>
                  {activeScanner === idx && (
                    <>
                      <ul style={{ marginTop: 12, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>
                        {item.bullets.map(b => (
                          <li key={b} style={{ fontSize: 14, color: '#475569', lineHeight: 1.8, display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ width: 5, height: 5, borderRadius: '50%', background: ka.accent, flexShrink: 0, display: 'inline-block' }} />
                            {b}
                          </li>
                        ))}
                      </ul>
                      {(item as any).links && (
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 14 }}>
                          {(item as any).links.map((lnk: any) => (
                            <a key={lnk.href} href={lnk.href}
                               style={{ fontSize: 12, fontWeight: 600, padding: '5px 14px', borderRadius: 4, border: `1.5px solid ${ka.accent}`, color: ka.accent, textDecoration: 'none', background: '#fff', transition: 'all 0.2s' }}
                               onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = ka.accent; el.style.color = '#fff'; }}
                               onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = '#fff'; el.style.color = ka.accent; }}>
                              {lnk.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Right — image */}
            <div className="ka-scanner-img-wrap" style={{ flex: 1.2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={officeScanners[activeScanner].image}
                   alt={officeScanners[activeScanner].title}
                   className="ka-scanner-img"
                   style={{
                     width: '100%', maxWidth: 600, height: 450,
                     objectFit: 'cover', borderRadius: 20,
                     opacity: imgFade ? 0 : 1,
                     transition: 'opacity 0.4s ease',
                   }} />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          NETWORK / CONNECTED SCANNERS + FORM
      ══════════════════════════════════════════ */}
      <section id="network-connected-scanners"
               style={{ width: '100%', background: 'linear-gradient(90deg, #0b1a2e, #0d223d)', padding: '80px 20px', color: '#fff' }}>
        <div className="ka-comm-inner"
             style={{ maxWidth: 1140, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 420px', gap: 60, alignItems: 'center' }}>

          <div className="ka-reveal">
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 700, marginBottom: 20, color: '#fff', lineHeight: 1.2 }}>
              Network / Connected Scanners
            </h2>
            <p style={{ fontSize: 15, color: '#cbd5e1', lineHeight: 1.7 }}>
              Enable seamless shared and standalone document scanning with intelligent network connectivity, embedded image processing, enterprise-grade security, intuitive touchscreen control, and high-speed PC-free performance designed for modern departments, distributed teams, and demanding business environments.
            </p>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.06)', padding: 30,
            borderRadius: 14, border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(8px)',
          }}>
            <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 20, color: '#fff' }}>Inquire for Distribution</h3>
            {formState === 'success' ? (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>✓</div>
                <p style={{ color: '#86efac', fontWeight: 600, fontSize: 15 }}>Inquiry sent successfully!</p>
                <p style={{ color: '#cbd5e1', fontSize: 13, marginTop: 6 }}>We&apos;ll be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {(['text:name:Full Name', 'email:email:Business Email'] as const).map(raw => {
                  const [type, name, placeholder] = raw.split(':');
                  return (
                    <input key={name} type={type} name={name} placeholder={placeholder} required
                           style={{
                             width: '100%', padding: '12px 14px', borderRadius: 6,
                             border: 'none', background: 'rgba(255,255,255,0.12)',
                             color: '#fff', fontSize: 14, outline: 'none', fontFamily: 'var(--font-poppins)',
                           }} />
                  );
                })}
                <select name="category" required
                        style={{
                          width: '100%', padding: '12px 14px', borderRadius: 6,
                          border: 'none', background: 'rgba(255,255,255,0.12)',
                          color: '#e5e7eb', fontSize: 14, outline: 'none', fontFamily: 'var(--font-poppins)',
                        }}>
                  <option value="" style={{ background: '#fff', color: '#000' }}>Select Product Category</option>
                  {['Software Solutions','Office Scanners','Network / Connected Scanners','Production Scanners','Flatbed Accessories'].map(o => (
                    <option key={o} style={{ background: '#fff', color: '#000' }}>{o}</option>
                  ))}
                </select>
                {formState === 'error' && <p style={{ fontSize: 12, color: '#fca5a5' }}>Something went wrong. Please try again.</p>}
                <button type="submit" disabled={formState === 'sending'}
                        style={{
                          marginTop: 10, padding: 13, background: ka.accent, color: '#fff',
                          fontWeight: 600, border: 'none', borderRadius: 6,
                          cursor: formState === 'sending' ? 'not-allowed' : 'pointer',
                          letterSpacing: 1, fontSize: 13,
                          opacity: formState === 'sending' ? 0.7 : 1,
                          transition: 'opacity 0.2s', fontFamily: 'var(--font-poppins)',
                        }}>
                  {formState === 'sending' ? 'SENDING…' : 'SEND INQUIRY'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── Network scanner tabs ── */}
      <section style={{ width: '100%', padding: '40px 20px 60px', background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          <div style={{ display: 'flex', flexWrap: 'wrap', borderBottom: '2px solid #eee', marginBottom: 40, gap: 10 }}>
            {([['shared', 'Shared Network'], ['standalone', 'Standalone']] as const).map(([key, label]) => (
              <button key={key} onClick={() => setNetTab(key)}
                      style={{
                        padding: '15px 22px', cursor: 'pointer',
                        fontWeight: 700, fontSize: 14, textTransform: 'uppercase', letterSpacing: 1,
                        color: netTab === key ? ka.accent : '#888',
                        border: 'none', background: 'none', position: 'relative',
                        fontFamily: 'var(--font-poppins)',
                      }}>
                {label}
                {netTab === key && <span style={{ position: 'absolute', bottom: -2, left: 0, width: '100%', height: 3, background: ka.accent, display: 'block' }} />}
              </button>
            ))}
          </div>

          <div className="ka-net-panel" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 50 }}>
            <div>
              <h2 style={{ fontSize: 'clamp(20px, 3vw, 34px)', color: '#000', marginBottom: 20, lineHeight: 1.2 }}>
                {netContent.heading}
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: '#555' }}>{netContent.desc}</p>
            </div>
            <div className="ka-net-products" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 30 }}>
              {netContent.products.map(p => (
                <div key={p.title} style={{ background: '#fff', border: '1px solid #eee', padding: 24, borderRadius: 8 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt={p.title}
                       className="ka-net-img"
                       style={{ width: '100%', height: 260, objectFit: 'cover', marginBottom: 20, borderRadius: 6 }} />
                  <h4 style={{ fontSize: 22, margin: '10px 0 14px', color: '#000' }}>{p.title}</h4>
                  <p style={{ fontSize: 14, color: '#555', marginBottom: 8 }}>{p.intro}</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {p.bullets.map(b => (
                      <li key={b} style={{ fontSize: 14, color: '#555', lineHeight: 1.9, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: ka.accent, flexShrink: 0, display: 'inline-block' }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                  {(p as any).links && (
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 14 }}>
                      {(p as any).links.map((lnk: any) => (
                        <a key={lnk.href} href={lnk.href}
                           style={{ fontSize: 12, fontWeight: 600, padding: '5px 14px', borderRadius: 4, border: `1.5px solid ${ka.accent}`, color: ka.accent, textDecoration: 'none', background: '#fff', transition: 'all 0.2s' }}
                           onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = ka.accent; el.style.color = '#fff'; }}
                           onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = '#fff'; el.style.color = ka.accent; }}>
                          {lnk.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PRODUCTION SCANNERS
      ══════════════════════════════════════════ */}
      <section id="production-scanners" style={{ width: '100%', background: '#f8fafc', padding: '60px 20px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          <div className="ka-reveal" style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 700, color: '#000', marginBottom: 6 }}>Production Scanners</h2>
            <p style={{ fontSize: 15, color: '#6b7280' }}>High-speed scanning solutions built for demanding back-office and enterprise environments.</p>
          </div>

          <div className="ka-prod-body ka-reveal ka-reveal-d1"
               style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden', minHeight: 520 }}>

            {/* Left nav */}
            <div className="ka-prod-list" style={{ borderRight: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', background: '#fff' }}>
              {productionScanners.map((item, idx) => (
                <div key={item.num} onClick={() => setProdActive(idx)}
                     style={{ borderBottom: idx < productionScanners.length - 1 ? '1px solid #e5e7eb' : 'none', cursor: 'pointer' }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 14, padding: '18px 24px',
                    background: prodActive === idx ? '#f0fafa' : '#fff', transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => { if (prodActive !== idx) (e.currentTarget as HTMLDivElement).style.background = '#f9fafb'; }}
                  onMouseLeave={e => { if (prodActive !== idx) (e.currentTarget as HTMLDivElement).style.background = '#fff'; }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: ka.accent, letterSpacing: 1, minWidth: 24 }}>{item.num}</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: prodActive === idx ? ka.accent : '#1f2937', flex: 1, lineHeight: 1.4 }}>{item.navTitle}</span>
                    <span style={{ fontSize: 18, color: prodActive === idx ? ka.accent : '#d1d5db', transition: 'transform 0.3s, color 0.3s', transform: prodActive === idx ? 'rotate(90deg)' : 'none' }}>›</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Right panel */}
            <div style={{ background: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
              {productionScanners.map((item, idx) => (
                <div key={item.num}
                     style={{
                       display: prodActive === idx ? 'flex' : 'none',
                       flexDirection: 'column', height: '100%',
                       padding: '36px 36px 28px', gap: 20,
                     }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: ka.accent, textTransform: 'uppercase', letterSpacing: 1, margin: 0 }}>{item.tag}</p>
                  <h3 style={{ fontSize: 22, fontWeight: 700, color: '#0f1320', margin: '6px 0 10px', lineHeight: 1.3 }}>{item.heading}</h3>
                  <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.75, margin: 0 }}>{item.desc}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {item.features.map(f => (
                      <div key={f} style={{ fontSize: 13, color: '#374151', display: 'flex', alignItems: 'flex-start', gap: 8, lineHeight: 1.5 }}>
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: ka.accent, flexShrink: 0, marginTop: 6 }} />
                        {f}
                      </div>
                    ))}
                  </div>
                  {(item as any).links && (
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {(item as any).links.map((lnk: any) => (
                        <a key={lnk.href} href={lnk.href}
                           style={{ fontSize: 12, fontWeight: 600, padding: '5px 14px', borderRadius: 4, border: `1.5px solid ${ka.accent}`, color: ka.accent, textDecoration: 'none', background: '#fff', transition: 'all 0.2s' }}
                           onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = ka.accent; el.style.color = '#fff'; }}
                           onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = '#fff'; el.style.color = ka.accent; }}>
                          {lnk.label}
                        </a>
                      ))}
                    </div>
                  )}
                  <div style={{ marginTop: 'auto', paddingTop: 20 }}>
                    <div style={{ borderRadius: 6, overflow: 'hidden', border: '1px solid #e5e7eb', background: '#fff' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.image} alt={item.imageLabel}
                           style={{ width: '100%', height: 200, objectFit: 'contain', display: 'block' }} />
                      <div style={{ fontSize: 11, fontWeight: 700, textAlign: 'center', background: ka.accent, color: '#fff', padding: '6px 0', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                        {item.imageLabel}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FLATBED ACCESSORIES
      ══════════════════════════════════════════ */}
      <section id="flatbed-accessories" style={{ width: '100%', background: '#fff', padding: '60px 20px 80px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          <div className="ka-reveal" style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 700, color: '#000', marginBottom: 6 }}>Flatbed Accessories</h2>
            <p style={{ fontSize: 15, color: '#6b7280' }}>Handle exception documents without breaking your scanning workflow.</p>
          </div>

          <div className="ka-flat-tabs ka-reveal ka-reveal-d1" style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
            {[{ num: '01', label: 'Modular Accessories' }, { num: '02', label: 'Compatibility' }].map((tab, i) => (
              <button key={i} onClick={() => setFlatTab(i)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        padding: '10px 24px', borderRadius: 4, cursor: 'pointer',
                        border: `1.5px solid ${flatTab === i ? ka.accent : '#e5e7eb'}`,
                        background: flatTab === i ? ka.accent : '#fff',
                        transition: 'all 0.2s', fontFamily: 'var(--font-poppins)',
                      }}>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: flatTab === i ? 'rgba(255,255,255,0.6)' : '#9ca3af' }}>{tab.num}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: flatTab === i ? '#fff' : '#374151' }}>{tab.label}</span>
              </button>
            ))}
          </div>

          {flatTab === 0 && (
            <div className="ka-flat-grid"
                 style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: '#f3f4f6', border: '1px solid #f3f4f6', borderRadius: 10, overflow: 'hidden' }}>
              <div style={{ background: '#fff', padding: 36, display: 'flex', flexDirection: 'column', gap: 14 }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: ka.accent, textTransform: 'uppercase', letterSpacing: '1.2px', margin: 0 }}>Flatbed Accessories</p>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0f1320', margin: 0, lineHeight: 1.4 }}>Modular accessories for every document type</h3>
                <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.75, margin: 0 }}>Handle exception documents without breaking your scanning workflow — attach the right flatbed and keep productivity high.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                  {[
                    'Passport Flatbed — scan passports and thick or fragile documents, no cover to lift',
                    'Legal/A4 Flatbed — for bound, delicate or oversized documents',
                    'A3 Flatbed — attaches via USB for large format and fragile originals',
                  ].map(f => (
                    <div key={f} style={{ fontSize: 13, color: '#374151', display: 'flex', alignItems: 'flex-start', gap: 9, lineHeight: 1.5 }}>
                      <span style={{ width: 5, height: 5, borderRadius: '50%', background: ka.accent, flexShrink: 0, marginTop: 5 }} />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ background: '#fff', padding: 36, display: 'flex', flexDirection: 'column', gap: 14 }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: ka.accent, textTransform: 'uppercase', letterSpacing: '1.2px', margin: 0 }}>Accessories</p>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0f1320', margin: 0, lineHeight: 1.4 }}>Built to extend your scanner&apos;s capability</h3>
                <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.75, margin: 0 }}>Each flatbed accessory is designed to seamlessly pair with your existing scanner — expanding what&apos;s possible without adding complexity.</p>
                <div style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid #e5e7eb', marginTop: 4 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://res.cloudinary.com/df52xzi3y/image/upload/v1782152342/Flatbed-accessories_nr62qn.webp"
                       alt="Flatbed Accessories"
                       style={{ width: '100%', height: 200, objectFit: 'cover', display: 'block' }} />
                </div>
              </div>
            </div>
          )}

          {flatTab === 1 && (
            <div className="ka-flat-grid"
                 style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: '#f3f4f6', border: '1px solid #f3f4f6', borderRadius: 10, overflow: 'hidden' }}>
              {[
                {
                  tag: 'Compatible With', title: 'Passport & Legal/A4 Flatbed',
                  desc: 'The Passport and Legal/A4 flatbed accessories are compatible with the following scanner models.',
                  chips: ['E1030','E1040','S2050','S2070','S2060w','S2080w'],
                },
                {
                  tag: 'Compatible With', title: 'A3 Flatbed',
                  desc: 'The A3 flatbed accessory attaches via USB and is compatible with the S3000 series scanners for large format and fragile originals.',
                  chips: ['S3000 Series'],
                },
              ].map(panel => (
                <div key={panel.title} style={{ background: '#fff', padding: 36, display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: ka.accent, textTransform: 'uppercase', letterSpacing: '1.2px', margin: 0 }}>{panel.tag}</p>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0f1320', margin: 0, lineHeight: 1.4 }}>{panel.title}</h3>
                  <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.75, margin: 0 }}>{panel.desc}</p>
                  <div style={{ background: '#f0fafa', border: '1px solid #b2dfdf', borderRadius: 8, padding: 20 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: ka.accent, textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 12px' }}>Supported Models</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {panel.chips.map(chip => (
                        <span key={chip} style={{ fontSize: 12, fontWeight: 600, background: '#fff', border: `1px solid ${ka.accent}`, color: ka.accent, padding: '4px 12px', borderRadius: 4 }}>
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          RESPONSIVE STYLES
      ══════════════════════════════════════════ */}
      <style>{`
        /* ── Animations ── */
        @keyframes kaPulse { 0%,100%{ opacity:1; transform:scale(1); } 50%{ opacity:.5; transform:scale(.8); } }
        .ka-reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.65s cubic-bezier(0.22,1,0.36,1), transform 0.65s cubic-bezier(0.22,1,0.36,1); }
        .ka-reveal.ka-visible { opacity: 1; transform: translateY(0); }
        .ka-reveal-d1 { transition-delay: 0.12s; }
        .ka-reveal-d2 { transition-delay: 0.24s; }

        /* ── Hero ── */
        .ka-hero { height: 680px; }

        /* ── Tablet 768–1024px ── */
        @media (max-width: 1024px) {
          .ka-comm-inner { grid-template-columns: 1fr !important; gap: 40px !important; }
          .ka-net-panel  { grid-template-columns: 1fr !important; gap: 32px !important; }
          .ka-prod-body  { grid-template-columns: 1fr !important; }
          .ka-prod-list  { border-right: none !important; border-bottom: 1px solid #e5e7eb !important; }
          .ka-flat-grid  { grid-template-columns: 1fr !important; }
          .ka-scanner-layout { flex-direction: column-reverse !important; gap: 32px !important; min-height: unset !important; }
          .ka-scanner-img { height: 320px !important; }
          .ka-sw-grid    { grid-template-columns: 1fr !important; }
        }

        /* ── Tablet 768px ── */
        @media (max-width: 768px) {
          .ka-hero { height: 420px !important; }
          .ka-slide { align-items: flex-end !important; padding-bottom: 70px !important; }
          .ka-vignette { background: linear-gradient(180deg, transparent 10%, rgba(0,0,0,0.85) 70%) !important; }
          .ka-hero-container { padding: 0 24px !important; }
          .ka-hero-content { max-width: 100% !important; }
          .ka-dots { left: 24px !important; transform: none !important; bottom: 22px !important; }
          .ka-nav-inner { height: 52px !important; gap: 12px !important; padding: 0 16px !important; }
          .ka-nav-placeholder { height: 52px !important; }
          .ka-nav-links { gap: 4px !important; }
          .ka-nav-links li a { font-size: 12.5px !important; padding: 4px 10px !important; }
          .ka-nav-cta { padding: 7px 14px !important; font-size: 12px !important; }
          .ka-net-products { grid-template-columns: 1fr !important; }
          .ka-net-img { height: 200px !important; }
          .ka-scanner-img { height: 260px !important; }
        }

        /* ── Mobile 480px ── */
        @media (max-width: 480px) {
          .ka-hero { height: 550px !important; }
          .ka-hero-content { max-width: 100% !important; }
          .ka-hero-heading { letter-spacing: 0 !important; }
          .ka-hero-desc { font-size: 13px !important; margin-bottom: 20px !important; }
          .ka-hero-btn { padding: 10px 20px !important; font-size: 12px !important; margin-bottom: 35px !important; }
          .ka-flat-tabs { flex-direction: column !important; }
          .ka-flat-tabs button { width: 100% !important; justify-content: flex-start !important; }
        }
      `}</style>
    </main>
  );
}
