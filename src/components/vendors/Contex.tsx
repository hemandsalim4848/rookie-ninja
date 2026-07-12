'use client';

import { useState, useEffect, useRef } from 'react';
import { cld } from '@/src/lib/cloudinaryUrl';

const c = {
  accent: '#f94e58',
  bg:     '#ffffff',
  alt:    '#f8fafc',
  text:   '#0f1320',
  dim:    '#6b7280',
  line:   'rgba(0,0,0,0.08)',
};

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */
interface DbProduct {
  name:             string;
  slug:             string;
  images:           string[];
  shortDescription: string;
  description:      string;
  specs:            { key: string; value: string }[];
  tags:             string[];
  category:         string;
}

/* The three product slugs we want to show, in nav order */
const SLUGS = ['contex-sd-one-x', 'contex-hd-apeiron-42', 'contex-iq-flex'];

const NAV_LABELS: Record<string, string> = {
  'contex-sd-one-x':      'SD One X',
  'contex-hd-apeiron-42': 'HD Apeiron/42',
  'contex-iq-flex':       'IQ FLEX',
};

const SUBTITLES: Record<string, string> = {
  'contex-sd-one-x':      'Compact Entry-Level Wide Format Scanner',
  'contex-hd-apeiron-42': 'Contact-Free Large Format Art Scanner',
  'contex-iq-flex':       'Flexible Wide Format Scanner',
};

const HERO_SLIDES = [
  {
    id:         'apeiron',
    slug:       'contex-hd-apeiron-42',
    badge:      'Official Distributor',
    lines:      ['Art Scanning.', 'Perfected.'],
    accentLine: 0,
    desc:       "The Contex HD Apeiron/42 is the world's fastest contact-free large format art scanner — FADGI ★★★★ certified, museum-grade TRI-R™ LED lighting with CRI > 98.",
    cta:        { label: 'View HD Apeiron/42', solid: true,  productSlug: 'contex-hd-apeiron-42' },
  },
  {
    id:         'sdone',
    slug:       'contex-sd-one-x',
    badge:      'Wide Format Scanners',
    lines:      ['Compact.', 'Capable.'],
    accentLine: 1,
    desc:       'The Contex SD One X — a lightweight, single-person-portable wide format scanner available in 24", 36", and 44" widths. Purpose-built for maps, engineering drawings, and construction plans.',
    cta:        { label: 'View SD One X', solid: false, productSlug: 'contex-sd-one-x' },
  },
];

