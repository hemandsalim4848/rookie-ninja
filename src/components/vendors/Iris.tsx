'use client';

import { useEffect, useRef, useState } from 'react';

const ACCENT      = '#80E6D8';
const ACCENT_DARK = '#55cebf';
const ACCENT_TEXT = '#3dbfb3';

// ── isolated form ─────────────────────────────────────────────────────────────
function IrisForm() {
  const [form, setForm]     = useState({ name: '', email: '', licence: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const r = await fetch('https://formspree.io/f/xdajrzpv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      setStatus(r.ok ? 'done' : 'error');
    } catch {
      setStatus('error');
    }
  };

  const inp: React.CSSProperties = {
    width: '100%', padding: '12px 14px', borderRadius: 6,
    border: 'none', background: 'rgba(255,255,255,0.12)',
    color: '#fff', fontSize: 14, outline: 'none', fontFamily: 'inherit',
  };

  if (status === 'done') return (
    <p style={{ color: '#fff', fontSize: 15, padding: '20px 0' }}>
      Thank you! We&apos;ll be in touch shortly.
    </p>
  );

  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <input style={inp} name="name" placeholder="Full Name" required
        value={form.name} onChange={handle} />
      <input style={inp} type="email" name="email" placeholder="Business Email" required
        value={form.email} onChange={handle} />
      <select style={{ ...inp, color: '#e5e7eb' }} name="licence" required
        value={form.licence} onChange={handle}>
        <option value="" style={{ background: '#fff', color: '#000' }}>Select Licence Type</option>
        <option style={{ background: '#fff', color: '#000' }}>PDF Essential — 1 PC</option>
        <option style={{ background: '#fff', color: '#000' }}>PDF Essential — 3 PC</option>
        <option style={{ background: '#fff', color: '#000' }}>PDF Elite — 1 PC</option>
        <option style={{ background: '#fff', color: '#000' }}>PDF Elite — 3 PC</option>
        <option style={{ background: '#fff', color: '#000' }}>PDF Elite — Volume (10+ users)</option>
      </select>
      <button type="submit" disabled={status === 'sending'} style={{
        marginTop: 10, padding: 13, background: ACCENT, color: '#fff',
        fontWeight: 600, border: 'none', borderRadius: 6, cursor: 'pointer',
        letterSpacing: 1, fontSize: 14, fontFamily: 'inherit',
        opacity: status === 'sending' ? 0.7 : 1, transition: 'background 0.25s',
      }}>
        {status === 'sending' ? 'SENDING…' : 'SEND INQUIRY'}
      </button>
      {status === 'error' && (
        <p style={{ color: '#fca5a5', fontSize: 13 }}>Something went wrong. Please try again.</p>
      )}
    </form>
  );
}

// ── data ──────────────────────────────────────────────────────────────────────
const slides = [
  {
    bg: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1782334329/RIPDF25-combine_merge-630x450-min_zn74de.webp',
    badge: 'IRIS PDF Software',
    line1: 'Readiris PDF',
    line2: 'Essential.',
    sub: 'A complete set of OCR, scanning, document composition, and PDF management features — all in one platform. Perpetual licence for Windows & macOS.',
    btnLabel: 'View product',
    btnHref: '/iris/readiris-pdf-essential',
  },
  {
    bg: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1782334328/RIPDF25-edit_PDF-630x450-min_xdabbm.webp',
    badge: 'Advanced Edition',
    line1: 'Readiris PDF',
    line2: 'Elite.',
    sub: 'Everything in Essential — plus batch conversion, PDF/A archiving, advanced automation, cloud sharing, and double e-signature for power users and businesses.',
    btnLabel: 'Explore product',
    btnHref: '/iris/readiris-pdf-elite',
  },
];

