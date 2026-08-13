'use client';

import { useState, useEffect, useRef } from 'react';
import { cld } from '@/src/lib/cloudinaryUrl';
import Link from 'next/link';
import { BRAND_LOGOS } from '@/src/lib/brandLogos';

const d = {
  accent: '#E31837',
  bg:     '#ffffff',
  alt:    '#f8fafc',
  text:   '#0f1320',
  dim:    '#6b7280',
  line:   'rgba(0,0,0,0.08)',
};

/* ─────────────────────────────────────────────
   SERIES CONFIG
───────────────────────────────────────────── */
const CONFERENCE_SERIES = [
  {
    id:       'mc420',
    tag:      'Standard Series',
    title:    'MC420 – Standard Series',
    intro:    'The Dahua MC420 Standard Series delivers professional-grade interactive flat panel displays for modern conference rooms — featuring built-in DeepHub Meeting software, 4K UHD display, wireless screen sharing, and a 90% NTSC gamut screen.',
    bullets:  [
      'Built-in DeepHub Meeting software',
      '4K UHD display — 90% NTSC high gamut screen',
      '2.0-channel 40W audio',
      'Split screen and wireless screen sharing',
      'Handwriting recognition',
      'Available in 65", 75" and 86"',
    ],
    sizes: [
      { label: '65"', slug: 'dahua-lph65-mc420-c-s2' },
      { label: '75"', slug: 'dahua-lph75-mc420-c-s2' },
      { label: '86"', slug: 'dahua-lph86-mc420-c-s2' },
    ],
  },
  {
    id:       'mc470p',
    tag:      'PRO Series',
    title:    'MC470-P – PRO Series',
    intro:    'The Dahua MC470-P PRO Series elevates conference room collaboration with premium features — enhanced processing power, superior touch accuracy, and advanced DeepHub Meeting Pro capabilities for demanding enterprise environments.',
    bullets:  [
      'DeepHub Meeting Pro software',
      '4K UHD — enhanced 8ms touch response',
      '20-point precision touch',
      'Built-in AI noise cancellation',
      'Dual front-facing cameras',
      'Available in 65", 75", 86" and 98"',
    ],
    sizes: [
      { label: '65"', slug: 'dahua-lph65-mc470-p-s2' },
      { label: '75"', slug: 'dahua-lph75-mc470-p-s2' },
      { label: '86"', slug: 'dahua-lph86-mc470-p-s2' },
      { label: '98"', slug: 'dahua-lph98-mc470-p-s2' },
    ],
  },
];

const EDUCATION_SERIES = [
  {
    id:      'st420',
    num:     '01',
    tag:     'Education Series',
    title:   'ST420 Series',
    navTitle: 'ST420 – Interactive Whiteboard',
    desc:    'Smart interactive whiteboards built for education — combining intuitive annotation tools, multi-touch precision, and seamless lesson delivery for classrooms of all sizes.',
    bullets: [
      'Designed for K-12 and higher education',
      '4K UHD display — 20-point touch',
      'Built-in Android OS — no PC required',
      'Wireless screen sharing for students',
      'Compatible with major classroom software',
      'Available in 65", 75" and 86"',
    ],
    sizes: [
      { label: '65"', slug: 'dahua-lph65-st420-s3' },
      { label: '75"', slug: 'dahua-lph75-st420-s3' },
      { label: '86"', slug: 'dahua-lph86-st420-s3' },
    ],
  },
];

const heroBanner = {
  lines: ['Smart.', 'Interactive.'],
  accentLine: 0,
  desc: 'The Dahua MC420 and MC470-P PRO Series deliver next-generation interactive flat panels for modern conference rooms — with built-in DeepHub Meeting software, 4K UHD displays, and seamless wireless collaboration.',
  cta: { label: 'View Conference Series', href: '#conference', solid: true },
  bg: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1786643044/dahua-banner_btaawj.webp',
};

const DH_NAV = [
  { label: 'Conference Series', href: '#conference' },
  { label: 'Education Series',  href: '#education' },
];

