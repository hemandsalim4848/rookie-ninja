'use client';

import { useState, useEffect, useRef } from 'react';
import Animate from '../Animate';
import Link from 'next/link';

/* ─────────────────────────────────────────────
   THEME — matches Rookie Ninja light design system
───────────────────────────────────────────── */
const vs = {
  bg:      '#ffffff',
  alt:     '#f8fbff',
  navy:    '#0A1628',
  navyMid: '#0F2040',
  accent:  '#15A7DC',
  line:    'rgba(10,22,40,0.08)',
  lineAlt: 'rgba(10,22,40,0.05)',
  text:    '#0A1628',
  dim:     '#6b7280',
  mute:    '#9ca3af',
};

/* ─────────────────────────────────────────────
   HERO SLIDES DATA
───────────────────────────────────────────── */
const heroSlides = [
  {
    id: 'ifp',
    eyebrow: '01 — Interactive Displays',
    title: ['Where ideas', 'come alive', 'on screen.'],
    accentLine: 1,
    desc: "From kindergarten classrooms to executive boardrooms — ViewSonic's EDLA-certified ViewBoard® interactive flat panels bring 4K touch, myViewBoard whiteboarding and centralized device management to every space.",
    tags: ['Education · IFP34 · IFP35 · IFP52', 'Corporate · IFP41 · IFP51 · IFP62'],
    cta: { label: 'Explore ViewBoards', href: '#ifp' },
    ghost: { label: 'Compare Series', href: '#ifp' },
  },
  {
    id: 'monitors',
    eyebrow: '02 — Monitors',
    title: ['Five families.', 'One vision.', ''],
    accentLine: 1,
    desc: "From everyday office screens to color-critical creator panels and 360 Hz Mini-LED gaming weapons — there's a ViewSonic monitor for every desk.",
    tags: ['VA · Home & Office', 'VX / XG · Gaming', 'VP · Color Pro', 'VG · Business', 'TD · Touch'],
    cta: { label: 'See All Monitors', href: '#monitors' },
    ghost: { label: 'Spec Sheet', href: '#monitors' },
  },
  {
    id: 'projectors',
    eyebrow: '03 — Projectors',
    title: ['Projection', 're-imagined', 'for every space.'],
    accentLine: 1,
    desc: 'Laser, lamp and ultra-short throw projectors delivering 4K brilliance — from portable pico to 20,000-lumen large-venue installations.',
    tags: ['LS Series · Laser', 'PX / PA · 4K Home', 'PG Series · Large Venue'],
    cta: { label: 'View Projectors', href: '#projectors' },
    ghost: { label: 'Lumen Calculator', href: '#projectors' },
  },
  {
    id: 'vconf',
    eyebrow: '04 — Video Conferencing',
    title: ['Meet without', 'limits.', ''],
    accentLine: 1,
    desc: 'Certified video bars, PTZ cameras and Microsoft Teams Rooms solutions that make every meeting feel like the same room.',
    tags: ['UMB202 · 4K Bar', 'PTZ · Pan-Tilt-Zoom', 'Teams · Zoom · Webex'],
    cta: { label: 'Explore VC Solutions', href: '#vconf' },
    ghost: { label: 'Book a Demo', href: '#vconf' },
  },
];

/* ─────────────────────────────────────────────
   MONITOR SERIES DATA
───────────────────────────────────────────── */
const monitorSeries = [
  {
    id: 'va', series: 'VA', cat: 'Home & Office',
    name: 'Everyday Performance Display',
    tagline: 'Comfortable, dependable monitors for productivity and home use — built-in speakers, eye-care tech and flexible inputs.',
    sizes: ['24"', '27"', '32"'],
    highlight: { label: 'Best for', value: 'Home & Office', desc: 'FHD & QHD options, flicker-free with blue-light filter for long workdays.' },
    specs: [{ label: 'Sizes', value: '24" · 27" · 32"' }, { label: 'Refresh', value: '75 / 100 Hz' }, { label: 'Inputs', value: 'HDMI · DP · VGA' }, { label: 'Speakers', value: 'Built-in' }, { label: 'Eye Care', value: 'Flicker-Free' }, { label: 'Tilt', value: 'Adjustable' }],
    features: ['SuperClear® IPS panels for accurate color and wide viewing angles.', 'Integrated speakers — clean desk, no extra audio gear required.', 'Versatile HDMI / DisplayPort / VGA inputs work with legacy and modern setups.', 'ViewMode presets for movie, gaming, web and text optimization.'],
  },
  {
    id: 'vx', series: 'VX · XG', cat: 'Gaming & Pro Gaming · OMNI & ELITE',
    name: 'Tournament-Grade Performance',
    tagline: 'Up to 360 Hz refresh, 0.5 ms response, Mini-LED HDR and a full pro-gaming feature stack.',
    sizes: ['24"', '27"', '32"', '34"'],
    highlight: { label: 'Top Refresh Rate', value: '360 Hz', desc: 'With 0.5 ms GtG response time on ELITE flagships — for competitive esports.' },
    specs: [{ label: 'Sizes', value: '24" · 27" · 32" · 34"' }, { label: 'Refresh', value: 'Up to 360 Hz' }, { label: 'Response', value: '0.5 ms GtG' }, { label: 'Panel', value: 'Mini-LED / QD-OLED' }, { label: 'Sync', value: 'G-SYNC + FreeSync' }, { label: 'HDR', value: 'VESA DisplayHDR 1400' }],
    features: ['PureXP™ motion-blur reduction + Black Stabilization for dark scenes.', 'Mini-LED backlight with thousands of dimming zones for true HDR.', 'Curved 34" ultrawide and flat 27" QHD esports configurations.', 'Sniper Mode, custom crosshair overlays and shooter/MOBA color presets.'],
  },
  {
    id: 'vg', series: 'VG', cat: 'Business Monitors',
    name: 'Productivity, Engineered',
    tagline: 'USB-C hub, daisy-chain DP, full ergonomic stand and frame-thin design for clean enterprise rollouts.',
    sizes: ['24"', '27"', '32"', '34"'],
    highlight: { label: 'USB-C Power Delivery', value: 'up to 100 W', desc: 'Charges a laptop, drives video, transmits data and connects Ethernet — all over one cable.' },
    specs: [{ label: 'Sizes', value: '24" · 27" · 32" · 34"' }, { label: 'Resolution', value: 'FHD · QHD · 4K' }, { label: 'USB-C Hub', value: 'Yes' }, { label: 'Ergonomics', value: 'Full adjustment' }, { label: 'Ethernet', value: 'RJ45 on select' }, { label: 'Daisy Chain', value: 'DP-Out' }],
    features: ['Pivot to portrait for code, documents and long-form reading.', 'Frameless design ideal for clean dual- and triple-monitor walls.', 'Daisy-chain via DisplayPort cuts cabling on dense workstations.', 'TCO Certified + EPEAT for sustainable enterprise procurement.'],
  },
  {
    id: 'vp', series: 'VP', cat: 'ColorPro™ · Professional',
    name: 'Color-Critical Creator Displays',
    tagline: 'Pantone & Pantone SkinTone validated, hardware-calibrated, ΔE<2 accuracy out of the box.',
    sizes: ['27"', '32"'],
    highlight: { label: 'Color Accuracy', value: 'ΔE < 2', desc: 'Pantone & Pantone SkinTone validated, factory hardware calibration certificate in the box.' },
    specs: [{ label: 'Color Gamut', value: '100% sRGB' }, { label: 'Validation', value: 'Pantone' }, { label: 'USB-C', value: '90 W PD' }, { label: 'Resolution', value: '4K UHD' }, { label: 'HDR', value: 'HDR10' }, { label: 'Calibration', value: 'Hardware' }],
    features: ['ColorPro™ Wheel shortcut controller for Adobe Lightroom & Capture One.', 'Uniformity correction across the panel for color grading and print proofing.', 'Pre-loaded gamut presets for photo, video, design and broadcast workflows.', 'Built-in hood support, dual headphone jacks and clean ColorPro™ stand.'],
  },
  {
    id: 'td', series: 'TD', cat: 'Touch Monitors',
    name: 'Interactive Desktop & POS Touch',
    tagline: 'PCAP multi-touch with palm rejection — for kiosks, signage, healthcare, retail and creative workflows.',
    sizes: ['16"', '22"', '24"', '27"', '32"', '43"'],
    highlight: { label: 'Touch Technology', value: '10-pt PCAP', desc: 'Projected capacitive multi-touch with palm rejection and active-pen support.' },
    specs: [{ label: 'Sizes', value: '16" → 43"' }, { label: 'Touch Type', value: 'PCAP' }, { label: 'USB-C', value: 'Supported' }, { label: 'Glass', value: 'Edge-to-Edge' }, { label: 'Form Factors', value: 'Desktop · Wall · POS' }, { label: 'OSD', value: 'On-screen touch' }],
    features: ['Optical bonding eliminates parallax — precise touch from edge to corner.', 'Zero-bezel glass for kiosk and signage enclosure integration.', 'Portrait and landscape mounting with VESA compatibility.', 'Medical-grade cleanable surfaces on healthcare-spec variants.'],
  },
];

