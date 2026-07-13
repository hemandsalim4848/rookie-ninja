'use client';

import { useState } from 'react';
import Animate from '../Animate';
import SectionHeader from '../SectionHeader';

/* ── Brand partner logos ── */
const brandPartners = [
  { name: 'Ezofis',       logo: '/logos/ezofis-logo.png' },
  { name: 'Kodak Alaris',  logo: '/logos/Kodak-alaris-logo.png' },
  { name: 'IRIS',          logo: '/logos/iris-logo.svg' },
];

/* ── Software tab data ── */
const softwareTabs = [
  {
    id: 'ezofis',
    label: 'Ezofis Software',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
    images: [
      'https://res.cloudinary.com/df52xzi3y/image/upload/v1783974121/Takes-away-the-complexity_p83rd7.webp',
    ],
    heading: 'Document Management Solution',
    body: 'We provide end-to-end document management software solutions that simplify the capture, search, approval, security, and legal preservation of documents. The flexible nature of our solution helps to adapt to each organization\'s exact needs, rather than forcing end users to change the way they work.',
    highlights: ['Capture, search & approval workflows', 'Enterprise-grade security', 'Legal & compliance preservation'],
  },
  {
    id: 'kodak',
    label: 'Kodak Software',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
      </svg>
    ),
    images: [
      'https://res.cloudinary.com/df52xzi3y/image/upload/v1781980249/rookie-ninja/products/KODAK-Capture-Pro_png.webp',
      'https://res.cloudinary.com/df52xzi3y/image/upload/v1781980248/rookie-ninja/products/KODAK-Info-Input-Solution-1_png.webp',
    ],
    heading: 'Enterprise Document Capture & Processing',
    body: 'Kodak\'s software suite spans everything from high-volume document capture to AI-powered intelligent document processing. KODAK Capture Pro Software converts paper documents into high-quality digital information with advanced OCR, barcode recognition, and automated indexing, while KODAK Info Input Solution extends this further with AI-powered data extraction and low-code workflow automation — giving your organization a complete toolkit for capturing and processing information at scale.',
    highlights: ['Advanced OCR & barcode recognition', 'AI-powered data extraction', 'Low-code workflow automation'],
  },
  {
    id: 'readiris',
    label: 'Readiris Software',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <path d="M9 15h6M9 12h6"/>
      </svg>
    ),
    images: [
      'https://res.cloudinary.com/df52xzi3y/image/upload/v1781980255/rookie-ninja/products/RIPDF25-new-eshop-660x660-04-en-min.webp',
      'https://res.cloudinary.com/df52xzi3y/image/upload/v1781980252/rookie-ninja/products/RIPDF25-new-eshop-660x660-01-en-min.webp',
    ],
    heading: 'Powerful PDF Creation, Editing & OCR',
    body: 'Readiris PDF software makes it effortless to create, edit, and manage PDF documents with industry-leading OCR support for 137 languages. Readiris PDF Essential covers the core essentials — converting, merging, splitting, and organizing PDFs — while Readiris PDF Elite adds advanced capabilities like redaction, e-signatures, and PDF forms for teams handling larger document volumes.',
    highlights: ['OCR support for 137 languages', 'Merge, split & compress PDFs', 'E-signatures & secure redaction'],
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
                          ${i === current ? 'w-5 h-1.5 bg-accent' : 'w-1.5 h-1.5 bg-gray-200 hover:bg-gray-300'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Main Page ── */
export default function SoftwareSolutionsPage() {
  const [activeTab, setActiveTab] = useState(0);
  const tab = softwareTabs[activeTab];

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
            { label: 'Software Solutions',  value: '4+' },
            { label: 'Brand Partners',      value: '3+'  },
            { label: 'Businesses Supported',value: '50+'},
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
              Software Solutions
            </div>
          </Animate>

          <Animate type="fade-up" delay={100}>
            <h1 className="font-display font-bold text-white leading-[1.1]
                           tracking-[-0.02em] mb-5 max-w-xl"
                style={{ fontSize: 'clamp(36px, 5vw, 60px)' }}>
              Premium Software for{' '}
              <span className="text-accent">Every Business</span>
            </h1>
          </Animate>

          <Animate type="fade-up" delay={200}>
            <p className="font-body text-white/60 leading-[1.8] max-w-lg"
               style={{ fontSize: '16px', fontWeight: 300 }}>
              At Rookie Ninja, we offer premium software solutions, each catering to
              your business requirement. We provide expert guidance and technical support
              to promote growth and business development.
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
              label="Software Solutions"
              heading="Simplifying Your Digital Journey"
              subheading="Rookie Ninja specializes in information management and information capture solutions. Our portfolio includes document management and solutions from multiple vendors that cater to your specific requirement, to help improve work performance and overall enhance efficiency."
              align="center"
            />
          </Animate>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          DARK HIGHLIGHT BAND
      ══════════════════════════════════════════ */}
      <section className="py-20 px-6" style={{ background: '#0A1628' }}>
        <div className="max-w-4xl mx-auto text-center">
          <Animate type="fade-up">

            {/* quote mark */}
            <div className="flex justify-center mb-6">
              <div className="w-10 h-10 rounded-xl bg-accent/20 text-accent
                              flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.3 5.1A9 9 0 005 14.3V19h4.7v-4.3h-3a5 5 0 014.6-5.4V5.1zM19.3 5.1A9 9 0 0013 14.3V19h4.7v-4.3h-3a5 5 0 014.6-5.4V5.1z"/>
                </svg>
              </div>
            </div>

            <p className="font-body text-white leading-[1.85] max-w-3xl mx-auto"
               style={{ fontSize: 'clamp(15px, 2vw, 18px)', fontWeight: 300 }}>
              Our dynamic software solutions revolutionize the way you do business,
              streamlining workflows and empowering your team with performance and speed
              for enhancing workflow capability. We seamlessly integrate with your existing
              system and ensure maximum productivity and growth while providing support and
              comprehensive training for a seamless experience.
            </p>

            {/* accent divider */}
            <div className="flex items-center justify-center gap-3 mt-8">
              <div className="w-8 h-[1px] bg-accent/40" />
              <div className="w-2 h-2 rounded-full bg-accent" />
              <div className="w-8 h-[1px] bg-accent/40" />
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
          SOFTWARE CATEGORY TABS
      ══════════════════════════════════════════ */}
      <section className="py-24 px-6 border-t border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto">

          {/* Tab buttons */}
          <Animate type="fade-up">
            <div className="flex flex-wrap gap-2 mb-12 border-b border-gray-100 pb-6">
              {softwareTabs.map((t, i) => (
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
              {softwareTabs.map((_, i) => (
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
              onClick={() => setActiveTab(i => Math.min(softwareTabs.length - 1, i + 1))}
              disabled={activeTab === softwareTabs.length - 1}
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