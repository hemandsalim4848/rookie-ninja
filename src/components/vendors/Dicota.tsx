'use client';

import { useState, useEffect, useRef } from 'react';

const dc = {
  accent: '#E2001A',
  navy:   '#1a1a1a',
  alt:    '#f9f9f9',
  dim:    '#6b7280',
  line:   'rgba(0,0,0,0.08)',
};

/* ─────────────────────────────────────────────
   HERO SLIDES
───────────────────────────────────────────── */
const heroSlides = [
  {
    id: 'bags',
    badge: 'Official Distributor',
    lines: ['Carry More.', 'Stress Less.'],
    accentLine: 1,
    desc: 'DICOTA laptop bags, backpacks and sleeves are engineered for professionals who demand protection, sustainability, and style in every commute.',
    cta: { label: 'Explore Collection', href: '/dicota', solid: true },
    bg: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1780052682/rookie-ninja/products/lg_1000p_dfc61a48-894b-4175-8551-ec935c3a6e37.webp',
  },
  {
    id: 'eco',
    badge: 'Eco-Friendly Tech',
    lines: ['Eco.', 'Professional.'],
    accentLine: 0,
    desc: 'DICOTA Eco series products are crafted from recycled PET materials — reducing environmental impact without compromising performance.',
    cta: { label: 'View Eco Range', href: '/dicota', solid: false },
    bg: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1780053015/rookie-ninja/products/lg_1000p_094276ed-853c-4083-a40c-3f510b64a09a.webp',
  },
];

/* ─────────────────────────────────────────────
   ECO LAPTOP SLEEVES — image switcher
───────────────────────────────────────────── */
const sleeveSeries = [
  {
    id: 'plus-pro',
    eyebrow: 'Premium Protection',
    title: 'Laptop Sleeve Plus PRO',
    intro: 'A premium slim sleeve with a soft interior lining and robust zip — built for everyday commuters who carry a lot but need to travel light.',
    bullets: [
      'Available in 13–13.3" and 14–14.1"',
      'Soft fleece interior to prevent scratches',
      'Sturdy zip closure with twin pullers',
      'Front accessory pocket for cables and chargers',
      'Carry handle for easy grab-and-go',
    ],
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1780052665/rookie-ninja/products/lg_1000p_c710afb1-e3a6-4ac7-86b5-6cd14ad02216.webp',
  },
  {
    id: 'smart',
    eyebrow: 'Smart Everyday Sleeve',
    title: 'Laptop Sleeve SMART',
    intro: 'A slim, lightweight sleeve designed for clean-desk professionals who prioritise simplicity and a neat, minimalist profile.',
    bullets: [
      'Available in 13–13.3" and 14–14.1"',
      'Lightweight and ultra-slim profile',
      'Soft inner lining for scratch protection',
      'Secure zip closure',
      'Easy to slip into a larger bag',
    ],
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1780052631/rookie-ninja/products/lg_1000p_67c1f801-e743-4a22-8d92-8e3a6b172736.webp',
  },
  {
    id: 'urban',
    eyebrow: 'Urban Style',
    title: 'Laptop Sleeve URBAN 16"',
    intro: 'A sleek anthracite sleeve sized for 16" laptops — built for urban professionals who need reliable protection for larger screens.',
    bullets: [
      'Fits laptops up to 16"',
      'Anthracite colour for a professional look',
      'Padded interior for drop protection',
      'Slim enough to fit inside a trolley or backpack',
      'Durable outer material',
    ],
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1780052649/rookie-ninja/products/lg_1000p_f13163ec-073d-4f20-b9b1-bbe94f83c885.webp',
  },
];

