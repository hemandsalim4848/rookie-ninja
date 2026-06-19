'use client';

import { useState, useEffect, useRef } from 'react';
import Animate from '@/src/components/Animate';

/* ─────────────────────────────────────────────
   KODAK ALARIS THEME
───────────────────────────────────────────── */
const ka = {
  bg:     '#ffffff',
  alt:    '#fdf8f8',       // warm off-white tinted red
  navy:   '#0A1628',       // Rookie Ninja navy for text
  accent: '#E30613',       // Kodak Alaris red
  accentDark: '#B8000E',
  accentGold: '#FAB617',   // Kodak heritage gold
  line:   'rgba(10,22,40,0.08)',
  text:   '#0A1628',
  dim:    '#6b7280',
  mute:   '#9ca3af',
};

/* ─────────────────────────────────────────────
   HERO SLIDES
───────────────────────────────────────────── */
const heroSlides = [
  {
    id: 'scanners',
    eyebrow: '01 — Document Scanners',
    title: ['Capture every', 'document.', 'Perfectly.'],
    accentLine: 1,
    desc: 'From desktop workgroup scanners to high-speed production systems, Kodak Alaris document scanners deliver reliable, accurate capture at every volume — with intelligent features that reduce operator effort.',
    tags: ['S2000 · Desktop', 'S3000 · Departmental', 'S5000 · Production', 'i5000 · High Volume'],
    cta: { label: 'Explore Scanners', href: '#scanners' },
    ghost: { label: 'Compare Models', href: '#scanners' },
  },
  {
    id: 'iis',
    eyebrow: '02 — Info Input Solution',
    title: ['Intelligent', 'capture.', 'Automated.'],
    accentLine: 1,
    desc: 'KODAK Info Input Solution is an AI-powered intelligent document processing platform that classifies, extracts, and validates data from any document type — with zero manual indexing.',
    tags: ['AI Classification', 'Zero-touch Extraction', 'ERP / ECM Integration'],
    cta: { label: 'Learn About IIS', href: '#iis' },
    ghost: { label: 'Request Demo', href: '#iis' },
  },
  {
    id: 'capture-pro',
    eyebrow: '03 — Capture Pro Software',
    title: ['Capture.', 'Process.', 'Deliver.'],
    accentLine: 2,
    desc: 'KODAK Capture Pro Software is the industry benchmark for high-volume production scanning — with advanced image processing, batch job automation and seamless output to ECM, ERP and cloud repositories.',
    tags: ['Batch Automation', 'Image Enhancement', 'ECM & Cloud Output'],
    cta: { label: 'Explore Capture Pro', href: '#capture-pro' },
    ghost: { label: 'Download Trial', href: '#capture-pro' },
  },
];

