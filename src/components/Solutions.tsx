'use client';

import { useEffect, useRef, useState } from 'react';
import Animate from './Animate';

const regions = [
  { name: 'UAE',          lat: 24.47, lng: 54.37, region: 'Middle East', description: 'Our headquarters and primary hub for MEA operations.' },
  { name: 'Saudi Arabia', lat: 23.89, lng: 45.08, region: 'Middle East', description: 'Key market for enterprise technology distribution.' },
  { name: 'Kuwait',       lat: 29.37, lng: 47.98, region: 'Middle East', description: 'Growing partner network across Kuwait.' },
  { name: 'Qatar',        lat: 25.35, lng: 51.18, region: 'Middle East', description: 'Serving resellers and system integrators across Qatar.' },
  { name: 'Bahrain',      lat: 26.02, lng: 50.55, region: 'Middle East', description: 'Active distribution across the Kingdom of Bahrain.' },
  { name: 'Oman',         lat: 21.51, lng: 55.92, region: 'Middle East', description: 'Supporting channel partners across Oman.' },
  { name: 'Jordan',       lat: 31.96, lng: 35.95, region: 'Middle East', description: 'Technology solutions delivered across Jordan.' },
  { name: 'Lebanon',      lat: 33.85, lng: 35.86, region: 'Middle East', description: 'IT distribution and support services in Lebanon.' },
  { name: 'Iraq',         lat: 33.22, lng: 43.68, region: 'Middle East', description: 'Expanding presence in the Iraqi market.' },
  { name: 'Yemen',        lat: 15.55, lng: 48.52, region: 'Middle East', description: 'Technology distribution across Yemen.' },
  { name: 'Kenya',        lat: -1.29, lng: 36.82, region: 'Africa',      description: 'East African hub for technology distribution.' },
  { name: 'Nigeria',      lat:  9.08, lng:  8.68, region: 'Africa',      description: "West Africa's largest technology market." },
  { name: 'Ethiopia',     lat:  9.15, lng: 40.49, region: 'Africa',      description: 'Growing distribution network in Ethiopia.' },
  { name: 'Ghana',        lat:  7.95, lng: -1.02, region: 'Africa',      description: 'Serving channel partners across Ghana.' },
  { name: 'Tanzania',     lat: -6.37, lng: 34.89, region: 'Africa',      description: 'Active IT distribution in Tanzania.' },
  { name: 'Uganda',       lat:  1.37, lng: 32.29, region: 'Africa',      description: 'Technology solutions across Uganda.' },
  { name: 'Kazakhstan',   lat: 48.02, lng: 66.92, region: 'CIS',         description: 'Key CIS region distribution partner.' },
  { name: 'Pakistan',     lat: 30.38, lng: 69.35, region: 'CIS & Other', description: 'Growing technology distribution across Pakistan.' },
];

const regionColors: Record<string, string> = {
  'Middle East':  '#15A7DC',
  'Africa':       '#0F8FBD',
  'CIS':          '#0A7AA8',
  'CIS & Other':  '#0A7AA8',
};