/* ─────────────────────────────────────────────
   SHOULDER BAGS — dark section + tabs
───────────────────────────────────────────── */
const shoulderTabs = {
  multi: {
    heading: 'Eco Multi Series',
    desc: 'Versatile multi-compartment shoulder bags designed for professionals who carry a laptop, tablet, documents, and daily essentials — all sustainably made.',
    products: [
      {
        image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1780052983/rookie-ninja/products/lg_1000p_fdb7120d-dad4-45a9-88ec-4543dc099656.webp',
        title: 'Eco Multi PRO 13–15.6"',
        intro: 'A professional multi-compartment messenger bag built from recycled materials for 13"–15.6" laptops.',
        bullets: ['Fits 13"–15.6" laptops', 'Made from recycled PET', 'Multiple padded compartments', 'Detachable shoulder strap', 'Trolley strap for stacking'],
        slug: 'dicota-eco-multi-pro-13-156',
      },
      {
        image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1780052556/rookie-ninja/products/lg_1000p_3e390e6d-f4e4-4f77-ba44-86ad6426d177.webp',
        title: 'Eco Multi BASE 14–15.6"',
        intro: 'An entry-level eco messenger bag with clean lines and a spacious main compartment for everyday use.',
        bullets: ['Fits 14"–15.6" laptops', 'Made from recycled PET', 'Padded laptop compartment', 'Front organisation panel', 'Trolley strap'],
        slug: 'eco-multi-base-14-156',
      },
    ],
  },
  traveller: {
    heading: 'Eco Top Traveller Series',
    desc: 'Top-loading shoulder bags built for frequent travellers — with quick-access organisation, padded protection, and an eco-conscious construction.',
    products: [
      {
        image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1780052598/rookie-ninja/products/lg_1000p_dbd20773-3332-41e1-86d7-61fcd56a55dd.webp',
        title: 'Eco Top Traveller BASE 13–14.1"',
        intro: 'A compact top-loading shoulder bag for 13"–14.1" laptops — perfect for daily commuters.',
        bullets: ['Fits 13"–14.1" laptops', 'Top-loading quick access', 'Padded laptop sleeve inside', 'Front zip pocket for accessories', 'Trolley strap'],
        slug: 'laptop-bag-eco-top-traveller-base-13-141',
      },
      {
        image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1780053008/rookie-ninja/products/lg_1000p_07bb4f0c-f608-44b5-b99a-07134a10ace9.webp',
        title: 'Eco Top Traveller PRO 12–14.1"',
        intro: 'A PRO-grade top traveller with extra padding and storage for professionals who need more than the basics.',
        bullets: ['Fits 12"–14.1" laptops', 'Reinforced padded laptop section', 'Dedicated tablet pocket', 'Multiple organisation pockets', 'Made from recycled PET'],
        slug: 'dicota-eco-top-traveller-pro-12-141',
      },
    ],
  },
};

/* ─────────────────────────────────────────────
   BACKPACKS — left-nav accordion
───────────────────────────────────────────── */
const backpackItems = [
  {
    num: '01',
    navTitle: 'Backpack ECO — Sustainable Everyday',
    tag: 'Eco Everyday',
    heading: 'Dicota Backpack ECO 14–15.6"',
    desc: 'A clean, minimalist backpack made from recycled PET — built for eco-conscious professionals who want reliable laptop protection without excess bulk.',
    features: [
      'Fits 14"–15.6" laptops',
      'Made from recycled PET materials',
      'Padded and reinforced laptop compartment',
      'Front quick-access pocket',
      'Ergonomic padded shoulder straps',
      'Trolley strap for travel convenience',
    ],
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1780053015/rookie-ninja/products/lg_1000p_094276ed-853c-4083-a40c-3f510b64a09a.webp',
    slug: 'dicota-backpack-eco-14-156',
  },
  {
    num: '02',
    navTitle: 'Backpack MOVE — Versatile Commuter',
    tag: 'Daily Commuter',
    heading: 'Dicota Backpack MOVE 13–15.6"',
    desc: 'A versatile commuter backpack with multiple compartments and a padded laptop sleeve — ready for office, campus, or travel.',
    features: [
      'Fits 13"–15.6" laptops',
      'Dedicated padded laptop compartment',
      'Multiple organisation pockets',
      'Side water bottle pocket',
      'Padded back panel and shoulder straps',
      'USB charging port compatible',
    ],
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1780052682/rookie-ninja/products/lg_1000p_dfc61a48-894b-4175-8551-ec935c3a6e37.webp',
    slug: 'dicota-backpack-move-13-156-black',
  },
  {
    num: '03',
    navTitle: 'Backpack GO — Lightweight Travel',
    tag: 'Lightweight Travel',
    heading: 'Dicota Backpack GO 13–15.6"',
    desc: 'A lightweight, foldable backpack for travel and day trips — compact when empty and spacious when packed.',
    features: [
      'Fits 13"–15.6" laptops',
      'Folds flat for easy storage',
      'Padded laptop compartment',
      'Water-resistant outer fabric',
      'Front zip pocket for essentials',
      'Lightweight and packable design',
    ],
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1780052699/rookie-ninja/products/lg_1000p_d45186ef-ea7e-437e-b44e-3a7e5ff1f4a8.webp',
    slug: 'dicota-backpack-go-13-156-black',
  },
  {
    num: '04',
    navTitle: 'Eco Backpack SCALE — High-Capacity',
    tag: 'High Capacity',
    heading: 'Dicota Eco Backpack SCALE 13–15.6"',
    desc: 'A high-capacity eco backpack for professionals who carry everything — laptop, documents, accessories, and more — all day, every day.',
    features: [
      'Fits 13"–15.6" laptops',
      'High-capacity main compartment',
      'Made from recycled PET materials',
      'Padded and protective laptop sleeve',
      'Ergonomic ventilated back panel',
      'Multiple pockets for full organisation',
    ],
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1780052910/rookie-ninja/products/lg_1000p_12e3619c-ac8f-492a-8b7d-d78dcfd8606b.webp',
    slug: 'dicota-eco-backpack-scale-13-156',
  },
];