/* ─────────────────────────────────────────────
   SCANNER SERIES
───────────────────────────────────────────── */
const scannerSeries = [
  {
    id: 's2000',
    series: 'S2000',
    cat: 'Desktop · Workgroup',
    name: 'Smart Touch Desktop Scanner',
    tagline: 'Compact, fast and intelligent — the perfect desktop scanner for busy workgroups needing reliable daily capture.',
    speeds: ['35 ppm', '70 ipm'],
    highlight: { label: 'Scan Speed', value: '35 ppm', desc: 'At 200/300 dpi in colour, greyscale or black-and-white — reliable daily output for workgroups.' },
    specs: [{ label: 'Speed', value: '35 ppm / 70 ipm' }, { label: 'Feeder', value: '75-sheet ADF' }, { label: 'Resolution', value: 'Up to 600 dpi' }, { label: 'Daily Volume', value: 'Up to 3,000 pgs' }, { label: 'Formats', value: 'A8 – A4' }, { label: 'USB', value: '3.0' }],
    features: ['Smart Touch technology — scan to email, PDF, SharePoint or cloud in one touch.', 'Automatic document detection — starts scanning when paper is loaded, stops when empty.', 'Perfect Page™ image processing delivers consistently clean, readable output.', 'Bundled with Capture Pro Limited Edition for out-of-box productivity.'],
  },
  {
    id: 's3000',
    series: 'S3000',
    cat: 'Departmental · Network Ready',
    name: 'High-Performance Departmental Scanner',
    tagline: 'Built for departments that need continuous batch scanning with intelligent paper handling and network-ready flexibility.',
    speeds: ['60 ppm', '120 ipm'],
    highlight: { label: 'Daily Volume', value: '10,000 pgs', desc: 'Heavy departmental workloads handled effortlessly with 250-sheet feeder and robust paper handling.' },
    specs: [{ label: 'Speed', value: '60 ppm / 120 ipm' }, { label: 'Feeder', value: '250-sheet ADF' }, { label: 'Resolution', value: 'Up to 600 dpi' }, { label: 'Daily Volume', value: 'Up to 10,000 pgs' }, { label: 'Connectivity', value: 'USB + Network' }, { label: 'Output', value: 'Colour / Greyscale / BW' }],
    features: ['Intelligent Document Protection (IDP) — stops instantly if a jam or multi-feed is detected.', 'Ultrasonic multi-feed detection prevents lost or damaged documents.', 'Exceptional mixed-batch handling — staples, paper clips and irregular sizes.', 'Capture Pro integration for automated workflow routing.'],
  },
  {
    id: 's5000',
    series: 'S5000',
    cat: 'Production · High Volume',
    name: 'Production Document Scanner',
    tagline: 'Highly reliable production scanners ready to tackle the most demanding high-volume, centralized data capture environments.',
    speeds: ['90 ppm', '180 ipm'],
    highlight: { label: 'Daily Volume', value: '30,000 pgs', desc: 'Engineered for non-stop production scanning with active thatch and continuous feed.' },
    specs: [{ label: 'Speed', value: '90 ppm / 180 ipm' }, { label: 'Feeder', value: '500-sheet ADF' }, { label: 'Resolution', value: 'Up to 600 dpi' }, { label: 'Daily Volume', value: 'Up to 30,000 pgs' }, { label: 'Feeding', value: 'Active Thatch' }, { label: 'Detection', value: 'Ultrasonic MFD' }],
    features: ['Active Thatch paper feeding — handles mixed batches without pre-sorting.', 'Color dropout for form processing — removes background color for cleaner OCR.', 'Integrated image quality verification — flags problem pages before operator review.', 'Service & Repair program options for minimal production downtime.'],
  },
  {
    id: 'i5000',
    series: 'i5000',
    cat: 'Enterprise · High Throughput',
    name: 'Enterprise Production System',
    tagline: 'The i5000 series is the gold standard for enterprise-scale, centralized document capture operations requiring maximum throughput.',
    speeds: ['130 ppm', '260 ipm'],
    highlight: { label: 'Throughput', value: '130 ppm', desc: 'Dual CCD scanning at 130 ppm / 260 ipm for the highest-volume enterprise environments.' },
    specs: [{ label: 'Speed', value: '130 ppm / 260 ipm' }, { label: 'Feeder', value: '750-sheet ADF' }, { label: 'Daily Volume', value: '100,000+ pgs' }, { label: 'Imprinting', value: 'Front & Back' }, { label: 'Patch Detection', value: 'Yes' }, { label: 'Warranty', value: 'Advanced Unit' }],
    features: ['Front and rear endorsing / imprinting for audit trail and document tracking.', 'Intelligent document protection at 130 ppm — zero slowing for reliability.', 'Integrated VRS® Elite image processing for superior output quality.', 'Professional Service plans with guaranteed response time and loaner units.'],
  },
];

/* ─────────────────────────────────────────────
   IIS FEATURES
───────────────────────────────────────────── */
const iisFeatures = [
  { icon: '🧠', title: 'AI-Powered Classification', desc: 'Machine learning automatically classifies documents by type, eliminating manual sorting and routing decisions.' },
  { icon: '⚡', title: 'Zero-Touch Data Extraction', desc: 'Intelligent extraction pulls structured data from unstructured documents — invoices, contracts, forms and more — without manual indexing.' },
  { icon: '✅', title: 'Automated Validation', desc: 'Business rules validate extracted data in real time, flagging exceptions for human review and routing clean data downstream automatically.' },
  { icon: '🔗', title: 'Universal Integration', desc: 'Pre-built connectors to SAP, SharePoint, Salesforce, OpenText, DocuWare and any REST or CMIS-compatible ECM or ERP system.' },
  { icon: '☁️', title: 'Cloud & On-Premise', desc: 'Deploy in the cloud, on-premise or in a hybrid model — IIS adapts to your data governance and compliance requirements.' },
  { icon: '📊', title: 'Analytics & Audit Trail', desc: 'Full processing logs and performance dashboards provide complete visibility into document volumes, accuracy rates and exception trends.' },
];

