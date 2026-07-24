'use client';

import { useState } from 'react';
import Animate from '../Animate';
import SectionHeader from '../SectionHeader';
import Link from 'next/link';
import { BRAND_LOGOS } from '@/src/lib/brandLogos';

/* ── Brand partner logos ── */
const brandPartners = [
  { name: 'Aztech', logo: BRAND_LOGOS.aztech },
];

/* ── IT Accessories tab data ── */
const accessoryTabs = [
  {
    id: 'audio',
    label: 'Audio Accessories',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 18v-6a9 9 0 0118 0v6"/>
        <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"/>
      </svg>
    ),
    images: [
      'https://res.cloudinary.com/df52xzi3y/image/upload/v1783682053/aztech-aztech-waterproof-portable-speaker-0-Product-images_Speaker-01.jpg',
      'https://res.cloudinary.com/df52xzi3y/image/upload/v1783680092/aztech-aztech-501-soundbar-with-wired-subwoofer-0-Product-images_Soundbar-5-1-01.jpg',
      'https://res.cloudinary.com/df52xzi3y/image/upload/v1783682058/aztech-aztech-wireless-earbuds-led-display-charging-case-0-Product-images_TWS-01.jpg',
    ],
    heading: 'Superior Sound for Every Moment',
    body: 'Experience music like never before with Rookie Ninja\'s audio accessories. From earbuds and speakers to headsets and audio adapters, we offer superior sound quality, performance, connectivity, and convenience for all your audio needs. Elevate your audio entertainment, gaming, and communication experiences with us.',
    highlights: ['Earbuds, headsets & speakers', 'Superior sound quality', 'Gaming & communication ready'],
  },
  {
    id: 'mobile',
    label: 'Mobile Accessories',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2"/>
        <path d="M12 18h.01"/>
      </svg>
    ),
    images: [
      'https://res.cloudinary.com/df52xzi3y/image/upload/v1783682043/aztech-aztech-supersonic-wired-earphone-type-c-1m-0-Product-images_Earphone-Wire.jpg',
      'https://res.cloudinary.com/df52xzi3y/image/upload/v1783682032/aztech-aztech-gan-car-hypercharger-3-ports-95w-0-Product-images_Car-Charger2-02-.jpg',
      'https://res.cloudinary.com/df52xzi3y/image/upload/v1783682027/aztech-aztech-gan-ii-hypercharger-dual-ports-45w-0-Product-images_Gan2-01.jpg',
    ],
    heading: 'Enhance Your Mobile Lifestyle',
    body: 'As mobile phones are the gateway to new opportunities, the necessity of mobile accessories is always on the rise. At Rookie Ninja, we provide solutions with premium functionality, convenience, personalization, and improved productivity. Our mobile accessories include smartwatches, neckbands, earphones and headphones, and more.',
    highlights: ['Smartwatches & neckbands', 'Earphones & headphones', 'Premium functionality'],
  },
  {
    id: 'cables',
    label: 'Cable Solutions',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 9a2 2 0 012-2h12a2 2 0 012 2v1a2 2 0 01-2 2H6a2 2 0 01-2-2V9zM8 7V5M16 7V5M8 14v5M16 14v5"/>
      </svg>
    ),
    images: [
      'https://res.cloudinary.com/df52xzi3y/image/upload/v1783682039/aztech-aztech-hypercable-usb-c-240w-1m-black-0-WhatsApp-Image-2024-12-17-at-12-4.jpg',
      'https://res.cloudinary.com/df52xzi3y/image/upload/v1783682040/aztech-aztech-hypercable-usb-c-240w-2m-titanium-0-WhatsApp-Image-2024-12-17-at-1.jpg',
      'https://res.cloudinary.com/df52xzi3y/image/upload/v1783682017/aztech-aztech-hypercable-usb-c-60w-1m-black-0-Product-images_Cable-01-76.jpg',
    ],
    heading: 'Fast, Reliable & Durable Connectivity',
    body: 'Cabling solutions play a vital role in providing seamless connectivity and immediate data flow in order to carry out our day-to-day operations. Rookie Ninja cable solutions offer fast, reliable, durable, and exceptional power and connection. Whether video cables, charging, or audio cables, Rookie Ninja provides the right solutions to meet your needs.',
    highlights: ['Video, charging & audio cables', 'Fast & reliable data flow', 'Durable build quality'],
  },
  {
    id: 'adapters',
    label: 'Adapters',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 3a3 3 0 00-3 3v12a3 3 0 006 0V6a3 3 0 00-3-3zM6 3a3 3 0 00-3 3v12a3 3 0 006 0V6a3 3 0 00-3-3zM3 9h6M15 9h6M3 15h6M15 15h6"/>
      </svg>
    ),
    images: [
      'https://res.cloudinary.com/df52xzi3y/image/upload/v1783682020/aztech-aztech-gan-hypercharger-3-ports-70w-0-Product-images_Gan3-01.jpg',
      'https://res.cloudinary.com/df52xzi3y/image/upload/v1783682038/aztech-aztech-gan-car-hypercharger-dual-ports-95w-0-Product-images_Car-Charger-0.jpg',
    ],
    heading: 'Bridge the Gap Between Devices',
    body: 'Adapters are essential for connectivity and compatibility between devices, bridging the gap between seamless communication, data transfer, and success. Rookie Ninja provides flexible solutions to connect otherwise incompatible devices, maximizing technology investments. Whether IT adapters or gaming or business or home, we offer ideal solutions to meet your specific needs.',
    highlights: ['Universal device compatibility', 'Seamless data transfer', 'IT, gaming & home use'],
  },
  {
    id: 'surge',
    label: 'Surge Protectors & Power Strips',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
    images: [
      'https://res.cloudinary.com/df52xzi3y/image/upload/v1783682067/aztech-aztech-powerflow-3-way-3m-universal-extension-0-Product-images_Extenstion.jpg',
      'https://res.cloudinary.com/df52xzi3y/image/upload/v1783682081/aztech-aztech-powerflow-4-way-5m-universal-extension-0-Product-images_Extenstion.jpg',
      'https://res.cloudinary.com/df52xzi3y/image/upload/v1783682074/aztech-aztech-powerflow-5-way-3m-universal-extension-0-Product-images_Extenstion.jpg',
    ],
    heading: 'Protect What Matters Most',
    body: 'Rookie Ninja offers reliable surge protectors and power strips to protect your electronic devices in today\'s power-sensitive world. With multiple outlets for convenient connectivity and a focus on safety and security standards, we prioritize safeguarding your equipment. Trust us to provide the reliable products you need to ensure the safety of your electronic devices.',
    highlights: ['Multi-outlet connectivity', 'Safety & security standards', 'Device surge protection'],
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
export default function ITAccessoriesPage() {
  const [activeTab, setActiveTab] = useState(0);
  const tab = accessoryTabs[activeTab];

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
            { label: 'Accessory Categories', value: '5+'  },
            { label: 'Brand Partners',       value: '1+'  },
            { label: 'Products Available',   value: '120+'},
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
              IT Accessories
            </div>
          </Animate>

          <Animate type="fade-up" delay={100}>
            <h1 className="font-display font-bold text-white leading-[1.1]
                           tracking-[-0.02em] mb-5 max-w-xl"
                style={{ fontSize: 'clamp(36px, 5vw, 60px)' }}>
              Top-of-the-Range{' '}
              <span className="text-accent">Tech Products</span>
            </h1>
          </Animate>

          <Animate type="fade-up" delay={200}>
            <p className="font-body text-white/60 leading-[1.8] max-w-lg"
               style={{ fontSize: '16px', fontWeight: 300 }}>
              From smartwatches and TWS earbuds to cables, power banks, and more —
              Rookie Ninja brings you the latest and most innovative tech products
              to make your life easier and more convenient.
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
              label="IT Accessories"
              heading="Stay Connected, Stay Productive"
              subheading="Rookie Ninja is your one-stop destination for the latest and greatest in technology products. We're passionate about bringing you the best tech gadgets to enhance your life. Get ready to embrace the future with our extensive range of mobility and lifestyle solutions."
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
          ACCESSORY TABS
      ══════════════════════════════════════════ */}
      <section className="py-24 px-6 border-t border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto">

          {/* Tab buttons */}
          <Animate type="fade-up">
            <div className="flex flex-wrap gap-2 mb-12 border-b border-gray-100 pb-6">
              {accessoryTabs.map((t, i) => (
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
              {accessoryTabs.map((_, i) => (
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
              onClick={() => setActiveTab(i => Math.min(accessoryTabs.length - 1, i + 1))}
              disabled={activeTab === accessoryTabs.length - 1}
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