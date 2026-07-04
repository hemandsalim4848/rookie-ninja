'use client';

import { useState, useEffect, useRef } from 'react';

const ac = {
  accent: '#4594e1',
  navy:   '#0d1f35',
  alt:    '#f8fafc',
  line:   'rgba(0,0,0,0.08)',
  text:   '#0f1320',
  dim:    '#6b7280',
};

/* ─────────────────────────────────────────────
   HERO SLIDES
───────────────────────────────────────────── */
const heroSlides = [
  {
    id: 'cases',
    badge: 'Official Distributor',
    lines: ['Build Your', 'Dream PC.'],
    accentLine: 1,
    desc: 'Aerocool gaming cases combine striking ARGB aesthetics with smart airflow engineering — built for builders who demand both performance and style.',
    cta: { label: 'Explore Cases', href: '/aerocool', solid: true },
    bg: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1781989335/rookie-ninja/products/Designer-V2-Product-Gallery-4.webp',
  },
  {
    id: 'psu',
    badge: 'Power Supply Units',
    lines: ['More Power.', 'Less Noise.'],
    accentLine: 0,
    desc: 'From 80PLUS Bronze to Platinum — Aerocool PSUs deliver reliable, efficient power with low-noise operation for every build tier.',
    cta: { label: 'View PSUs', href: '/aerocool', solid: false },
    bg: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1781989408/rookie-ninja/products/Mirage-Gold-850W-Fully-Modular-Gallery-Image-5-removebg-preview.webp',
  },
];

/* ─────────────────────────────────────────────
   CASES — card grid
───────────────────────────────────────────── */
const caseCards = [
  {
    tag: 'ARGB Mid Tower',
    title: 'Designer-G V2',
    desc: 'A striking ARGB mid-tower with 4 pre-installed ARGB fans, full tempered glass panel, and support for ATX, Micro and Mini ATX builds.',
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1781989335/rookie-ninja/products/Designer-V2-Product-Gallery-4.webp',
    href: '/aerocool/aerocool-case-designer-g-bk-v2-argb-4-atx-micro-mini-atx',
    features: ['4× ARGB fans pre-installed', 'ATX / Micro / Mini ATX support', 'Full tempered glass side panel', 'Cable management routing', 'Supports 240mm radiator'],
  },
  {
    tag: 'Flow Series',
    title: 'B508A / B509A Flow-G',
    desc: 'The Flow-G series delivers maximum airflow with a mesh front panel, ARGB fans, and an open interior — available in Black and White.',
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1781989260/rookie-ninja/products/B508A-bk-Infographics-1_1-removebg-preview.webp',
    href: '/aerocool/aerocool-b508a-flow-g-bk-v1',
    features: ['Mesh front panel for max airflow', 'ARGB fan hub included', 'Available in Black & White', 'Tempered glass side panel', 'ATX / Micro / Mini ATX support'],
  },
  {
    tag: 'Compact Tower',
    title: 'Dryft-G BK v2',
    desc: 'A compact and versatile tower with support for ATX, Micro ATX, and Mini ITX builds — designed for smaller setups without sacrificing cooling.',
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1781989346/rookie-ninja/products/Drift-BK-V2Product-Gallery-4.jpg',
    href: '/aerocool/aerocool-case-dryft-g-bk-v2-atx-micro-mini-itx',
    features: ['Supports ATX / Micro / Mini ITX', 'Compact sleek profile', 'Tempered glass panel', 'Cable management tray', 'Top and side ventilation'],
  },
  {
    tag: 'Mid Tower',
    title: 'P500C-G',
    desc: 'A clean mid-tower with a panoramic tempered glass panel and efficient cable management — available in Black and White to match any build.',
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1781989355/rookie-ninja/products/P500C-bk-product-gallery-1.webp',
    href: '/aerocool/aerocool-case-p500c-g-bk-v1',
    features: ['Full tempered glass side panel', 'Available in Black & White', 'Cable management routing', 'Supports up to 360mm radiator', 'Tool-less drive installation'],
  },
];

