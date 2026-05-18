'use client';

import { useState } from 'react';
import Animate from '../Animate';
import SectionHeader from '../SectionHeader';

/* ── Brand partner logos ── */
const brandPartners = [
  { name: 'ViewSonic', logo: '/logos/viewsonic-logo.webp' },
  { name: 'MSI',       logo: '/logos/msi-logo.png'       },
  { name: 'Aerocool',  logo: '/logos/aerocool-logo.png'  },
];

/* ── Component tab data ── */
const componentTabs = [
  {
    id: 'motherboard',
    label: 'Motherboard',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="2"/>
        <rect x="6" y="6" width="5" height="5"/>
        <rect x="13" y="6" width="5" height="5"/>
        <rect x="6" y="13" width="5" height="5"/>
        <path d="M13 13h5v5h-5z" strokeDasharray="2 2"/>
      </svg>
    ),
    images: [
      'https://placehold.co/520x380/EFF6FF/15A7DC?text=Motherboard+1&font=poppins',
      'https://placehold.co/520x380/EFF6FF/15A7DC?text=Motherboard+2&font=poppins',
    ],
    heading: 'The Backbone of Every System',
    body: 'The motherboard is the backbone of every computer system, connecting all critical components including the CPU, RAM, storage, and expansion cards. Rookie Ninja offers a curated selection of motherboards from leading brands, designed to deliver stability, performance, and compatibility — from everyday business computing to high-performance workstations.',
    highlights: ['CPU, RAM & storage ready', 'Business to workstation grade', 'Stability & compatibility'],
  },
  {
    id: 'peripherals',
    label: 'Computer Peripherals',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="7"/>
        <path d="M12 6v4M10 8h4"/>
      </svg>
    ),
    images: [
      'https://placehold.co/520x380/EFF6FF/15A7DC?text=Peripherals+1&font=poppins',
      'https://placehold.co/520x380/EFF6FF/15A7DC?text=Peripherals+2&font=poppins',
      'https://placehold.co/520x380/EFF6FF/15A7DC?text=Peripherals+3&font=poppins',
    ],
    heading: 'Elevate Your Computing Setup',
    body: 'Computer peripherals are essential components that enhance your computing experience in various sectors. From work to home and gaming, they play a vital role in improving productivity, providing entertainment, and ensuring efficiency. Investing in quality peripherals from trusted brands is needed in elevating your computer setup and experience.',
    highlights: ['Work, home & gaming ready', 'Boosts productivity', 'Trusted brand quality'],
  },
  {
    id: 'gpu',
    label: 'GPU',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="6" width="22" height="12" rx="2"/>
        <path d="M6 6V4M10 6V4M14 6V4M18 6V4M6 18v2M10 18v2M14 18v2M18 18v2"/>
        <rect x="5" y="9" width="5" height="6" rx="1"/>
        <rect x="14" y="9" width="5" height="6" rx="1"/>
      </svg>
    ),
    images: [
      'https://placehold.co/520x380/EFF6FF/15A7DC?text=GPU+1&font=poppins',
      'https://placehold.co/520x380/EFF6FF/15A7DC?text=GPU+2&font=poppins',
    ],
    heading: 'Accelerate Visual Performance',
    body: 'A powerful GPU (Graphics Processing Unit) is essential for tasks that demand high visual performance — from professional design, video editing, and 3D rendering to gaming and AI workloads. Rookie Ninja provides GPU solutions from top-tier brands engineered to accelerate processing, deliver stunning visuals, and boost overall system performance.',
    highlights: ['Design, video & 3D rendering', 'AI & gaming workloads', 'Top-tier brand performance'],
  },
  {
    id: 'cabinet',
    label: 'CPU Cabinet',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="2" width="16" height="20" rx="2"/>
        <path d="M9 6h6M9 10h6M9 14h4"/>
        <circle cx="16" cy="14" r="1" fill="currentColor"/>
      </svg>
    ),
    images: [
      'https://placehold.co/520x380/EFF6FF/15A7DC?text=CPU+Cabinet+1&font=poppins',
      'https://placehold.co/520x380/EFF6FF/15A7DC?text=CPU+Cabinet+2&font=poppins',
    ],
    heading: 'Protect, Organise & Expand',
    body: 'CPU cabinets protect and organise your components, ensure proper airflow and cooling, and allow for easy expansion. Whether you\'re a gamer, a professional, or a casual user, a reliable CPU cabinet is essential for optimal performance and longevity. Upgrade your setup with the perfect CPU cabinet from Rookie Ninja.',
    highlights: ['Proper airflow & cooling', 'Easy component access', 'Expandable & upgradeable'],
  },
  {
    id: 'monitors',
    label: 'Monitors',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    images: [
      'https://placehold.co/520x380/EFF6FF/15A7DC?text=Monitor+1&font=poppins',
      'https://placehold.co/520x380/EFF6FF/15A7DC?text=Monitor+2&font=poppins',
      'https://placehold.co/520x380/EFF6FF/15A7DC?text=Monitor+3&font=poppins',
    ],
    heading: 'Immersive Viewing for Every Need',
    body: 'As monitors are the heart and soul of computers — enabling viewers to interact with the system, assist users in performing day-to-day operations, and help make informed decisions. Rookie Ninja offers an extensive array of viewing solutions, from mainstream and business monitors to gaming and professional displays. We provide users with smooth, immersive experiences that suit their specific needs.',
    highlights: ['Business to professional grade', 'Gaming & mainstream options', 'Smooth immersive display'],
  },
  {
    id: 'coolers',
    label: 'Coolers',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
    images: [
      'https://placehold.co/520x380/EFF6FF/15A7DC?text=Cooler+1&font=poppins',
      'https://placehold.co/520x380/EFF6FF/15A7DC?text=Cooler+2&font=poppins',
    ],
    heading: 'Stay Cool Under Pressure',
    body: 'Rookie Ninja offers a wide range of cooling solutions designed for different system requirements, including air coolers and liquid cooling options for gaming PCs, workstations, and everyday systems. These coolers are built with efficient heat dissipation technology, durable components, and optimized airflow to maintain consistent temperatures even during intensive workloads.',
    highlights: ['Air & liquid cooling options', 'Efficient heat dissipation', 'Optimized airflow design'],
  },
  {
    id: 'psu',
    label: 'PSU',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    images: [
      'https://placehold.co/520x380/EFF6FF/15A7DC?text=PSU+1&font=poppins',
      'https://placehold.co/520x380/EFF6FF/15A7DC?text=PSU+2&font=poppins',
    ],
    heading: 'Reliable Power for Every Build',
    body: 'Rookie Ninja offers a wide range of power supply solutions designed for various computing needs, from everyday home and office systems to gaming setups and professional workstations. Our PSUs are built with efficient power delivery, reliable components, and advanced protection features to ensure safe and stable system performance.',
    highlights: ['Efficient power delivery', 'Advanced protection features', 'Stable system performance'],
  },
  {
    id: 'webcam',
    label: 'Webcam',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 7l-7 5 7 5V7z"/>
        <rect x="1" y="5" width="15" height="14" rx="2"/>
      </svg>
    ),
    images: [
      'https://placehold.co/520x380/EFF6FF/15A7DC?text=Webcam+1&font=poppins',
      'https://placehold.co/520x380/EFF6FF/15A7DC?text=Webcam+2&font=poppins',
    ],
    heading: 'Crystal-Clear Communication',
    body: 'Transform your daily operations with Rookie Ninja\'s webcam solutions. Whether for work, home, or entertainment, stay connected through crystal-clear resolution and reliable video calls. Upgrade now and experience enhanced communication and versatility.',
    highlights: ['Crystal-clear resolution', 'Work, home & entertainment', 'Reliable video calls'],
  },
];

