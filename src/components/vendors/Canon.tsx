'use client';

import { useState, useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────
   THEME
───────────────────────────────────────────── */
const c = {
  bg:     '#ffffff',
  alt:    '#f9fafb',
  alt2:   '#f8fafc',
  navy:   '#0b1a2e',
  accent: '#CC0000',
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
    lines: ['Desktop', 'Scanners.'],
    accentLine: 1,
    desc: 'From the compact DR-C225II to the high-speed DR-M160II — Canon desktop scanners deliver precision and reliability for every workspace.',
    cta: { label: 'View Scanners', href: 'https://products.rookie-ninja.com/brand/canon/', solid: true },
    bg: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1782244677/desktop-scanners_yiwicw.webp',
  },
  {
    badge: 'Cheque Scanners',
    lines: ['Cheque', 'Scanners.'],
    accentLine: 1,
    desc: 'The Canon CR-190ii UV and CR-120 Series deliver high-speed, accurate cheque processing with UV counterfeit detection for banking environments.',
    cta: { label: 'View Scanners', href: 'https://products.rookie-ninja.com/brand/canon/', solid: true },
    bg: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1782244677/cheque-scanners_qc70ms.webp',
  },
  {
    badge: 'Workgroup & Departmental',
    lines: ['Workgroup', 'Scanners.'],
    accentLine: 1,
    desc: 'Canon DR-S130/S150, ScanFront 400, and S350NW — network-ready scanners built for shared office environments and high daily throughput.',
    cta: { label: 'View Scanners', href: 'https://products.rookie-ninja.com/brand/canon/', solid: true },
    bg: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1782244677/document-scanners_nzfa4o.webp',
  },
  {
    badge: 'Production Scanners',
    lines: ['Production', 'Scanners.'],
    accentLine: 1,
    desc: 'The Canon DR-6030C and DR-G2090/G2110/G2140 handle the highest-volume scanning demands with unmatched speed and durability.',
    cta: { label: 'View Scanners', href: 'https://products.rookie-ninja.com/brand/canon/', solid: true },
    bg: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1782244676/production-scanners_j2btop.webp',
  },
];

const desktopCards = [
  {
    tag: 'Compact Series',
    title: 'DR-C225II / DR-C340 / DR-C350 / DR-M260',
    desc: 'Space-saving upright feed design for busy front-office environments.',
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1782244762/dr-c230-frt_4572bbab70f44e599de7e19f33f5f51e_u2sr3z.webp',
    features: [
      'DR-C225II — 25ppm | 30 Sheet ADF',
      'DR-C340 — 40ppm | 100 Sheet ADF',
      'DR-C350 — 50ppm | 100 Sheet ADF',
      'DR-M260 — 60ppm | 60 Sheet ADF',
      'Ultrasonic double-feed detection',
    ],
  },
  {
    tag: 'High Speed Desktop',
    title: 'DR-M160II',
    desc: 'High-speed desktop scanner for document-intensive office environments.',
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1782244762/dr-m160ii_hero_fa13faf76e7049e1bc09702a6d5d4a45_rboeam.avif',
    features: [
      '60ppm / 120ipm duplex scanning',
      '60 Sheet ADF capacity',
      'Handles A3 by folding documents',
      'USB 3.0 connectivity',
      'Compatible with CaptureOnTouch',
    ],
  },
  {
    tag: 'Flatbed Desktop',
    title: 'DRM 140II',
    desc: 'Flatbed scanner ideal for bound books, fragile documents, and mixed media.',
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1782244762/dr-m140ii-paper-tray-out-fsr_hero_52226af5cb054c51ac844d696a7e7485_qsy04l.avif',
    features: [
      '40ppm ADF | A4 flatbed glass',
      '50 Sheet ADF capacity',
      'Scans passports, cards & receipts',
      'Compact footprint for desktop use',
      'USB connectivity',
    ],
  },
];

