'use client';

import { useState, useEffect, useRef } from 'react';

const f = {
  accent: '#E60012',
  bg:     '#ffffff',
  alt:    '#f8fafc',
  text:   '#0f1320',
  dim:    '#6b7280',
  line:   'rgba(0,0,0,0.08)',
};

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const heroSlides = [
  {
    id: 'dl4850',
    badge: 'Official Distributor',
    lines: ['Impact Printing.', 'Built to Last.'],
    accentLine: 1,
    desc: 'The Fujitsu DL4850+ delivers high-speed 24-pin SIDM printing for wide-carriage industrial and business forms — built for continuous, high-volume environments.',
    cta: { label: 'View DL4850+', href: '#printers', solid: true, productIdx: 0 },
    bg: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1783429060/dl4850-img_01_en-1200x800_ulvffs.webp',
  },
  {
    id: 'dl3100',
    badge: 'Dot Matrix Printers',
    lines: ['Reliable Output.', 'Every Time.'],
    accentLine: 0,
    desc: 'The Fujitsu DL3100 offers dependable 9-pin dot matrix printing for receipts, invoices and multi-part forms — compact, efficient, and easy to deploy.',
    cta: { label: 'View DL3100', href: '#printers', solid: false, productIdx: 1 },
    bg: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1783429060/dl3100-img01-1200x800_f2ilzg.webp',
  },
];

const printers = [
  {
    id:       'dl4850',
    tag:      'SIDM Wide Carriage',
    title:    'DL4850+',
    subtitle: 'Fujitsu SIDM Printer',
    intro:    'High-speed 24-pin wide-carriage SIDM printer designed for demanding business environments — handles multi-part forms, invoices, and industrial continuous paper with precision.',
    image:    'https://res.cloudinary.com/df52xzi3y/image/upload/v1783429060/dl4850-img_01_en-1200x800_ulvffs.webp',
    bullets: [
      '24-pin SIDM print head',
      'Up to 600 cps (draft) / 200 cps (LQ)',
      '136-column wide carriage',
      'Multi-part forms up to 5 copies',
      'Parallel + Serial interface',
      'Push/pull tractor feed',
      'Long-life ribbon — up to 4 million characters',
    ],
    specs: [
      { key: 'Print Head',     value: '24-pin, 0.27mm wire diameter' },
      { key: 'Print Speed',    value: '600 cps draft / 200 cps LQ' },
      { key: 'Carriage Width', value: '136 columns (wide carriage)' },
      { key: 'Multi-part',     value: 'Up to 5 copies (original + 4)' },
      { key: 'Interface',      value: 'Parallel (Centronics) + Serial (RS-232C)' },
      { key: 'Paper Feed',     value: 'Push/pull tractor, friction' },
      { key: 'Emulation',      value: 'IBM Proprinter XL24E, Epson LQ-2550' },
      { key: 'Duty Cycle',     value: 'Up to 5 million lines/month' },
      { key: 'Noise Level',    value: '53 dB(A) with acoustical cover' },
      { key: 'Dimensions',     value: '590 × 368 × 170 mm' },
    ],
  },
  {
    id:       'dl3100',
    tag:      'Dot Matrix',
    title:    'DL3100',
    subtitle: 'Fujitsu Dot Matrix Printer',
    intro:    'Compact 9-pin dot matrix printer for everyday business printing — reliable multi-part form handling, low running costs, and straightforward deployment for any office.',
    image:    'https://res.cloudinary.com/df52xzi3y/image/upload/v1783429060/dl3100-img01-1200x800_f2ilzg.webp',
    bullets: [
      '9-pin dot matrix print head',
      'Up to 450 cps (draft) / 80 cps (NLQ)',
      '80-column standard carriage',
      'Multi-part forms up to 4 copies',
      'USB + Parallel interface',
      'Single sheet & continuous paper',
      'Compact desktop footprint',
    ],
    specs: [
      { key: 'Print Head',     value: '9-pin dot matrix' },
      { key: 'Print Speed',    value: '450 cps draft / 80 cps NLQ' },
      { key: 'Carriage Width', value: '80 columns (standard carriage)' },
      { key: 'Multi-part',     value: 'Up to 4 copies (original + 3)' },
      { key: 'Interface',      value: 'USB + Parallel (Centronics)' },
      { key: 'Paper Feed',     value: 'Friction, push tractor' },
      { key: 'Emulation',      value: 'Epson FX-890, IBM Proprinter' },
      { key: 'Duty Cycle',     value: 'Up to 1 million lines/month' },
      { key: 'Noise Level',    value: '55 dB(A)' },
      { key: 'Dimensions',     value: '370 × 303 × 145 mm' },
    ],
  },
];

