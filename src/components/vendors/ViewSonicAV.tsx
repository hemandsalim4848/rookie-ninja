'use client';

import { useState, useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────
   THEME
───────────────────────────────────────────── */
const vs = {
  bg:     '#ffffff',
  alt:    '#f8fafc',
  navy:   '#0A1628',
  accent: '#DA0026',
  line:   'rgba(10,22,40,0.08)',
  text:   '#0A1628',
  dim:    '#6b7280',
  mute:   '#9ca3af',
};

/* ─────────────────────────────────────────────
   SMALL HELPERS
   Features are authored as plain strings with
   **bold** markers, parsed at render time.
───────────────────────────────────────────── */
function renderBold(text: string) {
  const parts = text.split('**');
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i} style={{ color: vs.text, fontWeight: 600 }}>{part}</strong> : part
  );
}

type Spec = { label: string; value: string; small?: string };

function SpecGrid({ specs }: { specs: Spec[] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 10, marginBottom: 16 }}>
      {specs.map(s => (
        <div key={s.label} style={{ padding: 12, border: `1px solid ${vs.line}`, borderRadius: 10, background: '#fafafa' }}>
          <div style={{ fontSize: 9.5, letterSpacing: '0.15em', textTransform: 'uppercase', color: vs.mute, marginBottom: 5 }}>{s.label}</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: vs.text, letterSpacing: '-0.01em' }}>
            {s.value}
            {s.small && <span style={{ display: 'block', fontSize: 11, fontWeight: 400, color: vs.dim, marginTop: 2 }}>{s.small}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}

function FeatureList({ items }: { items: string[] }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
      {items.map((f, i) => (
        <li key={i} style={{ display: 'flex', gap: 10, fontSize: 13, color: vs.dim, lineHeight: 1.55 }}>
          <span style={{ width: 4, height: 4, borderRadius: '50%', background: vs.accent, marginTop: 7, flexShrink: 0 }} />
          <span>{renderBold(f)}</span>
        </li>
      ))}
    </ul>
  );
}

function Highlight({ label, value, desc }: { label: string; value: string; desc: string }) {
  return (
    <div style={{ background: 'rgba(218,0,38,0.05)', border: '1px solid rgba(218,0,38,0.18)', borderRadius: 12, padding: 18, marginBottom: 16 }}>
      <div style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: vs.accent, marginBottom: 5 }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 26, letterSpacing: '-0.02em', color: vs.text, lineHeight: 1, marginBottom: 6 }}>{value}</div>
      <div style={{ fontSize: 12.5, color: vs.dim }}>{desc}</div>
    </div>
  );
}

function SubTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: vs.accent, margin: '18px 0 12px' }}>
      <span style={{ width: 16, height: 1, background: vs.accent }} />
      {children}
    </div>
  );
}

function PlaceholderVisual({ label, sub, height = 200 }: { label: string; sub?: string; height?: number }) {
  return (
    <div style={{
      height, borderRadius: 12, border: `1.5px dashed ${vs.line}`, background: vs.alt,
      display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 16,
    }}>
      <div>
        <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 600, fontSize: 13, color: vs.dim, letterSpacing: '-0.01em' }}>{label}</div>
        {sub && <div style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: vs.mute, marginTop: 4 }}>{sub}</div>}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   HERO SLIDES
───────────────────────────────────────────── */
const heroSlides = [
  {
    id: 'ifp',
    badge: '01 — Interactive Displays',
    lines: ['Where ideas', 'come alive on screen.'],
    accentLine: 1,
    desc: 'From kindergarten classrooms to executive boardrooms — ViewSonic\'s EDLA-certified ViewBoard® interactive flat panels bring 4K touch, myViewBoard whiteboarding, and centralized device management to every space.',
    tags: ['Education — IFP34 · IFP35 · IFP52', 'Corporate — IFP41 · IFP51 · IFP62'],
    cta: { label: 'Explore ViewBoards', href: '#ifp', solid: true },
    bg: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1784150367/24ALL-CON1404-3572-T2_Monitors_Images_HeaderMobile3-800x360_pmcffg.webp',
  },
  {
    id: 'monitors',
    badge: '02 — Monitors',
    lines: ['Five families.', 'One vision.'],
    accentLine: 1,
    desc: 'From everyday office screens to color-critical creator panels and 360Hz Mini-LED gaming weapons — there\'s a ViewSonic monitor for every desk.',
    tags: ['VA — Home & Office', 'VX / XG — Gaming', 'VP — ColorPro', 'VG — Business', 'TD — Touch'],
    cta: { label: 'See All Monitors', href: '#monitors', solid: false },
    bg: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1783982076/24ALL-CON1404-3572-T2_Monitors_Images_SubHeader-2_hxojbb.webp',
  },
  {
    id: 'projectors',
    badge: '03 — Laser Projectors',
    lines: ['Light up', 'any room.'],
    accentLine: 1,
    desc: 'From 5,500-lumen 4K installation lasers to RGB-laser cinema flagships and Designed-for-Xbox gaming projectors — premium imagery for every venue.',
    tags: ['LS901-4K — 5,500 ANSI', 'LX700-4K RGB — BT.2020 100%', 'LS741HD — 5,000 lm'],
    cta: { label: 'Discover Projectors', href: '#projectors', solid: false },
    bg: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1783982076/25PRJ-CON1282-RC_SubHeader-1280x524_ntz30s.webp',
  },
  {
    id: 'led',
    badge: '04 — Direct View LED',
    lines: ['Bigger, brighter,', 'borderless.'],
    accentLine: 1,
    desc: 'From a foldable 138" all-in-one to fully customizable LED walls up to 800" — ViewSonic dvLED delivers cinematic scale with broadcast-grade color.',
    tags: ['Foldable — LDS138-151', 'All-in-One — 136" / 163" / 217"', 'Customizable — up to 800"'],
    cta: { label: 'View LED Walls', href: '#led', solid: false },
    bg: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1784150367/24ALL-CON1404-3572-T2_Monitors_Images_HeaderMobile2-800x360_hvyvzt.webp',
  },
];

/* ─────────────────────────────────────────────
   SECTION 1 — IFP / VIEWBOARD
───────────────────────────────────────────── */
const ifpEducation = [
  {
    id: 'ifp34', badge: 'IFP34 Series', name: 'Energy-Efficient Classroom Display',
    meta: '65" · 75" · 86" · 4K UHD · Android EDLA',
    specs: [
      { label: 'Sizes', value: '65" · 75" · 86"' },
      { label: 'Resolution', value: '4K UHD', small: '3840 × 2160' },
      { label: 'Touch', value: '40-point', small: 'palm rejection + dual pen' },
      { label: 'OS', value: 'Android 14', small: 'EDLA-certified' },
      { label: 'USB-C', value: 'Dual', small: 'data + power' },
      { label: 'Certifications', value: 'EPEAT Gold', small: 'ENERGY STAR 8.0' },
    ],
    features: [
      '**Ultra-Fine Touch** — pen-on-paper feel with dual-pen recognition for natural co-writing.',
      '**20% lower power draw** than the previous generation, with a built-in real-time power meter.',
      'Native **Google Classroom, Meet & Workspace** via EDLA certification.',
      'microSD storage expansion + quad-core CPU for smooth multitasking.',
    ],
  },
  {
    id: 'ifp35', badge: 'IFP35 Series', name: 'Next-Gen Android 16 ViewBoard',
    meta: '55"–98" · 4K · 64-point touch · 8-core / 8GB / 128GB',
    specs: [
      { label: 'Sizes', value: '55" → 98"' },
      { label: 'Touch Points', value: '64', small: 'industry-leading' },
      { label: 'Response', value: '6.5 ms', small: '300 nits, 5000:1' },
      { label: 'OS', value: 'Android 16', small: 'EDLA-certified' },
      { label: 'Audio', value: 'Dual 20W' },
      { label: 'Memory', value: '8GB / 128GB' },
    ],
    features: [
      'One of the **first Android 16 interactive panels** in education.',
      'Full Google Play access, automatic security updates, Play Protect.',
      'Octa-core CPU keeps lesson apps, video, and casting running together.',
      'Backward compatible with legacy classroom infrastructure.',
    ],
  },
  {
    id: 'ifp52', badge: 'IFP52 Series', name: 'Premium ViewBoard with Soundbar & Mic Array',
    meta: '65" · 75" · 86" · 4K · 33-point · 45W front-firing audio',
    specs: [
      { label: 'Sizes', value: '65" · 75" · 86"' },
      { label: 'Audio', value: '45W Stereo', small: 'soundbar + subwoofer' },
      { label: 'Microphone', value: 'Beamforming', small: '8ft pickup, noise cancel' },
      { label: 'Touch', value: '33-point', small: 'palm rejection' },
      { label: 'Resolution', value: '4K UHD' },
      { label: 'Software', value: 'myViewBoard', small: 'fully integrated' },
    ],
    features: [
      'Front-facing soundbar + subwoofer fills **every corner of the classroom.**',
      'Beamforming mic captures the teacher clearly for remote/hybrid learners.',
      'Cloud access to legacy lesson files via the myViewBoard ecosystem.',
      'Multi-user simultaneous writing with stylus + finger.',
    ],
  },
];

