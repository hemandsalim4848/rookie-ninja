'use client';

import { useEffect, useRef } from 'react';

export default function AboutSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width  = 420;
    const H = canvas.height = 420;
    const cx = W / 2;
    const cy = H / 2;
    const R  = 148;

    // Generate lat/lng grid points on sphere
    const dots: { x: number; y: number; z: number }[] = [];
    for (let lat = -90; lat <= 90; lat += 7) {
      for (let lng = -180; lng <= 180; lng += 7) {
        const phi   = (lat  * Math.PI) / 180;
        const theta = (lng  * Math.PI) / 180;
        dots.push({
          x: Math.cos(phi) * Math.cos(theta),
          y: Math.sin(phi),
          z: Math.cos(phi) * Math.sin(theta),
        });
      }
    }

    // Continent-shaped landmass mask (simplified bounding boxes in lat/lng)
    const landBoxes = [
      // North America
      { latMin: 15, latMax: 72, lngMin: -168, lngMax: -52 },
      // South America
      { latMin: -55, latMax: 12, lngMin: -82, lngMax: -34 },
      // Europe
      { latMin: 36, latMax: 71, lngMin: -10, lngMax: 40 },
      // Africa
      { latMin: -35, latMax: 37, lngMin: -18, lngMax: 51 },
      // Asia
      { latMin: 5,  latMax: 75, lngMin: 26,  lngMax: 145 },
      // Australia
      { latMin: -44, latMax: -10, lngMin: 113, lngMax: 154 },
      // Greenland
      { latMin: 60, latMax: 84, lngMin: -58, lngMax: -17 },
    ];

    function isLand(lat: number, lng: number): boolean {
      return landBoxes.some(
        b => lat >= b.latMin && lat <= b.latMax && lng >= b.lngMin && lng <= b.lngMax
      );
    }

    // Tag each dot
    const taggedDots = dots.map(d => {
      const lat = (Math.asin(d.y) * 180) / Math.PI;
      const lng = (Math.atan2(d.z, d.x) * 180) / Math.PI;
      return { ...d, land: isLand(lat, lng) };
    });

    let angle = 0;
    let raf: number;

    function draw() {
      ctx!.clearRect(0, 0, W, H);

      // Soft radial glow behind globe
      const grd = ctx!.createRadialGradient(cx, cy, R * 0.2, cx, cy, R * 1.3);
      grd.addColorStop(0, 'rgba(21,167,220,0.08)');
      grd.addColorStop(1, 'rgba(21,167,220,0)');
      ctx!.fillStyle = grd;
      ctx!.fillRect(0, 0, W, H);

      // Sort dots back-to-front for depth
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);

      const projected = taggedDots.map(d => {
        // Rotate around Y axis
        const rx = d.x * cosA - d.z * sinA;
        const rz = d.x * sinA + d.z * cosA;
        const ry = d.y;

        const scale = (rz + 2) / 3; // perspective
        const sx = cx + rx * R * scale;
        const sy = cy - ry * R * scale;
        const depth = rz;
        return { sx, sy, depth, land: d.land, scale };
      }).sort((a, b) => a.depth - b.depth);

      for (const p of projected) {
        const visible = p.depth > -0.05;
        const alpha   = visible
          ? 0.15 + (p.depth + 1) * 0.42
          : 0;
        if (alpha <= 0) continue;

        const dotR = p.land
          ? 2.6 * p.scale
          : 1.5 * p.scale;

        ctx!.beginPath();
        ctx!.arc(p.sx, p.sy, Math.max(dotR, 0.5), 0, Math.PI * 2);

        if (p.land) {
          ctx!.fillStyle = `rgba(21,167,220,${alpha})`;
        } else {
          ctx!.fillStyle = `rgba(21,167,220,${alpha * 0.35})`;
        }
        ctx!.fill();
      }

      angle += 0.004;
      raf = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="relative w-full  overflow-hidden py-20 px-6">

      {/* subtle bg accent */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2
                      w-[600px] h-[600px] rounded-full pointer-events-none opacity-30"
           style={{ background: 'radial-gradient(circle, rgba(21,167,220,0.12) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col
                      lg:flex-row items-center gap-12 lg:gap-20">

        {/* ── Globe ── */}
        <div className="shrink-0 flex items-center justify-center
                        w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] lg:w-[420px] lg:h-[420px]">
          <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{ imageRendering: 'auto' }}
          />
        </div>

        {/* ── Text ── */}
        <div className="flex flex-col items-start text-left max-w-xl">

          {/* Category label */}
          <p className="font-body font-semibold text-accent tracking-wide mb-3"
             style={{ fontSize: '14px' }}>
            Who We Are
          </p>

          {/* Heading */}
          <h2 className="font-display font-bold text-navy leading-[1.1]
                         tracking-[-0.02em] mb-2"
              style={{ fontSize: 'clamp(30px, 4vw, 50px)' }}>
            Your Partner for
          </h2>
          <h2 className="font-display font-bold leading-[1.1]
                         tracking-[-0.02em] mb-6 text-accent"
              style={{ fontSize: 'clamp(30px, 4vw, 50px)' }}>
            Digital Transformation
          </h2>

          {/* Body */}
          <p className="font-body text-gray-500 leading-[1.75] mb-8"
             style={{ fontSize: '15px' }}>
            We are a next-generation Value Added Distributor (VAD), driving
            innovation for global vendors and channel ecosystems. Our focus is on
            delivering cutting-edge tech solutions that empower businesses to
            thrive in a dynamic world.
          </p>

          {/* Stats row */}
          <div className="flex items-center gap-8 flex-wrap">
            {[
              { value: '20+', label: 'Years Experience' },
              { value: '50+', label: 'Global Vendors'   },
              { value: '15+', label: 'Countries Served' },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col">
                <span className="font-display font-bold text-navy"
                      style={{ fontSize: '28px' }}>
                  {value}
                </span>
                <span className="font-body text-gray-400"
                      style={{ fontSize: '12px' }}>
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <a href="/about"
             className="mt-8 inline-flex items-center gap-2 font-body font-medium
                        text-accent border border-accent/40 px-5 py-2.5 rounded-xl
                        transition-all duration-200 no-underline
                        hover:bg-accent hover:text-white hover:border-accent
                        hover:-translate-y-px"
             style={{ fontSize: '13px' }}>
            Learn More
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor"
                    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}