export default function GlobalFootprintScroll() {
  const outerRef    = useRef<HTMLDivElement>(null);
  const stickyRef   = useRef<HTMLDivElement>(null);
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const rotationRef = useRef({ x: 0.3, y: -0.4 });
  const dragging    = useRef(false);
  const lastMouse   = useRef({ x: 0, y: 0 });
  const animRef     = useRef<number>(0);
  const outerTopRef = useRef(0);

  const [scrollProgress, setScrollProgress] = useState(0); // 0 = full, 1 = small
  const [activePin, setActivePin]   = useState<typeof regions[0] | null>(null);
  const [hoveredPin, setHoveredPin] = useState<string | null>(null);
  const [showContent, setShowContent] = useState(false);

  // Measure outer top after mount
  useEffect(() => {
    const measure = () => {
      if (outerRef.current) {
        outerTopRef.current = outerRef.current.getBoundingClientRect().top + window.scrollY;
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Scroll-driven shrink
  useEffect(() => {
    const SCROLL_RANGE = 600; // px of scroll to go full→small

    const onScroll = () => {
      const scrolledIn = window.scrollY - outerTopRef.current;
      const progress   = Math.max(0, Math.min(1, scrolledIn / SCROLL_RANGE));
      setScrollProgress(progress);
      setShowContent(progress > 0.5);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Globe render
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    if (!ctx) return;

    const SIZE = 400;
    canvas.width  = SIZE;
    canvas.height = SIZE;
    const R  = SIZE * 0.44;
    const cx = SIZE / 2;
    const cy = SIZE / 2;

    function latLngToXYZ(lat: number, lng: number) {
      const phi   = (90 - lat)   * (Math.PI / 180);
      const theta = (lng + 180)  * (Math.PI / 180);
      return {
        x:  Math.sin(phi) * Math.cos(theta),
        y:  Math.cos(phi),
        z: -Math.sin(phi) * Math.sin(theta),
      };
    }

    function rotate(p: { x: number; y: number; z: number }, rx: number, ry: number) {
      const y1 =  p.y * Math.cos(rx) - p.z * Math.sin(rx);
      const z1 =  p.y * Math.sin(rx) + p.z * Math.cos(rx);
      const x2 =  p.x * Math.cos(ry) + z1  * Math.sin(ry);
      const z2 = -p.x * Math.sin(ry) + z1  * Math.cos(ry);
      return { x: x2, y: y1, z: z2 };
    }

    function draw() {
      ctx.clearRect(0, 0, SIZE, SIZE);
      const rx = rotationRef.current.x;
      const ry = rotationRef.current.y;

      // Globe fill
      const grad = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.3, R * 0.05, cx, cy, R);
      grad.addColorStop(0, 'rgba(21,167,220,0.06)');
      grad.addColorStop(1, 'rgba(8,18,34,0.98)');
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Globe border
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(21,167,220,0.18)';
      ctx.lineWidth   = 1;
      ctx.stroke();

      // Grid lines
      ctx.strokeStyle = 'rgba(21,167,220,0.07)';
      ctx.lineWidth   = 0.5;

      for (let lat = -80; lat <= 80; lat += 20) {
        ctx.beginPath();
        let first = true;
        for (let lng = -180; lng <= 180; lng += 3) {
          const rot = rotate(latLngToXYZ(lat, lng), rx, ry);
          if (rot.z < 0) { first = true; continue; }
          const sx = rot.x * R + cx;
          const sy = rot.y * R + cy;
          first ? ctx.moveTo(sx, sy) : ctx.lineTo(sx, sy);
          first = false;
        }
        ctx.stroke();
      }

      for (let lng = -180; lng <= 180; lng += 20) {
        ctx.beginPath();
        let first = true;
        for (let lat = -90; lat <= 90; lat += 3) {
          const rot = rotate(latLngToXYZ(lat, lng), rx, ry);
          if (rot.z < 0) { first = true; continue; }
          const sx = rot.x * R + cx;
          const sy = rot.y * R + cy;
          first ? ctx.moveTo(sx, sy) : ctx.lineTo(sx, sy);
          first = false;
        }
        ctx.stroke();
      }

      // Dot grid
      for (let lat = -80; lat <= 80; lat += 5) {
        for (let lng = -180; lng <= 180; lng += 5) {
          const rot = rotate(latLngToXYZ(lat, lng), rx, ry);
          if (rot.z < 0.05) continue;
          const sx = rot.x * R + cx;
          const sy = rot.y * R + cy;
          ctx.beginPath();
          ctx.arc(sx, sy, 0.7, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(200,220,255,${rot.z * 0.3})`;
          ctx.fill();
        }
      }

      // Pins
      regions.forEach(region => {
        const rot = rotate(latLngToXYZ(region.lat, region.lng), rx, ry);
        if (rot.z < 0.05) return;
        const sx    = rot.x * R + cx;
        const sy    = rot.y * R + cy;
        const color = regionColors[region.region] ?? '#15A7DC';
        const isActive  = activePin?.name === region.name;
        const isHovered = hoveredPin === region.name;
        const size      = isActive || isHovered ? 7 : 5;

        if (isActive || isHovered) {
          ctx.beginPath();
          ctx.arc(sx, sy, size + 7, 0, Math.PI * 2);
          ctx.strokeStyle = color + '40';
          ctx.lineWidth   = 1;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(sx, sy, size + 2.5, 0, Math.PI * 2);
        ctx.strokeStyle = color + '55';
        ctx.lineWidth   = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(sx, sy, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(draw);
    }

    draw();

    const auto = setInterval(() => {
      if (!dragging.current) rotationRef.current.y += 0.004;
    }, 16);

    return () => {
      cancelAnimationFrame(animRef.current);
      clearInterval(auto);
    };
  }, [hoveredPin, activePin]);

  // Drag
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onDown = (e: MouseEvent) => {
      dragging.current = true;
      lastMouse.current = { x: e.clientX, y: e.clientY };
    };
    const onMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      rotationRef.current.y += (e.clientX - lastMouse.current.x) * 0.005;
      rotationRef.current.x += (e.clientY - lastMouse.current.y) * 0.005;
      lastMouse.current = { x: e.clientX, y: e.clientY };
    };
    const onUp = () => { dragging.current = false; };

    const onTouchStart = (e: TouchEvent) => {
      dragging.current = true;
      lastMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!dragging.current) return;
      rotationRef.current.y += (e.touches[0].clientX - lastMouse.current.x) * 0.005;
      rotationRef.current.x += (e.touches[0].clientY - lastMouse.current.y) * 0.005;
      lastMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const onTouchEnd = () => { dragging.current = false; };

    const onClick = (e: MouseEvent) => {
      const rect  = canvas.getBoundingClientRect();
      const mx    = (e.clientX - rect.left) * (canvas.width  / rect.width);
      const my    = (e.clientY - rect.top)  * (canvas.height / rect.height);
      const SIZE  = 400;
      const R     = SIZE * 0.44;
      const cx    = SIZE / 2;
      const cy    = SIZE / 2;
      const rx    = rotationRef.current.x;
      const ry    = rotationRef.current.y;
      let   hit:  typeof regions[0] | null = null;
      let   best  = 18;

      regions.forEach(region => {
        const phi   = (90 - region.lat)  * (Math.PI / 180);
        const theta = (region.lng + 180) * (Math.PI / 180);
        let p = {
          x:  Math.sin(phi) * Math.cos(theta),
          y:  Math.cos(phi),
          z: -Math.sin(phi) * Math.sin(theta),
        };
        const y1 =  p.y * Math.cos(rx) - p.z * Math.sin(rx);
        const z1 =  p.y * Math.sin(rx) + p.z * Math.cos(rx);
        const x2 =  p.x * Math.cos(ry) + z1  * Math.sin(ry);
        const z2 = -p.x * Math.sin(ry) + z1  * Math.cos(ry);
        if (z2 < 0.05) return;
        const sx   = x2 * R + cx;
        const sy   = y1 * R + cy;
        const dist = Math.sqrt((mx - sx) ** 2 + (my - sy) ** 2);
        if (dist < best) { best = dist; hit = region; }
      });

      setActivePin(prev => prev?.name === (hit as any)?.name ? null : hit);
    };

    canvas.addEventListener('mousedown',  onDown);
    canvas.addEventListener('click',      onClick);
    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('mousemove',  onMove);
    window.addEventListener('mouseup',    onUp);
    window.addEventListener('touchmove',  onTouchMove,  { passive: true });
    window.addEventListener('touchend',   onTouchEnd);

    return () => {
      canvas.removeEventListener('mousedown',  onDown);
      canvas.removeEventListener('click',      onClick);
      canvas.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('mousemove',  onMove);
      window.removeEventListener('mouseup',    onUp);
      window.removeEventListener('touchmove',  onTouchMove);
      window.removeEventListener('touchend',   onTouchEnd);
    };
  }, []);

  // Interpolate values based on scroll progress
  const borderRadius  = `${scrollProgress * 24}px`;
  const marginH       = `${scrollProgress * 48}px`;
  const paddingTop    = `${100 + scrollProgress * 20}px`;

  return (
    // Outer div — tall enough to give scroll room
    <div
      ref={outerRef}
      className="relative"
      style={{ height: `calc(100vh + 600px)` }}
    >
      {/* Sticky panel */}
      <div
        ref={stickyRef}
        className="sticky top-0 overflow-hidden"
        style={{
          height:       '100vh',
          margin:       `0 ${marginH}`,
          borderRadius,
          background:   'linear-gradient(135deg, #0A1628 0%, #0F2040 100%)',
          transition:   'margin 0.1s linear, border-radius 0.1s linear',
        }}
      >
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/3 -translate-y-1/2 -translate-x-1/2
                          w-[700px] h-[700px] rounded-full opacity-10"
               style={{
                 background: 'radial-gradient(circle, #15A7DC 0%, transparent 70%)'
               }} />
        </div>

        {/* ── FULL SCREEN state (progress < 0.5) ── */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center
                     px-6 transition-all duration-300"
          style={{ opacity: 1 - scrollProgress * 2, pointerEvents: scrollProgress > 0.4 ? 'none' : 'auto' }}
        >
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-5">
              <span className="block w-8 h-px bg-accent/50" />
              <span className="font-body text-[11px] font-medium tracking-[0.22em]
                               uppercase text-accent">
                Global Presence
              </span>
              <span className="block w-8 h-px bg-accent/50" />
            </div>
            <h2 className="font-display font-bold text-white
                           text-[clamp(32px,5vw,64px)]
                           leading-[1.1] tracking-[-0.02em]">
              Our <span className="text-accent">Global</span> Footprint
            </h2>
            <p className="font-body text-[16px] font-light text-white/40
                          mt-4 max-w-md mx-auto leading-[1.7]">
              Scroll down to explore our presence across the Middle East,
              Africa and CIS regions.
            </p>
          </div>

          <canvas
            ref={canvasRef}
            className="cursor-grab active:cursor-grabbing select-none
                       max-w-[420px] max-h-[420px] w-full h-full"
          />

          {/* Scroll hint */}
          <div className="absolute bottom-10 flex flex-col items-center gap-2">
            <span className="font-body text-[11px] text-white/25 uppercase
                             tracking-[0.14em]">
              Scroll to explore
            </span>
            <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
          </div>
        </div>

        {/* ── SHRUNK state (progress > 0.5) ── */}
        <div
          className="absolute inset-0 grid grid-cols-1 lg:grid-cols-2
                     gap-0 transition-all duration-300"
          style={{
            opacity:       Math.max(0, (scrollProgress - 0.5) * 2),
            pointerEvents: scrollProgress < 0.5 ? 'none' : 'auto',
          }}
        >
          {/* Left — globe */}
          <div className="flex items-center justify-center p-8 lg:p-12">
            <canvas
              className="cursor-grab active:cursor-grabbing select-none
                         max-w-[380px] w-full"
            />
            <p className="absolute font-body text-[10px] text-white/20
                          uppercase tracking-[0.12em] mt-2"
               style={{ marginTop: '420px' }}>
              Drag to rotate · Click pins to explore
            </p>
          </div>

          {/* Right — info */}
          <div className="flex flex-col justify-center px-8 lg:px-12 py-12">

            <h3 className="font-display text-[clamp(22px,3vw,36px)] font-bold
                           text-white mb-4 leading-tight">
              Our Global <span className="text-accent">Footprint</span>
            </h3>

            <p className="font-body text-[14px] text-white/50 font-light
                          leading-[1.8] mb-8 max-w-md">
              Rookie Ninja has an established presence across the Middle East
              and Africa. Click on a marker on the globe to learn more about
              our impact in a specific country.
            </p>

            {/* Region pills */}
            <div className="flex flex-wrap gap-2.5 mb-8">
              {[
                { label: 'Middle East', count: 10, color: '#15A7DC' },
                { label: 'Africa',      count:  6, color: '#0F8FBD' },
                { label: 'CIS & Other', count:  2, color: '#0A7AA8' },
              ].map(({ label, count, color }) => (
                <div key={label}
                     className="flex items-center gap-2 px-3.5 py-2 rounded-xl
                                border border-white/10 bg-white/[0.04]">
                  <span className="w-2 h-2 rounded-full shrink-0"
                        style={{ background: color }} />
                  <span className="font-body text-[12px] text-white/60">
                    {label}
                  </span>
                  <span className="font-display text-[13px] font-bold text-accent">
                    {count}
                  </span>
                </div>
              ))}
            </div>

            {/* Active pin panel */}
            <div className={`rounded-2xl border transition-all duration-300
                             ${activePin
                               ? 'border-accent/30 bg-white/[0.06]'
                               : 'border-white/[0.06] bg-white/[0.02]'}`}>
              {activePin ? (
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-1.5 h-1.5 rounded-full"
                              style={{ background: regionColors[activePin.region] }} />
                        <span className="font-body text-[10px] text-accent
                                         uppercase tracking-[0.14em] font-medium">
                          {activePin.region}
                        </span>
                      </div>
                      <h4 className="font-display text-[18px] font-bold text-white">
                        {activePin.name}
                      </h4>
                    </div>
                    <button onClick={() => setActivePin(null)}
                            className="w-6 h-6 rounded-lg border border-white/10
                                       text-white/30 flex items-center justify-center
                                       hover:text-white transition-all duration-200">
                      <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                        <path d="M1 1l8 8M9 1L1 9" stroke="currentColor"
                              strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </button>
                  </div>
                  <p className="font-body text-[13px] text-white/45 font-light
                                leading-[1.7]">
                    {activePin.description}
                  </p>
                </div>
              ) : (
                <div className="p-5 flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-accent/10 text-accent
                                  flex items-center justify-center shrink-0">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none"
                         stroke="currentColor" strokeWidth="1.5"
                         strokeLinecap="round" strokeLinejoin="round">
                      <path d="M8 1a5 5 0 00-5 5c0 4 5 9 5 9s5-5 5-9a5 5 0 00-5-5z"/>
                      <circle cx="8" cy="6" r="1.5"/>
                    </svg>
                  </div>
                  <p className="font-body text-[12px] text-white/25 font-light">
                    Click any pin on the globe to explore our presence.
                  </p>
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-5 mt-7 pt-7
                            border-t border-white/[0.06]">
              {[
                { value: `${regions.length}+`, label: 'Countries' },
                { value: '3',                  label: 'Regions'   },
                { value: '15+',                label: 'Years'     },
              ].map(({ value, label }, i) => (
                <div key={label} className="flex items-center gap-5">
                  <div className="text-center">
                    <div className="font-display text-[24px] font-bold text-accent
                                    leading-none mb-0.5">
                      {value}
                    </div>
                    <div className="font-body text-[10px] text-white/30 uppercase
                                    tracking-[0.1em]">
                      {label}
                    </div>
                  </div>
                  {i < 2 && <div className="w-px h-8 bg-white/10" />}
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}