/* ─────────────────────────────────────────────
   PSU TABS — Aerocool branded
───────────────────────────────────────────── */
const psuTabData = {
  modular: {
    heading: 'Fully Modular PSUs',
    desc: 'Fully modular design means only the cables you need — cleaner builds, better airflow, and easier upgrades.',
    products: [
      {
        image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1781989376/rookie-ninja/products/Integrator-Gold-750W-Gallery-Images-05.webp',
        title: 'Integrator Gold 750W',
        intro: 'Aerocool branded 80PLUS Gold certified fully modular PSU for mid-to-high-end builds.',
        bullets: ['80PLUS Gold certified', 'Fully modular cables', '750W continuous power', 'Active PFC', 'Low-noise fan'],
      },
      {
        image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1781989408/rookie-ninja/products/Mirage-Gold-850W-Fully-Modular-Gallery-Image-5-removebg-preview.webp',
        title: 'Mirage Gold 850W',
        intro: 'Aerocool Mirage Gold — 850W fully modular PSU with premium Gold efficiency and clean power delivery.',
        bullets: ['80PLUS Gold certified', 'Fully modular flat cables', '850W continuous output', 'Overvoltage & short-circuit protection', 'Semi-passive fan mode'],
      },
    ],
  },
  nonmodular: {
    heading: 'Standard PSUs',
    desc: 'Reliable, no-fuss power delivery with wide-voltage compatibility — built for everyday gaming builds in the MEA market.',
    products: [
      {
        image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1781989389/rookie-ninja/products/Lux-550W-Photo-Gallery-1042x589-01.webp',
        title: 'LUX 750W 230V APFC',
        intro: 'Aerocool LUX — an APFC-equipped 750W PSU with wide-voltage compatibility for the MEA market.',
        bullets: ['Active PFC (APFC)', '750W continuous power', '230V input optimised', 'Universal protections suite', 'Quiet 120mm sleeve bearing fan'],
      },
    ],
  },
};

/* ─────────────────────────────────────────────
   AIR COOLERS — accordion
───────────────────────────────────────────── */
const coolerItems = [
  {
    num: '01',
    navTitle: 'Cylon 4F ARGB — Black',
    tag: 'ARGB Air Cooler',
    heading: 'Cylon 4F ARGB PWM — Black',
    desc: 'A high-performance ARGB air cooler with 4 PWM fans and 4-pin connector — delivering exceptional cooling performance with vivid addressable RGB lighting for black-themed builds.',
    features: [
      '4× ARGB PWM 120mm fans',
      '4-pin PWM control for precise speed',
      'Addressable RGB with sync support',
      'Aluminium heatsink with heat pipes',
      'Compatible with Intel and AMD sockets',
      'Low-noise operation at high airflow',
    ],
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1781989220/rookie-ninja/products/Cylon4F-Product-Photo-Gallery-1042x589-07.webp',
    slug: 'aerocool-air-cooler-cylon-4f-argb-pwm-4p-black',
  },
  {
    num: '02',
    navTitle: 'Cylon 4F ARGB — White',
    tag: 'ARGB Air Cooler',
    heading: 'Cylon 4F ARGB PWM — White',
    desc: 'The white edition of the Cylon 4F — the same high-performance ARGB cooling with a clean white finish, perfect for white or light-themed PC builds.',
    features: [
      '4× ARGB PWM 120mm fans (white)',
      '4-pin PWM control',
      'Addressable RGB lighting',
      'Aluminium heatsink with heat pipes',
      'Intel & AMD socket compatible',
      'Ideal for white / light-themed builds',
    ],
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1781989242/rookie-ninja/products/Cylon4F-Product-Photo-Gallery-1042x589-W-04.webp',
    slug: 'aerocool-air-cooler-cylon-4f-argb-pwm-4p-white',
  },
];

/* ─────────────────────────────────────────────
   NAV
───────────────────────────────────────────── */
const AC_NAV_LINKS = [
  { label: 'Cases',               href: '#cases' },
  { label: 'Power Supply Units',  href: '#psu-inquiry' },
  { label: 'Air Coolers',         href: '#air-coolers' },
];