const featureCards = [
  {
    img: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1782334328/RIPDF25-convert_to_PDF-630x450-min_xvnave.webp',
    tag: 'Convert & Extract',
    title: 'PDF Format Converter & Text Extraction',
    desc: 'Transform documents into 40+ output formats with AI-powered OCR in 138 languages — preserving formatting, fonts, and layout.',
    features: [
      'Convert PDF to Word, Excel, PowerPoint',
      'Extract text with 99.8% OCR accuracy',
      'Batch conversion for multiple documents',
      'JPG, TXT, and scanned file support',
      'Multi-language recognition (138 languages)',
    ],
  },
  {
    img: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1782334328/RIPDF25-edit_PDF-630x450-min_xdabbm.webp',
    tag: 'Edit & Annotate',
    title: 'Edit, Annotate & Stamp PDF',
    desc: 'Add, delete, or edit text directly in existing PDFs. Apply stamps, markup overlays, comments, and review notes without altering the source document.',
    features: [
      'Direct PDF text editing',
      'Stamps — Approved, Paid, Confidential, etc.',
      'Comments and review markup tools',
      'Fill PDF forms directly in the app',
      'Search and replace within PDFs',
    ],
  },
  {
    img: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1782334329/RIPDF25-combine_merge-630x450-min_zn74de.webp',
    tag: 'Organise & Secure',
    title: 'Merge, Split, Redact & Share',
    desc: 'Combine multiple documents into one PDF, split large files into focused sub-files, scrub sensitive data, and share securely to the cloud.',
    features: [
      'Merge and combine multiple PDFs',
      'Split and extract pages or sections',
      'Redact sensitive content and metadata',
      'Export to Google Drive, Dropbox, OneDrive, Box, SharePoint',
      'Word to PDF and TXT to PDF conversion',
    ],
  },
];

const editions = [
  {
    label: 'Entry Edition',
    title: 'Readiris PDF Essential',
    img: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1782334328/RIPDF25-convert_to_PDF-630x450-min_xvnave.webp',
    intro: 'A complete PDF suite for everyday professionals.',
    bullets: [
      'Scan & OCR in 138 languages',
      'Edit, convert & manage PDFs',
      'Annotate, comment, insert & extract',
      'Fill PDF forms',
      'Export to/from Word, Excel, and more',
      'Search / replace within PDFs',
      'Available as 1 PC or 3 PC perpetual licence',
    ],
  },
  {
    label: 'Advanced Edition',
    title: 'Readiris PDF Elite',
    img: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1782334328/RIPDF25-whats_new-600x407-min_jhmsqj.webp',
    intro: 'All Essential features, plus advanced automation for power users and businesses.',
    bullets: [
      'Batch document conversion',
      'PDF/A archive support',
      'Advanced automation — smart page separation & auto PDF naming',
      'E-signature with double-signature support',
      'Cloud sharing — Google Drive, Dropbox, Box, OneDrive, SharePoint',
      'PDF redaction including hidden metadata',
      'Available as 1 PC, 3 PC, or volume licence (10+ users)',
    ],
  },
];

const whatsnewItems = [
  'PDF forms filling', 'PDF digital edition support', 'PDF flattening mode',
  'Large format (A0) support', 'PDF/UA support', 'Multiple e-signature', 'Right-to-left UI support',
];

const improvedItems = [
  { unique: true,  text: 'Automatic document naming' },
  { unique: true,  text: 'Automatic document separation' },
  { unique: false, text: 'Improved user interface' },
  { unique: false, text: 'Improved OCR engine accuracy' },
  { unique: false, text: 'Improved stamping with transparent images' },
  { unique: false, text: 'Improved hyperlink support' },
  { unique: false, text: 'Improved app & PDF opening speed' },
  { unique: false, text: 'Interface available in 24 languages' },
  { unique: false, text: 'User guide available in 7 languages' },
];

const sysreqWindows = [
  'Windows 10 or Windows 11 (64-bit)',
  '1.5 GHz processor or above (multicore recommended)',
  '8 GB RAM minimum',
  '5 GB available hard disk space',
  'Internet connection for download & activation',
];

const sysreqMac = [
  'macOS 10.15 (Catalina) or higher',
  '1.5 GHz processor or above (multicore recommended)',
  '8 GB RAM minimum',
  '5 GB available hard disk space',
  'Apple M1 & M2 chip compatible',
  'Internet connection for download & activation',
];

