'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

/* ─────────────────────────────────────────────
   THEME
───────────────────────────────────────────── */
const c = {
  bg:          '#ffffff',
  alt:         '#f9fafb',
  alt2:        '#f8fafc',
  accent:      '#003087',
  accentHover: '#002060',
  highlight:   '#71C5E8',
  line:        'rgba(0,0,0,0.08)',
  text:        '#0f1320',
  dim:         '#6b7280',
};

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const heroSlides = [
  {
    badge: 'Official Distributor',
    heading: 'Desktop',
    accentWord: 'Scanners.',
    desc: 'From the compact ADS-1300 to the versatile ADS-3100 — Brother desktop scanners deliver fast, reliable document capture for every workspace.',
    cta: { label: 'View Scanners', href: '#desktop-scanners', solid: true },
    bg: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1782247892/category-desktop-scanners-desktop_j1d46b.webp',
  },
  {
    badge: 'Wireless & Network',
    heading: 'Network',
    accentWord: 'Scanners.',
    desc: 'The ADS-1350W, ADS-4300N, ADS-4700w, and ADS-4900w — wireless and wired network scanners built for connected office environments.',
    cta: { label: 'View Scanners', href: '#wireless-network-scanners', solid: true },
    bg: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1782247893/portable-scanner-category-desktop_yny2pr.webp',
  },
  {
    badge: 'Printers',
    heading: 'Brother',
    accentWord: 'Printers.',
    desc: 'Inkjet, Colour Laser, Monochrome Laser, and Toner Box Series — Brother printers engineered for performance, efficiency, and reliability.',
    cta: { label: 'View Printers', href: '#printers', solid: true },
    bg: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1782247890/inkjet-filter-category-desktop_d3uuf1.webp',
  },
];

const navLinks = [
  { label: 'Desktop Scanners',            href: '#desktop-scanners'           },
  { label: 'Wireless & Network Scanners', href: '#wireless-network-scanners'  },
  { label: 'Printers',                    href: '#printers'                   },
  { label: 'Ink & Toner',                 href: '#ink-toner'                  },
  { label: 'Consumables & Accessories',   href: '#consumables-accessories'    },
];

const desktopCards = [
  {
    tag: 'Entry Level',
    title: 'ADS-1300',
    desc: 'Compact single-pass duplex scanner designed for personal and home office use.',
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1782248299/ADS-1300_F_sh3tus.webp',
    features: [
      '30ppm / 60ipm duplex scanning',
      '20 Sheet ADF capacity',
      'USB bus-powered — no power adapter needed',
      'Scans to PDF, JPEG, TIFF & more',
      'Compatible with Windows & macOS',
    ],
    links: [
      { label: 'ADS-1300', href: '/products/brother-ads-1300-portable-document-scanner' },
    ],
  },
  {
    tag: 'Professional Desktop',
    title: 'ADS-3100',
    desc: 'High-speed desktop scanner built for busy professionals with demanding daily scan volumes.',
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1782248522/lg_1000p_0ba6b554-cff5-411a-a9d6-98a0f7a3c35d_mxes4f-removebg-preview_ucc1fd.webp',
    features: [
      '40ppm / 80ipm duplex scanning',
      '50 Sheet ADF capacity',
      'Automatic Document Size Detection',
      'USB 3.0 connectivity',
      'Ultrasonic double-feed detection',
    ],
    links: [
      { label: 'ADS-3100', href: '/products/brother-ads-3100-desktop-document-scanner' },
    ],
  },
];

const networkRows = [
  {
    tag: 'Compact Wireless',
    title: 'ADS-1350W',
    desc: 'Portable wireless scanner with Wi-Fi for flexible scanning anywhere.',
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1782247890/ADS-1350W_F_mbfppy.webp',
    features: ['30ppm / 60ipm duplex', 'Wi-Fi & USB connectivity', '20 Sheet ADF', 'Scan to cloud & mobile', 'USB bus-powered'],
    links: [{ label: 'ADS-1350W', href: '/products/brother-ads-1350w-portable-document-scanner' }],
    reverse: false,
  },
  {
    tag: 'Wired Network',
    title: 'ADS-4300N',
    desc: 'Wired network scanner for reliable, high-speed shared scanning.',
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1782247892/lg_1000p_dc4545fa-b202-43b3-8277-370ab4d1c3d9-600x600_c3vsa6.webp',
    features: ['40ppm / 80ipm duplex', 'Gigabit Ethernet & USB', '80 Sheet ADF', 'Scan to network folders & FTP', 'Touchscreen LCD panel'],
    links: [{ label: 'ADS-4300N', href: '/products/brother-ads-4300n-desktop-document-scanner' }],
    reverse: true,
  },
  {
    tag: 'Advanced Wireless',
    title: 'ADS-4700W',
    desc: 'Feature-rich wireless scanner with large touchscreen for departmental use.',
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1782247891/lg_1000p_224e8e5c-42ea-4ed8-a3b2-31d80405ab3e_b4mkqi.webp',
    features: ['60ppm / 120ipm duplex', 'Wi-Fi, LAN & USB', '80 Sheet ADF', '4.3" colour touchscreen', 'Scan to SharePoint & cloud'],
    links: [{ label: 'ADS-4700W', href: '/products/brother-ads-4700w-professional-desktop-document-scanner' }],
    reverse: false,
  },
  {
    tag: 'High Speed Network',
    title: 'ADS-4900W',
    desc: 'High-volume wireless & wired network scanner for demanding workgroups.',
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1782247887/lg_1000p_a31a4911-15fb-4cea-9107-5b63fcf2eb21-600x600_lcgozm.webp',
    features: ['60ppm / 120ipm duplex', 'Wi-Fi, LAN & USB', '100 Sheet ADF', '4.3" colour touchscreen', 'Ultrasonic double-feed detection'],
    links: [{ label: 'ADS-4900W', href: '/products/brother-ads-4900w-professional-desktop-document-scanner' }],
    reverse: true,
  },
];

