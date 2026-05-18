'use client';

import { useState, useEffect, useRef } from 'react';
import Animate from '../Animate';

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
    desc: 'From everyday office screens to color-critical creator panels and 360 Hz Mini-LED gaming weapons — there\'s a ViewSonic monitor for every desk.',
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
    specs: [
      { label: 'Sizes', value: '24" · 27" · 32"' }, { label: 'Refresh', value: '75 / 100 Hz' },
      { label: 'Inputs', value: 'HDMI · DP · VGA' }, { label: 'Speakers', value: 'Built-in' },
      { label: 'Eye Care', value: 'Flicker-Free' }, { label: 'Tilt', value: 'Adjustable' },
    ],
    features: ['SuperClear® IPS panels for accurate color and wide viewing angles.', 'Integrated speakers — clean desk, no extra audio gear required.', 'Versatile HDMI / DisplayPort / VGA inputs work with legacy and modern setups.', 'ViewMode presets for movie, gaming, web and text optimization.'],
  },
  {
    id: 'vx', series: 'VX · XG', cat: 'Gaming & Pro Gaming · OMNI & ELITE',
    name: 'Tournament-Grade Performance',
    tagline: 'Up to 360 Hz refresh, 0.5 ms response, Mini-LED HDR and a full pro-gaming feature stack.',
    sizes: ['24"', '27"', '32"', '34"'],
    highlight: { label: 'Top Refresh Rate', value: '360 Hz', desc: 'With 0.5 ms GtG response time on ELITE flagships — for competitive esports.' },
    specs: [
      { label: 'Sizes', value: '24" · 27" · 32" · 34"' }, { label: 'Refresh', value: 'Up to 360 Hz' },
      { label: 'Response', value: '0.5 ms GtG' }, { label: 'Panel', value: 'Mini-LED / QD-OLED' },
      { label: 'Sync', value: 'G-SYNC + FreeSync' }, { label: 'HDR', value: 'VESA DisplayHDR 1400' },
    ],
    features: ['PureXP™ motion-blur reduction + Black Stabilization for dark scenes.', 'Mini-LED backlight with thousands of dimming zones for true HDR.', 'Curved 34" ultrawide and flat 27" QHD esports configurations.', 'Sniper Mode, custom crosshair overlays and shooter/MOBA color presets.'],
  },
  {
    id: 'vg', series: 'VG', cat: 'Business Monitors',
    name: 'Productivity, Engineered',
    tagline: 'USB-C hub, daisy-chain DP, full ergonomic stand and frame-thin design for clean enterprise rollouts.',
    sizes: ['24"', '27"', '32"', '34"'],
    highlight: { label: 'USB-C Power Delivery', value: 'up to 100 W', desc: 'Charges a laptop, drives video, transmits data and connects Ethernet — all over one cable.' },
    specs: [
      { label: 'Sizes', value: '24" · 27" · 32" · 34"' }, { label: 'Resolution', value: 'FHD · QHD · 4K' },
      { label: 'USB-C Hub', value: 'Yes' }, { label: 'Ergonomics', value: 'Full adjustment' },
      { label: 'Ethernet', value: 'RJ45 on select' }, { label: 'Daisy Chain', value: 'DP-Out' },
    ],
    features: ['Pivot to portrait for code, documents and long-form reading.', 'Frameless design ideal for clean dual- and triple-monitor walls.', 'Daisy-chain via DisplayPort cuts cabling on dense workstations.', 'TCO Certified + EPEAT for sustainable enterprise procurement.'],
  },
  {
    id: 'vp', series: 'VP', cat: 'ColorPro™ · Professional',
    name: 'Color-Critical Creator Displays',
    tagline: 'Pantone & Pantone SkinTone validated, hardware-calibrated, ΔE<2 accuracy out of the box.',
    sizes: ['27"', '32"'],
    highlight: { label: 'Color Accuracy', value: 'ΔE < 2', desc: 'Pantone & Pantone SkinTone validated, factory hardware calibration certificate in the box.' },
    specs: [
      { label: 'Color Gamut', value: '100% sRGB' }, { label: 'Validation', value: 'Pantone' },
      { label: 'USB-C', value: '90 W PD' }, { label: 'Resolution', value: '4K UHD' },
      { label: 'HDR', value: 'HDR10' }, { label: 'Calibration', value: 'Hardware' },
    ],
    features: ['ColorPro™ Wheel shortcut controller for Adobe Lightroom & Capture One.', 'Uniformity correction across the panel for color grading and print proofing.', 'Pre-loaded gamut presets for photo, video, design and broadcast workflows.', 'Built-in hood support, dual headphone jacks and clean ColorPro™ stand.'],
  },
  {
    id: 'td', series: 'TD', cat: 'Touch Monitors',
    name: 'Interactive Desktop & POS Touch',
    tagline: 'PCAP multi-touch with palm rejection — for kiosks, signage, healthcare, retail and creative workflows.',
    sizes: ['16"', '22"', '24"', '27"', '32"', '43"'],
    highlight: { label: 'Touch Technology', value: '10-pt PCAP', desc: 'Projected capacitive multi-touch with palm rejection and active-pen support.' },
    specs: [
      { label: 'Sizes', value: '16" → 43"' }, { label: 'Touch Type', value: 'PCAP' },
      { label: 'USB-C', value: 'Supported' }, { label: 'Glass', value: 'Edge-to-Edge' },
      { label: 'Form Factors', value: 'Desktop · Wall · POS' }, { label: 'OSD', value: 'On-screen touch' },
    ],
    features: ['Optical bonding eliminates parallax — precise touch from edge to corner.', 'Zero-bezel glass for kiosk and signage enclosure integration.', 'Portrait and landscape mounting with VESA compatibility.', 'Medical-grade cleanable surfaces on healthcare-spec variants.'],
  },
];