const FJ_NAV_LINKS = [
  { label: 'DL4850+', idx: 0 },
  { label: 'DL3100',  idx: 1 },
];

function FjNavInner({ onSelect, active }: { onSelect: (idx: number) => void; active: number }) {
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
        {FJ_NAV_LINKS.map(link => (
          <li key={link.label} style={{ flexShrink: 0 }}>
            <a href="#printers"
               onClick={e => { e.preventDefault(); onSelect(link.idx); document.getElementById('printers')?.scrollIntoView({ behavior: 'smooth' }); }}
               style={{
                 display: 'inline-block', fontSize: 14, fontWeight: 500,
                 color: active === link.idx ? f.accent : '#111',
                 textDecoration: 'none', letterSpacing: '0.15px',
                 whiteSpace: 'nowrap', position: 'relative', paddingBottom: 3,
                 transition: 'color 0.2s', cursor: 'pointer',
               }}
               onMouseEnter={e => {
                 const el = e.currentTarget as HTMLAnchorElement;
                 el.style.color = f.accent;
                 (el.querySelector('.fj-ul') as HTMLElement | null)?.style.setProperty('width', '100%');
               }}
               onMouseLeave={e => {
                 const el = e.currentTarget as HTMLAnchorElement;
                 el.style.color = active === link.idx ? f.accent : '#111';
                 (el.querySelector('.fj-ul') as HTMLElement | null)?.style.setProperty('width', active === link.idx ? '100%' : '0');
               }}>
              {link.label}
              <span className="fj-ul" style={{
                position: 'absolute', bottom: 0, left: 0,
                width: active === link.idx ? '100%' : '0', height: 2,
                background: f.accent, borderRadius: 2, transition: 'width 0.25s ease',
              }} />
            </a>
          </li>
        ))}
      </ul>
      <a href="#enquire"
         style={{
           flexShrink: 0, padding: '11px 26px',
           background: f.accent, color: '#fff',
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
export default function FujitsuPage() {
  const [heroIdx, setHeroIdx]   = useState(0);
  const [progress, setProgress] = useState(0);
  const rafRef                  = useRef<number | null>(null);
  const startRef                = useRef<number | null>(null);
  const heroRef                 = useRef<HTMLElement>(null);
  const DURATION                = 5500;

  const [isSticky, setIsSticky]       = useState(false);
  const [active, setActive]           = useState(0);
  const [activeThumb, setActiveThumb] = useState(0);
  const [imgFade, setImgFade]         = useState(false);
  const [formState, setFormState]     = useState<'idle'|'sending'|'success'|'error'>('idle');

  /* ── Hero animation ── */
  function goSlide(idx: number) {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setHeroIdx(idx); setProgress(0); startRef.current = null;
    function tick(now: number) {
      if (!startRef.current) startRef.current = now;
      const p = Math.min(((now - startRef.current) / DURATION) * 100, 100);
      setProgress(p);
      if (p < 100) rafRef.current = requestAnimationFrame(tick);
      else { setHeroIdx(i => (i + 1) % heroSlides.length); startRef.current = null; rafRef.current = requestAnimationFrame(tick); }
    }
    rafRef.current = requestAnimationFrame(tick);
  }

  useEffect(() => { goSlide(0); return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }; }, []);

  /* ── Sticky nav ── */
  useEffect(() => {
    const onScroll = () => { if (heroRef.current) setIsSticky(heroRef.current.getBoundingClientRect().bottom <= 0); };
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
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('fj-visible'); obs.unobserve(e.target); } }),
      { threshold: 0.08 }
    );
    document.querySelectorAll('.fj-reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  /* ── Product switcher ── */
  function switchProduct(idx: number) {
    if (idx === active) return;
    setImgFade(true);
    setTimeout(() => { setActive(idx); setActiveThumb(0); setImgFade(false); }, 280);
  }

  /* ── Form ── */
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setFormState('sending');
    try {
      const res = await fetch('https://formspree.io/f/xdajrzpv', { method: 'POST', body: new FormData(e.currentTarget), headers: { Accept: 'application/json' } });
      if (res.ok) { setFormState('success'); (e.currentTarget as HTMLFormElement).reset(); }
      else setFormState('error');
    } catch { setFormState('error'); }
  }

  const activePrinter = printers[active];

  return (
    <main style={{ background: f.bg, color: f.text, fontFamily: 'var(--font-poppins)', overflowX: 'hidden' }}>

      {/* ══════════════════════════════════════════
          HERO SLIDER
      ══════════════════════════════════════════ */}
      <section ref={heroRef} className="ka-hero" style={{ position: 'relative', width: '100%', overflow: 'hidden', background: '#111' }}>
        {heroSlides.map((s, i) => (
          <div key={s.id} className="ka-slide"
               style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', opacity: i === heroIdx ? 1 : 0, transition: 'opacity 0.9s cubic-bezier(0.77,0,0.175,1)', zIndex: i === heroIdx ? 2 : 1 }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: `url('${s.bg}')`, backgroundSize: 'cover', backgroundPosition: 'center', transform: i === heroIdx ? 'scale(1)' : 'scale(1.06)', transition: 'transform 6s ease', filter: 'brightness(0.35)' }} />
            <div className="ka-vignette" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(0,0,0,0.75) 38%, transparent 80%)' }} />
            <div className="ka-hero-container" style={{ position: 'relative', zIndex: 3, width: '100%', maxWidth: 1140, margin: '0 auto', padding: '0 20px' }}>
              <div className="ka-hero-content" style={{ maxWidth: 560, opacity: i === heroIdx ? 1 : 0, transform: i === heroIdx ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 0.7s ease 0.4s, transform 0.7s ease 0.4s' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: f.accent, color: '#fff', fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', padding: '5px 12px', marginBottom: 18, borderRadius: 2 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff', opacity: 0.9, display: 'inline-block', animation: 'fjPulse 2s infinite' }} />
                  {s.badge}
                </span>
                <h1 className="ka-hero-heading" style={{ fontSize: 'clamp(40px, 6vw, 78px)', color: '#fff', lineHeight: 0.95, marginBottom: 18, fontWeight: 700, letterSpacing: 1 }}>
                  {s.lines.map((line, li) => (
                    <span key={li} style={{ display: 'block', color: li === s.accentLine ? f.accent : '#fff' }}>{line}</span>
                  ))}
                </h1>
                <p className="ka-hero-desc" style={{ fontSize: 15, color: 'rgba(255,255,255,0.72)', lineHeight: 1.65, marginBottom: 32, fontWeight: 300, maxWidth: 420 }}>{s.desc}</p>
                <a href={s.cta.href} className="ka-hero-btn"
                   onClick={e => { e.preventDefault(); switchProduct(s.cta.productIdx); document.getElementById('printers')?.scrollIntoView({ behavior: 'smooth' }); }}
                   style={{ display: 'inline-block', padding: '13px 28px', background: s.cta.solid ? '#fff' : 'transparent', color: s.cta.solid ? '#0d0d0d' : '#fff', border: '2px solid #fff', fontSize: 13, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', textDecoration: 'none', borderRadius: 2, transition: 'background 0.25s, color 0.25s, border-color 0.25s' }}
                   onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = f.accent; el.style.borderColor = f.accent; el.style.color = '#fff'; }}
                   onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = s.cta.solid ? '#fff' : 'transparent'; el.style.borderColor = '#fff'; el.style.color = s.cta.solid ? '#0d0d0d' : '#fff'; }}>
                  {s.cta.label}
                </a>
              </div>
            </div>
          </div>
        ))}

        <div className="ka-dots" style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(calc(-570px + 20px))', display: 'flex', gap: 10, zIndex: 10 }}>
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => goSlide(i)}
                    style={{ width: 10, height: 10, borderRadius: '50%', padding: 0, border: 'none', cursor: 'pointer', background: i === heroIdx ? f.accent : 'rgba(255,255,255,0.35)', transform: i === heroIdx ? 'scale(1.3)' : 'scale(1)', transition: 'background 0.3s, transform 0.3s' }} />
          ))}
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, height: 3, background: f.accent, width: `${progress}%`, zIndex: 10, transition: 'width 0.1s linear' }} />
      </section>

      {/* ══════════════════════════════════════════
          STICKY NAV
      ══════════════════════════════════════════ */}
      <div style={{ width: '100%', background: '#fff', borderBottom: `1px solid ${f.line}`, visibility: isSticky ? 'hidden' : 'visible' }}>
        <FjNavInner onSelect={switchProduct} active={active} />
      </div>
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1001, background: '#fff', borderBottom: `1px solid ${f.line}`, boxShadow: '0 2px 20px rgba(0,0,0,0.12)', transform: isSticky ? 'translateY(0)' : 'translateY(-100%)', transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)' }}>
        <FjNavInner onSelect={switchProduct} active={active} />
      </div>

      {/* ══════════════════════════════════════════
          PRINTERS — IMAGE SWITCHER
      ══════════════════════════════════════════ */}
      <section id="printers" style={{ width: '100%', padding: '80px 20px', background: f.alt }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>

          <div className="fj-reveal" style={{ marginBottom: 52, textAlign: 'center' }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: f.accent }}>Impact & Dot Matrix Printers</span>
            <h2 style={{ fontSize: 'clamp(26px,4vw,40px)', fontWeight: 700, color: f.text, marginTop: 8, marginBottom: 12 }}>Fujitsu Printer Range</h2>
            <p style={{ fontSize: 15, color: f.dim, maxWidth: 520, margin: '0 auto', lineHeight: 1.6 }}>
              From high-speed wide-carriage SIDM to compact dot matrix — Fujitsu printers deliver reliable multi-part form printing for industrial and office environments.
            </p>
          </div>

          <div className="fj-printer-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>

            {/* Left — image */}
            <div className="fj-reveal" style={{ position: 'relative' }}>
              <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 32px rgba(0,0,0,0.08)', aspectRatio: '1 / 1', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
                {activePrinter.image ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={activePrinter.image}
                    alt={activePrinter.title}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', opacity: imgFade ? 0 : 1, transition: 'opacity 0.28s ease' }}
                    onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                  />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: '#f1f5f9', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: f.dim, fontSize: 13 }}>
                    {activePrinter.title}
                  </div>
                )}
              </div>
            </div>

            {/* Right — product list */}
            <div className="fj-reveal" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {printers.map((p, idx) => (
                <div key={p.id}
                     onClick={() => switchProduct(idx)}
                     style={{ cursor: 'pointer', border: `1.5px solid ${active === idx ? f.accent : '#e5e7eb'}`, borderRadius: 14, padding: '20px 22px', background: active === idx ? '#fff' : 'transparent', transition: 'all 0.25s', boxShadow: active === idx ? `0 4px 20px rgba(230,0,18,0.1)` : 'none' }}>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: active === idx ? 12 : 0 }}>
                    <div>
                      <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: active === idx ? f.accent : f.dim }}>{p.tag}</span>
                      <h3 style={{ fontSize: 17, fontWeight: 700, color: f.text, margin: '3px 0 0' }}>{p.title}</h3>
                      <p style={{ fontSize: 12, color: f.dim, margin: '2px 0 0' }}>{p.subtitle}</p>
                    </div>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: active === idx ? f.accent : '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s', flexShrink: 0 }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d={active === idx ? 'M2 6h8' : 'M6 2v8M2 6h8'} stroke={active === idx ? '#fff' : f.dim} strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </div>
                  </div>

                  {active === idx && (
                    <>
                      <p style={{ fontSize: 13, color: f.dim, lineHeight: 1.6, marginBottom: 14 }}>{p.intro}</p>
                      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
                        {p.bullets.map((b, bi) => (
                          <li key={bi} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: f.text }}>
                            <span style={{ width: 6, height: 6, borderRadius: '50%', background: f.accent, marginTop: 5, flexShrink: 0 }} />
                            {b}
                          </li>
                        ))}
                      </ul>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 16px', background: f.alt, borderRadius: 10, padding: '12px 14px' }}>
                        {p.specs.map(s => (
                          <div key={s.key}>
                            <span style={{ fontSize: 10, fontWeight: 600, color: f.dim, textTransform: 'uppercase', letterSpacing: 0.5 }}>{s.key}</span>
                            <p style={{ fontSize: 12, color: f.text, margin: '2px 0 0', fontWeight: 500 }}>{s.value}</p>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ENQUIRY FORM — DARK
      ══════════════════════════════════════════ */}
      <section id="enquire" style={{ width: '100%', background: 'linear-gradient(90deg, #0b1a2e, #0d223d)', padding: '80px 20px', color: '#fff' }}>
        <div className="fj-comm-inner"
             style={{ maxWidth: 1140, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 420px', gap: 60, alignItems: 'center' }}>

          <div className="fj-reveal">
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 700, marginBottom: 20, color: '#fff', lineHeight: 1.2 }}>
              Fujitsu Impact Printers
            </h2>
            <p style={{ fontSize: 15, color: '#cbd5e1', lineHeight: 1.7 }}>
              Fujitsu SIDM and dot matrix printers are engineered for high-volume, multi-part form printing across industrial, logistics, and enterprise environments — delivering unmatched reliability and low total cost of ownership across UAE &amp; MEA.
            </p>
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
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {(['text:name:Full Name', 'email:email:Business Email'] as const).map(raw => {
                  const [type, name, placeholder] = raw.split(':');
                  return (
                    <input key={name} type={type} name={name} placeholder={placeholder} required
                           style={{ width: '100%', padding: '12px 14px', borderRadius: 6, border: 'none', background: 'rgba(255,255,255,0.12)', color: '#fff', fontSize: 14, outline: 'none', fontFamily: 'var(--font-poppins)' }} />
                  );
                })}
                <select name="category" required
                        style={{ width: '100%', padding: '12px 14px', borderRadius: 6, border: 'none', background: 'rgba(255,255,255,0.12)', color: '#e5e7eb', fontSize: 14, outline: 'none', fontFamily: 'var(--font-poppins)' }}>
                  <option value="" style={{ background: '#fff', color: '#000' }}>Select Product</option>
                  {['DL4850+ SIDM Printer', 'DL3100 Dot Matrix Printer'].map(o => (
                    <option key={o} style={{ background: '#fff', color: '#000' }}>{o}</option>
                  ))}
                </select>
                {formState === 'error' && <p style={{ fontSize: 12, color: '#fca5a5' }}>Something went wrong. Please try again.</p>}
                <button type="submit" disabled={formState === 'sending'}
                        style={{ marginTop: 10, padding: 13, background: f.accent, color: '#fff', fontWeight: 600, border: 'none', borderRadius: 6, cursor: formState === 'sending' ? 'not-allowed' : 'pointer', letterSpacing: 1, fontSize: 13, opacity: formState === 'sending' ? 0.7 : 1, transition: 'opacity 0.2s', fontFamily: 'var(--font-poppins)' }}>
                  {formState === 'sending' ? 'SENDING…' : 'SEND INQUIRY'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          STYLES
      ══════════════════════════════════════════ */}
      <style>{`
        @keyframes fjPulse { 0%,100%{ opacity:1; transform:scale(1); } 50%{ opacity:.5; transform:scale(.8); } }
        .fj-reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.65s cubic-bezier(0.22,1,0.36,1), transform 0.65s cubic-bezier(0.22,1,0.36,1); }
        .fj-reveal.fj-visible { opacity: 1; transform: translateY(0); }

        .ka-hero { height: 680px; }
        .fj-comm-inner { grid-template-columns: 1fr 420px; }

        @media (max-width: 1024px) {
          .fj-printer-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .fj-comm-inner   { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
        @media (max-width: 768px) {
          .ka-hero { height: 460px !important; }
          .ka-slide { align-items: flex-end !important; padding-bottom: 72px !important; }
          .ka-hero-container { padding: 0 24px !important; }
          .ka-hero-content  { max-width: 100% !important; }
          .ka-vignette { background: linear-gradient(180deg, transparent 10%, rgba(0,0,0,0.85) 70%) !important; }
          .ka-dots { left: 24px !important; transform: none !important; bottom: 22px !important; }
        }
        @media (max-width: 480px) {
          .ka-hero { height: 540px !important; }
          .ka-hero-heading { letter-spacing: 0 !important; }
          .ka-hero-desc { font-size: 13px !important; margin-bottom: 20px !important; }
          .ka-hero-btn { padding: 10px 20px !important; font-size: 12px !important; }
        }
      `}</style>
    </main>
  );
}