const navLinks = [
  { label: 'PDF Features',       href: '#pdf-features' },
  { label: 'Essential vs Elite', href: '#pdf-editions' },
  { label: "What's New",         href: '#pdf-whats-new' },
];

// ── main component ────────────────────────────────────────────────────────────
export default function IrisPage() {
  const [slide,      setSlide]      = useState(0);
  const [progress,   setProgress]   = useState(0);
  const [navSticky,  setNavSticky]  = useState(false);
  const [ledActive,  setLedActive]  = useState(0);
  const [ledImg,     setLedImg]     = useState(editions[0].img);
  const [imgFading,  setImgFading]  = useState(false);
  const [activeTab,  setActiveTab]  = useState(0);
  const [winW,       setWinW]       = useState(0);
  const [hovNav,     setHovNav]     = useState<number | null>(null);

  const heroRef  = useRef<HTMLDivElement>(null);
  const startRef = useRef<number>(0);
  const rafRef   = useRef<number>(0);

  const isMobile = winW > 0 && winW < 768;
  const isTablet = winW > 0 && winW < 900;

  // window width
  useEffect(() => {
    const set = () => setWinW(window.innerWidth);
    set();
    window.addEventListener('resize', set, { passive: true });
    return () => window.removeEventListener('resize', set);
  }, []);

  // slider progress bar
  useEffect(() => {
    const DURATION = 5000;
    startRef.current = 0;
    const tick = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const pct = Math.min(((ts - startRef.current) / DURATION) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setSlide(s => (s + 1) % slides.length);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [slide]);

  // sticky subnav + hide main Navbar
  useEffect(() => {
    const onScroll = () => {
      if (!heroRef.current) return;
      const sticky = heroRef.current.getBoundingClientRect().bottom <= 0;
      setNavSticky(sticky);
      if (sticky) document.body.classList.add('ka-subnav-active');
      else         document.body.classList.remove('ka-subnav-active');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      document.body.classList.remove('ka-subnav-active');
    };
  }, []);

  // scroll reveal
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.ir-reveal');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) { en.target.classList.add('ir-visible'); obs.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const goTo = (idx: number) => {
    setSlide(idx);
    setProgress(0);
    startRef.current = 0;
  };

  const switchEdition = (idx: number) => {
    if (idx === ledActive) return;
    setLedActive(idx);
    setImgFading(true);
    setTimeout(() => { setLedImg(editions[idx].img); setImgFading(false); }, 400);
  };

  // ── bullet helper ──
  const Bullet = ({ text }: { text: string }) => (
    <li style={{ fontSize: 13.5, color: '#374151', lineHeight: 1.5, display: 'flex', alignItems: 'flex-start', gap: 8 }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: ACCENT, flexShrink: 0, marginTop: 5, display: 'inline-block' }} />
      {text}
    </li>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        .ir-reveal  { opacity: 0; transform: translateY(28px); transition: opacity 0.65s ease, transform 0.65s ease; }
        .ir-visible { opacity: 1 !important; transform: translateY(0) !important; }
        @keyframes irPulse { 0%,100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.5); opacity: 0.5; } }
        .ir-pulse-dot { animation: irPulse 2s ease-in-out infinite; }
        @keyframes irFadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>

      {/* ── HERO SLIDER ── */}
      <div
        ref={heroRef}
        style={{ position: 'relative', width: '100%', height: isMobile ? 550 : 680, overflow: 'hidden', background: '#000', fontFamily: "'Poppins', sans-serif" }}
      >
        {slides.map((s, i) => (
          <div
            key={i}
            style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: isMobile ? 'flex-end' : 'center',
              paddingBottom: isMobile ? 70 : 0,
              opacity: slide === i ? 1 : 0,
              transition: 'opacity 0.9s cubic-bezier(0.77, 0, 0.175, 1)',
              zIndex: slide === i ? 2 : 1,
            }}
          >
            {/* bg */}
            <div style={{ position: 'absolute', inset: 0, backgroundImage: `url('${s.bg}')`, backgroundSize: 'cover', backgroundPosition: 'center', transform: slide === i ? 'scale(1)' : 'scale(1.06)', transition: 'transform 6s ease', filter: 'brightness(0.38)' }} />
            {/* overlay */}
            <div style={{ position: 'absolute', inset: 0, background: isMobile ? 'linear-gradient(180deg, transparent 10%, rgba(0,0,0,0.85) 70%)' : 'linear-gradient(90deg, rgba(0,0,0,0.72) 38%, transparent 80%)', zIndex: 0 }} />
            {/* content */}
            <div style={{ position: 'relative', zIndex: 3, width: '100%', maxWidth: 1220, margin: '0 auto', padding: '0 24px' }}>
              <div style={{ maxWidth: 580, opacity: slide === i ? 1 : 0, transform: slide === i ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 0.7s ease 0.4s, transform 0.7s ease 0.4s' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: ACCENT, color: '#000', fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', padding: '5px 12px', marginBottom: 18, borderRadius: 2 }}>
                  <span className="ir-pulse-dot" style={{ width: 7, height: 7, borderRadius: '50%', background: '#000', display: 'inline-block', flexShrink: 0 }} />
                  {s.badge}
                </span>
                <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: isMobile ? 'clamp(34px, 10vw, 48px)' : 'clamp(48px, 6vw, 78px)', color: '#fff', lineHeight: 0.95, marginBottom: 18, fontWeight: 700, letterSpacing: 1 }}>
                  {s.line1}<br /><span style={{ color: ACCENT }}>{s.line2}</span>
                </h1>
                <p style={{ fontSize: isMobile ? 13 : 15, color: 'rgba(255,255,255,0.72)', lineHeight: 1.65, marginBottom: isMobile ? 20 : 32, fontWeight: 300, maxWidth: 420 }}>{s.sub}</p>
                <a href={s.btnHref} style={{ display: 'inline-block', padding: isMobile ? '10px 20px' : '13px 28px', background: ACCENT, color: '#fff', border: `2px solid ${ACCENT}`, fontSize: isMobile ? 12 : 13, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', textDecoration: 'none', marginBottom: isMobile ? 35 : 0 }}>
                  {s.btnLabel}
                </a>
              </div>
            </div>
          </div>
        ))}

        {/* dots */}
        <div style={{ position: 'absolute', bottom: 28, left: isMobile ? 24 : 'calc(50% - 570px + 20px)', display: 'flex', gap: 10, zIndex: 10 }}>
          {slides.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} style={{ width: 10, height: 10, borderRadius: '50%', background: slide === i ? ACCENT : 'rgba(255,255,255,0.35)', border: 'none', cursor: 'pointer', padding: 0, transform: slide === i ? 'scale(1.3)' : 'scale(1)', transition: 'background 0.3s, transform 0.3s' }} />
          ))}
        </div>

        {/* progress bar */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, height: 3, background: ACCENT, width: `${progress}%`, zIndex: 10, transition: 'width 0.1s linear' }} />
      </div>

      {/* ── STICKY SUBNAV ── */}
      {navSticky && <div style={{ height: 58 }} />}
      <div style={{ position: navSticky ? 'fixed' : 'relative', top: 0, left: 0, right: 0, width: '100%', background: '#fff', borderBottom: '1px solid rgba(0,0,0,0.09)', zIndex: navSticky ? 9999 : 999, boxShadow: navSticky ? '0 2px 20px rgba(0,0,0,0.12)' : 'none', fontFamily: "'Poppins', sans-serif" }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', height: isMobile ? 52 : 58, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: isMobile ? '0 16px' : '0 20px', gap: isMobile ? 12 : 20, overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', flex: 1, gap: isTablet ? 4 : 36, overflowX: isMobile ? 'auto' : 'visible', scrollbarWidth: 'none' }}>
            {navLinks.map((link, i) => (
              <a key={i} href={link.href}
                onMouseEnter={() => setHovNav(i)}
                onMouseLeave={() => setHovNav(null)}
                style={{ display: 'inline-block', fontSize: isMobile ? 12.5 : 14, fontWeight: 500, color: hovNav === i ? ACCENT_TEXT : '#111', textDecoration: 'none', letterSpacing: 0.15, whiteSpace: 'nowrap', padding: isMobile ? '4px 10px' : '4px 0', position: 'relative', transition: 'color 0.2s' }}>
                {link.label}
                {!isMobile && (
                  <span style={{ position: 'absolute', bottom: 0, left: 0, width: hovNav === i ? '100%' : '0%', height: 2, background: ACCENT, borderRadius: 2, transition: 'width 0.25s ease', display: 'block' }} />
                )}
              </a>
            ))}
          </div>
          <a href="#pdf-inquiry" style={{ flexShrink: 0, display: 'inline-block', padding: isMobile ? '7px 14px' : '11px 26px', background: ACCENT, color: '#fff', fontSize: isMobile ? 12 : 14, fontWeight: 600, borderRadius: 50, textDecoration: 'none', whiteSpace: 'nowrap', letterSpacing: 0.2 }}>
            Get a Quote
          </a>
        </div>
      </div>

      {/* ── SECTION 1: FEATURE CARDS ── */}
      <div id="pdf-features" style={{ width: '100%', background: '#f9fafb', padding: isMobile ? '40px 16px' : '72px 20px', fontFamily: "'Poppins', sans-serif" }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div className="ir-reveal" style={{ textAlign: 'center', marginBottom: isMobile ? 36 : 48 }}>
            <h2 style={{ fontSize: isMobile ? 24 : 36, fontWeight: 700, color: '#0f1320', marginBottom: 14 }}>What Readiris PDF Can Do</h2>
            <p style={{ fontSize: 15, color: '#6b7280', lineHeight: 1.65, maxWidth: 560, margin: '0 auto' }}>A single platform that centralises all your document manipulations — from OCR scanning to PDF editing, conversion, annotation, and cloud sharing.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : '1fr 1fr 1fr', gap: isMobile ? 20 : 24 }}>
            {featureCards.map((card, i) => (
              <div key={i} className="ir-reveal" style={{ background: '#fff', borderRadius: 16, border: '1px solid rgba(0,0,0,0.08)', overflow: 'hidden', boxShadow: '0 2px 16px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ width: '100%', height: isMobile ? 200 : 220, overflow: 'hidden', flexShrink: 0 }}>
                  <img src={card.img} alt={card.title} style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center', display: 'block', padding: 16 }} />
                </div>
                <div style={{ padding: isMobile ? '20px 18px 24px' : '24px 24px 28px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: ACCENT_TEXT, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 8 }}>{card.tag}</p>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0f1320', marginBottom: 10, lineHeight: 1.3 }}>{card.title}</h3>
                  <p style={{ fontSize: 13.5, color: '#6b7280', lineHeight: 1.65, marginBottom: 16 }}>{card.desc}</p>
                  <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 7 }}>
                    {card.features.map((f, j) => (
                      <li key={j} style={{ fontSize: 13, fontWeight: 500, color: '#374151', paddingLeft: 16, position: 'relative', lineHeight: 1.4 }}>
                        <span style={{ position: 'absolute', left: 0, top: 6, width: 6, height: 6, borderRadius: '50%', background: ACCENT, display: 'block' }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SECTION 2: LED EDITION SWITCHER ── */}
      <div id="pdf-editions" style={{ width: '100%', background: '#fff', padding: isMobile ? '48px 16px' : '80px 20px', fontFamily: "'Poppins', sans-serif" }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div className="ir-reveal" style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: isMobile ? 24 : 34, fontWeight: 700, color: '#0f1320', marginBottom: 10 }}>Choose Your Edition</h2>
            <p style={{ fontSize: 16, color: '#64748b', maxWidth: 700, lineHeight: 1.7 }}>Both editions are perpetual (lifetime) licences compatible with Windows 10/11 and macOS 10.15+, including Apple M1 &amp; M2 chips.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: isTablet ? 'column-reverse' : 'row', gap: isTablet ? 40 : 60, alignItems: 'center', justifyContent: 'center', minHeight: isTablet ? 'auto' : 460 }}>
            {/* left: edition items */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20, width: '100%' }}>
              {editions.map((ed, i) => (
                <div
                  key={i}
                  className="ir-reveal"
                  onClick={() => switchEdition(i)}
                  style={{ cursor: 'pointer', padding: 24, borderRadius: 16, border: `1px solid ${ledActive === i ? '#e2e8f0' : 'transparent'}`, background: ledActive === i ? '#fff' : 'transparent', boxShadow: ledActive === i ? '0 10px 25px -5px rgba(0,0,0,0.05)' : 'none', transition: 'all 0.3s ease' }}
                >
                  <h4 style={{ color: ACCENT_TEXT, fontSize: 13, textTransform: 'uppercase', marginBottom: 8, letterSpacing: 0.5, fontWeight: 600 }}>{ed.label}</h4>
                  <h3 style={{ fontSize: 22, fontWeight: 600, color: '#0f1320', marginBottom: 14 }}>{ed.title}</h3>
                  <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.9 }}>
                    {ed.intro}<br /><br />
                    {ed.bullets.map((b, j) => <span key={j}>• {b}<br /></span>)}
                  </p>
                </div>
              ))}
            </div>

            {/* right: image */}
            <div style={{ flex: 1.2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src={ledImg}
                alt="Readiris PDF Edition"
                style={{ width: '100%', maxWidth: 560, height: isTablet ? 280 : 400, objectFit: 'contain', borderRadius: 20, padding: 20, opacity: imgFading ? 0 : 1, transition: 'opacity 0.4s ease' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 3A: INQUIRY ── */}
      <div id="pdf-inquiry" style={{ width: '100%', background: 'linear-gradient(90deg, #0b1a2e, #0d223d)', padding: isMobile ? '60px 16px' : '80px 20px', color: '#fff', fontFamily: "'Poppins', sans-serif" }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', display: 'grid', gridTemplateColumns: isTablet ? '1fr' : '1fr 420px', gap: isTablet ? 40 : 60, alignItems: 'center' }}>
          <div className="ir-reveal">
            <h2 style={{ fontSize: isMobile ? 24 : 36, fontWeight: 700, marginBottom: 20, lineHeight: 1.2 }}>Inquire for Readiris PDF Licensing</h2>
            <p style={{ fontSize: isMobile ? 14 : 15, color: '#cbd5e1', lineHeight: 1.7, marginBottom: 20 }}>
              Readiris PDF is available as a perpetual licence — no subscription, no recurring fees. Contact us to discuss pricing for individual, 3-PC, or volume licensing across your organisation.
            </p>
            <div style={{ fontSize: 14, color: '#cbd5e1', lineHeight: 2 }}>
              <strong style={{ color: '#fff', fontSize: 13, letterSpacing: 0.5, textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Licence Options</strong>
              • PDF Essential — 1 PC Perpetual<br />
              • PDF Essential — 3 PC Perpetual<br />
              • PDF Elite — 1 PC Perpetual<br />
              • PDF Elite — 3 PC Perpetual<br />
              • PDF Elite — Volume (10+ users, 1 year maintenance included)
            </div>
          </div>

          <div className="ir-reveal" style={{ background: 'rgba(255,255,255,0.06)', padding: isMobile ? 22 : 30, borderRadius: 14, border: '1px solid rgba(255,255,255,0.1)' }}>
            <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 20, color: '#fff' }}>Send an Inquiry</h3>
            <IrisForm />
          </div>
        </div>
      </div>

      {/* ── SECTION 3B: TABS ── */}
      <div id="pdf-whats-new" style={{ background: '#f8fafc', width: '100%', fontFamily: "'Poppins', sans-serif" }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '40px 16px' : '72px 20px', color: '#333' }}>

          {/* tab nav */}
          <div style={{ display: 'flex', flexWrap: 'wrap', borderBottom: '2px solid #eee', marginBottom: 40, gap: 10 }}>
            {["What's New in 2026", 'System Requirements'].map((label, i) => (
              <button key={i} onClick={() => setActiveTab(i)} style={{ padding: '15px 22px', cursor: 'pointer', fontWeight: 700, fontSize: 14, textTransform: 'uppercase', letterSpacing: 1, color: activeTab === i ? ACCENT_TEXT : '#888', border: 'none', background: 'none', fontFamily: 'inherit', position: 'relative' }}>
                {label}
                {activeTab === i && <span style={{ position: 'absolute', bottom: -2, left: 0, width: '100%', height: 3, background: ACCENT, display: 'block' }} />}
              </button>
            ))}
          </div>

          {/* Tab 0: What's New */}
          {activeTab === 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: isTablet ? '1fr' : '1fr 2fr', gap: 50, animation: 'irFadeIn 0.5s ease' }}>
              <div>
                <h2 style={{ fontSize: isMobile ? 24 : 34, color: '#000', marginBottom: 20, lineHeight: 1.2, fontWeight: 700 }}>Edition 2026 Updates</h2>
                <p style={{ fontSize: 15, lineHeight: 1.8, color: '#555' }}>The latest Readiris PDF release brings powerful new capabilities and significant improvements across OCR, UI, and document management.</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 28 }}>
                {/* new features card */}
                <div style={{ background: '#fff', border: '1px solid #eee', padding: 24, borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
                  <h4 style={{ fontSize: 16, marginBottom: 14, color: '#000', fontWeight: 700 }}>New Features</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
                    {whatsnewItems.map((item, i) => (
                      <li key={i} style={{ fontSize: 13.5, color: '#374151', lineHeight: 1.5, display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                        <span style={{ display: 'inline-block', background: ACCENT, color: '#fff', fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', padding: '2px 8px', borderRadius: 3, flexShrink: 0 }}>New</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* unique & improved card */}
                <div style={{ background: '#fff', border: '1px solid #eee', padding: 24, borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
                  <h4 style={{ fontSize: 16, marginBottom: 14, color: '#000', fontWeight: 700 }}>Unique &amp; Improved</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
                    {improvedItems.map((item, i) => (
                      <li key={i} style={{ fontSize: 13.5, color: '#374151', lineHeight: 1.5, display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                        {item.unique ? (
                          <span style={{ display: 'inline-block', background: '#1a7a4a', color: '#fff', fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', padding: '2px 8px', borderRadius: 3, flexShrink: 0 }}>Unique</span>
                        ) : (
                          <span style={{ width: 6, height: 6, borderRadius: '50%', background: ACCENT, flexShrink: 0, marginTop: 5, display: 'inline-block' }} />
                        )}
                        {item.text}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Tab 1: System Requirements */}
          {activeTab === 1 && (
            <div style={{ display: 'grid', gridTemplateColumns: isTablet ? '1fr' : '1fr 2fr', gap: 50, animation: 'irFadeIn 0.5s ease' }}>
              <div>
                <h2 style={{ fontSize: isMobile ? 24 : 34, color: '#000', marginBottom: 20, lineHeight: 1.2, fontWeight: 700 }}>System Requirements</h2>
                <p style={{ fontSize: 15, lineHeight: 1.8, color: '#555' }}>Readiris PDF runs on both Windows and macOS. Ensure your system meets the minimum specifications for a smooth experience.</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 28 }}>
                <div style={{ background: '#fff', border: '1px solid #eee', padding: 24, borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
                  <h4 style={{ fontSize: 16, marginBottom: 14, color: '#000', fontWeight: 700 }}>Windows</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
                    {sysreqWindows.map((item, i) => <Bullet key={i} text={item} />)}
                  </ul>
                </div>
                <div style={{ background: '#fff', border: '1px solid #eee', padding: 24, borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
                  <h4 style={{ fontSize: 16, marginBottom: 14, color: '#000', fontWeight: 700 }}>macOS</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
                    {sysreqMac.map((item, i) => <Bullet key={i} text={item} />)}
                  </ul>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