const ifpEducationSoftware = [
  { title: 'myViewBoard Whiteboard', desc: 'Infinite canvas, quizzes, multimedia & timers' },
  { title: 'ClassSwift', desc: 'Real-time classroom feedback & quizzes' },
  { title: 'AirSync', desc: 'Wireless casting, no dongles or apps' },
  { title: 'ViewSonic Manager', desc: 'Centralized remote device control' },
  { title: 'Insights', desc: 'Usage analytics & classroom data' },
  { title: 'Content Library', desc: 'Curriculum-aligned lesson assets' },
  { title: 'myViewBoard Display', desc: 'Browser-based screen mirroring' },
  { title: 'Magic Box', desc: 'Interactive teaching widgets' },
];

const ifpCorporate = [
  {
    id: 'ifp41', badge: 'IFP41 Series', name: 'Balanced Performance & Value',
    meta: '55"–98" · 4K · 64-point · 55W soundbar + sub',
    specs: [
      { label: 'Sizes', value: '55" → 98"' },
      { label: 'Touch', value: '64-point', small: 'palm rejection' },
      { label: 'Audio', value: '55W', small: 'soundbar + subwoofer' },
      { label: 'OS', value: 'Android 16', small: 'EDLA-certified' },
      { label: 'Memory', value: '8GB / 128GB' },
      { label: 'Highlight', value: 'Write Away™', small: 'instant annotation' },
    ],
    features: [
      'Designed for **discussion-driven sessions** — adds subwoofer + 8-mic array.',
      'Cost-effective entry point into ViewSonic\'s premium hybrid stack.',
      'Native Microsoft Teams / Zoom / Webex compatibility.',
      'myViewBoard 3.0 + AirSync + Manager preinstalled.',
    ],
  },
  {
    id: 'ifp51', badge: 'IFP51 Series', name: 'Flagship Collaboration Display',
    meta: '55"–98" · 4K · 50-point · NFC sign-in · 70W audio',
    specs: [
      { label: 'Sizes', value: '55" → 98"' },
      { label: 'CPU / RAM', value: 'Octa-core', small: '16GB RAM' },
      { label: 'Audio', value: '70W', small: 'front-facing soundbar + sub' },
      { label: 'Sign-In', value: 'NFC + SSO', small: 'instant personalization' },
      { label: 'USB-C', value: 'PD 65W', small: 'front, with DP + Ethernet' },
      { label: 'HDMI', value: '4× HDMI 2.1', small: 'HDCP 2.2 · CEC' },
    ],
    features: [
      '**Write Away™** — instant, precise annotation with zero lag.',
      'Front USB-C with **65W charging + Ethernet + DP-in** over one cable.',
      'Premium audio with subwoofer for executive presentations.',
      'Top-mounted USB-C 15W for easy webcam mounting.',
    ],
  },
  {
    id: 'ifp62', badge: 'IFP62 Series', name: 'Premium Hybrid Conference Display',
    meta: 'UFT+ tech · bezel-less · optical bonding · USB-C 65W',
    specs: [
      { label: 'Touch', value: '20-point PCAP', small: 'UFT+ technology' },
      { label: 'Audio', value: '40W 2.1', small: '6-array mic, 8m pickup' },
      { label: 'USB-C', value: '65W PD', small: 'video + data + power' },
      { label: 'Design', value: 'Bezel-less', small: 'optical bonding' },
      { label: 'Casting', value: 'vCast', small: '4-screen split' },
      { label: 'Compatibility', value: 'Teams · Zoom', small: 'Webex · Intel UNITE' },
    ],
    features: [
      'Edge-to-edge glass + **full optical bonding** eliminates reflections.',
      'Pairs with **VB-CAM-201** webcam + **VB-AUD-201** speakerphone for one-stop conferencing.',
      '4 simultaneous wireless casters via vCast — split-screen built in.',
      'Crestron Connected V2 certified, XiO Cloud compatible.',
    ],
  },
];

const ifpCorporateSoftware = [
  { title: 'TeamOne™', desc: 'Infinite digital canvas for any team, anywhere' },
  { title: 'AirSync™', desc: 'Wireless screen casting from any device' },
  { title: 'Manager Advanced', desc: 'Cloud device management at scale' },
  { title: 'vCast', desc: '4-user simultaneous split-screen casting' },
  { title: 'myViewBoard Display', desc: 'Browser-based mirroring, no apps' },
  { title: 'Crestron / Q-SYS', desc: 'Native AV control system integration' },
];

/* ─────────────────────────────────────────────
   SECTION 2 — MONITORS
───────────────────────────────────────────── */
const monitorSeries = [
  {
    id: 'va', series: 'VA', cat: 'Home & Office', name: 'Everyday Performance Display',
    tagline: 'Comfortable, dependable monitors for productivity and home use — built-in speakers, eye-care tech, and flexible inputs.',
    sizes: ['24"', '27"', '32"'],
    highlight: { label: 'Best for', value: 'Home & Office', desc: 'FHD & QHD options, flicker-free with blue-light filter for long workdays.' },
    specs: [
      { label: 'Sizes', value: '24" · 27" · 32"' },
      { label: 'Refresh', value: '75 / 100Hz' },
      { label: 'Inputs', value: 'HDMI · DP · VGA' },
      { label: 'Speakers', value: 'Built-in', small: 'stereo' },
      { label: 'Eye Care', value: 'Flicker-Free', small: 'blue-light filter' },
      { label: 'Tilt', value: 'Adjustable' },
    ],
    features: [
      '**SuperClear® IPS panels** for accurate color and wide viewing angles.',
      'Integrated speakers — clean desk, no extra audio gear required.',
      'Versatile **HDMI / DisplayPort / VGA** inputs work with legacy and modern setups.',
      'ViewMode presets for movie, gaming, web, and text optimization.',
    ],
  },
  {
    id: 'vx-xg', series: 'VX · XG', cat: 'Gaming & Pro Gaming — OMNI & ELITE', name: 'Tournament-Grade Performance',
    tagline: 'Up to 360Hz refresh, 0.5ms response, Mini-LED HDR, and a full pro-gaming feature stack.',
    sizes: ['24"', '27"', '32"', '34"'],
    highlight: { label: 'Top Refresh Rate', value: '360 Hz', desc: 'With 0.5ms GtG response time on ELITE flagships — for competitive esports.' },
    specs: [
      { label: 'Sizes', value: '24" · 27" · 32" · 34"' },
      { label: 'Refresh', value: 'Up to 360Hz' },
      { label: 'Response', value: '0.5 ms', small: 'GtG' },
      { label: 'Panel', value: 'Mini-LED', small: 'QD-OLED variants' },
      { label: 'Sync', value: 'G-SYNC + FreeSync', small: 'Premium Pro' },
      { label: 'HDR', value: 'VESA DisplayHDR', small: 'up to 1400' },
    ],
    features: [
      '**PureXP™** motion-blur reduction + Black Stabilization for dark scenes.',
      '**Mini-LED backlight** with thousands of dimming zones for true HDR.',
      'Curved 34" ultrawide and flat 27" QHD esports configurations.',
      'Sniper Mode, custom crosshair overlays, and shooter/MOBA color presets.',
      'Detachable headphone hook, RGB lighting, and ergonomic stands across the lineup.',
    ],
  },
  {
    id: 'vg', series: 'VG', cat: 'Business Monitors', name: 'Productivity, Engineered',
    tagline: 'USB-C hub, daisy-chain DP, full ergonomic stand, and frame-thin design for clean enterprise rollouts.',
    sizes: ['24"', '27"', '32"', '34"'],
    highlight: { label: 'USB-C Power Delivery', value: 'up to 100W', desc: 'Charges a laptop, drives video, transmits data, and connects Ethernet — all over one cable.' },
    specs: [
      { label: 'Sizes', value: '24" · 27" · 32" · 34"' },
      { label: 'Resolutions', value: 'FHD · QHD · 4K UHD', small: 'UWQHD on 34"' },
      { label: 'USB-C Hub', value: 'Yes', small: 'data + video + power' },
      { label: 'Ergonomics', value: 'Full', small: 'height · tilt · swivel · pivot' },
      { label: 'Ethernet', value: 'RJ45', small: 'on select models' },
      { label: 'Daisy Chain', value: 'DP-Out' },
    ],
    features: [
      '**Pivot to portrait** for code, documents, and long-form reading.',
      'Frameless design ideal for clean dual- and triple-monitor walls.',
      'Daisy-chain via DisplayPort cuts cabling on dense workstations.',
      'TCO Certified + EPEAT for sustainable enterprise procurement.',
    ],
  },
  {
    id: 'vp', series: 'VP', cat: 'ColorPro™ — Professional', name: 'Color-Critical Creator Displays',
    tagline: 'Pantone & Pantone SkinTone validated, hardware-calibrated, ΔE<2 accuracy out of the box.',
    sizes: ['27"', '32"'],
    highlight: { label: 'Color Accuracy', value: 'ΔE < 2', desc: 'Pantone & Pantone SkinTone validated, with a factory hardware calibration certificate in the box.' },
    specs: [
      { label: 'Color Gamut', value: '100% sRGB', small: '98% DCI-P3, 100% Rec.709' },
      { label: 'Validation', value: 'Pantone', small: '+ Pantone SkinTone' },
      { label: 'USB-C', value: '90W PD', small: 'data + video + power' },
      { label: 'Resolution', value: '4K UHD', small: 'on 27" / 32"' },
      { label: 'HDR', value: 'HDR10', small: 'VESA DisplayHDR' },
      { label: 'Calibration', value: 'Hardware', small: 'via ColorPro™ Wheel + app' },
    ],
    features: [
      '**ColorPro™ Wheel** shortcut controller for Adobe Lightroom & Capture One.',
      'Uniformity correction across the panel for color grading and print proofing.',
      'Pre-loaded gamut presets for photo, video, design, and broadcast workflows.',
      'Built-in hood support, dual headphone jacks, and a clean ColorPro™ stand.',
    ],
  },
  {
    id: 'td', series: 'TD', cat: 'Touch Monitors', name: 'Interactive Desktop & POS Touch',
    tagline: 'PCAP multi-touch with palm rejection — for kiosks, signage, healthcare, retail, and creative workflows.',
    sizes: ['16"', '22"', '24"', '27"', '32"', '43"'],
    highlight: { label: 'Touch Technology', value: '10-pt PCAP', desc: 'Projected capacitive multi-touch with palm rejection and active-pen support.' },
    specs: [
      { label: 'Sizes', value: '16" → 43"' },
      { label: 'Touch Type', value: 'PCAP', small: 'palm rejection' },
      { label: 'USB-C', value: 'Supported', small: 'data + display + power' },
      { label: 'Glass', value: 'Edge-to-Edge', small: 'chemically strengthened' },
      { label: 'Form Factors', value: 'Desktop · Portable · Wall' },
      { label: 'Use Cases', value: 'POS · Kiosk', small: 'creator · signage' },
    ],
    features: [
      'Portable 16" TD models for on-the-go signing and creative work.',
      'Large 32" and 43" units for collaboration, wayfinding, and digital menus.',
      'Optional **VESA mounts** for vertical, horizontal, or wall installation.',
      'Compatible with stylus and finger touch simultaneously.',
    ],
  },
];

