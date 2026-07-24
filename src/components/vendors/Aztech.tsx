'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

/* ─────────────────────────────────────────────
   THEME
───────────────────────────────────────────── */
const az = {
  bg:     '#ffffff',
  alt:    '#f8f9fb',
  navy:   '#0A1628',
  accent: '#111111',
  line:   'rgba(0,0,0,0.08)',
  text:   '#0A1628',
  dim:    '#6b7280',
  mute:   '#9ca3af',
};

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const heroSlides = [
  {
    id: 'display',
    badge: 'Official Distributor',
    lines: ['Smarter.', 'Brighter Spaces.'],
    accentLine: 1,
    desc: 'From ultra-large interactive flat panels to digital signage and audio — Aztech transforms how teams collaborate, learn, and communicate.',
    cta: { label: 'Explore Display & Audio', href: '#display-audio', solid: true },
    bg: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1783687223/Banner-13_fldjp6.webp',
  },
  {
    id: 'gaming',
    badge: 'Gaming & Power',
    lines: ['Play Harder.', 'Win.'],
    accentLine: 1,
    desc: 'Pro-grade gaming peripherals and high-efficiency power supplies — built for peak performance and absolute reliability.',
    cta: { label: 'Explore Gaming', href: '#gaming', solid: false },
    bg: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1783687222/ifp-1_f7hbi0.webp',
  },
];

/* IFP — shown as 2 feature cards (like KA Software Solutions) */
const ifpCards = [
  {
    tag: 'Interactive Flat Panel',
    title: 'Ideaflow Bright Series',
    desc: 'Ultra-bright 4K interactive displays for classrooms and collaborative workspaces — responsive multi-touch with crystal-clear visuals across four sizes.',
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1783680061/aztech-aztech-ideaflow-bright-75-4k-interactive-display-0-AZTECH-Smart-Interacti.jpg',
    features: ['Available in 55", 65", 75" and 86"', '4K Ultra-HD Resolution', 'Multi-touch Interactive Surface', 'Built-in Android OS', 'Wireless Screen Sharing'],
    links: [
      { label: '55"', href: '/products/aztech-ideaflow-bright-55-4k-interactive-display' },
      { label: '65"', href: '/products/aztech-ideaflow-bright-65-4k-interactive-display' },
      { label: '75"', href: '/products/aztech-ideaflow-bright-75-4k-interactive-display' },
      { label: '86"', href: '/products/aztech-ideaflow-bright-86-4k-interactive-display' },
    ],
  },
  {
    tag: 'Ultra-Large Format',
    title: 'Ideaflow 98" & Elite 110"',
    desc: 'Commanding large-format 4K interactive displays for boardrooms, lecture halls, and high-impact environments — from 98" up to a massive 110".',
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1783680076/aztech-aztech-ideaflow-elite-110-4k-interactive-display-0-Ideaflow.png',
    features: ['Available in 98" and 110"', '4K Ultra-HD Resolution', 'Advanced Multi-touch Technology', 'Built-in Android OS', 'Professional AV Connectivity'],
    links: [
      { label: 'Ideaflow 98"', href: '/products/aztech-ideaflow-98-4k-interactive-display' },
      { label: 'Ideaflow Elite 110"', href: '/products/aztech-ideaflow-elite-110-4k-interactive-display' },
    ],
  },
];

/* Soundbars — interactive picker (like KA Office Scanners) */
const soundbars = [
  {
    id: '201',
    eyebrow: '2.1 Channel',
    title: 'AZTECH 201 Soundbar',
    intro: 'Immersive stereo audio with a wired subwoofer — perfect for display rooms, huddle spaces, and classrooms.',
    bullets: [
      '2.1 Channel Audio',
      'Wired Subwoofer Included',
      'Multiple Connectivity Options',
      'Compact, Wall-Mountable Design',
      'Ideal for Displays up to 75"',
    ],
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1783680083/aztech-aztech-201-soundbar-with-wired-subwoofer-0-Product-images_Soundbar-2-1-01.jpg',
    links: [{ label: 'AZTECH 201 Soundbar', href: '/products/aztech-201-soundbar-with-wired-subwoofer' }],
  },
  {
    id: '501',
    eyebrow: '5.1 Channel',
    title: 'AZTECH 501 Soundbar',
    intro: 'True surround sound with a wired subwoofer — delivering cinema-quality audio for large display installations.',
    bullets: [
      '5.1 Channel Surround Sound',
      'Wired Subwoofer Included',
      'Rich, Room-Filling Audio',
      'Multiple Connectivity Options',
      'Ideal for Large Conference Rooms',
    ],
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1783680092/aztech-aztech-501-soundbar-with-wired-subwoofer-0-Product-images_Soundbar-5-1-01.jpg',
    links: [{ label: 'AZTECH 501 Soundbar', href: '/products/aztech-501-soundbar-with-wired-subwoofer' }],
  },
];

