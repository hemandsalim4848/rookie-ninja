'use client';

import { useState, useEffect, useRef } from 'react';
import { cld } from '@/src/lib/cloudinaryUrl';

const ms = {
  accent: '#e4001b',
  alt:    '#f8fafc',
  text:   '#0f1320',
  dim:    '#6b7280',
};

/* ─────────────────────────────────────────────
   HERO SLIDES
───────────────────────────────────────────── */
const heroSlides = [
  {
    id: 'gpus',
    badge: 'Official Distributor',
    lines: ['Game', 'Without Limits.'],
    accentLine: 1,
    desc: 'MSI GeForce graphic cards deliver next-generation gaming performance, ray tracing, and AI-powered DLSS features — engineered for every build tier from mid-range to flagship.',
    cta: { label: 'Explore GPUs', href: '#graphic-cards', solid: true },
  },
  {
    id: 'motherboards',
    badge: 'Motherboards',
    lines: ['Built to', 'Perform.'],
    accentLine: 0,
    desc: 'From entry-level PRO series to flagship MEG boards — MSI motherboards combine robust power delivery with feature-rich connectivity for AMD and Intel platforms.',
    cta: { label: 'View Motherboards', href: '#motherboards', solid: false },
  },
];

/* ─────────────────────────────────────────────
   PERIPHERALS — accordion, display only
───────────────────────────────────────────── */
const peripheralItems = [
  {
    num: '01',
    navTitle: 'Gaming Mice',
    tag: 'Gaming Peripherals',
    heading: 'MSI Clutch Series — Gaming Mice',
    desc: 'The MSI Clutch series delivers precision gaming with ultra-light designs, high-DPI optical sensors, and per-key RGB lighting — built for competitive and casual players.',
    features: [
      'Up to 26,000 DPI optical sensor',
      'Ultra-lightweight designs from under 60g',
      'Per-key RGB with Mystic Light Sync',
      'Omron or MSI mechanical switches rated 60M clicks',
      'Ergonomic right-handed and ambidextrous options',
      'USB Type-C detachable cable',
    ],
  },
  {
    num: '02',
    navTitle: 'Gaming Keyboards',
    tag: 'Gaming Peripherals',
    heading: 'MSI Vigor Series — Mechanical Keyboards',
    desc: 'MSI Vigor keyboards feature per-key RGB mechanical switches and programmable macros — designed for gaming performance and long-session comfort.',
    features: [
      'Cherry MX / MSI custom mechanical switches',
      'Per-key RGB backlight with Mystic Light',
      'N-key rollover — full anti-ghosting',
      'Programmable macro keys',
      'Detachable magnetic wrist rest',
      'Full-size and tenkeyless layouts',
    ],
  },
  {
    num: '03',
    navTitle: 'Gaming Headsets',
    tag: 'Gaming Peripherals',
    heading: 'MSI Immerse Series — Gaming Headsets',
    desc: 'MSI Immerse headsets deliver spatial audio with virtual 7.1 surround sound, noise-cancelling microphones, and plush memory foam earcups for marathon sessions.',
    features: [
      'Virtual 7.1 surround sound',
      'Noise-cancelling retractable microphone',
      'Memory foam earcups for extended comfort',
      'Foldable design for easy portability',
      'USB and 3.5mm dual connectivity',
      'PC, console, and mobile compatible',
    ],
  },
  {
    num: '04',
    navTitle: 'Gaming Monitors',
    tag: 'Gaming Peripherals',
    heading: 'MSI Optix / MAG Series — Gaming Monitors',
    desc: 'From 144Hz FHD to 4K 240Hz QD-OLED — MSI gaming monitors combine low response times, adaptive sync, and vivid panels for the smoothest gaming experience.',
    features: [
      'Up to 4K 240Hz with QD-OLED technology',
      '1ms (GTG) response time',
      'AMD FreeSync Premium Pro & NVIDIA G-Sync',
      'Night Vision for improved dark scene visibility',
      'Built-in KVM switch and USB hub',
      '24" to 32" sizes available',
    ],
  },
];

/* ─────────────────────────────────────────────
   NAV
───────────────────────────────────────────── */
const MS_NAV = [
  { label: 'Graphic Cards',  href: '#graphic-cards' },
  { label: 'Motherboards',   href: '#motherboards' },
  { label: 'Peripherals',    href: '#peripherals' },
];