const printerTabs = [
  {
    label: 'Inkjet Printers',
    heading: 'Inkjet Printers',
    intro: 'Brother inkjet printers offer vibrant colour output, wireless connectivity, and versatile media handling for home and small office use.',
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1782247888/MFC_J3940DW_F-removebg-preview_tybl78.webp',
    cardTitle: 'Inkjet Printers',
    points: ['Wireless (Wi-Fi) & USB connectivity', 'Colour & mono printing, copying & scanning', 'Mobile printing via AirPrint & Mopria', 'Suitable for home & small office use', 'Low cost-per-page ink systems'],
    links: [
      { label: 'MFC-J3540DW', href: '/products/brother-mfc-j3540dw' },
    ],
  },
  {
    label: 'Colour Laser',
    heading: 'Colour Laser Printers',
    intro: 'High-speed colour laser printers for professional-quality colour documents in demanding business environments.',
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1782247889/MFC-L8730CDW_front_No_Reflection-removebg-preview_izv91j.webp',
    cardTitle: 'Colour Laser Printers',
    points: ['Fast colour & mono output (up to 30ppm)', 'Wired LAN, Wi-Fi & USB connectivity', 'Automatic duplex printing', 'High-yield toner options', 'Compact footprint for office use'],
    links: [
      { label: 'DCP-L3510CDW', href: '/products/brother-dcp-l3510cdw' },
      { label: 'DCP-L3520CDW', href: '/products/brother-dcp-l3520cdw' },
      { label: 'DCP-L3551CDW', href: '/products/brother-dcp-l3551cdw' },
      { label: 'DCP-L3560CDW', href: '/products/brother-dcp-l3560cdw' },
      { label: 'HL-L3220CW',   href: '/products/brother-hl-l3220cw' },
      { label: 'HL-L3270CDW',  href: '/products/brother-hl-l3270cdw' },
      { label: 'HL-L3280CDW',  href: '/products/brother-hl-l3280cdw' },
      { label: 'HL-L8360CDW',  href: '/products/brother-hl-l8360cdw' },
      { label: 'MFC-L3720CDW', href: '/products/brother-mfc-l3720cdw' },
      { label: 'MFC-L3750CDW', href: '/products/brother-mfc-l3750cdw' },
      { label: 'MFC-L3760CDW', href: '/products/brother-mfc-l3760cdw' },
      { label: 'MFC-L8390CDW', href: '/products/brother-mfc-l8390cdw' },
      { label: 'MFC-L8690CDW', href: '/products/brother-mfc-l8690cdw' },
      { label: 'MFC-L9570CDW', href: '/products/brother-mfc-l9570cdw' },
    ],
  },
  {
    label: 'Monochrome Laser',
    heading: 'Monochrome Laser Printers',
    intro: 'Reliable, high-speed mono laser printers — the cost-efficient choice for high-volume document printing in any office.',
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1782247888/MFC-L2885DW_F-removebg-preview_f9t3df.webp',
    cardTitle: 'Monochrome Laser Printers',
    points: ['High-speed mono printing (up to 50ppm)', 'Network & wireless ready', 'Automatic duplex printing', 'Large paper capacity options', 'Ultra-high yield toner compatible'],
    links: [
      { label: 'DCP-L2535D',  href: '/products/brother-dcp-l2535d' },
      { label: 'DCP-L2550DW', href: '/products/brother-dcp-l2550dw' },
      { label: 'DCP-L2600D',  href: '/products/brother-dcp-l2600d' },
      { label: 'DCP-L2625DW', href: '/products/brother-dcp-l2625dw' },
      { label: 'DCP-L2640DW', href: '/products/brother-dcp-l2640dw' },
      { label: 'HL-L2370DN',  href: '/products/brother-hl-l2370dn' },
      { label: 'HL-L2375DW',  href: '/products/brother-hl-l2375dw' },
      { label: 'HL-L2400D',   href: '/products/brother-hl-l2400d' },
      { label: 'HL-L2460DN',  href: '/products/brother-hl-l2460dn' },
      { label: 'HL-L2461DW',  href: '/products/brother-hl-l2461dw' },
      { label: 'HL-L5200DW',  href: '/products/brother-hl-l5200dw' },
      { label: 'HL-L6200DW',  href: '/products/brother-hl-l6200dw' },
      { label: 'HL-L6400DW',  href: '/products/brother-hl-l6400dw' },
      { label: 'MFC-L2715DW', href: '/products/brother-mfc-l2715dw' },
      { label: 'MFC-L2750DW', href: '/products/brother-mfc-l2750dw' },
      { label: 'MFC-L2805DW', href: '/products/brother-mfc-l2805dw' },
      { label: 'MFC-L2885DW', href: '/products/brother-mfc-l2885dw' },
      { label: 'MFC-L5755DW', href: '/products/brother-mfc-l5755dw' },
      { label: 'MFC-L6900DW', href: '/products/brother-mfc-l6900dw' },
    ],
  },
  {
    label: 'Toner Box Series',
    heading: 'Toner Box Series',
    intro: "Brother's innovative Toner Box printers use a refillable toner system for an ultra-low cost per page — ideal for very high-volume printing.",
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1782247886/20240701063551_MFC-B7810DW_F-removebg-preview_rksdvc.webp',
    cardTitle: 'Toner Box Series Printers',
    points: ['Refillable toner box system', 'Ultra-low cost per page', 'High-speed mono laser output', 'Wired & wireless network ready', 'Ideal for high-volume environments'],
    links: [] as { label: string; href: string }[],
  },
];