/* ─────────────────────────────────────────────
   PROJECTOR DATA
───────────────────────────────────────────── */
const projectors = [
  {
    id: 'ls', type: 'Laser · Short Throw', name: 'LS Series',
    desc: 'Laser light source projectors for classrooms and meeting rooms — bright, maintenance-free, with optional ultra-short throw.',
    models: ['LS510W', 'LS560W', 'LS831WU'],
    highlight: { label: 'Lamp Life', value: '30,000 hrs', desc: 'Zero lamp replacement — laser source with consistent brightness over its full lifetime.' },
    specs: [{ label: 'Brightness', value: '3,500 – 5,000 lm' }, { label: 'Resolution', value: 'WXGA · WUXGA' }, { label: 'Throw', value: 'Short / Ultra-short' }, { label: 'Source', value: 'Laser' }],
    features: ['InstantOn™ — full brightness in under 5 seconds, zero warm-up.', 'SuperColor™ 6-segment colour wheel for vivid, accurate images.', 'Vertical and horizontal lens shift + digital zoom for flexible installation.'],
  },
  {
    id: 'px', type: '4K · Home Cinema', name: 'PX / PA Series',
    desc: 'True 4K UHD home cinema and large-venue projectors with HDR10 and Rec.709 color support.',
    models: ['PX701-4K', 'PA503W', 'PX748-4K'],
    highlight: { label: 'Resolution', value: '4K UHD', desc: 'True 4K with HDR10 and Rec.709 color for cinema-grade home and venue installations.' },
    specs: [{ label: 'Resolution', value: '4K UHD / WXGA' }, { label: 'Brightness', value: 'Up to 4,000 lm' }, { label: 'HDR', value: 'HDR10' }, { label: 'Throw', value: 'Standard' }],
    features: ['HDR10 content display with tone mapping for realistic bright/dark contrast.', 'Low input lag mode for 4K gaming at 60 Hz.', '240 Hz frame interpolation for smooth sports and action content.'],
  },
  {
    id: 'pg', type: 'Large Venue · Installation', name: 'PG Series',
    desc: 'High-lumen installation projectors for auditoriums, lecture halls, houses of worship and large events.',
    models: ['PG700WU', 'PG800HD', 'PG800X'],
    highlight: { label: 'Peak Brightness', value: '8,000 lm', desc: 'High output laser projection for large-screen venues in any lighting condition.' },
    specs: [{ label: 'Brightness', value: '4,500 – 8,000 lm' }, { label: 'Resolution', value: 'WUXGA · 1080p' }, { label: 'Lens Shift', value: 'H + V' }, { label: 'Connectivity', value: 'HDBaseT · HDMI' }],
    features: ['Vertical + horizontal motorized lens shift for precise image placement.', 'HDBaseT for single-cable transmission up to 100 m without signal loss.', 'Portrait orientation support for immersive vertical projection applications.'],
  },
];

/* ─────────────────────────────────────────────
   VIDEO CONF DATA
───────────────────────────────────────────── */
const vcProducts = [
  {
    id: 'bars', chip: 'All-in-One', name: 'Video Conferencing Bars',
    desc: 'Integrated 4K camera + mic + speaker bars for huddle rooms and BYOD spaces — works with Teams, Zoom and Webex.',
    models: [
      { sku: 'UMB202', title: '4K All-in-One Video Bar', desc: '4K camera, beamforming mic array and stereo speakers in one sleek bar — designed to mount above any display.' },
      { sku: 'VB-CAM-201', title: 'All-in-One Video Camera', desc: '121° wide field of view, echo cancellation and undistorted audio — pairs natively with the IFP62 ecosystem.' },
      { sku: 'TWS101', title: 'Wireless Conference Bar', desc: 'Premium wireless 4K conference bar for medium-to-large meeting spaces.' },
    ],
  },
  {
    id: 'ptz', chip: 'PTZ Camera', name: 'PTZ Conference Camera',
    desc: 'Pan, tilt and zoom optics for large rooms, lecture halls and broadcast-grade events.',
    models: [
      { sku: 'VB-CAM-PTZ-001', title: 'Pan-Tilt-Zoom Camera', desc: 'High-zoom optics with auto-tracking for boardrooms, lecture halls and live productions. Compatible with Microsoft Teams, Zoom, OBS and most broadcast software.' },
    ],
  },
];