/* ─────────────────────────────────────────────
   NAV INNER
───────────────────────────────────────────── */
function DhNavInner() {
  return (
    <div style={{ maxWidth: 1140, margin: '0 auto', height: 58, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', gap: 20 }}>
      <ul style={{ display: 'flex', alignItems: 'center', flex: 1, gap: 36, listStyle: 'none', margin: 0, padding: 0, overflowX: 'auto', scrollbarWidth: 'none' }}>
        {DH_NAV.map(link => (
          <li key={link.href} style={{ flexShrink: 0 }}>
            <a href={link.href}
               style={{ fontSize: 14, fontWeight: 500, color: '#111', textDecoration: 'none', whiteSpace: 'nowrap', position: 'relative', paddingBottom: 3, transition: 'color 0.2s' }}
               onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = d.accent; (el.querySelector('.dh-ul') as HTMLElement | null)?.style.setProperty('width', '100%'); }}
               onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = '#111'; (el.querySelector('.dh-ul') as HTMLElement | null)?.style.setProperty('width', '0'); }}>
              {link.label}
              <span className="dh-ul" style={{ position: 'absolute', bottom: 0, left: 0, width: 0, height: 2, background: d.accent, borderRadius: 2, transition: 'width 0.25s ease' }} />
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
export default function DahuaPage() {
  const heroRef                 = useRef<HTMLElement>(null);

  const [isSticky, setIsSticky]             = useState(false);
  const [activeSeries, setActiveSeries]     = useState(0);
  const [activeSize, setActiveSize]         = useState<Record<string, number>>({ mc420: 0, mc470p: 0, st420: 0 });
  const [imgFade, setImgFade]               = useState(false);
  const [formState, setFormState]           = useState<'idle'|'sending'|'success'|'error'>('idle');

  /* images from API keyed by slug */
  const [imgs, setImgs] = useState<Record<string, string[]>>({});

  useEffect(() => {
    fetch('/api/products?brand=dahua')
      .then(r => r.json())
      .then((all: any[]) => {
        if (!Array.isArray(all)) return;
        const map: Record<string, string[]> = {};
        all.forEach(p => { if (p.slug) map[p.slug] = p.images || []; });
        setImgs(map);
      })
      .catch(() => {});
  }, []);

  /* resolve current image for a series + size */
  function getImg(series: typeof CONFERENCE_SERIES[0] | typeof EDUCATION_SERIES[0]): string {
    const sizeIdx = activeSize[series.id] ?? 0;
    const slug    = series.sizes[sizeIdx]?.slug || '';
    return cld(imgs[slug]?.[0]) || '';
  }

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
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('dh-visible'); obs.unobserve(e.target); } }),
      { threshold: 0.08 }
    );
    document.querySelectorAll('.dh-reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [imgs]);

  /* ── Image fade when switching series or size ── */
  function switchSeries(idx: number) {
    if (idx === activeSeries) return;
    setImgFade(true);
    setTimeout(() => { setActiveSeries(idx); setImgFade(false); }, 280);
  }

  function switchSize(seriesId: string, sizeIdx: number) {
    setImgFade(true);
    setTimeout(() => { setActiveSize(prev => ({ ...prev, [seriesId]: sizeIdx })); setImgFade(false); }, 180);
  }

  /* ── Form ── */
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setFormState('sending');
    try {
      const res = await fetch('/api/vendor-quote', { method: 'POST', body: new FormData(e.currentTarget), headers: { Accept: 'application/json' } });
      if (res.ok) { setFormState('success'); (e.currentTarget as HTMLFormElement).reset(); }
      else setFormState('error');
    } catch { setFormState('error'); }
  }

  const activeCseries = CONFERENCE_SERIES[activeSeries];

  return (
    <main style={{ background: d.bg, color: d.text, fontFamily: 'var(--font-poppins)', overflowX: 'hidden' }}>

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section ref={heroRef} className="dh-hero" style={{ position: 'relative', width: '100%', overflow: 'hidden', background: '#000', display: 'flex', alignItems: 'center' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url('${heroBanner.bg}')`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          filter: 'brightness(0.75)',
        }} />
        <div className="dh-vignette" style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(90deg, rgba(0,0,0,0.32) 38%, transparent 80%)',
        }} />
        <div className="dh-hero-container"
             style={{ position: 'relative', zIndex: 3, width: '100%', maxWidth: 1140, margin: '0 auto', padding: '0 20px' }}>
          <div className="dh-hero-content" style={{ maxWidth: 560 }}>
            <img src={BRAND_LOGOS.dahua} alt="Dahua" className="dh-hero-logo"
                 style={{ height: 34, width: 'auto', maxWidth: '100%', display: 'block', marginBottom: 28, objectFit: 'contain' }} />
            <h1 className="dh-hero-heading"
                style={{ fontSize: 'clamp(30px, 4.5vw, 58px)', color: '#fff', lineHeight: 0.95, marginBottom: 18, fontWeight: 700, letterSpacing: 1 }}>
              {heroBanner.lines.map((line, li) => (
                <span key={li} style={{ display: 'block', color: li === heroBanner.accentLine ? d.accent : '#fff' }}>{line}</span>
              ))}
            </h1>
            <p className="dh-hero-desc"
               style={{ fontSize: 15, color: 'rgba(255,255,255,0.72)', lineHeight: 1.65, marginBottom: 32, fontWeight: 300, maxWidth: 420 }}>
              {heroBanner.desc}
            </p>
            <a href={heroBanner.cta.href} className="dh-hero-btn"
               style={{
                 display: 'inline-block', padding: '13px 28px',
                 background: heroBanner.cta.solid ? '#fff' : 'transparent',
                 color: heroBanner.cta.solid ? '#0d0d0d' : '#fff',
                 border: '2px solid #fff',
                 fontSize: 13, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase',
                 textDecoration: 'none', borderRadius: 2,
                 transition: 'background 0.25s, color 0.25s, border-color 0.25s',
               }}
               onMouseEnter={e => {
                 const el = e.currentTarget as HTMLAnchorElement;
                 el.style.background = d.accent; el.style.borderColor = d.accent; el.style.color = '#fff';
               }}
               onMouseLeave={e => {
                 const el = e.currentTarget as HTMLAnchorElement;
                 el.style.background = heroBanner.cta.solid ? '#fff' : 'transparent';
                 el.style.borderColor = '#fff';
                 el.style.color = heroBanner.cta.solid ? '#0d0d0d' : '#fff';
               }}>
              {heroBanner.cta.label}
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          STICKY NAV
      ══════════════════════════════════════════ */}
      <div style={{ width: '100%', background: '#fff', borderBottom: `1px solid ${d.line}`, visibility: isSticky ? 'hidden' : 'visible' }}>
        <DhNavInner />
      </div>
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1001, background: '#fff', borderBottom: `1px solid ${d.line}`, boxShadow: '0 2px 20px rgba(0,0,0,0.12)', transform: isSticky ? 'translateY(0)' : 'translateY(-100%)', transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)' }}>
        <DhNavInner />
      </div>

      {/* ══════════════════════════════════════════
          CONFERENCE SERIES — OVERVIEW CARDS
      ══════════════════════════════════════════ */}
      <section id="conference" style={{ width: '100%', background: d.alt, padding: '72px 20px' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div className="dh-reveal" style={{ textAlign: 'center', marginBottom: 48 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: d.accent }}>Interactive Displays</span>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700, color: d.text, marginTop: 8, marginBottom: 12 }}>Conference Series</h2>
            <p style={{ fontSize: 15, color: d.dim, maxWidth: 540, margin: '0 auto', lineHeight: 1.65 }}>
              Dahua DeepHub smart interactive flat panels — engineered for seamless collaboration, crystal-clear 4K visuals, and intelligent meeting experiences.
            </p>
          </div>

          <div className="dh-card-grid dh-reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            {CONFERENCE_SERIES.map((series, i) => {
              const img = getImg(series);
              return (
                <div key={series.id}
                     style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', overflow: 'hidden', boxShadow: '0 2px 16px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', transition: 'box-shadow 0.3s ease, transform 0.3s ease' }}
                     onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = '0 8px 32px rgba(0,0,0,0.12)'; }}
                     onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(0)'; el.style.boxShadow = '0 2px 16px rgba(0,0,0,0.06)'; }}>
                  <div style={{ width: '100%', height: 220, background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #f1f5f9' }}>
                    {img
                      ? /* eslint-disable-next-line @next/next/no-img-element */
                        <img src={img} alt={series.title} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 24 }} />
                      : <div style={{ color: d.dim, fontSize: 13 }}>Loading…</div>
                    }
                  </div>
                  <div style={{ padding: '24px 24px 28px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: d.accent, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 8 }}>{series.tag}</p>
                    <h3 style={{ fontSize: 17, fontWeight: 700, color: d.text, marginBottom: 10, lineHeight: 1.3 }}>{series.title}</h3>
                    <p style={{ fontSize: 13.5, color: d.dim, lineHeight: 1.65, marginBottom: 16 }}>{series.intro}</p>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 7, flex: 1 }}>
                      {series.bullets.map((b, j) => (
                        <li key={j} style={{ fontSize: 13, fontWeight: 500, color: '#374151', paddingLeft: 16, position: 'relative', lineHeight: 1.4 }}>
                          <span style={{ position: 'absolute', left: 0, top: 6, width: 6, height: 6, borderRadius: '50%', background: d.accent }} />
                          {b}
                        </li>
                      ))}
                    </ul>
                    {/* Size chips */}
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 20 }}>
                      {series.sizes.map((sz, si) => (
                        <Link key={sz.slug} href={`/products/${sz.slug}`}
                           style={{ fontSize: 12, fontWeight: 600, padding: '5px 14px', borderRadius: 4, border: `1.5px solid ${d.accent}`, color: d.accent, textDecoration: 'none', background: '#fff', transition: 'all 0.2s' }}
                           onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = d.accent; el.style.color = '#fff'; }}
                           onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = '#fff'; el.style.color = d.accent; }}>
                          {sz.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CONFERENCE — IMAGE SWITCHER DETAIL
      ══════════════════════════════════════════ */}
      <section style={{ width: '100%', background: '#fff', padding: '80px 20px' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div className="dh-reveal" style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 700, color: d.text, marginBottom: 10 }}>DeepHub Conference Displays</h2>
            <p style={{ fontSize: 15, color: d.dim, maxWidth: 600, lineHeight: 1.7 }}>Compare the Standard and PRO conference series — select a size to preview each model.</p>
          </div>

          <div className="dh-scanner-layout dh-reveal" style={{ display: 'flex', gap: 60, alignItems: 'center', minHeight: 480 }}>

            {/* Left — series list */}
            <div className="dh-scanner-items" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
              {CONFERENCE_SERIES.map((series, idx) => (
                <div key={series.id} onClick={() => switchSeries(idx)}
                     style={{ cursor: 'pointer', padding: '22px 24px', borderRadius: 16, border: activeSeries === idx ? '1px solid #e2e8f0' : '1px solid transparent', background: activeSeries === idx ? '#fff' : 'transparent', boxShadow: activeSeries === idx ? '0 10px 25px -5px rgba(0,0,0,0.05)' : 'none', transition: 'all 0.3s ease' }}
                     onMouseEnter={e => { if (activeSeries !== idx) (e.currentTarget as HTMLDivElement).style.background = '#f8fafc'; }}
                     onMouseLeave={e => { if (activeSeries !== idx) (e.currentTarget as HTMLDivElement).style.background = 'transparent'; }}>
                  <p style={{ color: d.accent, fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 700, marginBottom: 6 }}>{series.tag}</p>
                  <h3 style={{ fontSize: 20, fontWeight: 600, color: d.text, marginBottom: 8 }}>{series.title}</h3>
                  <p style={{ fontSize: 14, color: d.dim, lineHeight: 1.65, margin: 0 }}>{series.intro}</p>
                  {activeSeries === idx && (
                    <>
                      <ul style={{ marginTop: 12, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>
                        {series.bullets.map(b => (
                          <li key={b} style={{ fontSize: 13, color: '#475569', lineHeight: 1.8, display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ width: 5, height: 5, borderRadius: '50%', background: d.accent, flexShrink: 0, display: 'inline-block' }} />
                            {b}
                          </li>
                        ))}
                      </ul>
                      {/* Size selector */}
                      <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
                        {series.sizes.map((sz, si) => (
                          <button key={sz.slug} onClick={e => { e.stopPropagation(); switchSize(series.id, si); }}
                                  style={{ fontSize: 12, fontWeight: 600, padding: '6px 16px', borderRadius: 4, border: `1.5px solid ${activeSize[series.id] === si ? d.accent : '#e5e7eb'}`, background: activeSize[series.id] === si ? d.accent : '#fff', color: activeSize[series.id] === si ? '#fff' : d.dim, cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'var(--font-poppins)' }}>
                            {sz.label}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Right — image */}
            <div className="dh-scanner-img-wrap" style={{ flex: 1.2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
              <div style={{ width: '100%', background: '#f8fafc', borderRadius: 20, border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', aspectRatio: '4/3', overflow: 'hidden', padding: 24 }}>
                {getImg(activeCseries)
                  ? /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={getImg(activeCseries)} alt={activeCseries.title}
                         style={{ width: '100%', height: '100%', objectFit: 'contain', opacity: imgFade ? 0 : 1, transition: 'opacity 0.3s ease' }} />
                  : <div style={{ color: d.dim, fontSize: 13 }}>Loading…</div>
                }
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                {activeCseries.sizes.map((sz, si) => (
                  <Link key={sz.slug} href={`/products/${sz.slug}`}
                     style={{ fontSize: 12, fontWeight: 600, padding: '6px 16px', borderRadius: 4, border: `1.5px solid ${d.accent}`, color: d.accent, textDecoration: 'none', background: '#fff', transition: 'all 0.2s' }}
                     onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = d.accent; el.style.color = '#fff'; }}
                     onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = '#fff'; el.style.color = d.accent; }}>
                    View {sz.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          DARK SECTION + ENQUIRY FORM
      ══════════════════════════════════════════ */}
      <section id="enquire" style={{ width: '100%', background: 'linear-gradient(90deg, #0b1a2e, #0d223d)', padding: '80px 20px', color: '#fff' }}>
        <div className="dh-comm-inner" style={{ maxWidth: 1140, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 420px', gap: 60, alignItems: 'center' }}>
          <div className="dh-reveal">
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 700, marginBottom: 20, color: '#fff', lineHeight: 1.2 }}>Dahua Smart Interactive Displays</h2>
            <p style={{ fontSize: 15, color: '#cbd5e1', lineHeight: 1.7 }}>
              From boardrooms to classrooms — Dahua DeepHub interactive displays deliver 4K UHD clarity, precision multi-touch, and built-in collaboration software for every professional environment across UAE &amp; MEA.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 28 }}>
              {['Official Dahua authorized distributor for UAE & MEA', 'Full product range available — Conference & Education', 'On-site demo and installation support', 'Comprehensive after-sales warranty coverage'].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: '#94a3b8' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: d.accent, flexShrink: 0, marginTop: 5 }} />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.06)', padding: 30, borderRadius: 14, border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)' }}>
            <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 20, color: '#fff' }}>Product Enquiry</h3>
            {formState === 'success' ? (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>✓</div>
                <p style={{ color: '#86efac', fontWeight: 600, fontSize: 15 }}>Inquiry sent successfully!</p>
                <p style={{ color: '#cbd5e1', fontSize: 13, marginTop: 6 }}>We&apos;ll be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <input type="hidden" name="vendor" value="Dahua" />
                <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} />
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
                  {['MC420 Standard Series', 'MC470-P PRO Series', 'ST420 Education Series'].map(o => (
                    <option key={o} style={{ background: '#fff', color: '#000' }}>{o}</option>
                  ))}
                </select>
                {formState === 'error' && <p style={{ fontSize: 12, color: '#fca5a5' }}>Something went wrong. Please try again.</p>}
                <button type="submit" disabled={formState === 'sending'}
                        style={{ marginTop: 10, padding: 13, background: d.accent, color: '#fff', fontWeight: 600, border: 'none', borderRadius: 6, cursor: formState === 'sending' ? 'not-allowed' : 'pointer', letterSpacing: 1, fontSize: 13, opacity: formState === 'sending' ? 0.7 : 1, transition: 'opacity 0.2s', fontFamily: 'var(--font-poppins)' }}>
                  {formState === 'sending' ? 'Sending…' : 'SEND INQUIRY'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          EDUCATION SERIES
      ══════════════════════════════════════════ */}
      <section id="education" style={{ width: '100%', background: d.alt, padding: '80px 20px' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div className="dh-reveal" style={{ marginBottom: 40 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: d.accent }}>Smart Classroom Technology</span>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 700, color: d.text, marginTop: 8, marginBottom: 10 }}>Education Series</h2>
            <p style={{ fontSize: 15, color: d.dim, maxWidth: 560, lineHeight: 1.7 }}>Interactive whiteboards designed for the modern classroom — enabling collaborative, technology-driven learning experiences.</p>
          </div>

          {EDUCATION_SERIES.map(series => {
            const img = getImg(series);
            return (
              <div key={series.id} className="dh-edu-inner dh-reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start', background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: '36px 36px 32px' }}>
                {/* Left — info */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: d.accent, textTransform: 'uppercase', letterSpacing: 1, margin: 0 }}>{series.tag}</p>
                  <h3 style={{ fontSize: 26, fontWeight: 700, color: d.text, margin: 0 }}>{series.title}</h3>
                  <p style={{ fontSize: 14, color: d.dim, lineHeight: 1.75, margin: 0 }}>{series.desc}</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {series.bullets.map(b => (
                      <li key={b} style={{ fontSize: 13, color: '#374151', display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: d.accent, flexShrink: 0, marginTop: 5 }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 4 }}>
                    {series.sizes.map((sz, si) => (
                      <button key={sz.slug} onClick={() => switchSize(series.id, si)}
                              style={{ fontSize: 12, fontWeight: 600, padding: '6px 16px', borderRadius: 4, border: `1.5px solid ${activeSize[series.id] === si ? d.accent : '#e5e7eb'}`, background: activeSize[series.id] === si ? d.accent : '#fff', color: activeSize[series.id] === si ? '#fff' : d.dim, cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'var(--font-poppins)' }}>
                        {sz.label}
                      </button>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {series.sizes.map(sz => (
                      <Link key={sz.slug} href={`/products/${sz.slug}`}
                         style={{ fontSize: 12, fontWeight: 600, padding: '6px 16px', borderRadius: 4, border: `1.5px solid ${d.accent}`, color: d.accent, textDecoration: 'none', background: '#fff', transition: 'all 0.2s' }}
                         onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = d.accent; el.style.color = '#fff'; }}
                         onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = '#fff'; el.style.color = d.accent; }}>
                        View {sz.label}
                      </Link>
                    ))}
                  </div>
                </div>
                {/* Right — image */}
                <div style={{ background: d.alt, borderRadius: 12, border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', aspectRatio: '4/3', overflow: 'hidden', padding: 24 }}>
                  {img
                    ? /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={img} alt={series.title}
                           style={{ width: '100%', height: '100%', objectFit: 'contain', opacity: imgFade ? 0 : 1, transition: 'opacity 0.3s' }} />
                    : <div style={{ color: d.dim, fontSize: 13 }}>Loading…</div>
                  }
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          STYLES
      ══════════════════════════════════════════ */}
      <style>{`
        .dh-reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.65s cubic-bezier(0.22,1,0.36,1), transform 0.65s cubic-bezier(0.22,1,0.36,1); }
        .dh-reveal.dh-visible { opacity: 1; transform: translateY(0); }

        .dh-hero { height: 660px; }
        .dh-comm-inner { grid-template-columns: 1fr 420px; }

        @media (max-width: 1024px) {
          .dh-card-grid     { grid-template-columns: 1fr !important; }
          .dh-comm-inner    { grid-template-columns: 1fr !important; gap: 40px !important; }
          .dh-scanner-layout { flex-direction: column-reverse !important; gap: 32px !important; min-height: unset !important; }
          .dh-edu-inner     { grid-template-columns: 1fr !important; }
        }

        @media (max-width: 768px) {
          .dh-hero { height: auto !important; min-height: 480px !important; align-items: flex-end !important; padding-bottom: 70px !important; }
          .dh-hero-container { padding: 0 24px !important; }
          .dh-hero-content   { max-width: 100% !important; }
          .dh-vignette { background: linear-gradient(180deg, transparent 10%, rgba(0,0,0,0.85) 70%) !important; }
          .dh-scanner-items { gap: 8px !important; }
        }

        @media (max-width: 480px) {
          .dh-hero-content { max-width: 100% !important; }
          .dh-hero-logo { height: 26px !important; }
          .dh-hero-heading { letter-spacing: 0 !important; }
          .dh-hero-desc { font-size: 13px !important; margin-bottom: 20px !important; }
          .dh-hero-btn { padding: 10px 20px !important; font-size: 12px !important; }
        }
      `}</style>
    </main>
  );
}