const cartridgeItems = [
  {
    num: '01',
    title: 'Ink Cartridges',
    tag: 'Inkjet Consumables',
    heading: 'Ink Cartridges',
    desc: 'Genuine Brother ink cartridges deliver vivid, long-lasting colour and sharp mono output for Brother inkjet printers.',
    features: [
      'Genuine Brother formula for optimal print quality',
      'Available in standard and high-yield versions',
      'Cyan, Magenta, Yellow & Black options',
      'Fade-resistant, water-resistant output',
      'Compatible with all Brother inkjet models',
    ],
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1782247886/LC472BK-removebg-preview_pywm6v.webp',
    cap: 'Ink Cartridges',
  },
  {
    num: '02',
    title: 'Toner Cartridges',
    tag: 'Laser Consumables',
    heading: 'Toner Cartridges',
    desc: 'Genuine Brother toner cartridges for laser printers — delivering sharp, consistent print quality across every page.',
    features: [
      'Standard and ultra-high yield variants available',
      'Mono & colour toner for all laser ranges',
      'Crisp text and image reproduction',
      'Consistent output up to last page',
      'Compatible with Brother laser & Toner Box printers',
    ],
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1782247885/61FxhOrAQOL._AC_SX522_-removebg-preview_foiqdf.webp',
    cap: 'Toner Cartridges',
  },
];

