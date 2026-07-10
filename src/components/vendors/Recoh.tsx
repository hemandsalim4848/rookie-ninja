'use client';

import { useState, useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────
   THEME
───────────────────────────────────────────── */
const rc = {
  bg:     '#ffffff',
  alt:    '#f8fbff',
  navy:   '#0A1628',
  accent: '#C8102E',
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
    id: 'scansnap',
    badge: 'Personal & Small Business',
    lines: ['Scan Less.', 'Do More.'],
    accentLine: 1,
    desc: 'The Ricoh ScanSnap series turns paper chaos into searchable, organised digital files at the touch of a button — built for home offices and small teams.',
    cta: { label: 'View ScanSnap Series', href: '#scansnap-series', solid: true },
    bg: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1783696920/PSAI_Hero_1000x800_vpfd5j.webp',
  },
  {
    id: 'fiseries',
    badge: 'Business Document Scanners',
    lines: ['Speed Meets', 'Precision.'],
    accentLine: 1,
    desc: 'From compact desktop workhorses to ultra-fast production scanners — the Ricoh fi Series delivers industry-leading reliability for every workflow.',
    cta: { label: 'View fi Series', href: '#fi-7000-series', solid: false },
    bg: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1783696012/recoh-hero-fi8170-desk.png',
  },
];

const scanSnapScanners = [
  {
    id: 'ix2500',
    eyebrow: 'Flagship Model',
    title: 'ScanSnap iX2500',
    bullets: [
      '45ppm / 90ipm scanning speed',
      '100-sheet automatic document feeder (ADF)',
      'Touch-screen with personal profiles',
      'Wi-Fi and USB connectivity',
      'Direct scan-to-cloud, no PC required',
    ],
    intro: 'The flagship ScanSnap — fastest in the series, with a touch screen and direct cloud scanning.',
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1783695907/recoh-ix2500.png',
    links: [
      { label: 'Official Product Page', href: 'https://www.pfu-us.ricoh.com/scanners/scansnap/ix2500' },
    ],
  },
  {
    id: 'ix2400',
    eyebrow: 'Simple & Reliable',
    title: 'ScanSnap iX2400',
    bullets: [
      '45ppm / 90ipm scanning speed',
      '100-sheet automatic document feeder (ADF)',
      'Simple, reliable USB-only connectivity',
      'One-touch button scanning',
      'Searchable PDF, JPEG & Office file export',
    ],
    intro: 'ScanSnap’s simplest experience yet — scan, save and share at the push of a button.',
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1783695908/recoh-ix2400.jpg',
    links: [
      { label: 'Official Product Page', href: 'https://www.pfu-us.ricoh.com/scanners/scansnap/ix2400' },
    ],
  },
];

const fi7000Data = {
  desktop: {
    heading: 'Desktop & Network',
    desc: 'Compact, connected scanners built for the front office — Wi-Fi, Ethernet and cloud-ready out of the box, with or without a connected PC.',
    products: [
      {
        image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1783695909/recoh-fi7300nx.jpg',
        title: 'fi-7300NX',
        intro: 'Flexible network scanner — simplifies scanning and reduces IT costs with Wi-Fi and Ethernet connectivity.',
        bullets: [
          'Scanning speeds up to 60 pages per minute',
          '80-sheet automatic document feeder (ADF)',
          'Supports USB 3.2, Wi-Fi and Ethernet-wired network connections',
          'Embedded Near Field Communication (NFC) Reader',
        ],
        links: [{ label: 'Official Product Page', href: 'https://www.pfu-us.ricoh.com/scanners/fi/fi-7300nx' }],
      },
      {
        image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1783695912/recoh-fi7300nx-edge.jpg',
        title: 'fi-7300NX EdgeXperience Bundle',
        intro: 'Centralised document management from remote locations — a network scanner bundled with a secure hosted cloud environment.',
        bullets: [
          'Scans 60 pages per minute with 80-sheet ADF',
          'Hosted data via Microsoft Azure',
          'Includes 1-Year EdgeXperience Capture Service Subscription',
          'Secure image transfer with 128-bit AES Encryption',
        ],
        links: [{ label: 'Official Product Page', href: 'https://www.pfu-us.ricoh.com/scanners/fi/fi-7300nx-edgexperience' }],
      },
    ],
  },
  production: {
    heading: 'Production & Flatbed',
    desc: 'High-volume, 300-page hopper scanners engineered for mid-office throughput — fast, double-sided scanning of wide and normal-sized documents.',
    products: [
      {
        image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1783695910/recoh-fi7600.jpg',
        title: 'fi-7600',
        intro: 'A large 300-page hopper and advanced engineering handle wide and normal-size documents at high speed.',
        bullets: [
          'Fast, double-sided scanning speeds up to 100 pages per minute',
          '300-page automatic document feeder (ADF) with easy-alignment guides',
          'Handles ultra-long documents up to 656 ft (200 m)',
          'Integrated batch tray for convenient document preparation',
        ],
        links: [{ label: 'Official Product Page', href: 'https://www.pfu-us.ricoh.com/scanners/fi/fi-7600' }],
      },
      {
        image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1783695911/recoh-fi7700.jpg',
        title: 'fi-7700',
        intro: 'A fast, double-letter size flatbed joins the 300-page hopper to capture large, delicate and bound documents.',
        bullets: [
          'Fast double-sided scanning speeds up to 100 pages per minute',
          '300-page automatic document feeder (ADF)',
          'A3 double-letter size flatbed for fragile documents, books and photos',
          'Handles ultra-long documents up to 656 ft (200 m)',
        ],
        links: [{ label: 'Official Product Page', href: 'https://www.pfu-us.ricoh.com/scanners/fi/fi-7700' }],
      },
    ],
  },
};

