'use client';

import { useState } from 'react';
import Animate from '../Animate';
import SectionHeader from '../SectionHeader';

/* ── Brand partner logos ── */
const brandPartners = [
  { name: 'ViewSonic', logo: '/logos/viewsonic-logo.webp' },
  { name: 'UNV',       logo: '/logos/unv-logo.svg'       },
  { name: 'Dahua',     logo: '/logos/dahua-logo.png'     },
  { name: 'Aztech',    logo: '/logos/aztech-logo.png'    },
];

/* ── AV tab data ── */
const avTabs = [
  {
    id: 'projectors',
    label: 'Projectors',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="10" rx="2"/>
        <circle cx="17" cy="12" r="2"/>
        <path d="M7 12h4"/>
        <path d="M5 19l2-2M19 19l-2-2"/>
      </svg>
    ),
    images: [
      'https://res.cloudinary.com/df52xzi3y/image/upload/v1782317568/rookie-ninja/products/lg_1000p_f97f37c5-12e8-49aa-b212-c109b755f2de.webp',
      'https://res.cloudinary.com/df52xzi3y/image/upload/v1782317600/rookie-ninja/products/lg_1000p_cbb6a5e7-a1be-4ac3-8ab9-25ede86a5956.webp',
      'https://res.cloudinary.com/df52xzi3y/image/upload/v1782317619/rookie-ninja/products/lg_1000p_b00ee596-e159-41b7-82dc-00a165d15309.webp',
    ],
    heading: 'Modern Projection for Every Space',
    body: 'Just as other types of meeting rooms and collaboration technology, projectors continue to evolve, improve, and simplify our everyday life. From the evolution of overhead projectors and slide presentations, today\'s modern projectors offer 4K images, wireless connectivity, interactive capabilities, and can even provide clear images in brightly lit rooms.',
    highlights: ['4K image quality', 'Wireless connectivity', 'Bright room performance'],
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
      'https://res.cloudinary.com/df52xzi3y/image/upload/v1781981561/rookie-ninja/products/lg_1000p_1052131f-7781-4704-af52-28a6d38e7339.webp',
      'https://res.cloudinary.com/df52xzi3y/image/upload/v1781981716/rookie-ninja/products/lg_1000p_d131ad5b-e43f-4115-a8c9-ca6c07b7c70b.webp',
      'https://res.cloudinary.com/df52xzi3y/image/upload/v1781981773/rookie-ninja/products/lg_1000p_79a60fcc-62c7-4972-8263-12b5e98a9e16.webp',
    ],
    heading: 'Immersive Viewing for Every Need',
    body: 'As monitors are the heart and soul of computers, enabling viewers to interact, aids in carrying out day-to-day operations and making informed decisions. Rookie Ninja offers an array of viewing solutions from mainstream and business monitors to gaming and professionals providing users with smooth, immersive experiences, that suits your need. Choosing the right monitor type is crucial for optimal performance and visual satisfaction in specific sectors.',
    highlights: ['Business to professional grade', 'Gaming & mainstream options', 'Smooth immersive display'],
  },
  {
    id: 'commercial',
    label: 'Commercial Displays',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M2 7h20M8 21h8M12 17v4"/>
        <path d="M7 11h2M11 11h6"/>
      </svg>
    ),
    images: [
      'https://res.cloudinary.com/df52xzi3y/image/upload/v1781981049/rookie-ninja/products/lg_1000p_5934ffd0-9b12-463a-87fa-f46d2a8128b4.webp',
      'https://res.cloudinary.com/df52xzi3y/image/upload/v1781988814/rookie-ninja/products/lg_1000p_538c3040-dd51-40a0-aa43-e97aaa169112.webp',
      'https://res.cloudinary.com/df52xzi3y/image/upload/v1781988810/rookie-ninja/products/Digital-signage-05.jpg',
    ],
    heading: 'Professional Displays for Demanding Environments',
    body: 'Create engaging and meaningful client interactions with Rookie Ninja\'s commercial display solutions. Designed for demanding environments, delivering high durability and performance for professional applications like digital signage, control rooms, study spaces, and retail. Unlike consumer televisions, commercial displays provide higher brightness, robust design, and multi-source viewing orientation.',
    highlights: ['Digital signage & retail ready', 'Higher brightness output', 'Robust multi-source design'],
  },
  {
    id: 'interactive',
    label: 'Interactive Display Solutions',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8M12 17v4"/>
        <path d="M9 8l2 2-2 2M13 10h3"/>
      </svg>
    ),
    images: [
      'https://res.cloudinary.com/df52xzi3y/image/upload/v1781981357/rookie-ninja/products/lg_1000p_78eca281-76ee-413a-8662-34801346d1d7.webp',
      'https://res.cloudinary.com/df52xzi3y/image/upload/v1783680061/aztech-aztech-ideaflow-bright-75-4k-interactive-display-0-AZTECH-Smart-Interacti.jpg',
      'https://res.cloudinary.com/df52xzi3y/image/upload/v1781885509/rookie-ninja/products/unv-75-scaled.webp',
      'https://res.cloudinary.com/df52xzi3y/image/upload/v1782316603/rookie-ninja/products/LPH75-MC420-C-S2-4.webp',
    ],
    heading: 'Collaborate Like Never Before',
    body: 'Whether you need to create dynamically engaging lessons or promote a collaborative meeting environment, an interactive flat panel is the perfect solution. Interactive displays deliver the ultimate collaboration solutions; whether your conference room needs an interactive display, video conferencing, or both, interactive displays let you connect and collaborate like never before.',
    highlights: ['Engaging lesson delivery', 'Conference room ready', 'Video conferencing integration'],
  },
  {
    id: 'videoconf',
    label: 'Video Conferencing',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 7l-7 5 7 5V7z"/>
        <rect x="1" y="5" width="15" height="14" rx="2"/>
      </svg>
    ),
    images: [
      'https://res.cloudinary.com/df52xzi3y/image/upload/v1782317650/rookie-ninja/products/lg_1000p_0d0639d9-0429-4a70-a4a9-f08bcb1ed4aa.webp',
      'https://res.cloudinary.com/df52xzi3y/image/upload/v1782317628/rookie-ninja/products/lg_1000p_4f68aab8-d7d2-44fe-8439-381e819ef6d7.webp',
      'https://res.cloudinary.com/df52xzi3y/image/upload/v1782317665/rookie-ninja/products/lg_1000p_9a2b748c-f75c-42b1-bcc4-35e2f22256c0.webp',
    ],
    heading: 'Remote Collaboration, Redefined',
    body: 'Video conferencing solutions are crucial in today\'s era for remote collaboration, to enhance productivity, save cost, and improve communication quality. At Rookie Ninja, we stand out as a reliable and technologically advanced provider of video conferencing solutions, and premium video conferencing accessories, that offer customization, integration capabilities, and expert support guidance to ensure your needs are met.',
    highlights: ['Enhanced remote productivity', 'Custom integration support', 'Premium AV accessories'],
  },
];