const chequeItems = [
  {
    tag: 'High Speed',
    title: 'CR-190ii UV',
    desc: "Canon's fastest cheque scanner with UV counterfeit detection for high-volume banking.",
    bullets: ['190 cheques/min', 'UV counterfeit detection', 'MICR (E13B & CMC7) reading', 'Endorsement printing', 'Double-feed detection'],
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1782244839/cr-190i190iuv-b1_tevpee.webp',
  },
  {
    tag: 'Compact Series',
    title: 'CR-120 Series',
    desc: 'Compact, reliable cheque scanner for branch-level and mid-volume environments.',
    bullets: ['120 cheques/min', 'Compact and space-saving design', 'MICR reading (E13B)', 'Endorsement printing', 'Ultrasonic double-feed detection'],
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1782244839/CR-120-Gallery-3-removebg-preview_gxui0l.webp',
  },
];

const workgroupTabs = [
  {
    id: 'departmental',
    label: 'Departmental',
    heading: 'Departmental Scanners',
    intro: 'High-speed scanners built for demanding departmental use — robust ADF, reliable feeding, and fast batch processing for busy workgroups.',
    products: [
      {
        title: 'DR-S130',
        image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1782244927/dr-s130-fra-800x800_c85d1d7c618f49328014c3bc908beb20_vymrq4.avif',
        bullets: ['30ppm | 50 Sheet ADF', 'USB 3.1 connectivity', 'Ultrasonic double-feed detection', 'Compatible with CaptureOnTouch Pro'],
      },
      {
        title: 'DR-S150',
        image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1782244927/dr-s150-bk-fra-800x800_710d1bd4971c4f7c9f19845009c5f8bb_ktg2lh.avif',
        bullets: ['50ppm | 50 Sheet ADF', 'USB 3.1 connectivity', 'Ultrasonic double-feed detection', 'Slim, space-saving design'],
      },
    ],
  },
  {
    id: 'network',
    label: 'Network / Connected',
    heading: 'Network / Connected Scanners',
    intro: 'PC-free and network-ready scanners with built-in Wi-Fi, touchscreen control, and cloud connectivity for shared office environments.',
    products: [
      {
        title: 'ScanFront 400',
        image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1782244926/imageformula-scanfront-400-open-frt_810x475_xvcnco.webp',
        bullets: ['45ppm | 60 Sheet ADF', '10.1" colour touchscreen', 'Wired & Wi-Fi connectivity', 'Scan-to-email, FTP, cloud & USB', 'No PC required'],
      },
      {
        title: 'S350NW',
        image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1782244926/s350nw_uwq1yh.webp',
        bullets: ['35ppm | 50 Sheet ADF', 'Wi-Fi and wired LAN', 'Scan-to-cloud and scan-to-folder', 'Lightweight, portable design'],
      },
    ],
  },
];

const productionItems = [
  {
    num: '01',
    label: 'Departmental Production — DR-6030C',
    tag: 'Departmental Production',
    title: 'DR-6030C',
    desc: 'A high-speed colour production scanner built for demanding document capture with large daily volumes.',
    features: [
      '60ppm / 120ipm duplex colour scanning',
      '500 Sheet ADF capacity',
      'Handles documents from A8 to A3',
      'Ultrasonic double-feed detection',
      'USB 2.0 and SCSI connectivity',
      'Compatible with ISIS and TWAIN drivers',
    ],
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1782244999/dr-6030c-frt-closed_e097546322ac4f139e9e8aece3feeff3_pxlqq3.avif',
    cap: '',
  },
  {
    num: '02',
    label: 'High Volume — DR-G2090 / DR-G2110 / DR-G2140',
    tag: 'High Volume Production',
    title: 'DR-G2090 / DR-G2110 / DR-G2140',
    desc: "Canon's flagship production scanner series — engineered for the highest-volume digitisation with unmatched reliability and image quality.",
    features: [
      'DR-G2090 — 90ppm | DR-G2110 — 110ppm | DR-G2140 — 140ppm',
      '500 Sheet ADF | Handles A3, A4, and mixed batches',
      'Long document mode up to 5,000mm',
      'Ultrasonic double-feed detection with override',
      'USB 3.0 and Gigabit Ethernet connectivity',
      'Compatible with ISIS, TWAIN, and WIA drivers',
    ],
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1782244999/dr-g2090-fra-02_a2c23412e2e7436b93cca63f1587dc7c_zyqan0.webp',
    cap: 'DR-G2090 / DR-G2110 / DR-G2140',
  },
];