/* ── Image Slider ── */
function ImageSlider({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent(i => (i - 1 + images.length) % images.length);
  const next = () => setCurrent(i => (i + 1) % images.length);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-[#EFF6FF]"
         style={{ aspectRatio: '520/380' }}>
      <img
        key={current}
        src={images[current]}
        alt={`Product image ${current + 1}`}
        className="w-full h-full object-cover transition-opacity duration-300"
      />
      {images.length > 1 && (
        <>
          <button onClick={prev} aria-label="Previous image"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full
                       bg-white/90 border border-gray-200 flex items-center justify-center
                       text-navy hover:bg-white hover:border-accent/40
                       transition-all duration-200 shadow-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          <button onClick={next} aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full
                       bg-white/90 border border-gray-200 flex items-center justify-center
                       text-navy hover:bg-white hover:border-accent/40
                       transition-all duration-200 shadow-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </>
      )}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to image ${i + 1}`}
              className={`rounded-full transition-all duration-200
                          ${i === current ? 'w-5 h-1.5 bg-accent' : 'w-1.5 h-1.5 bg-white/60 hover:bg-white'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Main Page ── */
export default function ComponentsPage() {
  const [activeTab, setActiveTab] = useState(0);
  const tab = componentTabs[activeTab];

  return (
    <main className="bg-white">

      {/* ══════════════════════════════════════════
          HERO BANNER
      ══════════════════════════════════════════ */}
      <section className="relative min-h-[55vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0" style={{
          background: `
            radial-gradient(ellipse 60% 60% at 75% 50%, rgba(21,167,220,0.1) 0%, transparent 70%),
            linear-gradient(150deg, #0A1628 0%, #0F2040 60%, #0A1628 100%)`,
        }} />
        <div className="absolute inset-0 z-[1]" style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }} />

        {/* Decorative right panel */}
        <div className="absolute right-[8%] top-1/2 -translate-y-1/2 z-[1]
                        hidden lg:flex flex-col gap-4">
          {[
            { label: 'Component Categories', value: '8+'  },
            { label: 'Brand Partners',       value: '3+'  },
            { label: 'Products Available',   value: '150+'},
          ].map(({ label, value }) => (
            <div key={label}
                 className="flex items-center gap-4 px-5 py-4 rounded-xl
                            border border-white/10 bg-white/[0.05]
                            backdrop-blur-sm min-w-[200px]">
              <span className="font-display font-bold text-accent"
                    style={{ fontSize: '28px', lineHeight: 1 }}>
                {value}
              </span>
              <span className="font-body text-white/60"
                    style={{ fontSize: '13px' }}>
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Hero text */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-[120px] pb-20">
          <Animate type="fade-up">
            <div className="inline-flex items-center gap-2 text-[10.5px] font-medium
                            tracking-[0.15em] uppercase text-accent mb-6 px-3.5
                            py-1.5 pl-2 rounded-full border border-[rgba(21,167,220,0.25)]
                            bg-[rgba(21,167,220,0.12)]">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-blink-dot" />
              Components
            </div>
          </Animate>

          <Animate type="fade-up" delay={100}>
            <h1 className="font-display font-bold text-white leading-[1.1]
                           tracking-[-0.02em] mb-5 max-w-xl"
                style={{ fontSize: 'clamp(36px, 5vw, 60px)' }}>
              Performance, Speed &{' '}
              <span className="text-accent">Efficiency</span>
            </h1>
          </Animate>

          <Animate type="fade-up" delay={200}>
            <p className="font-body text-white/60 leading-[1.8] max-w-lg"
               style={{ fontSize: '16px', fontWeight: 300 }}>
              From top-tier GPUs and CPU cabinets to motherboards, peripherals, and more —
              Rookie Ninja offers the ideal component offerings that cater to your requirement.
            </p>
          </Animate>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          INTRO
      ══════════════════════════════════════════ */}
      <section className="py-24 px-6 border-t border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto">
          <Animate type="fade-up">
            <SectionHeader
              label="Components"
              heading="Upgrading Your PC Essentials"
              subheading="Our partnership with leading brands ensures that we deliver exceptional quality to enhance your day-to-day experiences. With our innovative technology at work, we improve your performance, increase work speed productivity, and overall enhance efficiency and effectiveness."
              align="center"
            />
          </Animate>

          <Animate type="fade-up" delay={100}>
            <div className="flex justify-center mt-8">
              <a
                href="/products"
                className="inline-flex items-center gap-2 font-body font-medium
                           text-white bg-accent px-6 py-3 rounded-xl
                           transition-all duration-200 no-underline
                           hover:opacity-85 hover:-translate-y-px
                           shadow-[0_4px_20px_rgba(21,167,220,0.3)]"
                style={{ fontSize: '14px' }}
              >
                View Products
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4"
                        stroke="currentColor" strokeWidth="1.5"
                        strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </Animate>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          BRAND PARTNERS
      ══════════════════════════════════════════ */}
      <section className="py-16 px-6 border-t border-gray-100"
               style={{ background: 'linear-gradient(180deg, #f8fbff 0%, #ffffff 100%)' }}>
        <div className="max-w-6xl mx-auto">
          <Animate type="fade-up">
            <p className="font-body text-center text-gray-400 mb-8 uppercase
                          tracking-[0.12em]"
               style={{ fontSize: '18px' }}>
              Our Brand Partners
            </p>
          </Animate>

          <Animate type="fade-up" delay={80}>
            <div className="flex flex-wrap justify-center items-center gap-4">
              {brandPartners.map(({ name, logo }) => (
                <div
                  key={name}
                  className="flex items-center justify-center px-8 py-5
                             rounded-xl border border-gray-100 bg-white
                             transition-all duration-200
                             hover:border-accent/30
                             hover:shadow-[0_4px_16px_rgba(21,167,220,0.08)]"
                  style={{ minWidth: '160px' }}
                >
                  <img
                    src={logo}
                    alt={name}
                    className="h-8 w-auto object-contain transition-opacity duration-200"
                    style={{ maxWidth: '120px' }}
                  />
                </div>
              ))}
            </div>
          </Animate>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          COMPONENT TABS
      ══════════════════════════════════════════ */}
      <section className="py-24 px-6 border-t border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto">

          {/* Tab buttons */}
          <Animate type="fade-up">
            <div className="flex flex-wrap gap-2 mb-12 border-b border-gray-100 pb-6">
              {componentTabs.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(i)}
                  className={`inline-flex items-center gap-2 font-body font-medium
                              px-5 py-2.5 rounded-xl border transition-all duration-200
                              ${activeTab === i
                                ? 'bg-accent text-white border-accent shadow-[0_4px_16px_rgba(21,167,220,0.3)]'
                                : 'bg-white text-gray-500 border-gray-200 hover:border-accent/40 hover:text-accent'}`}
                  style={{ fontSize: '13px' }}
                >
                  <span className={activeTab === i ? 'text-white' : 'text-accent'}>
                    {t.icon}
                  </span>
                  {t.label}
                </button>
              ))}
            </div>
          </Animate>

          {/* Tab content */}
          <div key={activeTab}
               className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            <Animate type="fade-right">
              <ImageSlider images={tab.images} />
            </Animate>

            <Animate type="fade-left" delay={100}>
              <div className="flex flex-col">

                <p className="font-body font-semibold text-accent tracking-wide mb-3 uppercase"
                   style={{ fontSize: '12px', letterSpacing: '0.1em' }}>
                  {tab.label}
                </p>

                <h2 className="font-display font-bold text-navy leading-[1.15]
                               tracking-[-0.02em] mb-5"
                    style={{ fontSize: 'clamp(24px, 3vw, 36px)' }}>
                  {tab.heading}
                </h2>

                <p className="font-body text-gray-500 leading-[1.8] mb-8"
                   style={{ fontSize: '15px' }}>
                  {tab.body}
                </p>

                <div className="flex flex-col gap-3 mb-8">
                  {tab.highlights.map((h) => (
                    <div key={h} className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-accent/10 text-accent
                                       flex items-center justify-center shrink-0">
                        <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                          <path d="M3 8l4 4 6-6" stroke="currentColor" strokeWidth="1.8"
                                strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      <span className="font-body text-gray-600" style={{ fontSize: '14px' }}>
                        {h}
                      </span>
                    </div>
                  ))}
                </div>

                <a
                  href="/products"
                  className="inline-flex items-center gap-2 font-body font-medium
                             text-accent border border-accent/40 px-5 py-2.5 rounded-xl
                             transition-all duration-200 no-underline self-start
                             hover:bg-accent hover:text-white hover:border-accent
                             hover:-translate-y-px"
                  style={{ fontSize: '13px' }}
                >
                  View Products
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
                          strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </Animate>
          </div>

          {/* Tab navigation */}
          <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-100">
            <button
              onClick={() => setActiveTab(i => Math.max(0, i - 1))}
              disabled={activeTab === 0}
              className="inline-flex items-center gap-2 font-body text-gray-400
                         disabled:opacity-30 hover:text-accent transition-colors duration-200"
              style={{ fontSize: '13px' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
              Previous
            </button>

            <div className="flex items-center gap-1.5">
              {componentTabs.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className={`rounded-full transition-all duration-200
                              ${i === activeTab
                                ? 'w-5 h-1.5 bg-accent'
                                : 'w-1.5 h-1.5 bg-gray-200 hover:bg-gray-300'}`}
                />
              ))}
            </div>

            <button
              onClick={() => setActiveTab(i => Math.min(componentTabs.length - 1, i + 1))}
              disabled={activeTab === componentTabs.length - 1}
              className="inline-flex items-center gap-2 font-body text-gray-400
                         disabled:opacity-30 hover:text-accent transition-colors duration-200"
              style={{ fontSize: '13px' }}
            >
              Next
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>

        </div>
      </section>

    </main>
  );
}