/* ── Image Slider ── */
function ImageSlider({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent(i => (i - 1 + images.length) % images.length);
  const next = () => setCurrent(i => (i + 1) % images.length);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-white border border-gray-100"
         style={{ aspectRatio: '520/380' }}>
      <img
        key={current}
        src={images[current]}
        alt={`Product image ${current + 1}`}
        className="w-full h-full object-contain p-10 transition-opacity duration-300"
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
export default function AudioVisualPage() {
  const [activeTab, setActiveTab] = useState(0);
  const tab = avTabs[activeTab];

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
            { label: 'AV Categories',      value: '5+'  },
            { label: 'Brand Partners',     value: '4+'  },
            { label: 'Products Available', value: '80+' },
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
              Audio Visual
            </div>
          </Animate>

          <Animate type="fade-up" delay={100}>
            <h1 className="font-display font-bold text-white leading-[1.1]
                           tracking-[-0.02em] mb-5 max-w-xl"
                style={{ fontSize: 'clamp(36px, 5vw, 60px)' }}>
              Immersive Audio-Visual{' '}
              <span className="text-accent">Excellence</span>
            </h1>
          </Animate>

          <Animate type="fade-up" delay={200}>
            <p className="font-body text-white/60 leading-[1.8] max-w-lg"
               style={{ fontSize: '16px', fontWeight: 300 }}>
              Rookie Ninja is proudly leading the way by delivering diversified audio
              and display solutions, enabling businesses and individuals alike to enjoy
              big-screen experiences with enhanced audio performance.
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
              label="Audio Visual"
              heading="Amplifying Your AV Experiences"
              subheading="In this constantly evolving world where technology is booming, having the right communication tools is crucial for business growth and success. We help businesses communicate efficiently and achieve their business goals. Whether start-up businesses or renowned firms in their prime, we deliver exceptional services to meet your expectations."
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
          AV CATEGORY TABS
      ══════════════════════════════════════════ */}
      <section className="py-24 px-6 border-t border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto">

          {/* Tab buttons */}
          <Animate type="fade-up">
            <div className="flex flex-wrap gap-2 mb-12 border-b border-gray-100 pb-6">
              {avTabs.map((t, i) => (
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
              {avTabs.map((_, i) => (
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
              onClick={() => setActiveTab(i => Math.min(avTabs.length - 1, i + 1))}
              disabled={activeTab === avTabs.length - 1}
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