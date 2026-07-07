'use client';

import { useState, useEffect, useRef } from 'react';

const d = {
  accent: '#C41E3A',
  bg:     '#ffffff',
  alt:    '#f8fafc',
  dark:   '#0b1220',
  text:   '#0f1320',
  dim:    '#6b7280',
  line:   'rgba(0,0,0,0.08)',
};

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const heroSlides = [
  {
    id: 'mfp',
    badge: 'Official Distributor',
    lines: ['Print. Copy.', 'Scan.'],
    accentLine: 1,
    desc: 'The Deli M1820W and M3100ADNW deliver all-in-one laser performance — combining fast print speeds, flatbed scanning, and wireless connectivity for modern office environments.',
    cta: { label: 'View MFP Printers', href: '#printers', solid: true, productIdx: 0 },
  },
  {
    id: 'laser',
    badge: 'Laser Printers',
    lines: ['Laser Precision.', 'Simplified.'],
    accentLine: 0,
    desc: 'The Deli P1820W brings reliable A4 monochrome laser printing to compact workspaces — wireless, app-controlled, and built for daily office demands.',
    cta: { label: 'View P1820W', href: '#printers', solid: false, productIdx: 2 },
  },
];

const printers = [
  {
    id:       'm1820w',
    slug:     'deli-m1820w',
    tag:      'All-in-One MFP',
    title:    'M1820W MFP',
    subtitle: 'Print, Copy & Scan',
    intro:    'Compact monochrome laser MFP with wireless and Bluetooth connectivity — ideal for small offices that need versatile document handling without the bulk.',
    bullets: [
      'Print, Copy & Scan (MFP)',
      '20 PPM print speed',
      '1,600-sheet toner yield',
      'Flatbed scan up to 1200×1200 DPI',
      'USB + Wi-Fi + Bluetooth 4.2',
      'ID card copy support',
      'Controlled via Deli Print App',
    ],
    specs: [
      { key: 'Print Speed',    value: '20 PPM (A4)' },
      { key: 'Resolution',     value: 'Up to 1200×600 DPI' },
      { key: 'Toner Yield',    value: '1,600 pages (ISO 19752)' },
      { key: 'Connectivity',   value: 'USB / Wi-Fi / Bluetooth 4.2' },
      { key: 'Paper Capacity', value: '150-page input tray' },
      { key: 'Scanning',       value: 'Flatbed, up to 1200×1200 DPI' },
      { key: 'Functions',      value: 'Print, Copy, Scan' },
      { key: 'Duty Cycle',     value: '10,000 pages/month' },
      { key: 'Weight',         value: '6.42 kg' },
      { key: 'Dimensions',     value: '396 × 302 × 253 mm' },
    ],
  },
  {
    id:       'm3100adnw',
    slug:     'deli-m3100adnw',
    tag:      'MFP',
    title:    'M3100ADNW',
    subtitle: 'Print, Copy, Scan + ADF',
    intro:    'High-throughput monochrome laser MFP with auto duplex, 35-sheet document feeder, and full network connectivity — built for demanding workgroup environments.',
    bullets: [
      'Print, Copy & Scan (MFP)',
      '31 PPM print speed',
      '3,500-sheet toner yield',
      'Auto duplex printing — 16 PPM',
      '35-sheet auto document feeder',
      'USB + Ethernet + Wi-Fi',
      '30,000 pages/month duty cycle',
    ],
    specs: [
      { key: 'Print Speed',    value: '31 PPM / 16 PPM duplex' },
      { key: 'Resolution',     value: 'Up to 1200×600 DPI' },
      { key: 'Toner Yield',    value: '3,500 pages (ISO 19752)' },
      { key: 'Connectivity',   value: 'USB / Ethernet / Wi-Fi' },
      { key: 'Paper Capacity', value: '250-page tray + 35-sheet ADF' },
      { key: 'Auto Duplex',    value: 'Yes — 16 PPM' },
      { key: 'Functions',      value: 'Print, Copy, Scan, ADF' },
      { key: 'Duty Cycle',     value: '30,000 pages/month' },
      { key: 'Weight',         value: '8.5 kg' },
      { key: 'Dimensions',     value: '396 × 367 × 312 mm' },
    ],
  },
  {
    id:       'p1820w',
    slug:     'deli-p1820w',
    tag:      'Print Only',
    title:    'P1820W',
    subtitle: 'Compact A4 Laser Printer',
    intro:    'Lightweight, wireless A4 laser printer for everyday printing — easy app-based setup, low running costs, and a compact footprint for any desk.',
    bullets: [
      'Print only — A4 monochrome laser',
      '20 PPM print speed',
      '1,600-sheet toner yield',
      '1200×600 DPI resolution',
      'USB + Wi-Fi + Bluetooth 4.2',
      'Controlled via Deli Print App',
      'Ultra-compact at 4.1 kg',
    ],
    specs: [
      { key: 'Print Speed',    value: '20 PPM (A4)' },
      { key: 'Resolution',     value: 'Up to 1200×600 DPI' },
      { key: 'Toner Yield',    value: '1,600 pages (ISO 19752)' },
      { key: 'Connectivity',   value: 'USB / Wi-Fi / Bluetooth 4.2' },
      { key: 'Paper Capacity', value: '150-page input tray' },
      { key: 'Functions',      value: 'Print only' },
      { key: 'Duty Cycle',     value: '10,000 pages/month' },
      { key: 'Weight',         value: '4.1 kg' },
      { key: 'Dimensions',     value: '343 × 229 × 186 mm' },
      { key: 'Toner Model',    value: 'T108 Cartridge' },
    ],
  },
];