/* ─────────────────────────────────────────────
   CAPTURE PRO EDITIONS
───────────────────────────────────────────── */
const captureProEditions = [
  {
    id: 'limited',
    badge: 'Limited Edition',
    name: 'Capture Pro Limited',
    sub: 'Bundled with Kodak Alaris scanners',
    desc: 'The entry-level edition bundled free with every Kodak Alaris scanner — scan-to-destination, basic job creation and essential image processing.',
    features: ['Scan to PDF, TIFF, JPEG, searchable PDF', 'Basic batch job creation', 'Smart Touch integration', 'Bundled at no extra cost'],
  },
  {
    id: 'standard',
    badge: 'Standard Edition',
    name: 'Capture Pro Standard',
    sub: 'Departmental & multi-user workflows',
    desc: 'Full batch management, advanced image processing and direct output to SharePoint, network folders and leading ECM platforms.',
    features: ['Advanced batch & job management', 'OCR & searchable PDF output', 'SharePoint & ECM connectors', 'Multi-user workstation support'],
  },
  {
    id: 'network',
    badge: 'Network Edition',
    name: 'Capture Pro Network',
    sub: 'Enterprise & production environments',
    desc: 'Centralized administration, distributed scanning across multiple workstations, advanced bar code processing and full workflow automation.',
    features: ['Centralized license & job management', 'Distributed multi-workstation scanning', 'Advanced bar code & patch code', 'API for custom workflow integration'],
  },
  {
    id: 'sla',
    badge: 'ScanStation',
    name: 'Capture Pro ScanStation',
    sub: 'Standalone walk-up scanning kiosk',
    desc: 'Transform any Kodak Alaris scanner into a self-service walk-up scanning station — no PC required, touchscreen interface, role-based access.',
    features: ['Touchscreen-driven self-service UI', 'No dedicated PC required', 'Role-based access control', 'Direct cloud & network output'],
  },
];

/* ─────────────────────────────────────────────
   SHARED SUB-COMPONENTS
───────────────────────────────────────────── */
function SpecGrid({ specs }: { specs: { label: string; value: string }[] }) {
  return (
    <div className="grid gap-3 mb-5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))' }}>
      {specs.map(s => (
        <div key={s.label} className="p-3 rounded-xl" style={{ border: `1px solid ${ka.line}`, background: ka.alt }}>
          <div style={{ fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: ka.mute, marginBottom: 4 }}>{s.label}</div>
          <div style={{ fontWeight: 700, fontSize: 14, color: ka.navy }}>{s.value}</div>
        </div>
      ))}
    </div>
  );
}