const navLinks = [
  { label: 'Desktop Scanners',               href: '#desktop-scanners' },
  { label: 'Cheque Scanners',                href: '#cheque-scanners' },
  { label: 'Workgroup & Departmental',       href: '#workgroup-departmental-scanners' },
  { label: 'Production Scanners',            href: '#production-scanners' },
  { label: 'Canon PDF Editor',               href: '/readiris-pdf' },
];

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function CanonPage() {

  const [heroIdx, setHeroIdx]         = useState(0);
  const [progress, setProgress]       = useState(0);
  const rafRef                        = useRef<number | null>(null);
  const startRef                      = useRef<number | null>(null);
  const heroRef                       = useRef<HTMLElement>(null);
  const DURATION                      = 5000;

  const [isSticky, setIsSticky]       = useState(false);
  const [chequeTab, setChequeTab]     = useState(0);
  const [chequeFade, setChequeFade]   = useState(false);
  const [wgTab, setWgTab]             = useState(0);
  const [prodItem, setProdItem]       = useState(0);
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
    if (isSticky) document.body.classList.add('ka-subnav-active');
    else          document.body.classList.remove('ka-subnav-active');
    return () => document.body.classList.remove('ka-subnav-active');
  }, [isSticky]);

  /* ── Scroll-reveal ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('cn-visible'); observer.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.cn-reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* ── Cheque image swap ── */
  const switchCheque = (idx: number) => {
    if (idx === chequeTab) return;
    setChequeFade(true);
    setTimeout(() => { setChequeTab(idx); setChequeFade(false); }, 300);
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

  return (
    <div style={{ fontFamily: 'var(--font-poppins), sans-serif', background: c.bg, color: c.text }}>

      {/* ══════════════════════════════════════════
          HERO SLIDER
      ══════════════════════════════════════════ */}
      <section ref={heroRef} className="cn-hero" style={{ position: 'relative', width: '100%', height: 680, overflow: 'hidden', background: '#000' }}>

        {heroSlides.map((s, i) => (
          <div key={i} style={{
            position: 'absolute', inset: 0, display: 'flex', alignItems: 'center',
            opacity: i === heroIdx ? 1 : 0,
            transition: 'opacity 0.9s cubic-bezier(0.77,0,0.175,1)',
            zIndex: i === heroIdx ? 2 : 1,
          }}>
            {/* BG */}
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: `url('${s.bg}')`,
              backgroundSize: 'cover', backgroundPosition: 'center',
              transform: i === heroIdx ? 'scale(1)' : 'scale(1.06)',
              transition: 'transform 6s ease',
              filter: 'brightness(0.38)',
            }} />
            {/* Gradient overlay */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(0,0,0,0.72) 38%, transparent 80%)', zIndex: 0 }} />

            {/* Content */}
            <div style={{ position: 'relative', zIndex: 3, width: '100%', maxWidth: 1220, margin: '0 auto', padding: '0 20px' }}>
              <div style={{
                maxWidth: 580,
                opacity: i === heroIdx ? 1 : 0,
                transform: i === heroIdx ? 'translateY(0)' : 'translateY(24px)',
                transition: 'opacity 0.7s ease 0.4s, transform 0.7s ease 0.4s',
              }}>
                {/* Badge with pulse dot */}
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: c.accent, color: '#fff',
                  fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase',
                  padding: '5px 12px', marginBottom: 18, borderRadius: 2,
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff', opacity: 0.9, display: 'inline-block', animation: 'cnPulse 2s infinite' }} />
                  {s.badge}
                </span>

                <h1 className="cn-hero-heading" style={{ fontSize: 'clamp(48px, 6vw, 78px)', color: '#fff', lineHeight: 0.95, marginBottom: 18, fontWeight: 700, letterSpacing: 1 }}>
                  {s.lines.map((line, li) => (
                    <span key={li} style={{ display: 'block', color: li === s.accentLine ? c.accent : '#fff' }}>{line}</span>
                  ))}
                </h1>

                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.72)', lineHeight: 1.65, marginBottom: 32, fontWeight: 300, maxWidth: 420 }}>
                  {s.desc}
                </p>

                {s.cta && (
                  <a href={s.cta.href} style={{
                    display: 'inline-block', padding: '13px 28px',
                    background: s.cta.solid ? '#fff' : 'transparent',
                    color: s.cta.solid ? '#0d0d0d' : '#fff',
                    border: `2px solid ${s.cta.solid ? '#fff' : '#fff'}`,
                    fontSize: 13, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase',
                    textDecoration: 'none', cursor: 'pointer',
                    transition: 'background 0.25s, color 0.25s, border-color 0.25s',
                  }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = c.accent; el.style.borderColor = c.accent; el.style.color = '#fff'; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = s.cta!.solid ? '#fff' : 'transparent'; el.style.borderColor = '#fff'; el.style.color = s.cta!.solid ? '#0d0d0d' : '#fff'; }}>
                    {s.cta.label}
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Dots */}
        <div style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(calc(-570px + 20px))', display: 'flex', gap: 10, zIndex: 10 }}
             className="cn-dots">
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => goSlide(i)} style={{
              width: 10, height: 10, borderRadius: '50%',
              background: i === heroIdx ? c.accent : 'rgba(255,255,255,0.35)',
              border: 'none', cursor: 'pointer', padding: 0,
              transform: i === heroIdx ? 'scale(1.3)' : 'scale(1)',
              transition: 'background 0.3s, transform 0.3s',
            }} />
          ))}
        </div>

        {/* Progress bar */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, height: 3, background: c.accent, width: `${progress}%`, zIndex: 10, transition: 'width 0.1s linear' }} />
      </section>

      {/* ══════════════════════════════════════════
          STICKY SUB-NAV
      ══════════════════════════════════════════ */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999,
        background: '#fff', borderBottom: `1px solid ${c.line}`,
        boxShadow: '0 2px 20px rgba(0,0,0,0.12)',
        transform: isSticky ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
      }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', height: 58, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', gap: 20 }}>
          <div className="cn-subnav-links" style={{ display: 'flex', alignItems: 'center', flex: 1, gap: 28, overflowX: 'auto', scrollbarWidth: 'none' }}>
            {navLinks.map((lnk, i) => (
              <a key={i} href={lnk.href} style={{
                fontSize: 13, fontWeight: 500, color: '#111', textDecoration: 'none',
                whiteSpace: 'nowrap', padding: '4px 0', position: 'relative',
                letterSpacing: 0.15, transition: 'color 0.2s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = c.accent;
                (el.querySelector('.cn-underline') as HTMLElement | null)?.style.setProperty('width', '100%');
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = '#111';
                (el.querySelector('.cn-underline') as HTMLElement | null)?.style.setProperty('width', '0');
              }}>
                {lnk.label}
                <span className="cn-underline" style={{
                  position: 'absolute', bottom: 0, left: 0, width: 0, height: 2,
                  background: c.accent, borderRadius: 2, transition: 'width 0.25s ease',
                }} />
              </a>
            ))}
          </div>
          <a href="#workgroup-departmental-scanners" style={{
            flexShrink: 0, padding: '10px 22px', background: c.accent, color: '#fff',
            fontSize: 13, fontWeight: 600, borderRadius: 50, textDecoration: 'none',
            whiteSpace: 'nowrap', transition: 'background 0.2s',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#aa0000'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = c.accent; }}>
            Get a Quote
          </a>
        </div>
      </nav>

      {/* ══════════════════════════════════════════
          SECTION 1: DESKTOP SCANNERS — 3 CARDS
      ══════════════════════════════════════════ */}
      <section id="desktop-scanners" style={{ width: '100%', padding: '72px 20px', background: c.alt }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>

          <div className="cn-reveal" style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700, color: c.text, lineHeight: 1.2, marginBottom: 14, letterSpacing: -0.3 }}>
              Desktop Scanners
            </h2>
            <p style={{ fontSize: 15, color: c.dim, lineHeight: 1.65, maxWidth: 560, margin: '0 auto' }}>
              Compact, reliable A4 scanning solutions for front-office and everyday business workflows — from simple desktop models to high-speed professional scanners.
            </p>
          </div>

          <div className="cn-cards-3 cn-reveal cn-reveal-d1" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
            {desktopCards.map((card, i) => (
              <div key={i} style={{
                background: '#fff', borderRadius: 16, border: `1px solid ${c.line}`,
                overflow: 'hidden', boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
                transition: 'box-shadow 0.3s ease, transform 0.3s ease',
                display: 'flex', flexDirection: 'column',
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = '0 8px 32px rgba(0,0,0,0.12)'; el.style.transform = 'translateY(-4px)'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = '0 2px 16px rgba(0,0,0,0.06)'; el.style.transform = 'translateY(0)'; }}>
                <div style={{ width: '100%', height: 220, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f9fb' }}>
                  <img src={card.image} alt={card.title}
                       style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', padding: 16, transition: 'transform 0.5s ease' }}
                       onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)'; }}
                       onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; }} />
                </div>
                <div style={{ padding: '24px 24px 28px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: c.accent, textTransform: 'uppercase', letterSpacing: 1.2, margin: '0 0 8px' }}>{card.tag}</p>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: c.text, margin: '0 0 10px', lineHeight: 1.3 }}>{card.title}</h3>
                  <p style={{ fontSize: 13.5, color: c.dim, lineHeight: 1.65, margin: '0 0 16px' }}>{card.desc}</p>
                  <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 7 }}>
                    {card.features.map((f, fi) => (
                      <li key={fi} style={{ fontSize: 13, fontWeight: 500, color: '#374151', paddingLeft: 16, position: 'relative', lineHeight: 1.4 }}>
                        <span style={{ position: 'absolute', left: 0, top: 6, width: 6, height: 6, borderRadius: '50%', background: c.accent, display: 'block' }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 2: CHEQUE SCANNERS — SWITCHER
      ══════════════════════════════════════════ */}
      <section id="cheque-scanners" style={{ width: '100%', padding: '80px 20px', background: c.bg }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>

          <div className="cn-reveal" style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 34px)', fontWeight: 700, color: c.text, marginBottom: 10 }}>Cheque Scanners</h2>
            <p style={{ fontSize: 16, color: '#64748b', maxWidth: 700, lineHeight: 1.7, margin: 0 }}>
              High-speed, high-accuracy cheque capture engineered for banking, financial institutions, and payment processing environments.
            </p>
          </div>

          <div className="cn-cheque-layout cn-reveal cn-reveal-d1" style={{ display: 'flex', gap: 60, alignItems: 'center', minHeight: 460 }}>

            {/* Left: items */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
              {chequeItems.map((item, i) => (
                <div key={i} onClick={() => switchCheque(i)}
                     style={{
                       padding: 24, borderRadius: 16, cursor: 'pointer',
                       border: `1px solid ${i === chequeTab ? 'rgba(204,0,0,0.15)' : 'transparent'}`,
                       background: i === chequeTab ? '#fff' : 'transparent',
                       boxShadow: i === chequeTab ? '0 10px 25px -5px rgba(0,0,0,0.05)' : 'none',
                       transition: 'all 0.3s ease',
                     }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: c.accent, textTransform: 'uppercase', letterSpacing: 0.5, margin: '0 0 8px' }}>{item.tag}</p>
                  <h3 style={{ fontSize: 22, fontWeight: 600, color: c.text, margin: '0 0 14px' }}>{item.title}</h3>
                  <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.9, margin: 0 }}>{item.desc}</p>
                  {i === chequeTab && (
                    <ul style={{ listStyle: 'none', margin: '14px 0 0', padding: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {item.bullets.map((b, bi) => (
                        <li key={bi} style={{ fontSize: 13, color: '#374151', paddingLeft: 16, position: 'relative', lineHeight: 1.5 }}>
                          <span style={{ position: 'absolute', left: 0, top: 6, width: 5, height: 5, borderRadius: '50%', background: c.accent, display: 'block' }} />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            {/* Right: image */}
            <div style={{ flex: 1.2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={chequeItems[chequeTab].image} alt={chequeItems[chequeTab].title}
                   style={{
                     width: '100%', maxWidth: 560, height: 400, objectFit: 'contain',
                     borderRadius: 20, padding: 20, opacity: chequeFade ? 0 : 1,
                     transition: 'opacity 0.4s ease',
                   }} />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 3A: WORKGROUP — DARK + FORM
      ══════════════════════════════════════════ */}
      <section id="workgroup-departmental-scanners" style={{ width: '100%', padding: '80px 20px', background: `linear-gradient(90deg, ${c.navy}, #0d223d)`, color: '#fff' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div className="cn-comm-inner cn-reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: 60, alignItems: 'center' }}>

            {/* Left */}
            <div>
              <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700, marginBottom: 20, color: '#fff', lineHeight: 1.2 }}>
                Workgroup &amp; Departmental Scanners
              </h2>
              <p style={{ fontSize: 15, color: '#cbd5e1', lineHeight: 1.7, marginBottom: 20 }}>
                Canon workgroup scanners are built for shared office environments — delivering network connectivity, high-speed batch scanning, touchscreen controls, and PC-free operation for distributed teams and busy departments.
              </p>
              <div style={{ fontSize: 14, color: '#cbd5e1', lineHeight: 2 }}>
                <strong style={{ color: '#fff', fontSize: 13, letterSpacing: 0.5, textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Models in this range</strong>
                • DR-S130 — 30ppm | USB 3.1 | Departmental<br />
                • DR-S150 — 50ppm | USB 3.1 | Departmental<br />
                • ScanFront 400 — 45ppm | 10.1&quot; touchscreen | Network / PC-free<br />
                • S350NW — 35ppm | Wi-Fi + LAN | Network / Portable
              </div>
            </div>

            {/* Right: form */}
            <div style={{
              background: 'rgba(255,255,255,0.06)', padding: 30, borderRadius: 14,
              border: '1px solid rgba(255,255,255,0.1)',
            }}>
              <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 20, color: '#fff' }}>Inquire for Distribution</h3>

              {formState === 'success' ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ fontSize: 36, marginBottom: 12 }}>✓</div>
                  <p style={{ fontSize: 16, fontWeight: 600, color: '#fff', marginBottom: 8 }}>Inquiry sent!</p>
                  <p style={{ fontSize: 13, color: '#94a3b8' }}>We will get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <input name="name" type="text" placeholder="Full Name" required
                         style={{ width: '100%', padding: '12px 14px', borderRadius: 6, border: 'none', background: 'rgba(255,255,255,0.12)', color: '#fff', fontSize: 14, outline: 'none' }} />
                  <input name="email" type="email" placeholder="Business Email" required
                         style={{ width: '100%', padding: '12px 14px', borderRadius: 6, border: 'none', background: 'rgba(255,255,255,0.12)', color: '#fff', fontSize: 14, outline: 'none' }} />
                  <select name="category" required
                          style={{ width: '100%', padding: '12px 14px', borderRadius: 6, border: 'none', background: 'rgba(255,255,255,0.12)', color: '#e5e7eb', fontSize: 14, outline: 'none' }}>
                    <option value="">Select Product Category</option>
                    {['Desktop Scanners', 'Cheque Scanners', 'Workgroup & Departmental Scanners', 'Production Scanners'].map(opt => (
                      <option key={opt} style={{ background: '#fff', color: '#000' }}>{opt}</option>
                    ))}
                  </select>
                  <button type="submit" disabled={formState === 'sending'}
                          style={{
                            marginTop: 10, padding: 13, background: c.accent, color: '#fff',
                            fontWeight: 600, border: 'none', borderRadius: 6, cursor: 'pointer',
                            letterSpacing: 1, fontSize: 13, textTransform: 'uppercase',
                            opacity: formState === 'sending' ? 0.7 : 1, transition: 'opacity 0.2s, background 0.2s',
                            fontFamily: 'var(--font-poppins)',
                          }}>
                    {formState === 'sending' ? 'Sending…' : 'Send Inquiry'}
                  </button>
                  {formState === 'error' && (
                    <p style={{ fontSize: 13, color: '#fca5a5', textAlign: 'center', margin: 0 }}>
                      Something went wrong. Please try again.
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 3B: WORKGROUP PRODUCTS — TABS
      ══════════════════════════════════════════ */}
      <section style={{ width: '100%', background: c.alt2 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '72px 20px' }}>

          {/* Tab nav */}
          <div style={{ display: 'flex', flexWrap: 'wrap', borderBottom: '2px solid #eee', marginBottom: 40, gap: 10 }}>
            {workgroupTabs.map((tab, i) => (
              <button key={i} onClick={() => setWgTab(i)}
                      style={{
                        padding: '15px 22px', cursor: 'pointer', fontWeight: 700, fontSize: 14,
                        textTransform: 'uppercase', letterSpacing: 1,
                        color: i === wgTab ? c.accent : '#888',
                        border: 'none', background: 'none', position: 'relative',
                        fontFamily: 'var(--font-poppins)',
                        borderBottom: i === wgTab ? `3px solid ${c.accent}` : '3px solid transparent',
                        marginBottom: -2, transition: 'color 0.2s',
                      }}>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Active panel */}
          <div className="cn-wg-panel cn-reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 50, alignItems: 'start' }}>
            <div>
              <h2 style={{ fontSize: 34, fontWeight: 700, color: c.text, marginBottom: 20, lineHeight: 1.2 }}>
                {workgroupTabs[wgTab].heading}
              </h2>
              <p style={{ fontSize: 15, color: c.dim, lineHeight: 1.8 }}>
                {workgroupTabs[wgTab].intro}
              </p>
            </div>
            <div className="cn-wg-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
              {workgroupTabs[wgTab].products.map((p, pi) => (
                <div key={pi} style={{
                  background: '#fff', border: `1px solid #eee`, padding: 24,
                  borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                }}>
                  <div style={{ width: '100%', height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f9fb', borderRadius: 6, marginBottom: 16 }}>
                    <img src={p.image} alt={p.title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', padding: 12 }} />
                  </div>
                  <h4 style={{ fontSize: 20, fontWeight: 700, color: c.text, margin: '0 0 12px' }}>{p.title}</h4>
                  <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 5 }}>
                    {p.bullets.map((b, bi) => (
                      <li key={bi} style={{ fontSize: 14, color: '#555', paddingLeft: 14, position: 'relative', lineHeight: 1.9 }}>
                        <span style={{ position: 'absolute', left: 0, top: 9, width: 5, height: 5, borderRadius: '50%', background: c.accent, display: 'block' }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 4: PRODUCTION SCANNERS — ACCORDION
      ══════════════════════════════════════════ */}
      <section id="production-scanners" style={{ width: '100%', padding: '72px 20px', background: c.alt }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>

          <div className="cn-reveal" style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 34px)', fontWeight: 700, color: c.text, marginBottom: 6 }}>Production Scanners</h2>
            <p style={{ fontSize: 15, color: c.dim, margin: 0 }}>High-speed, high-volume scanning solutions for demanding back-office and enterprise environments.</p>
          </div>

          <div className="cn-prod-body cn-reveal cn-reveal-d1" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', border: `1px solid #e5e7eb`, borderRadius: 8, overflow: 'hidden', minHeight: 520, background: '#fff' }}>

            {/* Left: list */}
            <div style={{ borderRight: `1px solid #e5e7eb`, display: 'flex', flexDirection: 'column', background: '#fff' }}>
              {productionItems.map((item, i) => (
                <div key={i} onClick={() => setProdItem(i)}
                     style={{
                       borderBottom: i < productionItems.length - 1 ? `1px solid #e5e7eb` : 'none',
                       cursor: 'pointer', transition: 'background 0.2s',
                     }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 14, padding: '18px 24px',
                    background: i === prodItem ? '#fff5f5' : '#fff',
                  }}
                  onMouseEnter={e => { if (i !== prodItem) (e.currentTarget as HTMLDivElement).style.background = '#f9fafb'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = i === prodItem ? '#fff5f5' : '#fff'; }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: c.accent, letterSpacing: 1, minWidth: 24 }}>{item.num}</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: i === prodItem ? c.accent : '#1f2937', flex: 1, lineHeight: 1.4, transition: 'color 0.2s' }}>{item.label}</span>
                    <span style={{ fontSize: 18, color: i === prodItem ? c.accent : '#d1d5db', transform: i === prodItem ? 'rotate(90deg)' : 'none', transition: 'transform 0.3s, color 0.3s' }}>›</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: panel */}
            <div style={{ background: c.alt2, display: 'flex', flexDirection: 'column', padding: '36px 36px 28px', gap: 20 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: c.accent, textTransform: 'uppercase', letterSpacing: 1, margin: 0 }}>
                {productionItems[prodItem].tag}
              </p>
              <h3 style={{ fontSize: 22, fontWeight: 700, color: c.text, margin: 0, lineHeight: 1.3 }}>
                {productionItems[prodItem].title}
              </h3>
              <p style={{ fontSize: 14, color: c.dim, lineHeight: 1.75, margin: 0 }}>
                {productionItems[prodItem].desc}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {productionItems[prodItem].features.map((f, fi) => (
                  <div key={fi} style={{ fontSize: 13, color: '#374151', display: 'flex', alignItems: 'flex-start', gap: 8, lineHeight: 1.5 }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: c.accent, flexShrink: 0, marginTop: 6, display: 'block' }} />
                    {f}
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 12, marginTop: 'auto', paddingTop: 20 }}>
                <div style={{ flex: 1, borderRadius: 6, overflow: 'hidden', border: `1px solid #e5e7eb`, background: '#fff', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ background: '#f8f9fb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={productionItems[prodItem].image} alt={productionItems[prodItem].title}
                         style={{ width: '100%', height: 'auto', maxHeight: 220, objectFit: 'contain', display: 'block', padding: 10 }} />
                  </div>
                  {productionItems[prodItem].cap && (
                    <div style={{ fontSize: 11, fontWeight: 700, textAlign: 'center', background: c.accent, color: '#fff', padding: '6px 0', letterSpacing: 0.5, textTransform: 'uppercase' }}>
                      {productionItems[prodItem].cap}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          RESPONSIVE STYLES
      ══════════════════════════════════════════ */}
      <style>{`
        /* ── Animations ── */
        @keyframes cnPulse { 0%,100%{ opacity:1; transform:scale(1); } 50%{ opacity:.5; transform:scale(.8); } }
        .cn-reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.65s cubic-bezier(0.22,1,0.36,1), transform 0.65s cubic-bezier(0.22,1,0.36,1); }
        .cn-reveal.cn-visible { opacity: 1; transform: translateY(0); }
        .cn-reveal-d1 { transition-delay: 0.12s; }
        .cn-reveal-d2 { transition-delay: 0.24s; }

        /* ── Hero ── */
        .cn-hero { height: 680px; }

        /* ── Dots ── */
        @media (max-width: 1140px) { .cn-dots { left: 20px !important; transform: none !important; } }

        /* ── Sub-nav ── */
        .cn-subnav-links { gap: 0; }
        .cn-subnav-links::-webkit-scrollbar { display: none; }

        /* ── ≤900px ── */
        @media (max-width: 900px) {
          .cn-cards-3 { grid-template-columns: 1fr 1fr !important; }
          .cn-cheque-layout { flex-direction: column-reverse !important; gap: 40px !important; }
          .cn-cheque-layout img { height: 280px !important; width: 100% !important; }
          .cn-comm-inner { grid-template-columns: 1fr !important; gap: 40px !important; }
          .cn-wg-panel { grid-template-columns: 1fr !important; }
          .cn-wg-grid { grid-template-columns: 1fr !important; }
          .cn-prod-body { grid-template-columns: 1fr !important; }
        }

        /* ── ≤768px ── */
        @media (max-width: 768px) {
          .cn-hero { height: 420px !important; }
          .cn-cards-3 { grid-template-columns: 1fr !important; gap: 20px !important; }
        }

        /* ── ≤480px ── */
        @media (max-width: 480px) {
          .cn-hero { height: 550px !important; }
          .cn-hero-heading { font-size: clamp(34px, 10vw, 48px) !important; }
        }
      `}</style>
    </div>
  );
}