/* ─────────────────────────────────────────────
   SECTION 3 — PROJECTORS
───────────────────────────────────────────── */
const projectorCategories = [
  {
    id: 'laser', num: 'Category 01', name: 'Installation Laser',
    desc: 'Pro-grade DLP laser projectors for auditoriums, museums, large meeting rooms, and indoor golf.',
    models: ['LS901-4K', 'LS832WU', 'LS921WU', 'LS920WU'],
    highlight: { label: 'Flagship — LS901-4K', value: '5,500 ANSI', desc: '4K UHD · 3rd-gen laser phosphor · 30,000-hour lifespan · 360° projection.' },
    specs: [
      { label: 'Brightness', value: '5,500 ANSI', small: 'lm @ LS901-4K' },
      { label: 'Resolution', value: '4K UHD' },
      { label: 'Lens Shift', value: 'Vertical', small: '+ H/V keystone' },
      { label: 'Zoom', value: '1.7×', small: 'optical' },
      { label: 'Light Source Life', value: '30,000 hr' },
      { label: 'Control', value: 'Crestron · Q-SYS', small: 'PJ Link · ATEN · Extron' },
    ],
    features: [
      '**Texas Instruments 0.65" DMD** chip for true 4K with high native contrast.',
      'HDR/HLG support and 21:9 mode for Microsoft Teams Rooms front-row layouts.',
      '360° projection + portrait orientation supported.',
      'Dedicated **Golf Mode** tunes greens/blues for indoor simulators.',
    ],
  },
  {
    id: 'cinema', num: 'Category 02', name: 'Home Cinema',
    desc: 'RGB-laser and LED flagship cinema projectors with 100% BT.2020 color, HDR, and gaming-grade input lag.',
    models: ['LX700-4K RGB', 'X100-4K+', 'X2-4K', 'X1-4K Pro'],
    highlight: { label: 'Flagship — LX700-4K RGB', value: '100% BT.2020', desc: '5,200 RGB-laser lumens · TI 0.65" DMD · HDR · 1.6× zoom + lens shift.' },
    specs: [
      { label: 'Light Source', value: 'RGB Laser', small: 'or 4-LED' },
      { label: 'Resolution', value: '4K UHD' },
      { label: 'Color', value: '100% BT.2020', small: 'HDR + HLG' },
      { label: 'Gaming', value: '1440p @ 120Hz', small: 'Designed for Xbox' },
      { label: 'Zoom', value: '1.6×', small: 'optical' },
      { label: 'Audio', value: 'eARC', small: 'Harman/Kardon' },
    ],
    features: [
      '**Sealed engine** — no air filter ever required.',
      'Tool-free lens shift control knobs and 4-corner adjustment.',
      'TÜV SÜD low blue light certified for long viewing sessions.',
      'X100-4K+: 4K LED, Harman/Kardon dual speakers, smart Apps platform.',
    ],
  },
  {
    id: 'business', num: 'Category 03', name: 'Business & Education Laser',
    desc: 'High-lumen laser projectors for classrooms, training rooms, and boardrooms — long-life, low-maintenance.',
    models: ['LS741HD', 'LS740W', 'LS630W', 'LS711HD'],
    highlight: { label: 'Brightness Range', value: '4,200–5,000 lm', desc: 'Crystal-clear projection in lit rooms — auditoriums, classrooms, training labs.' },
    specs: [
      { label: 'Resolutions', value: '1080p · WXGA' },
      { label: 'Optical Zoom', value: 'Up to 1.6×' },
      { label: 'Adjustment', value: 'H/V Keystone', small: '4-corner' },
      { label: 'Throw', value: 'Standard', small: '+ short-throw variants' },
      { label: 'Projection', value: '360°', small: 'any orientation' },
      { label: 'Laser Life', value: 'Up to 30,000 hr' },
    ],
    features: [
      'Set-and-forget reliability with **laser phosphor** — no lamp changes.',
      'LS711HD short-throw 1080p for compact classrooms.',
      'LAN control compatible with major room-control systems.',
    ],
  },
  {
    id: 'portable', num: 'Category 04', name: 'Portable & Smart',
    desc: 'Compact LED projectors with built-in battery, smart streaming, USB-C, and pico form factors for on-the-go presentations.',
    models: ['M1+', 'M2', 'M2e', 'M10'],
    highlight: { label: 'Designed For', value: 'Anywhere', desc: 'Built-in batteries, smart Apps platform, USB-C, and Harman/Kardon audio in palm-sized form factors.' },
    specs: [
      { label: 'Form', value: 'Pico → Compact' },
      { label: 'Light Source', value: 'LED', small: '30,000 hr' },
      { label: 'Battery', value: 'Built-in', small: 'on most models' },
      { label: 'Smart OS', value: 'Apps Platform', small: 'wireless casting' },
      { label: 'Audio', value: 'Harman/Kardon' },
      { label: 'Connectivity', value: 'USB-C · HDMI', small: 'Wi-Fi · Bluetooth' },
    ],
    features: [
      'Auto keystone correction and smart auto-focus on select models.',
      'Doubles as a portable Bluetooth speaker.',
      'Integrated kickstand for instant ceiling projection.',
    ],
  },
];