/* Cables — tabs (like KA Network tabs) */
const cablesData = {
  hypercable: {
    heading: 'HyperCable Series',
    desc: 'High-performance USB-C to USB-C cables built for speed — supporting up to 240W fast charging and data transfer with durable braided construction.',
    products: [
      {
        image: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1783682017/aztech-aztech-hypercable-usb-c-60w-1m-black-0-Product-images_Cable-01-76.jpg',
        title: 'HyperCable USB-C 60W',
        intro: 'Fast 60W USB-C charging cable with braided design — compact 1m length.',
        bullets: ['60W Fast Charging', 'USB-C to USB-C', 'Durable Braided Design', '1 Meter Length'],
        links: [{ label: 'HyperCable 60W 1m', href: '/products/aztech-hypercable-usb-c-60w-1m-black' }],
      },
      {
        image: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1783682039/aztech-aztech-hypercable-usb-c-240w-1m-black-0-WhatsApp-Image-2024-12-17-at-12-4.jpg',
        title: 'HyperCable USB-C 240W',
        intro: 'Ultra-fast 240W USB-C cable — available in 1m Black and 2m Titanium.',
        bullets: ['240W Ultra-Fast Charging', 'USB-C to USB-C', 'Braided for Durability', '1m Black / 2m Titanium'],
        links: [
          { label: 'HyperCable 240W 1m', href: '/products/aztech-hypercable-usb-c-240w-1m-black' },
          { label: 'HyperCable 240W 2m', href: '/products/aztech-hypercable-usb-c-240w-2m-titanium' },
        ],
      },
    ],
  },
  gan: {
    heading: 'GaN HyperCharger Series',
    desc: 'GaN technology delivers more power in a smaller footprint — multi-port chargers up to 70W for fast, efficient home and office charging.',
    products: [
      {
        image: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1783682027/aztech-aztech-gan-ii-hypercharger-dual-ports-45w-0-Product-images_Gan2-01.jpg',
        title: 'GaN II HyperCharger 45W',
        intro: 'Dual-port 45W GaN charger with Quick Charge 3.0 — compact and travel-ready.',
        bullets: ['45W Power Output', 'USB-C + USB-A Dual Ports', 'GaN Technology', 'Quick Charge 3.0'],
        links: [{ label: 'GaN II 45W', href: '/products/aztech-gan-ii-hypercharger-dual-ports-45w' }],
      },
      {
        image: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1783682020/aztech-aztech-gan-hypercharger-3-ports-70w-0-Product-images_Gan3-01.jpg',
        title: 'GaN HyperCharger 70W',
        intro: 'Powerful 70W triple-port GaN charger — charge three devices simultaneously.',
        bullets: ['70W Power Output', '2× USB-C + 1× USB-A', 'GaN Technology', 'Light Indicator'],
        links: [{ label: 'GaN 70W 3-Port', href: '/products/aztech-gan-hypercharger-3-ports-70w' }],
      },
    ],
  },
  car: {
    heading: 'GaN Car HyperCharger Series',
    desc: 'High-power GaN car chargers delivering up to 95W — keep all your devices charged on the move without slowing down.',
    products: [
      {
        image: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1783682038/aztech-aztech-gan-car-hypercharger-dual-ports-95w-0-Product-images_Car-Charger-0.jpg',
        title: 'Car HyperCharger 95W Dual',
        intro: 'Dual-port 95W GaN car charger — one USB-C + one USB-A.',
        bullets: ['95W Power Output', 'USB-C + USB-A', 'GaN Technology', 'Light Indicator'],
        links: [{ label: 'Car 95W Dual', href: '/products/aztech-gan-car-hypercharger-dual-ports-95w' }],
      },
      {
        image: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1783682032/aztech-aztech-gan-car-hypercharger-3-ports-95w-0-Product-images_Car-Charger2-02-.jpg',
        title: 'Car HyperCharger 95W 3-Port',
        intro: 'Triple-port 95W GaN car charger — two USB-C and one USB-A for maximum versatility.',
        bullets: ['95W Power Output', '2× USB-C + 1× USB-A', 'GaN Technology', 'Light Indicator'],
        links: [{ label: 'Car 95W 3-Port', href: '/products/aztech-gan-car-hypercharger-3-ports-95w' }],
      },
    ],
  },
};

/* PSU — accordion (like KA Production Scanners) */
const psuSeries = [
  {
    num: '01',
    navTitle: 'ALPHA Series — 80PLUS Gold',
    tag: 'Gold Efficiency',
    heading: 'ALPHA Series',
    desc: 'Fully modular Gold-rated PSUs offering superior efficiency and clean power delivery for high-performance gaming and workstation builds.',
    features: [
      'Available in 650W, 750W, 850W, 1000W, 1050W',
      '80PLUS Gold Certified',
      'Fully Modular Cable Design',
      'Active PFC for Stable Output',
      'Low Noise Fan Operation',
      'Full Protection Suite (OVP / UVP / OCP / SCP)',
    ],
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1781989087/rookie-ninja/products/ALPHA-1000W-FM-01-1.jpg',
    imageLabel: 'ALPHA Series',
    links: [
      { label: '650W', href: '/products/alpha-650w-80plus-gold-fully-modular-power-supply-unit' },
      { label: '750W', href: '/products/alpha-750w-80plus-gold-fully-modular-power-supply-unit' },
      { label: '850W', href: '/products/alpha-850w-80plus-gold-fully-modular-power-supply-unit' },
      { label: '1000W', href: '/products/alpha-1000w-80plus-gold-fully-modular-power-supply-unit-psu' },
      { label: '1050W', href: '/products/alpha-1050w-80plus-gold-fully-modular-power-supply-unit' },
    ],
  },
  {
    num: '02',
    navTitle: 'NOVA Series — 80PLUS White',
    tag: 'White Efficiency',
    heading: 'NOVA Series',
    desc: 'Reliable White-rated PSUs in both non-modular and fully modular configurations — dependable power for mainstream builds.',
    features: [
      'Available in 650W, 750W, 850W',
      '80PLUS White Certified',
      'Non-Modular & Fully Modular Options',
      'Stable Voltage Regulation',
      'Universal AC Input',
      'Full Protection Suite',
    ],
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1781989136/rookie-ninja/products/NOVA-80PLUS-WHITE-01.jpg',
    imageLabel: 'NOVA Series',
    links: [
      { label: 'NOVA 650W NM', href: '/products/nova-650w-white-non-modular-power-supply-unit-psu' },
      { label: 'NOVA 750W NM', href: '/products/nova-750w-white-non-modular-power-supply-unit-psu' },
      { label: 'NOVA 850W FM', href: '/products/nova-850w-white-fully-modular-power-supply-unit-psu' },
    ],
  },
  {
    num: '03',
    navTitle: 'OMEGA Series — 80PLUS Platinum',
    tag: 'Platinum Efficiency',
    heading: 'OMEGA Series',
    desc: 'The pinnacle of Aztech PSU technology — fully modular Platinum-rated units engineered for elite builds demanding the absolute highest efficiency.',
    features: [
      'Available in 1050W, 1200W, 1250W',
      '80PLUS Platinum Certified',
      'Fully Modular Cable Design',
      'Premium 135mm Fan',
      'Flat Cables for Optimal Airflow',
      'Full Protection Suite',
    ],
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1781989188/rookie-ninja/products/Artboard-11-1.jpg',
    imageLabel: 'OMEGA Series',
    links: [
      { label: '1050W', href: '/products/omega-1050w-80plus-platinum-fully-modular-power-supply-unit-psu' },
      { label: '1200W', href: '/products/omega-1200w-80plus-platinum-fully-modular-power-supply-unit-psu' },
      { label: '1250W', href: '/products/omega-1250w-80plus-platinum-fully-modular-power-supply-unit-psu' },
    ],
  },
  {
    num: '04',
    navTitle: 'PRIME Series — 80PLUS Bronze',
    tag: 'Bronze Efficiency',
    heading: 'PRIME Series',
    desc: 'Bronze-rated PSUs in fully modular and non-modular designs — dependable power delivery for mainstream and value-oriented PC builds.',
    features: [
      'Available in 650W, 750W, 850W, 1000W, 1050W',
      '80PLUS Bronze Certified',
      'Fully Modular & Non-Modular Options',
      'Active PFC',
      'DC-to-DC Converter Design',
      'Full Protection Suite',
    ],
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1781989195/rookie-ninja/products/PRIME-80PLUS-FM-01.jpg',
    imageLabel: 'PRIME Series',
    links: [
      { label: 'PRIME 650W FM', href: '/products/prime-650w-80plus-bronze-fully-modular-power-supply-unit' },
      { label: 'PRIME 750W FM', href: '/products/prime-750w-80plus-bronze-fully-modular-power-supply-unit' },
      { label: 'PRIME 850W FM', href: '/products/prime-850w-80plus-bronze-fully-modular-power-supply-unit' },
      { label: 'PRIME 1000W FM', href: '/products/prime-1000w-80plus-bronze-fully-modular-power-supply-unit' },
    ],
  },
];