/* ─────────────────────────────────────────────
   PROJECTOR DATA
───────────────────────────────────────────── */
const projectors = [
  {
    id: 'ls', type: 'Laser · Short Throw', name: 'LS Series', desc: 'Laser light source projectors for classrooms and meeting rooms — bright, maintenance-free, with optional ultra-short throw.',
    models: ['LS510W', 'LS560W', 'LS831WU'], highlight: { label: 'Lamp Life', value: '30,000 hrs', desc: 'Zero lamp replacement — laser source with consistent brightness over its full lifetime.' },
    specs: [{ label: 'Brightness', value: '3,500 – 5,000 lm' }, { label: 'Resolution', value: 'WXGA · WUXGA' }, { label: 'Throw', value: 'Short / Ultra-short' }, { label: 'Source', value: 'Laser' }],
    features: ['InstantOn™ — full brightness in under 5 seconds, zero warm-up.', 'SuperColor™ 6-segment colour wheel for vivid, accurate images.', 'Vertical and horizontal lens shift + digital zoom for flexible installation.'],
  },
  {
    id: 'px', type: '4K · Home Cinema', name: 'PX / PA Series', desc: 'True 4K UHD home cinema and large-venue projectors with HDR10 and Rec.709 color support.',
    models: ['PX701-4K', 'PA503W', 'PX748-4K'], highlight: { label: 'Resolution', value: '4K UHD', desc: 'True 4K with HDR10 and Rec.709 color for cinema-grade home and venue installations.' },
    specs: [{ label: 'Resolution', value: '4K UHD / WXGA' }, { label: 'Brightness', value: 'Up to 4,000 lm' }, { label: 'HDR', value: 'HDR10' }, { label: 'Throw', value: 'Standard' }],
    features: ['HDR10 content display with tone mapping for realistic bright/dark contrast.', 'Low input lag mode for 4K gaming at 60 Hz.', '240 Hz frame interpolation for smooth sports and action content.'],
  },
  {
    id: 'pg', type: 'Large Venue · Installation', name: 'PG Series', desc: 'High-lumen installation projectors for auditoriums, lecture halls, houses of worship and large events.',
    models: ['PG700WU', 'PG800HD', 'PG800X'], highlight: { label: 'Peak Brightness', value: '8,000 lm', desc: 'High output laser projection for large-screen venues in any lighting condition.' },
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
   REUSABLE ACCORDION TILE (Monitors / LED)
───────────────────────────────────────────── */
function AccordionTile({ id, open, onToggle, header, children }: {
  id: string; open: boolean; onToggle: () => void; header: React.ReactNode; children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        border: open ? '1px solid #15A7DC' : '1px solid rgba(255,255,255,0.06)',
        background: 'linear-gradient(180deg, rgba(255,255,255,0.025), rgba(255,255,255,0))',
      }}
    >
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
   SPEC GRID
───────────────────────────────────────────── */
function SpecGrid({ specs }: { specs: { label: string; value: string }[] }) {
  return (
    <div className="grid gap-3 mb-5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
      {specs.map(s => (
        <div key={s.label} className="p-3 rounded-xl" style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
          <div className="mb-1" style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#6e6a62' }}>{s.label}</div>
          <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: '15px', color: '#f2f0eb' }}>{s.value}</div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   FEATURE LIST
───────────────────────────────────────────── */
function FeatureList({ features }: { features: string[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {features.map((f, i) => (
        <li key={i} className="flex gap-3 items-start" style={{ fontSize: '14px', color: '#a8a39a', lineHeight: 1.6 }}>
          <span className="shrink-0 mt-[7px] w-1.5 h-1.5 rounded-full" style={{ background: '#15A7DC' }} />
          {f}
        </li>
      ))}
    </ul>
  );
}

/* ─────────────────────────────────────────────
   HIGHLIGHT BOX
───────────────────────────────────────────── */
function HighlightBox({ label, value, desc }: { label: string; value: string; desc: string }) {
  return (
    <div className="rounded-xl p-5 mb-5" style={{ background: 'linear-gradient(135deg, rgba(21,167,220,0.1), rgba(21,167,220,0.03))', border: '1px solid rgba(21,167,220,0.25)' }}>
      <div className="mb-1" style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#15A7DC' }}>{label}</div>
      <div className="mb-1" style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: '28px', lineHeight: 1, letterSpacing: '-0.02em', color: '#f2f0eb' }}>{value}</div>
      <div style={{ fontSize: '13px', color: '#a8a39a' }}>{desc}</div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PLACEHOLDER IMAGE BOX
───────────────────────────────────────────── */
function PlaceholderImage({ label }: { label: string }) {
  return (
    <div className="w-full rounded-2xl flex flex-col items-center justify-center gap-3"
         style={{ aspectRatio: '16/10', background: 'linear-gradient(135deg, rgba(21,167,220,0.06), rgba(0,0,0,0.3))', border: '1px dashed rgba(255,255,255,0.1)' }}>
      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ border: '1.5px dashed rgba(255,255,255,0.15)' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.6"><rect x="3" y="4" width="18" height="13" rx="1.5"/><path d="M8 21h8M12 17v4"/></svg>
      </div>
      <span style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)' }}>{label}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SECTION LABEL
───────────────────────────────────────────── */
function SectionLabel({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center gap-3 mb-5" style={{ fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.24em', textTransform: 'uppercase', color: '#15A7DC' }}>
      <span style={{ width: 32, height: 1, background: '#15A7DC', display: 'inline-block' }} />
      {text}
    </div>
  );
}

/* ─────────────────────────────────────────────
   IFP ACCORDION TILE (Education & Corporate)
───────────────────────────────────────────── */
function IFPTile({ tile, accent, line, dim, mute }: {
  tile: { badge: string; name: string; sub: string; specs: { l: string; v: string }[]; software?: string[]; features: string[] };
  accent: string; line: string; dim: string; mute: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl overflow-hidden transition-all duration-300"
         style={{ border: open ? `1px solid ${accent}` : `1px solid ${line}`, background: open ? `linear-gradient(180deg, rgba(21,167,220,0.06), rgba(21,167,220,0.02))` : 'rgba(255,255,255,0.015)' }}>
      <button onClick={() => setOpen(!open)} className="w-full text-left flex items-center justify-between gap-4 px-5 py-4"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', fontFamily: 'inherit' }}>
        <div className="flex items-center gap-4">
          <span className="shrink-0 px-2 py-1 rounded" style={{ fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', background: 'rgba(21,167,220,0.1)', color: accent, border: '1px solid rgba(21,167,220,0.25)' }}>
            {tile.badge}
          </span>
          <div>
            <div style={{ fontWeight: 600, fontSize: 15, letterSpacing: '-0.01em' }}>{tile.name}</div>
            <div style={{ fontSize: 11, color: mute, marginTop: 2 }}>{tile.sub}</div>
          </div>
        </div>
        <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
             style={{ border: `1px solid ${open ? accent : line}`, background: open ? accent : 'none', color: open ? '#fff' : '#fff', transform: open ? 'rotate(45deg)' : 'none' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M12 5v14M5 12h14"/></svg>
        </div>
      </button>

      <div style={{ maxHeight: open ? '900px' : 0, overflow: 'hidden', transition: 'max-height 0.55s cubic-bezier(.22,.61,.36,1)' }}>
        <div className="px-5 pb-5" style={{ borderTop: `1px solid ${line}` }}>
          <PlaceholderImage label={tile.badge} />
          {tile.software ? (
            <div className="mt-4">
              <div className="grid grid-cols-2 gap-2 mb-4">
                {tile.software.map(s => {
                  const [title, desc] = s.split(' — ');
                  return (
                    <div key={title} className="p-3 rounded-xl transition-all duration-200"
                         style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${line}` }}>
                      <div style={{ fontWeight: 600, fontSize: 12 }}>{title}</div>
                      {desc && <div style={{ fontSize: 11, color: mute, marginTop: 2, lineHeight: 1.4 }}>{desc}</div>}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="mt-4">
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

  useEffect(() => { resetTimer(); return () => { if (timerRef.current) clearInterval(timerRef.current); }; }, []);

  const goSlide = (n: number) => { setHeroIdx((n + heroSlides.length) % heroSlides.length); resetTimer(); };

  const slide = heroSlides[heroIdx];

  const vs = { bg: '#0a0a0a', ink: '#141414', line: 'rgba(255,255,255,0.06)', accent: '#15A7DC', text: '#f2f0eb', dim: '#a8a39a', mute: '#6e6a62' };

  return (
    <main style={{ background: vs.bg, color: vs.text, fontFamily: 'var(--font-poppins)', overflowX: 'hidden' }}>

      {/* ══════════════════════════════════════════
          HERO SLIDER
      ══════════════════════════════════════════ */}
      <section style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', background: vs.bg }}>

        {/* Animated gradient background per slide */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          transition: 'background 1s ease',
          background: heroIdx === 0
            ? 'radial-gradient(ellipse 80% 60% at 20% 30%, rgba(21,167,220,0.18), transparent 60%), linear-gradient(135deg, #0d1218 0%, #0a0a0a 70%)'
            : heroIdx === 1
            ? 'radial-gradient(ellipse at 70% 40%, rgba(21,167,220,0.12), transparent 60%), linear-gradient(120deg, #0a0d12 0%, #0a0a0a 70%)'
            : heroIdx === 2
            ? 'radial-gradient(ellipse 60% 80% at 50% 100%, rgba(21,167,220,0.15), transparent 60%), linear-gradient(180deg, #0a0d14 0%, #0a0a0a 70%)'
            : 'radial-gradient(ellipse at 60% 40%, rgba(21,167,220,0.12), transparent 60%), linear-gradient(135deg, #0a0d10 0%, #0a0a0a 70%)',
        }} />

        {/* Dot grid */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1, opacity: 0.6,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black, transparent)',
        }} />

        {/* Slide content */}
        <div style={{ position: 'relative', zIndex: 2, height: '100%', minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, padding: '140px 80px 100px', alignItems: 'center' }}
             className="max-w-[1400px] mx-auto hero-grid">

          {/* Left text */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full"
                 style={{ border: '1px solid rgba(21,167,220,0.3)', background: 'rgba(21,167,220,0.07)', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: vs.accent }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: vs.accent, boxShadow: `0 0 10px ${vs.accent}`, animation: 'pulse 2s infinite', display: 'inline-block' }} />
              {slide.eyebrow}
            </div>

            {/* Title */}
            <h1 style={{ fontWeight: 700, lineHeight: 0.95, letterSpacing: '-0.035em', marginBottom: 24, fontSize: 'clamp(42px, 6.5vw, 88px)' }}>
              {slide.title.map((line, i) => (
                <span key={i} style={{ display: 'block', color: i === slide.accentLine ? vs.accent : vs.text }}>
                  {line}
                </span>
              ))}
            </h1>

            {/* Desc */}
            <p style={{ fontSize: 17, lineHeight: 1.65, color: vs.dim, maxWidth: 520, marginBottom: 28 }}>
              {slide.desc}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {slide.tags.map(t => (
                <span key={t} className="px-4 py-2 rounded-full" style={{ fontSize: 12, fontWeight: 500, border: `1px solid ${vs.line}`, background: 'rgba(255,255,255,0.03)', color: vs.dim }}>
                  {t}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex gap-3 flex-wrap">
              <a href={slide.cta.href}
                 className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-200 hover:-translate-y-0.5"
                 style={{ background: vs.accent, color: '#fff', fontSize: 14, fontWeight: 600, boxShadow: `0 8px 24px -8px rgba(21,167,220,0.5)` }}>
                {slide.cta.label}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
              </a>
              <a href={slide.ghost.href}
                 className="inline-flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-200"
                 style={{ border: `1px solid ${vs.line}`, color: vs.text, fontSize: 14, fontWeight: 500, background: 'rgba(255,255,255,0.02)' }}>
                {slide.ghost.label}
              </a>
            </div>
          </div>

          {/* Right visual placeholder */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="w-full max-w-lg rounded-2xl flex flex-col items-center justify-center gap-4"
                 style={{ aspectRatio: '16/10', border: `1px solid ${vs.line}`, background: 'linear-gradient(135deg, rgba(255,255,255,0.02), rgba(21,167,220,0.04))', backdropFilter: 'blur(20px)' }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ border: '1.5px dashed rgba(255,255,255,0.15)' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.8"><rect x="2" y="4" width="20" height="14" rx="2"/><path d="M8 21h8M12 18v3"/></svg>
              </div>
              <span style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>
                add product image here
              </span>
            </div>
          </div>
        </div>

        {/* Slide controls */}
        <div style={{ position: 'absolute', bottom: 40, left: 80, right: 80, zIndex: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
             className="hero-controls">

          {/* Dot indicators */}
          <div className="flex gap-2">
            {heroSlides.map((_, i) => (
              <button key={i} onClick={() => goSlide(i)}
                      style={{ width: 36, height: 3, border: 'none', borderRadius: 2, background: i === heroIdx ? vs.accent : 'rgba(255,255,255,0.15)', cursor: 'pointer', transition: 'background 0.3s' }} />
            ))}
          </div>

          {/* Counter */}
          <span style={{ fontFamily: 'monospace', fontSize: 12, letterSpacing: '0.16em', color: vs.dim }}>
            <strong style={{ color: vs.accent }}>{String(heroIdx + 1).padStart(2, '0')}</strong> / {String(heroSlides.length).padStart(2, '0')}
          </span>

          {/* Arrows */}
          <div className="flex gap-2">
            {[{ label: 'Prev', d: 'M19 12H5M11 19l-7-7 7-7', fn: () => goSlide(heroIdx - 1) }, { label: 'Next', d: 'M5 12h14M13 5l7 7-7 7', fn: () => goSlide(heroIdx + 1) }].map(btn => (
              <button key={btn.label} onClick={btn.fn}
                      className="flex items-center justify-center rounded-full transition-all duration-200"
                      style={{ width: 44, height: 44, border: `1px solid ${vs.line}`, background: 'rgba(0,0,0,0.3)', color: vs.text, cursor: 'pointer' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = vs.accent; (e.currentTarget as HTMLButtonElement).style.color = vs.accent; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = vs.line; (e.currentTarget as HTMLButtonElement).style.color = vs.text; }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={btn.d}/></svg>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          INTRO BAND
      ══════════════════════════════════════════ */}
      <section className="px-6 py-16" style={{ background: vs.ink, borderTop: `1px solid ${vs.line}`, borderBottom: `1px solid ${vs.line}` }}>
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-start lg:items-center gap-10 justify-between">
          <div>
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full"
                 style={{ border: '1px solid rgba(21,167,220,0.25)', background: 'rgba(21,167,220,0.08)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: vs.accent, fontFamily: 'monospace' }}>
              Distributed by Rookie Ninja
            </div>
            <h2 style={{ fontWeight: 700, fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
              Authorized ViewSonic <span style={{ color: vs.accent }}>Distributor</span>
            </h2>
            <p style={{ fontSize: 15, color: vs.dim, lineHeight: 1.7, marginTop: 12, maxWidth: 560 }}>
              Rookie Ninja delivers ViewSonic's complete portfolio — interactive displays, monitors, projectors, direct-view LED and pro audio-video solutions — across Middle East & Africa.
            </p>
          </div>
          <div className="flex gap-10 shrink-0">
            {[{ v: '6', l: 'Product Lines' }, { v: '20+', l: 'Years Experience' }, { v: '15+', l: 'Countries' }].map(s => (
              <div key={s.l}>
                <div style={{ fontWeight: 800, fontSize: 36, lineHeight: 1, color: vs.accent, letterSpacing: '-0.03em' }}>{s.v}</div>
                <div style={{ fontSize: 12, color: vs.dim, marginTop: 4 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          IFP — VIEWBOARD INTERACTIVE FLAT PANELS
      ══════════════════════════════════════════ */}
      <section id="ifp" className="px-6 py-24" style={{ background: vs.bg, borderTop: `1px solid ${vs.line}`, position: 'relative' }}>
        {/* Subtle accent glow top */}
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '60%', height: 1, background: `linear-gradient(90deg, transparent, ${vs.accent}, transparent)`, opacity: 0.3 }} />

        <div className="max-w-6xl mx-auto">
          <Animate type="fade-up">
            <SectionLabel text="ViewBoard® Interactive Flat Panels" />
            <h2 style={{ fontWeight: 700, fontSize: 'clamp(36px, 5vw, 64px)', lineHeight: 0.98, letterSpacing: '-0.03em', marginBottom: 16 }}>
              Built for two worlds.{' '}
              <em style={{ fontStyle: 'normal', color: vs.accent }}>One ecosystem.</em>
            </h2>
            <p style={{ fontSize: 17, color: vs.dim, lineHeight: 1.65, maxWidth: 640, marginBottom: 56 }}>
              Every ViewBoard ships with myViewBoard®, AirSync™ and ViewSonic Manager™ at no extra cost —
              whether it's powering a kindergarten class or a global boardroom.
            </p>
          </Animate>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* ── EDUCATION SIDE ── */}
            <Animate type="fade-right">
              <div className="rounded-2xl p-8 h-full" style={{ border: `1px solid ${vs.line}`, background: 'linear-gradient(180deg, rgba(255,255,255,0.025), rgba(255,255,255,0))', position: 'relative', overflow: 'hidden' }}>
                {/* Hover top line */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${vs.accent}, transparent)`, opacity: 0.6 }} />

                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div style={{ fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: vs.mute, marginBottom: 8 }}>
                      SIDE A · K-12 & HIGHER EDUCATION
                    </div>
                    <h3 style={{ fontWeight: 700, fontSize: 'clamp(28px, 3vw, 40px)', lineHeight: 1, letterSpacing: '-0.025em', marginBottom: 12 }}>
                      For the Classroom
                    </h3>
                    <p style={{ fontSize: 14, color: vs.dim, lineHeight: 1.65, maxWidth: 340 }}>
                      EDLA-certified Android, native Google Workspace, myViewBoard whiteboarding and Manager remote control — built for teachers, loved by IT.
                    </p>
                  </div>
                  <div className="shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center"
                       style={{ background: 'linear-gradient(135deg, rgba(21,167,220,0.15), rgba(21,167,220,0.05))', border: '1px solid rgba(21,167,220,0.25)', color: vs.accent }}>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                  </div>
                </div>

                {/* Education tiles */}
                <div className="flex flex-col gap-3">
                  {[
                    { badge: 'IFP34 Series', name: 'Energy-Efficient Classroom Display', sub: '65" · 75" · 86" · 4K UHD · Android EDLA',
                      specs: [{ l: 'Sizes', v: '65" · 75" · 86"' }, { l: 'Resolution', v: '4K UHD' }, { l: 'Touch', v: '40-point' }, { l: 'OS', v: 'Android 14 EDLA' }, { l: 'USB-C', v: 'Dual' }, { l: 'Cert.', v: 'EPEAT Gold' }],
                      features: ['Ultra-Fine Touch — pen-on-paper feel with dual-pen recognition for natural co-writing.', '20% lower power draw than previous generation with built-in real-time power meter.', 'Native Google Classroom, Meet & Workspace via EDLA certification.'] },
                    { badge: 'IFP35 Series', name: 'Next-Gen Android 16 ViewBoard', sub: '55" — 98" · 4K · 64-point touch · 8-core / 8 GB / 128 GB',
                      specs: [{ l: 'Sizes', v: '55" → 98"' }, { l: 'Touch', v: '64-point' }, { l: 'Response', v: '6.5 ms' }, { l: 'OS', v: 'Android 16 EDLA' }, { l: 'Audio', v: 'Dual 20 W' }, { l: 'Memory', v: '8 GB / 128 GB' }],
                      features: ['One of the first Android 16 interactive panels in education.', 'Full Google Play access, automatic security updates, Play Protect.', 'Octa-core CPU keeps lesson apps, video and casting running together.'] },
                    { badge: 'IFP52 Series', name: 'Premium ViewBoard with Soundbar & Mic Array', sub: '65" · 75" · 86" · 4K · 33-point · 45 W front-firing audio',
                      specs: [{ l: 'Sizes', v: '65" · 75" · 86"' }, { l: 'Audio', v: '45 W Stereo' }, { l: 'Mic', v: 'Beamforming 8-ft' }, { l: 'Touch', v: '33-point' }, { l: 'Resolution', v: '4K UHD' }, { l: 'Software', v: 'myViewBoard' }],
                      features: ['Front-facing soundbar + subwoofer fills every corner of the classroom.', 'Beamforming mic captures the teacher clearly for remote/hybrid learners.', 'Multi-user simultaneous writing with stylus + finger.'] },
                    { badge: 'Education Software', name: 'myViewBoard® · Insights · Content Library', sub: 'Included with every ViewBoard — no subscription',
                      specs: [], software: ['myViewBoard Whiteboard — Infinite canvas, quizzes, multimedia & timers', 'ClassSwift — Real-time classroom feedback & quizzes', 'AirSync — Wireless casting, no dongles or apps', 'ViewSonic Manager — Centralized remote device control', 'Insights — Usage analytics & classroom data', 'Content Library — Curriculum-aligned lesson assets'],
                      features: ['Integrates natively with Google Classroom, Meet & Workspace.', 'SSO + NFC sign-in for instant teacher personalization.', 'All software included — zero recurring licensing for core tools.'] },
                  ].map((tile, idx) => (
                    <IFPTile key={tile.badge} tile={tile} accent={vs.accent} line={vs.line} dim={vs.dim} mute={vs.mute} />
                  ))}
                </div>
              </div>
            </Animate>

            {/* ── CORPORATE SIDE ── */}
            <Animate type="fade-left" delay={80}>
              <div className="rounded-2xl p-8 h-full" style={{ border: `1px solid ${vs.line}`, background: 'linear-gradient(180deg, rgba(255,255,255,0.025), rgba(255,255,255,0))', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${vs.accent}, transparent)`, opacity: 0.6 }} />

                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div style={{ fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: vs.mute, marginBottom: 8 }}>
                      SIDE B · CORPORATE & ENTERPRISE
                    </div>
                    <h3 style={{ fontWeight: 700, fontSize: 'clamp(28px, 3vw, 40px)', lineHeight: 1, letterSpacing: '-0.025em', marginBottom: 12 }}>
                      For the Boardroom
                    </h3>
                    <p style={{ fontSize: 14, color: vs.dim, lineHeight: 1.65, maxWidth: 340 }}>
                      Engineered for hybrid work — Microsoft Teams Rooms ready, Zoom, Cisco Webex & Intel UNITE compatible, with TeamOne whiteboarding for teams everywhere.
                    </p>
                  </div>
                  <div className="shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center"
                       style={{ background: 'linear-gradient(135deg, rgba(21,167,220,0.15), rgba(21,167,220,0.05))', border: '1px solid rgba(21,167,220,0.25)', color: vs.accent }}>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 21h18M5 21V8l7-5 7 5v13"/><path d="M9 9h6M9 13h6M9 17h6"/></svg>
                  </div>
                </div>

                {/* Corporate tiles */}
                <div className="flex flex-col gap-3">
                  {[
                    { badge: 'IFP41 Series', name: 'Balanced Performance & Value', sub: '55" — 98" · 4K · 64-point · 55 W soundbar + sub',
                      specs: [{ l: 'Sizes', v: '55" → 98"' }, { l: 'Touch', v: '64-point' }, { l: 'Audio', v: '55 W' }, { l: 'OS', v: 'Android 16 EDLA' }, { l: 'Memory', v: '8 GB / 128 GB' }, { l: 'Feature', v: 'Write Away™' }],
                      features: ['Designed for discussion-driven sessions — adds subwoofer + 8-mic array.', 'Cost-effective entry point into ViewSonic\'s premium hybrid stack.', 'Native Microsoft Teams / Zoom / Webex compatibility.'] },
                    { badge: 'IFP51 Series', name: 'Flagship Collaboration Display', sub: '55" — 98" · 4K · 50-point · NFC sign-in · 70 W audio',
                      specs: [{ l: 'Sizes', v: '55" → 98"' }, { l: 'CPU / RAM', v: 'Octa-core 16 GB' }, { l: 'Audio', v: '70 W' }, { l: 'Sign-In', v: 'NFC + SSO' }, { l: 'USB-C', v: 'PD 65 W' }, { l: 'HDMI', v: '4× HDMI 2.1' }],
                      features: ['Write Away™ — instant, precise annotation with zero lag.', 'Front USB-C with 65 W charging + Ethernet + DP-in over one cable.', 'Premium audio with subwoofer for executive presentations.'] },
                    { badge: 'IFP62 Series', name: 'Premium Hybrid Conference Display', sub: 'UFT+ tech · bezel-less · optical bonding · USB-C 65 W',
                      specs: [{ l: 'Touch', v: '20-pt PCAP UFT+' }, { l: 'Audio', v: '40 W + 6-mic array' }, { l: 'USB-C', v: 'PD 65 W' }, { l: 'Design', v: 'Bezel-less' }, { l: 'Casting', v: 'vCast 4-screen' }, { l: 'Compat.', v: 'Teams · Zoom · Webex' }],
                      features: ['Edge-to-edge glass + full optical bonding eliminates reflections.', 'Pairs with VB-CAM-201 webcam for one-stop conferencing.', '4 simultaneous wireless casters via vCast — split-screen built in.', 'Crestron Connected V2 certified, XiO Cloud compatible.'] },
                    { badge: 'Enterprise Software', name: 'TeamOne · AirSync · Manager Advanced', sub: 'Built for hybrid & in-office collaboration',
                      specs: [], software: ['TeamOne™ — Infinite digital canvas for any team, anywhere', 'AirSync™ — Wireless screen casting from any device', 'Manager Advanced — Cloud device management at scale', 'vCast — 4-user simultaneous split-screen casting', 'myViewBoard Display — Browser-based mirroring, no apps', 'Crestron / Q-SYS — Native AV control system integration'],
                      features: ['Compatible with Microsoft Teams Rooms, Zoom Rooms, Webex & Intel UNITE.', 'Centralized cross-campus message broadcasting from Manager.', 'Granular admin role control + scheduled software updates.'] },
                  ].map((tile) => (
                    <IFPTile key={tile.badge} tile={tile} accent={vs.accent} line={vs.line} dim={vs.dim} mute={vs.mute} />
                  ))}
                </div>
              </div>
            </Animate>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MONITORS
      ══════════════════════════════════════════ */}
      <section id="monitors" className="px-6 py-24" style={{ background: vs.ink, position: 'relative' }}>
        <div className="max-w-6xl mx-auto">
          <Animate type="fade-up">
            <SectionLabel text="Monitors" />
            <h2 style={{ fontWeight: 700, fontSize: 'clamp(36px, 5vw, 64px)', lineHeight: 0.98, letterSpacing: '-0.03em', marginBottom: 16 }}>
              Pick your <em style={{ fontStyle: 'normal', color: vs.accent }}>pixel.</em>
            </h2>
            <p style={{ fontSize: 17, color: vs.dim, lineHeight: 1.65, maxWidth: 600, marginBottom: 48 }}>
              Five purpose-built series — covering everything from home productivity to pixel-perfect color grading and 360 Hz competitive gaming.
            </p>
          </Animate>

          <div className="flex flex-col gap-3">
            {monitorSeries.map(m => (
              <AccordionTile key={m.id} id={m.id} open={openMonitor === m.id} onToggle={() => setOpenMonitor(openMonitor === m.id ? null : m.id)}
                header={
                  <div className="flex items-center gap-6 p-6 lg:p-8" style={{ borderBottom: openMonitor === m.id ? `1px solid ${vs.line}` : 'none' }}>
                    <span style={{ fontWeight: 800, fontSize: 'clamp(32px, 4vw, 52px)', lineHeight: 1, letterSpacing: '-0.04em', color: openMonitor === m.id ? vs.accent : 'rgba(255,255,255,0.25)', minWidth: 120 }}>{m.series}</span>
                    <div className="flex-1 text-left">
                      <div style={{ fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: vs.mute, marginBottom: 4 }}>{m.cat}</div>
                      <div style={{ fontWeight: 700, fontSize: 'clamp(16px, 2vw, 22px)', letterSpacing: '-0.015em', marginBottom: 4 }}>{m.name}</div>
                      <div style={{ fontSize: 13, color: vs.dim }}>{m.tagline}</div>
                    </div>
                    <div className="hidden sm:flex gap-2">
                      {m.sizes.map(s => <span key={s} style={{ fontFamily: 'monospace', fontSize: 11, padding: '4px 8px', border: `1px solid ${vs.line}`, borderRadius: 5, color: vs.dim }}>{s}</span>)}
                    </div>
                    <div className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                         style={{ border: `1px solid ${openMonitor === m.id ? vs.accent : vs.line}`, background: openMonitor === m.id ? vs.accent : 'none', color: openMonitor === m.id ? '#fff' : vs.text, transform: openMonitor === m.id ? 'rotate(45deg)' : 'none' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M12 5v14M5 12h14"/></svg>
                    </div>
                  </div>
                }>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
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
      <section id="projectors" className="px-6 py-24" style={{ background: vs.bg, borderTop: `1px solid ${vs.line}` }}>
        <div className="max-w-6xl mx-auto">
          <Animate type="fade-up">
            <SectionLabel text="Projectors" />
            <h2 style={{ fontWeight: 700, fontSize: 'clamp(36px, 5vw, 64px)', lineHeight: 0.98, letterSpacing: '-0.03em', marginBottom: 16 }}>
              Projection <em style={{ fontStyle: 'normal', color: vs.accent }}>re-imagined.</em>
            </h2>
            <p style={{ fontSize: 17, color: vs.dim, lineHeight: 1.65, maxWidth: 600, marginBottom: 48 }}>
              Laser, lamp and ultra-short throw projectors delivering 4K brilliance — from portable pico to 20,000-lumen large-venue installations.
            </p>
          </Animate>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {projectors.map(p => (
              <div key={p.id}
                   className="rounded-2xl overflow-hidden cursor-pointer transition-all duration-400"
                   style={{ border: openProjector === p.id ? `1px solid ${vs.accent}` : `1px solid ${vs.line}`, background: 'rgba(20,20,20,0.5)', gridColumn: openProjector === p.id ? '1 / -1' : 'auto' }}
                   onClick={() => setOpenProjector(openProjector === p.id ? null : p.id)}>
                <div className="p-7 flex flex-col gap-4" style={{ minHeight: 260 }}>
                  <div className="flex justify-between items-start">
                    <span style={{ fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: vs.accent, display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ width: 18, height: 1, background: vs.accent, display: 'inline-block' }} />
                      {p.type}
                    </span>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                         style={{ border: `1px solid ${openProjector === p.id ? vs.accent : vs.line}`, background: openProjector === p.id ? vs.accent : 'none', color: openProjector === p.id ? '#fff' : vs.accent, transform: openProjector === p.id ? 'rotate(45deg)' : 'none' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M12 5v14M5 12h14"/></svg>
                    </div>
                  </div>
                  <div style={{ marginTop: 'auto' }}>
                    <div style={{ fontWeight: 700, fontSize: 'clamp(28px, 3vw, 38px)', lineHeight: 1, letterSpacing: '-0.025em', marginBottom: 10 }}>{p.name}</div>
                    <div style={{ fontSize: 14, color: vs.dim, lineHeight: 1.55 }}>{p.desc}</div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {p.models.map(m => <span key={m} style={{ fontFamily: 'monospace', fontSize: 11, padding: '4px 10px', border: `1px solid ${vs.line}`, borderRadius: 6, color: vs.dim }}>{m}</span>)}
                  </div>
                </div>

                {openProjector === p.id && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-7" style={{ borderTop: `1px solid ${vs.line}` }}>
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
      <section id="vconf" className="px-6 py-24" style={{ background: vs.ink, borderTop: `1px solid ${vs.line}` }}>
        <div className="max-w-6xl mx-auto">
          <Animate type="fade-up">
            <SectionLabel text="Video Conferencing" />
            <h2 style={{ fontWeight: 700, fontSize: 'clamp(36px, 5vw, 64px)', lineHeight: 0.98, letterSpacing: '-0.03em', marginBottom: 16 }}>
              Meet without <em style={{ fontStyle: 'normal', color: vs.accent }}>limits.</em>
            </h2>
            <p style={{ fontSize: 17, color: vs.dim, lineHeight: 1.65, maxWidth: 600, marginBottom: 48 }}>
              Certified video bars, PTZ cameras and Microsoft Teams Rooms solutions that make every meeting feel like the same room.
            </p>
          </Animate>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {vcProducts.map(vc => (
              <div key={vc.id}
                   className="rounded-2xl overflow-hidden transition-all duration-300"
                   style={{ border: openVC === vc.id ? `1px solid ${vs.accent}` : `1px solid ${vs.line}`, background: 'rgba(20,20,20,0.4)', gridColumn: openVC === vc.id ? '1 / -1' : 'auto' }}>
                <button onClick={() => setOpenVC(openVC === vc.id ? null : vc.id)}
                        className="w-full text-left p-8 flex flex-col" style={{ cursor: 'pointer', background: 'none', border: 'none', color: 'inherit', fontFamily: 'inherit', minHeight: 220, position: 'relative' }}>
                  <span style={{ fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', padding: '5px 10px', background: 'rgba(21,167,220,0.1)', color: vs.accent, border: '1px solid rgba(21,167,220,0.25)', borderRadius: 5, width: 'max-content', marginBottom: 'auto' }}>
                    {vc.chip}
                  </span>
                  <div className="absolute top-8 right-8 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                       style={{ border: `1px solid ${openVC === vc.id ? vs.accent : vs.line}`, background: openVC === vc.id ? vs.accent : 'none', color: openVC === vc.id ? '#fff' : vs.text, transform: openVC === vc.id ? 'rotate(45deg)' : 'none' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M12 5v14M5 12h14"/></svg>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 'clamp(20px, 2.5vw, 26px)', letterSpacing: '-0.02em', marginTop: 24, marginBottom: 8 }}>{vc.name}</div>
                  <div style={{ fontSize: 13, color: vs.dim, lineHeight: 1.55 }}>{vc.desc}</div>
                </button>

                {openVC === vc.id && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-8" style={{ borderTop: `1px solid ${vs.line}` }}>
                    {vc.models.map(m => (
                      <div key={m.sku} className="rounded-xl overflow-hidden" style={{ border: `1px solid ${vs.line}`, background: 'rgba(0,0,0,0.25)' }}>
                        <PlaceholderImage label={m.sku} />
                        <div className="p-4">
                          <div style={{ fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.2em', color: vs.accent, marginBottom: 6 }}>{m.sku}</div>
                          <div style={{ fontWeight: 600, fontSize: 16, letterSpacing: '-0.015em', marginBottom: 6 }}>{m.title}</div>
                          <div style={{ fontSize: 13, color: vs.dim, lineHeight: 1.55 }}>{m.desc}</div>
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
      <section id="signage" className="px-6 py-24" style={{ background: vs.bg, borderTop: `1px solid ${vs.line}` }}>
        <div className="max-w-6xl mx-auto">
          <Animate type="fade-up">
            <SectionLabel text="Commercial & Signage" />
            <h2 style={{ fontWeight: 700, fontSize: 'clamp(36px, 5vw, 64px)', lineHeight: 0.98, letterSpacing: '-0.03em', marginBottom: 16 }}>
              Built for <em style={{ fontStyle: 'normal', color: vs.accent }}>24 / 7.</em>
            </h2>
            <p style={{ fontSize: 17, color: vs.dim, lineHeight: 1.65, maxWidth: 600, marginBottom: 48 }}>
              From corporate digital signage to ePoster displays for retail and wayfinding — ViewSonic CDE and EP series are engineered for always-on duty cycles.
            </p>
          </Animate>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {signageProducts.map(s => (
              <div key={s.id}
                   className="rounded-2xl overflow-hidden transition-all duration-300"
                   style={{ border: openSignage === s.id ? `1px solid ${vs.accent}` : `1px solid ${vs.line}`, background: 'rgba(20,20,20,0.5)', gridColumn: openSignage === s.id ? '1 / -1' : 'auto' }}>
                <button onClick={() => setOpenSignage(openSignage === s.id ? null : s.id)}
                        className="w-full text-left p-8 flex flex-col" style={{ cursor: 'pointer', background: 'none', border: 'none', color: 'inherit', fontFamily: 'inherit', minHeight: 240 }}>
                  <div className="flex justify-between items-start mb-auto">
                    <span style={{ fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: vs.accent }}>{s.cat}</span>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                         style={{ border: `1px solid ${openSignage === s.id ? vs.accent : vs.line}`, background: openSignage === s.id ? vs.accent : 'none', color: openSignage === s.id ? '#fff' : vs.text, transform: openSignage === s.id ? 'rotate(45deg)' : 'none' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M12 5v14M5 12h14"/></svg>
                    </div>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 'clamp(26px, 3vw, 36px)', lineHeight: 1, letterSpacing: '-0.025em', marginBottom: 10 }}>{s.name}</div>
                  <div style={{ fontSize: 14, color: vs.dim, lineHeight: 1.55, maxWidth: 480 }}>{s.desc}</div>
                </button>

                {openSignage === s.id && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8" style={{ borderTop: `1px solid ${vs.line}` }}>
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
     

      {/* Pulse animation */}
      <style>{`
        @keyframes pulse { 0%,100%{ opacity:1; transform:scale(1); } 50%{ opacity:.5; transform:scale(.8); } }
        @media (max-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr !important; padding: 110px 24px 100px !important; }
          .hero-controls { left: 24px !important; right: 24px !important; bottom: 24px !important; }
        }
      `}</style>
    </main>
  );
}