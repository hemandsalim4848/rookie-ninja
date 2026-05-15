'use client';

import { useState } from 'react';
import Animate from './Animate';
import SectionHeader from './SectionHeader';

/* ── Brand partner logos ── */
const brandPartners = [
  { name: 'Brother',       logo: '/logos/brother-logo.png'       },
  { name: 'Czur',          logo: '/logos/czur-logo.webp'          },
  { name: 'Colortrac',     logo: '/logos/colortrac-logo.png'     },
  { name: 'Canon',         logo: '/logos/canon-logo.png'         },
  { name: 'Rowe',          logo: '/logos/rowe-logo.png'          },
  { name: 'Kodak Alaris',  logo: '/logos/kodak-alaris-logo.png'  },
  { name: 'Contex',        logo: '/logos/contex-logo.png'        },
];

/* ── Scanner tab data ── */
const scannerTabs = [
  {
    id: 'desktop',
    label: 'Desktop Document Scanners',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    images: [
      'https://placehold.co/520x380/EFF6FF/15A7DC?text=Desktop+Scanner+1&font=poppins',
      'https://placehold.co/520x380/EFF6FF/15A7DC?text=Desktop+Scanner+2&font=poppins',
      'https://placehold.co/520x380/EFF6FF/15A7DC?text=Desktop+Scanner+3&font=poppins',
    ],
    heading: 'Efficient Scanning for Workgroups',
    body: 'Ideal for the busy medium-sized organization or single-department application, workgroup and network scanners from Kodak Alaris are perfect for ad hoc scanning and customer-facing transactions.',
    highlights: ['Ad hoc scanning', 'Network ready', 'Customer-facing transactions'],
  },
  {
    id: 'departmental',
    label: 'Departmental Document Scanners',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
    images: [
      'https://placehold.co/520x380/EFF6FF/15A7DC?text=Departmental+Scanner+1&font=poppins',
      'https://placehold.co/520x380/EFF6FF/15A7DC?text=Departmental+Scanner+2&font=poppins',
      'https://placehold.co/520x380/EFF6FF/15A7DC?text=Departmental+Scanner+3&font=poppins',
    ],
    heading: 'Built for Back Office Automation',
    body: 'Departmental scanners are designed to be shared by multiple users in departments that need to capture large batches of documents. Perfect for back office applications, these scanners are built with sophistication to automate your capture process.',
    highlights: ['Multi-user sharing', 'Batch document capture', 'Automated capture process'],
  },
  {
    id: 'production',
    label: 'Production Document Scanners',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    images: [
      'https://placehold.co/520x380/EFF6FF/15A7DC?text=Production+Scanner+1&font=poppins',
      'https://placehold.co/520x380/EFF6FF/15A7DC?text=Production+Scanner+2&font=poppins',
      'https://placehold.co/520x380/EFF6FF/15A7DC?text=Production+Scanner+3&font=poppins',
    ],
    heading: 'High-Volume Centralized Capture',
    body: 'Highly reliable production scanners from Kodak Alaris are ready to tackle the most demanding high-volume, centralized, data capture environments. Intelligent features provide confidence in accurate document conversions.',
    highlights: ['High-volume throughput', 'Centralized data capture', 'Accurate document conversion'],
  },
  {
    id: 'largeformat',
    label: 'Large Format Scanners',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <path d="M3 9h18M3 15h18M9 3v18M15 3v18"/>
      </svg>
    ),
    images: [
      'https://placehold.co/520x380/EFF6FF/15A7DC?text=Large+Format+Scanner+1&font=poppins',
      'https://placehold.co/520x380/EFF6FF/15A7DC?text=Large+Format+Scanner+2&font=poppins',
    ],
    heading: 'Scan A0 & Beyond with Full Fidelity',
    body: 'Large format scanners are used to scan large-sized documents, usually A0 or bigger. A large format graphics scanner needs to be able to capture artwork, photographs, satellite images, and other full-color originals with highlights and shadow details.',
    highlights: ['A0+ document support', 'Full-color fidelity', 'Artwork & satellite imagery'],
  },
  {
    id: 'book',
    label: 'Book Scanners',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
      </svg>
    ),
    images: [
      'https://placehold.co/520x380/EFF6FF/15A7DC?text=Book+Scanner+1&font=poppins',
      'https://placehold.co/520x380/EFF6FF/15A7DC?text=Book+Scanner+2&font=poppins',
    ],
    heading: 'Digitize Bound Books with Ease',
    body: 'Scanning bound books is a difficult task if you are using a traditional scanner, that is where a dedicated book scanner comes in. Book scanners can help anyone needing to scan their books into an electronic document with high efficiency. Some book scanners can even scan 3D objects into 2D images.',
    highlights: ['Bound book compatible', 'High-efficiency digitization', '3D to 2D object scanning'],
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
          <button
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 -translate-y-1/2
                       w-9 h-9 rounded-full bg-white/90 border border-gray-200
                       flex items-center justify-center text-navy
                       hover:bg-white hover:border-accent/40
                       transition-all duration-200 shadow-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2"
                 strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2
                       w-9 h-9 rounded-full bg-white/90 border border-gray-200
                       flex items-center justify-center text-navy
                       hover:bg-white hover:border-accent/40
                       transition-all duration-200 shadow-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2"
                 strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </>
      )}

      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2
                        flex items-center gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to image ${i + 1}`}
              className={`rounded-full transition-all duration-200
                          ${i === current
                            ? 'w-5 h-1.5 bg-accent'
                            : 'w-1.5 h-1.5 bg-white/60 hover:bg-white'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Main Page ── */
export default function ScanSolutionsPage() {
  const [activeTab, setActiveTab] = useState(0);
  const tab = scannerTabs[activeTab];

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
            { label: 'Scanner Categories', value: '5+'  },
            { label: 'Brand Partners',     value: '7+'  },
            { label: 'Models Available',   value: '40+' },
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
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6
                        pt-[120px] pb-20">
          <Animate type="fade-up">
            <div className="inline-flex items-center gap-2 text-[10.5px] font-medium
                            tracking-[0.15em] uppercase text-accent mb-6 px-3.5
                            py-1.5 pl-2 rounded-full border border-[rgba(21,167,220,0.25)]
                            bg-[rgba(21,167,220,0.12)]">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-blink-dot" />
              Scan Solutions
            </div>
          </Animate>

          <Animate type="fade-up" delay={100}>
            <h1 className="font-display font-bold text-white
                           leading-[1.1] tracking-[-0.02em] mb-5 max-w-xl"
                style={{ fontSize: 'clamp(36px, 5vw, 60px)' }}>
              Reliable, Fast &{' '}
              <span className="text-accent">Accurate Scanning</span>
            </h1>
          </Animate>

          <Animate type="fade-up" delay={200}>
            <p className="font-body text-white/60 leading-[1.8] max-w-lg"
               style={{ fontSize: '16px', fontWeight: 300 }}>
              Rookie Ninja offers document scanning and capture solutions designed
              to make your data-scanning and accessing journey reliable, fast, and
              accurate — enhancing efficiency and effectiveness.
            </p>
          </Animate>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          DOCUMENT SCANNERS INTRO
      ══════════════════════════════════════════ */}
      <section className="py-24 px-6 border-t border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto">
          <Animate type="fade-up">
            <SectionHeader
              label="Our Products"
              heading="Document Scanners"
              subheading="Through our expertise and advanced technologies, we ensure seamless access to your valuable data, providing you with the necessary tools and technologies you need to optimize your data capture and management processes and help you make well-informed decisions that drive success and efficiency."
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
                    className="h-8 w-auto object-contain
                               transition-opacity duration-200"
                    style={{ maxWidth: '120px' }}
                  />
                </div>
              ))}
            </div>
          </Animate>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SCANNER TYPE TABS
      ══════════════════════════════════════════ */}
      <section className="py-24 px-6 border-t border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto">

          {/* Tab buttons */}
          <Animate type="fade-up">
            <div className="flex flex-wrap gap-2 mb-12 border-b border-gray-100 pb-6">
              {scannerTabs.map((t, i) => (
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
               className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16
                          items-center">

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
                          <path d="M3 8l4 4 6-6"
                                stroke="currentColor" strokeWidth="1.8"
                                strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      <span className="font-body text-gray-600"
                            style={{ fontSize: '14px' }}>
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
                    <path d="M3 8h10M9 4l4 4-4 4"
                          stroke="currentColor" strokeWidth="1.5"
                          strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </Animate>
          </div>

          {/* Tab navigation */}
          <div className="flex items-center justify-between mt-12 pt-8
                          border-t border-gray-100">
            <button
              onClick={() => setActiveTab(i => Math.max(0, i - 1))}
              disabled={activeTab === 0}
              className="inline-flex items-center gap-2 font-body text-gray-400
                         disabled:opacity-30 hover:text-accent transition-colors
                         duration-200"
              style={{ fontSize: '13px' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="2"
                   strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
              Previous
            </button>

            <div className="flex items-center gap-1.5">
              {scannerTabs.map((_, i) => (
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
              onClick={() => setActiveTab(i => Math.min(scannerTabs.length - 1, i + 1))}
              disabled={activeTab === scannerTabs.length - 1}
              className="inline-flex items-center gap-2 font-body text-gray-400
                         disabled:opacity-30 hover:text-accent transition-colors
                         duration-200"
              style={{ fontSize: '13px' }}
            >
              Next
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="2"
                   strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>

        </div>
      </section>

    </main>
  );
}