/* ─────────────────────────────────────────────
   SIGNAGE DATA
───────────────────────────────────────────── */
const signageProducts = [
  {
    id: 'cde', cat: 'CDE Series · Commercial Displays', name: 'CDE Commercial Displays',
    desc: 'Built for 24/7 signage and meeting-room duty — Crestron Connected, Extron compatible, with built-in Android.',
    highlight: { label: 'Operating Hours', value: '24 / 7', desc: 'Commercial-grade panels for always-on signage, with integrated content management.' },
    specs: [{ label: 'Sizes', value: '43" → 105"' }, { label: 'Resolution', value: '4K UHD' }, { label: 'Duty Cycle', value: '24/7 rated' }, { label: 'OS', value: 'Android built-in' }, { label: 'Control', value: 'Crestron · Extron' }, { label: 'CMS', value: 'vController + vSignage' }],
    features: ['Sleek bezel-less designs ideal for corporate lobbies, retail and broadcast spaces.', 'Built-in vSignage / vController CMS for managing content fleet-wide.', 'Premium 105" CDE option for boardroom video walls and auditoriums.', 'Native compatibility with all major room-control ecosystems.'],
  },
  {
    id: 'ep', cat: 'EP Series · ePoster Displays', name: 'ePoster Displays',
    desc: 'Vertical-orientation digital signage and ePoster solutions for retail, hospitality and wayfinding.',
    highlight: { label: 'Vertical Format', value: 'EP5542 / EP5542T', desc: '55" portrait-optimized displays — touch-enabled (T) and non-touch variants for retail signage and wayfinding.' },
    specs: [{ label: 'Size', value: '55" portrait' }, { label: 'Variants', value: 'EP5542 · EP5542T' }, { label: 'Touch', value: 'PCAP on T' }, { label: 'Brightness', value: 'High-nit' }, { label: 'OS', value: 'Android built-in' }, { label: 'Mounting', value: 'Wall · Floor stand' }],
    features: ['Perfect for menu boards, wayfinding kiosks and retail product displays.', 'Touch-enabled (T) variant for interactive store directories and self-service.', 'Slim profile with integrated Android player — no external media box needed.', 'Optional floor stand for mobile signage deployments.'],
  },
];

/* ─────────────────────────────────────────────
   SHARED SUB-COMPONENTS
───────────────────────────────────────────── */
function SpecGrid({ specs }: { specs: { label: string; value: string }[] }) {
  return (
    <div className="grid gap-3 mb-5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))' }}>
      {specs.map(s => (
        <div key={s.label} className="p-3 rounded-xl" style={{ border: `1px solid ${vs.line}`, background: vs.alt }}>
          <div className="mb-1" style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: vs.mute }}>{s.label}</div>
          <div style={{ fontWeight: 700, fontSize: '14px', color: vs.navy }}>{s.value}</div>
        </div>
      ))}
    </div>
  );
}

function FeatureList({ features }: { features: string[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {features.map((f, i) => (
        <li key={i} className="flex gap-3 items-start" style={{ fontSize: '14px', color: vs.dim, lineHeight: 1.65 }}>
          <span className="shrink-0 mt-[7px] w-1.5 h-1.5 rounded-full" style={{ background: vs.accent }} />
          {f}
        </li>
      ))}
    </ul>
  );
}

function HighlightBox({ label, value, desc }: { label: string; value: string; desc: string }) {
  return (
    <div className="rounded-xl p-5 mb-5" style={{ background: 'rgba(21,167,220,0.06)', border: '1px solid rgba(21,167,220,0.2)' }}>
      <div className="mb-1" style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: vs.accent }}>{label}</div>
      <div className="mb-1" style={{ fontWeight: 700, fontSize: '26px', lineHeight: 1, letterSpacing: '-0.02em', color: vs.navy }}>{value}</div>
      <div style={{ fontSize: '13px', color: vs.dim }}>{desc}</div>
    </div>
  );
}

function PlaceholderImage({ label }: { label: string }) {
  return (
    <div className="w-full rounded-2xl flex flex-col items-center justify-center gap-3"
         style={{ aspectRatio: '16/10', background: '#EFF6FF', border: `1px dashed rgba(21,167,220,0.3)` }}>
      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ border: '1.5px dashed rgba(21,167,220,0.4)' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(21,167,220,0.5)" strokeWidth="1.6"><rect x="3" y="4" width="18" height="13" rx="1.5"/><path d="M8 21h8M12 17v4"/></svg>
      </div>
      <span style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(21,167,220,0.5)' }}>{label}</span>
    </div>
  );
}

function SectionLabel({ text }: { text: string }) {
  return (
    <p className="font-body font-semibold uppercase mb-3"
       style={{ fontSize: '12px', letterSpacing: '0.1em', color: vs.accent }}>
      {text}
    </p>
  );
}