function AcNavInner({ accent }: { accent: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'nowrap', gap: 20, maxWidth: 1140, width: '100%', margin: '0 auto', height: 58, padding: '0 20px' }}>
      <ul style={{ display: 'flex', alignItems: 'center', flex: 1, gap: 36, listStyle: 'none', margin: 0, padding: 0, overflowX: 'auto', scrollbarWidth: 'none' }}>
        {AC_NAV_LINKS.map(link => (
          <li key={link.href} style={{ flexShrink: 0 }}>
            <a href={link.href}
               style={{ display: 'inline-block', fontSize: 14, fontWeight: 500, color: '#111', textDecoration: 'none', letterSpacing: '0.15px', whiteSpace: 'nowrap', position: 'relative', paddingBottom: 3, transition: 'color 0.2s' }}
               onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = accent; (el.querySelector('.ac-underline') as HTMLElement | null)?.style.setProperty('width', '100%'); }}
               onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = '#111'; (el.querySelector('.ac-underline') as HTMLElement | null)?.style.setProperty('width', '0'); }}>
              {link.label}
              <span className="ac-underline" style={{ position: 'absolute', bottom: 0, left: 0, width: 0, height: 2, background: accent, borderRadius: 2, transition: 'width 0.25s ease' }} />
            </a>
          </li>
        ))}
      </ul>
      <a href="#psu-inquiry"
         style={{ flexShrink: 0, padding: '11px 26px', background: accent, color: '#fff', fontSize: 14, fontWeight: 600, textDecoration: 'none', borderRadius: 50, whiteSpace: 'nowrap', transition: 'transform 0.15s' }}
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
export default function AerocoolPage() {
  const [heroIdx, setHeroIdx]         = useState(0);
  const [progress, setProgress]       = useState(0);
  const rafRef                        = useRef<number | null>(null);
  const startRef                      = useRef<number | null>(null);
  const heroRef                       = useRef<HTMLElement>(null);
  const DURATION                      = 5000;

  const [isSticky, setIsSticky]       = useState(false);
  const [psuTab, setPsuTab]           = useState<'modular' | 'nonmodular'>('modular');
  const [coolerActive, setCoolerActive] = useState(0);
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
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('ac-visible'); obs.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.ac-reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  /* ── Form ── */
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setFormState('sending');
    try {
      const form = e.currentTarget;
      const res  = await fetch('https://formspree.io/f/xdajrzpv', { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      if (res.ok) { setFormState('success'); form.reset(); } else setFormState('error');
    } catch { setFormState('error'); }
  };

  const psuContent = psuTabData[psuTab];

  return (
    <main style={{ background: '#fff', color: ac.text, fontFamily: 'var(--font-poppins)', overflowX: 'hidden' }}>

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section ref={heroRef} style={{ position: 'relative', width: '100%', height: 680, overflow: 'hidden', background: '#000' }}>
        {heroSlides.map((s, i) => (
          <div key={s.id} className="ka-slide"
               style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', opacity: i === heroIdx ? 1 : 0, transition: 'opacity 0.9s cubic-bezier(0.77,0,0.175,1)', zIndex: i === heroIdx ? 2 : 1 }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: `url('${s.bg}')`, backgroundSize: 'cover', backgroundPosition: 'center', transform: i === heroIdx ? 'scale(1)' : 'scale(1.06)', transition: 'transform 6s ease', filter: 'brightness(0.35)' }} />
            <div className="ka-vignette" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(0,0,0,0.72) 38%, transparent 80%)' }} />
            <div className="ka-hero-container" style={{ position: 'relative', zIndex: 3, width: '100%', maxWidth: 1220, margin: '0 auto', padding: '0 20px' }}>
              <div className="ka-hero-content"
                   style={{ maxWidth: 580, opacity: i === heroIdx ? 1 : 0, transform: i === heroIdx ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 0.7s ease 0.4s, transform 0.7s ease 0.4s' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: ac.accent, color: '#fff', fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', padding: '5px 12px', marginBottom: 18, borderRadius: 2 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff', opacity: 0.9, display: 'inline-block', animation: 'kaPulse 2s infinite' }} />
                  {s.badge}
                </span>
                <h1 className="ka-hero-heading" style={{ fontSize: 'clamp(40px, 6vw, 78px)', color: '#fff', lineHeight: 0.95, marginBottom: 18, fontWeight: 700, letterSpacing: 1 }}>
                  {s.lines.map((line, li) => <span key={li} style={{ display: 'block', color: li === s.accentLine ? ac.accent : '#fff' }}>{line}</span>)}
                </h1>
                <p className="ka-hero-desc" style={{ fontSize: 15, color: 'rgba(255,255,255,0.72)', lineHeight: 1.65, marginBottom: 32, fontWeight: 300, maxWidth: 420 }}>{s.desc}</p>
                <a href={s.cta.href} className="ka-hero-btn"
                   style={{ display: 'inline-block', padding: '13px 28px', background: s.cta.solid ? '#fff' : 'transparent', color: s.cta.solid ? '#0d0d0d' : '#fff', border: '2px solid #fff', fontSize: 13, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', textDecoration: 'none', borderRadius: 2, transition: 'background 0.25s, color 0.25s, border-color 0.25s' }}
                   onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = ac.accent; el.style.borderColor = ac.accent; el.style.color = '#fff'; }}
                   onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = s.cta.solid ? '#fff' : 'transparent'; el.style.borderColor = '#fff'; el.style.color = s.cta.solid ? '#0d0d0d' : '#fff'; }}>
                  {s.cta.label}
                </a>
              </div>
            </div>
          </div>
        ))}
        <div className="ka-dots" style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(calc(-570px + 20px))', display: 'flex', gap: 10, zIndex: 10 }}>
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => goSlide(i)} style={{ width: 10, height: 10, borderRadius: '50%', padding: 0, border: 'none', cursor: 'pointer', background: i === heroIdx ? ac.accent : 'rgba(255,255,255,0.35)', transform: i === heroIdx ? 'scale(1.3)' : 'scale(1)', transition: 'background 0.3s, transform 0.3s' }} />
          ))}
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, height: 3, background: ac.accent, width: `${progress}%`, zIndex: 10, transition: 'width 0.1s linear' }} />
      </section>

      {/* ══════════════════════════════════════════
          STICKY NAV
      ══════════════════════════════════════════ */}
      <div style={{ width: '100%', background: '#fff', borderBottom: `1px solid rgba(0,0,0,0.09)`, visibility: isSticky ? 'hidden' : 'visible' }}>
        <AcNavInner accent={ac.accent} />
      </div>
      <div style={{ width: '100%', background: '#fff', borderBottom: `1px solid rgba(0,0,0,0.09)`, position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1001, boxShadow: '0 2px 20px rgba(0,0,0,0.12)', transform: isSticky ? 'translateY(0)' : 'translateY(-100%)', transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)' }}>
        <AcNavInner accent={ac.accent} />
      </div>

      {/* ══════════════════════════════════════════
          CASES
      ══════════════════════════════════════════ */}
      <section id="cases" style={{ width: '100%', background: ac.alt, padding: '72px 20px' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div className="ac-reveal" style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700, color: ac.text, marginBottom: 14, letterSpacing: -0.3 }}>Cases</h2>
            <p style={{ fontSize: 15, color: '#64748b', lineHeight: 1.65, maxWidth: 560, margin: '0 auto' }}>
              Aerocool gaming cases are engineered for builders who want great airflow, ARGB aesthetics, and flexible compatibility — from compact ITX builds to full ATX towers.
            </p>
          </div>
          <div className="ac-sw-grid ac-reveal ac-reveal-d1" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
            {caseCards.map((card, i) => (
              <div key={i} className={`ac-reveal ac-reveal-d${i + 1}`}
                   style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', overflow: 'hidden', boxShadow: '0 2px 16px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', transition: 'box-shadow 0.3s ease, transform 0.3s ease' }}
                   onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = '0 8px 32px rgba(0,0,0,0.12)'; }}
                   onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(0)'; el.style.boxShadow = '0 2px 16px rgba(0,0,0,0.06)'; }}>
                <div style={{ width: '100%', height: 220, background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #f1f5f9' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={card.image} alt={card.title} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 16, display: 'block' }} />
                </div>
                <div style={{ padding: '24px 24px 28px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: ac.accent, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 8 }}>{card.tag}</p>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: ac.text, marginBottom: 10, lineHeight: 1.3 }}>{card.title}</h3>
                  <p style={{ fontSize: 13.5, color: '#64748b', lineHeight: 1.65, marginBottom: 16 }}>{card.desc}</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 7, flex: 1 }}>
                    {card.features.map((f, j) => (
                      <li key={j} style={{ fontSize: 13, fontWeight: 500, color: '#374151', paddingLeft: 16, position: 'relative', lineHeight: 1.4 }}>
                        <span style={{ position: 'absolute', left: 0, top: 6, width: 6, height: 6, borderRadius: '50%', background: ac.accent, display: 'inline-block' }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href={card.href} style={{ marginTop: 20, display: 'inline-block', padding: '10px 20px', background: ac.accent, color: '#fff', fontSize: 13, fontWeight: 600, borderRadius: 50, textDecoration: 'none', alignSelf: 'flex-start', transition: 'opacity 0.2s' }}
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
          PSU DARK SECTION + FORM
      ══════════════════════════════════════════ */}
      <section id="psu-inquiry" style={{ width: '100%', background: 'linear-gradient(90deg, #0b1a2e, #0d223d)', padding: '80px 20px', color: '#fff' }}>
        <div className="ka-comm-inner" style={{ maxWidth: 1140, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 420px', gap: 60, alignItems: 'center' }}>
          <div className="ac-reveal">
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 700, marginBottom: 20, color: '#fff', lineHeight: 1.2 }}>Power Supply Units</h2>
            <p style={{ fontSize: 15, color: '#cbd5e1', lineHeight: 1.7 }}>
              Aerocool PSUs deliver reliable, efficient power for every build — with fully modular and non-modular options, active PFC, and a comprehensive suite of overvoltage, overcurrent, and short-circuit protections.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 24 }}>
              {['Integrator Gold', 'Mirage Gold', 'LUX'].map(name => (
                <span key={name} style={{ fontSize: 12, fontWeight: 600, padding: '5px 14px', background: 'rgba(255,255,255,0.08)', border: `1px solid ${ac.accent}`, color: '#e2e8f0', borderRadius: 4 }}>{name}</span>
              ))}
            </div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.06)', padding: 30, borderRadius: 14, border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)' }}>
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
                  {['Cases', 'Power Supply Units', 'Air Coolers'].map(o => (
                    <option key={o} style={{ background: '#fff', color: '#000' }}>{o}</option>
                  ))}
                </select>
                {formState === 'error' && <p style={{ fontSize: 12, color: '#fca5a5' }}>Something went wrong. Please try again.</p>}
                <button type="submit" disabled={formState === 'sending'} style={{ marginTop: 10, padding: 13, background: ac.accent, color: '#fff', fontWeight: 600, border: 'none', borderRadius: 6, cursor: formState === 'sending' ? 'not-allowed' : 'pointer', letterSpacing: 1, fontSize: 13, opacity: formState === 'sending' ? 0.7 : 1, transition: 'opacity 0.2s', fontFamily: 'var(--font-poppins)' }}>
                  {formState === 'sending' ? 'SENDING…' : 'SEND INQUIRY'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* PSU tabs */}
      <section style={{ width: '100%', padding: '40px 20px 60px', background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', borderBottom: '2px solid #eee', marginBottom: 40, gap: 10 }}>
            {([['modular', 'Fully Modular'], ['nonmodular', 'Non Modular & Value']] as const).map(([key, label]) => (
              <button key={key} onClick={() => setPsuTab(key)}
                      style={{ padding: '15px 22px', cursor: 'pointer', fontWeight: 700, fontSize: 14, textTransform: 'uppercase', letterSpacing: 1, color: psuTab === key ? ac.accent : '#888', border: 'none', background: 'none', position: 'relative', fontFamily: 'var(--font-poppins)' }}>
                {label}
                {psuTab === key && <span style={{ position: 'absolute', bottom: -2, left: 0, width: '100%', height: 3, background: ac.accent, display: 'block' }} />}
              </button>
            ))}
          </div>
          <div className="ka-net-panel" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 50 }}>
            <div>
              <h2 style={{ fontSize: 'clamp(20px, 3vw, 34px)', color: '#000', marginBottom: 20, lineHeight: 1.2 }}>{psuContent.heading}</h2>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: '#555' }}>{psuContent.desc}</p>
            </div>
            <div className="ka-net-products" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 30 }}>
              {psuContent.products.map(p => (
                <div key={p.title} style={{ background: '#fff', border: '1px solid #eee', padding: 24, borderRadius: 8 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt={p.title} className="ka-net-img" style={{ width: '100%', height: 240, objectFit: 'contain', marginBottom: 20, borderRadius: 6 }} />
                  <h4 style={{ fontSize: 20, margin: '10px 0 12px', color: '#000' }}>{p.title}</h4>
                  <p style={{ fontSize: 14, color: '#555', marginBottom: 8 }}>{p.intro}</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {p.bullets.map(b => (
                      <li key={b} style={{ fontSize: 14, color: '#555', lineHeight: 1.9, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: ac.accent, flexShrink: 0, display: 'inline-block' }} />{b}
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
          AIR COOLERS — accordion
      ══════════════════════════════════════════ */}
      <section id="air-coolers" style={{ width: '100%', background: ac.alt, padding: '60px 20px 80px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="ac-reveal" style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 700, color: '#000', marginBottom: 6 }}>Air Coolers</h2>
            <p style={{ fontSize: 15, color: ac.dim }}>High-performance ARGB air cooling for Intel and AMD — available in Black and White to match your build.</p>
          </div>
          <div className="ka-prod-body ac-reveal ac-reveal-d1" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden', minHeight: 480 }}>
            <div className="ka-prod-list" style={{ borderRight: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', background: '#fff' }}>
              {coolerItems.map((item, idx) => (
                <div key={item.num} onClick={() => setCoolerActive(idx)} style={{ borderBottom: idx < coolerItems.length - 1 ? '1px solid #e5e7eb' : 'none', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '18px 24px', background: coolerActive === idx ? '#f0f7ff' : '#fff', transition: 'background 0.2s' }}
                       onMouseEnter={e => { if (coolerActive !== idx) (e.currentTarget as HTMLDivElement).style.background = '#f9fafb'; }}
                       onMouseLeave={e => { if (coolerActive !== idx) (e.currentTarget as HTMLDivElement).style.background = '#fff'; }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: ac.accent, letterSpacing: 1, minWidth: 24 }}>{item.num}</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: coolerActive === idx ? ac.accent : '#1f2937', flex: 1, lineHeight: 1.4 }}>{item.navTitle}</span>
                    <span style={{ fontSize: 18, color: coolerActive === idx ? ac.accent : '#d1d5db', transition: 'transform 0.3s, color 0.3s', transform: coolerActive === idx ? 'rotate(90deg)' : 'none' }}>›</span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background: ac.alt, display: 'flex', flexDirection: 'column' }}>
              {coolerItems.map((item, idx) => (
                <div key={item.num} style={{ display: coolerActive === idx ? 'flex' : 'none', flexDirection: 'column', height: '100%', padding: '36px 36px 28px', gap: 20 }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: ac.accent, textTransform: 'uppercase', letterSpacing: 1, margin: 0 }}>{item.tag}</p>
                  <h3 style={{ fontSize: 22, fontWeight: 700, color: ac.text, margin: '6px 0 10px', lineHeight: 1.3 }}>{item.heading}</h3>
                  <p style={{ fontSize: 14, color: ac.dim, lineHeight: 1.75, margin: 0 }}>{item.desc}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {item.features.map(f => (
                      <div key={f} style={{ fontSize: 13, color: '#374151', display: 'flex', alignItems: 'flex-start', gap: 8, lineHeight: 1.5 }}>
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: ac.accent, flexShrink: 0, marginTop: 6 }} />{f}
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 'auto', paddingTop: 20 }}>
                    <div style={{ borderRadius: 6, overflow: 'hidden', border: '1px solid #e5e7eb', background: '#fff' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.image} alt={item.heading} style={{ width: '100%', height: 200, objectFit: 'contain', display: 'block' }} />
                      <a href={`/aerocool/${item.slug}`} style={{ display: 'block', fontSize: 11, fontWeight: 700, textAlign: 'center', background: ac.accent, color: '#fff', padding: '6px 0', letterSpacing: '0.5px', textTransform: 'uppercase', textDecoration: 'none' }}>
                        {item.heading}
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
          STYLES
      ══════════════════════════════════════════ */}
      <style>{`
        .ac-reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.65s cubic-bezier(0.22,1,0.36,1), transform 0.65s cubic-bezier(0.22,1,0.36,1); }
        .ac-reveal.ac-visible { opacity: 1; transform: translateY(0); }
        .ac-reveal-d1 { transition-delay: 0.12s; }
        .ac-reveal-d2 { transition-delay: 0.24s; }
        .ac-sw-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
        @keyframes kaPulse { 0%,100%{ opacity:1; transform:scale(1); } 50%{ opacity:.5; transform:scale(.8); } }
        @media (max-width: 1024px) {
          .ka-comm-inner { grid-template-columns: 1fr !important; gap: 40px !important; }
          .ka-net-panel  { grid-template-columns: 1fr !important; gap: 32px !important; }
          .ka-prod-body  { grid-template-columns: 1fr !important; }
          .ka-prod-list  { border-right: none !important; border-bottom: 1px solid #e5e7eb !important; }
          .ka-scanner-layout { flex-direction: column-reverse !important; gap: 32px !important; min-height: unset !important; }
          .ka-scanner-img { height: 320px !important; }
          .ac-sw-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .ka-net-products { grid-template-columns: 1fr !important; }
          .ka-net-img { height: 200px !important; }
          .ka-scanner-img { height: 260px !important; }
        }
      `}</style>
    </main>
  );
}