/* ─────────────────────────────────────────────
   NAV INNER
───────────────────────────────────────────── */
function CxNavInner({ products, onSelect, active }: { products: DbProduct[]; onSelect: (idx: number) => void; active: number }) {
  return (
    <div style={{ maxWidth: 1140, margin: '0 auto', height: 58, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', gap: 20 }}>
      <ul style={{ display: 'flex', alignItems: 'center', flex: 1, gap: 32, listStyle: 'none', margin: 0, padding: 0, overflowX: 'auto', scrollbarWidth: 'none' }}>
        {products.map((p, idx) => (
          <li key={p.slug} style={{ flexShrink: 0 }}>
            <a href="#scanners"
               onClick={e => { e.preventDefault(); onSelect(idx); document.getElementById('scanners')?.scrollIntoView({ behavior: 'smooth' }); }}
               style={{ fontSize: 14, fontWeight: 500, color: active === idx ? c.accent : '#111', textDecoration: 'none', whiteSpace: 'nowrap', position: 'relative', paddingBottom: 3, transition: 'color 0.2s', cursor: 'pointer' }}
               onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = c.accent; (el.querySelector('.cx-ul') as HTMLElement | null)?.style.setProperty('width', '100%'); }}
               onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = active === idx ? c.accent : '#111'; (el.querySelector('.cx-ul') as HTMLElement | null)?.style.setProperty('width', active === idx ? '100%' : '0'); }}>
              {NAV_LABELS[p.slug] || p.name}
              <span className="cx-ul" style={{ position: 'absolute', bottom: 0, left: 0, width: active === idx ? '100%' : '0', height: 2, background: c.accent, borderRadius: 2, transition: 'width 0.25s ease' }} />
            </a>
          </li>
        ))}
      </ul>
      <a href="#enquire"
         style={{ flexShrink: 0, padding: '11px 26px', background: c.accent, color: '#fff', fontSize: 14, fontWeight: 600, textDecoration: 'none', borderRadius: 50, whiteSpace: 'nowrap', transition: 'transform 0.15s' }}
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
export default function ContexPage() {
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

  const [products, setProducts] = useState<DbProduct[]>([]);
  const [heroBgs, setHeroBgs]   = useState<string[]>(['', '']);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    fetch('/api/products?brand=contex')
      .then(r => r.json())
      .then((all: DbProduct[]) => {
        if (!Array.isArray(all)) return;
        /* keep only the three we want, in defined order */
        const map = Object.fromEntries(all.map(p => [p.slug, p]));
        const ordered = SLUGS.map(s => map[s]).filter(Boolean) as DbProduct[];
        setProducts(ordered);
        /* hero backgrounds: slide 0 = apeiron, slide 1 = sd-one-x */
        setHeroBgs([
          map['contex-hd-apeiron-42']?.images?.[0] || '',
          map['contex-sd-one-x']?.images?.[0]      || '',
        ]);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
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
      else { setHeroIdx(i => (i + 1) % HERO_SLIDES.length); startRef.current = null; rafRef.current = requestAnimationFrame(tick); }
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
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('cx-visible'); obs.unobserve(e.target); } }),
      { threshold: 0.08 }
    );
    document.querySelectorAll('.cx-reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [products]);

  /* ── Product switcher ── */
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

  const activePrinter = products[active];
  const activeImages  = activePrinter?.images || [];

  /* bullets derived from shortDescription lines */
  function getBullets(p: DbProduct): string[] {
    if (!p.shortDescription) return [];
    return p.shortDescription.split('\n').filter(Boolean);
  }

  return (
    <main style={{ background: c.bg, color: c.text, fontFamily: 'var(--font-poppins)', overflowX: 'hidden' }}>

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section ref={heroRef} className="ka-hero" style={{ position: 'relative', width: '100%', overflow: 'hidden', background: '#000' }}>
        {HERO_SLIDES.map((s, i) => (
          <div key={s.id} className="ka-slide"
               style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', opacity: i === heroIdx ? 1 : 0, transition: 'opacity 0.9s cubic-bezier(0.77,0,0.175,1)', zIndex: i === heroIdx ? 2 : 1 }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: heroBgs[i] ? `url('${cld(heroBgs[i])}')` : undefined, backgroundSize: 'cover', backgroundPosition: 'center', transform: i === heroIdx ? 'scale(1)' : 'scale(1.06)', transition: 'transform 6s ease', filter: 'brightness(0.35)' }} />
            <div className="ka-vignette" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(0,0,0,0.75) 38%, transparent 80%)' }} />
            <div className="ka-hero-container" style={{ position: 'relative', zIndex: 3, width: '100%', maxWidth: 1140, margin: '0 auto', padding: '0 20px' }}>
              <div className="ka-hero-content" style={{ maxWidth: 560, opacity: i === heroIdx ? 1 : 0, transform: i === heroIdx ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 0.7s ease 0.4s, transform 0.7s ease 0.4s' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: c.accent, color: '#fff', fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', padding: '5px 12px', marginBottom: 18, borderRadius: 2 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff', opacity: 0.9, display: 'inline-block', animation: 'cxPulse 2s infinite' }} />
                  {s.badge}
                </span>
                <h1 style={{ fontSize: 'clamp(40px, 6vw, 78px)', color: '#fff', lineHeight: 0.95, marginBottom: 18, fontWeight: 700, letterSpacing: 1 }}>
                  {s.lines.map((line, li) => (
                    <span key={li} style={{ display: 'block', color: li === s.accentLine ? c.accent : '#fff' }}>{line}</span>
                  ))}
                </h1>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.72)', lineHeight: 1.65, marginBottom: 32, fontWeight: 300, maxWidth: 420 }}>{s.desc}</p>
                <a href="#scanners"
                   onClick={e => {
                     e.preventDefault();
                     const idx = SLUGS.indexOf(s.cta.productSlug);
                     if (idx !== -1) switchProduct(idx);
                     document.getElementById('scanners')?.scrollIntoView({ behavior: 'smooth' });
                   }}
                   style={{ display: 'inline-block', padding: '13px 28px', background: s.cta.solid ? '#fff' : 'transparent', color: s.cta.solid ? '#0d0d0d' : '#fff', border: '2px solid #fff', fontSize: 13, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', textDecoration: 'none', borderRadius: 2, transition: 'background 0.25s, color 0.25s, border-color 0.25s' }}
                   onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = c.accent; el.style.borderColor = c.accent; el.style.color = '#fff'; }}
                   onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = s.cta.solid ? '#fff' : 'transparent'; el.style.borderColor = '#fff'; el.style.color = s.cta.solid ? '#0d0d0d' : '#fff'; }}>
                  {s.cta.label}
                </a>
              </div>
            </div>
          </div>
        ))}

        {/* Dots */}
        <div style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(calc(-570px + 20px))', display: 'flex', gap: 10, zIndex: 10 }}>
          {HERO_SLIDES.map((_, i) => (
            <button key={i} onClick={() => goSlide(i)}
                    style={{ width: 10, height: 10, borderRadius: '50%', padding: 0, border: 'none', cursor: 'pointer', background: i === heroIdx ? c.accent : 'rgba(255,255,255,0.35)', transform: i === heroIdx ? 'scale(1.3)' : 'scale(1)', transition: 'background 0.3s, transform 0.3s' }} />
          ))}
        </div>

        {/* Progress bar */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, height: 3, background: c.accent, width: `${progress}%`, zIndex: 10, transition: 'width 0.1s linear' }} />
      </section>

      {/* ══════════════════════════════════════════
          STICKY NAV
      ══════════════════════════════════════════ */}
      <div style={{ width: '100%', background: '#fff', borderBottom: `1px solid ${c.line}`, visibility: isSticky ? 'hidden' : 'visible' }}>
        <CxNavInner products={products} onSelect={switchProduct} active={active} />
      </div>
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1001, background: '#fff', borderBottom: `1px solid ${c.line}`, boxShadow: '0 2px 20px rgba(0,0,0,0.12)', transform: isSticky ? 'translateY(0)' : 'translateY(-100%)', transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)' }}>
        <CxNavInner products={products} onSelect={switchProduct} active={active} />
      </div>

      {/* ══════════════════════════════════════════
          SCANNERS — IMAGE SWITCHER
      ══════════════════════════════════════════ */}
      <section id="scanners" style={{ width: '100%', padding: '80px 20px', background: c.alt }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>

          <div className="cx-reveal" style={{ marginBottom: 52, textAlign: 'center' }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: c.accent }}>Wide Format Scanners</span>
            <h2 style={{ fontSize: 'clamp(26px,4vw,40px)', fontWeight: 700, color: c.text, marginTop: 8, marginBottom: 12 }}>Contex Scanner Range</h2>
            <p style={{ fontSize: 15, color: c.dim, maxWidth: 540, margin: '0 auto', lineHeight: 1.6 }}>
              From compact portable scanners to museum-grade contact-free art digitisers — Contex wide format scanners set the standard for precision and reliability.
            </p>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: c.dim, fontSize: 14 }}>Loading products…</div>
          ) : (
            <div className="cx-printer-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>

              {/* Left — image */}
              <div className="cx-reveal" style={{ position: 'relative' }}>
                <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 32px rgba(0,0,0,0.08)', aspectRatio: '4 / 3', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
                  {activeImages[activeThumb] ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={cld(activeImages[activeThumb])}
                      alt={activePrinter?.name}
                      onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                      style={{ width: '100%', height: '100%', objectFit: 'contain', opacity: imgFade ? 0 : 1, transition: 'opacity 0.28s ease' }}
                    />
                  ) : (
                    <div style={{ width: '100%', height: '100%', background: '#f1f5f9', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.dim, fontSize: 13 }}>No image available</div>
                  )}
                </div>

                {activeImages.length > 1 && (
                  <div style={{ display: 'flex', gap: 8, marginTop: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                    {activeImages.slice(0, 5).map((img, idx) => (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img key={idx} src={cld(img)} alt="" onClick={() => switchThumb(idx)}
                           onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                           style={{ width: 52, height: 52, objectFit: 'contain', borderRadius: 8, background: '#fff', border: `2px solid ${idx === activeThumb ? c.accent : '#e5e7eb'}`, padding: 4, cursor: 'pointer', transition: 'border-color 0.2s' }}
                           onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.borderColor = c.accent; }}
                           onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.borderColor = idx === activeThumb ? c.accent : '#e5e7eb'; }} />
                    ))}
                  </div>
                )}
              </div>

              {/* Right — product list */}
              <div className="cx-reveal" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {products.map((p, idx) => {
                  const bullets = getBullets(p);
                  return (
                    <div key={p.slug}
                         onClick={() => switchProduct(idx)}
                         style={{ cursor: 'pointer', border: `1.5px solid ${active === idx ? c.accent : '#e5e7eb'}`, borderRadius: 14, padding: '20px 22px', background: active === idx ? '#fff' : 'transparent', transition: 'all 0.25s', boxShadow: active === idx ? '0 4px 20px rgba(249,78,88,0.1)' : 'none' }}>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: active === idx ? 12 : 0 }}>
                        <div>
                          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: active === idx ? c.accent : c.dim }}>{p.category || 'Wide Format Scanner'}</span>
                          <h3 style={{ fontSize: 17, fontWeight: 700, color: c.text, margin: '3px 0 0' }}>{p.name}</h3>
                          <p style={{ fontSize: 12, color: c.dim, margin: '2px 0 0' }}>{SUBTITLES[p.slug] || p.category}</p>
                        </div>
                        <div style={{ width: 28, height: 28, borderRadius: '50%', background: active === idx ? c.accent : '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s', flexShrink: 0 }}>
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d={active === idx ? 'M2 6h8' : 'M6 2v8M2 6h8'} stroke={active === idx ? '#fff' : c.dim} strokeWidth="1.5" strokeLinecap="round"/>
                          </svg>
                        </div>
                      </div>

                      {active === idx && (
                        <>
                          <p style={{ fontSize: 13, color: c.dim, lineHeight: 1.6, marginBottom: 14 }}>{p.description?.slice(0, 260)}{p.description?.length > 260 ? '…' : ''}</p>
                          {bullets.length > 0 && (
                            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
                              {bullets.map((b, bi) => (
                                <li key={bi} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: c.text }}>
                                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: c.accent, marginTop: 5, flexShrink: 0 }} />
                                  {b}
                                </li>
                              ))}
                            </ul>
                          )}

                          {p.specs?.length > 0 && (
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 16px', background: c.alt, borderRadius: 10, padding: '12px 14px', marginBottom: 16 }}>
                              {p.specs.map(s => (
                                <div key={s.key}>
                                  <span style={{ fontSize: 10, fontWeight: 600, color: c.dim, textTransform: 'uppercase', letterSpacing: 0.5 }}>{s.key}</span>
                                  <p style={{ fontSize: 12, color: c.text, margin: '2px 0 0', fontWeight: 500 }}>{s.value}</p>
                                </div>
                              ))}
                            </div>
                          )}

                          <a href={`/contex/${p.slug}`}
                             style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: c.accent, textDecoration: 'none', letterSpacing: 0.3 }}
                             onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.7'; }}
                             onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1'; }}>
                            View Full Product
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          </a>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ENQUIRY FORM — DARK
      ══════════════════════════════════════════ */}
      <section id="enquire" style={{ width: '100%', background: 'linear-gradient(90deg, #0b1a2e, #0d223d)', padding: '80px 20px', color: '#fff' }}>
        <div className="cx-comm-inner"
             style={{ maxWidth: 1140, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 420px', gap: 60, alignItems: 'center' }}>

          <div className="cx-reveal">
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 700, marginBottom: 20, color: '#fff', lineHeight: 1.2 }}>
              Contex Scanner Solutions
            </h2>
            <p style={{ fontSize: 15, color: '#cbd5e1', lineHeight: 1.7 }}>
              From compact single-operator scanners to museum-grade contact-free digitisers — Contex wide format scanners deliver industry-leading accuracy, FADGI compliance, and unmatched versatility for engineering, GIS, reprographics, and fine art archiving across UAE &amp; MEA.
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
                  {products.map(p => (
                    <option key={p.slug} style={{ background: '#fff', color: '#000' }}>{p.name}</option>
                  ))}
                </select>
                {formState === 'error' && <p style={{ fontSize: 12, color: '#fca5a5' }}>Something went wrong. Please try again.</p>}
                <button type="submit" disabled={formState === 'sending'}
                        style={{ marginTop: 10, padding: 13, background: c.accent, color: '#fff', fontWeight: 600, border: 'none', borderRadius: 6, cursor: formState === 'sending' ? 'not-allowed' : 'pointer', letterSpacing: 1, fontSize: 13, opacity: formState === 'sending' ? 0.7 : 1, transition: 'opacity 0.2s', fontFamily: 'var(--font-poppins)' }}>
                  {formState === 'sending' ? 'Sending…' : 'SEND INQUIRY'}
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
        @keyframes cxPulse { 0%,100%{ opacity:1; transform:scale(1); } 50%{ opacity:.5; transform:scale(.8); } }

        .cx-reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.65s cubic-bezier(0.22,1,0.36,1), transform 0.65s cubic-bezier(0.22,1,0.36,1); }
        .cx-reveal.cx-visible { opacity: 1; transform: translateY(0); }

        .ka-hero { height: 680px; }
        .cx-comm-inner { grid-template-columns: 1fr 420px; }

        @media (max-width: 1024px) {
          .cx-printer-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .cx-comm-inner   { grid-template-columns: 1fr !important; gap: 40px !important; }
        }

        @media (max-width: 768px) {
          .ka-hero { height: 460px !important; }
          .ka-slide { align-items: flex-end !important; padding-bottom: 72px !important; }
          .ka-hero-container { padding: 0 24px !important; }
          .ka-hero-content   { max-width: 100% !important; }
          .ka-vignette { background: linear-gradient(180deg, transparent 10%, rgba(0,0,0,0.85) 70%) !important; }
        }

        @media (max-width: 480px) {
          .ka-hero { height: 540px !important; }
        }
      `}</style>
    </main>
  );
}