/* ─────────────────────────────────────────────
   SECTION 4 — DIRECT-VIEW LED
───────────────────────────────────────────── */
const ledTiles = [
  {
    id: 'foldable', num: '01', title: 'Foldable All-in-One — LDS138-151',
    desc: '138" mobile LED display, preassembled in a flight case, ready to roll into any space in 10 minutes.',
    highlight: { label: 'Single SKU Series', value: '138" Mobile', desc: 'Foldable hinge + motorized 65cm height stand + 360° silent wheels + flight case.' },
    specs: [
      { label: 'Size', value: '138"' },
      { label: 'Resolution', value: '1920 × 1080', small: 'FHD' },
      { label: 'Pixel Pitch', value: '1.588 mm' },
      { label: 'LED Package', value: 'SMD 3-in-1', small: 'GOB surface' },
      { label: 'Brightness', value: '600 nits', small: '100-level adjust' },
      { label: 'Contrast', value: '6,500:1' },
      { label: 'Audio', value: 'Dual 30W' },
      { label: 'LED Life', value: '100,000 hr' },
      { label: 'Protection', value: 'IP54 · IK06' },
    ],
    features: [
      '**Glue-on-Board (GOB)** protects LEDs against impacts, dust, and moisture.',
      'Built-in Android 9.0, vCast, Wi-Fi 5 dual-band — no external player needed.',
      'Frameless edge-to-edge design with all cabling concealed in the floor stand.',
      'Picture-by-Picture from up to 4 HDMI sources simultaneously.',
      'Ideal for high-end boardrooms, receptions, lobbies, galleries, and auditoriums.',
    ],
  },
  {
    id: 'preconfigured', num: '02', title: 'All-in-One Preconfigured',
    desc: 'Pre-set 136", 163", and 217" video walls with GOB or COB LED — installed in days, not weeks.',
    highlight: { label: 'Available Sizes', value: '136" · 163" · 217"', desc: 'Preconfigured to standard resolutions and pixel pitches for fast deployment.' },
    specs: [
      { label: 'Pixel Pitch', value: '0.9 → 2.5 mm' },
      { label: 'LED Type', value: 'GOB & COB', small: 'variants available' },
      { label: 'Resolutions', value: 'FHD · 2K · 4K' },
      { label: 'Use Cases', value: 'Boardroom', small: 'auditorium · retail' },
      { label: 'Front Service', value: 'Yes', small: 'on select models' },
      { label: 'Controller', value: 'Built-in', small: '+ external option' },
    ],
    features: [
      '**COB technology** on premium models delivers ultra-fine pitch and superior durability.',
      '**GOB models** add scratch and impact resistance for high-traffic areas.',
      'Choose pitch by viewing distance — 0.9mm for boardrooms, 2.5mm for large auditoriums.',
      'Includes wall mount kit, controller, and cabling for plug-and-play deployment.',
    ],
  },
  {
    id: 'customizable', num: '03', title: 'Customizable All-in-One',
    desc: 'Build any aspect ratio from 100" to 800" with ViewSonic\'s modular LED panels and integrated power + LED controller.',
    highlight: { label: 'Size Range', value: '100" → 800"', desc: 'Configure any aspect ratio with a built-in power and LED controller, or pair with Novastar.' },
    specs: [
      { label: 'Sizes', value: '100" → 800"' },
      { label: 'Controller', value: 'Built-in', small: '+ Novastar compat.' },
      { label: 'Panel Depth', value: '~30 mm', small: 'ultra-low profile' },
      { label: 'Cooling', value: 'Low Heat', small: 'fanless designs' },
      { label: 'Service', value: 'Front + Rear' },
      { label: 'Pixel Pitch', value: '0.9 → 2.5 mm' },
    ],
    features: [
      '**All-in-One power + LED controller** simplifies install — no separate signal processor needed.',
      'Supports **Novastar** and other third-party controllers when projects demand it.',
      '~30mm panel thickness sits flush against the wall for clean architecture.',
      'Lower power consumption and heat output than competitor video walls.',
      'Front-serviceable panels for installations against existing walls.',
    ],
  },
];

/* ─────────────────────────────────────────────
   SECTION 5 — VIDEO CONFERENCING
───────────────────────────────────────────── */
const vcTiles = [
  {
    id: 'mtr', chip: 'Microsoft Teams Rooms', name: 'MTR Solution',
    desc: 'A complete certified-for-Teams room kit — touch console, computing engine, and 4K video bar built to work with any ViewBoard.',
    models: [
      { sku: 'TRS10', title: 'Touch Console', desc: 'Dedicated 10" touch controller running the Microsoft Teams Rooms native experience — table-top or wall.' },
      { sku: 'UMB202', title: '4K Video Bar System', desc: 'All-in-one 4K camera, speaker, and mic array engineered for Microsoft Teams Rooms.' },
      { sku: 'VB-CAM-PTZ-001', title: 'PTZ Conference Camera', desc: 'Pan-tilt-zoom camera for medium-to-large rooms — pairs with the MTR ecosystem.' },
    ],
  },
  {
    id: 'bars', chip: 'All-in-One', name: 'Video Conferencing Bars',
    desc: 'Integrated 4K camera + mic + speaker bars for huddle rooms and BYOD spaces — works with Teams, Zoom, and Webex.',
    models: [
      { sku: 'UMB202', title: '4K All-in-One Video Bar', desc: '4K camera, beamforming mic array, and stereo speakers in one sleek bar — designed to mount above any display.' },
      { sku: 'VB-CAM-201', title: 'All-in-One Video Camera', desc: '121° wide field of view, echo cancellation, and undistorted audio — pairs natively with the IFP62 ecosystem.' },
      { sku: 'TWS101', title: 'Wireless Conference Bar', desc: 'Premium wireless 4K conference bar for medium-to-large meeting spaces.' },
    ],
  },
  {
    id: 'ptz', chip: 'PTZ Camera', name: 'PTZ Conference Camera',
    desc: 'Pan, tilt, and zoom optics for large rooms, lecture halls, and broadcast-grade events.',
    models: [
      { sku: 'VB-CAM-PTZ-001', title: 'Pan-Tilt-Zoom Camera', desc: 'High-zoom optics with auto-tracking for boardrooms, lecture halls, and live productions. Compatible with Microsoft Teams, Zoom, OBS, and most broadcast software.' },
    ],
  },
];

/* ─────────────────────────────────────────────
   SECTION 6 — COMMERCIAL & SIGNAGE
───────────────────────────────────────────── */
const signageTiles = [
  {
    id: 'cde', cat: 'CDE Series — Commercial Displays', name: 'CDE Commercial Displays',
    desc: 'Built for 24/7 signage and meeting-room duty — Crestron Connected, Extron compatible, with built-in Android.',
    highlight: { label: 'Operating Hours', value: '24 / 7', desc: 'Commercial-grade panels for always-on signage, with integrated content management.' },
    specs: [
      { label: 'Sizes', value: '43" → 105"' },
      { label: 'Resolution', value: '4K UHD' },
      { label: 'Duty Cycle', value: '24/7 rated' },
      { label: 'OS', value: 'Android', small: 'built-in' },
      { label: 'Control', value: 'Crestron · Extron', small: 'Q-SYS · PJ Link' },
      { label: 'CMS', value: 'vController', small: '+ vSignage' },
    ],
    features: [
      'Sleek bezel-less designs ideal for corporate lobbies, retail, and broadcast spaces.',
      'Built-in **vSignage / vController** CMS for managing content fleet-wide.',
      'Premium 105" CDE option for boardroom video walls and auditoriums.',
      'Native compatibility with all major room-control ecosystems.',
    ],
  },
  {
    id: 'ep', cat: 'EP Series — ePoster Displays', name: 'ePoster Displays',
    desc: 'Vertical-orientation digital signage and ePoster solutions for retail, hospitality, and wayfinding.',
    highlight: { label: 'Vertical Format', value: 'EP5542 / EP5542T', desc: '55" portrait-optimized displays — touch-enabled (T) and non-touch variants for retail signage and wayfinding.' },
    specs: [
      { label: 'Size', value: '55"', small: 'portrait optimized' },
      { label: 'Variants', value: 'EP5542 · EP5542T', small: 'touch + non-touch' },
      { label: 'Touch', value: 'PCAP', small: 'on T variant' },
      { label: 'Brightness', value: 'High-nit', small: 'for storefronts' },
      { label: 'OS', value: 'Android', small: 'built-in CMS' },
      { label: 'Mounting', value: 'Wall · Floor stand' },
    ],
    features: [
      'Perfect for **menu boards, wayfinding kiosks,** and retail product displays.',
      'Touch-enabled (T) variant for interactive store directories and self-service.',
      'Slim profile with integrated Android player — no external media box needed.',
      'Optional floor stand for mobile signage deployments.',
    ],
  },
];

const VS_NAV_LINKS = [
  { label: 'Interactive Displays', href: '#ifp' },
  { label: 'Monitors',             href: '#monitors' },
  { label: 'Projectors',           href: '#projectors' },
  { label: 'LED',                  href: '#led' },
  { label: 'Video Conferencing',   href: '#vconf' },
  { label: 'Signage',              href: '#signage' },
];

