'use client';

import { useState } from 'react';
import Animate from '../Animate';
import SectionHeader from '../SectionHeader';

/* ── Brand partner logos ── */
const brandPartners = [
  { name: 'Fujitsu', logo: '/logos/fujitsu-logo.svg' },
  { name: 'Brother', logo: '/logos/brother-logo.png' },
  { name: 'Deli',    logo: '/logos/deli-logo.png'    },
];

/* ── Printer tab data ── */
const printerTabs = [
  {
    id: 'laser',
    label: 'Laser Printers',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2"/>
        <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
        <line x1="12" y1="12" x2="12" y2="16"/>
        <line x1="10" y1="14" x2="14" y2="14"/>
      </svg>
    ),
    images: [
      'https://placehold.co/520x380/EFF6FF/15A7DC?text=Laser+Printer+1&font=poppins',
      'https://placehold.co/520x380/EFF6FF/15A7DC?text=Laser+Printer+2&font=poppins',
      'https://placehold.co/520x380/EFF6FF/15A7DC?text=Laser+Printer+3&font=poppins',
    ],
    heading: 'Speed, Precision & Professional Quality',
    body: 'Offering exceptional speed, efficiency, and versatility. Laser printers utilize precision and sharpness to produce professional-looking documents. Whether high-quality color or black-and-white prints, laser printers deliver high-volume printing without compromising on quality, making them the ideal choice for home and office use.',
    highlights: ['High-volume output', 'Sharp text quality', 'Low cost per page'],
  },
  {
    id: 'inkjet',
    label: 'Inkjet Printers',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L8 8H4l4 4-2 6 6-4 6 4-2-6 4-4h-4z"/>
      </svg>
    ),
    images: [
      'https://placehold.co/520x380/EFF6FF/15A7DC?text=Inkjet+Printer+1&font=poppins',
      'https://placehold.co/520x380/EFF6FF/15A7DC?text=Inkjet+Printer+2&font=poppins',
      'https://placehold.co/520x380/EFF6FF/15A7DC?text=Inkjet+Printer+3&font=poppins',
    ],
    heading: 'Vibrant Color & Versatile Output',
    body: 'Inkjet printers offer versatility and vibrant color sharpness, making them ideal for delivering visually appealing prints. They provide high-efficiency output with low energy usage, fit for workstations, offices, and home use. With minimal moving parts, they eliminate common printer issues like frequent maintenance and breakdowns.',
    highlights: ['Vivid color accuracy', 'Energy efficient', 'Low maintenance'],
  },
  {
    id: 'dotmatrix',
    label: 'Dot Matrix Printers',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <circle cx="5" cy="5" r="1.5" fill="currentColor"/>
        <circle cx="12" cy="5" r="1.5" fill="currentColor"/>
        <circle cx="19" cy="5" r="1.5" fill="currentColor"/>
        <circle cx="5" cy="12" r="1.5" fill="currentColor"/>
        <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
        <circle cx="19" cy="12" r="1.5" fill="currentColor"/>
        <circle cx="5" cy="19" r="1.5" fill="currentColor"/>
        <circle cx="12" cy="19" r="1.5" fill="currentColor"/>
        <circle cx="19" cy="19" r="1.5" fill="currentColor"/>
      </svg>
    ),
    images: [
      'https://placehold.co/520x380/EFF6FF/15A7DC?text=Dot+Matrix+1&font=poppins',
      'https://placehold.co/520x380/EFF6FF/15A7DC?text=Dot+Matrix+2&font=poppins',
    ],
    heading: 'Reliable Impact Printing Technology',
    body: 'A Dot Matrix Printer is an impact printing device that produces text and graphics by striking a series of tiny pins against an ink-soaked ribbon, which transfers ink onto the paper. The print head contains multiple pins arranged in a vertical column, and these pins move rapidly to create characters and images as patterns of small dots. Because the printing is formed from many dots arranged in a matrix, the technology is known as "dot matrix."',
    highlights: ['Multi-part forms', 'Continuous paper feed', 'Durable & rugged'],
  },
  {
    id: 'mfp',
    label: 'Multi-Function Printers',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2"/>
        <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
        <path d="M7 13h.01M7 17h.01M11 13h6M11 17h6"/>
      </svg>
    ),
    images: [
      'https://placehold.co/520x380/EFF6FF/15A7DC?text=MFP+1&font=poppins',
      'https://placehold.co/520x380/EFF6FF/15A7DC?text=MFP+2&font=poppins',
      'https://placehold.co/520x380/EFF6FF/15A7DC?text=MFP+3&font=poppins',
    ],
    heading: 'Print, Copy, Scan & Fax — All in One',
    body: 'Multi-function printers allow you to print, copy, scan, or fax from one device. And with a range of built-in functions, multi-function printers help improve productivity and efficiency while being cost-effective. As their all-in-one design helps in better space optimization.',
    highlights: ['4-in-1 functionality', 'Space saving design', 'Cost effective'],
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
      {/* Image */}
      <img
        key={current}
        src={images[current]}
        alt={`Product image ${current + 1}`}
        className="w-full h-full object-cover transition-opacity duration-300"
      />

      {/* Arrows */}
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

      {/* Dots */}
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
export default function PrintSolutionsPage() {
  const [activeTab, setActiveTab] = useState(0);
  const tab = printerTabs[activeTab];

  return (
    <main className="bg-white">

      {/* ══════════════════════════════════════════
          HERO BANNER
      ══════════════════════════════════════════ */}
      <section className="relative min-h-[55vh] flex items-center overflow-hidden">
        {/* Background layers */}
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
            { label: 'Product Categories', value: '4+' },
            { label: 'Brand Partners',     value: '8+' },
            { label: 'Models Available',   value: '50+' },
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
              Print Solutions
            </div>
          </Animate>

          <Animate type="fade-up" delay={100}>
            <h1 className="font-display font-bold text-white
                           leading-[1.1] tracking-[-0.02em] mb-5 max-w-xl"
                style={{ fontSize: 'clamp(36px, 5vw, 60px)' }}>
              High-Performance{' '}
              <span className="text-accent">Print Technology</span>
            </h1>
          </Animate>

          <Animate type="fade-up" delay={200}>
            <p className="font-body text-white/60 leading-[1.8] max-w-lg"
               style={{ fontSize: '16px', fontWeight: 300 }}>
              Maximize productivity while minimizing operational costs with our
              comprehensive range of print solutions designed to meet every
              personal and professional need.
            </p>
          </Animate>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PRINTERS INTRO
      ══════════════════════════════════════════ */}
      <section className="py-24 px-6 border-t border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto">
          <Animate type="fade-up">
            <SectionHeader
              label="Our Products"
              heading="Printers"
              subheading="Our diverse collection of printing solutions caters to different requirements to help you find the ideal option that meets your specific printing demands. From compact and efficient printers for personal use to high-capacity and robust models for commercial and industrial applications."
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
          PRINTER TYPE TABS
      ══════════════════════════════════════════ */}
      <section className="py-24 px-6 border-t border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto">

          {/* Tab buttons */}
          <Animate type="fade-up">
            <div className="flex flex-wrap gap-2 mb-12 border-b border-gray-100 pb-6">
              {printerTabs.map((t, i) => (
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

                {/* Tab label */}
                <p className="font-body font-semibold text-accent tracking-wide mb-3 uppercase"
                   style={{ fontSize: '12px', letterSpacing: '0.1em' }}>
                  {tab.label}
                </p>

                {/* Heading */}
                <h2 className="font-display font-bold text-navy leading-[1.15]
                               tracking-[-0.02em] mb-5"
                    style={{ fontSize: 'clamp(24px, 3vw, 36px)' }}>
                  {tab.heading}
                </h2>

                {/* Body */}
                <p className="font-body text-gray-500 leading-[1.8] mb-8"
                   style={{ fontSize: '15px' }}>
                  {tab.body}
                </p>

                {/* Highlights */}
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

                {/* CTA */}
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

          {/* Tab navigation arrows (mobile-friendly) */}
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
              {printerTabs.map((_, i) => (
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
              onClick={() => setActiveTab(i => Math.min(printerTabs.length - 1, i + 1))}
              disabled={activeTab === printerTabs.length - 1}
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