/* Gaming Peripherals + Mounts — tabs (like KA Flatbed Accessories) */
const gamingTabs = [
  { num: '01', label: 'Gaming Peripherals' },
  { num: '02', label: 'Mounts & Stands' },
];

const gamingPanels = [
  {
    left: {
      tag: 'Gaming Peripherals',
      title: 'Headsets, Mouse, Keyboard & Pads',
      desc: 'Aztech gaming peripherals are engineered for competitive edge — from wireless headsets with ANC to precision laser mice, mechanical keyboards, and XL RGB mouse pads.',
      features: [
        'Wireless Gaming Headset — 20dB ANC, 50hr battery, Bluetooth 5.0',
        'Wired Gaming Headset — 53mm driver, Virtual 7.1 Surround, USB + 3.5mm',
        'Gaming Mouse — Infrared Micro-Switch, 82,000 CPI, AVAGO A9800 Laser',
        'Mechanical Keyboard — RGB, Anti-Ghosting 87 keys, 50M click durability',
        'Gaming Mouse Pads — Standard Black and Extra Large LED RGB (35" × 15")',
      ],
    },
    right: {
      tag: 'Products',
      title: 'Full Peripherals Lineup',
      desc: 'Six products covering every station — two headsets, a precision mouse, mechanical keyboard, and two mouse pad options.',
      chips: [
        { label: 'Wireless Headset', href: '/products/aztech-wireless-gaming-headset-with-led' },
        { label: 'Wired Headset', href: '/products/aztech-wired-gaming-headset-with-microphone' },
        { label: 'Gaming Mouse', href: '/products/aztech-gaming-mouse-infrared-micro-switch-laser' },
        { label: 'Mechanical Keyboard', href: '/products/aztech-mechanical-gaming-keyboard-rgb' },
        { label: 'Mouse Pad Black', href: '/products/aztech-gaming-mouse-pad-black' },
        { label: 'LED Mouse Pad XL', href: '/products/aztech-extra-large-led-gaming-mouse-pad' },
      ],
    },
  },
  {
    left: {
      tag: 'Mounts & Stands',
      title: 'Trolley Stands & Wall Mounts',
      desc: 'Heavy-duty display mounting solutions for any environment — portable trolley stands to pro-grade fixed wall mounts, supporting screens from 14" up to 120".',
      features: [
        'Portable Trolley Stand LITE — 32" to 75"',
        'Heavy-Duty Trolley Stand — 55" to 100"',
        'Trolley Stand PRO — 42" to 100", 55" to 120", 62" to 120"',
        'Wall Mount Bracket LITE — 14" to 24"',
        'Fixed Heavy-Duty Wall Mount PRO — 75" to 120"',
      ],
    },
    right: {
      tag: 'Products',
      title: 'Full Mounts Lineup',
      desc: 'Seven mounting products for every screen size and environment.',
      chips: [
        { label: 'Trolley LITE (32"–75")', href: '/products/aztech-portable-trolley-stand-lite-32-75' },
        { label: 'Trolley (55"–100")', href: '/products/aztech-heavy-duty-trolley-stand-55-100' },
        { label: 'Trolley PRO (42"–100")', href: '/products/aztech-heavy-duty-trolley-stand-pro-42-100' },
        { label: 'Trolley PRO (55"–120")', href: '/products/aztech-heavy-duty-trolley-stand-pro-55-120' },
        { label: 'Trolley PRO (62"–120")', href: '/products/aztech-heavy-duty-trolley-stand-pro-62-120' },
        { label: 'Wall Bracket LITE (14"–24")', href: '/products/aztech-wall-mount-bracket-lite-14-24' },
        { label: 'Wall Mount PRO (75"–120")', href: '/products/aztech-fixed-wall-mount-pro-75-120' },
      ],
    },
  },
];