const fi8000Scanners = [
  {
    num: '01',
    navTitle: 'fi-8170 — High Speed Desktop Scanner',
    tag: 'Desktop / Network',
    heading: 'fi-8170',
    desc: 'Made for demanding workflows, the compact fi-8170 employs innovative feeding technologies and proprietary Clear Image Capture (CIC) technology to deliver industry-leading reliability.',
    features: [
      'Fast, double-sided scanning up to 70 pages per minute',
      '100-page automatic document feeder (ADF) with exit stacker design',
      'Color LCD panel for easy front-of-scanner operation',
      'Supports USB 3.2 and Ethernet-wired network connections',
      'Federal Government Compliant: TAA Available and EPEAT Gold rated',
    ],
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1783695913/recoh-fi8170.jpg',
    imageLabel: 'fi-8170',
    links: [{ label: 'Official Product Page', href: 'https://www.pfu-us.ricoh.com/scanners/fi/fi-8170' }],
  },
  {
    num: '02',
    navTitle: 'fi-8040 — Compact Touch-Screen Network Scanner',
    tag: 'Entry Level / Network',
    heading: 'fi-8040',
    desc: 'Simplify scanning with an intuitive touch display and seamless ChromeOS connection. DirectScan sends captured documents over the network straight from the device.',
    features: [
      'Double-sided scanning speeds up to 40 pages per minute',
      '50-sheet automatic document feeder (ADF)',
      'Supports USB 3.2 and Ethernet-wired network connections',
      'DirectScan — scan to destinations without server software',
      'Federal Government Compliant: TAA and EPEAT Silver rated',
    ],
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1783695914/recoh-fi8040.jpg',
    imageLabel: 'fi-8040',
    links: [{ label: 'Official Product Page', href: 'https://www.pfu-us.ricoh.com/scanners/fi/fi-8040' }],
  },
  {
    num: '03',
    navTitle: 'fi-8950 — High Volume, High Speed Production Scanner',
    tag: 'Production',
    heading: 'fi-8950',
    desc: 'Ready for your toughest day, every day — the fi-8950 scans up to 150 pages per minute, has a 750-page hopper, and optimises every document it digitises.',
    features: [
      'Ultra-fast, double-sided scanning up to 150 pages per minute (landscape)',
      '750-sheet automatic document feeder (ADF)',
      'Supports USB 3.2 and LAN network connections',
      'Stapled Documents Detection prevents feeding stapled paper',
      'Federal Government Compliant: TAA and EPEAT Gold rated',
    ],
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1783695915/recoh-fi8950.jpg',
    imageLabel: 'fi-8950',
    links: [{ label: 'Official Product Page', href: 'https://www.pfu-us.ricoh.com/scanners/fi/fi-8950' }],
  },
  {
    num: '04',
    navTitle: 'fi-8930 — Fast High Volume Document Scanner',
    tag: 'Production',
    heading: 'fi-8930',
    desc: 'Powered by an innovative new engine, the fi-8930 powers through backlogged paper and digitises daily operations with high-speed performance and large batch sizes.',
    features: [
      'Fast, double-sided scanning up to 130 pages per minute (landscape)',
      '750-sheet automatic document feeder (ADF)',
      'Supports USB 3.2 and LAN network connections',
      'Stapled Documents Detection prevents feeding stapled paper',
      'Federal Government Compliant: TAA and EPEAT Gold rated',
    ],
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1783695915/recoh-fi8930.jpg',
    imageLabel: 'fi-8930',
    links: [{ label: 'Official Product Page', href: 'https://www.pfu-us.ricoh.com/scanners/fi/fi-8930' }],
  },
  {
    num: '05',
    navTitle: 'fi-8820 — High Volume ADF Production Scanner',
    tag: 'Production',
    heading: 'fi-8820',
    desc: 'Maximise ROI with speed and performance. The fi-8820 production scanner is purpose-built to deliver sustained performance, optimised throughput, and an efficient document workflow.',
    features: [
      'High-speed, double-sided scanning up to 120 pages per minute / 240ipm',
      '500-sheet automatic document feeder (ADF)',
      '4.3" touchscreen display designed for easy use',
      'Supports USB 3.2 and LAN network connections',
      'Federal Government Compliant: TAA and EPEAT Gold rated',
    ],
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1783695916/recoh-fi8820.jpg',
    imageLabel: 'fi-8820',
    links: [{ label: 'Official Product Page', href: 'https://www.pfu-us.ricoh.com/scanners/fi/fi-8820' }],
  },
  {
    num: '06',
    navTitle: 'fi-8190 — High Performance ADF Office Scanner',
    tag: 'Desktop / Network',
    heading: 'fi-8190',
    desc: 'Take on the toughest front-office jobs with this elite scanner. The fi-8190 employs innovative feeding and Clear Image Capture technology to deliver industry-leading reliability.',
    features: [
      'Fast, double-sided scanning up to 90 pages per minute',
      '100-page automatic document feeder (ADF) with exit stacker design',
      'Color LCD panel for easy front-of-scanner operation',
      'Supports both USB 3.2 and Ethernet wired network connections',
      'Federal Government Compliant: TAA and EPEAT Silver rated',
    ],
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1783695917/recoh-fi8190.jpg',
    imageLabel: 'fi-8190',
    links: [{ label: 'Official Product Page', href: 'https://www.pfu-us.ricoh.com/scanners/fi/fi-8190' }],
  },
];

