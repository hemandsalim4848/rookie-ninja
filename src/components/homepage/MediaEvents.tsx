'use client';

export default function GlobalFootprintSection() {
  const stats = [
    { value: '15+', label: 'Countries Served' },
    { value: '500+', label: 'Channel Partners' },
    { value: '20+', label: 'Years in Region' },
    { value: '50+', label: 'Global Vendors' },
  ];

  const regions = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0"/><path d="M3.6 9h16.8M3.6 15h16.8"/><path d="M11.5 3a17 17 0 0 0 0 18"/><path d="M12.5 3a17 17 0 0 1 0 18"/>
        </svg>
      ),
      name: 'Gulf (GCC)',
      desc: 'Core market with established partnerships across all six GCC nations.',
      countries: ['UAE', 'Saudi Arabia', 'Qatar', 'Kuwait', 'Bahrain', 'Oman'],
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z"/>
        </svg>
      ),
      name: 'Levant & North Africa',
      desc: 'Strong distributor network spanning the broader Arab world.',
      countries: ['Egypt', 'Jordan', 'Lebanon', 'Morocco', 'Tunisia'],
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 8C8 10 5.9 16.17 3.82 19.83"/><path d="M17 8c0 5.523-4.477 10-10 10"/><path d="M17 8a7 7 0 0 0-14 0c0 4.418 3.582 8 8 8"/><circle cx="17" cy="8" r="5"/>
        </svg>
      ),
      name: 'Sub-Saharan Africa',
      desc: 'Rapidly expanding reach into high-growth African economies.',
      countries: ['Kenya', 'Nigeria', 'South Africa', 'Ghana'],
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
        </svg>
      ),
      name: 'Emerging Markets',
      desc: 'Strategic partnerships in frontier markets with high digital potential.',
      countries: ['Pakistan', 'Bangladesh', 'Iraq', 'Libya'],
    },
  ];

  return (
    <section className="relative w-full overflow-hidden py-20 px-6">

      {/* subtle bg accent */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(21,167,220,0.15) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* ── Header ── */}
        <div className="mb-12">
          <p
            className="font-body font-semibold text-accent tracking-wide mb-3"
            style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.08em' }}
          >
            Our Reach
          </p>

          <h2
            className="font-display font-bold text-navy leading-[1.1] tracking-[-0.02em] mb-4"
            style={{ fontSize: 'clamp(28px, 4vw, 46px)' }}
          >
            Trusted Across{' '}
            <span className="text-accent">Middle East & Africa</span>
          </h2>

          <p
            className="font-body text-gray-500 leading-[1.75] max-w-xl"
            style={{ fontSize: '15px' }}
          >
            With deep roots in the MEA region and a growing presence across
            emerging markets, we deliver world-class technology distribution
            where it matters most.
          </p>
        </div>

        {/* ── Stats row ── */}
        <div
          className="flex items-center gap-10 flex-wrap mb-12 pb-10"
          style={{ borderBottom: '1px solid rgba(10,22,40,0.08)' }}
        >
          {stats.map(({ value, label }) => (
            <div key={label} className="flex flex-col">
              <span
                className="font-display font-bold text-navy"
                style={{ fontSize: '32px', lineHeight: 1 }}
              >
                {value}
              </span>
              <span
                className="font-body text-gray-400"
                style={{ fontSize: '12px', marginTop: '4px' }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* ── Region cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {regions.map(({ icon, name, desc, countries }) => (
            <div
              key={name}
              className="group relative flex flex-col rounded-2xl p-5 bg-white
                         border transition-all duration-200
                         hover:-translate-y-0.5"
              style={{ border: '0.5px solid rgba(10,22,40,0.1)' }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(21,167,220,0.45)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(10,22,40,0.1)';
              }}
            >
              {/* top accent line on hover */}
              <div
                className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl
                           bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              />

              {/* icon */}
              <div className="text-accent mb-3">{icon}</div>

              {/* name */}
              <p
                className="font-body font-semibold text-navy mb-1"
                style={{ fontSize: '14px' }}
              >
                {name}
              </p>

              {/* desc */}
              <p
                className="font-body text-gray-400 leading-relaxed mb-4"
                style={{ fontSize: '12px' }}
              >
                {desc}
              </p>

              {/* country pills */}
              <div className="flex flex-wrap gap-1 mt-auto">
                {countries.map(c => (
                  <span
                    key={c}
                    className="font-body font-medium text-accent rounded-full"
                    style={{
                      fontSize: '11px',
                      padding: '3px 9px',
                      background: 'rgba(21,167,220,0.08)',
                      border: '0.5px solid rgba(21,167,220,0.2)',
                    }}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}