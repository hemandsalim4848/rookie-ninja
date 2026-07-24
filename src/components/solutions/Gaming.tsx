'use client';

import { useState } from 'react';
import Animate from '../Animate';
import SectionHeader from '../SectionHeader';
import Link from 'next/link';
import { BRAND_LOGOS } from '@/src/lib/brandLogos';

/* ── Brand partner logos ── */
const brandPartners = [
  { name: 'ViewSonic', logo: BRAND_LOGOS.viewsonic },
  { name: 'Aerocool',  logo: BRAND_LOGOS.aerocool  },
  { name: 'MSI',       logo: BRAND_LOGOS.msi       },
  { name: 'Aztech',    logo: BRAND_LOGOS.aztech    },
];

/* ── Gaming tab data ── */
const gamingTabs = [
  {
    id: 'monitors',
    label: 'Gaming Monitors',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    images: [
      'https://res.cloudinary.com/df52xzi3y/image/upload/v1781981917/rookie-ninja/products/lg_1000p_d4e29727-9815-4082-9095-cee44fc0d09e.webp',
      'https://res.cloudinary.com/df52xzi3y/image/upload/v1781981844/rookie-ninja/products/lg_1000p_ead60cc2-e0b2-4608-97d7-61ff20436849.webp',
      'https://res.cloudinary.com/df52xzi3y/image/upload/v1781981908/rookie-ninja/products/lg_1000p_1a710fc0-0a99-44ee-9f9c-fd22f59366ad.webp',
    ],
    heading: 'Immersive Visuals, Zero Compromise',
    body: 'Gaming monitors offer immersive visuals with high refresh rates and fast response times, enhancing gameplay. They minimize input lag for faster, more responsive gameplay and prioritize eye comfort during extended gaming sessions. With adaptive sync and customizable settings, gamers can personalize their visual experience to their liking.',
    highlights: ['High refresh rates', 'Adaptive sync technology', 'Low input lag'],
  },
  {
    id: 'peripherals',
    label: 'Gaming Peripherals',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="7"/>
        <path d="M12 6v4M10 8h4"/>
      </svg>
    ),
    images: [
      'https://res.cloudinary.com/df52xzi3y/image/upload/v1783682089/aztech-aztech-wireless-gaming-headset-with-led-0-Product-images_Headphone-01.jpg',
      'https://res.cloudinary.com/df52xzi3y/image/upload/v1783682126/aztech-aztech-mechanical-gaming-keyboard-rgb-0-rcb-keyboard-view.jpg',
      'https://res.cloudinary.com/df52xzi3y/image/upload/v1783682109/aztech-aztech-gaming-mouse-infrared-micro-switch-laser-0-mouse-top-view.jpg',
    ],
    heading: 'Precision, Control & Comfort',
    body: 'Gaming peripherals are the core components for elevating gamers\' experiences. Rookie Ninja offers premium gaming peripherals such as monitors, keyboards, mice, mousepads, headsets, CPU cases, and more to maximize control, precision, and responsiveness, and optimize performance. Designed for durability and comfort during long gaming sessions, ensuring a comfortable and immersive gaming experience. Level up your gameplay with Rookie Ninja.',
    highlights: ['Keyboards, mice & headsets', 'Designed for durability', 'Optimized for performance'],
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
      'https://res.cloudinary.com/df52xzi3y/image/upload/v1781989260/rookie-ninja/products/B508A-bk-Infographics-1_1-removebg-preview.webp',
      'https://res.cloudinary.com/df52xzi3y/image/upload/v1781989307/rookie-ninja/products/Beam-Product-Photo-Gallery-1042x589-FRGB-04.png',
      'https://res.cloudinary.com/df52xzi3y/image/upload/v1781989335/rookie-ninja/products/Designer-V2-Product-Gallery-4.webp',
    ],
    heading: 'Build Your Perfect Setup',
    body: 'CPU cabinets protect and organise your components, ensure proper airflow and cooling, and allow for easy expansion. Whether you\'re a gamer, a professional, or a casual user, a reliable CPU cabinet is essential for optimal performance and longevity. Upgrade your setup with the perfect CPU cabinet from Rookie Ninja.',
    highlights: ['Proper airflow & cooling', 'Easy component access', 'Expandable & upgradeable'],
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
      'https://res.cloudinary.com/df52xzi3y/image/upload/v1781989220/rookie-ninja/products/Cylon4F-Product-Photo-Gallery-1042x589-07.webp',
      'https://res.cloudinary.com/df52xzi3y/image/fetch/f_auto,q_auto/https://aerocool.io/wp-content/uploads/2025/10/abyssL240R-digi_product-gallery_bk_1.png',
      'https://res.cloudinary.com/df52xzi3y/image/upload/v1783682137/aztech-aztech-360mm-black-liquid-cooler-0-360black2.webp',
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
      'https://res.cloudinary.com/df52xzi3y/image/upload/v1781989376/rookie-ninja/products/Integrator-Gold-750W-Gallery-Images-05.webp',
      'https://res.cloudinary.com/df52xzi3y/image/upload/v1781989389/rookie-ninja/products/Lux-550W-Photo-Gallery-1042x589-01.webp',
      'https://res.cloudinary.com/df52xzi3y/image/upload/v1781989408/rookie-ninja/products/Mirage-Gold-850W-Fully-Modular-Gallery-Image-5-removebg-preview.webp',
    ],
    heading: 'Reliable Power for Every Build',
    body: 'Rookie Ninja offers a wide range of power supply solutions designed for various computing needs, from everyday home and office systems to gaming setups and professional workstations. Our PSUs are built with efficient power delivery, reliable components, and advanced protection features to ensure safe and stable system performance.',
    highlights: ['Efficient power delivery', 'Advanced protection features', 'Stable system performance'],
  },
  {
    id: 'gpu',
    label: 'Graphics Cards',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="20" height="12" rx="2"/>
        <circle cx="7" cy="12" r="2"/>
        <path d="M13 9h6M13 12h6M13 15h4"/>
      </svg>
    ),
    images: [
      'https://res.cloudinary.com/df52xzi3y/image/fetch/f_auto,q_auto/https://products.rookie-ninja.com/wp-content/uploads/2025/10/GeForce-RTX%E2%84%A2-5070-12G-GAMING-TRIO.webp',
      'https://res.cloudinary.com/df52xzi3y/image/fetch/f_auto,q_auto/https://products.rookie-ninja.com/wp-content/uploads/2025/10/GeForce-RTX%E2%84%A2-5080-16G-GAMING-TRIO.webp',
      'https://res.cloudinary.com/df52xzi3y/image/fetch/f_auto,q_auto/https://products.rookie-ninja.com/wp-content/uploads/2025/09/GeForce-RTX%E2%84%A2-5090-32G-GAMING-TRIO-1.png',
    ],
    heading: 'Powered by NVIDIA Blackwell',
    body: 'Rookie Ninja distributes the latest MSI GeForce RTX 50 Series graphics cards, built on the NVIDIA Blackwell architecture. With DLSS 4 and Multi Frame Generation, GDDR7 memory, and MSI\'s TRI FROZR 4 triple-fan cooling, these cards deliver the performance headroom serious gamers and creators need — from the 12GB RTX 5070 up to the flagship 32GB RTX 5090.',
    highlights: ['NVIDIA Blackwell architecture', 'DLSS 4 with Multi Frame Generation', 'TRI FROZR 4 cooling'],
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
export default function GamingPage() {
  const [activeTab, setActiveTab] = useState(0);
  const tab = gamingTabs[activeTab];

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
            { label: 'Gaming Categories', value: '6+'  },
            { label: 'Brand Partners',    value: '4+'  },
            { label: 'Products Available',value: '50+'},
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
              Gaming
            </div>
          </Animate>

          <Animate type="fade-up" delay={100}>
            <h1 className="font-display font-bold text-white leading-[1.1]
                           tracking-[-0.02em] mb-5 max-w-xl"
                style={{ fontSize: 'clamp(36px, 5vw, 60px)' }}>
              Level Up Your{' '}
              <span className="text-accent">Gaming Experience</span>
            </h1>
          </Animate>

          <Animate type="fade-up" delay={200}>
            <p className="font-body text-white/60 leading-[1.8] max-w-lg"
               style={{ fontSize: '16px', fontWeight: 300 }}>
              Rookie Ninja proudly distributes technology from renowned gaming brands,
              providing a comprehensive portfolio of gaming equipment across the region.
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
              label="Gaming"
              heading="Unlock the World of Gaming"
              subheading="Our partnership with leading gaming brands ensures that we deliver exceptional quality and the latest innovations to enhance your gaming experience. With our extensive selection of gaming equipment, you can trust Rookie Ninja to provide the best-in-class products from the world's top gaming brands."
              align="center"
            />
          </Animate>

          <Animate type="fade-up" delay={100}>
            <div className="flex justify-center mt-8">
              <Link 
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
              </Link>
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
          GAMING CATEGORY TABS
      ══════════════════════════════════════════ */}
      <section className="py-24 px-6 border-t border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto">

          {/* Tab buttons */}
          <Animate type="fade-up">
            <div className="flex flex-wrap gap-2 mb-12 border-b border-gray-100 pb-6">
              {gamingTabs.map((t, i) => (
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

            {/* Left — image slider */}
            <Animate type="fade-right">
              <ImageSlider images={tab.images} />
            </Animate>

            {/* Right — content */}
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
              {gamingTabs.map((_, i) => (
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
              onClick={() => setActiveTab(i => Math.min(gamingTabs.length - 1, i + 1))}
              disabled={activeTab === gamingTabs.length - 1}
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