function VsNavInner({ accent }: { accent: string }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      flexWrap: 'nowrap', gap: 20,
      maxWidth: 1200, width: '100%', margin: '0 auto',
      height: 58, padding: '0 20px',
    }}>
      <ul className="vs-navlinks" style={{
        display: 'flex', alignItems: 'center', flex: 1,
        gap: 26, listStyle: 'none', margin: 0, padding: 0,
        overflowX: 'auto', scrollbarWidth: 'none',
      }}>
        {VS_NAV_LINKS.map(link => (
          <li key={link.href} style={{ flexShrink: 0 }}>
            <a href={link.href}
               style={{
                 display: 'inline-block', fontSize: 13.5, fontWeight: 500,
                 color: '#111', textDecoration: 'none', letterSpacing: '0.15px',
                 whiteSpace: 'nowrap', position: 'relative', paddingBottom: 3,
                 transition: 'color 0.2s',
               }}
               onMouseEnter={e => {
                 const el = e.currentTarget as HTMLAnchorElement;
                 el.style.color = accent;
                 (el.querySelector('.vs-underline') as HTMLElement | null)?.style.setProperty('width', '100%');
               }}
               onMouseLeave={e => {
                 const el = e.currentTarget as HTMLAnchorElement;
                 el.style.color = '#111';
                 (el.querySelector('.vs-underline') as HTMLElement | null)?.style.setProperty('width', '0');
               }}>
              {link.label}
              <span className="vs-underline" style={{
                position: 'absolute', bottom: 0, left: 0, width: 0, height: 2,
                background: accent, borderRadius: 2, transition: 'width 0.25s ease',
              }} />
            </a>
          </li>
        ))}
      </ul>
      <a href="#contact"
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
   GENERIC ACCORDION TILE
───────────────────────────────────────────── */
function AccordionTile({
  id, open, onToggle, head, children, openStyle,
}: {
  id: string;
  open: boolean;
  onToggle: (id: string) => void;
  head: React.ReactNode;
  children: React.ReactNode;
  openStyle?: React.CSSProperties;
}) {
  return (
    <div style={{
      border: `1px solid ${open ? vs.accent : vs.line}`,
      borderRadius: 14,
      background: open ? 'rgba(218,0,38,0.02)' : '#fff',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      ...openStyle,
    }}>
      <button onClick={() => onToggle(id)}
              style={{ display: 'block', width: '100%', textAlign: 'left', cursor: 'pointer', background: 'none', border: 'none', padding: 0, fontFamily: 'var(--font-poppins)' }}>
        {head}
      </button>
      <div style={{ maxHeight: open ? 3000 : 0, overflow: 'hidden', transition: 'max-height 0.6s ease' }}>
        {children}
      </div>
    </div>
  );
}

