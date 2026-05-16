'use client';

import { useRef } from 'react';

const solutions = [
  {
    id: 1,
    title: 'Print Solutions',
    description: 'Desktop to wide-format printing for every business scale.',
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=600&q=80',
    href: '/portfolio/solutions/print',
    icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>),
  },
  {
    id: 2,
    title: 'Scan',
    description: 'High-speed scanning solutions for documents and large formats.',
    image: 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?w=600&q=80',
    href: '/portfolio/solutions/scan',
    icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M21 17v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2"/><line x1="3" y1="12" x2="21" y2="12"/></svg>),
  },
  {
    id: 3,
    title: 'Consumer Electronics',
    description: 'Smart devices and peripherals sourced and distributed.',
    image: 'https://images.unsplash.com/photo-1593640408182-31c228b40bc8?w=600&q=80',
    href: '/portfolio/solutions/electronics',
    icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>),
  },
  {
    id: 4,
    title: 'Gaming',
    description: 'High-performance hardware for the next generation of players.',
    image: 'https://images.unsplash.com/photo-1593118247619-e2d6f056869e?w=600&q=80',
    href: '/portfolio/solutions/gaming',
    icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 4H7a5 5 0 00-4.9 6l1.1 6A3 3 0 006.1 19h.4a3 3 0 002.4-1.2L10 17h4l1.1 1.8A3 3 0 0017.5 19h.4a3 3 0 002.9-3l1.1-6A5 5 0 0017 4z"/><path d="M7 11h2M8 10v2M15 11h2"/></svg>),
  },
  {
    id: 5,
    title: 'Components',
    description: 'Core hardware components for enterprise and retail.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80',
    href: '/portfolio/solutions/components',
    icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M9 7h6M9 11h6M9 15h4"/></svg>),
  },
  {
    id: 6,
    title: 'Software',
    description: 'Licensed software solutions for business productivity.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80',
    href: '/portfolio/solutions/software',
    icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>),
  },
  {
    id: 7,
    title: 'Audio Visual',
    description: 'Interactive panels, monitors and meeting room solutions.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80',
    href: '/portfolio/solutions/av',
    icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M14 2l-4 5-4-5"/><circle cx="12" cy="14" r="3"/></svg>),
  },
  {
    id: 8,
    title: 'IT Accessories',
    description: 'Every peripheral your team needs to stay productive.',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&q=80',
    href: '/portfolio/solutions/accessories',
    icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L4 7v13a1 1 0 001 1h14a1 1 0 001-1V7L18 2z"/><line x1="4" y1="7" x2="20" y2="7"/><path d="M14 11a2 2 0 01-4 0"/></svg>),
  },
];

export default function SolutionsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === 'right' ? 340 : -340, behavior: 'smooth' });
  };

  return (
    <section style={{ backgroundColor: '#ffffff', width: '100%', padding: '80px 0', overflow: 'hidden', position: 'relative' }}>

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="font-body font-semibold text-accent tracking-wide mb-2" style={{ fontSize: '13px' }}>
              What We Distribute
            </p>
            <h2 className="font-display font-bold text-navy leading-[1.05] tracking-[-0.02em]"
                style={{ fontSize: 'clamp(28px, 3.5vw, 44px)' }}>
              Solutions <span className="text-accent">we Offer</span>
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <button onClick={() => scroll('left')}
                    className="w-9 h-9 rounded-full border border-navy/15 text-navy/40
                               flex items-center justify-center transition-all duration-200
                               hover:border-accent hover:text-accent hover:bg-accent/5
                               cursor-pointer bg-transparent">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button onClick={() => scroll('right')}
                    className="w-9 h-9 rounded-full border border-navy/15 text-navy/40
                               flex items-center justify-center transition-all duration-200
                               hover:border-accent hover:text-accent hover:bg-accent/5
                               cursor-pointer bg-transparent">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable strip */}
        <div
  ref={scrollRef}
  className="flex gap-3 sm:gap-4 lg:gap-6 overflow-x-auto pb-3"
  style={{ scrollbarWidth: 'none' as const }}
>
  {solutions.map((s) => (
    <a
      key={s.id}
      href={s.href}
      className="group flex-none no-underline w-[calc(100%-24px)] sm:w-[calc(33%-16px)] lg:w-[calc(25%-18px)]"
    >
      <div
        className="rounded-2xl overflow-hidden border border-gray-100 flex flex-col
                   transition-all duration-300
                   hover:shadow-[0_10px_36px_rgba(21,167,220,0.15)]
                   hover:border-accent/20 hover:-translate-y-1"
        style={{ height: '360px', backgroundColor: '#ffffff' }}
      >

        {/* Image */}
        <div className="relative overflow-hidden shrink-0 h-[180px]">
          <img
            src={s.image}
            alt={s.title}
            className="w-full h-full object-cover grayscale transition-all duration-500
                       group-hover:grayscale-0 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-center gap-2.5 mb-2">
            <span
              className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center
                         justify-center shrink-0 transition-colors duration-200
                         group-hover:bg-accent group-hover:text-white"
            >
              {s.icon}
            </span>

            <h3 className="font-display font-semibold text-navy leading-tight text-[15px]">
              {s.title}
            </h3>
          </div>

          <p className="font-body text-gray-400 leading-[1.6] text-[13px]">
            {s.description}
          </p>

          <div
            className="mt-auto pt-3 flex items-center gap-1 text-accent
                       opacity-0 group-hover:opacity-100 -translate-x-1
                       group-hover:translate-x-0 transition-all duration-200"
          >
            <span className="font-body font-medium text-[12px]">Explore</span>
            <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </a>
  ))}
</div>
      </div>

      <style>{`div::-webkit-scrollbar { display: none; }`}</style>
    </section>
  );
}