const accessoryCards = [
  {
    tag: 'Laser Accessory',
    title: 'Drum Unit',
    desc: 'Genuine Brother drum units for consistent, high-quality laser print output across thousands of pages.',
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1782247885/DR665CL-3QL-removebg-preview_yiuvp9.webp',
  },
  {
    tag: 'Colour Laser',
    title: 'Belt Unit',
    desc: 'Replacement belt units for Brother colour laser printers — essential for accurate paper transport and print registration.',
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1782247885/BU635CL_3QL-removebg-preview_fxrsfe.webp',
  },
  {
    tag: 'Maintenance',
    title: 'Waste Toner Box',
    desc: 'Genuine waste toner collection boxes for Brother colour laser printers to maintain clean, reliable operation.',
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1782247886/WT229CL_3QL-removebg-preview_suwb15.webp',
  },
  {
    tag: 'Maintenance',
    title: 'Fuser Unit',
    desc: 'OEM fuser units for Brother laser printers ensuring proper toner bonding and long-term printer reliability.',
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1782247885/FD-5000_3QL-removebg-preview_eye1o6.webp',
  },
];

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function BrotherPage() {
  const [slide, setSlide]               = useState(0);
  const [progress, setProgress]         = useState(0);
  const [isSticky, setIsSticky]         = useState(false);
  const [activePrinterTab, setActivePrinterTab] = useState(0);
  const [activeCartridge, setActiveCartridge]   = useState(0);
  const [winW, setWinW]                 = useState(1200);
  const startRef  = useRef<number>(0);
  const rafRef    = useRef<number>(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const DURATION  = 5000;
  const isMobile = winW < 768;
  const isTablet = winW < 900;

  /* ── SLIDE TIMER ── */
  useEffect(() => {
    function tick(ts: number) {
      if (!startRef.current) startRef.current = ts;
      const pct = Math.min(((ts - startRef.current) / DURATION) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setSlide(s => (s + 1) % heroSlides.length);
      }
    }
    startRef.current = 0;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [slide]);

  /* ── WINDOW WIDTH ── */
  useEffect(() => {
    function onResize() { setWinW(window.innerWidth); }
    setWinW(window.innerWidth);
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  /* ── STICKY SUBNAV ── */
  useEffect(() => {
    function onScroll() {
      const sliderH = sliderRef.current ? sliderRef.current.offsetHeight : 0;
      setIsSticky(window.scrollY >= sliderH);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── BODY CLASS ── */
  useEffect(() => {
    if (isSticky) document.body.classList.add('ka-subnav-active');
    else document.body.classList.remove('ka-subnav-active');
    return () => document.body.classList.remove('ka-subnav-active');
  }, [isSticky]);

  /* ── SCROLL REVEAL ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('br-visible'); observer.unobserve(e.target); }
      }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.br-reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  function goTo(idx: number) {
    setSlide(((idx % heroSlides.length) + heroSlides.length) % heroSlides.length);
  }

  return (
    <>
      <style>{`
        @keyframes brPulse {
          0%,100%{ opacity:1; transform:scale(1); }
          50%{ opacity:.5; transform:scale(.8); }
        }
        .br-reveal {
          opacity: 0; transform: translateY(28px);
          transition: opacity 0.65s cubic-bezier(0.22,1,0.36,1), transform 0.65s cubic-bezier(0.22,1,0.36,1);
        }
        .br-reveal.br-visible { opacity: 1; transform: translateY(0); }
        .br-reveal-d1 { transition-delay: 0.12s; }
        .br-reveal-d2 { transition-delay: 0.24s; }
        .br-reveal-d3 { transition-delay: 0.36s; }
        .br-reveal-d4 { transition-delay: 0.48s; }
        @keyframes brFadeIn { from { opacity:0; } to { opacity:1; } }
      `}</style>

      {/* ── HERO SLIDER ── */}
      <div ref={sliderRef} style={{ position: 'relative', width: '100%', height: isMobile ? 550 : 680, overflow: 'hidden', background: '#000', fontFamily: "'Poppins', sans-serif" }}>
        {heroSlides.map((s, i) => (
          <div key={i} style={{
            position: 'absolute', inset: 0,
            display: 'flex',
            alignItems: isMobile ? 'flex-end' : 'center',
            paddingBottom: isMobile ? 80 : 0,
            opacity: i === slide ? 1 : 0,
            transition: 'opacity 0.9s cubic-bezier(0.77,0,0.175,1)',
            zIndex: i === slide ? 2 : 1,
          }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: `url('${s.bg}')`, backgroundSize: 'cover', backgroundPosition: 'center', transform: i === slide ? 'scale(1)' : 'scale(1.06)', transition: 'transform 6s ease', filter: 'brightness(0.38)' }} />
            <div style={{ position: 'absolute', inset: 0, background: isMobile ? 'linear-gradient(180deg, transparent 10%, rgba(0,0,0,0.85) 70%)' : 'linear-gradient(90deg, rgba(0,0,0,0.72) 38%, transparent 80%)', zIndex: 0 }} />
            <div style={{ position: 'relative', zIndex: 3, width: '100%', maxWidth: 1220, margin: '0 auto', padding: '0 24px' }}>
              <div style={{ maxWidth: isMobile ? '100%' : 580, opacity: i === slide ? 1 : 0, transform: i === slide ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 0.7s ease 0.4s, transform 0.7s ease 0.4s' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                  <span style={{ display: 'inline-block', background: c.accent, color: '#fff', fontSize: isMobile ? 10 : 11, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', padding: isMobile ? '4px 10px' : '5px 12px', borderRadius: 2 }}>{s.badge}</span>
                </div>
                <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: isMobile ? 'clamp(34px,10vw,48px)' : 'clamp(48px,6vw,78px)', color: '#fff', lineHeight: 0.95, marginBottom: 16, fontWeight: 700, letterSpacing: 1 }}>
                  {s.heading}<br /><span style={{ color: c.highlight }}>{s.accentWord}</span>
                </h1>
                <p style={{ fontSize: isMobile ? 13 : 15, color: 'rgba(255,255,255,0.72)', lineHeight: 1.65, marginBottom: isMobile ? 22 : 32, fontWeight: 300, maxWidth: isMobile ? '100%' : 420 }}>{s.desc}</p>
                {s.cta && (
                  <Link href={s.cta.href}
                    onClick={e => { e.preventDefault(); document.querySelector(s.cta!.href)?.scrollIntoView({ behavior: 'smooth' }); }}
                    style={{ display: 'inline-block', padding: isMobile ? '10px 20px' : '13px 28px', background: s.cta.solid ? '#fff' : 'transparent', color: s.cta.solid ? '#0d0d0d' : '#fff', border: '2px solid #fff', fontSize: isMobile ? 12 : 13, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', textDecoration: 'none' }}>{s.cta.label}</Link>
                )}
              </div>
            </div>
          </div>
        ))}
        <div style={{ position: 'absolute', bottom: isMobile ? 34 : 28, left: isMobile ? 24 : '50%', transform: isMobile ? 'none' : 'translateX(calc(-570px + 20px))', display: 'flex', gap: 10, zIndex: 10 }}>
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} style={{ width: 10, height: 10, borderRadius: '50%', border: 'none', padding: 0, cursor: 'pointer', background: i === slide ? c.accent : 'rgba(255,255,255,0.35)', transform: i === slide ? 'scale(1.3)' : 'scale(1)', transition: 'background 0.3s, transform 0.3s' }} />
          ))}
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, height: 3, background: c.accent, width: `${progress}%`, zIndex: 10, transition: 'width 0.1s linear' }} />
      </div>

      {/* ── STICKY SUBNAV ── */}
      <div style={{ position: isSticky ? 'fixed' : 'relative', top: isSticky ? 0 : undefined, left: 0, right: 0, width: '100%', background: '#fff', borderBottom: '1px solid rgba(0,0,0,0.09)', boxShadow: isSticky ? '0 2px 20px rgba(0,0,0,0.12)' : 'none', transition: 'box-shadow 0.3s ease', zIndex: 9999, fontFamily: "'Poppins', sans-serif" }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: isMobile ? '0 16px' : '0 20px', height: isMobile ? 52 : 58, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: isMobile ? 12 : 20, overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', flex: 1, gap: isMobile ? 4 : 28, overflowX: 'auto', scrollbarWidth: 'none' }}>
            {navLinks.map((lnk, i) => (
              <Link key={i} href={lnk.href} style={{ fontSize: isMobile ? 12 : 13, fontWeight: 500, color: '#111', textDecoration: 'none', whiteSpace: 'nowrap', padding: isMobile ? '4px 10px' : '4px 0', position: 'relative', letterSpacing: 0.15, transition: 'color 0.2s' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = c.accent; (el.querySelector('.br-underline') as HTMLElement | null)?.style.setProperty('width', '100%'); }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = '#111'; (el.querySelector('.br-underline') as HTMLElement | null)?.style.setProperty('width', '0'); }}>
                {lnk.label}
                <span className="br-underline" style={{ position: 'absolute', bottom: 0, left: 0, width: 0, height: 2, background: c.accent, borderRadius: 2, transition: 'width 0.25s ease' }} />
              </Link>
            ))}
          </div>
          <a href="#printers" style={{ flexShrink: 0, padding: isMobile ? '7px 14px' : '10px 22px', background: c.accent, color: '#fff', fontSize: isMobile ? 12 : 13, fontWeight: 600, letterSpacing: 0.2, textDecoration: 'none', borderRadius: 50, whiteSpace: 'nowrap', transition: 'background 0.2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = c.accentHover; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = c.accent; }}>
            Get a Quote
          </a>
        </div>
      </div>
      {isSticky && <div style={{ height: isMobile ? 52 : 58 }} />}

      {/* ══ SECTION 1: DESKTOP SCANNERS — 2 CARDS ══ */}
      <section id="desktop-scanners" style={{ width: '100%', background: c.alt, padding: isMobile ? '40px 16px' : '72px 20px', fontFamily: "'Poppins', sans-serif" }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div className="br-reveal" style={{ textAlign: 'center', marginBottom: isMobile ? 28 : 48 }}>
            <h2 style={{ fontSize: isMobile ? 24 : 36, fontWeight: 700, color: c.text, marginBottom: 14 }}>Desktop Scanners</h2>
            <p style={{ fontSize: isMobile ? 14 : 15, color: c.dim, lineHeight: 1.65, maxWidth: 560, margin: '0 auto' }}>
              Compact, reliable desktop scanning solutions for everyday document management — from simple single-sheet models to high-speed duplex scanners.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 20 : 24 }}>
            {desktopCards.map((card, i) => (
              <div key={i} className={`br-reveal br-reveal-d${i + 1}`} style={{ background: '#fff', borderRadius: 16, border: `1px solid ${c.line}`, overflow: 'hidden', boxShadow: '0 2px 16px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', transition: 'box-shadow 0.3s ease, transform 0.3s ease' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = '0 8px 32px rgba(0,0,0,0.12)'; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(0)'; el.style.boxShadow = '0 2px 16px rgba(0,0,0,0.06)'; }}>
                <div style={{ width: '100%', height: 220, background: '#f8f9fb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={card.image} alt={card.title} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 16, display: 'block' }} />
                </div>
                <div style={{ padding: '24px 24px 28px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: c.accent, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 8 }}>{card.tag}</p>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: c.text, marginBottom: 10, lineHeight: 1.3 }}>{card.title}</h3>
                  <p style={{ fontSize: 13.5, color: c.dim, lineHeight: 1.65, marginBottom: 16 }}>{card.desc}</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 7 }}>
                    {card.features.map((f, j) => (
                      <li key={j} style={{ fontSize: 13, fontWeight: 500, color: '#374151', paddingLeft: 16, position: 'relative', lineHeight: 1.4 }}>
                        <span style={{ position: 'absolute', left: 0, top: 6, width: 6, height: 6, borderRadius: '50%', background: c.accent, display: 'inline-block' }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  {card.links.length > 0 && (
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 16 }}>
                      {card.links.map(lnk => (
                        <Link key={lnk.href} href={lnk.href}
                           style={{ fontSize: 12, fontWeight: 600, padding: '5px 14px', borderRadius: 4, border: `1.5px solid ${c.accent}`, color: c.accent, textDecoration: 'none', background: '#fff', transition: 'all 0.2s' }}
                           onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = c.accent; el.style.color = '#fff'; }}
                           onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = '#fff'; el.style.color = c.accent; }}>
                          View Product
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 2: WIRELESS & NETWORK SCANNERS — ALTERNATING ══ */}
      <section id="wireless-network-scanners" style={{ width: '100%', background: c.bg, padding: isMobile ? '48px 16px' : '80px 20px', fontFamily: "'Poppins', sans-serif" }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div className="br-reveal" style={{ marginBottom: isMobile ? 32 : 64 }}>
            <h2 style={{ fontSize: isMobile ? 22 : 34, fontWeight: 700, color: c.text, marginBottom: 12 }}>Wireless &amp; Network Desktop Scanners</h2>
            <p style={{ fontSize: isMobile ? 14 : 16, color: '#64748b', maxWidth: 700, lineHeight: 1.7 }}>
              Brother wireless and wired network scanners engineered for shared office environments — scan to cloud, email, and network folders with ease.
            </p>
          </div>
          {networkRows.map((row, i) => (
            <div key={i} className={`br-reveal br-reveal-d${(i % 2) + 1}`} style={{ display: 'flex', flexDirection: isTablet ? 'column' : row.reverse ? 'row-reverse' : 'row', alignItems: isTablet ? 'stretch' : 'center', gap: isTablet ? 36 : 80, padding: isTablet ? '36px 0' : '60px 0', borderBottom: i < networkRows.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: 12, fontWeight: 700, color: c.accent, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 10 }}>{row.tag}</h4>
                <h3 style={{ fontSize: isMobile ? 20 : 28, fontWeight: 700, color: c.text, marginBottom: 14, lineHeight: 1.2 }}>{row.title}</h3>
                <p style={{ fontSize: 15, color: '#64748b', lineHeight: 1.75, marginBottom: 24 }}>{row.desc}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {row.features.map((f, j) => (
                    <li key={j} style={{ fontSize: 14, fontWeight: 500, color: '#374151', paddingLeft: 18, position: 'relative', lineHeight: 1.5 }}>
                      <span style={{ position: 'absolute', left: 0, top: 7, width: 7, height: 7, borderRadius: '50%', background: c.accent, display: 'inline-block' }} />
                      {f}
                    </li>
                  ))}
                </ul>
                {row.links.length > 0 && (
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 20 }}>
                    {row.links.map(lnk => (
                      <Link key={lnk.href} href={lnk.href}
                         style={{ fontSize: 12, fontWeight: 600, padding: '5px 14px', borderRadius: 4, border: `1.5px solid ${c.accent}`, color: c.accent, textDecoration: 'none', background: '#fff', transition: 'all 0.2s' }}
                         onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = c.accent; el.style.color = '#fff'; }}
                         onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = '#fff'; el.style.color = c.accent; }}>
                        View Product
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={row.image} alt={row.title} style={{ width: '100%', maxWidth: 420, height: isMobile ? 200 : isTablet ? 240 : 320, objectFit: 'contain', borderRadius: 16 }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ SECTION 3A: PRINTERS — DARK + FORM ══ */}
      <section id="printers" style={{ width: '100%', background: 'linear-gradient(90deg, #001a4d, #003087)', padding: isMobile ? '60px 16px' : '80px 20px', color: '#fff', fontFamily: "'Poppins', sans-serif" }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', display: 'grid', gridTemplateColumns: isTablet ? '1fr' : '1fr 420px', gap: isTablet ? 40 : 60, alignItems: 'center' }}>
          <div className="br-reveal">
            <h2 style={{ fontSize: isMobile ? 24 : 36, fontWeight: 700, marginBottom: 20, color: '#fff', lineHeight: 1.2 }}>Brother Printers</h2>
            <p style={{ fontSize: 15, color: '#cbd5e1', lineHeight: 1.7, marginBottom: 20 }}>
              Brother printers are built for businesses of every size — delivering fast output, low running costs, and versatile connectivity including wireless, Ethernet, and NFC for seamless integration into any office environment.
            </p>
            <div style={{ fontSize: 14, color: '#cbd5e1', lineHeight: 2 }}>
              <strong style={{ color: '#fff', fontSize: 13, letterSpacing: 0.5, textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Printer Ranges</strong>
              • Inkjet Printers — Colour printing for home &amp; office<br />
              • Colour Laser Printers — High-speed colour laser output<br />
              • Monochrome Laser Printers — Reliable, cost-efficient mono printing<br />
              • Toner Box Series — Ultra-high yield, low cost per page
            </div>
          </div>
          <div className="br-reveal br-reveal-d1" style={{ background: 'rgba(255,255,255,0.06)', padding: isMobile ? 22 : 30, borderRadius: 14, border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)' }}>
            <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 20, color: '#fff' }}>Inquire for Distribution</h3>
            <BrotherForm highlight={c.highlight} accentDark="#001a4d" />
          </div>
        </div>
      </section>

      {/* ══ SECTION 3B: PRINTER TYPES — TABS ══ */}
      <section style={{ background: c.alt2, width: '100%', fontFamily: "'Poppins', sans-serif" }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '40px 16px' : '72px 20px' }}>
          <div className="br-reveal" style={{ display: 'flex', flexWrap: 'wrap', borderBottom: '2px solid #eee', marginBottom: 40, gap: 10 }}>
            {printerTabs.map((tab, i) => (
              <button key={i} onClick={() => setActivePrinterTab(i)} style={{ padding: '15px 22px', cursor: 'pointer', fontWeight: 700, fontSize: 14, textTransform: 'uppercase', letterSpacing: 1, color: activePrinterTab === i ? c.accent : '#888', border: 'none', background: 'none', fontFamily: "'Poppins', sans-serif", position: 'relative' }}>
                {tab.label}
                {activePrinterTab === i && <span style={{ position: 'absolute', bottom: -2, left: 0, width: '100%', height: 3, background: c.accent, display: 'block' }} />}
              </button>
            ))}
          </div>
          {printerTabs.map((tab, i) => (
            <div key={i} style={{ display: activePrinterTab === i ? 'grid' : 'none', gridTemplateColumns: isTablet ? '1fr' : '1fr 2fr', gap: isTablet ? 28 : 50, animation: 'brFadeIn 0.5s ease' }}>
              <div>
                <h2 style={{ fontSize: isMobile ? 22 : 34, color: '#000', marginBottom: 20, lineHeight: 1.2, fontWeight: 700 }}>{tab.heading}</h2>
                <p style={{ fontSize: 15, lineHeight: 1.8, color: '#555' }}>{tab.intro}</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 28 }}>
                <div style={{ background: '#fff', border: '1px solid #eee', padding: 24, textAlign: 'left', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
                  <img src={tab.image} alt={tab.cardTitle} style={{ width: '100%', height: 200, objectFit: 'contain', marginBottom: 16, borderRadius: 6, padding: 12 }} />
                  <h4 style={{ fontSize: 18, marginBottom: 12, color: '#000', fontWeight: 700 }}>{tab.cardTitle}</h4>
                  <p style={{ fontSize: 14, lineHeight: 1.9, color: '#555' }}>
                    {tab.points.map((pt, j) => <span key={j}>• {pt}<br /></span>)}
                  </p>
                  {tab.links.length > 0 && (
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 16 }}>
                      {tab.links.map(lnk => (
                        <Link key={lnk.href} href={lnk.href}
                           style={{ fontSize: 12, fontWeight: 600, padding: '5px 14px', borderRadius: 4, border: `1.5px solid ${c.accent}`, color: c.accent, textDecoration: 'none', background: '#fff', transition: 'all 0.2s' }}
                           onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = c.accent; el.style.color = '#fff'; }}
                           onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = '#fff'; el.style.color = c.accent; }}>
                          {lnk.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ SECTION 4: INK & TONER — ACCORDION ══ */}
      <section id="ink-toner" style={{ width: '100%', background: c.alt, padding: isMobile ? '40px 16px' : '72px 20px', fontFamily: "'Poppins', sans-serif" }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div className="br-reveal" style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: isMobile ? 22 : 34, fontWeight: 700, color: '#000', marginBottom: 6 }}>Ink &amp; Toner Cartridges</h2>
            <p style={{ fontSize: 15, color: c.dim }}>Genuine Brother consumables engineered for optimal print quality, reliability, and value.</p>
          </div>
          <div className="br-reveal br-reveal-d1" style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden', minHeight: isMobile ? 'auto' : 460 }}>
            <div style={{ borderRight: isMobile ? 'none' : '1px solid #e5e7eb', borderBottom: isMobile ? '1px solid #e5e7eb' : 'none', display: 'flex', flexDirection: 'column', background: '#fff' }}>
              {cartridgeItems.map((item, i) => (
                <div key={i} onClick={() => setActiveCartridge(i)} style={{ borderBottom: i < cartridgeItems.length - 1 ? '1px solid #e5e7eb' : 'none', cursor: 'pointer', background: activeCartridge === i ? '#EBF0FF' : '#fff', transition: 'background 0.2s' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '18px 24px' }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: c.accent, letterSpacing: 1, minWidth: 24 }}>{item.num}</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: activeCartridge === i ? c.accent : '#1f2937', flex: 1, lineHeight: 1.4 }}>{item.title}</span>
                    <span style={{ fontSize: 18, color: activeCartridge === i ? c.accent : '#d1d5db', transform: activeCartridge === i ? 'rotate(90deg)' : 'none', transition: 'transform 0.3s, color 0.3s' }}>›</span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
              {cartridgeItems.map((item, i) => (
                <div key={i} style={{ display: activeCartridge === i ? 'flex' : 'none', flexDirection: 'column', height: '100%', padding: 36, gap: 20 }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: c.accent, textTransform: 'uppercase', letterSpacing: 1, margin: 0 }}>{item.tag}</p>
                  <h3 style={{ fontSize: 22, fontWeight: 700, color: c.text, margin: '6px 0 10px', lineHeight: 1.3 }}>{item.heading}</h3>
                  <p style={{ fontSize: 14, color: c.dim, lineHeight: 1.75, margin: 0 }}>{item.desc}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {item.features.map((f, j) => (
                      <div key={j} style={{ fontSize: 13, color: '#374151', display: 'flex', alignItems: 'flex-start', gap: 8, lineHeight: 1.5 }}>
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: c.accent, flexShrink: 0, marginTop: 6, display: 'inline-block' }} />
                        {f}
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: 12, marginTop: 'auto', paddingTop: 20 }}>
                    <div style={{ flex: 1, borderRadius: 6, overflow: 'hidden', border: '1px solid #e5e7eb', background: '#fff' }}>
                      <img src={item.image} alt={item.cap} style={{ width: '100%', height: 180, objectFit: 'contain', display: 'block', padding: 10 }} />
                      <div style={{ fontSize: 11, fontWeight: 700, textAlign: 'center', background: c.accent, color: '#fff', padding: '6px 0', letterSpacing: 0.5, textTransform: 'uppercase' }}>{item.cap}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 5: CONSUMABLES & ACCESSORIES — 4 CARDS ══ */}
      <section id="consumables-accessories" style={{ width: '100%', background: c.bg, padding: isMobile ? '40px 16px' : '80px 20px', fontFamily: "'Poppins', sans-serif" }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div className="br-reveal" style={{ marginBottom: isMobile ? 28 : 48 }}>
            <h2 style={{ fontSize: isMobile ? 22 : 34, fontWeight: 700, color: c.text, marginBottom: 10 }}>Consumables &amp; Accessories</h2>
            <p style={{ fontSize: 15, color: c.dim, lineHeight: 1.7, maxWidth: 600 }}>
              Genuine Brother drum units, belt units, and accessories to keep your Brother devices performing at their best.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: isMobile ? 14 : 24 }}>
            {accessoryCards.map((card, i) => (
              <div key={i} className={`br-reveal br-reveal-d${i + 1}`} style={{ background: c.alt, borderRadius: 16, border: '1px solid #e5e7eb', padding: '28px 20px', textAlign: 'center', transition: 'box-shadow 0.3s ease, transform 0.3s ease' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = '0 8px 28px rgba(0,48,135,0.10)'; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(0)'; el.style.boxShadow = 'none'; }}>
                <img src={card.image} alt={card.title} style={{ width: '100%', height: 140, objectFit: 'contain', marginBottom: 18 }} />
                <p style={{ fontSize: 11, fontWeight: 700, color: c.accent, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 8 }}>{card.tag}</p>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: c.text, marginBottom: 8 }}>{card.title}</h3>
                <p style={{ fontSize: 13, color: c.dim, lineHeight: 1.6 }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ── FORM ── */
function BrotherForm({ highlight, accentDark }: { highlight: string; accentDark: string }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('https://formspree.io/f/xdajrzpv', { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(e.currentTarget) });
      setStatus(res.ok ? 'done' : 'error');
    } catch { setStatus('error'); }
  }

  if (status === 'done') return <p style={{ color: '#86efac', fontSize: 15, textAlign: 'center', padding: '20px 0' }}>Thank you! We'll be in touch shortly.</p>;

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <input name="name" type="text" placeholder="Full Name" required style={{ width: '100%', padding: '12px 14px', borderRadius: 6, border: 'none', background: 'rgba(255,255,255,0.12)', color: '#fff', fontSize: 14, outline: 'none' }} />
      <input name="email" type="email" placeholder="Business Email" required style={{ width: '100%', padding: '12px 14px', borderRadius: 6, border: 'none', background: 'rgba(255,255,255,0.12)', color: '#fff', fontSize: 14, outline: 'none' }} />
      <select name="category" required style={{ width: '100%', padding: '12px 14px', borderRadius: 6, border: 'none', background: 'rgba(255,255,255,0.12)', color: '#e5e7eb', fontSize: 14, outline: 'none' }}>
        <option value="" style={{ background: '#fff', color: '#000' }}>Select Product Category</option>
        <option style={{ background: '#fff', color: '#000' }}>Brother Desktop Scanners</option>
        <option style={{ background: '#fff', color: '#000' }}>Brother Wireless &amp; Network Scanners</option>
        <option style={{ background: '#fff', color: '#000' }}>Brother Inkjet Printers</option>
        <option style={{ background: '#fff', color: '#000' }}>Brother Colour Laser Printers</option>
        <option style={{ background: '#fff', color: '#000' }}>Brother Monochrome Laser Printers</option>
        <option style={{ background: '#fff', color: '#000' }}>Brother Toner Box Series</option>
        <option style={{ background: '#fff', color: '#000' }}>Brother Ink &amp; Toner Cartridges</option>
        <option style={{ background: '#fff', color: '#000' }}>Brother Consumables &amp; Accessories</option>
      </select>
      <button type="submit" disabled={status === 'sending'} style={{ marginTop: 10, padding: 13, background: highlight, color: accentDark, fontWeight: 700, border: 'none', borderRadius: 6, cursor: 'pointer', letterSpacing: 1, fontSize: 14 }}>
        {status === 'sending' ? 'SENDING…' : 'SEND INQUIRY'}
      </button>
      {status === 'error' && <p style={{ color: '#fca5a5', fontSize: 13, textAlign: 'center' }}>Something went wrong. Please try again.</p>}
    </form>
  );
}
