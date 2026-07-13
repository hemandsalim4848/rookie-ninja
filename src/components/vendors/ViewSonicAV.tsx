'use client';

import { useState, useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────
   THEME
───────────────────────────────────────────── */
const vs = {
  bg:     '#ffffff',
  alt:    '#f8fafc',
  navy:   '#0A1628',
  accent: '#DA0026',
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
    id: 'displays',
    badge: 'Official Distributor',
    lines: ['See It.', 'Share It.'],
    accentLine: 1,
    desc: 'From interactive flat panels to professional ColorPro monitors, ViewSonic display technology brings clarity, collaboration, and colour accuracy to every workspace.',
    cta: { label: 'Explore Displays', href: '#displays', solid: true },
    bg: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1783982076/24ALL-CON1404-3572-T2_Monitors_Images_SubHeader-2_hxojbb.webp',
  },
  {
    id: 'projectors',
    badge: 'Projectors & Collaboration',
    lines: ['Project Big.', 'Anywhere.'],
    accentLine: 1,
    desc: 'ViewSonic laser and smart portable projectors deliver bright, vivid images for boardrooms, classrooms, and living rooms alike.',
    cta: { label: 'View Projectors', href: '#projectors', solid: false },
    bg: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1783982076/25PRJ-CON1282-RC_SubHeader-1280x524_ntz30s.webp',
  },
];

const collaborationSoftware = [
  {
    tag: 'Whiteboard Extension',
    title: 'myViewBoard Direct VBD100',
    desc: 'Instantly transform any display into an interactive whiteboard — annotate, capture, and collaborate without needing a dedicated interactive panel.',
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1782317681/rookie-ninja/products/lg_1000p_99fe7296-81f1-4e4d-bd2a-a639c88988e5.webp',
    href: '/viewsonic/viewsonic-vbd100',
    features: ['Interactive whiteboard extension via HDMI', 'Annotation & multimedia import tools', 'Screen capture & recording', 'Extends any display to an interactive board', 'Plug-and-play USB connectivity'],
  },
  {
    tag: 'myViewBoard-Powered Display',
    title: 'ViewSonic IFP7562',
    desc: 'A 75" 4K interactive flat panel running the full myViewBoard software suite — built for centrally-managed classrooms and meeting rooms.',
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1781981357/rookie-ninja/products/lg_1000p_78eca281-76ee-413a-8662-34801346d1d7.webp',
    href: '/viewsonic/viewsonic-ifp7562',
    features: ['75" 4K interactive display', '20-point UFT+ touch', 'USB-C with 65W fast charge', 'myViewBoard Manager for centralized IT management', 'vCastSender wireless casting'],
  },
];

const businessMonitors = [
  {
    id: 'va',
    eyebrow: 'Everyday Business',
    title: 'VA Series',
    bullets: [
      'VA2432-MHD — 24" IPS, 75Hz Adaptive Sync',
      'VA2715-MH — 27" IPS, 75Hz FreeSync',
      'VA3209-MH — 32" IPS, borderless bezel',
      'SuperClear® IPS panel technology',
      'Eye-care technology throughout',
    ],
    intro: 'Reliable, colour-accurate everyday monitors for offices and home workstations.',
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1781981561/rookie-ninja/products/lg_1000p_1052131f-7781-4704-af52-28a6d38e7339.webp',
    links: [
      { label: 'VA2432-MHD', href: '/viewsonic/viewsonic-va2432-mhd' },
      { label: 'VA2715-MH', href: '/viewsonic/viewsonic-va2715-mh' },
      { label: 'VA3209-MH', href: '/viewsonic/viewsonic-va3209-mh' },
    ],
  },
  {
    id: 'vg',
    eyebrow: 'Professional Business',
    title: 'VG Series',
    bullets: [
      'VG2455 — 24" IPS, USB-C single-cable',
      'VG2748 — 27" IPS, vDisplay Manager',
      'VG2755 — 27" IPS, full ergonomic stand',
      'Frameless bezel design',
      'Eye-care technology throughout',
    ],
    intro: 'Professional-grade monitors with single-cable docking and full ergonomic adjustment.',
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1781981716/rookie-ninja/products/lg_1000p_d131ad5b-e43f-4115-a8c9-ca6c07b7c70b.webp',
    links: [
      { label: 'VG2455', href: '/viewsonic/viewsonic-vg2455' },
      { label: 'VG2748', href: '/viewsonic/viewsonic-vg2748' },
      { label: 'VG2755', href: '/viewsonic/viewsonic-vg2755' },
    ],
  },
];