const navLinks = [
  { label: 'M1820W MFP',    idx: 0 },
  { label: 'M3100ADNW', idx: 1 },
  { label: 'P1820W',        idx: 2 },
];

/* ─────────────────────────────────────────────
   NAV INNER
───────────────────────────────────────────── */
function DlNavInner({ onSelect, active }: { onSelect: (idx: number) => void; active: number }) {
  return (
    <div style={{ maxWidth: 1140, margin: '0 auto', height: 58, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', gap: 20 }}>
      <ul style={{ display: 'flex', alignItems: 'center', flex: 1, gap: 32, listStyle: 'none', margin: 0, padding: 0, overflowX: 'auto', scrollbarWidth: 'none' }}>
        {navLinks.map(lnk => (
          <li key={lnk.label} style={{ flexShrink: 0 }}>
            <a href="#printers"
               onClick={e => { e.preventDefault(); onSelect(lnk.idx); document.getElementById('printers')?.scrollIntoView({ behavior: 'smooth' }); }}
               style={{ fontSize: 14, fontWeight: 500, color: active === lnk.idx ? d.accent : '#111', textDecoration: 'none', whiteSpace: 'nowrap', position: 'relative', paddingBottom: 3, transition: 'color 0.2s', cursor: 'pointer' }}
               onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = d.accent; (el.querySelector('.dl-ul') as HTMLElement | null)?.style.setProperty('width', '100%'); }}
               onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = active === lnk.idx ? d.accent : '#111'; (el.querySelector('.dl-ul') as HTMLElement | null)?.style.setProperty('width', active === lnk.idx ? '100%' : '0'); }}>
              {lnk.label}
              <span className="dl-ul" style={{ position: 'absolute', bottom: 0, left: 0, width: active === lnk.idx ? '100%' : '0', height: 2, background: d.accent, borderRadius: 2, transition: 'width 0.25s ease' }} />
            </a>
          </li>
        ))}
      </ul>
      <a href="#enquire"
         style={{ flexShrink: 0, padding: '11px 26px', background: d.accent, color: '#fff', fontSize: 14, fontWeight: 600, textDecoration: 'none', borderRadius: 50, whiteSpace: 'nowrap', transition: 'transform 0.15s' }}
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
export default function DeliPage() {
  const [heroIdx, setHeroIdx]     = useState(0);
  const [progress, setProgress]   = useState(0);
  const rafRef                    = useRef<number | null>(null);
  const startRef                  = useRef<number | null>(null);
  const heroRef                   = useRef<HTMLElement>(null);
  const DURATION                  = 5500;

  const [isSticky, setIsSticky]     = useState(false);
  const [active, setActive]         = useState(0);
  const [activeThumb, setActiveThumb] = useState(0);
  const [imgFade, setImgFade]       = useState(false);
  const [formState, setFormState]   = useState<'idle'|'sending'|'success'|'error'>('idle');

  /* product images from API */
  const [images, setImages] = useState<Record<string, string[]>>({});
  const [heroBgs, setHeroBgs] = useState<string[]>(['', '']);

  useEffect(() => {
    fetch('/api/products?brand=deli')
      .then(r => r.json())
      .then((all: any[]) => {
        if (!Array.isArray(all)) return;
        const map: Record<string, string[]> = {};
        all.forEach(p => { if (p.slug) map[p.slug] = p.images || []; });
        setImages(map);
        setHeroBgs([
          map['deli-m1820w']?.[0] || map['deli-m3100adnw']?.[0] || '',
          map['deli-p1820w']?.[0] || '',
        ]);
      })
      .catch(() => {});
  }, []);

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

  /* ── Reveal observer ── */
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('dl-visible'); obs.unobserve(e.target); } }),
      { threshold: 0.08 }
    );
    document.querySelectorAll('.dl-reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [images]);

  /* ── Image switcher ── */
  function switchProduct(idx: number) {
    if (idx === active) return;
    setImgFade(true);
    setTimeout(() => { setActive(idx); setActiveThumb(0); setImgFade(false); }, 280);
  }

  function switchThumb(idx: number) {
    if (idx === activeThumb) return;
    setImgFade(true);
    setTimeout(() => { setActiveThumb(idx); setImgFade(false); }, 180);
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
  const activeImages  = images[activePrinter.slug] || [];

  return (
    <main style={{ background: d.bg, color: d.text, fontFamily: 'var(--font-poppins)', overflowX: 'hidden' }}>

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section ref={heroRef} className="ka-hero" style={{ position: 'relative', width: '100%', overflow: 'hidden', background: '#000' }}>
        {heroSlides.map((s, i) => (
          <div key={s.id} className="ka-slide"
               style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', opacity: i === heroIdx ? 1 : 0, transition: 'opacity 0.9s cubic-bezier(0.77,0,0.175,1)', zIndex: i === heroIdx ? 2 : 1 }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: heroBgs[i] ? `url('${heroBgs[i]}')` : undefined, backgroundSize: 'cover', backgroundPosition: 'center', transform: i === heroIdx ? 'scale(1)' : 'scale(1.06)', transition: 'transform 6s ease', filter: 'brightness(0.35)' }} />
            <div className="ka-vignette" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(0,0,0,0.75) 38%, transparent 80%)' }} />
            <div className="ka-hero-container" style={{ position: 'relative', zIndex: 3, width: '100%', maxWidth: 1140, margin: '0 auto', padding: '0 20px' }}>
              <div className="ka-hero-content" style={{ maxWidth: 560, opacity: i === heroIdx ? 1 : 0, transform: i === heroIdx ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 0.7s ease 0.4s, transform 0.7s ease 0.4s' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: d.accent, color: '#fff', fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', padding: '5px 12px', marginBottom: 18, borderRadius: 2 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff', opacity: 0.9, display: 'inline-block', animation: 'dlPulse 2s infinite' }} />
                  {s.badge}
                </span>
                <h1 style={{ fontSize: 'clamp(40px, 6vw, 78px)', color: '#fff', lineHeight: 0.95, marginBottom: 18, fontWeight: 700, letterSpacing: 1 }}>
                  {s.lines.map((line, li) => (
                    <span key={li} style={{ display: 'block', color: li === s.accentLine ? d.accent : '#fff' }}>{line}</span>
                  ))}
                </h1>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.72)', lineHeight: 1.65, marginBottom: 32, fontWeight: 300, maxWidth: 420 }}>{s.desc}</p>
                <a href={s.cta.href}
                   onClick={e => { e.preventDefault(); switchProduct(s.cta.productIdx); document.getElementById('printers')?.scrollIntoView({ behavior: 'smooth' }); }}
                   style={{ display: 'inline-block', padding: '13px 28px', background: s.cta.solid ? '#fff' : 'transparent', color: s.cta.solid ? '#0d0d0d' : '#fff', border: '2px solid #fff', fontSize: 13, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', textDecoration: 'none', borderRadius: 2, transition: 'background 0.25s, color 0.25s, border-color 0.25s' }}
                   onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = d.accent; el.style.borderColor = d.accent; el.style.color = '#fff'; }}
                   onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = s.cta.solid ? '#fff' : 'transparent'; el.style.borderColor = '#fff'; el.style.color = s.cta.solid ? '#0d0d0d' : '#fff'; }}>
                  {s.cta.label}
                </a>
              </div>
            </div>
          </div>
        ))}

        {/* Dots */}
        <div style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(calc(-570px + 20px))', display: 'flex', gap: 10, zIndex: 10 }}>
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => goSlide(i)}
                    style={{ width: 10, height: 10, borderRadius: '50%', padding: 0, border: 'none', cursor: 'pointer', background: i === heroIdx ? d.accent : 'rgba(255,255,255,0.35)', transform: i === heroIdx ? 'scale(1.3)' : 'scale(1)', transition: 'background 0.3s, transform 0.3s' }} />
          ))}
        </div>

        {/* Progress bar */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, height: 3, background: d.accent, width: `${progress}%`, zIndex: 10, transition: 'width 0.1s linear' }} />
      </section>

      {/* ══════════════════════════════════════════
          STICKY NAV
      ══════════════════════════════════════════ */}
      <div style={{ width: '100%', background: '#fff', borderBottom: `1px solid ${d.line}`, visibility: isSticky ? 'hidden' : 'visible' }}>
        <DlNavInner onSelect={switchProduct} active={active} />
      </div>
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1001, background: '#fff', borderBottom: `1px solid ${d.line}`, boxShadow: '0 2px 20px rgba(0,0,0,0.12)', transform: isSticky ? 'translateY(0)' : 'translateY(-100%)', transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)' }}>
        <DlNavInner onSelect={switchProduct} active={active} />
      </div>

      {/* ══════════════════════════════════════════
          PRINTERS — IMAGE SWITCHER
      ══════════════════════════════════════════ */}
      <section id="printers" style={{ width: '100%', padding: '80px 20px', background: d.alt }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>

          {/* Section heading */}
          <div className="dl-reveal" style={{ marginBottom: 52, textAlign: 'center' }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: d.accent }}>Laser Printers</span>
            <h2 style={{ fontSize: 'clamp(26px,4vw,40px)', fontWeight: 700, color: d.text, marginTop: 8, marginBottom: 12 }}>Deli Monochrome Laser Range</h2>
            <p style={{ fontSize: 15, color: d.dim, maxWidth: 520, margin: '0 auto', lineHeight: 1.6 }}>
              From compact single-function printers to full-featured MFPs — Deli laser printers deliver reliable performance for every office need.
            </p>
          </div>

          <div className="dl-printer-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>

            {/* Left — image */}
            <div className="dl-reveal" style={{ position: 'relative' }}>
              <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 32px rgba(0,0,0,0.08)', aspectRatio: '1 / 1', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
                {activeImages[activeThumb] ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={activeImages[activeThumb]}
                    alt={activePrinter.title}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', opacity: imgFade ? 0 : 1, transition: 'opacity 0.28s ease' }}
                  />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: '#f1f5f9', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: d.dim, fontSize: 13 }}>Loading...</div>
                )}
              </div>

              {/* Thumbnail strip */}
              {activeImages.length > 1 && (
                <div style={{ display: 'flex', gap: 8, marginTop: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                  {activeImages.slice(0, 5).map((img, idx) => (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img key={idx} src={img} alt="" onClick={() => switchThumb(idx)}
                         style={{ width: 52, height: 52, objectFit: 'contain', borderRadius: 8, background: '#fff', border: `2px solid ${idx === activeThumb ? d.accent : '#e5e7eb'}`, padding: 4, cursor: 'pointer', transition: 'border-color 0.2s' }}
                         onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.borderColor = d.accent; }}
                         onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.borderColor = idx === activeThumb ? d.accent : '#e5e7eb'; }} />
                  ))}
                </div>
              )}
            </div>

            {/* Right — product list */}
            <div className="dl-reveal" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {printers.map((p, idx) => (
                <div key={p.id}
                     onClick={() => switchProduct(idx)}
                     style={{ cursor: 'pointer', border: `1.5px solid ${active === idx ? d.accent : '#e5e7eb'}`, borderRadius: 14, padding: '20px 22px', background: active === idx ? '#fff' : 'transparent', transition: 'all 0.25s', boxShadow: active === idx ? '0 4px 20px rgba(196,30,58,0.1)' : 'none' }}>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: active === idx ? 12 : 0 }}>
                    <div>
                      <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: active === idx ? d.accent : d.dim }}>{p.tag}</span>
                      <h3 style={{ fontSize: 17, fontWeight: 700, color: d.text, margin: '3px 0 0' }}>{p.title}</h3>
                      <p style={{ fontSize: 12, color: d.dim, margin: '2px 0 0' }}>{p.subtitle}</p>
                    </div>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: active === idx ? d.accent : '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s', flexShrink: 0 }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d={active === idx ? 'M2 6h8' : 'M6 2v8M2 6h8'} stroke={active === idx ? '#fff' : d.dim} strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </div>
                  </div>

                  {active === idx && (
                    <>
                      <p style={{ fontSize: 13, color: d.dim, lineHeight: 1.6, marginBottom: 14 }}>{p.intro}</p>
                      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
                        {p.bullets.map((b, bi) => (
                          <li key={bi} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: d.text }}>
                            <span style={{ width: 6, height: 6, borderRadius: '50%', background: d.accent, marginTop: 5, flexShrink: 0 }} />
                            {b}
                          </li>
                        ))}
                      </ul>

                      {/* Specs grid */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 16px', background: d.alt, borderRadius: 10, padding: '12px 14px', marginBottom: 16 }}>
                        {p.specs.map(s => (
                          <div key={s.key}>
                            <span style={{ fontSize: 10, fontWeight: 600, color: d.dim, textTransform: 'uppercase', letterSpacing: 0.5 }}>{s.key}</span>
                            <p style={{ fontSize: 12, color: d.text, margin: '2px 0 0', fontWeight: 500 }}>{s.value}</p>
                          </div>
                        ))}
                      </div>

                      <a href={`/deli/${p.slug}`}
                         style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: d.accent, textDecoration: 'none', letterSpacing: 0.3 }}
                         onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.7'; }}
                         onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1'; }}>
                        View Full Product
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </a>
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
        <div className="dl-comm-inner"
             style={{ maxWidth: 1140, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 420px', gap: 60, alignItems: 'center' }}>

          <div className="dl-reveal">
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 700, marginBottom: 20, color: '#fff', lineHeight: 1.2 }}>
              Deli Printer Solutions
            </h2>
            <p style={{ fontSize: 15, color: '#cbd5e1', lineHeight: 1.7 }}>
              From compact wireless printers to high-throughput all-in-one MFPs — Deli laser printers deliver reliable monochrome performance, low running costs, and seamless app-based control for modern office environments across UAE &amp; MEA.
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
                  <option value="" style={{ background: '#fff', color: '#000' }}>Select Product Category</option>
                  {['M1820W MFP', 'M3100ADNW Pro', 'P1820W'].map(o => (
                    <option key={o} style={{ background: '#fff', color: '#000' }}>{o}</option>
                  ))}
                </select>
                {formState === 'error' && <p style={{ fontSize: 12, color: '#fca5a5' }}>Something went wrong. Please try again.</p>}
                <button type="submit" disabled={formState === 'sending'}
                        style={{ marginTop: 10, padding: 13, background: d.accent, color: '#fff', fontWeight: 600, border: 'none', borderRadius: 6, cursor: formState === 'sending' ? 'not-allowed' : 'pointer', letterSpacing: 1, fontSize: 13, opacity: formState === 'sending' ? 0.7 : 1, transition: 'opacity 0.2s', fontFamily: 'var(--font-poppins)' }}>
                  {formState === 'sending' ? 'Sending…' : 'Submit Enquiry'}
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
        /* ── Animations ── */
        @keyframes dlPulse { 0%,100%{ opacity:1; transform:scale(1); } 50%{ opacity:.5; transform:scale(.8); } }

        /* ── Scroll reveal ── */
        .dl-reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.65s cubic-bezier(0.22,1,0.36,1), transform 0.65s cubic-bezier(0.22,1,0.36,1); }
        .dl-reveal.dl-visible { opacity: 1; transform: translateY(0); }

        /* ── Hero ── */
        .ka-hero { height: 680px; }

        /* ── Enquiry grid ── */
        .dl-comm-inner { grid-template-columns: 1fr 420px; }

        /* ── Tablet 1024px ── */
        @media (max-width: 1024px) {
          .dl-printer-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .dl-comm-inner   { grid-template-columns: 1fr !important; gap: 40px !important; }
        }

        /* ── Tablet 768px ── */
        @media (max-width: 768px) {
          .ka-hero { height: 460px !important; }
          .ka-slide { align-items: flex-end !important; padding-bottom: 72px !important; }
          .ka-hero-container { padding: 0 24px !important; }
          .ka-hero-content  { max-width: 100% !important; }
          .ka-vignette { background: linear-gradient(180deg, transparent 10%, rgba(0,0,0,0.85) 70%) !important; }
          .ka-dots { left: 24px !important; transform: none !important; bottom: 22px !important; }
          .dl-printer-grid { grid-template-columns: 1fr !important; }
        }

        /* ── Mobile 480px ── */
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
