'use client';

import { useState, useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────
   THEME
───────────────────────────────────────────── */
const u = {
  bg:     '#ffffff',
  alt:    '#f4f4f4',
  alt2:   '#f8fafc',
  navy:   '#0b1a2e',
  accent: '#0088cc',
  line:   'rgba(0,0,0,0.08)',
  text:   '#0f1320',
  dim:    '#6b7280',
  mute:   '#9ca3af',
};

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const heroSlides = [
  {
    id: 'interactive',
    badge: 'Official Distributor',
    lines: ['Smart', 'Interactive Display'],
    accentLine: 1,
    desc: 'Empower classrooms with smart collaboration, wireless sharing, and immersive interactive learning.',
    cta: { label: 'View Products', href: '#ifpd', solid: true },
    bg: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1782164332/20220520_1831889_corporate_933925_521045_0_ysracc.webp',
  },
  {
    id: 'collaboration',
    badge: 'Interactive ViewBoards',
    lines: ['Built for', 'Collaboration.'],
    accentLine: 1,
    desc: 'Transform every meeting and classroom with next-generation interactive displays designed for the modern workspace.',
    cta: { label: 'Explore Solutions', href: '#conferencing', solid: true },
    bg: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1782164332/20220520_1831897_education_933929_521045_0_dxqgre.webp',
  },
  {
    id: 'monitors',
    badge: 'Professional Monitors',
    lines: ['Precision', 'in Every Pixel.'],
    accentLine: 1,
    desc: 'From color-accurate design monitors to ultra-wide productivity panels — UNV delivers clarity that powers your best work.',
    cta: { label: 'View Products', href: '#monitors', solid: true },
    bg: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1782164332/20220520_1831891_control-room_933926_521045_0_pkrokg.webp',
  },
];

const ifpdCards = [
  {
    id: 'ue2',
    title: 'U-E2 Series',
    desc: 'Empowering modern classrooms with interactive displays designed for collaboration, creativity, engagement, seamless teaching, and smarter learning.',
    bullets: [
      'Available in 65", 75" and 86" inches.',
      'Ultra-clear 4K interactive display for immersive classroom experiences',
      'Multi-touch collaboration for teachers and students',
      'Wireless screen sharing and smart annotation tools',
    ],
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1782164677/20220727_1842574_1_933259_521044_0_k0twf2.webp',
  },
  {
    id: 'highlights',
    title: 'Highlights',
    desc: 'UNV InstaHub makes content sharing and brainstorming fluent and convenient. It introduces new style to enhance the conference efficiency.',
    bullets: [
      'Inspiration in teaching',
      'The touchscreen makes it fluent to write, modify and save.',
      'Master the IFPD in 1 minute with the easy & friendly UI just like Android phone.',
      'The brand-new appearance design is concise and generous.',
    ],
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1782164677/20220727_1842575_2_933260_521044_0_xcnyxx.webp',
  },
];

const featuredProducts = [
  { id: 'mw3565', model: 'MW3565-U-E2', desc: '65 Inch Smart Interactive Display', href: '/unv/mw3565-u-e2', image: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1782164464/unv-65-scaled_ognvqd.webp' },
  { id: 'mw3575', model: 'MW3575-U-E2', desc: '75 Inch Smart Interactive Display', href: '/unv/mw3575-u-e2', image: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1782164464/unv-75-scaled_sirrln.webp' },
  { id: 'mw3586', model: 'MW3586-U-E2', desc: '86 Inch Smart Interactive Display', href: '/unv/mw3586-u-e2', image: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1782164463/unv-86-scaled_iuohon.webp' },
];

const confItems = [
  {
    eyebrow: 'Auto Framing',
    title: 'Intelligent tracking',
    desc: 'Built-in AI algorithms support speaker tracking, auto framing and close up group which make the meeting alive.',
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1782165103/20220819_1851014_2_941490_521044_0_vcftkj.webp',
  },
  {
    eyebrow: 'Plug and Play',
    title: 'Easy-to-use',
    desc: 'The full line of UNV video conferencing devices supports USB plug and play without any driver.',
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1782165102/20220901_1854119_6_941489_521044_0_plqa6z.webp',
  },
  {
    eyebrow: 'Extended Pickup',
    title: 'Unimagined pickup range',
    desc: 'The industry-leading daisy-chain technology makes our device support 5 units cascaded, so that to evenly pickup sounds all over the meeting room.',
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1782165101/20220810_1842768_5_941488_521044_0_qkpgw7.webp',
  },
];

const ledSeries = [
  { id: 'xea',  label: 'XEA Series',    title: 'XEA Series',    desc: 'Explore the XEA Series — designed for versatile display solutions across a range of environments.',      productDesc: 'High-performance display engineered for modern spaces.',          image: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1782165238/20250807_2000951_XEA_1047277_521044_0_umwnae.webp' },
  { id: 'u',    label: 'U Series',       title: 'U Series',       desc: 'The U Series delivers reliable, high-quality visuals for professional environments.',                      productDesc: 'Built for clarity and consistency across every application.',       image: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1782165237/20250807_2000950_us_973358_521044_0_uy6baj.webp' },
  { id: 'fe',   label: 'FE Series',      title: 'FE Series',      desc: 'The FE Series offers flexible display options tailored for a wide variety of settings.',                   productDesc: 'Flexible and feature-rich displays for demanding environments.',     image: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1782165236/20230711_1883823_3FE-FL_973359_521044_0_brrs7x.webp' },
  { id: 'rerl', label: 'RE/RL Series',   title: 'RE/RL Series',   desc: 'The RE/RL Series combines robust engineering with outstanding visual performance.',                        productDesc: 'Durable and dependable displays for any professional setting.',      image: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1782165236/20240823_1907099_02_973360_521044_0_wzvdik.webp' },
  { id: 'xa',   label: 'XA Series',      title: 'XA Series',      desc: 'The XA Series is crafted for environments that demand premium display quality.',                           productDesc: 'Premium displays built to impress in any space.',                   image: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1782165235/20250807_2000956_XA_1047279_521044_0_uf8xhk.webp' },
  { id: 'kg',   label: 'KG Series',      title: 'KG Series',      desc: 'The KG Series brings innovation and precision to every display application.',                              productDesc: 'Innovative display technology for modern professional use.',         image: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1782165234/20250807_2000954_KG_1047281_521044_0_vns5zj.webp' },
  { id: 'kl2',  label: 'KL2 Series',     title: 'KL2 Series',     desc: 'The KL2 Series sets a new standard in display excellence and reliability.',                               productDesc: 'Next-generation displays delivering excellence in every detail.',    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1782165234/20250807_2000955_KL2_1047282_521044_0_lryfx5.webp' },
];

const lcdItems = [
  { num: '01', label: 'Immersive visual experience',    tag: 'Immersive visual experience', title: 'Premium option for various business needs',               desc: 'UNV LCD video wall are widely used in industries and business scenarios from shopping malls to meeting rooms, control rooms and more. The seamless design delivers accurate content and provides immersive viewing experience.', imgs: [{ src: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1782165502/20220506_1831156_2-1_933218_521044_0_mpzwro.webp', cap: 'Meeting Room' }, { src: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1782165501/20220506_1831158_2-2_933218_521044_0_vnhqoh.webp', cap: 'Supermarket' }, { src: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1782165500/20220506_1831159_2-3_933218_521044_0_feqnxk.webp', cap: 'Lecture Hall' }] },
  { num: '02', label: 'Brilliant content from any angle', tag: 'Viewing angle',             title: 'Brilliant content from any angle',                        desc: 'BOE ADS panel technology enables better control of liquid crystals, which in turn allows the screen to be viewed from virtually any angle. Audiences can get clear details and vivid colors regardless of where the screen is located.', imgs: [{ src: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1782165499/20220506_1831164_4-1_933220_521044_0_qvp4hs.webp', cap: '' }] },
  { num: '03', label: 'Vivid image for all time',        tag: 'Anti-glare panel',           title: 'Vivid image for all time',                                desc: 'Anti-glare LCD panel is used to reduce the intensity of reflected light, improve light transmittance and contrast. Under any indoor conditions and any time in a day, it can maintain excellent display effect.', imgs: [{ src: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1782165499/20220506_1831184_5-1_933221_521044_0_ghm8yf.webp', cap: '' }] },
  { num: '04', label: 'Enhanced image performance',      tag: 'Picture enhancement',        title: 'Enhanced image performance',                              desc: 'Our advanced picture enhancement technology ensures all content are clearly delivered. The image enhance mode improves color saturation and contrast, lightens the dark images, while not missing any details.', imgs: [{ src: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1782165498/20220506_1831185_6-1_933222_521044_0_bkm1ym.webp', cap: '' }] },
  { num: '05', label: 'Support eye protection mode',     tag: 'Blue light reduction',       title: 'Support eye protection mode',                             desc: 'UNV LCD video wall supports eye protection mode, which adjusts the color temperature through a specific algorithm to reduce the blue light emitted by the screen to achieve the effect of eye protection.', imgs: [{ src: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1782165497/20220506_1831169_7-1_933223_521044_0_f578zt.webp', cap: '' }] },
  { num: '06', label: 'Simplified operation',            tag: 'Daisy chain HDMI',           title: 'Advanced presentation, simplified operation',             desc: 'Daisy chain design through HDMI ports enables the display to present content on multiple screens without an external video processor.', imgs: [{ src: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1782165496/20220506_1831170_8-1_933224_521044_0_vywofy.webp', cap: '' }] },
  { num: '07', label: 'Digital content protection',      tag: 'HDCP technology',            title: 'HDCP: Digital content protection technology',             desc: 'HDCP technology ensures digitized video and sound data is not illegally copied when transmitted through the transmission interface. Compliant with HDCP2.3, HDCP2.2 and HDCP1.4.', imgs: [{ src: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1782165496/20240912_1910714_df_999728_521044_0_ma5lb8.webp', cap: '' }] },
  { num: '08', label: 'Abundant interfaces',             tag: 'DVI · VGA · HDMI · DP',     title: 'Abundant interfaces: Support 4K signal input',            desc: 'Our LCD–E model currently supports DVI, VGA, HDMI, DP rich interfaces and supports 4K signal input. HDMI and DP support 4K signal input.', imgs: [{ src: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1782165495/20240912_1910722_rt_999775_521044_0_gjgoye.webp', cap: '' }] },
];

const controllerItems = [
  { title: 'Excellent splicing performance', panelTitle: 'Splicing: multiple screens splicing can be combined into a big single screen.', img: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1782165716/20220507_1831224_1-1_933271_521044_0_yta6af.webp' },
  { title: 'Flexible roaming experience',   panelTitle: 'Roaming: the window can be dragged to anywhere in the screen.',                  img: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1782165715/20220507_1831225_1-2_933272_521044_0_endxzr.webp' },
  { title: 'Open windows freely',           panelTitle: 'Open window: open windows at anywhere in the screen.',                           img: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1782165714/20220507_1831226_1-3_933273_521044_0_rbu53o.webp' },
  { title: 'Picture in picture',            panelTitle: 'Picture in picture: one picture can be displayed above another one.',            img: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1782165713/20220507_1831227_1-4_933274_521044_0_eulcyw.webp' },
];

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function UNVPage() {

  const [heroIdx, setHeroIdx]       = useState(0);
  const [progress, setProgress]     = useState(0);
  const rafRef                      = useRef<number | null>(null);
  const startRef                    = useRef<number | null>(null);
  const heroRef                     = useRef<HTMLElement>(null);
  const DURATION                    = 5000;

  const [isSticky, setIsSticky]     = useState(false);
  const [confTab, setConfTab]       = useState(0);
  const [confFade, setConfFade]     = useState(false);
  const [ledTab, setLedTab]         = useState(0);
  const [lcdItem, setLcdItem]       = useState(0);
  const [monTab, setMonTab]         = useState(0);
  const [ctItem, setCtItem]         = useState(0);
  const [formState, setFormState]   = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

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
    if (isSticky) document.body.classList.add('ka-subnav-active');
    else          document.body.classList.remove('ka-subnav-active');
    return () => document.body.classList.remove('ka-subnav-active');
  }, [isSticky]);

  /* ── Scroll-reveal ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('unv-visible'); observer.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.unv-reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* ── Conferencing image swap ── */
  const switchConf = (idx: number) => {
    if (idx === confTab) return;
    setConfFade(true);
    setTimeout(() => { setConfTab(idx); setConfFade(false); }, 300);
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
    <main style={{ background: u.bg, color: u.text, fontFamily: 'var(--font-poppins)', overflowX: 'hidden' }}>

      {/* ══════════════════════════════════════════
          HERO SLIDER
      ══════════════════════════════════════════ */}
      <section ref={heroRef} className="unv-hero" style={{ position: 'relative', width: '100%', overflow: 'hidden', background: '#000', height: 680 }}>

        {heroSlides.map((s, i) => (
          <div key={s.id} className="unv-slide"
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
            <div className="unv-vignette" style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(90deg, rgba(0,0,0,0.72) 38%, transparent 80%)',
            }} />
            <div className="unv-hero-container"
                 style={{ position: 'relative', zIndex: 3, width: '100%', maxWidth: 1220, margin: '0 auto', padding: '0 20px' }}>
              <div className="unv-hero-content"
                   style={{
                     maxWidth: 580,
                     opacity: i === heroIdx ? 1 : 0,
                     transform: i === heroIdx ? 'translateY(0)' : 'translateY(24px)',
                     transition: 'opacity 0.7s ease 0.4s, transform 0.7s ease 0.4s',
                   }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8, background: u.accent, color: '#fff',
                  fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase',
                  padding: '5px 12px', marginBottom: 18, borderRadius: 2,
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff', opacity: 0.9, display: 'inline-block', animation: 'unvPulse 2s infinite' }} />
                  {s.badge}
                </span>
                <h1 className="unv-hero-heading"
                    style={{ fontSize: 'clamp(40px, 6vw, 78px)', color: '#fff', lineHeight: 0.95, marginBottom: 18, fontWeight: 700, letterSpacing: 1 }}>
                  {s.lines.map((line, li) => (
                    <span key={li} style={{ display: 'block', color: li === s.accentLine ? u.accent : '#fff' }}>{line}</span>
                  ))}
                </h1>
                <p className="unv-hero-desc"
                   style={{ fontSize: 15, color: 'rgba(255,255,255,0.72)', lineHeight: 1.65, marginBottom: 32, fontWeight: 300, maxWidth: 420, width: '100%' }}>
                  {s.desc}
                </p>
                {s.cta && (
                  <a href={s.cta.href} className="unv-hero-btn"
                     onClick={e => { e.preventDefault(); document.querySelector(s.cta!.href)?.scrollIntoView({ behavior: 'smooth' }); }}
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
                       el.style.background = u.accent; el.style.borderColor = u.accent; el.style.color = '#fff';
                     }}
                     onMouseLeave={e => {
                       const el = e.currentTarget as HTMLAnchorElement;
                       el.style.background = s.cta!.solid ? '#fff' : 'transparent';
                       el.style.borderColor = '#fff';
                       el.style.color = s.cta!.solid ? '#0d0d0d' : '#fff';
                     }}>
                    {s.cta.label}
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Dots */}
        <div className="unv-dots"
             style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(calc(-570px + 20px))', display: 'flex', gap: 10, zIndex: 10 }}>
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => goSlide(i)}
                    style={{
                      width: 10, height: 10, borderRadius: '50%', padding: 0, border: 'none', cursor: 'pointer',
                      background: i === heroIdx ? u.accent : 'rgba(255,255,255,0.35)',
                      transform: i === heroIdx ? 'scale(1.3)' : 'scale(1)',
                      transition: 'background 0.3s, transform 0.3s',
                    }} />
          ))}
        </div>

        {/* Progress bar */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, height: 3,
          background: u.accent, width: `${progress}%`,
          zIndex: 10, transition: 'width 0.1s linear',
        }} />
      </section>

      {/* ══════════════════════════════════════════
          STICKY SUB-NAV
      ══════════════════════════════════════════ */}
      {isSticky && <div className="unv-nav-placeholder" style={{ height: 58 }} />}
      <div className="unv-nav-wrap" style={{
        width: '100%',
        background: '#fff',
        borderBottom: `1px solid ${u.line}`,
        position: isSticky ? 'fixed' : 'relative',
        top: isSticky ? 0 : undefined,
        left: 0, right: 0, zIndex: 1001,
        boxShadow: isSticky ? '0 2px 20px rgba(0,0,0,0.12)' : 'none',
        transition: 'box-shadow 0.3s ease',
      }}>
        <div className="unv-nav-inner"
             style={{
               display: 'flex', alignItems: 'center', justifyContent: 'space-between',
               flexWrap: 'nowrap', gap: 20,
               maxWidth: 1140, width: '100%', margin: '0 auto',
               height: 58, padding: '0 20px',
             }}>
          <ul className="unv-nav-links"
              style={{
                display: 'flex', alignItems: 'center', flex: 1,
                gap: 36, listStyle: 'none', margin: 0, padding: 0,
                overflowX: 'auto', scrollbarWidth: 'none',
              }}>
            {[
              { label: 'IFPD',                  href: '#ifpd' },
              { label: 'Video Conferencing',     href: '#conferencing' },
              { label: 'LED Display',            href: '#leddisplay' },
              { label: 'LCD Video Wall',         href: '#lcdvideowall' },
              { label: 'Monitors',               href: '#monitors' },
              { label: 'Controller',             href: '#controller' },
            ].map(link => (
              <li key={link.href} style={{ flexShrink: 0 }}>
                <a href={link.href}
                   style={{
                     display: 'inline-block', fontSize: 14, fontWeight: 500,
                     color: '#111',
                     textDecoration: 'none', letterSpacing: '0.15px',
                     whiteSpace: 'nowrap', position: 'relative', paddingBottom: 3,
                     transition: 'color 0.2s',
                   }}
                   onMouseEnter={e => {
                     const el = e.currentTarget as HTMLAnchorElement;
                     el.style.color = u.accent;
                     (el.querySelector('.unv-underline') as HTMLElement | null)?.style.setProperty('width', '100%');
                   }}
                   onMouseLeave={e => {
                     const el = e.currentTarget as HTMLAnchorElement;
                     el.style.color = '#111';
                     (el.querySelector('.unv-underline') as HTMLElement | null)?.style.setProperty('width', '0');
                   }}>
                  {link.label}
                  <span className="unv-underline" style={{
                    position: 'absolute', bottom: 0, left: 0, width: 0, height: 2,
                    background: u.accent, borderRadius: 2, transition: 'width 0.25s ease',
                  }} />
                </a>
              </li>
            ))}
          </ul>
          <a href="#leddisplay" className="unv-nav-cta"
             style={{
               flexShrink: 0, padding: '11px 26px',
               background: u.accent, color: '#fff',
               fontSize: 14, fontWeight: 600,
               textDecoration: 'none', borderRadius: 50, whiteSpace: 'nowrap',
               transition: 'transform 0.15s',
             }}
             onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)'; }}
             onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)'; }}>
            Get a Quote
          </a>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          IFPD
      ══════════════════════════════════════════ */}
      <section id="ifpd" style={{ width: '100%', padding: '72px 20px', background: u.bg }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>

          <div className="unv-reveal" style={{ textAlign: 'center', marginBottom: 48 }}>
            <img src="https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1782164463/unv_omj1kx.webp" alt="UNV Logo"
                 style={{ maxHeight: 80, width: 'auto', display: 'block', margin: '0 auto 20px' }} />
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700, color: u.text, lineHeight: 1.2, marginBottom: 14 }}>
              Interactive Flat-Panel Display (IFPD)
            </h2>
            <p style={{ fontSize: 15, color: u.dim, lineHeight: 1.65, maxWidth: 520, margin: '0 auto' }}>
              Transform meetings and classrooms with seamless 4K collaboration and interactive smart display technology.
            </p>
          </div>

          <div className="unv-ifpd-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
            {ifpdCards.map(card => (
              <div key={card.id}
                   style={{
                     background: '#fff', borderRadius: 16, border: `1px solid ${u.line}`,
                     overflow: 'hidden', boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
                     display: 'flex', flexDirection: 'column',
                     transition: 'box-shadow 0.3s ease, transform 0.3s ease',
                   }}
                   onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = '0 8px 32px rgba(0,0,0,0.12)'; el.style.transform = 'translateY(-4px)'; }}
                   onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = '0 2px 16px rgba(0,0,0,0.06)'; el.style.transform = 'translateY(0)'; }}>
                <div className="unv-ifpd-img" style={{ width: '100%', height: 260, overflow: 'hidden', flexShrink: 0 }}>
                  <img src={card.image} alt={card.title}
                       style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }}
                       onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)'; }}
                       onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; }} />
                </div>
                <div style={{ padding: '28px 28px 32px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: u.text, marginBottom: 12, lineHeight: 1.25 }}>{card.title}</h3>
                  <p style={{ fontSize: 14, color: u.dim, lineHeight: 1.65, marginBottom: 20 }}>{card.desc}</p>
                  <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {card.bullets.map((b, bi) => (
                      <li key={bi} style={{ fontSize: 13.5, fontWeight: 500, color: '#374151', paddingLeft: 18, position: 'relative', lineHeight: 1.4 }}>
                        <span style={{ position: 'absolute', left: 0, top: 7, width: 6, height: 6, borderRadius: '50%', background: u.accent, display: 'block' }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FEATURED PRODUCTS
      ══════════════════════════════════════════ */}
      <section style={{ width: '100%', padding: '72px 20px', background: u.alt }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>

          <div className="unv-reveal" style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 700, color: u.text }}>Featured Products</h2>
          </div>

          <div className="unv-prod-grid unv-reveal unv-reveal-d1" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, maxWidth: 855, margin: '0 auto' }}>
            {featuredProducts.map(p => (
              <a key={p.id} href={p.href} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                <div style={{
                  background: '#fff', borderRadius: 14, border: `1px solid ${u.line}`,
                  overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                  display: 'flex', flexDirection: 'column', cursor: 'pointer',
                  transition: 'box-shadow 0.3s ease, transform 0.3s ease',
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = '0 8px 28px rgba(0,0,0,0.11)'; el.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = '0 2px 12px rgba(0,0,0,0.05)'; el.style.transform = 'translateY(0)'; }}>
                  <div style={{ width: '100%', aspectRatio: '4/3', overflow: 'hidden', background: '#e8e8e8', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                    <img src={p.image} alt={p.model} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                  </div>
                  <div style={{ padding: '22px 20px 26px', textAlign: 'center' }}>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: u.text, marginBottom: 8, lineHeight: 1.3 }}>{p.model}</h3>
                    <p style={{ fontSize: 13, color: u.dim, lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          VIDEO CONFERENCING
      ══════════════════════════════════════════ */}
      <section id="conferencing" style={{ width: '100%', padding: '80px 20px', background: u.bg }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>

          <h2 className="unv-reveal" style={{ fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 700, color: u.text, marginBottom: 40 }}>
            Video Conferencing Products
          </h2>

          <div className="unv-conf-layout unv-reveal unv-reveal-d1" style={{ display: 'flex', gap: 60, alignItems: 'center', minHeight: 500 }}>

            {/* Left: items */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {confItems.map((item, i) => (
                <div key={i} onClick={() => switchConf(i)}
                     style={{
                       padding: 24, borderRadius: 12, cursor: 'pointer',
                       border: `1px solid ${i === confTab ? 'rgba(0,136,204,0.2)' : 'transparent'}`,
                       background: i === confTab ? '#fff' : 'transparent',
                       boxShadow: i === confTab ? '0 10px 25px -5px rgba(0,0,0,0.05)' : 'none',
                       transition: 'all 0.3s ease',
                     }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: u.accent, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>
                    {item.eyebrow}
                  </p>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: u.text, marginBottom: 10, lineHeight: 1.3 }}>{item.title}</h3>
                  <p style={{ fontSize: 14, color: u.dim, lineHeight: 1.65, margin: 0 }}>{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Right: image */}
            <div className="unv-conf-img-wrap" style={{ flex: 1.2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img className="unv-conf-img" src={confItems[confTab].image} alt={confItems[confTab].title}
                   style={{
                     width: '100%', maxWidth: 600, height: 450, objectFit: 'cover',
                     borderRadius: 20,
                     opacity: confFade ? 0 : 1,
                     transition: 'opacity 0.3s ease',
                   }} />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          LED DISPLAY (dark section + form)
      ══════════════════════════════════════════ */}
      <section id="leddisplay" style={{ width: '100%', padding: '80px 20px', background: `linear-gradient(90deg, ${u.navy}, #0d223d)`, color: '#fff' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div className="unv-led-inner unv-reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: 60, alignItems: 'center' }}>

            {/* Left */}
            <div>
              <h2 style={{ fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 700, marginBottom: 20, color: '#fff', lineHeight: 1.2 }}>
                LED Display
              </h2>
              <p style={{ fontSize: 15, color: '#cbd5e1', lineHeight: 1.7, marginBottom: 30 }}>
                Transform complex data into stunning real-time visuals with UNV Data Visualization LED Displays, delivering seamless clarity, vibrant colors, intelligent control, and immersive large-screen performance for command centers, enterprises, retail, and digital environments.
              </p>
              <div>
                <h4 style={{ fontSize: 16, fontWeight: 600, marginBottom: 5, color: '#fff' }}>
                  Commercial grade display brings immersive experience.
                </h4>
              </div>
            </div>

            {/* Right: form */}
            <div style={{
              background: 'rgba(255,255,255,0.06)', padding: 30, borderRadius: 14,
              border: '1px solid rgba(255,255,255,0.1)',
            }}>
              <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 20, color: '#fff' }}>Inquire for Distribution</h3>

              {formState === 'success' ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ fontSize: 36, marginBottom: 12 }}>✓</div>
                  <p style={{ fontSize: 16, fontWeight: 600, color: '#fff', marginBottom: 8 }}>Inquiry sent!</p>
                  <p style={{ fontSize: 13, color: '#94a3b8' }}>We will get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <input name="name" type="text" placeholder="Full Name" required
                         style={{ width: '100%', padding: '12px 14px', borderRadius: 6, border: 'none', background: 'rgba(255,255,255,0.12)', color: '#fff', fontSize: 14, outline: 'none' }} />
                  <input name="email" type="email" placeholder="Business Email" required
                         style={{ width: '100%', padding: '12px 14px', borderRadius: 6, border: 'none', background: 'rgba(255,255,255,0.12)', color: '#fff', fontSize: 14, outline: 'none' }} />
                  <select name="category" required
                          style={{ width: '100%', padding: '12px 14px', borderRadius: 6, border: 'none', background: 'rgba(255,255,255,0.12)', color: '#e5e7eb', fontSize: 14, outline: 'none' }}>
                    <option value="" style={{ background: '#fff', color: '#000' }}>Select Product Category</option>
                    <option style={{ background: '#fff', color: '#000' }}>IFPD</option>
                    <option style={{ background: '#fff', color: '#000' }}>Video Conferencing</option>
                    <option style={{ background: '#fff', color: '#000' }}>LED Display</option>
                    <option style={{ background: '#fff', color: '#000' }}>LCD Video Wall</option>
                    <option style={{ background: '#fff', color: '#000' }}>Monitors</option>
                    <option style={{ background: '#fff', color: '#000' }}>Controllers</option>
                  </select>
                  <button type="submit" disabled={formState === 'sending'}
                          style={{
                            marginTop: 10, padding: 13, background: u.accent, color: '#fff',
                            fontWeight: 600, border: 'none', borderRadius: 6, cursor: 'pointer',
                            letterSpacing: 1, fontSize: 13, textTransform: 'uppercase',
                            opacity: formState === 'sending' ? 0.7 : 1, transition: 'opacity 0.2s',
                          }}>
                    {formState === 'sending' ? 'Sending…' : 'Send Inquiry'}
                  </button>
                  {formState === 'error' && (
                    <p style={{ fontSize: 13, color: '#fca5a5', textAlign: 'center', margin: 0 }}>
                      Something went wrong. Please try again.
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          LED SERIES TABS
      ══════════════════════════════════════════ */}
      <section style={{ width: '100%', padding: '72px 20px', background: u.bg }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>

          {/* Tab nav */}
          <div className="unv-led-tabs" style={{ display: 'flex', flexWrap: 'wrap', borderBottom: `2px solid #eee`, marginBottom: 40 }}>
            {ledSeries.map((s, i) => (
              <button key={s.id} onClick={() => setLedTab(i)}
                      style={{
                        padding: '15px 22px', cursor: 'pointer', fontWeight: 700, fontSize: 14,
                        textTransform: 'uppercase', letterSpacing: 1,
                        color: i === ledTab ? u.accent : '#888',
                        border: 'none', background: 'none', position: 'relative',
                        fontFamily: 'var(--font-poppins)',
                        borderBottom: i === ledTab ? `3px solid ${u.accent}` : '3px solid transparent',
                        marginBottom: -2, transition: 'color 0.2s',
                      }}>
                {s.label}
              </button>
            ))}
          </div>

          {/* Active panel */}
          <div className="unv-led-panel unv-reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 50, alignItems: 'start' }}>
            <div>
              <h2 style={{ fontSize: 32, fontWeight: 700, color: u.text, marginBottom: 20, lineHeight: 1.2 }}>
                {ledSeries[ledTab].title}
              </h2>
              <p style={{ fontSize: 16, color: u.dim, lineHeight: 1.6 }}>
                {ledSeries[ledTab].desc}
              </p>
            </div>
            <div>
              <div style={{ background: '#fff', border: `1px solid #eee`, padding: 20, textAlign: 'left' }}>
                <img src={ledSeries[ledTab].image} alt={ledSeries[ledTab].title}
                     style={{ width: '100%', height: 'auto', display: 'block', marginBottom: 20 }} />
                <h4 style={{ fontSize: 18, fontWeight: 700, color: u.text, margin: '10px 0' }}>{ledSeries[ledTab].title}</h4>
                <p style={{ fontSize: 14, color: u.dim, margin: 0 }}>{ledSeries[ledTab].productDesc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          LCD VIDEO WALL
      ══════════════════════════════════════════ */}
      <section id="lcdvideowall" style={{ width: '100%', padding: '72px 20px', background: u.alt }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>

          <div className="unv-reveal" style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 700, color: u.text, marginBottom: 6 }}>LCD Video Wall</h2>
            <p style={{ fontSize: 15, color: u.dim, margin: 0 }}>See more. Experience more.</p>
          </div>

          <div className="unv-lcd-body" style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', border: `1px solid #e5e7eb`, borderRadius: 8, overflow: 'hidden', minHeight: 520, background: '#fff' }}>

            {/* Left: list */}
            <div style={{ borderRight: `1px solid #e5e7eb`, display: 'flex', flexDirection: 'column' }}>
              {lcdItems.map((item, i) => (
                <div key={i} onClick={() => setLcdItem(i)}
                     style={{
                       display: 'flex', alignItems: 'center', gap: 14, padding: '18px 24px',
                       cursor: 'pointer', borderBottom: i < lcdItems.length - 1 ? `1px solid #e5e7eb` : 'none',
                       background: i === lcdItem ? '#f0f9ff' : '#fff',
                       transition: 'background 0.2s',
                     }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: u.accent, letterSpacing: 1, minWidth: 24 }}>{item.num}</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: i === lcdItem ? u.accent : '#1f2937', flex: 1, lineHeight: 1.4 }}>{item.label}</span>
                  <span style={{ fontSize: 18, color: i === lcdItem ? u.accent : '#d1d5db', transform: i === lcdItem ? 'rotate(90deg)' : 'none', transition: 'transform 0.3s, color 0.3s' }}>›</span>
                </div>
              ))}
            </div>

            {/* Right: panel */}
            <div style={{ background: u.alt2, display: 'flex', flexDirection: 'column', padding: '36px 36px 28px', gap: 20 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: u.accent, textTransform: 'uppercase', letterSpacing: 1, margin: 0 }}>
                {lcdItems[lcdItem].tag}
              </p>
              <h3 style={{ fontSize: 22, fontWeight: 700, color: u.text, margin: 0, lineHeight: 1.3 }}>
                {lcdItems[lcdItem].title}
              </h3>
              <p style={{ fontSize: 14, color: u.dim, lineHeight: 1.75, margin: 0 }}>
                {lcdItems[lcdItem].desc}
              </p>
              <div className="unv-lcd-imgs" style={{ display: 'flex', gap: 12, marginTop: 'auto', paddingTop: 20 }}>
                {lcdItems[lcdItem].imgs.map((img, ii) => (
                  <div key={ii} style={{ flex: 1, borderRadius: 6, overflow: 'hidden', border: `1px solid #e5e7eb`, background: '#fff', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ flex: 1, background: '#f8f9fb', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: lcdItems[lcdItem].imgs.length === 1 ? 0 : 4 }}>
                      <img src={img.src} alt={img.cap || lcdItems[lcdItem].title}
                           style={{ width: '100%', height: 'auto', maxHeight: lcdItems[lcdItem].imgs.length === 1 ? 260 : 200, objectFit: 'contain', display: 'block' }} />
                    </div>
                    {img.cap && (
                      <div style={{ fontSize: 11, fontWeight: 700, textAlign: 'center', background: u.accent, color: '#fff', padding: '6px 0', letterSpacing: 0.5, textTransform: 'uppercase' }}>
                        {img.cap}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MONITORS
      ══════════════════════════════════════════ */}
      <section id="monitors" style={{ width: '100%', padding: '72px 20px', background: u.bg }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>

          <div className="unv-reveal" style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 700, color: u.text, marginBottom: 6 }}>Monitors</h2>
            <p style={{ fontSize: 15, color: u.dim, margin: 0 }}>Professional displays engineered for every environment.</p>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
            {['CCTV Monitor', 'IT Monitor'].map((label, i) => (
              <button key={i} onClick={() => setMonTab(i)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 10, padding: '10px 24px',
                        borderRadius: 4, cursor: 'pointer', fontFamily: 'var(--font-poppins)',
                        border: `1.5px solid ${i === monTab ? u.accent : '#e5e7eb'}`,
                        background: i === monTab ? u.accent : '#fff',
                        transition: 'all 0.2s',
                      }}>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: i === monTab ? 'rgba(255,255,255,0.6)' : u.mute }}>0{i + 1}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: i === monTab ? '#fff' : '#374151' }}>{label}</span>
              </button>
            ))}
          </div>

          {/* CCTV Panel */}
          {monTab === 0 && (
            <div className="unv-mon-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: '#f3f4f6', border: `1px solid #f3f4f6`, borderRadius: 10, overflow: 'hidden' }}>
              {[
                { tag: 'Viewing angle', title: 'Wide viewing angle ensures a good visual experience', desc: 'Designed with wide-angle panel technology to deliver consistent, accurate visuals from virtually any viewing position — perfect for control rooms and surveillance environments.', img: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1782165617/20220507_1831220_1-1_933267_521044_0_kpcydc.webp' },
                { tag: '24/7 stability', title: 'Anti-electromagnetic interference designed for 24x7 operation', desc: 'Built with industrial-grade components to withstand electromagnetic interference and operate continuously without interruption — reliability you can count on around the clock.', img: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1782165617/20220507_1831221_1-2_933268_521044_0_rolk3b.webp' },
              ].map((cell, ci) => (
                <div key={ci} style={{ background: '#fff', padding: '36px 36px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: u.accent, textTransform: 'uppercase', letterSpacing: 1.2, margin: 0 }}>{cell.tag}</p>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: u.text, margin: 0, lineHeight: 1.4 }}>{cell.title}</h3>
                  <p style={{ fontSize: 13, color: u.dim, lineHeight: 1.75, margin: 0 }}>{cell.desc}</p>
                  <div style={{ borderRadius: 8, overflow: 'hidden', border: `1px solid #f3f4f6`, marginTop: 4, background: '#f8f9fb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={cell.img} alt={cell.title} style={{ width: '100%', height: 'auto', maxHeight: 220, objectFit: 'contain', display: 'block' }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* IT Monitor Panel */}
          {monTab === 1 && (
            <div style={{ borderRadius: 10, overflow: 'hidden', border: `1px solid #f3f4f6`, background: u.alt2, display: 'flex', justifyContent: 'center', padding: 40 }}>
              <img src="https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1782165616/20240823_1907065_01_973369_521044_0_ozypov.webp" alt="IT Monitor"
                   style={{ maxWidth: '100%', maxHeight: 420, objectFit: 'contain', borderRadius: 8 }} />
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CONTROLLER
      ══════════════════════════════════════════ */}
      <section id="controller" style={{ width: '100%', padding: '72px 20px', background: u.alt }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>

          <div className="unv-reveal" style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 700, color: u.text, marginBottom: 6 }}>Controller</h2>
            <p style={{ fontSize: 15, color: u.dim, margin: 0 }}>Powerful control features for seamless display management.</p>
          </div>

          <div className="unv-ct-body" style={{ display: 'grid', gridTemplateColumns: '300px 1fr', border: `1px solid #e5e7eb`, borderRadius: 10, overflow: 'hidden', minHeight: 440, background: '#fff' }}>

            {/* Left: list */}
            <div style={{ display: 'flex', flexDirection: 'column', borderRight: `1px solid #e5e7eb` }}>
              {controllerItems.map((item, i) => (
                <div key={i} onClick={() => setCtItem(i)}
                     style={{
                       display: 'flex', alignItems: 'center', gap: 16, padding: '22px 24px',
                       cursor: 'pointer', borderBottom: i < controllerItems.length - 1 ? `1px solid #e5e7eb` : 'none',
                       background: i === ctItem ? u.accent : '#fff',
                       transition: 'background 0.2s',
                     }}>
                  <span style={{ fontSize: 28, fontWeight: 700, lineHeight: 1, minWidth: 36, color: i === ctItem ? 'rgba(255,255,255,0.35)' : '#e5e7eb' }}>0{i + 1}</span>
                  <span style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.4, color: i === ctItem ? '#fff' : '#374151', transition: 'color 0.2s' }}>{item.title}</span>
                </div>
              ))}
            </div>

            {/* Right: panel */}
            <div style={{ background: u.alt2, padding: '36px 40px', display: 'flex', flexDirection: 'column', gap: 20 }}>
              <p style={{ fontSize: 18, fontWeight: 700, color: u.accent, margin: 0, lineHeight: 1.5 }}>
                {controllerItems[ctItem].panelTitle}
              </p>
              <div style={{ flex: 1, borderRadius: 8, overflow: 'hidden', border: `1px solid #e5e7eb`, background: '#f8f9fb', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 280 }}>
                <img src={controllerItems[ctItem].img} alt={controllerItems[ctItem].title}
                     style={{ width: '100%', height: 'auto', maxHeight: 320, objectFit: 'contain', display: 'block' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          RESPONSIVE STYLES
      ══════════════════════════════════════════ */}
      <style>{`
        /* ── Animations ── */
        @keyframes unvPulse { 0%,100%{ opacity:1; transform:scale(1); } 50%{ opacity:.5; transform:scale(.8); } }
        .unv-reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.65s cubic-bezier(0.22,1,0.36,1), transform 0.65s cubic-bezier(0.22,1,0.36,1); }
        .unv-reveal.unv-visible { opacity: 1; transform: translateY(0); }
        .unv-reveal-d1 { transition-delay: 0.12s; }
        .unv-reveal-d2 { transition-delay: 0.24s; }
        .unv-reveal-d3 { transition-delay: 0.36s; }

        /* ── Base ── */
        .unv-hero { height: 680px; }

        /* ── ≤1140px: dots realign ── */
        @media (max-width: 1140px) {
          .unv-dots { left: 20px !important; transform: none !important; }
        }

        /* ── ≤1024px: tablet two-col → one-col ── */
        @media (max-width: 1024px) {
          .unv-ifpd-grid   { grid-template-columns: 1fr !important; }
          .unv-conf-layout { flex-direction: column-reverse !important; gap: 32px !important; min-height: auto !important; }
          .unv-conf-img    { height: 320px !important; max-width: 100% !important; }
          .unv-led-inner   { grid-template-columns: 1fr !important; gap: 40px !important; }
          .unv-led-panel   { grid-template-columns: 1fr !important; gap: 30px !important; }
          .unv-lcd-body    { grid-template-columns: 1fr !important; }
          .unv-mon-grid    { grid-template-columns: 1fr !important; }
          .unv-ct-body     { grid-template-columns: 1fr !important; }
        }

        /* ── ≤900px ── */
        @media (max-width: 900px) {
          .unv-prod-grid { grid-template-columns: repeat(2, 1fr) !important; max-width: 100% !important; }
          .unv-led-tabs button { padding: 10px 14px !important; font-size: 12px !important; }
        }

        /* ── ≤768px: mobile ── */
        @media (max-width: 768px) {
          .unv-hero           { height: 420px !important; }
          .unv-slide          { align-items: flex-end !important; padding-bottom: 70px !important; }
          .unv-vignette       { background: linear-gradient(180deg, transparent 10%, rgba(0,0,0,0.85) 70%) !important; }
          .unv-hero-container { padding: 0 24px !important; }
          .unv-hero-content   { max-width: 100% !important; }
          .unv-hero-desc      { max-width: 100% !important; font-size: 14px !important; margin-bottom: 24px !important; }
          .unv-dots           { left: 24px !important; transform: none !important; bottom: 22px !important; }
          .unv-nav-inner       { height: 52px !important; gap: 12px !important; padding: 0 16px !important; }
          .unv-nav-placeholder { height: 52px !important; }
          .unv-nav-links       { gap: 4px !important; }
          .unv-nav-links li a  { font-size: 12.5px !important; padding: 4px 10px !important; }
          .unv-nav-cta         { padding: 7px 14px !important; font-size: 12px !important; }
          .unv-ifpd-img { height: 220px !important; }
          .unv-conf-img { height: 260px !important; }
          .unv-lcd-imgs { flex-wrap: wrap !important; }
          .unv-lcd-imgs > div { flex: 1 1 calc(50% - 6px) !important; min-width: calc(50% - 6px) !important; }
        }

        /* ── ≤640px ── */
        @media (max-width: 640px) {
          .unv-conf-img { height: 200px !important; }
          .unv-lcd-imgs { flex-direction: column !important; }
          .unv-lcd-imgs > div { flex: none !important; min-width: 100% !important; }
          .unv-lcd-imgs img { height: 140px !important; }
        }

        /* ── ≤480px: small mobile ── */
        @media (max-width: 480px) {
          .unv-hero         { height: 510px !important; }
          .unv-hero-heading { font-size: clamp(32px, 10vw, 46px) !important; line-height: 1.05 !important; }
          .unv-hero-desc    { font-size: 13px !important; line-height: 1.55 !important; margin-bottom: 18px !important; }
          .unv-hero-btn     { padding: 10px 20px !important; font-size: 12px !important; }
          .unv-prod-grid    { grid-template-columns: repeat(2, 1fr) !important; }
          .unv-led-tabs button { padding: 8px 10px !important; font-size: 11px !important; letter-spacing: 0 !important; }
        }

        /* ── ≤360px ── */
        @media (max-width: 360px) {
          .unv-prod-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

    </main>
  );
}