const displaysData = {
  ifp: {
    heading: 'Interactive Flat Panels',
    desc: 'Full-size 4K interactive displays powered by myViewBoard — built for classrooms, meeting rooms, and training centres that need multi-touch collaboration at scale.',
    products: [{
      image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1781981253/rookie-ninja/products/lg_1000p_b8ca0430-000c-4d17-9117-641dbc8274c2.webp',
      title: 'IFP Series — 65"–98"',
      bullets: [
        'IFP6552 — 65", 33-point touch',
        'IFP8652 — 86", dual-pen support',
        'IFP9850-3 — 98", 4-way split screen',
        'myViewBoard® native whiteboarding app',
        'Low blue light & eye-care certified',
      ],
      intro: 'Multi-touch 4K interactive displays scaling from 65" to 98" for every room size.',
      links: [
        { label: 'IFP6552', href: '/viewsonic/viewsonic-ifp6552' },
        { label: 'IFP8652', href: '/viewsonic/viewsonic-ifp8652' },
        { label: 'IFP9850-3', href: '/viewsonic/viewsonic-ifp9850-3' },
      ],
    }],
  },
  signage: {
    heading: 'Digital Signage & Commercial Displays',
    desc: 'Freestanding digital ePosters and large-format commercial displays for retail, wayfinding, and 24/7 public-facing environments.',
    products: [{
      image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1781988814/rookie-ninja/products/lg_1000p_538c3040-dd51-40a0-aa43-e97aaa169112.webp',
      title: 'ePoster & Commercial Displays',
      bullets: [
        'EP5542 — 55" 4K digital ePoster',
        'EP5542T — 55" touch ePoster',
        'CDE7520 — 75" 4K commercial display',
        '24/7 operation ready',
        'Remote content management via RS232/LAN',
      ],
      intro: 'Freestanding, 24/7-ready displays for retail, wayfinding, and public spaces.',
      links: [
        { label: 'EP5542', href: '/viewsonic/viewsonic-ep5542' },
        { label: 'EP5542T', href: '/viewsonic/viewsonic-ep5542t' },
        { label: 'CDE7520', href: '/viewsonic/viewsonic-cde7520' },
      ],
    }],
  },
};

const projectorTiers = [
  {
    num: '01',
    navTitle: 'Laser Projectors — LS Series',
    tag: 'Laser Projectors',
    heading: 'LS Series',
    desc: 'High-brightness laser projectors built for boardrooms, auditoriums, and large venues that need all-day reliability.',
    features: [
      'LS750WU — 5,000 ANSI lumens, WUXGA',
      'LS831WU — Ultra short throw 0.25 ratio',
      'LS920WU — 6,000 ANSI lumens, wide lens shift',
      '2nd-gen laser phosphor, 20,000hr lifespan',
      '360° projection capability',
    ],
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1782317568/rookie-ninja/products/lg_1000p_f97f37c5-12e8-49aa-b212-c109b755f2de.webp',
    imageLabel: 'LS Series',
    links: [
      { label: 'LS750WU', href: '/viewsonic/viewsonic-ls750wu' },
      { label: 'LS831WU', href: '/viewsonic/viewsonic-ls831wu' },
      { label: 'LS920WU', href: '/viewsonic/viewsonic-ls920wu' },
    ],
  },
  {
    num: '02',
    navTitle: 'Smart Portable — M Series',
    tag: 'Smart Portable',
    heading: 'M Series',
    desc: 'Compact, battery-ready smart projectors with Harman Kardon audio — built for travel, pop-up presentations, and casual movie nights.',
    features: [
      'M1+ G2 — 360° smart stand, built-in battery',
      'M2e — 1080p, only 1kg, USB-C powered',
      'Instant auto-focus & auto-keystone',
      'Integrated Harman Kardon speakers',
      'Wi-Fi & Bluetooth connectivity',
    ],
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1782317600/rookie-ninja/products/lg_1000p_cbb6a5e7-a1be-4ac3-8ab9-25ede86a5956.webp',
    imageLabel: 'M Series',
    links: [
      { label: 'M1+ G2', href: '/viewsonic/viewsonic-m1-plus-g2' },
      { label: 'M2e', href: '/viewsonic/viewsonic-m2e' },
    ],
  },
  {
    num: '03',
    navTitle: 'Home Theater 4K — X/PX Series',
    tag: 'Home Theater 4K',
    heading: 'X / PX Series',
    desc: 'True 4K HDR home projectors — from ultra short throw to long-lifespan LED light sources, built for immersive big-screen entertainment.',
    features: [
      'PX748-4K — True 4K HDR, 4.2ms input lag',
      'X1000-4K+ — Ultra short throw, 100" from 38cm',
      'X100-4K+ — 30,000hr LED lifespan',
      'Cinema SuperColor+™ technology',
      'ENERGY STAR compliant',
    ],
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1782317619/rookie-ninja/products/lg_1000p_b00ee596-e159-41b7-82dc-00a165d15309.webp',
    imageLabel: 'X / PX Series',
    links: [
      { label: 'PX748-4K', href: '/viewsonic/viewsonic-px748-4k' },
      { label: 'X1000-4K+', href: '/viewsonic/viewsonic-x1000-4k-plus' },
      { label: 'X100-4K+', href: '/viewsonic/viewsonic-x100-4k-plus' },
    ],
  },
];