/* ─────────────────────────────────────────────
   IFP ACCORDION TILE
───────────────────────────────────────────── */
function IFPTile({ tile }: {
  tile: { badge: string; name: string; sub: string; specs: { l: string; v: string }[]; software?: string[]; features: string[] };
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl overflow-hidden transition-all duration-300"
         style={{ border: open ? `1px solid ${vs.accent}` : `1px solid ${vs.line}`, background: open ? 'rgba(21,167,220,0.04)' : vs.bg }}>
      <button onClick={() => setOpen(!open)}
              className="w-full text-left flex items-center justify-between gap-4 px-5 py-4"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', fontFamily: 'inherit' }}>
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <span className="shrink-0 px-2 py-1 rounded font-body font-medium"
                style={{ fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', background: 'rgba(21,167,220,0.08)', color: vs.accent, border: '0.5px solid rgba(21,167,220,0.25)' }}>
            {tile.badge}
          </span>
          <div className="min-w-0">
            <div style={{ fontWeight: 600, fontSize: 14, color: vs.navy, letterSpacing: '-0.01em' }}>{tile.name}</div>
            <div style={{ fontSize: 11, color: vs.mute, marginTop: 2 }}>{tile.sub}</div>
          </div>
        </div>
        <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
             style={{ border: `1px solid ${open ? vs.accent : vs.line}`, background: open ? vs.accent : 'transparent', color: open ? '#fff' : vs.navy, transform: open ? 'rotate(45deg)' : 'none' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M12 5v14M5 12h14"/></svg>
        </div>
      </button>
      <div style={{ maxHeight: open ? '900px' : 0, overflow: 'hidden', transition: 'max-height 0.55s cubic-bezier(.22,.61,.36,1)' }}>
        <div className="px-5 pb-5 pt-2" style={{ borderTop: `1px solid ${vs.line}` }}>
          <div className="mb-4"><PlaceholderImage label={tile.badge} /></div>
          {tile.software ? (
            <div className="grid grid-cols-2 gap-2 mb-4">
              {tile.software.map(s => {
                const [title, desc] = s.split(' — ');
                return (
                  <div key={title} className="p-3 rounded-xl" style={{ background: vs.alt, border: `1px solid ${vs.line}` }}>
                    <div style={{ fontWeight: 600, fontSize: 12, color: vs.navy }}>{title}</div>
                    {desc && <div style={{ fontSize: 11, color: vs.mute, marginTop: 2, lineHeight: 1.4 }}>{desc}</div>}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="mt-3">
              <SpecGrid specs={tile.specs.map(s => ({ label: s.l, value: s.v }))} />
            </div>
          )}
          <FeatureList features={tile.features} />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   ACCORDION TILE (Monitors)
───────────────────────────────────────────── */
function AccordionTile({ open, onToggle, header, children }: {
  open: boolean; onToggle: () => void; header: React.ReactNode; children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl overflow-hidden transition-all duration-300 bg-white"
         style={{ border: open ? `1px solid ${vs.accent}` : `0.5px solid ${vs.line}`, boxShadow: open ? '0 4px 20px rgba(21,167,220,0.08)' : 'none' }}>
      <button onClick={onToggle} className="w-full text-left" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', fontFamily: 'inherit' }}>
        {header}
      </button>
      <div style={{ maxHeight: open ? '1200px' : '0', overflow: 'hidden', transition: 'max-height 0.6s cubic-bezier(.22,.61,.36,1)' }}>
        {children}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export default function ViewSonicPage() {
  const [heroIdx, setHeroIdx] = useState(0);
  const [openMonitor, setOpenMonitor] = useState<string | null>(null);
  const [openProjector, setOpenProjector] = useState<string | null>(null);
  const [openVC, setOpenVC] = useState<string | null>(null);
  const [openSignage, setOpenSignage] = useState<string | null>(null);
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
    <main style={{ background: vs.bg, color: vs.text, fontFamily: 'var(--font-poppins)', overflowX: 'hidden' }}>

      {/* ══════════════════════════════════════════
          HERO — dark navy (keeps brand feel, matches contact page hero)
      ══════════════════════════════════════════ */}
      <section style={{ position: 'relative', minHeight: '90vh', overflow: 'hidden' }}>
        {/* Background — same as your other page heroes */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          background: `
            radial-gradient(ellipse 60% 60% at 75% 50%, rgba(21,167,220,0.12) 0%, transparent 70%),
            linear-gradient(150deg, #0A1628 0%, #0F2040 60%, #0A1628 100%)`,
        }} />
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }} />

        {/* Slide content */}
        <div className="vs-hero-grid max-w-7xl mx-auto"
             style={{ position: 'relative', zIndex: 2, minHeight: '90vh', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, padding: '140px 80px 100px', alignItems: 'center' }}>

          <div>
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full"
                 style={{ border: '1px solid rgba(21,167,220,0.3)', background: 'rgba(21,167,220,0.1)', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: vs.accent }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: vs.accent, boxShadow: `0 0 10px ${vs.accent}`, animation: 'vsPulse 2s infinite', display: 'inline-block' }} />
              {slide.eyebrow}
            </div>

            {/* Title */}
            <h1 style={{ fontWeight: 700, lineHeight: 0.95, letterSpacing: '-0.035em', marginBottom: 24, fontSize: 'clamp(40px, 6vw, 80px)' }}>
              {slide.title.map((line, i) => (
                <span key={i} style={{ display: 'block', color: i === slide.accentLine ? vs.accent : '#ffffff' }}>{line}</span>
              ))}
            </h1>

            {/* Desc */}
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'rgba(255,255,255,0.65)', maxWidth: 500, marginBottom: 28, fontWeight: 300 }}>
              {slide.desc}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {slide.tags.map(t => (
                <span key={t} className="px-4 py-2 rounded-full"
                      style={{ fontSize: 12, fontWeight: 500, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.6)' }}>
                  {t}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex gap-3 flex-wrap">
              <a href={slide.cta.href}
                 className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:opacity-85 hover:-translate-y-px no-underline"
                 style={{ background: vs.accent, color: '#fff', fontSize: 14, fontWeight: 600, boxShadow: '0 8px 24px -8px rgba(21,167,220,0.5)' }}>
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

          {/* Right — image placeholder */}
          <div className="vs-hero-visual hidden lg:flex items-center justify-center">
            <div className="w-full max-w-lg rounded-2xl flex flex-col items-center justify-center gap-4"
                 style={{ aspectRatio: '16/10', border: '1px solid rgba(255,255,255,0.08)', background: 'linear-gradient(135deg, rgba(255,255,255,0.03), rgba(21,167,220,0.06))', backdropFilter: 'blur(20px)' }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ border: '1.5px dashed rgba(255,255,255,0.2)' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.8"><rect x="2" y="4" width="20" height="14" rx="2"/><path d="M8 21h8M12 18v3"/></svg>
              </div>
              <span style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>
                add product image here
              </span>
            </div>
          </div>
        </div>

        {/* Slide controls */}
        <div className="vs-hero-controls"
             style={{ position: 'absolute', bottom: 36, left: 80, right: 80, zIndex: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="flex gap-2">
            {heroSlides.map((_, i) => (
              <button key={i} onClick={() => goSlide(i)}
                      style={{ width: 36, height: 3, border: 'none', borderRadius: 2, background: i === heroIdx ? vs.accent : 'rgba(255,255,255,0.2)', cursor: 'pointer', transition: 'background 0.3s' }} />
            ))}
          </div>
          <span style={{ fontFamily: 'monospace', fontSize: 12, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.5)' }}>
            <strong style={{ color: vs.accent }}>{String(heroIdx + 1).padStart(2, '0')}</strong> / {String(heroSlides.length).padStart(2, '0')}
          </span>
          <div className="flex gap-2">
            {[{ d: 'M19 12H5M11 19l-7-7 7-7', fn: () => goSlide(heroIdx - 1) }, { d: 'M5 12h14M13 5l7 7-7 7', fn: () => goSlide(heroIdx + 1) }].map((btn, i) => (
              <button key={i} onClick={btn.fn}
                      className="flex items-center justify-center rounded-full transition-all duration-200"
                      style={{ width: 44, height: 44, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.2)', color: 'rgba(255,255,255,0.7)', cursor: 'pointer' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = vs.accent; (e.currentTarget as HTMLButtonElement).style.color = vs.accent; }}
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
      <section className="px-6 py-14" style={{ background: vs.bg, borderBottom: `1px solid ${vs.line}` }}>
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-start lg:items-center gap-10 justify-between">
          <div>
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full"
                 style={{ border: '1px solid rgba(21,167,220,0.25)', background: 'rgba(21,167,220,0.06)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: vs.accent, fontFamily: 'monospace' }}>
              Distributed by Rookie Ninja
            </div>
            <h2 style={{ fontWeight: 700, fontSize: 'clamp(26px, 4vw, 44px)', lineHeight: 1.1, letterSpacing: '-0.025em', color: vs.navy }}>
              Authorized ViewSonic <span style={{ color: vs.accent }}>Distributor</span>
            </h2>
            <p style={{ fontSize: 15, color: vs.dim, lineHeight: 1.75, marginTop: 12, maxWidth: 560 }}>
              Rookie Ninja delivers ViewSonic's complete portfolio — interactive displays, monitors, projectors, direct-view LED and pro audio-video solutions — across Middle East & Africa.
            </p>
          </div>
          <div className="flex gap-10 shrink-0">
            {[{ v: '6', l: 'Product Lines' }, { v: '20+', l: 'Years Experience' }, { v: '15+', l: 'Countries' }].map(s => (
              <div key={s.l}>
                <div style={{ fontWeight: 800, fontSize: 34, lineHeight: 1, color: vs.accent, letterSpacing: '-0.03em' }}>{s.v}</div>
                <div style={{ fontSize: 12, color: vs.mute, marginTop: 4 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          IFP — VIEWBOARD INTERACTIVE FLAT PANELS
      ══════════════════════════════════════════ */}
      <section id="ifp" className="px-6 py-24" style={{ background: vs.alt, borderBottom: `1px solid ${vs.line}` }}>
        <div className="max-w-6xl mx-auto">
          <Animate type="fade-up">
            <SectionLabel text="ViewBoard® Interactive Flat Panels" />
            <h2 className="font-display font-bold text-navy leading-[1.1] tracking-[-0.02em] mb-4"
                style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
              Built for two worlds.{' '}
              <span style={{ color: vs.accent }}>One ecosystem.</span>
            </h2>
            <p style={{ fontSize: 15, color: vs.dim, lineHeight: 1.75, maxWidth: 600, marginBottom: 48 }}>
              Every ViewBoard ships with myViewBoard®, AirSync™ and ViewSonic Manager™ at no extra cost —
              whether it's powering a kindergarten class or a global boardroom.
            </p>
          </Animate>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Education side */}
            <Animate type="fade-right">
              <div className="rounded-2xl p-7 h-full bg-white" style={{ border: `0.5px solid ${vs.line}`, boxShadow: '0 2px 20px rgba(10,22,40,0.04)' }}>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div style={{ fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: vs.mute, marginBottom: 6 }}>
                      SIDE A · K-12 & HIGHER EDUCATION
                    </div>
                    <h3 style={{ fontWeight: 700, fontSize: 'clamp(22px, 3vw, 32px)', lineHeight: 1.1, letterSpacing: '-0.02em', color: vs.navy, marginBottom: 10 }}>
                      For the Classroom
                    </h3>
                    <p style={{ fontSize: 13, color: vs.dim, lineHeight: 1.65, maxWidth: 320 }}>
                      EDLA-certified Android, native Google Workspace, myViewBoard whiteboarding and Manager remote control — built for teachers, loved by IT.
                    </p>
                  </div>
                  <div className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                       style={{ background: 'rgba(21,167,220,0.08)', border: '1px solid rgba(21,167,220,0.2)', color: vs.accent }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  {[
                    { badge: 'IFP34 Series', name: 'Energy-Efficient Classroom Display', sub: '65" · 75" · 86" · 4K UHD · Android EDLA', specs: [{ l: 'Sizes', v: '65" · 75" · 86"' }, { l: 'Resolution', v: '4K UHD' }, { l: 'Touch', v: '40-point' }, { l: 'OS', v: 'Android 14 EDLA' }, { l: 'USB-C', v: 'Dual' }, { l: 'Cert.', v: 'EPEAT Gold' }], features: ['Ultra-Fine Touch — pen-on-paper feel with dual-pen recognition.', '20% lower power draw than previous generation.', 'Native Google Classroom, Meet & Workspace via EDLA.'] },
                    { badge: 'IFP35 Series', name: 'Next-Gen Android 16 ViewBoard', sub: '55" — 98" · 4K · 64-point · 8-core / 8 GB', specs: [{ l: 'Sizes', v: '55" → 98"' }, { l: 'Touch', v: '64-point' }, { l: 'Response', v: '6.5 ms' }, { l: 'OS', v: 'Android 16 EDLA' }, { l: 'Audio', v: 'Dual 20 W' }, { l: 'Memory', v: '8 GB / 128 GB' }], features: ['One of the first Android 16 interactive panels in education.', 'Full Google Play access, automatic security updates.', 'Octa-core CPU keeps lesson apps, video and casting running together.'] },
                    { badge: 'IFP52 Series', name: 'Premium ViewBoard with Soundbar & Mic Array', sub: '65" · 75" · 86" · 4K · 33-point · 45 W audio', specs: [{ l: 'Sizes', v: '65" · 75" · 86"' }, { l: 'Audio', v: '45 W Stereo' }, { l: 'Mic', v: 'Beamforming 8-ft' }, { l: 'Touch', v: '33-point' }, { l: 'Resolution', v: '4K UHD' }, { l: 'Software', v: 'myViewBoard' }], features: ['Front-facing soundbar + subwoofer fills every corner of the classroom.', 'Beamforming mic captures the teacher clearly for remote learners.', 'Multi-user simultaneous writing with stylus + finger.'] },
                    { badge: 'Education Software', name: 'myViewBoard® · Insights · Content Library', sub: 'Included — no subscription', specs: [], software: ['myViewBoard Whiteboard — Infinite canvas, quizzes, multimedia & timers', 'ClassSwift — Real-time classroom feedback & quizzes', 'AirSync — Wireless casting, no dongles or apps', 'ViewSonic Manager — Centralized remote device control', 'Insights — Usage analytics & classroom data', 'Content Library — Curriculum-aligned lesson assets'], features: ['Integrates natively with Google Classroom, Meet & Workspace.', 'SSO + NFC sign-in for instant teacher personalization.', 'All software included — zero recurring licensing for core tools.'] },
                  ].map(tile => <IFPTile key={tile.badge} tile={tile} />)}
                </div>
              </div>
            </Animate>

            {/* Corporate side */}
            <Animate type="fade-left" delay={80}>
              <div className="rounded-2xl p-7 h-full bg-white" style={{ border: `0.5px solid ${vs.line}`, boxShadow: '0 2px 20px rgba(10,22,40,0.04)' }}>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div style={{ fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: vs.mute, marginBottom: 6 }}>
                      SIDE B · CORPORATE & ENTERPRISE
                    </div>
                    <h3 style={{ fontWeight: 700, fontSize: 'clamp(22px, 3vw, 32px)', lineHeight: 1.1, letterSpacing: '-0.02em', color: vs.navy, marginBottom: 10 }}>
                      For the Boardroom
                    </h3>
                    <p style={{ fontSize: 13, color: vs.dim, lineHeight: 1.65, maxWidth: 320 }}>
                      Engineered for hybrid work — Microsoft Teams Rooms ready, Zoom, Cisco Webex & Intel UNITE compatible, with TeamOne whiteboarding for teams everywhere.
                    </p>
                  </div>
                  <div className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                       style={{ background: 'rgba(21,167,220,0.08)', border: '1px solid rgba(21,167,220,0.2)', color: vs.accent }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 21h18M5 21V8l7-5 7 5v13"/><path d="M9 9h6M9 13h6M9 17h6"/></svg>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  {[
                    { badge: 'IFP41 Series', name: 'Balanced Performance & Value', sub: '55" — 98" · 4K · 64-point · 55 W soundbar', specs: [{ l: 'Sizes', v: '55" → 98"' }, { l: 'Touch', v: '64-point' }, { l: 'Audio', v: '55 W' }, { l: 'OS', v: 'Android 16 EDLA' }, { l: 'Memory', v: '8 GB / 128 GB' }, { l: 'Feature', v: 'Write Away™' }], features: ['Designed for discussion-driven sessions — adds subwoofer + 8-mic array.', 'Cost-effective entry into ViewSonic\'s premium hybrid stack.', 'Native Microsoft Teams / Zoom / Webex compatibility.'] },
                    { badge: 'IFP51 Series', name: 'Flagship Collaboration Display', sub: '55" — 98" · 4K · NFC sign-in · 70 W audio', specs: [{ l: 'Sizes', v: '55" → 98"' }, { l: 'CPU / RAM', v: 'Octa-core 16 GB' }, { l: 'Audio', v: '70 W' }, { l: 'Sign-In', v: 'NFC + SSO' }, { l: 'USB-C', v: 'PD 65 W' }, { l: 'HDMI', v: '4× HDMI 2.1' }], features: ['Write Away™ — instant, precise annotation with zero lag.', 'Front USB-C with 65 W charging + Ethernet + DP-in over one cable.', 'Premium audio with subwoofer for executive presentations.'] },
                    { badge: 'IFP62 Series', name: 'Premium Hybrid Conference Display', sub: 'UFT+ · bezel-less · optical bonding · USB-C 65 W', specs: [{ l: 'Touch', v: '20-pt PCAP UFT+' }, { l: 'Audio', v: '40 W + 6-mic array' }, { l: 'USB-C', v: 'PD 65 W' }, { l: 'Design', v: 'Bezel-less' }, { l: 'Casting', v: 'vCast 4-screen' }, { l: 'Compat.', v: 'Teams · Zoom · Webex' }], features: ['Edge-to-edge glass + full optical bonding eliminates reflections.', 'Pairs with VB-CAM-201 webcam for one-stop conferencing.', 'Crestron Connected V2 certified, XiO Cloud compatible.'] },
                    { badge: 'Enterprise Software', name: 'TeamOne · AirSync · Manager Advanced', sub: 'Built for hybrid & in-office collaboration', specs: [], software: ['TeamOne™ — Infinite digital canvas for any team, anywhere', 'AirSync™ — Wireless screen casting from any device', 'Manager Advanced — Cloud device management at scale', 'vCast — 4-user simultaneous split-screen casting', 'myViewBoard Display — Browser-based mirroring, no apps', 'Crestron / Q-SYS — Native AV control system integration'], features: ['Compatible with Microsoft Teams Rooms, Zoom Rooms, Webex & Intel UNITE.', 'Centralized cross-campus message broadcasting from Manager.', 'Granular admin role control + scheduled software updates.'] },
                  ].map(tile => <IFPTile key={tile.badge} tile={tile} />)}
                </div>
              </div>
            </Animate>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MONITORS
      ══════════════════════════════════════════ */}
      <section id="monitors" className="px-6 py-24" style={{ background: vs.bg, borderBottom: `1px solid ${vs.line}` }}>
        <div className="max-w-6xl mx-auto">
          <Animate type="fade-up">
            <SectionLabel text="Monitors" />
            <h2 className="font-display font-bold text-navy leading-[1.1] tracking-[-0.02em] mb-4"
                style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
              Pick your <span style={{ color: vs.accent }}>pixel.</span>
            </h2>
            <p style={{ fontSize: 15, color: vs.dim, lineHeight: 1.75, maxWidth: 580, marginBottom: 40 }}>
              Five purpose-built series — covering everything from home productivity to pixel-perfect color grading and 360 Hz competitive gaming.
            </p>
          </Animate>

          <div className="flex flex-col gap-3">
            {monitorSeries.map(m => (
              <AccordionTile key={m.id} open={openMonitor === m.id} onToggle={() => setOpenMonitor(openMonitor === m.id ? null : m.id)}
                header={
                  <div className="flex items-center gap-5 p-5 lg:p-6">
                    <span style={{ fontWeight: 800, fontSize: 'clamp(28px, 3.5vw, 44px)', lineHeight: 1, letterSpacing: '-0.04em', color: openMonitor === m.id ? vs.accent : 'rgba(10,22,40,0.15)', minWidth: 110, flexShrink: 0 }}>{m.series}</span>
                    <div className="flex-1 text-left">
                      <div style={{ fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: vs.mute, marginBottom: 3 }}>{m.cat}</div>
                      <div style={{ fontWeight: 700, fontSize: 'clamp(14px, 1.8vw, 18px)', letterSpacing: '-0.01em', color: vs.navy, marginBottom: 3 }}>{m.name}</div>
                      <div style={{ fontSize: 12, color: vs.dim }}>{m.tagline}</div>
                    </div>
                    <div className="hidden sm:flex gap-1.5">
                      {m.sizes.map(s => <span key={s} style={{ fontFamily: 'monospace', fontSize: 10, padding: '3px 7px', border: `1px solid ${vs.line}`, borderRadius: 4, color: vs.mute }}>{s}</span>)}
                    </div>
                    <div className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
                         style={{ border: `1px solid ${openMonitor === m.id ? vs.accent : vs.line}`, background: openMonitor === m.id ? vs.accent : 'transparent', color: openMonitor === m.id ? '#fff' : vs.navy, transform: openMonitor === m.id ? 'rotate(45deg)' : 'none' }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M12 5v14M5 12h14"/></svg>
                    </div>
                  </div>
                }>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 p-5 lg:p-7" style={{ borderTop: `1px solid ${vs.line}`, background: vs.alt }}>
                  <PlaceholderImage label={`${m.series} Series Monitor`} />
                  <div>
                    <HighlightBox {...m.highlight} />
                    <SpecGrid specs={m.specs} />
                    <FeatureList features={m.features} />
                  </div>
                </div>
              </AccordionTile>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PROJECTORS
      ══════════════════════════════════════════ */}
      <section id="projectors" className="px-6 py-24" style={{ background: vs.alt, borderBottom: `1px solid ${vs.line}` }}>
        <div className="max-w-6xl mx-auto">
          <Animate type="fade-up">
            <SectionLabel text="Projectors" />
            <h2 className="font-display font-bold text-navy leading-[1.1] tracking-[-0.02em] mb-4"
                style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
              Projection <span style={{ color: vs.accent }}>re-imagined.</span>
            </h2>
            <p style={{ fontSize: 15, color: vs.dim, lineHeight: 1.75, maxWidth: 580, marginBottom: 40 }}>
              Laser, lamp and ultra-short throw projectors delivering 4K brilliance — from portable pico to large-venue installations.
            </p>
          </Animate>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {projectors.map(p => (
              <div key={p.id}
                   className="rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 bg-white"
                   style={{ border: openProjector === p.id ? `1px solid ${vs.accent}` : `0.5px solid ${vs.line}`, gridColumn: openProjector === p.id ? '1 / -1' : 'auto', boxShadow: openProjector === p.id ? '0 4px 24px rgba(21,167,220,0.1)' : 'none' }}
                   onClick={() => setOpenProjector(openProjector === p.id ? null : p.id)}>
                <div className="p-6 flex flex-col gap-4" style={{ minHeight: 240 }}>
                  <div className="flex justify-between items-start">
                    <span className="inline-flex items-center gap-2"
                          style={{ fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: vs.accent }}>
                      <span style={{ width: 16, height: 1, background: vs.accent, display: 'inline-block' }} />
                      {p.type}
                    </span>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300"
                         style={{ border: `1px solid ${openProjector === p.id ? vs.accent : vs.line}`, background: openProjector === p.id ? vs.accent : 'transparent', color: openProjector === p.id ? '#fff' : vs.accent, transform: openProjector === p.id ? 'rotate(45deg)' : 'none' }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M12 5v14M5 12h14"/></svg>
                    </div>
                  </div>
                  <div style={{ marginTop: 'auto' }}>
                    <div style={{ fontWeight: 700, fontSize: 'clamp(22px, 2.5vw, 30px)', lineHeight: 1, letterSpacing: '-0.02em', color: vs.navy, marginBottom: 8 }}>{p.name}</div>
                    <div style={{ fontSize: 13, color: vs.dim, lineHeight: 1.6 }}>{p.desc}</div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {p.models.map(m => <span key={m} style={{ fontFamily: 'monospace', fontSize: 10, padding: '3px 8px', border: `1px solid ${vs.line}`, borderRadius: 5, color: vs.mute }}>{m}</span>)}
                  </div>
                </div>
                {openProjector === p.id && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 p-6" style={{ borderTop: `1px solid ${vs.line}`, background: vs.alt }}>
                    <PlaceholderImage label={p.name} />
                    <div>
                      <HighlightBox {...p.highlight} />
                      <SpecGrid specs={p.specs} />
                      <FeatureList features={p.features} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          VIDEO CONFERENCING
      ══════════════════════════════════════════ */}
      <section id="vconf" className="px-6 py-24" style={{ background: vs.bg, borderBottom: `1px solid ${vs.line}` }}>
        <div className="max-w-6xl mx-auto">
          <Animate type="fade-up">
            <SectionLabel text="Video Conferencing" />
            <h2 className="font-display font-bold text-navy leading-[1.1] tracking-[-0.02em] mb-4"
                style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
              Meet without <span style={{ color: vs.accent }}>limits.</span>
            </h2>
            <p style={{ fontSize: 15, color: vs.dim, lineHeight: 1.75, maxWidth: 580, marginBottom: 40 }}>
              Certified video bars, PTZ cameras and Microsoft Teams Rooms solutions that make every meeting feel like the same room.
            </p>
          </Animate>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {vcProducts.map(vc => (
              <div key={vc.id}
                   className="rounded-2xl overflow-hidden transition-all duration-300 bg-white"
                   style={{ border: openVC === vc.id ? `1px solid ${vs.accent}` : `0.5px solid ${vs.line}`, gridColumn: openVC === vc.id ? '1 / -1' : 'auto', boxShadow: openVC === vc.id ? '0 4px 24px rgba(21,167,220,0.1)' : 'none' }}>
                <button onClick={() => setOpenVC(openVC === vc.id ? null : vc.id)}
                        className="w-full text-left p-7 flex flex-col"
                        style={{ cursor: 'pointer', background: 'none', border: 'none', color: 'inherit', fontFamily: 'inherit', minHeight: 200, position: 'relative' }}>
                  <span className="font-body font-medium px-2.5 py-1 rounded mb-auto w-max"
                        style={{ fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', background: 'rgba(21,167,220,0.08)', color: vs.accent, border: '0.5px solid rgba(21,167,220,0.25)' }}>
                    {vc.chip}
                  </span>
                  <div className="absolute top-7 right-7 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
                       style={{ border: `1px solid ${openVC === vc.id ? vs.accent : vs.line}`, background: openVC === vc.id ? vs.accent : 'transparent', color: openVC === vc.id ? '#fff' : vs.navy, transform: openVC === vc.id ? 'rotate(45deg)' : 'none' }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M12 5v14M5 12h14"/></svg>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 'clamp(18px, 2vw, 22px)', letterSpacing: '-0.015em', color: vs.navy, marginTop: 20, marginBottom: 6 }}>{vc.name}</div>
                  <div style={{ fontSize: 13, color: vs.dim, lineHeight: 1.6 }}>{vc.desc}</div>
                </button>
                {openVC === vc.id && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-7" style={{ borderTop: `1px solid ${vs.line}`, background: vs.alt }}>
                    {vc.models.map(m => (
                      <div key={m.sku} className="rounded-xl overflow-hidden bg-white" style={{ border: `0.5px solid ${vs.line}` }}>
                        <PlaceholderImage label={m.sku} />
                        <div className="p-4">
                          <div style={{ fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.18em', color: vs.accent, marginBottom: 5 }}>{m.sku}</div>
                          <div style={{ fontWeight: 600, fontSize: 15, letterSpacing: '-0.01em', color: vs.navy, marginBottom: 5 }}>{m.title}</div>
                          <div style={{ fontSize: 13, color: vs.dim, lineHeight: 1.6 }}>{m.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          COMMERCIAL & SIGNAGE
      ══════════════════════════════════════════ */}
      <section id="signage" className="px-6 py-24" style={{ background: vs.alt, borderBottom: `1px solid ${vs.line}` }}>
        <div className="max-w-6xl mx-auto">
          <Animate type="fade-up">
            <SectionLabel text="Commercial & Signage" />
            <h2 className="font-display font-bold text-navy leading-[1.1] tracking-[-0.02em] mb-4"
                style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
              Built for <span style={{ color: vs.accent }}>24 / 7.</span>
            </h2>
            <p style={{ fontSize: 15, color: vs.dim, lineHeight: 1.75, maxWidth: 580, marginBottom: 40 }}>
              From corporate digital signage to ePoster displays for retail and wayfinding — ViewSonic CDE and EP series are engineered for always-on duty cycles.
            </p>
          </Animate>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {signageProducts.map(s => (
              <div key={s.id}
                   className="rounded-2xl overflow-hidden transition-all duration-300 bg-white"
                   style={{ border: openSignage === s.id ? `1px solid ${vs.accent}` : `0.5px solid ${vs.line}`, gridColumn: openSignage === s.id ? '1 / -1' : 'auto', boxShadow: openSignage === s.id ? '0 4px 24px rgba(21,167,220,0.1)' : 'none' }}>
                <button onClick={() => setOpenSignage(openSignage === s.id ? null : s.id)}
                        className="w-full text-left p-7 flex flex-col"
                        style={{ cursor: 'pointer', background: 'none', border: 'none', color: 'inherit', fontFamily: 'inherit', minHeight: 220 }}>
                  <div className="flex justify-between items-start mb-auto">
                    <span style={{ fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: vs.accent }}>{s.cat}</span>
                    <div className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
                         style={{ border: `1px solid ${openSignage === s.id ? vs.accent : vs.line}`, background: openSignage === s.id ? vs.accent : 'transparent', color: openSignage === s.id ? '#fff' : vs.navy, transform: openSignage === s.id ? 'rotate(45deg)' : 'none' }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M12 5v14M5 12h14"/></svg>
                    </div>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 'clamp(20px, 2.5vw, 28px)', lineHeight: 1.1, letterSpacing: '-0.02em', color: vs.navy, marginBottom: 8 }}>{s.name}</div>
                  <div style={{ fontSize: 13, color: vs.dim, lineHeight: 1.6, maxWidth: 440 }}>{s.desc}</div>
                </button>
                {openSignage === s.id && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 p-7" style={{ borderTop: `1px solid ${vs.line}`, background: vs.alt }}>
                    <PlaceholderImage label={s.name} />
                    <div>
                      <HighlightBox {...s.highlight} />
                      <SpecGrid specs={s.specs} />
                      <FeatureList features={s.features} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA BAND
      ══════════════════════════════════════════ */}
      <section className="px-6 py-20" style={{ background: vs.bg }}>
        <div className="max-w-3xl mx-auto text-center">
          <Animate type="fade-up">
            <p className="font-body font-semibold uppercase mb-4"
               style={{ fontSize: '12px', letterSpacing: '0.1em', color: vs.accent }}>
              Authorized ViewSonic Partner
            </p>
            <h2 className="font-display font-bold text-navy leading-[1.1] tracking-[-0.02em] mb-4"
                style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>
              Ready to build your <span style={{ color: vs.accent }}>AV stack?</span>
            </h2>
            <p style={{ fontSize: 15, color: vs.dim, lineHeight: 1.75, marginBottom: 32 }}>
              From boardrooms to classrooms — Rookie Ninja delivers the complete ViewSonic portfolio with expert support and fast regional logistics.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact"
                 className="inline-flex items-center gap-2 font-body font-medium text-white bg-accent px-6 py-3 rounded-xl transition-all duration-200 no-underline hover:opacity-85 hover:-translate-y-px"
                 style={{ fontSize: '14px', boxShadow: '0 4px_20px rgba(21,167,220,0.3)' }}>
                Request a Quote
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
              <Link href="/contact"
                 className="inline-flex items-center gap-2 font-body font-medium text-accent border border-accent/40 px-6 py-3 rounded-xl transition-all duration-200 no-underline hover:bg-accent hover:text-white hover:-translate-y-px"
                 style={{ fontSize: '14px' }}>
                Schedule a Demo
              </Link>
            </div>
          </Animate>
        </div>
      </section>

      <style>{`
        @keyframes vsPulse { 0%,100%{ opacity:1; transform:scale(1); } 50%{ opacity:.5; transform:scale(.8); } }
        @media (max-width: 1024px) {
          .vs-hero-grid { grid-template-columns: 1fr !important; padding: 110px 24px 100px !important; }
          .vs-hero-controls { left: 24px !important; right: 24px !important; bottom: 24px !important; }
        }
      `}</style>
    </main>
  );
}