function MsNavInner({ accent }: { accent: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'nowrap', gap: 20, maxWidth: 1140, width: '100%', margin: '0 auto', height: 58, padding: '0 20px' }}>
      <ul style={{ display: 'flex', alignItems: 'center', flex: 1, gap: 36, listStyle: 'none', margin: 0, padding: 0, overflowX: 'auto', scrollbarWidth: 'none' }}>
        {MS_NAV.map(link => (
          <li key={link.href} style={{ flexShrink: 0 }}>
            <a href={link.href}
               style={{ display: 'inline-block', fontSize: 14, fontWeight: 500, color: '#111', textDecoration: 'none', letterSpacing: '0.15px', whiteSpace: 'nowrap', position: 'relative', paddingBottom: 3, transition: 'color 0.2s' }}
               onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = accent; (el.querySelector('.ms-ul') as HTMLElement | null)?.style.setProperty('width', '100%'); }}
               onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = '#111'; (el.querySelector('.ms-ul') as HTMLElement | null)?.style.setProperty('width', '0'); }}>
              {link.label}
              <span className="ms-ul" style={{ position: 'absolute', bottom: 0, left: 0, width: 0, height: 2, background: accent, borderRadius: 2, transition: 'width 0.25s ease' }} />
            </a>
          </li>
        ))}
      </ul>
      <a href="#motherboards"
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
export default function MSIPage() {
  const [heroIdx, setHeroIdx]       = useState(0);
  const [progress, setProgress]     = useState(0);
  const rafRef                      = useRef<number | null>(null);
  const startRef                    = useRef<number | null>(null);
  const heroRef                     = useRef<HTMLElement>(null);
  const DURATION                    = 5000;

  const [isSticky, setIsSticky]     = useState(false);
  const [mbTab, setMbTab]           = useState<'intel' | 'amd'>('intel');
  const [periActive, setPeriActive] = useState(0);
  const [formState, setFormState]   = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  /* products loaded from API */
  const [gpus,  setGpus]  = useState<any[]>([]);
  const [boards, setBoards] = useState<{ intel: any[]; amd: any[] }>({ intel: [], amd: [] });
  const [heroBgs, setHeroBgs] = useState<string[]>(['', '']);

  /* ── Fetch MSI products ── */
  useEffect(() => {
    fetch('/api/products?brand=msi')
      .then(r => r.json())
      .then((all: any[]) => {
        if (!Array.isArray(all)) return;
        const gpuList = all.filter(p => /graphics?\s*cards?|gpu|vga/i.test(p.category)).reverse().slice(0, 4);
        const intelBoards = all
          .filter(p => p.category === 'Motherboards' && /z890|b860|z790|b760/i.test(p.name))
          .slice(0, 4);
        const amdBoards = all
          .filter(p => p.category === 'Motherboards' && /x870|b850|x570|b550/i.test(p.name))
          .slice(0, 4);
        setGpus(gpuList);
        setBoards({ intel: intelBoards, amd: amdBoards });
        // Use actual product images for hero backgrounds
        setHeroBgs([
          gpuList[0]?.images?.[0] || '',
          (intelBoards[0] || amdBoards[0])?.images?.[0] || '',
        ]);
      })
      .catch(() => {});
  }, []);

  /* ── Hero timer ── */
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
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('ms-visible'); obs.unobserve(e.target); } }),
      { threshold: 0.08 }
    );
    document.querySelectorAll('.ms-reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [gpus, boards]);

  /* ── Form ── */
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setFormState('sending');
    try {
      const form = e.currentTarget;
      const res = await fetch('https://formspree.io/f/xdajrzpv', { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      if (res.ok) { setFormState('success'); form.reset(); } else setFormState('error');
    } catch { setFormState('error'); }
  };

  const mbProducts = boards[mbTab];

  return (
    <main style={{ background: '#fff', color: ms.text, fontFamily: 'var(--font-poppins)', overflowX: 'hidden' }}>

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section ref={heroRef} className="ka-hero" style={{ position: 'relative', width: '100%', overflow: 'hidden', background: '#000' }}>
        {heroSlides.map((s, i) => (
          <div key={s.id} className="ka-slide"
               style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', opacity: i === heroIdx ? 1 : 0, transition: 'opacity 0.9s cubic-bezier(0.77,0,0.175,1)', zIndex: i === heroIdx ? 2 : 1 }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: heroBgs[i] ? `url('${cld(heroBgs[i])}')` : undefined, backgroundSize: 'cover', backgroundPosition: 'center', transform: i === heroIdx ? 'scale(1)' : 'scale(1.06)', transition: 'transform 6s ease', filter: 'brightness(0.38)' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(0,0,0,0.72) 38%, transparent 80%)' }} />
            <div className="ka-hero-container" style={{ position: 'relative', zIndex: 3, width: '100%', maxWidth: 1220, margin: '0 auto', padding: '0 20px' }}>
              <div className="ka-hero-content"
                   style={{ maxWidth: 580, opacity: i === heroIdx ? 1 : 0, transform: i === heroIdx ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 0.7s ease 0.4s, transform 0.7s ease 0.4s' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: ms.accent, color: '#fff', fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', padding: '5px 12px', marginBottom: 18, borderRadius: 2 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff', opacity: 0.9, display: 'inline-block', animation: 'kaPulse 2s infinite' }} />
                  {s.badge}
                </span>
                <h1 className="ka-hero-heading" style={{ fontSize: 'clamp(40px, 6vw, 78px)', color: '#fff', lineHeight: 0.95, marginBottom: 18, fontWeight: 700, letterSpacing: 1 }}>
                  {s.lines.map((line, li) => <span key={li} style={{ display: 'block', color: li === s.accentLine ? ms.accent : '#fff' }}>{line}</span>)}
                </h1>
                <p className="ka-hero-desc" style={{ fontSize: 15, color: 'rgba(255,255,255,0.72)', lineHeight: 1.65, marginBottom: 32, fontWeight: 300, maxWidth: 420 }}>{s.desc}</p>
                <a href={s.cta.href} className="ka-hero-btn"
                   style={{ display: 'inline-block', padding: '13px 28px', background: s.cta.solid ? '#fff' : 'transparent', color: s.cta.solid ? '#0d0d0d' : '#fff', border: '2px solid #fff', fontSize: 13, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', textDecoration: 'none', borderRadius: 2, transition: 'background 0.25s, color 0.25s, border-color 0.25s' }}
                   onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = ms.accent; el.style.borderColor = ms.accent; el.style.color = '#fff'; }}
                   onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = s.cta.solid ? '#fff' : 'transparent'; el.style.borderColor = '#fff'; el.style.color = s.cta.solid ? '#0d0d0d' : '#fff'; }}>
                  {s.cta.label}
                </a>
              </div>
            </div>
          </div>
        ))}
        <div className="ka-dots" style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(calc(-570px + 20px))', display: 'flex', gap: 10, zIndex: 10 }}>
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => goSlide(i)} style={{ width: 10, height: 10, borderRadius: '50%', padding: 0, border: 'none', cursor: 'pointer', background: i === heroIdx ? ms.accent : 'rgba(255,255,255,0.35)', transform: i === heroIdx ? 'scale(1.3)' : 'scale(1)', transition: 'background 0.3s, transform 0.3s' }} />
          ))}
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, height: 3, background: ms.accent, width: `${progress}%`, zIndex: 10, transition: 'width 0.1s linear' }} />
      </section>

      {/* ══════════════════════════════════════════
          STICKY NAV
      ══════════════════════════════════════════ */}
      <div style={{ width: '100%', background: '#fff', borderBottom: '1px solid rgba(0,0,0,0.09)', visibility: isSticky ? 'hidden' : 'visible' }}>
        <MsNavInner accent={ms.accent} />
      </div>
      <div style={{ width: '100%', background: '#fff', borderBottom: '1px solid rgba(0,0,0,0.09)', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1001, boxShadow: '0 2px 20px rgba(0,0,0,0.12)', transform: isSticky ? 'translateY(0)' : 'translateY(-100%)', transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)' }}>
        <MsNavInner accent={ms.accent} />
      </div>

      {/* ══════════════════════════════════════════
          GRAPHIC CARDS
      ══════════════════════════════════════════ */}
      <section id="graphic-cards" style={{ width: '100%', background: ms.alt, padding: '72px 20px' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div className="ms-reveal" style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700, color: ms.text, marginBottom: 14, letterSpacing: -0.3 }}>Graphic Cards</h2>
            <p style={{ fontSize: 15, color: '#64748b', lineHeight: 1.65, maxWidth: 560, margin: '0 auto' }}>
              MSI GeForce graphic cards combine NVIDIA's latest architecture with MSI's custom cooling and overclocking — delivering exceptional performance for gaming and creative workloads.
            </p>
          </div>

          {gpus.length === 0 ? (
            /* Skeleton / empty state */
            <div className="ms-reveal ms-card-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
              {[0,1,2,3].map(i => (
                <div key={i} style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', height: 340, animation: 'msPulse 1.4s ease infinite' }} />
              ))}
            </div>
          ) : (
            <div className="ms-reveal ms-card-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
              {gpus.map((gpu, i) => (
                <div key={gpu._id || i}
                     style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', overflow: 'hidden', boxShadow: '0 2px 16px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', transition: 'box-shadow 0.3s ease, transform 0.3s ease', cursor: 'pointer' }}
                     onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = '0 8px 32px rgba(0,0,0,0.12)'; }}
                     onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(0)'; el.style.boxShadow = '0 2px 16px rgba(0,0,0,0.06)'; }}>
                  <div style={{ width: '100%', height: 180, background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #f1f5f9' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={cld(gpu.images?.[0])} alt={gpu.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 14 }} />
                  </div>
                  <div style={{ padding: '18px 18px 22px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <p style={{ fontSize: 10, fontWeight: 700, color: ms.accent, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 6 }}>GeForce</p>
                    <h3 style={{ fontSize: 14, fontWeight: 700, color: ms.text, marginBottom: 10, lineHeight: 1.3 }}>{gpu.name}</h3>
                    {gpu.shortDescription && (
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 5, flex: 1 }}>
                        {gpu.shortDescription.split('\n').filter(Boolean).slice(0, 2).map((f: string, j: number) => (
                          <li key={j} style={{ fontSize: 12, color: '#64748b', paddingLeft: 12, position: 'relative', lineHeight: 1.4 }}>
                            <span style={{ position: 'absolute', left: 0, top: 5, width: 5, height: 5, borderRadius: '50%', background: ms.accent, display: 'inline-block' }} />
                            {f}
                          </li>
                        ))}
                      </ul>
                    )}
                    <a href={`/products/${gpu.slug}`}
                       style={{ marginTop: 14, display: 'inline-block', padding: '8px 16px', background: ms.accent, color: '#fff', fontSize: 12, fontWeight: 600, borderRadius: 50, textDecoration: 'none', alignSelf: 'flex-start', transition: 'opacity 0.2s' }}
                       onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.85'; }}
                       onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1'; }}>
                      View Product
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="ms-reveal" style={{ textAlign: 'center', marginTop: 36 }}>
            <a href="/msi?category=Graphics+Cards"
               style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 600, color: ms.accent, textDecoration: 'none', border: `1.5px solid ${ms.accent}`, padding: '10px 24px', borderRadius: 50, transition: 'background 0.2s, color 0.2s' }}
               onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = ms.accent; el.style.color = '#fff'; }}
               onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = 'transparent'; el.style.color = ms.accent; }}>
              View All Graphics Cards
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MOTHERBOARDS — dark inquiry + tabs
      ══════════════════════════════════════════ */}
      <section id="motherboards" style={{ width: '100%', background: 'linear-gradient(90deg, #0b0b0b, #160000)', padding: '80px 20px', color: '#fff' }}>
        <div className="ka-comm-inner" style={{ maxWidth: 1140, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 420px', gap: 60, alignItems: 'center' }}>
          <div className="ms-reveal">
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 700, marginBottom: 20, color: '#fff', lineHeight: 1.2 }}>Motherboards</h2>
            <p style={{ fontSize: 15, color: '#cbd5e1', lineHeight: 1.7 }}>
              MSI motherboards are engineered for AMD and Intel platforms — from the budget-friendly PRO series to overclocking-ready MEG flagships. Featuring robust VRM designs, PCIe 5.0, DDR5, Wi-Fi 7, and industry-leading BIOS.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 24 }}>
              {['MEG', 'MPG', 'MAG', 'PRO'].map(tier => (
                <span key={tier} style={{ fontSize: 12, fontWeight: 600, padding: '5px 14px', background: 'rgba(255,255,255,0.08)', border: `1px solid ${ms.accent}`, color: '#e2e8f0', borderRadius: 4 }}>{tier}</span>
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
                  <option value="" style={{ background: '#111', color: '#fff' }}>Select Category</option>
                  {['Graphic Cards', 'Motherboards', 'Peripherals'].map(o => (
                    <option key={o} style={{ background: '#111', color: '#fff' }}>{o}</option>
                  ))}
                </select>
                {formState === 'error' && <p style={{ fontSize: 12, color: '#fca5a5' }}>Something went wrong. Please try again.</p>}
                <button type="submit" disabled={formState === 'sending'} style={{ marginTop: 10, padding: 13, background: ms.accent, color: '#fff', fontWeight: 600, border: 'none', borderRadius: 6, cursor: formState === 'sending' ? 'not-allowed' : 'pointer', letterSpacing: 1, fontSize: 13, opacity: formState === 'sending' ? 0.7 : 1, transition: 'opacity 0.2s', fontFamily: 'var(--font-poppins)' }}>
                  {formState === 'sending' ? 'SENDING…' : 'SEND INQUIRY'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Motherboard tabs */}
      <section style={{ width: '100%', padding: '40px 20px 60px', background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', borderBottom: '2px solid #eee', marginBottom: 40, gap: 10 }}>
            {([['intel', 'Intel Platform'], ['amd', 'AMD Platform']] as const).map(([key, label]) => (
              <button key={key} onClick={() => setMbTab(key)}
                      style={{ padding: '15px 22px', cursor: 'pointer', fontWeight: 700, fontSize: 14, textTransform: 'uppercase', letterSpacing: 1, color: mbTab === key ? ms.accent : '#888', border: 'none', background: 'none', position: 'relative', fontFamily: 'var(--font-poppins)' }}>
                {label}
                {mbTab === key && <span style={{ position: 'absolute', bottom: -2, left: 0, width: '100%', height: 3, background: ms.accent, display: 'block' }} />}
              </button>
            ))}
          </div>

          {mbProducts.length === 0 ? (
            <div className="ms-card-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
              {[0,1,2,3].map(i => (
                <div key={i} style={{ background: '#f8fafc', borderRadius: 12, border: '1px solid #e5e7eb', height: 320, animation: 'msPulse 1.4s ease infinite' }} />
              ))}
            </div>
          ) : (
            <div className="ms-reveal ms-card-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
              {mbProducts.map((mb, i) => (
                <div key={mb._id || i}
                     style={{ background: '#fff', borderRadius: 12, border: '1px solid #eee', padding: 20, display: 'flex', flexDirection: 'column', transition: 'box-shadow 0.2s, transform 0.2s' }}
                     onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(-3px)'; el.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'; }}
                     onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(0)'; el.style.boxShadow = 'none'; }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={cld(mb.images?.[0])} alt={mb.name} style={{ width: '100%', height: 200, objectFit: 'contain', marginBottom: 16, borderRadius: 6 }} />
                  <h4 style={{ fontSize: 13, fontWeight: 700, color: ms.text, margin: '0 0 8px', lineHeight: 1.3 }}>{mb.name}</h4>
                  <p style={{ fontSize: 11, color: ms.dim, marginBottom: 14, lineHeight: 1.5, flex: 1 }}>{mb.shortDescription?.split('\n')[0] || ''}</p>
                  <a href={`/products/${mb.slug}`}
                     style={{ fontSize: 11, fontWeight: 700, color: ms.accent, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4, letterSpacing: '0.5px', textTransform: 'uppercase' }}
                     onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.7'; }}
                     onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1'; }}>
                    View Product
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </a>
                </div>
              ))}
            </div>
          )}

          <div className="ms-reveal" style={{ textAlign: 'center', marginTop: 32 }}>
            <a href="/msi?category=Motherboards"
               style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 600, color: ms.accent, textDecoration: 'none', border: `1.5px solid ${ms.accent}`, padding: '10px 24px', borderRadius: 50, transition: 'background 0.2s, color 0.2s' }}
               onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = ms.accent; el.style.color = '#fff'; }}
               onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = 'transparent'; el.style.color = ms.accent; }}>
              View All Motherboards
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PERIPHERALS — accordion, display only
      ══════════════════════════════════════════ */}
      <section id="peripherals" style={{ width: '100%', background: ms.alt, padding: '60px 20px 80px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="ms-reveal" style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 700, color: '#000', marginBottom: 6 }}>Peripherals</h2>
            <p style={{ fontSize: 15, color: ms.dim }}>Complete your build with MSI's ecosystem of gaming peripherals — mice, keyboards, headsets, and monitors.</p>
          </div>

          <div className="ka-prod-body ms-reveal ms-reveal-d1"
               style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden', minHeight: 480 }}>

            {/* Left list */}
            <div className="ka-prod-list" style={{ borderRight: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', background: '#fff' }}>
              {peripheralItems.map((item, idx) => (
                <div key={item.num} onClick={() => setPeriActive(idx)}
                     style={{ borderBottom: idx < peripheralItems.length - 1 ? '1px solid #e5e7eb' : 'none', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '18px 24px', background: periActive === idx ? '#fff5f5' : '#fff', transition: 'background 0.2s' }}
                       onMouseEnter={e => { if (periActive !== idx) (e.currentTarget as HTMLDivElement).style.background = '#f9fafb'; }}
                       onMouseLeave={e => { if (periActive !== idx) (e.currentTarget as HTMLDivElement).style.background = '#fff'; }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: ms.accent, letterSpacing: 1, minWidth: 24 }}>{item.num}</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: periActive === idx ? ms.accent : '#1f2937', flex: 1, lineHeight: 1.4 }}>{item.navTitle}</span>
                    <span style={{ fontSize: 18, color: periActive === idx ? ms.accent : '#d1d5db', transition: 'transform 0.3s, color 0.3s', transform: periActive === idx ? 'rotate(90deg)' : 'none' }}>›</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Right panel */}
            <div style={{ background: ms.alt, display: 'flex', flexDirection: 'column' }}>
              {peripheralItems.map((item, idx) => (
                <div key={item.num}
                     style={{ display: periActive === idx ? 'flex' : 'none', flexDirection: 'column', height: '100%', padding: '36px 36px 28px', gap: 20 }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: ms.accent, textTransform: 'uppercase', letterSpacing: 1, margin: 0 }}>{item.tag}</p>
                  <h3 style={{ fontSize: 22, fontWeight: 700, color: ms.text, margin: '6px 0 10px', lineHeight: 1.3 }}>{item.heading}</h3>
                  <p style={{ fontSize: 14, color: ms.dim, lineHeight: 1.75, margin: 0 }}>{item.desc}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {item.features.map(f => (
                      <div key={f} style={{ fontSize: 13, color: '#374151', display: 'flex', alignItems: 'flex-start', gap: 8, lineHeight: 1.5 }}>
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: ms.accent, flexShrink: 0, marginTop: 6 }} />{f}
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 'auto', paddingTop: 16 }}>
                    <p style={{ fontSize: 12, color: '#94a3b8', fontStyle: 'italic' }}>Contact us to enquire about MSI peripherals availability.</p>
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
        .ka-hero { height: 680px; }
        .ms-reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.65s cubic-bezier(0.22,1,0.36,1), transform 0.65s cubic-bezier(0.22,1,0.36,1); }
        .ms-reveal.ms-visible { opacity: 1; transform: translateY(0); }
        .ms-reveal-d1 { transition-delay: 0.12s; }
        @keyframes kaPulse { 0%,100%{ opacity:1; transform:scale(1); } 50%{ opacity:.5; transform:scale(.8); } }
        @keyframes msPulse { 0%,100%{ opacity:1; } 50%{ opacity:0.4; } }
        .ms-card-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
        @media (max-width: 1024px) {
          .ka-comm-inner { grid-template-columns: 1fr !important; gap: 40px !important; }
          .ka-prod-body  { grid-template-columns: 1fr !important; }
          .ka-prod-list  { border-right: none !important; border-bottom: 1px solid #e5e7eb !important; }
          .ms-card-grid  { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .ka-hero { height: 420px !important; }
          .ka-slide { align-items: flex-end !important; padding-bottom: 70px !important; }
          .ms-card-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .ka-hero { height: 550px !important; }
        }
      `}</style>
    </main>
  );
}
