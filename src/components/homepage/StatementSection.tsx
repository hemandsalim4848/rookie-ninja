'use client';

export default function StatementSection() {
  return (
    <section className="relative w-full bg-white py-10 px-6 overflow-hidden">

      {/* Subtle center glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[700px] h-[300px] rounded-full opacity-40"
             style={{ background: 'radial-gradient(ellipse, rgba(21,167,220,0.1) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <p
          className="font-display font-medium text-navy/80 leading-[1.55] tracking-[-0.01em]"
          style={{ fontSize: 'clamp(22px, 3vw, 34px)' }}
        >
          We empower our partners with leading
          <br />
          technology &amp;{' '}

          {/* Inline pill with animated logo */}
          <span
            className="inline-flex items-center justify-center mx-2 align-middle
                       rounded-full px-3 py-1.5 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #0d1f3c 0%, #0a1628 100%)',
              boxShadow: '0 4px 20px rgba(21,167,220,0.25), inset 0 1px 0 rgba(255,255,255,0.06)',
              verticalAlign: 'middle',
            }}
          >
            {/* Animated glow ring */}
            <span
              className="absolute inset-0 rounded-full opacity-40 animate-pulse"
              style={{
                background: 'radial-gradient(circle at 50% 50%, rgba(21,167,220,0.3) 0%, transparent 70%)',
              }}
            />

            {/* Rotating cube icon */}
            <span className="relative z-10 flex items-center justify-center"
                  style={{ width: '28px', height: '28px' }}>
              <svg viewBox="0 0 32 32" fill="none" width="26" height="26"
                   style={{ animation: 'spinY 4s linear infinite' }}>
                {/* Cube top face */}
                <polygon points="16,4 28,10 16,16 4,10"
                         fill="rgba(21,167,220,0.9)" stroke="rgba(21,167,220,0.4)" strokeWidth="0.5"/>
                {/* Cube left face */}
                <polygon points="4,10 16,16 16,28 4,22"
                         fill="rgba(10,80,140,0.85)" stroke="rgba(21,167,220,0.3)" strokeWidth="0.5"/>
                {/* Cube right face */}
                <polygon points="28,10 16,16 16,28 28,22"
                         fill="rgba(21,130,200,0.75)" stroke="rgba(21,167,220,0.3)" strokeWidth="0.5"/>
              </svg>
            </span>
          </span>

          {' '}expert services
          <br />
          to deliver transformative solutions.
        </p>
      </div>

      <style>{`
        @keyframes spinY {
          0%   { transform: rotateY(0deg);   }
          100% { transform: rotateY(360deg); }
        }
      `}</style>
    </section>
  );
}