/* ─────────────────────────────────────────────
   TROLLEYS & WEBCAM — pill tabs
───────────────────────────────────────────── */
const extraTabs = [
  {
    num: '01',
    label: 'Trolley Bags',
    panels: [
      {
        tag: 'Cabin-Ready Roller',
        title: 'Cabin Roller PRO 14–15.6"',
        desc: 'A professional cabin-approved roller bag with a dedicated padded laptop compartment and smart organisation — perfect for frequent business travellers.',
        features: [
          'Fits 14"–15.6" laptops',
          'Cabin luggage approved size',
          'Telescopic trolley handle',
          'Smooth rolling wheels',
          'Padded laptop compartment with fleece lining',
          'Front quick-access organisation panel',
        ],
        image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1780052931/rookie-ninja/products/lg_1000p_7769c650-e757-4d29-95e4-edbd29289a23.webp',
        slug: 'dicota-cabin-roller-pro-14-156',
      },
      {
        tag: 'Large Roller',
        title: 'Backpack Roller PRO 15–17.3"',
        desc: 'A full-size roller backpack for extended trips — wears as a backpack, rolls as a trolley, and fits large 17.3" laptops with full protection.',
        features: [
          'Fits 15"–17.3" laptops',
          'Converts between backpack and roller',
          'Telescopic trolley handle',
          'Padded laptop and tablet compartments',
          'Multiple accessory pockets',
          'Smooth rolling wheels for easy navigation',
        ],
        image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1780052924/rookie-ninja/products/lg_1000p_22d5516f-5211-411c-b9f7-9d49beb7d6ff.webp',
        slug: 'dicota-backpack-roller-pro-15-173',
      },
    ],
  },
  {
    num: '02',
    label: 'Eco Accessory Pouch',
    panels: [
      {
        tag: 'Eco Organiser',
        title: 'Accessory Pouch Eco MOVE',
        desc: 'Keep cables, chargers, and accessories neatly organised in a sustainable eco pouch — available in Small, Medium, and Large to suit every setup.',
        features: [
          'Available in Small, Medium and Large',
          'Made from recycled PET materials',
          'Multiple interior pockets and loops',
          'Durable zip closure',
          'Compact and lightweight',
          'Compatible with all DICOTA bags',
        ],
        image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1780052733/rookie-ninja/products/lg_1000p_bd90f351-7563-4a02-aa98-432bee04563f.webp',
        slug: 'dicota-accessory-pouch-eco-move-large',
      },
    ],
  },
  {
    num: '03',
    label: 'Dicota Webcam',
    panels: [
      {
        tag: 'Full HD Webcam',
        title: 'Webcam PRO Plus Full HD',
        desc: 'A professional Full HD webcam with a wide-angle lens, built-in privacy shutter, and plug-and-play USB connectivity — ready for hybrid work and video conferencing.',
        features: [
          'Full HD 1080p resolution at 30fps',
          'Wide-angle lens for natural framing',
          'Built-in privacy shutter',
          'Integrated microphone',
          'USB plug-and-play — no drivers needed',
          'Compatible with Zoom, Teams, Meet and more',
        ],
        image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1780052803/rookie-ninja/products/lg_1000p_1f1d5652-e674-4ccb-8be6-eadd15838ec7.webp',
        slug: 'dicota-webcam-pro-plus-full-hd',
      },
    ],
  },
];

/* ─────────────────────────────────────────────
   NAV LINKS
───────────────────────────────────────────── */
const DC_NAV_LINKS = [
  { label: 'Eco Laptop Sleeves',   href: '#sleeves' },
  { label: 'Shoulder Bags',        href: '#shoulder-bags' },
  { label: 'Backpacks',            href: '#backpacks' },
  { label: 'Trolley Bags',         href: '#extras' },
  { label: 'Eco Accessory Pouch',  href: '#extras' },
  { label: 'Dicota Webcam',        href: '#extras' },
];