const AZ_NAV_LINKS = [
  { label: 'Display & Audio', href: '#display-audio' },
  { label: 'Mobile',          href: '#mobile' },
  { label: 'Gaming',          href: '#gaming' },
  { label: 'Mounts',          href: '#mounts' },
];

function AzNavInner({ accent, onMountsClick }: { accent: string; onMountsClick?: () => void }) {
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
        {AZ_NAV_LINKS.map(link => (
          <li key={link.href} style={{ flexShrink: 0 }}>
            <Link href={link.href}
               onClick={e => {
                 e.preventDefault();
                 if (link.href === '#mounts' && onMountsClick) onMountsClick();
                 document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
               }}
               style={{
                 display: 'inline-block', fontSize: 14, fontWeight: 500,
                 color: '#111', textDecoration: 'none', letterSpacing: '0.15px',
                 whiteSpace: 'nowrap', position: 'relative', paddingBottom: 3,
                 transition: 'color 0.2s',
               }}
               onMouseEnter={e => {
                 const el = e.currentTarget as HTMLAnchorElement;
                 el.style.color = accent;
                 (el.querySelector('.az-underline') as HTMLElement | null)?.style.setProperty('width', '100%');
               }}
               onMouseLeave={e => {
                 const el = e.currentTarget as HTMLAnchorElement;
                 el.style.color = '#111';
                 (el.querySelector('.az-underline') as HTMLElement | null)?.style.setProperty('width', '0');
               }}>
              {link.label}
              <span className="az-underline" style={{
                position: 'absolute', bottom: 0, left: 0, width: 0, height: 2,
                background: accent, borderRadius: 2, transition: 'width 0.25s ease',
              }} />
            </Link>
          </li>
        ))}
      </ul>
      <a href="#mobile"
         onClick={e => { e.preventDefault(); document.querySelector('#mobile')?.scrollIntoView({ behavior: 'smooth' }); }}
         style={{
           flexShrink: 0, padding: '11px 26px',
           background: accent, color: '#fff',
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
export default function AztechPage() {

  const [heroIdx, setHeroIdx]         = useState(0);
  const [progress, setProgress]       = useState(0);
  const rafRef                        = useRef<number | null>(null);
  const startRef                      = useRef<number | null>(null);
  const heroRef                       = useRef<HTMLElement>(null);
  const DURATION                      = 5000;

  const [isSticky, setIsSticky]       = useState(false);
  const [activeBar, setActiveBar]     = useState(0);
  const [imgFade, setImgFade]         = useState(false);
  const [cableTab, setCableTab]       = useState<'hypercable' | 'gan' | 'car'>('hypercable');
  const [psuActive, setPsuActive]     = useState(0);
  const [gameTab, setGameTab]         = useState(0);
  const [formState, setFormState]     = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

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
    if (isSticky) document.body.classList.add('az-subnav-active');
    else document.body.classList.remove('az-subnav-active');
    return () => document.body.classList.remove('az-subnav-active');
  }, [isSticky]);

  /* ── Scroll reveal ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('az-visible'); observer.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.az-reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* ── Soundbar image swap ── */
  const switchBar = (idx: number) => {
    if (idx === activeBar) return;
    setImgFade(true);
    setTimeout(() => { setActiveBar(idx); setImgFade(false); }, 300);
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

  const slide       = heroSlides[heroIdx];
  const cableContent = cablesData[cableTab];

  return (
    <main style={{ background: az.bg, color: az.text, fontFamily: 'var(--font-poppins)', overflowX: 'hidden' }}>

      {/* ══════════════════════════════════════════
          HERO SLIDER
      ══════════════════════════════════════════ */}
      <section ref={heroRef} className="az-hero" style={{ position: 'relative', width: '100%', overflow: 'hidden', background: '#000' }}>

        {heroSlides.map((s, i) => (
          <div key={s.id} className="az-slide"
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
            <div className="az-vignette" style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(90deg, rgba(0,0,0,0.72) 38%, transparent 80%)',
            }} />
            <div className="az-hero-container"
                 style={{ position: 'relative', zIndex: 3, width: '100%', maxWidth: 1220, margin: '0 auto', padding: '0 20px' }}>
              <div className="az-hero-content"
                   style={{
                     maxWidth: 580,
                     opacity: i === heroIdx ? 1 : 0,
                     transform: i === heroIdx ? 'translateY(0)' : 'translateY(24px)',
                     transition: 'opacity 0.7s ease 0.4s, transform 0.7s ease 0.4s',
                   }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8, background: az.accent, color: '#fff',
                  fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase',
                  padding: '5px 12px', marginBottom: 18, borderRadius: 2,
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff', opacity: 0.9, display: 'inline-block', animation: 'azPulse 2s infinite' }} />
                  {s.badge}
                </span>
                <h1 className="az-hero-heading"
                    style={{ fontSize: 'clamp(40px, 6vw, 78px)', color: '#fff', lineHeight: 0.95, marginBottom: 18, fontWeight: 700, letterSpacing: 1 }}>
                  {s.lines.map((line, li) => (
                    <span key={li} style={{ display: 'block', color: li === s.accentLine ? 'rgba(255,255,255,0.6)' : '#fff' }}>{line}</span>
                  ))}
                </h1>
                <p className="az-hero-desc"
                   style={{ fontSize: 15, color: 'rgba(255,255,255,0.72)', lineHeight: 1.65, marginBottom: 32, fontWeight: 300, maxWidth: 420 }}>
                  {s.desc}
                </p>
                <Link href={s.cta.href} className="az-hero-btn"
                   onClick={e => { e.preventDefault(); document.querySelector(s.cta.href)?.scrollIntoView({ behavior: 'smooth' }); }}
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
                     el.style.background = az.accent; el.style.borderColor = az.accent; el.style.color = '#fff';
                   }}
                   onMouseLeave={e => {
                     const el = e.currentTarget as HTMLAnchorElement;
                     el.style.background = s.cta.solid ? '#fff' : 'transparent';
                     el.style.borderColor = '#fff';
                     el.style.color = s.cta.solid ? '#0d0d0d' : '#fff';
                   }}>
                  {s.cta.label}
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Dots */}
        <div className="az-dots"
             style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(calc(-570px + 20px))', display: 'flex', gap: 10, zIndex: 10 }}>
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => goSlide(i)}
                    style={{
                      width: 10, height: 10, borderRadius: '50%', padding: 0, border: 'none', cursor: 'pointer',
                      background: i === heroIdx ? '#fff' : 'rgba(255,255,255,0.35)',
                      transform: i === heroIdx ? 'scale(1.3)' : 'scale(1)',
                      transition: 'background 0.3s, transform 0.3s',
                    }} />
          ))}
        </div>

        {/* Progress bar */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, height: 3,
          background: '#fff', width: `${progress}%`,
          zIndex: 10, transition: 'width 0.1s linear',
        }} />
      </section>

      {/* ══════════════════════════════════════════
          STICKY NAV
      ══════════════════════════════════════════ */}
      <div style={{
        width: '100%', background: '#fff',
        borderBottom: '1px solid rgba(0,0,0,0.09)',
        visibility: isSticky ? 'hidden' : 'visible',
      }}>
        <AzNavInner accent={az.accent} onMountsClick={() => setGameTab(1)} />
      </div>

      <div style={{
        width: '100%', background: '#fff',
        borderBottom: '1px solid rgba(0,0,0,0.09)',
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1001,
        boxShadow: '0 2px 20px rgba(0,0,0,0.12)',
        transform: isSticky ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
      }}>
        <AzNavInner accent={az.accent} onMountsClick={() => setGameTab(1)} />
      </div>

      {/* ══════════════════════════════════════════
          DISPLAY & AUDIO — IFP FEATURE CARDS
      ══════════════════════════════════════════ */}
      <section id="display-audio" style={{ width: '100%', background: '#f8fafc', padding: '72px 20px' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div className="az-reveal" style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700, color: az.text, marginBottom: 14, letterSpacing: -0.3 }}>
              Interactive Flat Panels
            </h2>
            <p style={{ fontSize: 15, color: '#64748b', lineHeight: 1.65, maxWidth: 560, margin: '0 auto' }}>
              Aztech Ideaflow interactive displays bring 4K clarity and multi-touch collaboration to classrooms, boardrooms, and large-format venues — from 55" to 110".
            </p>
          </div>
          <div className="az-sw-grid az-reveal az-reveal-d1" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
            {ifpCards.map((card, i) => (
              <div key={i} className={`az-reveal az-reveal-d${i + 1}`}
                   style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', overflow: 'hidden', boxShadow: '0 2px 16px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', transition: 'box-shadow 0.3s ease, transform 0.3s ease' }}
                   onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = '0 8px 32px rgba(0,0,0,0.12)'; }}
                   onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(0)'; el.style.boxShadow = '0 2px 16px rgba(0,0,0,0.06)'; }}>
                <div style={{ width: '100%', height: 220, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #f1f5f9' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={card.image} alt={card.title} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 24, display: 'block' }} />
                </div>
                <div style={{ padding: '24px 24px 28px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: az.accent, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 8 }}>{card.tag}</p>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: az.text, marginBottom: 10, lineHeight: 1.3 }}>{card.title}</h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 7, flex: 1 }}>
                    {card.features.map((f, j) => (
                      <li key={j} style={{ fontSize: 13, fontWeight: 500, color: '#374151', paddingLeft: 16, position: 'relative', lineHeight: 1.4 }}>
                        <span style={{ position: 'absolute', left: 0, top: 6, width: 6, height: 6, borderRadius: '50%', background: az.accent, display: 'inline-block' }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 16 }}>
                    {card.links.map(lnk => (
                      <Link key={lnk.href} href={lnk.href}
                         style={{ fontSize: 12, fontWeight: 600, padding: '5px 14px', borderRadius: 4, border: `1.5px solid ${az.accent}`, color: az.accent, textDecoration: 'none', background: '#fff', transition: 'all 0.2s' }}
                         onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = az.accent; el.style.color = '#fff'; }}
                         onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = '#fff'; el.style.color = az.accent; }}>
                        {lnk.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SOUNDBARS — INTERACTIVE PICKER
      ══════════════════════════════════════════ */}
      <section style={{ width: '100%', padding: '80px 20px', background: '#fff' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>

          <div className="az-reveal" style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 700, color: '#0f1320', marginBottom: 10 }}>
              Aztech Soundbars
            </h2>
            <p style={{ fontSize: 16, color: '#64748b', maxWidth: 700, lineHeight: 1.7 }}>
              Powerful wired-subwoofer soundbars designed to pair with Aztech displays — from stereo 2.1 to immersive 5.1 surround sound.
            </p>
          </div>

          <div className="az-scanner-layout az-reveal az-reveal-d1"
               style={{ display: 'flex', gap: 60, alignItems: 'center', justifyContent: 'center', minHeight: 500 }}>

            {/* Left — items */}
            <div className="az-scanner-items" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
              {soundbars.map((item, idx) => (
                <div key={item.id} onClick={() => switchBar(idx)}
                     style={{
                       cursor: 'pointer', padding: 24, borderRadius: 16,
                       border: activeBar === idx ? '1px solid #e2e8f0' : '1px solid transparent',
                       background: activeBar === idx ? '#fff' : 'transparent',
                       boxShadow: activeBar === idx ? '0 10px 25px -5px rgba(0,0,0,0.05)' : 'none',
                       transition: 'all 0.3s ease',
                     }}
                     onMouseEnter={e => { if (activeBar !== idx) (e.currentTarget as HTMLDivElement).style.background = '#f8fafc'; }}
                     onMouseLeave={e => { if (activeBar !== idx) (e.currentTarget as HTMLDivElement).style.background = 'transparent'; }}>
                  <p style={{ color: az.accent, fontSize: 13, textTransform: 'uppercase', marginBottom: 8, letterSpacing: '0.5px', fontWeight: 600 }}>
                    {item.eyebrow}
                  </p>
                  <h3 style={{ fontSize: 22, marginBottom: 14, color: '#0f1320', fontWeight: 600 }}>{item.title}</h3>
                  <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.7, margin: 0 }}>{item.intro}</p>
                  {activeBar === idx && (
                    <>
                      <ul style={{ marginTop: 12, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>
                        {item.bullets.map(b => (
                          <li key={b} style={{ fontSize: 14, color: '#475569', lineHeight: 1.8, display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ width: 5, height: 5, borderRadius: '50%', background: az.accent, flexShrink: 0, display: 'inline-block' }} />
                            {b}
                          </li>
                        ))}
                      </ul>
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 14 }}>
                        {item.links.map(lnk => (
                          <Link key={lnk.href} href={lnk.href}
                             style={{ fontSize: 12, fontWeight: 600, padding: '5px 14px', borderRadius: 4, border: `1.5px solid ${az.accent}`, color: az.accent, textDecoration: 'none', background: '#fff', transition: 'all 0.2s' }}
                             onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = az.accent; el.style.color = '#fff'; }}
                             onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = '#fff'; el.style.color = az.accent; }}>
                            {lnk.label}
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Right — image */}
            <div className="az-scanner-img-wrap" style={{ flex: 1.2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={soundbars[activeBar].image}
                   alt={soundbars[activeBar].title}
                   className="az-scanner-img"
                   style={{
                     width: '100%', maxWidth: 600, height: 450,
                     objectFit: 'contain', borderRadius: 20,
                     opacity: imgFade ? 0 : 1,
                     transition: 'opacity 0.4s ease',
                   }} />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MOBILE / CABLES — DARK SECTION + FORM
      ══════════════════════════════════════════ */}
      <section id="mobile"
               style={{ width: '100%', background: 'linear-gradient(90deg, #0b1a2e, #0d223d)', padding: '80px 20px', color: '#fff' }}>
        <div className="az-comm-inner"
             style={{ maxWidth: 1140, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 420px', gap: 60, alignItems: 'center' }}>

          <div className="az-reveal">
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 700, marginBottom: 20, color: '#fff', lineHeight: 1.2 }}>
              Cables & Chargers
            </h2>
            <p style={{ fontSize: 15, color: '#cbd5e1', lineHeight: 1.7 }}>
              Aztech's mobile charging lineup delivers fast, reliable power for every device — GaN home chargers, high-wattage car chargers, and ultra-fast HyperCables up to 240W, all built with efficiency and durability in mind.
            </p>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.06)', padding: 30,
            borderRadius: 14, border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(8px)',
          }}>
            <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 20, color: '#fff' }}>Inquire for Distribution</h3>
            {formState === 'success' ? (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>✓</div>
                <p style={{ color: '#86efac', fontWeight: 600, fontSize: 15 }}>Inquiry sent successfully!</p>
                <p style={{ color: '#cbd5e1', fontSize: 13, marginTop: 6 }}>We&apos;ll be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {(['text:name:Full Name', 'email:email:Business Email'] as const).map(raw => {
                  const [type, name, placeholder] = raw.split(':');
                  return (
                    <input key={name} type={type} name={name} placeholder={placeholder} required
                           style={{
                             width: '100%', padding: '12px 14px', borderRadius: 6,
                             border: 'none', background: 'rgba(255,255,255,0.12)',
                             color: '#fff', fontSize: 14, outline: 'none', fontFamily: 'var(--font-poppins)',
                           }} />
                  );
                })}
                <select name="category" required
                        style={{
                          width: '100%', padding: '12px 14px', borderRadius: 6,
                          border: 'none', background: 'rgba(255,255,255,0.12)',
                          color: '#e5e7eb', fontSize: 14, outline: 'none', fontFamily: 'var(--font-poppins)',
                        }}>
                  <option value="" style={{ background: '#fff', color: '#000' }}>Select Product Category</option>
                  {['Interactive Flat Panels (IFP)', 'Soundbars', 'Cables & Chargers', 'Gaming Peripherals', 'Power Supply Units (PSU)', 'Mounts & Stands'].map(o => (
                    <option key={o} style={{ background: '#fff', color: '#000' }}>{o}</option>
                  ))}
                </select>
                {formState === 'error' && <p style={{ fontSize: 12, color: '#fca5a5' }}>Something went wrong. Please try again.</p>}
                <button type="submit" disabled={formState === 'sending'}
                        style={{
                          marginTop: 10, padding: 13, background: az.accent, color: '#fff',
                          fontWeight: 600, border: 'none', borderRadius: 6,
                          cursor: formState === 'sending' ? 'not-allowed' : 'pointer',
                          letterSpacing: 1, fontSize: 13,
                          opacity: formState === 'sending' ? 0.7 : 1,
                          transition: 'opacity 0.2s', fontFamily: 'var(--font-poppins)',
                        }}>
                  {formState === 'sending' ? 'SENDING…' : 'SEND INQUIRY'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── Cables product tabs ── */}
      <section style={{ width: '100%', padding: '40px 20px 60px', background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          <div style={{ display: 'flex', flexWrap: 'wrap', borderBottom: '2px solid #eee', marginBottom: 40, gap: 10 }}>
            {([['hypercable', 'HyperCables'], ['gan', 'GaN Home Chargers'], ['car', 'Car Chargers']] as const).map(([key, label]) => (
              <button key={key} onClick={() => setCableTab(key)}
                      style={{
                        padding: '15px 22px', cursor: 'pointer',
                        fontWeight: 700, fontSize: 14, textTransform: 'uppercase', letterSpacing: 1,
                        color: cableTab === key ? az.accent : '#888',
                        border: 'none', background: 'none', position: 'relative',
                        fontFamily: 'var(--font-poppins)',
                      }}>
                {label}
                {cableTab === key && <span style={{ position: 'absolute', bottom: -2, left: 0, width: '100%', height: 3, background: az.accent, display: 'block' }} />}
              </button>
            ))}
          </div>

          <div className="az-net-panel" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 50 }}>
            <div>
              <h2 style={{ fontSize: 'clamp(20px, 3vw, 34px)', color: '#000', marginBottom: 20, lineHeight: 1.2 }}>
                {cableContent.heading}
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: '#555' }}>{cableContent.desc}</p>
            </div>
            <div className="az-net-products" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 30 }}>
              {cableContent.products.map(p => (
                <div key={p.title} style={{ background: '#fff', border: '1px solid #eee', padding: 24, borderRadius: 8 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt={p.title}
                       className="az-net-img"
                       style={{ width: '100%', height: 260, objectFit: 'contain', marginBottom: 20, borderRadius: 6 }} />
                  <h4 style={{ fontSize: 20, margin: '10px 0 14px', color: '#000' }}>{p.title}</h4>
                  <p style={{ fontSize: 14, color: '#555', marginBottom: 8 }}>{p.intro}</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {p.bullets.map(b => (
                      <li key={b} style={{ fontSize: 14, color: '#555', lineHeight: 1.9, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: az.accent, flexShrink: 0, display: 'inline-block' }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 14 }}>
                    {p.links.map(lnk => (
                      <Link key={lnk.href} href={lnk.href}
                         style={{ fontSize: 12, fontWeight: 600, padding: '5px 14px', borderRadius: 4, border: `1.5px solid ${az.accent}`, color: az.accent, textDecoration: 'none', background: '#fff', transition: 'all 0.2s' }}
                         onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = az.accent; el.style.color = '#fff'; }}
                         onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = '#fff'; el.style.color = az.accent; }}>
                        {lnk.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          GAMING — PSU ACCORDION
      ══════════════════════════════════════════ */}
      <section id="gaming" style={{ width: '100%', background: '#f8fafc', padding: '60px 20px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          <div className="az-reveal" style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 700, color: '#000', marginBottom: 6 }}>Power Supply Units</h2>
            <p style={{ fontSize: 15, color: '#6b7280' }}>High-efficiency PSU solutions built for gaming rigs, workstations, and demanding PC builds.</p>
          </div>

          <div className="az-prod-body az-reveal az-reveal-d1"
               style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden', minHeight: 520 }}>

            {/* Left nav */}
            <div className="az-prod-list" style={{ borderRight: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', background: '#fff' }}>
              {psuSeries.map((item, idx) => (
                <div key={item.num} onClick={() => setPsuActive(idx)}
                     style={{ borderBottom: idx < psuSeries.length - 1 ? '1px solid #e5e7eb' : 'none', cursor: 'pointer' }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 14, padding: '18px 24px',
                    background: psuActive === idx ? '#f0f0f0' : '#fff', transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => { if (psuActive !== idx) (e.currentTarget as HTMLDivElement).style.background = '#f9fafb'; }}
                  onMouseLeave={e => { if (psuActive !== idx) (e.currentTarget as HTMLDivElement).style.background = '#fff'; }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: az.accent, letterSpacing: 1, minWidth: 24 }}>{item.num}</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: psuActive === idx ? az.accent : '#1f2937', flex: 1, lineHeight: 1.4 }}>{item.navTitle}</span>
                    <span style={{ fontSize: 18, color: psuActive === idx ? az.accent : '#d1d5db', transition: 'transform 0.3s, color 0.3s', transform: psuActive === idx ? 'rotate(90deg)' : 'none' }}>›</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Right panel */}
            <div style={{ background: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
              {psuSeries.map((item, idx) => (
                <div key={item.num}
                     style={{
                       display: psuActive === idx ? 'flex' : 'none',
                       flexDirection: 'column', height: '100%',
                       padding: '36px 36px 28px', gap: 20,
                     }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: az.accent, textTransform: 'uppercase', letterSpacing: 1, margin: 0 }}>{item.tag}</p>
                  <h3 style={{ fontSize: 22, fontWeight: 700, color: '#0f1320', margin: '6px 0 10px', lineHeight: 1.3 }}>{item.heading}</h3>
                  <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.75, margin: 0 }}>{item.desc}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {item.features.map(f => (
                      <div key={f} style={{ fontSize: 13, color: '#374151', display: 'flex', alignItems: 'flex-start', gap: 8, lineHeight: 1.5 }}>
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: az.accent, flexShrink: 0, marginTop: 6 }} />
                        {f}
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {item.links.map(lnk => (
                      <Link key={lnk.href} href={lnk.href}
                         style={{ fontSize: 12, fontWeight: 600, padding: '5px 14px', borderRadius: 4, border: `1.5px solid ${az.accent}`, color: az.accent, textDecoration: 'none', background: '#fff', transition: 'all 0.2s' }}
                         onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = az.accent; el.style.color = '#fff'; }}
                         onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = '#fff'; el.style.color = az.accent; }}>
                        {lnk.label}
                      </Link>
                    ))}
                  </div>
                  <div style={{ marginTop: 'auto', paddingTop: 20 }}>
                    <div style={{ borderRadius: 6, overflow: 'hidden', border: '1px solid #e5e7eb', background: '#fff' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.image} alt={item.imageLabel}
                           style={{ width: '100%', height: 200, objectFit: 'contain', display: 'block' }} />
                      <div style={{ fontSize: 11, fontWeight: 700, textAlign: 'center', background: az.accent, color: '#fff', padding: '6px 0', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                        {item.imageLabel}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          GAMING PERIPHERALS + MOUNTS — TABS
      ══════════════════════════════════════════ */}
      <span id="mounts" style={{ display: 'block', height: 0 }} />
      <section style={{ width: '100%', background: '#fff', padding: '60px 20px 80px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          <div className="az-reveal" style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 700, color: '#000', marginBottom: 6 }}>Gaming Peripherals & Mounts</h2>
            <p style={{ fontSize: 15, color: '#6b7280' }}>Pro gaming peripherals and heavy-duty display mounting solutions for every setup and environment.</p>
          </div>

          <div className="az-flat-tabs az-reveal az-reveal-d1" style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
            {gamingTabs.map((tab, i) => (
              <button key={i} onClick={() => setGameTab(i)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        padding: '10px 24px', borderRadius: 4, cursor: 'pointer',
                        border: `1.5px solid ${gameTab === i ? az.accent : '#e5e7eb'}`,
                        background: gameTab === i ? az.accent : '#fff',
                        transition: 'all 0.2s', fontFamily: 'var(--font-poppins)',
                      }}>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: gameTab === i ? 'rgba(255,255,255,0.6)' : '#9ca3af' }}>{tab.num}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: gameTab === i ? '#fff' : '#374151' }}>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="az-flat-grid"
               style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: '#f3f4f6', border: '1px solid #f3f4f6', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ background: '#fff', padding: 36, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: az.accent, textTransform: 'uppercase', letterSpacing: '1.2px', margin: 0 }}>{gamingPanels[gameTab].left.tag}</p>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0f1320', margin: 0, lineHeight: 1.4 }}>{gamingPanels[gameTab].left.title}</h3>
              <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.75, margin: 0 }}>{gamingPanels[gameTab].left.desc}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                {gamingPanels[gameTab].left.features.map(f => (
                  <div key={f} style={{ fontSize: 13, color: '#374151', display: 'flex', alignItems: 'flex-start', gap: 9, lineHeight: 1.5 }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: az.accent, flexShrink: 0, marginTop: 5 }} />
                    {f}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: '#fff', padding: 36, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: az.accent, textTransform: 'uppercase', letterSpacing: '1.2px', margin: 0 }}>{gamingPanels[gameTab].right.tag}</p>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0f1320', margin: 0, lineHeight: 1.4 }}>{gamingPanels[gameTab].right.title}</h3>
              <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.75, margin: 0 }}>{gamingPanels[gameTab].right.desc}</p>
              <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 8, padding: 20 }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: az.accent, textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 12px' }}>Products</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {gamingPanels[gameTab].right.chips.map(chip => (
                    <Link key={chip.href} href={chip.href}
                       style={{ fontSize: 12, fontWeight: 600, background: '#fff', border: `1px solid ${az.accent}`, color: az.accent, padding: '4px 12px', borderRadius: 4, textDecoration: 'none', transition: 'all 0.2s' }}
                       onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = az.accent; el.style.color = '#fff'; }}
                       onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = '#fff'; el.style.color = az.accent; }}>
                      {chip.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════
          RESPONSIVE STYLES
      ══════════════════════════════════════════ */}
      <style>{`
        @keyframes azPulse { 0%,100%{ opacity:1; transform:scale(1); } 50%{ opacity:.5; transform:scale(.8); } }
        body.az-subnav-active .ka-navbar-hide { transform: translateY(-120%) !important; pointer-events: none !important; }
        .az-reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.65s cubic-bezier(0.22,1,0.36,1), transform 0.65s cubic-bezier(0.22,1,0.36,1); }
        .az-reveal.az-visible { opacity: 1; transform: translateY(0); }
        .az-reveal-d1 { transition-delay: 0.12s; }
        .az-reveal-d2 { transition-delay: 0.24s; }

        .az-hero { height: 680px; }

        @media (max-width: 1024px) {
          .az-comm-inner   { grid-template-columns: 1fr !important; gap: 40px !important; }
          .az-net-panel    { grid-template-columns: 1fr !important; gap: 32px !important; }
          .az-prod-body    { grid-template-columns: 1fr !important; }
          .az-prod-list    { border-right: none !important; border-bottom: 1px solid #e5e7eb !important; }
          .az-flat-grid    { grid-template-columns: 1fr !important; }
          .az-scanner-layout { flex-direction: column-reverse !important; gap: 32px !important; min-height: unset !important; }
          .az-scanner-img  { height: 320px !important; }
          .az-sw-grid      { grid-template-columns: 1fr !important; }
        }

        @media (max-width: 768px) {
          .az-hero { height: 420px !important; }
          .az-slide { align-items: flex-end !important; padding-bottom: 70px !important; }
          .az-vignette { background: linear-gradient(180deg, transparent 10%, rgba(0,0,0,0.85) 70%) !important; }
          .az-hero-container { padding: 0 24px !important; }
          .az-hero-content { max-width: 100% !important; }
          .az-dots { left: 24px !important; transform: none !important; bottom: 22px !important; }
          .az-net-products { grid-template-columns: 1fr !important; }
          .az-net-img { height: 200px !important; }
          .az-scanner-img { height: 260px !important; }
        }

        @media (max-width: 480px) {
          .az-hero { height: 550px !important; }
          .az-hero-content { max-width: 100% !important; }
          .az-hero-desc { font-size: 13px !important; margin-bottom: 20px !important; }
          .az-hero-btn { padding: 10px 20px !important; font-size: 12px !important; margin-bottom: 35px !important; }
          .az-flat-tabs { flex-direction: column !important; }
          .az-flat-tabs button { width: 100% !important; justify-content: flex-start !important; }
        }
      `}</style>
    </main>
  );
}