function ToggleDot({ open }: { open: boolean }) {
  return (
    <span style={{
      width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
      border: `1px solid ${open ? vs.accent : vs.line}`,
      background: open ? vs.accent : '#fff',
      color: open ? '#fff' : vs.dim,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      transform: open ? 'rotate(45deg)' : 'none',
      transition: 'all 0.3s ease',
    }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M12 5v14M5 12h14" /></svg>
    </span>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function ViewSonicAVPage() {

  const [heroIdx, setHeroIdx]             = useState(0);
  const [progress, setProgress]           = useState(0);
  const rafRef                            = useRef<number | null>(null);
  const startRef                          = useRef<number | null>(null);
  const heroRef                           = useRef<HTMLElement>(null);
  const DURATION                          = 5500;

  const [isSticky, setIsSticky]           = useState(false);
  const [openTiles, setOpenTiles]         = useState<Record<string, boolean>>({});
  const [formState, setFormState]         = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const toggleTile = (id: string) => setOpenTiles(prev => ({ ...prev, [id]: !prev[id] }));

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
    if (isSticky) {
      document.body.classList.add('vs-subnav-active');
    } else {
      document.body.classList.remove('vs-subnav-active');
    }
    return () => document.body.classList.remove('vs-subnav-active');
  }, [isSticky]);

  /* ── Scroll reveal ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vs-visible'); observer.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.vs-reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

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

  return (
    <main style={{ background: vs.bg, color: vs.text, fontFamily: 'var(--font-poppins)', overflowX: 'hidden' }}>

      {/* ══════════════════════════════════════════
          HERO SLIDER
      ══════════════════════════════════════════ */}
      <section ref={heroRef} className="vs-hero" style={{ position: 'relative', width: '100%', overflow: 'hidden', background: vs.navy }}>

        {heroSlides.map((s, i) => (
          <div key={s.id} className="vs-slide"
               style={{
                 position: 'absolute', inset: 0, display: 'flex', alignItems: 'center',
                 opacity: i === heroIdx ? 1 : 0,
                 transition: 'opacity 0.9s cubic-bezier(0.77,0,0.175,1)',
                 zIndex: i === heroIdx ? 2 : 1,
               }}>
            {s.bg ? (
              <>
                <div style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: `url('${s.bg}')`,
                  backgroundSize: 'cover', backgroundPosition: 'center',
                  transform: i === heroIdx ? 'scale(1)' : 'scale(1.06)',
                  transition: 'transform 6s ease',
                  filter: 'brightness(0.42)',
                }} />
                <div className="vs-vignette" style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(90deg, rgba(10,22,40,0.9) 38%, rgba(10,22,40,0.5) 75%, rgba(218,0,38,0.15) 100%)',
                }} />
              </>
            ) : (
              <div style={{
                position: 'absolute', inset: 0,
                background: `radial-gradient(ellipse 65% 65% at ${i % 2 === 0 ? '20% 30%' : '80% 70%'}, rgba(218,0,38,0.18) 0%, transparent 65%), linear-gradient(150deg, #0A1628 0%, #0F2040 60%, #0A1628 100%)`,
              }} />
            )}
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)',
              backgroundSize: '36px 36px',
            }} />
            <div className="vs-hero-container"
                 style={{ position: 'relative', zIndex: 3, width: '100%', maxWidth: 1220, margin: '0 auto', padding: '0 20px' }}>
              <div className="vs-hero-content"
                   style={{
                     maxWidth: 600,
                     opacity: i === heroIdx ? 1 : 0,
                     transform: i === heroIdx ? 'translateY(0)' : 'translateY(24px)',
                     transition: 'opacity 0.7s ease 0.4s, transform 0.7s ease 0.4s',
                   }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8, background: vs.accent, color: '#fff',
                  fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase',
                  padding: '5px 12px', marginBottom: 18, borderRadius: 2,
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff', opacity: 0.9, display: 'inline-block', animation: 'vsPulse 2s infinite' }} />
                  {s.badge}
                </span>
                <h1 className="vs-hero-heading"
                    style={{ fontSize: 'clamp(38px, 5.5vw, 72px)', color: '#fff', lineHeight: 0.98, marginBottom: 18, fontWeight: 700, letterSpacing: 1 }}>
                  {s.lines.map((line, li) => (
                    <span key={li} style={{ display: 'block', color: li === s.accentLine ? vs.accent : '#fff' }}>{line}</span>
                  ))}
                </h1>
                <p className="vs-hero-desc"
                   style={{ fontSize: 15, color: 'rgba(255,255,255,0.72)', lineHeight: 1.65, marginBottom: 24, fontWeight: 300, maxWidth: 460 }}>
                  {s.desc}
                </p>
                <div className="vs-hero-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
                  {s.tags.map(tag => (
                    <span key={tag} style={{
                      fontSize: 11.5, fontWeight: 500, padding: '6px 12px', borderRadius: 999,
                      border: '1px solid rgba(255,255,255,0.18)', background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.75)',
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <a href={s.cta.href} className="vs-hero-btn"
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
                     el.style.background = vs.accent; el.style.borderColor = vs.accent; el.style.color = '#fff';
                   }}
                   onMouseLeave={e => {
                     const el = e.currentTarget as HTMLAnchorElement;
                     el.style.background = s.cta.solid ? '#fff' : 'transparent';
                     el.style.borderColor = '#fff';
                     el.style.color = s.cta.solid ? '#0d0d0d' : '#fff';
                   }}>
                  {s.cta.label}
                </a>
              </div>
            </div>
          </div>
        ))}

        {/* Dots */}
        <div className="vs-dots"
             style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(calc(-570px + 20px))', display: 'flex', gap: 10, zIndex: 10 }}>
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => goSlide(i)}
                    style={{
                      width: 10, height: 10, borderRadius: '50%', padding: 0, border: 'none', cursor: 'pointer',
                      background: i === heroIdx ? vs.accent : 'rgba(255,255,255,0.35)',
                      transform: i === heroIdx ? 'scale(1.3)' : 'scale(1)',
                      transition: 'background 0.3s, transform 0.3s',
                    }} />
          ))}
        </div>

        {/* Progress bar */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, height: 3,
          background: vs.accent, width: `${progress}%`,
          zIndex: 10, transition: 'width 0.1s linear',
        }} />

      </section>

      {/* ══════════════════════════════════════════
          STICKY NAV
      ══════════════════════════════════════════ */}
      <div style={{
        width: '100%', background: '#fff',
        borderBottom: `1px solid rgba(0,0,0,0.09)`,
        visibility: isSticky ? 'hidden' : 'visible',
      }}>
        <VsNavInner accent={vs.accent} />
      </div>

      <div className="vs-nav-wrap" style={{
        width: '100%', background: '#fff',
        borderBottom: `1px solid rgba(0,0,0,0.09)`,
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1001,
        boxShadow: '0 2px 20px rgba(0,0,0,0.12)',
        transform: isSticky ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
      }}>
        <VsNavInner accent={vs.accent} />
      </div>

      {/* ══════════════════════════════════════════
          SECTION 1 — IFP / VIEWBOARD
      ══════════════════════════════════════════ */}
      <section id="ifp" style={{ width: '100%', background: '#fff', padding: '72px 20px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="vs-reveal" style={{ maxWidth: 780, marginBottom: 48 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: vs.accent, marginBottom: 14 }}>ViewBoard® Interactive Flat Panels</p>
            <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 42px)', fontWeight: 700, color: vs.text, marginBottom: 14, letterSpacing: '-0.02em' }}>
              Built for two worlds. <span style={{ color: vs.accent }}>One ecosystem.</span>
            </h2>
            <p style={{ fontSize: 15, color: vs.dim, lineHeight: 1.7 }}>
              Every ViewBoard ships with myViewBoard®, AirSync™, and ViewSonic Manager™ at no extra cost — whether it&apos;s powering a kindergarten class or a global boardroom.
            </p>
          </div>

          <div className="vs-ifp-split vs-reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>

            {/* EDUCATION SIDE */}
            <div className="vs-ifp-card" style={{ border: `1px solid ${vs.line}`, borderRadius: 20, padding: 32, background: vs.alt }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 20, marginBottom: 24 }}>
                <div>
                  <div style={{ fontSize: 10, letterSpacing: '0.16em', color: vs.mute, marginBottom: 8 }}>SIDE A · K-12 &amp; HIGHER EDUCATION</div>
                  <h3 style={{ fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 700, color: vs.text, marginBottom: 12, letterSpacing: '-0.02em' }}>For the Classroom</h3>
                  <p style={{ fontSize: 13.5, color: vs.dim, lineHeight: 1.6, maxWidth: 420 }}>
                    EDLA-certified Android, native Google Workspace, myViewBoard whiteboarding, and Manager remote control — built for teachers, loved by IT.
                  </p>
                </div>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(218,0,38,0.1)', border: '1px solid rgba(218,0,38,0.22)', color: vs.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {ifpEducation.map(p => (
                  <AccordionTile key={p.id} id={`ifp-edu-${p.id}`} open={!!openTiles[`ifp-edu-${p.id}`]} onToggle={toggleTile}
                    head={(
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 14, padding: '16px 18px' }}>
                        <div>
                          <span style={{ display: 'inline-block', fontSize: 9.5, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '4px 8px', background: 'rgba(218,0,38,0.08)', color: vs.accent, borderRadius: 5, border: '1px solid rgba(218,0,38,0.2)', marginBottom: 8 }}>{p.badge}</span>
                          <div style={{ fontSize: 15.5, fontWeight: 600, color: vs.text, letterSpacing: '-0.01em' }}>{p.name}</div>
                          <div style={{ fontSize: 11.5, color: vs.mute, marginTop: 3 }}>{p.meta}</div>
                        </div>
                        <ToggleDot open={!!openTiles[`ifp-edu-${p.id}`]} />
                      </div>
                    )}>
                    <div style={{ padding: '2px 18px 20px' }}>
                      <PlaceholderVisual label={p.badge} height={140} />
                      <div style={{ marginTop: 16 }}>
                        <SpecGrid specs={p.specs} />
                        <FeatureList items={p.features} />
                      </div>
                    </div>
                  </AccordionTile>
                ))}

                {/* Education software tile */}
                <AccordionTile id="ifp-edu-software" open={!!openTiles['ifp-edu-software']} onToggle={toggleTile}
                  head={(
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 14, padding: '16px 18px' }}>
                      <div>
                        <span style={{ display: 'inline-block', fontSize: 9.5, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '4px 8px', background: 'rgba(218,0,38,0.08)', color: vs.accent, borderRadius: 5, border: '1px solid rgba(218,0,38,0.2)', marginBottom: 8 }}>Education Software</span>
                        <div style={{ fontSize: 15.5, fontWeight: 600, color: vs.text, letterSpacing: '-0.01em' }}>myViewBoard® · Insights · Content Library</div>
                        <div style={{ fontSize: 11.5, color: vs.mute, marginTop: 3 }}>included with every ViewBoard — no subscription</div>
                      </div>
                      <ToggleDot open={!!openTiles['ifp-edu-software']} />
                    </div>
                  )}>
                  <div style={{ padding: '2px 18px 20px' }}>
                    <SubTitle>The Education Stack</SubTitle>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 10 }}>
                      {ifpEducationSoftware.map(sw => (
                        <div key={sw.title} style={{ padding: '12px 14px', border: `1px solid ${vs.line}`, borderRadius: 10, background: '#fff' }}>
                          <div style={{ fontWeight: 600, fontSize: 13, color: vs.text, marginBottom: 3 }}>{sw.title}</div>
                          <div style={{ fontSize: 11, color: vs.mute, lineHeight: 1.4 }}>{sw.desc}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ marginTop: 16 }}>
                      <FeatureList items={[
                        'Integrates natively with **Google Classroom, Meet & Workspace.**',
                        'SSO + NFC sign-in for instant teacher personalization.',
                        'All software included — **zero recurring licensing** for core tools.',
                      ]} />
                    </div>
                  </div>
                </AccordionTile>
              </div>
            </div>

            {/* CORPORATE SIDE */}
            <div className="vs-ifp-card" style={{ border: `1px solid ${vs.line}`, borderRadius: 20, padding: 32, background: vs.alt }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 20, marginBottom: 24 }}>
                <div>
                  <div style={{ fontSize: 10, letterSpacing: '0.16em', color: vs.mute, marginBottom: 8 }}>SIDE B · CORPORATE &amp; ENTERPRISE</div>
                  <h3 style={{ fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 700, color: vs.text, marginBottom: 12, letterSpacing: '-0.02em' }}>For the Boardroom</h3>
                  <p style={{ fontSize: 13.5, color: vs.dim, lineHeight: 1.6, maxWidth: 420 }}>
                    Engineered for hybrid work — Microsoft Teams Rooms ready, Zoom, Cisco Webex &amp; Intel UNITE compatible, with TeamOne whiteboarding for teams everywhere.
                  </p>
                </div>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(218,0,38,0.1)', border: '1px solid rgba(218,0,38,0.22)', color: vs.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 21h18M5 21V8l7-5 7 5v13" /><path d="M9 9h6M9 13h6M9 17h6" /></svg>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {ifpCorporate.map(p => (
                  <AccordionTile key={p.id} id={`ifp-corp-${p.id}`} open={!!openTiles[`ifp-corp-${p.id}`]} onToggle={toggleTile}
                    head={(
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 14, padding: '16px 18px' }}>
                        <div>
                          <span style={{ display: 'inline-block', fontSize: 9.5, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '4px 8px', background: 'rgba(218,0,38,0.08)', color: vs.accent, borderRadius: 5, border: '1px solid rgba(218,0,38,0.2)', marginBottom: 8 }}>{p.badge}</span>
                          <div style={{ fontSize: 15.5, fontWeight: 600, color: vs.text, letterSpacing: '-0.01em' }}>{p.name}</div>
                          <div style={{ fontSize: 11.5, color: vs.mute, marginTop: 3 }}>{p.meta}</div>
                        </div>
                        <ToggleDot open={!!openTiles[`ifp-corp-${p.id}`]} />
                      </div>
                    )}>
                    <div style={{ padding: '2px 18px 20px' }}>
                      <PlaceholderVisual label={p.badge} height={140} />
                      <div style={{ marginTop: 16 }}>
                        <SpecGrid specs={p.specs} />
                        <FeatureList items={p.features} />
                      </div>
                    </div>
                  </AccordionTile>
                ))}

                {/* Enterprise software tile */}
                <AccordionTile id="ifp-corp-software" open={!!openTiles['ifp-corp-software']} onToggle={toggleTile}
                  head={(
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 14, padding: '16px 18px' }}>
                      <div>
                        <span style={{ display: 'inline-block', fontSize: 9.5, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '4px 8px', background: 'rgba(218,0,38,0.08)', color: vs.accent, borderRadius: 5, border: '1px solid rgba(218,0,38,0.2)', marginBottom: 8 }}>Enterprise Software</span>
                        <div style={{ fontSize: 15.5, fontWeight: 600, color: vs.text, letterSpacing: '-0.01em' }}>TeamOne · AirSync · Manager Advanced</div>
                        <div style={{ fontSize: 11.5, color: vs.mute, marginTop: 3 }}>built for hybrid &amp; in-office collaboration</div>
                      </div>
                      <ToggleDot open={!!openTiles['ifp-corp-software']} />
                    </div>
                  )}>
                  <div style={{ padding: '2px 18px 20px' }}>
                    <SubTitle>The Enterprise Stack</SubTitle>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 10 }}>
                      {ifpCorporateSoftware.map(sw => (
                        <div key={sw.title} style={{ padding: '12px 14px', border: `1px solid ${vs.line}`, borderRadius: 10, background: '#fff' }}>
                          <div style={{ fontWeight: 600, fontSize: 13, color: vs.text, marginBottom: 3 }}>{sw.title}</div>
                          <div style={{ fontSize: 11, color: vs.mute, lineHeight: 1.4 }}>{sw.desc}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ marginTop: 16 }}>
                      <FeatureList items={[
                        'Compatible with **Microsoft Teams Rooms, Zoom Rooms, Webex & Intel UNITE**.',
                        'Centralized cross-campus message broadcasting from Manager.',
                        'Granular admin role control + scheduled software updates.',
                      ]} />
                    </div>
                  </div>
                </AccordionTile>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 2 — MONITORS
      ══════════════════════════════════════════ */}
      <section id="monitors" style={{ width: '100%', background: vs.alt, padding: '72px 20px', borderTop: `1px solid ${vs.line}` }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div className="vs-reveal" style={{ maxWidth: 780, marginBottom: 48 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: vs.accent, marginBottom: 14 }}>Monitors</p>
            <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 42px)', fontWeight: 700, color: vs.text, marginBottom: 14, letterSpacing: '-0.02em' }}>
              Pick your <span style={{ color: vs.accent }}>pixel.</span>
            </h2>
            <p style={{ fontSize: 15, color: vs.dim, lineHeight: 1.7 }}>
              Five purpose-built series — covering everything from home productivity to pixel-perfect color grading and 360Hz competitive gaming.
            </p>
          </div>

          <div className="vs-reveal" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {monitorSeries.map(m => (
              <AccordionTile key={m.id} id={`mon-${m.id}`} open={!!openTiles[`mon-${m.id}`]} onToggle={toggleTile}
                openStyle={{ background: '#fff' }}
                head={(
                  <div className="vs-mtile-head" style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto auto', alignItems: 'center', gap: 24, padding: '22px 26px' }}>
                    <span className="vs-mtile-series" style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 40, letterSpacing: '-0.03em', color: vs.accent, minWidth: 110 }}>{m.series}</span>
                    <div className="vs-mtile-text">
                      <div style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: vs.mute, marginBottom: 4 }}>{m.cat}</div>
                      <div style={{ fontSize: 19, fontWeight: 700, color: vs.text, letterSpacing: '-0.015em', marginBottom: 4 }}>{m.name}</div>
                      <div className="vs-mtile-tagline" style={{ fontSize: 12.5, color: vs.dim, maxWidth: 380 }}>{m.tagline}</div>
                    </div>
                    <div className="vs-mtile-sizes" style={{ display: 'flex', gap: 5, flexWrap: 'wrap', maxWidth: 160 }}>
                      {m.sizes.map(sz => (
                        <span key={sz} style={{ fontSize: 10.5, padding: '4px 8px', border: `1px solid ${vs.line}`, borderRadius: 5, color: vs.dim }}>{sz}</span>
                      ))}
                    </div>
                    <div className="vs-mtile-dot"><ToggleDot open={!!openTiles[`mon-${m.id}`]} /></div>
                  </div>
                )}>
                <div className="vs-mtile-inner" style={{ padding: '4px 26px 30px', display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 30 }}>
                  <PlaceholderVisual label={`${m.series} Series Monitor`} height={280} />
                  <div>
                    <Highlight {...m.highlight} />
                    <SpecGrid specs={m.specs} />
                    <SubTitle>Why It Works</SubTitle>
                    <FeatureList items={m.features} />
                  </div>
                </div>
              </AccordionTile>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 3 — PROJECTORS
      ══════════════════════════════════════════ */}
      <section id="projectors" style={{ width: '100%', background: '#fff', padding: '72px 20px', borderTop: `1px solid ${vs.line}` }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="vs-reveal" style={{ maxWidth: 780, marginBottom: 48 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: vs.accent, marginBottom: 14 }}>Projectors</p>
            <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 42px)', fontWeight: 700, color: vs.text, marginBottom: 14, letterSpacing: '-0.02em' }}>
              Beams of <span style={{ color: vs.accent }}>brilliance.</span>
            </h2>
            <p style={{ fontSize: 15, color: vs.dim, lineHeight: 1.7 }}>
              A complete lineup — from 5,500 ANSI lumen 4K installation lasers and RGB-laser home cinema flagships to short-throw lasers and gaming-tuned projectors with HDR.
            </p>
          </div>

          <div className="vs-proj-grid vs-reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {projectorCategories.map(p => {
              const isOpen = !!openTiles[`proj-${p.id}`];
              return (
                <AccordionTile key={p.id} id={`proj-${p.id}`} open={isOpen} onToggle={toggleTile}
                  openStyle={{ gridColumn: isOpen ? '1 / -1' : undefined }}
                  head={(
                    <div style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 14, minHeight: 220 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <span style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: vs.accent, display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ width: 16, height: 1, background: vs.accent }} />
                          {p.num}
                        </span>
                        <ToggleDot open={isOpen} />
                      </div>
                      <div style={{ marginTop: 'auto' }}>
                        <div style={{ fontSize: 26, fontWeight: 700, color: vs.text, letterSpacing: '-0.02em', marginBottom: 8 }}>{p.name}</div>
                        <div style={{ fontSize: 13, color: vs.dim, lineHeight: 1.55, maxWidth: 380, marginBottom: 10 }}>{p.desc}</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                          {p.models.map(mo => (
                            <span key={mo} style={{ fontSize: 10.5, padding: '4px 8px', background: 'rgba(218,0,38,0.08)', border: '1px solid rgba(218,0,38,0.2)', color: vs.accent, borderRadius: 4, letterSpacing: '0.03em' }}>{mo}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}>
                  <div className="vs-proj-inner" style={{ padding: '0 28px 28px', display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 24 }}>
                    <PlaceholderVisual label={p.name} height={220} />
                    <div>
                      <Highlight {...p.highlight} />
                      <SpecGrid specs={p.specs} />
                      <FeatureList items={p.features} />
                    </div>
                  </div>
                </AccordionTile>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 4 — DIRECT-VIEW LED
      ══════════════════════════════════════════ */}
      <section id="led" style={{ width: '100%', background: vs.alt, padding: '72px 20px', borderTop: `1px solid ${vs.line}` }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div className="vs-reveal" style={{ maxWidth: 780, marginBottom: 48 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: vs.accent, marginBottom: 14 }}>Direct-View LED</p>
            <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 42px)', fontWeight: 700, color: vs.text, marginBottom: 14, letterSpacing: '-0.02em' }}>
              Bigger. Brighter. <span style={{ color: vs.accent }}>Borderless.</span>
            </h2>
            <p style={{ fontSize: 15, color: vs.dim, lineHeight: 1.7 }}>
              From a wheeled, foldable 138&quot; all-in-one to custom video walls up to 800&quot; — ViewSonic&apos;s dvLED ecosystem covers every venue, every pixel pitch, every budget.
            </p>
          </div>

          <div className="vs-reveal" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {ledTiles.map(l => (
              <AccordionTile key={l.id} id={`led-${l.id}`} open={!!openTiles[`led-${l.id}`]} onToggle={toggleTile}
                openStyle={{ background: '#fff' }}
                head={(
                  <div className="vs-ltile-head" style={{ display: 'grid', gridTemplateColumns: '64px 1fr auto', alignItems: 'center', gap: 22, padding: '22px 26px' }}>
                    <span style={{
                      fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: 40, letterSpacing: '-0.03em',
                      background: `linear-gradient(180deg, ${vs.accent}, #9c0018)`, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', opacity: 0.85,
                    }}>{l.num}</span>
                    <div>
                      <h3 style={{ fontSize: 18, fontWeight: 700, color: vs.text, letterSpacing: '-0.015em', marginBottom: 4 }}>{l.title}</h3>
                      <p style={{ fontSize: 12.5, color: vs.dim, lineHeight: 1.5 }}>{l.desc}</p>
                    </div>
                    <ToggleDot open={!!openTiles[`led-${l.id}`]} />
                  </div>
                )}>
                <div className="vs-ltile-inner" style={{ padding: '4px 26px 30px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 26 }}>
                  <PlaceholderVisual label={l.title} height={220} />
                  <div>
                    <Highlight {...l.highlight} />
                    <SpecGrid specs={l.specs} />
                    <FeatureList items={l.features} />
                  </div>
                </div>
              </AccordionTile>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 5 — VIDEO CONFERENCING
      ══════════════════════════════════════════ */}
      <section id="vconf" style={{ width: '100%', background: '#fff', padding: '72px 20px', borderTop: `1px solid ${vs.line}` }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="vs-reveal" style={{ maxWidth: 780, marginBottom: 48 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: vs.accent, marginBottom: 14 }}>Video Conferencing</p>
            <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 42px)', fontWeight: 700, color: vs.text, marginBottom: 14, letterSpacing: '-0.02em' }}>
              Hybrid meetings, <span style={{ color: vs.accent }}>perfected.</span>
            </h2>
            <p style={{ fontSize: 15, color: vs.dim, lineHeight: 1.7 }}>
              A complete portfolio for any meeting room — Microsoft Teams Rooms certified hardware, all-in-one video bars, and PTZ cameras for boardrooms.
            </p>
          </div>

          <div className="vs-vconf-grid vs-reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {vcTiles.map(v => {
              const isOpen = !!openTiles[`vc-${v.id}`];
              return (
                <AccordionTile key={v.id} id={`vc-${v.id}`} open={isOpen} onToggle={toggleTile}
                  openStyle={{ gridColumn: isOpen ? '1 / -1' : undefined }}
                  head={(
                    <div style={{ padding: 26, minHeight: 200, display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <span style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', padding: '4px 9px', background: 'rgba(218,0,38,0.08)', color: vs.accent, border: '1px solid rgba(218,0,38,0.2)', borderRadius: 5 }}>{v.chip}</span>
                        <ToggleDot open={isOpen} />
                      </div>
                      <div style={{ marginTop: 20 }}>
                        <div style={{ fontSize: 20, fontWeight: 700, color: vs.text, letterSpacing: '-0.015em', marginBottom: 8 }}>{v.name}</div>
                        <div style={{ fontSize: 12.5, color: vs.dim, lineHeight: 1.55 }}>{v.desc}</div>
                      </div>
                    </div>
                  )}>
                  <div className="vs-vc-inner" style={{ padding: '4px 26px 28px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 18 }}>
                    {v.models.map(model => (
                      <div key={model.sku + model.title} style={{ border: `1px solid ${vs.line}`, borderRadius: 12, overflow: 'hidden', background: vs.alt }}>
                        <PlaceholderVisual label={model.sku} height={130} />
                        <div style={{ padding: 16 }}>
                          <div style={{ fontSize: 10, letterSpacing: '0.14em', color: vs.accent, marginBottom: 6 }}>{model.sku}</div>
                          <div style={{ fontSize: 14.5, fontWeight: 600, color: vs.text, marginBottom: 6, letterSpacing: '-0.01em' }}>{model.title}</div>
                          <div style={{ fontSize: 12, color: vs.dim, lineHeight: 1.5 }}>{model.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionTile>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 6 — COMMERCIAL & SIGNAGE
      ══════════════════════════════════════════ */}
      <section id="signage" style={{ width: '100%', background: vs.alt, padding: '72px 20px 80px', borderTop: `1px solid ${vs.line}` }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="vs-reveal" style={{ maxWidth: 780, marginBottom: 48 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: vs.accent, marginBottom: 14 }}>Commercial &amp; Signage</p>
            <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 42px)', fontWeight: 700, color: vs.text, marginBottom: 14, letterSpacing: '-0.02em' }}>
              Built for <span style={{ color: vs.accent }}>24/7.</span>
            </h2>
            <p style={{ fontSize: 15, color: vs.dim, lineHeight: 1.7 }}>
              From corporate digital signage to ePoster displays for retail and wayfinding — ViewSonic CDE and EP series are engineered for always-on duty cycles.
            </p>
          </div>

          <div className="vs-signage-grid vs-reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {signageTiles.map(s => {
              const isOpen = !!openTiles[`sig-${s.id}`];
              return (
                <AccordionTile key={s.id} id={`sig-${s.id}`} open={isOpen} onToggle={toggleTile}
                  openStyle={{ gridColumn: isOpen ? '1 / -1' : undefined, background: '#fff' }}
                  head={(
                    <div style={{ padding: 28, minHeight: 200, display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <span style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: vs.accent }}>{s.cat}</span>
                        <ToggleDot open={isOpen} />
                      </div>
                      <div style={{ marginTop: 'auto' }}>
                        <div style={{ fontSize: 24, fontWeight: 700, color: vs.text, letterSpacing: '-0.02em', marginBottom: 8 }}>{s.name}</div>
                        <div style={{ fontSize: 13, color: vs.dim, lineHeight: 1.55, maxWidth: 420 }}>{s.desc}</div>
                      </div>
                    </div>
                  )}>
                  <div className="vs-sig-inner" style={{ padding: '0 28px 28px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                    <PlaceholderVisual label={s.name} height={220} />
                    <div>
                      <Highlight {...s.highlight} />
                      <SpecGrid specs={s.specs} />
                      <FeatureList items={s.features} />
                    </div>
                  </div>
                </AccordionTile>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          INQUIRY FORM
      ══════════════════════════════════════════ */}
      <section id="contact" style={{ width: '100%', background: 'linear-gradient(90deg, #0b1a2e, #0d223d)', padding: '72px 20px', color: '#fff' }}>
        <div className="vs-comm-inner" style={{ maxWidth: 1140, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 420px', gap: 60, alignItems: 'center' }}>
          <div className="vs-reveal">
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 700, marginBottom: 20, color: '#fff', lineHeight: 1.2 }}>
              Ready to bring ViewSonic in?
            </h2>
            <p style={{ fontSize: 15, color: '#cbd5e1', lineHeight: 1.7 }}>
              Whether it&apos;s a single classroom ViewBoard or a full boardroom video wall — Rookie Ninja is your authorized ViewSonic distribution partner across MEA. Tell us what you&apos;re looking for and our team will follow up with pricing and availability.
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
                  {['Interactive Displays', 'Monitors', 'Projectors', 'Direct-View LED', 'Video Conferencing', 'Commercial & Signage'].map(o => (
                    <option key={o} style={{ background: '#fff', color: '#000' }}>{o}</option>
                  ))}
                </select>
                {formState === 'error' && <p style={{ fontSize: 12, color: '#fca5a5' }}>Something went wrong. Please try again.</p>}
                <button type="submit" disabled={formState === 'sending'}
                        style={{
                          marginTop: 10, padding: 13, background: vs.accent, color: '#fff',
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

      {/* ══════════════════════════════════════════
          RESPONSIVE STYLES
      ══════════════════════════════════════════ */}
      <style>{`
        @keyframes vsPulse { 0%,100%{ opacity:1; transform:scale(1); } 50%{ opacity:.5; transform:scale(.8); } }
        body.vs-subnav-active .ka-navbar-hide { transform: translateY(-120%) !important; pointer-events: none !important; }
        .vs-reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.65s cubic-bezier(0.22,1,0.36,1), transform 0.65s cubic-bezier(0.22,1,0.36,1); }
        .vs-reveal.vs-visible { opacity: 1; transform: translateY(0); }

        .vs-hero { height: 680px; }
        .vs-navlinks::-webkit-scrollbar { display: none; }

        @media (max-width: 1024px) {
          .vs-comm-inner    { grid-template-columns: 1fr !important; gap: 40px !important; }
          .vs-ifp-split     { grid-template-columns: 1fr !important; }
          .vs-proj-grid     { grid-template-columns: 1fr !important; }
          .vs-vconf-grid    { grid-template-columns: 1fr !important; }
          .vs-signage-grid  { grid-template-columns: 1fr !important; }
          .vs-mtile-inner, .vs-proj-inner, .vs-ltile-inner, .vs-sig-inner { grid-template-columns: 1fr !important; }
          .vs-mtile-head    { grid-template-columns: auto 1fr auto !important; }
          .vs-mtile-sizes   { display: none !important; }
        }

        @media (max-width: 768px) {
          .vs-hero { height: 460px !important; }
          .vs-slide { align-items: flex-end !important; padding-bottom: 60px !important; }
          .vs-vignette { background: linear-gradient(180deg, transparent 10%, rgba(10,22,40,0.85) 70%) !important; }
          .vs-hero-container { padding: 0 24px !important; }
          .vs-hero-content { max-width: 100% !important; }
          .vs-dots { left: 24px !important; transform: none !important; bottom: 22px !important; }
          .vs-mtile-head {
            grid-template-columns: 1fr auto !important;
            grid-template-areas: "series dot" "text text" !important;
            row-gap: 8px !important;
            padding: 18px !important;
          }
          .vs-mtile-series { grid-area: series; min-width: 0 !important; font-size: 30px !important; }
          .vs-mtile-text   { grid-area: text; }
          .vs-mtile-dot    { grid-area: dot; justify-self: end; }
          .vs-mtile-tagline { display: none !important; }
        }

        @media (max-width: 480px) {
          .vs-hero { height: 560px !important; }
          .vs-hero-content { max-width: 100% !important; }
          .vs-hero-heading { letter-spacing: 0 !important; }
          .vs-hero-desc { font-size: 13px !important; margin-bottom: 16px !important; }
          .vs-hero-tags { display: none !important; }
          .vs-hero-btn { padding: 10px 20px !important; font-size: 12px !important; margin-bottom: 35px !important; }
          .vs-ltile-head { grid-template-columns: 48px 1fr auto !important; gap: 14px !important; padding: 18px !important; }
          .vs-ifp-card { padding: 20px !important; }
        }

        @media (max-width: 360px) {
          .vs-hero { height: 600px !important; }
        }
      `}</style>
    </main>
  );
}