const VS_NAV_LINKS = [
  { label: 'Collaboration Software', href: '#collaboration-software' },
  { label: 'Business Monitors',      href: '#business-monitors' },
  { label: 'Displays',               href: '#displays' },
  { label: 'Projectors',             href: '#projectors' },
  { label: 'VC Accessories',         href: '#vc-accessories' },
];

function VsNavInner({ accent }: { accent: string }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      flexWrap: 'nowrap', gap: 20,
      maxWidth: 1140, width: '100%', margin: '0 auto',
      height: 58, padding: '0 20px',
    }}>
      <ul style={{
        display: 'flex', alignItems: 'center', flex: 1,
        gap: 30, listStyle: 'none', margin: 0, padding: 0,
        overflowX: 'auto', scrollbarWidth: 'none',
      }}>
        {VS_NAV_LINKS.map(link => (
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
                 (el.querySelector('.vs-underline') as HTMLElement | null)?.style.setProperty('width', '100%');
               }}
               onMouseLeave={e => {
                 const el = e.currentTarget as HTMLAnchorElement;
                 el.style.color = '#111';
                 (el.querySelector('.vs-underline') as HTMLElement | null)?.style.setProperty('width', '0');
               }}>
              {link.label}
              <span className="vs-underline" style={{
                position: 'absolute', bottom: 0, left: 0, width: 0, height: 2,
                background: accent, borderRadius: 2, transition: 'width 0.25s ease',
              }} />
            </a>
          </li>
        ))}
      </ul>
      <a href="#displays"
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
export default function ViewSonicAVPage() {

  const [heroIdx, setHeroIdx]             = useState(0);
  const [progress, setProgress]           = useState(0);
  const rafRef                            = useRef<number | null>(null);
  const startRef                          = useRef<number | null>(null);
  const heroRef                           = useRef<HTMLElement>(null);
  const DURATION                          = 5000;

  const [isSticky, setIsSticky]           = useState(false);
  const [activeMonitor, setActiveMonitor] = useState(0);
  const [imgFade, setImgFade]             = useState(false);
  const [dispTab, setDispTab]             = useState<'ifp' | 'signage'>('ifp');
  const [projActive, setProjActive]       = useState(0);
  const [vcTab, setVcTab]                 = useState(0);
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
      document.body.classList.add('vs-subnav-active');
    } else {
      document.body.classList.remove('vs-subnav-active');
    }
    return () => document.body.classList.remove('vs-subnav-active');
  }, [isSticky]);

  /* ── Scroll reveal ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vs-visible'); observer.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.vs-reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* ── Monitor image swap ── */
  const switchMonitor = (idx: number) => {
    if (idx === activeMonitor) return;
    setImgFade(true);
    setTimeout(() => { setActiveMonitor(idx); setImgFade(false); }, 300);
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

  const dispCont  = displaysData[dispTab];

  return (
    <main style={{ background: vs.bg, color: vs.text, fontFamily: 'var(--font-poppins)', overflowX: 'hidden' }}>

      {/* ══════════════════════════════════════════
          HERO SLIDER
      ══════════════════════════════════════════ */}
      <section ref={heroRef} className="vs-hero" style={{ position: 'relative', width: '100%', overflow: 'hidden', background: vs.navy }}>

        {heroSlides.map((s, i) => (
          <div key={s.id} className="vs-slide"
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
              filter: 'brightness(0.42)',
            }} />
            <div className="vs-vignette" style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(90deg, rgba(10,22,40,0.9) 38%, rgba(10,22,40,0.5) 75%, rgba(218,0,38,0.15) 100%)',
            }} />
            <div className="vs-hero-container"
                 style={{ position: 'relative', zIndex: 3, width: '100%', maxWidth: 1220, margin: '0 auto', padding: '0 20px' }}>
              <div className="vs-hero-content"
                   style={{
                     maxWidth: 580,
                     opacity: i === heroIdx ? 1 : 0,
                     transform: i === heroIdx ? 'translateY(0)' : 'translateY(24px)',
                     transition: 'opacity 0.7s ease 0.4s, transform 0.7s ease 0.4s',
                   }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8, background: vs.accent, color: '#fff',
                  fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase',
                  padding: '5px 12px', marginBottom: 18, borderRadius: 2,
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff', opacity: 0.9, display: 'inline-block', animation: 'vsPulse 2s infinite' }} />
                  {s.badge}
                </span>
                <h1 className="vs-hero-heading"
                    style={{ fontSize: 'clamp(40px, 6vw, 78px)', color: '#fff', lineHeight: 0.95, marginBottom: 18, fontWeight: 700, letterSpacing: 1 }}>
                  {s.lines.map((line, li) => (
                    <span key={li} style={{ display: 'block', color: li === s.accentLine ? vs.accent : '#fff' }}>{line}</span>
                  ))}
                </h1>
                <p className="vs-hero-desc"
                   style={{ fontSize: 15, color: 'rgba(255,255,255,0.72)', lineHeight: 1.65, marginBottom: 32, fontWeight: 300, maxWidth: 420 }}>
                  {s.desc}
                </p>
                <a href={s.cta.href} className="vs-hero-btn"
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
                     el.style.background = vs.accent; el.style.borderColor = vs.accent; el.style.color = '#fff';
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
        <div className="vs-dots"
             style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(calc(-570px + 20px))', display: 'flex', gap: 10, zIndex: 10 }}>
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => goSlide(i)}
                    style={{
                      width: 10, height: 10, borderRadius: '50%', padding: 0, border: 'none', cursor: 'pointer',
                      background: i === heroIdx ? vs.accent : 'rgba(255,255,255,0.35)',
                      transform: i === heroIdx ? 'scale(1.3)' : 'scale(1)',
                      transition: 'background 0.3s, transform 0.3s',
                    }} />
          ))}
        </div>

        {/* Progress bar */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, height: 3,
          background: vs.accent, width: `${progress}%`,
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
        <VsNavInner accent={vs.accent} />
      </div>

      <div className="vs-nav-wrap" style={{
        width: '100%', background: '#fff',
        borderBottom: `1px solid rgba(0,0,0,0.09)`,
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1001,
        boxShadow: '0 2px 20px rgba(0,0,0,0.12)',
        transform: isSticky ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
      }}>
        <VsNavInner accent={vs.accent} />
      </div>

      {/* ══════════════════════════════════════════
          COLLABORATION SOFTWARE
      ══════════════════════════════════════════ */}
      <section id="collaboration-software" style={{ width: '100%', background: '#f8fafc', padding: '72px 20px' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div className="vs-reveal" style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700, color: vs.text, marginBottom: 14, letterSpacing: -0.3 }}>
              Collaboration Software
            </h2>
            <p style={{ fontSize: 15, color: '#64748b', lineHeight: 1.65, maxWidth: 560, margin: '0 auto' }}>
              myViewBoard-powered whiteboarding and screen sharing from ViewSonic — purpose-built to turn any room into a connected, collaborative workspace.
            </p>
          </div>
          <div className="vs-sw-grid vs-reveal vs-reveal-d1" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
            {collaborationSoftware.map((card, i) => (
              <div key={i} className={`vs-reveal vs-reveal-d${i + 1}`}
                   style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', overflow: 'hidden', boxShadow: '0 2px 16px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', transition: 'box-shadow 0.3s ease, transform 0.3s ease' }}
                   onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = '0 8px 32px rgba(0,0,0,0.12)'; }}
                   onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(0)'; el.style.boxShadow = '0 2px 16px rgba(0,0,0,0.06)'; }}>
                <div style={{ width: '100%', height: 220, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #f1f5f9' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={card.image} alt={card.title} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 24, display: 'block' }} />
                </div>
                <div style={{ padding: '24px 24px 28px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: vs.accent, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 8 }}>{card.tag}</p>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: vs.text, marginBottom: 10, lineHeight: 1.3 }}>{card.title}</h3>
                  <p style={{ fontSize: 13.5, color: '#64748b', lineHeight: 1.65, marginBottom: 16 }}>{card.desc}</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 7, flex: 1 }}>
                    {card.features.map((f, j) => (
                      <li key={j} style={{ fontSize: 13, fontWeight: 500, color: '#374151', paddingLeft: 16, position: 'relative', lineHeight: 1.4 }}>
                        <span style={{ position: 'absolute', left: 0, top: 6, width: 6, height: 6, borderRadius: '50%', background: vs.accent, display: 'inline-block' }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href={card.href} style={{
                    marginTop: 20, display: 'inline-block', padding: '10px 20px',
                    background: vs.accent, color: '#fff', fontSize: 13, fontWeight: 600,
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
          BUSINESS MONITORS
      ══════════════════════════════════════════ */}
      <section id="business-monitors" style={{ width: '100%', padding: '80px 20px', background: '#fff' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>

          <div className="vs-reveal" style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 700, color: '#0f1320', marginBottom: 10 }}>
              ViewSonic Business Monitors
            </h2>
            <p style={{ fontSize: 16, color: '#64748b', maxWidth: 700, lineHeight: 1.7 }}>
              Colour-accurate, ergonomic monitors for everyday offices through professional workstations.
            </p>
          </div>

          <div className="vs-monitor-layout vs-reveal vs-reveal-d1"
               style={{ display: 'flex', gap: 60, alignItems: 'center', justifyContent: 'center', minHeight: 500 }}>

            {/* Left — items */}
            <div className="vs-monitor-items" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
              {businessMonitors.map((item, idx) => (
                <div key={item.id} onClick={() => switchMonitor(idx)}
                     style={{
                       cursor: 'pointer', padding: 24, borderRadius: 16,
                       border: activeMonitor === idx ? '1px solid #e2e8f0' : '1px solid transparent',
                       background: activeMonitor === idx ? '#fff' : 'transparent',
                       boxShadow: activeMonitor === idx ? '0 10px 25px -5px rgba(0,0,0,0.05)' : 'none',
                       transition: 'all 0.3s ease',
                     }}
                     onMouseEnter={e => { if (activeMonitor !== idx) (e.currentTarget as HTMLDivElement).style.background = '#f8fafc'; }}
                     onMouseLeave={e => { if (activeMonitor !== idx) (e.currentTarget as HTMLDivElement).style.background = 'transparent'; }}>
                  <p style={{ color: vs.accent, fontSize: 13, textTransform: 'uppercase', marginBottom: 8, letterSpacing: '0.5px', fontWeight: 600 }}>
                    {item.eyebrow}
                  </p>
                  <h3 style={{ fontSize: 22, marginBottom: 14, color: '#0f1320', fontWeight: 600 }}>{item.title}</h3>
                  <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.7, margin: 0 }}>{item.intro}</p>
                  {activeMonitor === idx && (
                    <>
                      <ul style={{ marginTop: 12, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>
                        {item.bullets.map(b => (
                          <li key={b} style={{ fontSize: 14, color: '#475569', lineHeight: 1.8, display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ width: 5, height: 5, borderRadius: '50%', background: vs.accent, flexShrink: 0, display: 'inline-block' }} />
                            {b}
                          </li>
                        ))}
                      </ul>
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 14 }}>
                        {item.links.map(lnk => (
                          <a key={lnk.href} href={lnk.href}
                             style={{ fontSize: 12, fontWeight: 600, padding: '5px 14px', borderRadius: 4, border: `1.5px solid ${vs.accent}`, color: vs.accent, textDecoration: 'none', background: '#fff', transition: 'all 0.2s' }}
                             onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = vs.accent; el.style.color = '#fff'; }}
                             onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = '#fff'; el.style.color = vs.accent; }}>
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
            <div className="vs-monitor-img-wrap" style={{ flex: 1.2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={businessMonitors[activeMonitor].image}
                   alt={businessMonitors[activeMonitor].title}
                   className="vs-monitor-img"
                   style={{
                     width: '100%', maxWidth: 600, height: 450,
                     objectFit: 'contain', backgroundColor: '#f8fafc', borderRadius: 20,
                     opacity: imgFade ? 0 : 1,
                     transition: 'opacity 0.4s ease',
                   }} />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          DISPLAYS + FORM
      ══════════════════════════════════════════ */}
      <section id="displays"
               style={{ width: '100%', background: 'linear-gradient(90deg, #0b1a2e, #0d223d)', padding: '80px 20px', color: '#fff' }}>
        <div className="vs-comm-inner"
             style={{ maxWidth: 1140, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 420px', gap: 60, alignItems: 'center' }}>

          <div className="vs-reveal">
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 700, marginBottom: 20, color: '#fff', lineHeight: 1.2 }}>
              Displays
            </h2>
            <p style={{ fontSize: 15, color: '#cbd5e1', lineHeight: 1.7 }}>
              From multi-touch interactive panels for classrooms and boardrooms to freestanding digital signage for retail and public spaces — ViewSonic displays are built for 24/7 reliability, remote management, and effortless content sharing across every environment.
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
                  {['Collaboration Software', 'Business Monitors', 'Displays', 'Projectors', 'VC Accessories'].map(o => (
                    <option key={o} style={{ background: '#fff', color: '#000' }}>{o}</option>
                  ))}
                </select>
                {formState === 'error' && <p style={{ fontSize: 12, color: '#fca5a5' }}>Something went wrong. Please try again.</p>}
                <button type="submit" disabled={formState === 'sending'}
                        style={{
                          marginTop: 10, padding: 13, background: vs.accent, color: '#fff',
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

      {/* ── Display tabs ── */}
      <section style={{ width: '100%', padding: '40px 20px 60px', background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          <div style={{ display: 'flex', flexWrap: 'wrap', borderBottom: '2px solid #eee', marginBottom: 40, gap: 10 }}>
            {([['ifp', 'Interactive Flat Panels'], ['signage', 'Digital Signage']] as const).map(([key, label]) => (
              <button key={key} onClick={() => setDispTab(key)}
                      style={{
                        padding: '15px 22px', cursor: 'pointer',
                        fontWeight: 700, fontSize: 14, textTransform: 'uppercase', letterSpacing: 1,
                        color: dispTab === key ? vs.accent : '#888',
                        border: 'none', background: 'none', position: 'relative',
                        fontFamily: 'var(--font-poppins)',
                      }}>
                {label}
                {dispTab === key && <span style={{ position: 'absolute', bottom: -2, left: 0, width: '100%', height: 3, background: vs.accent, display: 'block' }} />}
              </button>
            ))}
          </div>

          <div className="vs-disp-panel" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 50 }}>
            <div>
              <h2 style={{ fontSize: 'clamp(20px, 3vw, 34px)', color: '#000', marginBottom: 20, lineHeight: 1.2 }}>
                {dispCont.heading}
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: '#555' }}>{dispCont.desc}</p>
            </div>
            <div className="vs-disp-products" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 30 }}>
              {dispCont.products.map(p => (
                <div key={p.title} style={{ background: '#fff', border: '1px solid #eee', padding: 24, borderRadius: 8 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt={p.title}
                       className="vs-disp-img"
                       style={{ width: '100%', height: 260, objectFit: 'contain', backgroundColor: '#f8fafc', marginBottom: 20, borderRadius: 6 }} />
                  <h4 style={{ fontSize: 22, margin: '10px 0 14px', color: '#000' }}>{p.title}</h4>
                  <p style={{ fontSize: 14, color: '#555', marginBottom: 8 }}>{p.intro}</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {p.bullets.map(b => (
                      <li key={b} style={{ fontSize: 14, color: '#555', lineHeight: 1.9, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: vs.accent, flexShrink: 0, display: 'inline-block' }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 14 }}>
                    {p.links.map(lnk => (
                      <a key={lnk.href} href={lnk.href}
                         style={{ fontSize: 12, fontWeight: 600, padding: '5px 14px', borderRadius: 4, border: `1.5px solid ${vs.accent}`, color: vs.accent, textDecoration: 'none', background: '#fff', transition: 'all 0.2s' }}
                         onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = vs.accent; el.style.color = '#fff'; }}
                         onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = '#fff'; el.style.color = vs.accent; }}>
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
          PROJECTORS
      ══════════════════════════════════════════ */}
      <section id="projectors" style={{ width: '100%', background: '#f8fafc', padding: '60px 20px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          <div className="vs-reveal" style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 700, color: '#000', marginBottom: 6 }}>Projectors</h2>
            <p style={{ fontSize: 15, color: '#6b7280' }}>Laser, smart portable, and 4K home theater projectors for every venue and screen size.</p>
          </div>

          <div className="vs-proj-body vs-reveal vs-reveal-d1"
               style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden', minHeight: 520 }}>

            {/* Left nav */}
            <div className="vs-proj-list" style={{ borderRight: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', background: '#fff' }}>
              {projectorTiers.map((item, idx) => (
                <div key={item.num} onClick={() => setProjActive(idx)}
                     style={{ borderBottom: idx < projectorTiers.length - 1 ? '1px solid #e5e7eb' : 'none', cursor: 'pointer' }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 14, padding: '18px 24px',
                    background: projActive === idx ? '#fef2f4' : '#fff', transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => { if (projActive !== idx) (e.currentTarget as HTMLDivElement).style.background = '#f9fafb'; }}
                  onMouseLeave={e => { if (projActive !== idx) (e.currentTarget as HTMLDivElement).style.background = '#fff'; }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: vs.accent, letterSpacing: 1, minWidth: 24 }}>{item.num}</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: projActive === idx ? vs.accent : '#1f2937', flex: 1, lineHeight: 1.4 }}>{item.navTitle}</span>
                    <span style={{ fontSize: 18, color: projActive === idx ? vs.accent : '#d1d5db', transition: 'transform 0.3s, color 0.3s', transform: projActive === idx ? 'rotate(90deg)' : 'none' }}>›</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Right panel */}
            <div style={{ background: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
              {projectorTiers.map((item, idx) => (
                <div key={item.num}
                     style={{
                       display: projActive === idx ? 'flex' : 'none',
                       flexDirection: 'column', height: '100%',
                       padding: '36px 36px 28px', gap: 20,
                     }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: vs.accent, textTransform: 'uppercase', letterSpacing: 1, margin: 0 }}>{item.tag}</p>
                  <h3 style={{ fontSize: 22, fontWeight: 700, color: '#0f1320', margin: '6px 0 10px', lineHeight: 1.3 }}>{item.heading}</h3>
                  <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.75, margin: 0 }}>{item.desc}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {item.features.map(f => (
                      <div key={f} style={{ fontSize: 13, color: '#374151', display: 'flex', alignItems: 'flex-start', gap: 8, lineHeight: 1.5 }}>
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: vs.accent, flexShrink: 0, marginTop: 6 }} />
                        {f}
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {item.links.map(lnk => (
                      <a key={lnk.href} href={lnk.href}
                         style={{ fontSize: 12, fontWeight: 600, padding: '5px 14px', borderRadius: 4, border: `1.5px solid ${vs.accent}`, color: vs.accent, textDecoration: 'none', background: '#fff', transition: 'all 0.2s' }}
                         onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = vs.accent; el.style.color = '#fff'; }}
                         onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = '#fff'; el.style.color = vs.accent; }}>
                        {lnk.label}
                      </a>
                    ))}
                  </div>
                  <div style={{ marginTop: 'auto', paddingTop: 20 }}>
                    <div style={{ borderRadius: 6, overflow: 'hidden', border: '1px solid #e5e7eb', background: '#fff' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.image} alt={item.imageLabel}
                           style={{ width: '100%', height: 200, objectFit: 'contain', display: 'block' }} />
                      <div style={{ fontSize: 11, fontWeight: 700, textAlign: 'center', background: vs.accent, color: '#fff', padding: '6px 0', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
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
          VIDEO CONFERENCING ACCESSORIES
      ══════════════════════════════════════════ */}
      <section id="vc-accessories" style={{ width: '100%', background: '#fff', padding: '60px 20px 80px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          <div className="vs-reveal" style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 700, color: '#000', marginBottom: 6 }}>Video Conferencing Accessories</h2>
            <p style={{ fontSize: 15, color: '#6b7280' }}>Cameras, audio, and wireless sharing built to pair seamlessly with any ViewSonic display.</p>
          </div>

          <div className="vs-vc-tabs vs-reveal vs-reveal-d1" style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
            {[{ num: '01', label: 'Cameras & Audio' }, { num: '02', label: 'Wireless & Compatibility' }].map((tab, i) => (
              <button key={i} onClick={() => setVcTab(i)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        padding: '10px 24px', borderRadius: 4, cursor: 'pointer',
                        border: `1.5px solid ${vcTab === i ? vs.accent : '#e5e7eb'}`,
                        background: vcTab === i ? vs.accent : '#fff',
                        transition: 'all 0.2s', fontFamily: 'var(--font-poppins)',
                      }}>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: vcTab === i ? 'rgba(255,255,255,0.6)' : '#9ca3af' }}>{tab.num}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: vcTab === i ? '#fff' : '#374151' }}>{tab.label}</span>
              </button>
            ))}
          </div>

          {vcTab === 0 && (
            <div className="vs-vc-grid"
                 style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: '#f3f4f6', border: '1px solid #f3f4f6', borderRadius: 10, overflow: 'hidden' }}>
              <div style={{ background: '#fff', padding: 36, display: 'flex', flexDirection: 'column', gap: 14 }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: vs.accent, textTransform: 'uppercase', letterSpacing: '1.2px', margin: 0 }}>Cameras</p>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0f1320', margin: 0, lineHeight: 1.4 }}>AI conference camera & document cam</h3>
                <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.75, margin: 0 }}>Bring meeting-room-grade video to any space with AI auto-framing and detailed document capture.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                  {[
                    'VB-CAM-201 — 4K UHD, AI voice tracking & auto-framing',
                    'VB-VIS-002 — 8MP document camera, 8× zoom',
                    '5× digital zoom, USB-C & USB-A connectivity',
                    'Plug-and-play, no drivers required',
                  ].map(f => (
                    <div key={f} style={{ fontSize: 13, color: '#374151', display: 'flex', alignItems: 'flex-start', gap: 9, lineHeight: 1.5 }}>
                      <span style={{ width: 5, height: 5, borderRadius: '50%', background: vs.accent, flexShrink: 0, marginTop: 5 }} />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ background: '#fff', padding: 36, display: 'flex', flexDirection: 'column', gap: 14 }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: vs.accent, textTransform: 'uppercase', letterSpacing: '1.2px', margin: 0 }}>Audio</p>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0f1320', margin: 0, lineHeight: 1.4 }}>Built to be heard, wherever you sit</h3>
                <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.75, margin: 0 }}>VB-AUD-201 — 360° omnidirectional pickup and 4-array microphones keep every voice in the room clear, with 24-hour battery life for all-day meetings.</p>
                <div style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid #e5e7eb', marginTop: 4 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://res.cloudinary.com/df52xzi3y/image/upload/v1782317628/rookie-ninja/products/lg_1000p_4f68aab8-d7d2-44fe-8439-381e819ef6d7.webp"
                       alt="ViewSonic VB-AUD-201 Conference Speakerphone"
                       style={{ width: '100%', height: 200, objectFit: 'contain', backgroundColor: '#f8fafc', display: 'block' }} />
                </div>
              </div>
            </div>
          )}

          {vcTab === 1 && (
            <div className="vs-vc-grid"
                 style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: '#f3f4f6', border: '1px solid #f3f4f6', borderRadius: 10, overflow: 'hidden' }}>
              {[
                {
                  tag: 'Compatible With', title: 'Wireless Presentation Systems',
                  desc: 'VB-WPS-001 and VB-WPS-003 wireless dongles pair with any HDMI or USB-C display for one-click screen sharing.',
                  chips: ['Windows', 'macOS', 'ViewBoard Displays', 'Any HDMI / USB-C Display'],
                },
                {
                  tag: 'Compatible With', title: 'Slot-in OPS PCs',
                  desc: 'VPC12 and VPC27 slot-in PCs turn any ViewBoard interactive display into a fully standalone Windows PC.',
                  chips: ['ViewBoard IFP Series', 'Interactive Displays', 'Windows 10 Pro'],
                },
              ].map(panel => (
                <div key={panel.title} style={{ background: '#fff', padding: 36, display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: vs.accent, textTransform: 'uppercase', letterSpacing: '1.2px', margin: 0 }}>{panel.tag}</p>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0f1320', margin: 0, lineHeight: 1.4 }}>{panel.title}</h3>
                  <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.75, margin: 0 }}>{panel.desc}</p>
                  <div style={{ background: '#fef2f4', border: '1px solid #f3c9d0', borderRadius: 8, padding: 20 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: vs.accent, textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 12px' }}>Compatible With</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {panel.chips.map(chip => (
                        <span key={chip} style={{ fontSize: 12, fontWeight: 600, background: '#fff', border: `1px solid ${vs.accent}`, color: vs.accent, padding: '4px 12px', borderRadius: 4 }}>
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
        @keyframes vsPulse { 0%,100%{ opacity:1; transform:scale(1); } 50%{ opacity:.5; transform:scale(.8); } }
        .vs-reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.65s cubic-bezier(0.22,1,0.36,1), transform 0.65s cubic-bezier(0.22,1,0.36,1); }
        .vs-reveal.vs-visible { opacity: 1; transform: translateY(0); }
        .vs-reveal-d1 { transition-delay: 0.12s; }
        .vs-reveal-d2 { transition-delay: 0.24s; }

        /* ── Hero ── */
        .vs-hero { height: 680px; }

        /* ── Tablet 768–1024px ── */
        @media (max-width: 1024px) {
          .vs-comm-inner   { grid-template-columns: 1fr !important; gap: 40px !important; }
          .vs-disp-panel   { grid-template-columns: 1fr !important; gap: 32px !important; }
          .vs-proj-body    { grid-template-columns: 1fr !important; }
          .vs-proj-list    { border-right: none !important; border-bottom: 1px solid #e5e7eb !important; }
          .vs-vc-grid      { grid-template-columns: 1fr !important; }
          .vs-monitor-layout { flex-direction: column-reverse !important; gap: 32px !important; min-height: unset !important; }
          .vs-monitor-img  { height: 320px !important; }
          .vs-sw-grid      { grid-template-columns: 1fr !important; }
        }

        /* ── Tablet 768px ── */
        @media (max-width: 768px) {
          .vs-hero { height: 420px !important; }
          .vs-slide { align-items: flex-end !important; padding-bottom: 70px !important; }
          .vs-vignette { background: linear-gradient(180deg, transparent 10%, rgba(10,22,40,0.85) 70%) !important; }
          .vs-hero-container { padding: 0 24px !important; }
          .vs-hero-content { max-width: 100% !important; }
          .vs-dots { left: 24px !important; transform: none !important; bottom: 22px !important; }
          .vs-disp-img { height: 200px !important; }
          .vs-monitor-img { height: 260px !important; }
        }

        /* ── Mobile 480px ── */
        @media (max-width: 480px) {
          .vs-hero { height: 550px !important; }
          .vs-hero-content { max-width: 100% !important; }
          .vs-hero-heading { letter-spacing: 0 !important; }
          .vs-hero-desc { font-size: 13px !important; margin-bottom: 20px !important; }
          .vs-hero-btn { padding: 10px 20px !important; font-size: 12px !important; margin-bottom: 35px !important; }
          .vs-vc-tabs { flex-direction: column !important; }
          .vs-vc-tabs button { width: 100% !important; justify-content: flex-start !important; }
        }
      `}</style>
    </main>
  );
}