function FeatureList({ features }: { features: string[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {features.map((f, i) => (
        <li key={i} className="flex gap-3 items-start" style={{ fontSize: 14, color: ka.dim, lineHeight: 1.65 }}>
          <span className="shrink-0 mt-[7px] w-1.5 h-1.5 rounded-full" style={{ background: ka.accent }} />
          {f}
        </li>
      ))}
    </ul>
  );
}

function HighlightBox({ label, value, desc }: { label: string; value: string; desc: string }) {
  return (
    <div className="rounded-xl p-5 mb-5" style={{ background: 'rgba(227,6,19,0.05)', border: '1px solid rgba(227,6,19,0.2)' }}>
      <div style={{ fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: ka.accent, marginBottom: 4 }}>{label}</div>
      <div style={{ fontWeight: 700, fontSize: 26, lineHeight: 1, letterSpacing: '-0.02em', color: ka.navy, marginBottom: 4 }}>{value}</div>
      <div style={{ fontSize: 13, color: ka.dim }}>{desc}</div>
    </div>
  );
}

function PlaceholderImage({ label }: { label: string }) {
  return (
    <div className="w-full rounded-2xl flex flex-col items-center justify-center gap-3"
         style={{ aspectRatio: '16/10', background: '#FFF5F5', border: '1px dashed rgba(227,6,19,0.25)' }}>
      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ border: '1.5px dashed rgba(227,6,19,0.3)' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(227,6,19,0.4)" strokeWidth="1.6"><rect x="3" y="4" width="18" height="13" rx="1.5"/><path d="M8 21h8M12 17v4"/></svg>
      </div>
      <span style={{ fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(227,6,19,0.4)' }}>{label}</span>
    </div>
  );
}

function SectionLabel({ text }: { text: string }) {
  return (
    <p style={{ fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: ka.accent, display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
      <span style={{ width: 28, height: 2, background: ka.accent, display: 'inline-block', borderRadius: 2 }} />
      {text}
    </p>
  );
}

function AccordionTile({ open, onToggle, header, children }: {
  open: boolean; onToggle: () => void; header: React.ReactNode; children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl overflow-hidden transition-all duration-300 bg-white"
         style={{ border: open ? `1px solid ${ka.accent}` : `0.5px solid ${ka.line}`, boxShadow: open ? '0 4px 20px rgba(227,6,19,0.08)' : 'none' }}>
      <button onClick={onToggle} className="w-full text-left" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', fontFamily: 'inherit' }}>
        {header}
      </button>
      <div style={{ maxHeight: open ? '1200px' : 0, overflow: 'hidden', transition: 'max-height 0.6s cubic-bezier(.22,.61,.36,1)' }}>
        {children}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export default function KodakAlarisPage() {
  const [heroIdx, setHeroIdx] = useState(0);
  const [openScanner, setOpenScanner] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setHeroIdx(i => (i + 1) % heroSlides.length), 6000);
  };

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const goSlide = (n: number) => { setHeroIdx((n + heroSlides.length) % heroSlides.length); resetTimer(); };
  const slide = heroSlides[heroIdx];

  return (
    <main style={{ background: ka.bg, color: ka.text, fontFamily: 'var(--font-poppins)', overflowX: 'hidden' }}>

      {/* ══════════════════════════════════════════
          HERO — dark with Kodak red radial glow
      ══════════════════════════════════════════ */}
      <section style={{ position: 'relative', minHeight: '90vh', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          background: `
            radial-gradient(ellipse 55% 60% at 75% 50%, rgba(227,6,19,0.14) 0%, transparent 65%),
            linear-gradient(150deg, #0A1628 0%, #1a0508 55%, #0A1628 100%)`,
        }} />
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }} />

        {/* Kodak gold accent stripe — subtle brand touch */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, zIndex: 6, background: `linear-gradient(90deg, ${ka.accentGold}, ${ka.accent}, ${ka.accentGold})` }} />

        {/* Slide content */}
        <div className="ka-hero-grid max-w-7xl mx-auto"
             style={{ position: 'relative', zIndex: 2, minHeight: '90vh', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, padding: '140px 80px 100px', alignItems: 'center' }}>

          <div>
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full"
                 style={{ border: '1px solid rgba(227,6,19,0.35)', background: 'rgba(227,6,19,0.1)', fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: ka.accent }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: ka.accent, boxShadow: `0 0 10px ${ka.accent}`, animation: 'kaPulse 2s infinite', display: 'inline-block' }} />
              {slide.eyebrow}
            </div>

            <h1 style={{ fontWeight: 700, lineHeight: 0.95, letterSpacing: '-0.035em', marginBottom: 24, fontSize: 'clamp(40px, 6vw, 80px)' }}>
              {slide.title.map((line, i) => (
                <span key={i} style={{ display: 'block', color: i === slide.accentLine ? ka.accent : '#ffffff' }}>{line}</span>
              ))}
            </h1>

            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'rgba(255,255,255,0.65)', maxWidth: 500, marginBottom: 28, fontWeight: 300 }}>
              {slide.desc}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {slide.tags.map(t => (
                <span key={t} className="px-4 py-2 rounded-full"
                      style={{ fontSize: 12, fontWeight: 500, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.6)' }}>
                  {t}
                </span>
              ))}
            </div>

            <div className="flex gap-3 flex-wrap">
              <a href={slide.cta.href}
                 className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:opacity-85 hover:-translate-y-px no-underline"
                 style={{ background: ka.accent, color: '#fff', fontSize: 14, fontWeight: 600, boxShadow: '0 8px 24px -8px rgba(227,6,19,0.5)' }}>
                {slide.cta.label}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
              </a>
              <a href={slide.ghost.href}
                 className="inline-flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-200 no-underline"
                 style={{ border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.8)', fontSize: 14, fontWeight: 500, background: 'rgba(255,255,255,0.04)' }}>
                {slide.ghost.label}
              </a>
            </div>
          </div>

          {/* Right placeholder */}
          <div className="ka-hero-visual hidden lg:flex items-center justify-center">
            <div className="w-full max-w-lg rounded-2xl flex flex-col items-center justify-center gap-4"
                 style={{ aspectRatio: '16/10', border: '1px solid rgba(255,255,255,0.08)', background: 'linear-gradient(135deg, rgba(255,255,255,0.02), rgba(227,6,19,0.06))', backdropFilter: 'blur(20px)' }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ border: '1.5px dashed rgba(227,6,19,0.3)' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(227,6,19,0.4)" strokeWidth="1.8"><rect x="3" y="4" width="14" height="17" rx="1.5"/><path d="M7 9h8M7 13h6M17 8l4 3-4 3"/></svg>
              </div>
              <span style={{ fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>add product image here</span>
            </div>
          </div>
        </div>

        {/* Slide controls */}
        <div className="ka-hero-controls"
             style={{ position: 'absolute', bottom: 36, left: 80, right: 80, zIndex: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="flex gap-2">
            {heroSlides.map((_, i) => (
              <button key={i} onClick={() => goSlide(i)}
                      style={{ width: 36, height: 3, border: 'none', borderRadius: 2, background: i === heroIdx ? ka.accent : 'rgba(255,255,255,0.2)', cursor: 'pointer', transition: 'background 0.3s' }} />
            ))}
          </div>
          <span style={{ fontFamily: 'monospace', fontSize: 12, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.4)' }}>
            <strong style={{ color: ka.accent }}>{String(heroIdx + 1).padStart(2, '0')}</strong> / {String(heroSlides.length).padStart(2, '0')}
          </span>
          <div className="flex gap-2">
            {[{ d: 'M19 12H5M11 19l-7-7 7-7', fn: () => goSlide(heroIdx - 1) }, { d: 'M5 12h14M13 5l7 7-7 7', fn: () => goSlide(heroIdx + 1) }].map((btn, i) => (
              <button key={i} onClick={btn.fn}
                      className="flex items-center justify-center rounded-full transition-all duration-200"
                      style={{ width: 44, height: 44, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.2)', color: 'rgba(255,255,255,0.7)', cursor: 'pointer' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = ka.accent; (e.currentTarget as HTMLButtonElement).style.color = ka.accent; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.15)'; (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.7)'; }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={btn.d}/></svg>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          INTRO BAND
      ══════════════════════════════════════════ */}
      <section className="px-6 py-14" style={{ background: ka.bg, borderBottom: `1px solid ${ka.line}` }}>
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-start lg:items-center gap-10 justify-between">
          <div>
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full"
                 style={{ border: '1px solid rgba(227,6,19,0.25)', background: 'rgba(227,6,19,0.05)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: ka.accent, fontFamily: 'monospace' }}>
              Distributed by Rookie Ninja
            </div>
            <h2 style={{ fontWeight: 700, fontSize: 'clamp(24px, 4vw, 42px)', lineHeight: 1.1, letterSpacing: '-0.025em', color: ka.navy }}>
              Authorized Kodak Alaris <span style={{ color: ka.accent }}>Distributor</span>
            </h2>
            <p style={{ fontSize: 15, color: ka.dim, lineHeight: 1.75, marginTop: 12, maxWidth: 560 }}>
              Rookie Ninja delivers Kodak Alaris's complete document capture portfolio — scanners, intelligent capture software, and managed services — across Middle East & Africa.
            </p>
          </div>
          <div className="flex gap-10 shrink-0">
            {[{ v: '20+', l: 'Years Heritage' }, { v: '100+', l: 'Countries Served' }, { v: '3', l: 'Product Lines' }].map(s => (
              <div key={s.l}>
                <div style={{ fontWeight: 800, fontSize: 34, lineHeight: 1, color: ka.accent, letterSpacing: '-0.03em' }}>{s.v}</div>
                <div style={{ fontSize: 12, color: ka.mute, marginTop: 4 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          DOCUMENT SCANNERS
      ══════════════════════════════════════════ */}
      <section id="scanners" className="px-6 py-24" style={{ background: ka.alt, borderBottom: `1px solid ${ka.line}` }}>
        <div className="max-w-6xl mx-auto">
          <Animate type="fade-up">
            <SectionLabel text="Document Scanners" />
            <h2 className="font-display font-bold leading-[1.1] tracking-[-0.02em] mb-4"
                style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: ka.navy }}>
              Capture at every <span style={{ color: ka.accent }}>volume.</span>
            </h2>
            <p style={{ fontSize: 15, color: ka.dim, lineHeight: 1.75, maxWidth: 580, marginBottom: 40 }}>
              From desktop workgroup to enterprise production — Kodak Alaris scanners deliver intelligent, reliable document capture with Perfect Page™ image quality at every speed class.
            </p>
          </Animate>

          <div className="flex flex-col gap-3">
            {scannerSeries.map(s => (
              <AccordionTile key={s.id} open={openScanner === s.id} onToggle={() => setOpenScanner(openScanner === s.id ? null : s.id)}
                header={
                  <div className="flex items-center gap-5 p-5 lg:p-6">
                    <span style={{ fontWeight: 800, fontSize: 'clamp(26px, 3.5vw, 42px)', lineHeight: 1, letterSpacing: '-0.04em', color: openScanner === s.id ? ka.accent : 'rgba(10,22,40,0.15)', minWidth: 100, flexShrink: 0 }}>{s.series}</span>
                    <div className="flex-1 text-left">
                      <div style={{ fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: ka.mute, marginBottom: 3 }}>{s.cat}</div>
                      <div style={{ fontWeight: 700, fontSize: 'clamp(14px, 1.8vw, 18px)', letterSpacing: '-0.01em', color: ka.navy, marginBottom: 3 }}>{s.name}</div>
                      <div style={{ fontSize: 12, color: ka.dim }}>{s.tagline}</div>
                    </div>
                    <div className="hidden sm:flex gap-2 shrink-0">
                      {s.speeds.map(sp => (
                        <span key={sp} style={{ fontFamily: 'monospace', fontSize: 10, padding: '3px 8px', border: `1px solid ${ka.line}`, borderRadius: 5, color: ka.mute }}>{sp}</span>
                      ))}
                    </div>
                    <div className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
                         style={{ border: `1px solid ${openScanner === s.id ? ka.accent : ka.line}`, background: openScanner === s.id ? ka.accent : 'transparent', color: openScanner === s.id ? '#fff' : ka.navy, transform: openScanner === s.id ? 'rotate(45deg)' : 'none' }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M12 5v14M5 12h14"/></svg>
                    </div>
                  </div>
                }>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 p-5 lg:p-7" style={{ borderTop: `1px solid ${ka.line}`, background: '#fff' }}>
                  <PlaceholderImage label={`${s.series} Scanner`} />
                  <div>
                    <HighlightBox {...s.highlight} />
                    <SpecGrid specs={s.specs} />
                    <FeatureList features={s.features} />
                  </div>
                </div>
              </AccordionTile>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          INFO INPUT SOLUTION
      ══════════════════════════════════════════ */}
      <section id="iis" className="px-6 py-24" style={{ background: ka.bg, borderBottom: `1px solid ${ka.line}` }}>
        <div className="max-w-6xl mx-auto">
          <Animate type="fade-up">
            <SectionLabel text="KODAK Info Input Solution" />
            <h2 className="font-display font-bold leading-[1.1] tracking-[-0.02em] mb-4"
                style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: ka.navy }}>
              Intelligent capture, <span style={{ color: ka.accent }}>automated.</span>
            </h2>
            <p style={{ fontSize: 15, color: ka.dim, lineHeight: 1.75, maxWidth: 600, marginBottom: 48 }}>
              KODAK Info Input Solution is an AI-powered intelligent document processing platform named on KMWorld's Trend-Setting Products List. It classifies, extracts and validates data from any document — with zero manual indexing.
            </p>
          </Animate>

          {/* Two-column intro */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16">
            <Animate type="fade-right">
              <PlaceholderImage label="Info Input Solution" />
            </Animate>
            <Animate type="fade-left" delay={80}>
              <div>
                <div className="w-10 h-[2px] rounded-full mb-5" style={{ background: ka.accent }} />
                <p style={{ fontSize: 15, color: ka.dim, lineHeight: 1.8, marginBottom: 20 }}>
                  Built on machine learning and AI, Info Input Solution eliminates the bottleneck of manual document classification and data entry. It connects directly to your existing ECM, ERP or cloud systems — processing documents faster, with higher accuracy than any manual workflow.
                </p>
                <p style={{ fontSize: 15, color: ka.dim, lineHeight: 1.8, marginBottom: 28 }}>
                  Recognized by KMWorld AI 100 and awarded Excellence in Customer Service — IIS is the benchmark for intelligent document processing.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['KMWorld AI 100', 'Trend-Setting Product 2024', 'CRN 5-Star Partner Program'].map(badge => (
                    <span key={badge} className="px-3 py-1.5 rounded-full font-medium"
                          style={{ fontSize: 11, background: 'rgba(227,6,19,0.06)', color: ka.accent, border: '0.5px solid rgba(227,6,19,0.2)' }}>
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </Animate>
          </div>

          {/* Feature grid */}
          <Animate type="fade-up">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {iisFeatures.map((f, i) => (
                <div key={f.title}
                     className="p-6 rounded-2xl bg-white transition-all duration-300 hover:-translate-y-0.5"
                     style={{ border: `0.5px solid ${ka.line}` }}
                     onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(227,6,19,0.3)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 20px rgba(227,6,19,0.08)'; }}
                     onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = ka.line; (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; }}>
                  <div className="text-2xl mb-4">{f.icon}</div>
                  <h3 style={{ fontWeight: 700, fontSize: 15, color: ka.navy, marginBottom: 8, letterSpacing: '-0.01em' }}>{f.title}</h3>
                  <p style={{ fontSize: 13, color: ka.dim, lineHeight: 1.65 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </Animate>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CAPTURE PRO SOFTWARE
      ══════════════════════════════════════════ */}
      <section id="capture-pro" className="px-6 py-24" style={{ background: ka.alt, borderBottom: `1px solid ${ka.line}` }}>
        <div className="max-w-6xl mx-auto">
          <Animate type="fade-up">
            <SectionLabel text="KODAK Capture Pro Software" />
            <h2 className="font-display font-bold leading-[1.1] tracking-[-0.02em] mb-4"
                style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: ka.navy }}>
              The production scanning <span style={{ color: ka.accent }}>standard.</span>
            </h2>
            <p style={{ fontSize: 15, color: ka.dim, lineHeight: 1.75, maxWidth: 600, marginBottom: 48 }}>
              KODAK Capture Pro Software is the industry benchmark for high-volume production scanning — with advanced image processing, batch job automation and seamless output to ECM, ERP and cloud repositories. Available in four editions to match every deployment scale.
            </p>
          </Animate>

          {/* Edition cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {captureProEditions.map((ed, i) => (
              <Animate key={ed.id} type="fade-up" delay={i * 60}>
                <div className="flex flex-col rounded-2xl overflow-hidden bg-white h-full transition-all duration-300 hover:-translate-y-0.5"
                     style={{ border: `0.5px solid ${ka.line}` }}
                     onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(227,6,19,0.3)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 24px rgba(227,6,19,0.08)'; }}
                     onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = ka.line; (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; }}>
                  {/* Card top accent */}
                  <div style={{ height: 3, background: i === 0 ? `linear-gradient(90deg, ${ka.accentGold}, ${ka.accentGold}99)` : ka.accent }} />
                  <div className="p-5 flex flex-col flex-1">
                    <span className="self-start mb-3 px-2.5 py-1 rounded-full font-medium"
                          style={{ fontSize: 10, fontFamily: 'monospace', letterSpacing: '0.14em', textTransform: 'uppercase', background: i === 0 ? 'rgba(250,182,23,0.1)' : 'rgba(227,6,19,0.06)', color: i === 0 ? ka.accentGold : ka.accent, border: `0.5px solid ${i === 0 ? 'rgba(250,182,23,0.3)' : 'rgba(227,6,19,0.2)'}` }}>
                      {ed.badge}
                    </span>
                    <h3 style={{ fontWeight: 700, fontSize: 15, color: ka.navy, marginBottom: 4, letterSpacing: '-0.01em' }}>{ed.name}</h3>
                    <p style={{ fontSize: 11, color: ka.mute, marginBottom: 12 }}>{ed.sub}</p>
                    <p style={{ fontSize: 13, color: ka.dim, lineHeight: 1.65, marginBottom: 16, flex: 1 }}>{ed.desc}</p>
                    <ul className="flex flex-col gap-1.5 mt-auto">
                      {ed.features.map(f => (
                        <li key={f} className="flex gap-2 items-start" style={{ fontSize: 12, color: ka.dim }}>
                          <span className="shrink-0 mt-1 w-1.5 h-1.5 rounded-full" style={{ background: ka.accent }} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Animate>
            ))}
          </div>

          {/* Capture Pro image showcase */}
          <Animate type="fade-up">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <p style={{ fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: ka.accent, marginBottom: 12 }}>Why Capture Pro</p>
                <h3 style={{ fontWeight: 700, fontSize: 'clamp(22px, 3vw, 32px)', lineHeight: 1.15, letterSpacing: '-0.02em', color: ka.navy, marginBottom: 16 }}>
                  From scan to system — in one automated workflow.
                </h3>
                <div className="w-10 h-[2px] rounded-full mb-5" style={{ background: ka.accent }} />
                <div className="flex flex-col gap-3 mb-8">
                  {[
                    { label: 'Advanced Image Processing', desc: 'Deskew, despeckle, blank page removal, color dropout and binarization — automated per job profile.' },
                    { label: 'Bar Code & Patch Code', desc: 'Automatic batch/document separation using 1D/2D bar codes and patch codes — no manual sorting.' },
                    { label: 'Output Anywhere', desc: 'Native output to SharePoint, OpenText, DocuWare, Laserfiche, Salesforce, network folders and cloud storage.' },
                    { label: 'VRS® Elite Integration', desc: 'Industry-leading VRS image quality engine processes every page for consistent, accurate output.' },
                  ].map(item => (
                    <div key={item.label} className="flex gap-3 items-start p-4 rounded-xl transition-all duration-200"
                         style={{ border: `0.5px solid ${ka.line}`, background: '#fff' }}>
                      <span className="shrink-0 mt-1 w-2 h-2 rounded-full" style={{ background: ka.accent }} />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 13, color: ka.navy, marginBottom: 2 }}>{item.label}</div>
                        <div style={{ fontSize: 12, color: ka.dim, lineHeight: 1.55 }}>{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <PlaceholderImage label="Capture Pro Software" />
            </div>
          </Animate>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA BAND
      ══════════════════════════════════════════ */}
      <section className="px-6 py-20" style={{ background: ka.bg }}>
        <div className="max-w-3xl mx-auto text-center">
          <Animate type="fade-up">
            <p style={{ fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: ka.accent, marginBottom: 16 }}>
              Authorized Kodak Alaris Partner
            </p>
            <h2 style={{ fontWeight: 700, fontSize: 'clamp(26px, 4vw, 42px)', lineHeight: 1.1, letterSpacing: '-0.025em', color: ka.navy, marginBottom: 14 }}>
              Ready to transform your <span style={{ color: ka.accent }}>document workflow?</span>
            </h2>
            <p style={{ fontSize: 15, color: ka.dim, lineHeight: 1.75, marginBottom: 32 }}>
              From desktop scanning to enterprise-scale intelligent document processing — Rookie Ninja delivers the full Kodak Alaris portfolio with expert guidance and regional support.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="/contact"
                 className="inline-flex items-center gap-2 font-body font-medium text-white px-6 py-3 rounded-xl transition-all duration-200 no-underline hover:opacity-85 hover:-translate-y-px"
                 style={{ fontSize: 14, background: ka.accent, boxShadow: '0 4px 20px rgba(227,6,19,0.3)' }}>
                Request a Quote
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
              <a href="/contact"
                 className="inline-flex items-center gap-2 font-body font-medium px-6 py-3 rounded-xl transition-all duration-200 no-underline hover:-translate-y-px"
                 style={{ fontSize: 14, color: ka.accent, border: '1px solid rgba(227,6,19,0.35)', background: 'rgba(227,6,19,0.04)' }}>
                Schedule a Demo
              </a>
            </div>
          </Animate>
        </div>
      </section>

      <style>{`
        @keyframes kaPulse { 0%,100%{ opacity:1; transform:scale(1); } 50%{ opacity:.5; transform:scale(.8); } }
        @media (max-width: 1024px) {
          .ka-hero-grid { grid-template-columns: 1fr !important; padding: 110px 24px 100px !important; }
          .ka-hero-controls { left: 24px !important; right: 24px !important; bottom: 24px !important; }
        }
      `}</style>
    </main>
  );
}