function DcNavInner({ accent }: { accent: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'nowrap', gap: 20, maxWidth: 1140, width: '100%', margin: '0 auto', height: 58, padding: '0 20px' }}>
      <ul style={{ display: 'flex', alignItems: 'center', flex: 1, gap: 28, listStyle: 'none', margin: 0, padding: 0, overflowX: 'auto', scrollbarWidth: 'none' }}>
        {DC_NAV_LINKS.map(link => (
          <li key={link.label} style={{ flexShrink: 0 }}>
            <a href={link.href}
               style={{ display: 'inline-block', fontSize: 13, fontWeight: 500, color: '#111', textDecoration: 'none', whiteSpace: 'nowrap', position: 'relative', paddingBottom: 3, transition: 'color 0.2s' }}
               onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = accent; }}
               onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#111'; }}>
              {link.label}
              <span style={{ position: 'absolute', bottom: 0, left: 0, width: 0, height: 2, background: accent, borderRadius: 2, transition: 'width 0.25s ease' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLSpanElement).style.width = '100%'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLSpanElement).style.width = '0'; }} />
            </a>
          </li>
        ))}
      </ul>
      <a href="#shoulder-bags"
         style={{ flexShrink: 0, padding: '10px 24px', background: accent, color: '#fff', fontSize: 13, fontWeight: 600, textDecoration: 'none', borderRadius: 50, whiteSpace: 'nowrap', transition: 'transform 0.15s' }}
         onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)'; }}
         onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)'; }}>
        Get a Quote
      </a>
    </div>
  );
}

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function DicotaPage() {
  const [heroIdx, setHeroIdx]           = useState(0);
  const [progress, setProgress]         = useState(0);
  const rafRef                          = useRef<number | null>(null);
  const startRef                        = useRef<number | null>(null);
  const heroRef                         = useRef<HTMLElement>(null);
  const DURATION                        = 5000;

  const [isSticky, setIsSticky]         = useState(false);
  const [sleeveActive, setSleeveActive] = useState(0);
  const [sleeveImgFade, setSleeveImgFade] = useState(false);
  const [shoulderTab, setShoulderTab]   = useState<'multi' | 'traveller'>('multi');
  const [backpackActive, setBackpackActive] = useState(0);
  const [extraTab, setExtraTab]         = useState(0);
  const [formState, setFormState]       = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

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
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('dc-visible'); obs.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.dc-reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  /* ── Sleeve image swap ── */
  const switchSleeve = (idx: number) => {
    if (idx === sleeveActive) return;
    setSleeveImgFade(true);
    setTimeout(() => { setSleeveActive(idx); setSleeveImgFade(false); }, 300);
  };

  /* ── Form ── */
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setFormState('sending');
    try {
      const form = e.currentTarget;
      const res  = await fetch('https://formspree.io/f/xdajrzpv', { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      if (res.ok) { setFormState('success'); form.reset(); } else setFormState('error');
    } catch { setFormState('error'); }
  };

  const slide         = heroSlides[heroIdx];
  const shoulderData  = shoulderTabs[shoulderTab];
  const extraContent  = extraTabs[extraTab];

  return (
    <main style={{ background: '#fff', color: dc.navy, fontFamily: 'var(--font-poppins)', overflowX: 'hidden' }}>

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section ref={heroRef} className="dc-hero" style={{ position: 'relative', width: '100%', overflow: 'hidden', background: '#000' }}>
        {heroSlides.map((s, i) => (
          <div key={s.id} style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', opacity: i === heroIdx ? 1 : 0, transition: 'opacity 0.9s cubic-bezier(0.77,0,0.175,1)', zIndex: i === heroIdx ? 2 : 1 }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: `url('${s.bg}')`, backgroundSize: 'cover', backgroundPosition: 'center', transform: i === heroIdx ? 'scale(1)' : 'scale(1.06)', transition: 'transform 6s ease', filter: 'brightness(0.35)' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(0,0,0,0.75) 38%, transparent 80%)' }} />
            <div className="dc-hero-container" style={{ position: 'relative', zIndex: 3, width: '100%', maxWidth: 1220, margin: '0 auto', padding: '0 20px' }}>
              <div style={{ maxWidth: 560, opacity: i === heroIdx ? 1 : 0, transform: i === heroIdx ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 0.7s ease 0.4s, transform 0.7s ease 0.4s' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: dc.accent, color: '#fff', fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', padding: '5px 12px', marginBottom: 18, borderRadius: 2 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff', opacity: 0.9, display: 'inline-block', animation: 'dcPulse 2s infinite' }} />
                  {s.badge}
                </span>
                <h1 className="dc-hero-heading" style={{ fontSize: 'clamp(40px, 6vw, 78px)', color: '#fff', lineHeight: 0.95, marginBottom: 18, fontWeight: 700, letterSpacing: 1 }}>
                  {s.lines.map((line, li) => <span key={li} style={{ display: 'block', color: li === s.accentLine ? dc.accent : '#fff' }}>{line}</span>)}
                </h1>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.72)', lineHeight: 1.65, marginBottom: 32, fontWeight: 300, maxWidth: 420 }}>{s.desc}</p>
                <a href={s.cta.href}
                   style={{ display: 'inline-block', padding: '13px 28px', background: s.cta.solid ? '#fff' : 'transparent', color: s.cta.solid ? '#0d0d0d' : '#fff', border: '2px solid #fff', fontSize: 13, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', textDecoration: 'none', borderRadius: 2, transition: 'background 0.25s, color 0.25s, border-color 0.25s' }}
                   onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = dc.accent; el.style.borderColor = dc.accent; el.style.color = '#fff'; }}
                   onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = s.cta.solid ? '#fff' : 'transparent'; el.style.borderColor = '#fff'; el.style.color = s.cta.solid ? '#0d0d0d' : '#fff'; }}>
                  {s.cta.label}
                </a>
              </div>
            </div>
          </div>
        ))}
        <div style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(calc(-570px + 20px))', display: 'flex', gap: 10, zIndex: 10 }}>
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => goSlide(i)} style={{ width: 10, height: 10, borderRadius: '50%', padding: 0, border: 'none', cursor: 'pointer', background: i === heroIdx ? dc.accent : 'rgba(255,255,255,0.35)', transform: i === heroIdx ? 'scale(1.3)' : 'scale(1)', transition: 'background 0.3s, transform 0.3s' }} />
          ))}
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, height: 3, background: dc.accent, width: `${progress}%`, zIndex: 10, transition: 'width 0.1s linear' }} />
      </section>

      {/* ══════════════════════════════════════════
          STICKY NAV (dual-nav pattern)
      ══════════════════════════════════════════ */}
      <div style={{ width: '100%', background: '#fff', borderBottom: `1px solid ${dc.line}`, visibility: isSticky ? 'hidden' : 'visible' }}>
        <DcNavInner accent={dc.accent} />
      </div>
      <div className="dc-nav-wrap" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1001, background: '#fff', borderBottom: `1px solid ${dc.line}`, boxShadow: '0 2px 20px rgba(0,0,0,0.10)', transform: isSticky ? 'translateY(0)' : 'translateY(-100%)', transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)' }}>
        <DcNavInner accent={dc.accent} />
      </div>

      {/* ══════════════════════════════════════════
          ECO LAPTOP SLEEVES
      ══════════════════════════════════════════ */}
      <section id="sleeves" style={{ width: '100%', padding: '80px 20px', background: '#fff' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div className="dc-reveal" style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 700, color: dc.navy, marginBottom: 10 }}>Eco Laptop Sleeves</h2>
            <p style={{ fontSize: 16, color: dc.dim, maxWidth: 700, lineHeight: 1.7 }}>Slim, protective, and sustainably crafted — DICOTA sleeves keep your laptop safe from the daily commute without the bulk.</p>
          </div>
          <div className="dc-sleeve-layout dc-reveal dc-reveal-d1" style={{ display: 'flex', gap: 60, alignItems: 'center', justifyContent: 'center', minHeight: 480 }}>
            <div className="dc-sleeve-items" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
              {sleeveSeries.map((item, idx) => (
                <div key={item.id} onClick={() => switchSleeve(idx)}
                     style={{ cursor: 'pointer', padding: 24, borderRadius: 16, border: sleeveActive === idx ? '1px solid #e2e8f0' : '1px solid transparent', background: sleeveActive === idx ? '#fff' : 'transparent', boxShadow: sleeveActive === idx ? '0 10px 25px -5px rgba(0,0,0,0.05)' : 'none', transition: 'all 0.3s ease' }}
                     onMouseEnter={e => { if (sleeveActive !== idx) (e.currentTarget as HTMLDivElement).style.background = '#f8fafc'; }}
                     onMouseLeave={e => { if (sleeveActive !== idx) (e.currentTarget as HTMLDivElement).style.background = 'transparent'; }}>
                  <p style={{ color: dc.accent, fontSize: 13, textTransform: 'uppercase', marginBottom: 8, letterSpacing: '0.5px', fontWeight: 600 }}>{item.eyebrow}</p>
                  <h3 style={{ fontSize: 22, marginBottom: 14, color: dc.navy, fontWeight: 600 }}>{item.title}</h3>
                  <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.7, margin: 0 }}>{item.intro}</p>
                  {sleeveActive === idx && (
                    <ul style={{ marginTop: 12, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>
                      {item.bullets.map(b => (
                        <li key={b} style={{ fontSize: 14, color: '#475569', lineHeight: 1.8, display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ width: 5, height: 5, borderRadius: '50%', background: dc.accent, flexShrink: 0, display: 'inline-block' }} />{b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
            <div className="dc-sleeve-img-wrap" style={{ flex: 1.2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={sleeveSeries[sleeveActive].image} alt={sleeveSeries[sleeveActive].title}
                   style={{ width: '100%', maxWidth: 560, height: 420, objectFit: 'contain', borderRadius: 20, opacity: sleeveImgFade ? 0 : 1, transition: 'opacity 0.4s ease' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SHOULDER BAGS — dark section + tabs
      ══════════════════════════════════════════ */}
      <section id="shoulder-bags" style={{ width: '100%', background: 'linear-gradient(90deg, #111, #1f1f1f)', padding: '80px 20px', color: '#fff' }}>
        <div className="dc-shoulder-inner" style={{ maxWidth: 1140, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 400px', gap: 60, alignItems: 'center' }}>
          <div className="dc-reveal">
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 700, marginBottom: 20, color: '#fff', lineHeight: 1.2 }}>Shoulder Bags</h2>
            <p style={{ fontSize: 15, color: '#cbd5e1', lineHeight: 1.7 }}>
              DICOTA shoulder bags combine smart organisation with sustainable materials — designed for professionals who need their laptop, documents, and essentials in one place, always at hand.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 24 }}>
              {['Eco Multi PRO', 'Eco Multi BASE', 'Eco Top Traveller BASE', 'Eco Top Traveller PRO'].map(name => (
                <span key={name} style={{ fontSize: 12, fontWeight: 600, padding: '5px 14px', background: 'rgba(255,255,255,0.08)', border: `1px solid ${dc.accent}`, color: '#e2e8f0', borderRadius: 4 }}>{name}</span>
              ))}
            </div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.06)', padding: 30, borderRadius: 14, border: '1px solid rgba(255,255,255,0.1)' }}>
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
                  <option value="" style={{ background: '#fff', color: '#000' }}>Select Category</option>
                  {['Eco Laptop Sleeves', 'Shoulder Bags', 'Backpacks', 'Trolley Bags', 'Eco Accessory Pouch', 'Dicota Webcam'].map(o => (
                    <option key={o} style={{ background: '#fff', color: '#000' }}>{o}</option>
                  ))}
                </select>
                {formState === 'error' && <p style={{ fontSize: 12, color: '#fca5a5' }}>Something went wrong. Please try again.</p>}
                <button type="submit" disabled={formState === 'sending'} style={{ marginTop: 10, padding: 13, background: dc.accent, color: '#fff', fontWeight: 600, border: 'none', borderRadius: 6, cursor: formState === 'sending' ? 'not-allowed' : 'pointer', letterSpacing: 1, fontSize: 13, opacity: formState === 'sending' ? 0.7 : 1, transition: 'opacity 0.2s', fontFamily: 'var(--font-poppins)' }}>
                  {formState === 'sending' ? 'SENDING…' : 'SEND INQUIRY'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Shoulder bag tabs */}
      <section style={{ width: '100%', padding: '40px 20px 60px', background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', borderBottom: '2px solid #eee', marginBottom: 40, gap: 10 }}>
            {([['multi', 'Eco Multi Series'], ['traveller', 'Eco Top Traveller Series']] as const).map(([key, label]) => (
              <button key={key} onClick={() => setShoulderTab(key)}
                      style={{ padding: '15px 22px', cursor: 'pointer', fontWeight: 700, fontSize: 14, textTransform: 'uppercase', letterSpacing: 1, color: shoulderTab === key ? dc.accent : '#888', border: 'none', background: 'none', position: 'relative', fontFamily: 'var(--font-poppins)' }}>
                {label}
                {shoulderTab === key && <span style={{ position: 'absolute', bottom: -2, left: 0, width: '100%', height: 3, background: dc.accent, display: 'block' }} />}
              </button>
            ))}
          </div>
          <div className="dc-net-panel" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 50 }}>
            <div>
              <h2 style={{ fontSize: 'clamp(20px, 3vw, 32px)', color: '#000', marginBottom: 20, lineHeight: 1.2 }}>{shoulderData.heading}</h2>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: '#555' }}>{shoulderData.desc}</p>
            </div>
            <div className="dc-net-products" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 30 }}>
              {shoulderData.products.map(p => (
                <div key={p.title} style={{ background: '#fff', border: '1px solid #eee', padding: 24, borderRadius: 8 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt={p.title} className="dc-net-img" style={{ width: '100%', height: 240, objectFit: 'contain', marginBottom: 20, borderRadius: 6 }} />
                  <h4 style={{ fontSize: 20, margin: '10px 0 12px', color: '#000' }}>{p.title}</h4>
                  <p style={{ fontSize: 14, color: '#555', marginBottom: 8 }}>{p.intro}</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {p.bullets.map(b => (
                      <li key={b} style={{ fontSize: 14, color: '#555', lineHeight: 1.9, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: dc.accent, flexShrink: 0, display: 'inline-block' }} />{b}
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
          BACKPACKS — left-nav accordion
      ══════════════════════════════════════════ */}
      <section id="backpacks" style={{ width: '100%', background: '#f8fafc', padding: '60px 20px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="dc-reveal" style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 700, color: '#000', marginBottom: 6 }}>Backpacks</h2>
            <p style={{ fontSize: 15, color: dc.dim }}>From lightweight commuters to high-capacity eco packs — a DICOTA backpack for every professional lifestyle.</p>
          </div>
          <div className="dc-prod-body dc-reveal dc-reveal-d1" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden', minHeight: 500 }}>
            <div className="dc-prod-list" style={{ borderRight: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', background: '#fff' }}>
              {backpackItems.map((item, idx) => (
                <div key={item.num} onClick={() => setBackpackActive(idx)} style={{ borderBottom: idx < backpackItems.length - 1 ? '1px solid #e5e7eb' : 'none', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '18px 24px', background: backpackActive === idx ? '#fff5f5' : '#fff', transition: 'background 0.2s' }}
                       onMouseEnter={e => { if (backpackActive !== idx) (e.currentTarget as HTMLDivElement).style.background = '#f9fafb'; }}
                       onMouseLeave={e => { if (backpackActive !== idx) (e.currentTarget as HTMLDivElement).style.background = '#fff'; }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: dc.accent, letterSpacing: 1, minWidth: 24 }}>{item.num}</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: backpackActive === idx ? dc.accent : '#1f2937', flex: 1, lineHeight: 1.4 }}>{item.navTitle}</span>
                    <span style={{ fontSize: 18, color: backpackActive === idx ? dc.accent : '#d1d5db', transition: 'transform 0.3s, color 0.3s', transform: backpackActive === idx ? 'rotate(90deg)' : 'none' }}>›</span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
              {backpackItems.map((item, idx) => (
                <div key={item.num} style={{ display: backpackActive === idx ? 'flex' : 'none', flexDirection: 'column', height: '100%', padding: '36px 36px 28px', gap: 20 }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: dc.accent, textTransform: 'uppercase', letterSpacing: 1, margin: 0 }}>{item.tag}</p>
                  <h3 style={{ fontSize: 22, fontWeight: 700, color: '#0f1320', margin: '6px 0 10px', lineHeight: 1.3 }}>{item.heading}</h3>
                  <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.75, margin: 0 }}>{item.desc}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {item.features.map(f => (
                      <div key={f} style={{ fontSize: 13, color: '#374151', display: 'flex', alignItems: 'flex-start', gap: 8, lineHeight: 1.5 }}>
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: dc.accent, flexShrink: 0, marginTop: 6 }} />{f}
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 'auto', paddingTop: 20 }}>
                    <div style={{ borderRadius: 6, overflow: 'hidden', border: '1px solid #e5e7eb', background: '#fff' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.image} alt={item.heading} style={{ width: '100%', height: 180, objectFit: 'contain', display: 'block' }} />
                      <a href={`/dicota/${item.slug}`} style={{ display: 'block', fontSize: 11, fontWeight: 700, textAlign: 'center', background: dc.accent, color: '#fff', padding: '6px 0', letterSpacing: '0.5px', textTransform: 'uppercase', textDecoration: 'none' }}>
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
          TROLLEYS, POUCHES & WEBCAM — pill tabs
      ══════════════════════════════════════════ */}
      <section id="extras" style={{ width: '100%', background: '#fff', padding: '60px 20px 80px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="dc-reveal" style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 700, color: '#000', marginBottom: 6 }}>Trolley Bags, Pouches & Webcam</h2>
            <p style={{ fontSize: 15, color: dc.dim }}>Complete your setup — from travel-ready roller bags and eco pouches to a professional HD webcam.</p>
          </div>
          <div className="dc-flat-tabs dc-reveal dc-reveal-d1" style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
            {extraTabs.map((tab, i) => (
              <button key={i} onClick={() => setExtraTab(i)}
                      style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 24px', borderRadius: 4, cursor: 'pointer', border: `1.5px solid ${extraTab === i ? dc.accent : '#e5e7eb'}`, background: extraTab === i ? dc.accent : '#fff', transition: 'all 0.2s', fontFamily: 'var(--font-poppins)' }}>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: extraTab === i ? 'rgba(255,255,255,0.6)' : '#9ca3af' }}>{tab.num}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: extraTab === i ? '#fff' : '#374151' }}>{tab.label}</span>
              </button>
            ))}
          </div>
          <div className="dc-flat-grid" style={{ display: 'grid', gridTemplateColumns: extraContent.panels.length === 1 ? '1fr 1fr' : '1fr 1fr', gap: 1, background: '#f3f4f6', border: '1px solid #f3f4f6', borderRadius: 10, overflow: 'hidden' }}>
            {extraContent.panels.length === 1 ? (
              <>
                <div style={{ background: '#fff', padding: 36, display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: dc.accent, textTransform: 'uppercase', letterSpacing: '1.2px', margin: 0 }}>{extraContent.panels[0].tag}</p>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0f1320', margin: 0, lineHeight: 1.4 }}>{extraContent.panels[0].title}</h3>
                  <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.75, margin: 0 }}>{extraContent.panels[0].desc}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                    {extraContent.panels[0].features.map(f => (
                      <div key={f} style={{ fontSize: 13, color: '#374151', display: 'flex', alignItems: 'flex-start', gap: 9, lineHeight: 1.5 }}>
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: dc.accent, flexShrink: 0, marginTop: 5 }} />{f}
                      </div>
                    ))}
                  </div>
                  <a href={`/dicota/${extraContent.panels[0].slug}`} style={{ marginTop: 8, display: 'inline-block', fontSize: 13, fontWeight: 600, color: dc.accent, textDecoration: 'none' }}>View Product →</a>
                </div>
                <div style={{ background: '#fff', padding: 36, display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: dc.accent, textTransform: 'uppercase', letterSpacing: '1.2px', margin: 0 }}>Product Image</p>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0f1320', margin: 0, lineHeight: 1.4 }}>{extraContent.panels[0].title}</h3>
                  <div style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid #e5e7eb', marginTop: 4, background: '#fff' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={extraContent.panels[0].image} alt={extraContent.panels[0].title} style={{ width: '100%', height: 260, objectFit: 'contain', display: 'block' }} />
                  </div>
                </div>
              </>
            ) : (
              extraContent.panels.map(panel => (
                <div key={panel.slug} style={{ background: '#fff', padding: 36, display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: dc.accent, textTransform: 'uppercase', letterSpacing: '1.2px', margin: 0 }}>{panel.tag}</p>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0f1320', margin: 0, lineHeight: 1.4 }}>{panel.title}</h3>
                  <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.75, margin: 0 }}>{panel.desc}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                    {panel.features.map(f => (
                      <div key={f} style={{ fontSize: 13, color: '#374151', display: 'flex', alignItems: 'flex-start', gap: 9, lineHeight: 1.5 }}>
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: dc.accent, flexShrink: 0, marginTop: 5 }} />{f}
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 'auto', paddingTop: 8, display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid #e5e7eb', background: '#fff' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={panel.image} alt={panel.title} style={{ width: '100%', height: 200, objectFit: 'contain', display: 'block' }} />
                    </div>
                    <a href={`/dicota/${panel.slug}`} style={{ display: 'inline-block', fontSize: 13, fontWeight: 600, color: dc.accent, textDecoration: 'none' }}>View Product →</a>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          RESPONSIVE + ANIMATIONS
      ══════════════════════════════════════════ */}
      <style>{`
        @keyframes dcPulse { 0%,100%{ opacity:1; transform:scale(1); } 50%{ opacity:.5; transform:scale(.8); } }
        .dc-reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.65s cubic-bezier(0.22,1,0.36,1), transform 0.65s cubic-bezier(0.22,1,0.36,1); }
        .dc-reveal.dc-visible { opacity: 1; transform: translateY(0); }
        .dc-reveal-d1 { transition-delay: 0.12s; }
        .dc-hero { height: 680px; }

        @media (max-width: 1024px) {
          .dc-shoulder-inner { grid-template-columns: 1fr !important; gap: 40px !important; }
          .dc-net-panel      { grid-template-columns: 1fr !important; gap: 32px !important; }
          .dc-prod-body      { grid-template-columns: 1fr !important; }
          .dc-prod-list      { border-right: none !important; border-bottom: 1px solid #e5e7eb !important; }
          .dc-flat-grid      { grid-template-columns: 1fr !important; }
          .dc-sleeve-layout  { flex-direction: column-reverse !important; gap: 32px !important; min-height: unset !important; }
          .dc-sleeve-img-wrap img { height: 300px !important; }
        }
        @media (max-width: 768px) {
          .dc-hero           { height: 420px !important; }
          .dc-hero-container { padding: 0 24px !important; }
          .dc-net-products   { grid-template-columns: 1fr !important; }
          .dc-net-img        { height: 200px !important; }
          .dc-flat-tabs      { flex-direction: column !important; }
        }
        @media (max-width: 480px) {
          .dc-hero           { height: 520px !important; }
          .dc-flat-tabs button { width: 100% !important; justify-content: flex-start !important; }
        }
      `}</style>
    </main>
  );
}