const RC_NAV_LINKS = [
  { label: 'ScanSnap Series',  href: '#scansnap-series' },
  { label: 'fi 7000 Series',   href: '#fi-7000-series' },
  { label: 'fi 8000 Series',   href: '#fi-8000-series' },
];

function RcNavInner({ accent }: { accent: string }) {
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
        {RC_NAV_LINKS.map(link => (
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
                 (el.querySelector('.rc-underline') as HTMLElement | null)?.style.setProperty('width', '100%');
               }}
               onMouseLeave={e => {
                 const el = e.currentTarget as HTMLAnchorElement;
                 el.style.color = '#111';
                 (el.querySelector('.rc-underline') as HTMLElement | null)?.style.setProperty('width', '0');
               }}>
              {link.label}
              <span className="rc-underline" style={{
                position: 'absolute', bottom: 0, left: 0, width: 0, height: 2,
                background: accent, borderRadius: 2, transition: 'width 0.25s ease',
              }} />
            </a>
          </li>
        ))}
      </ul>
      <a href="#fi-7000-series"
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
export default function RecohPage() {

  const [heroIdx, setHeroIdx]             = useState(0);
  const [progress, setProgress]           = useState(0);
  const rafRef                            = useRef<number | null>(null);
  const startRef                          = useRef<number | null>(null);
  const heroRef                           = useRef<HTMLElement>(null);
  const DURATION                          = 5000;

  const [isSticky, setIsSticky]           = useState(false);
  const [activeScanner, setActiveScanner] = useState(0);
  const [imgFade, setImgFade]             = useState(false);
  const [fi7Tab, setFi7Tab]               = useState<'desktop' | 'production'>('desktop');
  const [prod8Active, setProd8Active]     = useState(0);
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
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('rc-visible'); observer.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.rc-reveal').forEach(el => observer.observe(el));
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

  const slide = heroSlides[heroIdx];

  return (
    <main style={{ background: rc.bg, color: rc.text, fontFamily: 'var(--font-poppins)', overflowX: 'hidden' }}>

      {/* ══════════════════════════════════════════
          HERO SLIDER
      ══════════════════════════════════════════ */}
      <section ref={heroRef} className="rc-hero" style={{ position: 'relative', width: '100%', overflow: 'hidden', background: '#000' }}>

        {heroSlides.map((s, i) => (
          <div key={s.id} className="rc-slide"
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
            <div className="rc-vignette" style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(90deg, rgba(0,0,0,0.72) 38%, transparent 80%)',
            }} />
            <div className="rc-hero-container"
                 style={{ position: 'relative', zIndex: 3, width: '100%', maxWidth: 1220, margin: '0 auto', padding: '0 20px' }}>
              <div className="rc-hero-content"
                   style={{
                     maxWidth: 580,
                     opacity: i === heroIdx ? 1 : 0,
                     transform: i === heroIdx ? 'translateY(0)' : 'translateY(24px)',
                     transition: 'opacity 0.7s ease 0.4s, transform 0.7s ease 0.4s',
                   }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8, background: rc.accent, color: '#fff',
                  fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase',
                  padding: '5px 12px', marginBottom: 18, borderRadius: 2,
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff', opacity: 0.9, display: 'inline-block', animation: 'rcPulse 2s infinite' }} />
                  {s.badge}
                </span>
                <h1 className="rc-hero-heading"
                    style={{ fontSize: 'clamp(40px, 6vw, 78px)', color: '#fff', lineHeight: 0.95, marginBottom: 18, fontWeight: 700, letterSpacing: 1 }}>
                  {s.lines.map((line, li) => (
                    <span key={li} style={{ display: 'block', color: li === s.accentLine ? rc.accent : '#fff' }}>{line}</span>
                  ))}
                </h1>
                <p className="rc-hero-desc"
                   style={{ fontSize: 15, color: 'rgba(255,255,255,0.72)', lineHeight: 1.65, marginBottom: 32, fontWeight: 300, maxWidth: 420 }}>
                  {s.desc}
                </p>
                <a href={s.cta.href} className="rc-hero-btn"
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
                     el.style.background = rc.accent; el.style.borderColor = rc.accent; el.style.color = '#fff';
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
        <div className="rc-dots"
             style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(calc(-570px + 20px))', display: 'flex', gap: 10, zIndex: 10 }}>
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => goSlide(i)}
                    style={{
                      width: 10, height: 10, borderRadius: '50%', padding: 0, border: 'none', cursor: 'pointer',
                      background: i === heroIdx ? rc.accent : 'rgba(255,255,255,0.35)',
                      transform: i === heroIdx ? 'scale(1.3)' : 'scale(1)',
                      transition: 'background 0.3s, transform 0.3s',
                    }} />
          ))}
        </div>

        {/* Progress bar */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, height: 3,
          background: rc.accent, width: `${progress}%`,
          zIndex: 10, transition: 'width 0.1s linear',
        }} />
      </section>

      {/* ══════════════════════════════════════════
          STICKY NAV
      ══════════════════════════════════════════ */}
      <div style={{
        width: '100%', background: '#fff',
        borderBottom: `1px solid rgba(0,0,0,0.09)`,
        visibility: isSticky ? 'hidden' : 'visible',
      }}>
        <RcNavInner accent={rc.accent} />
      </div>

      <div className="rc-nav-wrap" style={{
        width: '100%', background: '#fff',
        borderBottom: `1px solid rgba(0,0,0,0.09)`,
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1001,
        boxShadow: '0 2px 20px rgba(0,0,0,0.12)',
        transform: isSticky ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
      }}>
        <RcNavInner accent={rc.accent} />
      </div>

      {/* ══════════════════════════════════════════
          SCANSNAP SERIES
      ══════════════════════════════════════════ */}
      <section id="scansnap-series" style={{ width: '100%', padding: '80px 20px', background: '#fff' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>

          <div className="rc-reveal" style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 700, color: '#0f1320', marginBottom: 10 }}>
              ScanSnap Series
            </h2>
            <p style={{ fontSize: 16, color: '#64748b', maxWidth: 700, lineHeight: 1.7 }}>
              Personal and small-business document scanners built for effortless, one-touch digitisation.
            </p>
          </div>

          <div className="rc-scanner-layout rc-reveal rc-reveal-d1"
               style={{ display: 'flex', gap: 60, alignItems: 'center', justifyContent: 'center', minHeight: 500 }}>

            {/* Left — items */}
            <div className="rc-scanner-items" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
              {scanSnapScanners.map((item, idx) => (
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
                  <p style={{ color: rc.accent, fontSize: 13, textTransform: 'uppercase', marginBottom: 8, letterSpacing: '0.5px', fontWeight: 600 }}>
                    {item.eyebrow}
                  </p>
                  <h3 style={{ fontSize: 22, marginBottom: 14, color: '#0f1320', fontWeight: 600 }}>{item.title}</h3>
                  <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.7, margin: 0 }}>{item.intro}</p>
                  {activeScanner === idx && (
                    <>
                      <ul style={{ marginTop: 12, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>
                        {item.bullets.map(b => (
                          <li key={b} style={{ fontSize: 14, color: '#475569', lineHeight: 1.8, display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ width: 5, height: 5, borderRadius: '50%', background: rc.accent, flexShrink: 0, display: 'inline-block' }} />
                            {b}
                          </li>
                        ))}
                      </ul>
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 14 }}>
                        {item.links.map(lnk => (
                          <a key={lnk.href} href={lnk.href} target="_blank" rel="noopener noreferrer"
                             style={{ fontSize: 12, fontWeight: 600, padding: '5px 14px', borderRadius: 4, border: `1.5px solid ${rc.accent}`, color: rc.accent, textDecoration: 'none', background: '#fff', transition: 'all 0.2s' }}
                             onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = rc.accent; el.style.color = '#fff'; }}
                             onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = '#fff'; el.style.color = rc.accent; }}>
                            {lnk.label}
                          </a>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Right — image */}
            <div className="rc-scanner-img-wrap" style={{ flex: 1.2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={scanSnapScanners[activeScanner].image}
                   alt={scanSnapScanners[activeScanner].title}
                   className="rc-scanner-img"
                   style={{
                     width: '100%', maxWidth: 600, height: 450,
                     objectFit: 'contain', background: '#f8fafc', borderRadius: 20,
                     opacity: imgFade ? 0 : 1,
                     transition: 'opacity 0.4s ease',
                   }} />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FI 7000 SERIES — INTRO BANNER
      ══════════════════════════════════════════ */}
      <section id="fi-7000-series"
               style={{ width: '100%', background: 'linear-gradient(90deg, #0b1a2e, #0d223d)', padding: '80px 20px', color: '#fff' }}>
        <div className="rc-comm-inner"
             style={{ maxWidth: 1140, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 420px', gap: 60, alignItems: 'center' }}>

          <div className="rc-reveal">
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 700, marginBottom: 20, color: '#fff', lineHeight: 1.2 }}>
              fi 7000 Series
            </h2>
            <p style={{ fontSize: 15, color: '#cbd5e1', lineHeight: 1.7 }}>
              Flexible, high-volume document scanners for mid-office and departmental workflows — from network-enabled desktop units to 300-page hopper production scanners with flatbed options.
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
                  {['ScanSnap Series', 'fi 7000 Series', 'fi 8000 Series'].map(o => (
                    <option key={o} style={{ background: '#fff', color: '#000' }}>{o}</option>
                  ))}
                </select>
                {formState === 'error' && <p style={{ fontSize: 12, color: '#fca5a5' }}>Something went wrong. Please try again.</p>}
                <button type="submit" disabled={formState === 'sending'}
                        style={{
                          marginTop: 10, padding: 13, background: rc.accent, color: '#fff',
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

      {/* ── fi 7000 tabs ── */}
      <section style={{ width: '100%', padding: '40px 20px 60px', background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          <div style={{ display: 'flex', flexWrap: 'wrap', borderBottom: '2px solid #eee', marginBottom: 40, gap: 10 }}>
            {([['desktop', 'Desktop & Network'], ['production', 'Production & Flatbed']] as const).map(([key, label]) => (
              <button key={key} onClick={() => setFi7Tab(key)}
                      style={{
                        padding: '15px 22px', cursor: 'pointer',
                        fontWeight: 700, fontSize: 14, textTransform: 'uppercase', letterSpacing: 1,
                        color: fi7Tab === key ? rc.accent : '#888',
                        border: 'none', background: 'none', position: 'relative',
                        fontFamily: 'var(--font-poppins)',
                      }}>
                {label}
                {fi7Tab === key && <span style={{ position: 'absolute', bottom: -2, left: 0, width: '100%', height: 3, background: rc.accent, display: 'block' }} />}
              </button>
            ))}
          </div>

          <div className="rc-net-panel" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 50 }}>
            <div>
              <h2 style={{ fontSize: 'clamp(20px, 3vw, 34px)', color: '#000', marginBottom: 20, lineHeight: 1.2 }}>
                {fi7000Data[fi7Tab].heading}
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: '#555' }}>{fi7000Data[fi7Tab].desc}</p>
            </div>
            <div className="rc-net-products" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 30 }}>
              {fi7000Data[fi7Tab].products.map(p => (
                <div key={p.title} style={{ background: '#fff', border: '1px solid #eee', padding: 24, borderRadius: 8 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt={p.title}
                       className="rc-net-img"
                       style={{ width: '100%', height: 220, objectFit: 'contain', background: '#f8fafc', marginBottom: 20, borderRadius: 6 }} />
                  <h4 style={{ fontSize: 20, margin: '10px 0 14px', color: '#000' }}>{p.title}</h4>
                  <p style={{ fontSize: 14, color: '#555', marginBottom: 8 }}>{p.intro}</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {p.bullets.map(b => (
                      <li key={b} style={{ fontSize: 13.5, color: '#555', lineHeight: 1.8, display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: rc.accent, flexShrink: 0, display: 'inline-block', marginTop: 7 }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 14 }}>
                    {p.links.map(lnk => (
                      <a key={lnk.href} href={lnk.href} target="_blank" rel="noopener noreferrer"
                         style={{ fontSize: 12, fontWeight: 600, padding: '5px 14px', borderRadius: 4, border: `1.5px solid ${rc.accent}`, color: rc.accent, textDecoration: 'none', background: '#fff', transition: 'all 0.2s' }}
                         onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = rc.accent; el.style.color = '#fff'; }}
                         onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = '#fff'; el.style.color = rc.accent; }}>
                        {lnk.label}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FI 8000 SERIES
      ══════════════════════════════════════════ */}
      <section id="fi-8000-series" style={{ width: '100%', background: '#fff', padding: '60px 20px 20px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          <div className="rc-reveal" style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 700, color: '#000', marginBottom: 6 }}>fi 8000 Series</h2>
            <p style={{ fontSize: 15, color: '#6b7280' }}>The next generation of Ricoh scanning — desktop to high-volume production, built for demanding workflows.</p>
          </div>

          <div className="rc-prod-body rc-reveal rc-reveal-d1"
               style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden', minHeight: 520 }}>

            {/* Left nav */}
            <div className="rc-prod-list" style={{ borderRight: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', background: '#fff' }}>
              {fi8000Scanners.map((item, idx) => (
                <div key={item.num} onClick={() => setProd8Active(idx)}
                     style={{ borderBottom: idx < fi8000Scanners.length - 1 ? '1px solid #e5e7eb' : 'none', cursor: 'pointer' }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 14, padding: '18px 24px',
                    background: prod8Active === idx ? '#fdf0f1' : '#fff', transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => { if (prod8Active !== idx) (e.currentTarget as HTMLDivElement).style.background = '#f9fafb'; }}
                  onMouseLeave={e => { if (prod8Active !== idx) (e.currentTarget as HTMLDivElement).style.background = '#fff'; }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: rc.accent, letterSpacing: 1, minWidth: 24 }}>{item.num}</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: prod8Active === idx ? rc.accent : '#1f2937', flex: 1, lineHeight: 1.4 }}>{item.navTitle}</span>
                    <span style={{ fontSize: 18, color: prod8Active === idx ? rc.accent : '#d1d5db', transition: 'transform 0.3s, color 0.3s', transform: prod8Active === idx ? 'rotate(90deg)' : 'none' }}>&rsaquo;</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Right panel */}
            <div style={{ background: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
              {fi8000Scanners.map((item, idx) => (
                <div key={item.num}
                     style={{
                       display: prod8Active === idx ? 'flex' : 'none',
                       flexDirection: 'column', height: '100%',
                       padding: '36px 36px 28px', gap: 20,
                     }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: rc.accent, textTransform: 'uppercase', letterSpacing: 1, margin: 0 }}>{item.tag}</p>
                  <h3 style={{ fontSize: 22, fontWeight: 700, color: '#0f1320', margin: '6px 0 10px', lineHeight: 1.3 }}>{item.heading}</h3>
                  <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.75, margin: 0 }}>{item.desc}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {item.features.map(f => (
                      <div key={f} style={{ fontSize: 13, color: '#374151', display: 'flex', alignItems: 'flex-start', gap: 8, lineHeight: 1.5 }}>
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: rc.accent, flexShrink: 0, marginTop: 6 }} />
                        {f}
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {item.links.map(lnk => (
                      <a key={lnk.href} href={lnk.href} target="_blank" rel="noopener noreferrer"
                         style={{ fontSize: 12, fontWeight: 600, padding: '5px 14px', borderRadius: 4, border: `1.5px solid ${rc.accent}`, color: rc.accent, textDecoration: 'none', background: '#fff', transition: 'all 0.2s' }}
                         onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = rc.accent; el.style.color = '#fff'; }}
                         onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = '#fff'; el.style.color = rc.accent; }}>
                        {lnk.label}
                      </a>
                    ))}
                  </div>
                  <div style={{ marginTop: 'auto', paddingTop: 20 }}>
                    <div style={{ borderRadius: 6, overflow: 'hidden', border: '1px solid #e5e7eb', background: '#fff' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.image} alt={item.imageLabel}
                           style={{ width: '100%', height: 200, objectFit: 'contain', display: 'block' }} />
                      <div style={{ fontSize: 11, fontWeight: 700, textAlign: 'center', background: rc.accent, color: '#fff', padding: '6px 0', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
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
          RESPONSIVE STYLES
      ══════════════════════════════════════════ */}
      <style>{`
        /* ── Animations ── */
        @keyframes rcPulse { 0%,100%{ opacity:1; transform:scale(1); } 50%{ opacity:.5; transform:scale(.8); } }
        .rc-reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.65s cubic-bezier(0.22,1,0.36,1), transform 0.65s cubic-bezier(0.22,1,0.36,1); }
        .rc-reveal.rc-visible { opacity: 1; transform: translateY(0); }
        .rc-reveal-d1 { transition-delay: 0.12s; }
        .rc-reveal-d2 { transition-delay: 0.24s; }

        /* ── Hero ── */
        .rc-hero { height: 680px; }

        /* ── Tablet 768–1024px ── */
        @media (max-width: 1024px) {
          .rc-comm-inner { grid-template-columns: 1fr !important; gap: 40px !important; }
          .rc-net-panel  { grid-template-columns: 1fr !important; gap: 32px !important; }
          .rc-prod-body  { grid-template-columns: 1fr !important; }
          .rc-prod-list  { border-right: none !important; border-bottom: 1px solid #e5e7eb !important; }
          .rc-scanner-layout { flex-direction: column-reverse !important; gap: 32px !important; min-height: unset !important; }
          .rc-scanner-img { height: 320px !important; }
        }

        /* ── Tablet 768px ── */
        @media (max-width: 768px) {
          .rc-hero { height: 420px !important; }
          .rc-slide { align-items: flex-end !important; padding-bottom: 70px !important; }
          .rc-vignette { background: linear-gradient(180deg, transparent 10%, rgba(0,0,0,0.85) 70%) !important; }
          .rc-hero-container { padding: 0 24px !important; }
          .rc-hero-content { max-width: 100% !important; }
          .rc-dots { left: 24px !important; transform: none !important; bottom: 22px !important; }
          .rc-net-products { grid-template-columns: 1fr !important; }
          .rc-net-img { height: 200px !important; }
          .rc-scanner-img { height: 260px !important; }
        }

        /* ── Mobile 480px ── */
        @media (max-width: 480px) {
          .rc-hero { height: 550px !important; }
          .rc-hero-content { max-width: 100% !important; }
          .rc-hero-heading { letter-spacing: 0 !important; }
          .rc-hero-desc { font-size: 13px !important; margin-bottom: 20px !important; }
          .rc-hero-btn { padding: 10px 20px !important; font-size: 12px !important; margin-bottom: 35px !important; }
        }
      `}</style>
    </main>
  );
}
