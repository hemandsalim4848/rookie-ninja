'use client';

import { useState } from 'react';
import Animate from './Animate';
import SectionHeader from './SectionHeader';

const vendors = [
  {
    name: 'Kodak Alaris',
    logo: '/logos/kodak-alaris-logo.png',
    description: 'World-leading provider of information capture solutions, scanners and professional services.',
    category: 'Scan & Print',
    website: 'https://www.alarisworld.com',
  },
  {
    name: 'Canon',
    logo: '/logos/canon-logo.png',
    description: 'Global leader in imaging, optical and industrial products with a legacy of innovation.',
    category: 'Print & Imaging',
    website: 'https://www.canon.com',
  },
  {
    name: 'Brother',
    logo: '/logos/brother-logo.png',
    description: 'Trusted manufacturer of printers, labelling machines and document management solutions.',
    category: 'Print',
    website: 'https://www.brother.com',
  },
  {
    name: 'Czur',
    logo: '/logos/czur-logo.webp',
    description: 'Innovative document scanners and smart desk lamps redefining digital productivity.',
    category: 'Scan',
    website: 'https://www.czur.com',
  },
  {
    name: 'Colortrac',
    logo: '/logos/colortrac-logo.png',
    description: 'Specialists in wide-format scanning solutions for AEC, GIS and reprographics industries.',
    category: 'Wide Format',
    website: 'https://www.colortrac.com',
  },
  {
    name: 'Rowe',
    logo: '/logos/rowe-logo.png',
    description: 'Leading manufacturer of wide-format scanners and multifunction systems for professionals.',
    category: 'Wide Format',
    website: 'https://www.rowe.de',
  },
  {
    name: 'Viewsonic',
    logo: '/logos/viewsonic-logo.webp',
    description: 'Global provider of visual solutions including displays, projectors and collaboration tools.',
    category: 'Audio Visual',
    website: 'https://www.viewsonic.com',
  },
  {
    name: 'Dicota',
    logo: '/logos/dicota-logo.webp',
    description: 'Premium European brand offering laptop bags, backpacks and IT accessories.',
    category: 'IT Accessories',
    website: 'https://www.dicota.com',
  },
  {
    name: 'UNV',
    logo: '/logos/unv-logo.svg',
    description: 'Uniview — professional IP video surveillance solutions for smart and safe cities.',
    category: 'Security',
    website: 'https://www.uniview.com',
  },
  {
    name: 'Belkin',
    logo: '/logos/belkin_logo.svg',
    description: 'Leading accessories brand delivering connectivity and charging solutions worldwide.',
    category: 'IT Accessories',
    website: 'https://www.belkin.com',
  },
  {
    name: 'Aerocool',
    logo: '/logos/aerocool-logo.svg',
    description: 'Gaming peripherals, PC cases, cooling solutions and power supplies for enthusiasts.',
    category: 'Gaming',
    website: 'https://www.aerocool.io',
  },
  {
    name: 'MSI',
    logo: '/logos/msi-logo.png',
    description: 'World-class manufacturer of gaming laptops, desktops, motherboards and graphics cards.',
    category: 'Gaming',
    website: 'https://www.msi.com',
  },
  {
    name: 'Silex',
    logo: '/logos/silex-logo.png',
    description: 'Innovative connectivity solutions enabling seamless device sharing over networks.',
    category: 'Networking',
    website: 'https://www.silexeurope.com',
  },
  {
    name: 'Ezofis',
    logo: '/logos/ezofis-logo.png',
    description: 'Cloud-based document management and intelligent process automation platform.',
    category: 'Software',
    website: 'https://www.ezofis.com',
  },
  {
    name: 'Aztech',
    logo: '/logos/aztech-logo.png',
    description: 'Trusted networking and consumer electronics brand with decades of industry presence.',
    category: 'Networking',
    website: 'https://www.aztech.com',
  },
  {
    name: 'Deli',
    logo: '/logos/deli-logo.png',
    description: 'Global stationery and office supply brand known for quality and innovation.',
    category: 'Office',
    website: 'https://www.deli.com',
  },
  {
    name: 'Contex',
    logo: '/logos/contex-logo.png',
    description: 'World\'s leading wide-format scanner manufacturer for AEC and graphics professionals.',
    category: 'Wide Format',
    website: 'https://www.contex.com',
  },
  {
    name: 'Dahua',
    logo: '/logos/dahua-logo.png',
    description: 'Leading solution provider in the global video-centric smart IoT ecosystem.',
    category: 'Security',
    website: 'https://www.dahuasecurity.com',
  },
];

const whyUs = [
  {
    title: 'Amplify Your Reach',
    points: [
      'Expand your market presence with our extensive network of resellers, system integrators, and technology consultants.',
      'Tap into new customer segments and geographies, maximising your reach and driving sales growth.',
      'We have a finger on the pulse of local trends, customer preferences, and market dynamics.',
    ],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
      </svg>
    ),
  },
  {
    title: 'Tailored Go-to-Market Strategies',
    points: [
      'Leverage our market insights, strategic positioning, and targeted campaigns to accelerate market penetration.',
      'Our professionals work closely with vendors to develop strategies aligned with your unique goals.',
      'Customised marketing campaigns that resonate with regional audiences.',
    ],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
  },
  {
    title: 'Industry-Leading Logistics',
    points: [
      'Rely on our efficient supply chain management and robust logistics network for timely delivery.',
      'Streamline operations, reduce lead times, and enhance customer experience.',
      'Agile and reliable distribution capabilities across MEA and CIS regions.',
    ],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11a2 2 0 012 2v3"/>
        <rect x="9" y="11" width="14" height="10" rx="2"/>
        <circle cx="12" cy="21" r="1"/>
        <circle cx="20" cy="21" r="1"/>
      </svg>
    ),
  },
  {
    title: 'Product Support & Training',
    points: [
      'Dedicated team experienced with your product ensuring client satisfaction at every stage.',
      'End-to-end pre-sales and post-sales support and training for partners and customers.',
      'Expertise in identifying trends and creating customer demand for your products.',
    ],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
      </svg>
    ),
  },
  {
    title: 'Agility & Flexibility',
    points: [
      'Swiftly adapt to changing market dynamics and emerging trends with our agile approach.',
      'Flexibility to adjust strategies, seize new opportunities, and pivot quickly.',
      'Meet evolving customer demands without compromising on speed or quality.',
    ],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
  },
];

export default function VendorContent() {
  const [activeWhy, setActiveWhy] = useState(0);

  return (
    <main className="bg-white">

      {/* ── HERO BANNER ── */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0" style={{
          background: `
            radial-gradient(ellipse 60% 60% at 75% 50%, rgba(21,167,220,0.1) 0%, transparent 70%),
            linear-gradient(150deg, #0A1628 0%, #0F2040 60%, #0A1628 100%)`
        }} />
        <div className="absolute inset-0 z-[1]" style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }} />

        {/* Floating vendor count */}
        <div className="absolute right-[5%] top-1/2 -translate-y-1/2 z-[2]
                        hidden lg:block">
          <div className="relative w-[280px] h-[280px]">
            <div className="absolute inset-0 rounded-full border border-white/[0.05]" />
            <div className="absolute inset-[40px] rounded-full border border-accent/10" />
            <div className="absolute inset-[80px] rounded-full border border-accent/15" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="font-display text-[56px] font-bold text-accent
                                leading-none">
                  {vendors.length}
                </div>
                <div className="font-body text-[12px] text-white/40 uppercase
                                tracking-[0.12em] mt-1">
                  Vendor Partners
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6
                        pt-[120px] pb-20">
          <Animate type="fade-up">
            <div className="inline-flex items-center gap-2 text-[10.5px] font-medium
                            tracking-[0.15em] uppercase text-accent mb-6 px-3.5
                            py-1.5 pl-2 rounded-full border border-[rgba(21,167,220,0.25)]
                            bg-[rgba(21,167,220,0.12)]">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-blink-dot" />
              Our Vendor Partners
            </div>
          </Animate>
          <Animate type="fade-up" delay={100}>
            <h1 className="font-display font-bold text-white
                           text-[clamp(36px,5vw,62px)]
                           leading-[1.1] tracking-[-0.02em] mb-6 max-w-xl">
              Powering Innovation
              <span className="text-accent"> Together</span>
            </h1>
          </Animate>
          <Animate type="fade-up" delay={200}>
            <p className="font-body text-[16px] font-light text-white/60
                          leading-[1.8] max-w-lg">
              Welcome to our vendor showcase — where we proudly present our
              esteemed partners who power the cutting-edge technology solutions
              we bring to our customers across MEA and beyond.
            </p>
          </Animate>
        </div>
      </section>

      {/* ── VENDOR FLIP GRID ── */}
      <section className="py-24 px-6 border-t border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto">
          <Animate type="fade-up">
            <SectionHeader
              label="Our Vendors"
              heading="Meet Our Partners"
              subheading="Industry-leading brands trusted by businesses across the Middle East, Africa and beyond."
              align="center"
            />
          </Animate>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4
                          lg:grid-cols-6 gap-4 mt-14">
            {vendors.map((vendor, i) => (
              <Animate key={vendor.name} type="fade-up" delay={i * 40}>
                <FlipCard {...vendor} />
              </Animate>
            ))}
          </div>

        </div>
      </section>

      {/* ── WHY ROOKIE NINJA ── */}
      <section className="py-24 px-6 border-t border-gray-100"
               style={{ background: 'linear-gradient(180deg, #f8fbff 0%, #ffffff 100%)' }}>
        <div className="max-w-6xl mx-auto">
          <Animate type="fade-up">
            <SectionHeader
              label="Why Partner With Us"
              heading="Your Go-To Distribution Partner"
              subheading="Five reasons why the world's leading technology brands choose Rookie Ninja as their distribution partner."
              align="center"
            />
          </Animate>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-8 mt-14">

            {/* Left — tab list */}
            <Animate type="fade-right">
              <div className="flex flex-col gap-2">
                {whyUs.map((item, i) => (
                  <button
                    key={item.title}
                    onClick={() => setActiveWhy(i)}
                    className={`group flex items-center gap-4 px-5 py-4
                                rounded-xl text-left transition-all duration-300
                                border cursor-pointer
                                ${activeWhy === i
                                  ? 'bg-navy border-navy shadow-[0_4px_20px_rgba(10,22,40,0.15)]'
                                  : 'bg-white border-gray-100 hover:border-accent/20'}`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center
                                     justify-center shrink-0 transition-all duration-300
                                     ${activeWhy === i
                                       ? 'bg-accent/20 text-accent'
                                       : 'bg-gray-100 text-gray-400 group-hover:bg-accent/10 group-hover:text-accent'}`}>
                      {item.icon}
                    </div>
                    <span className={`font-display text-[15px] font-bold
                                      transition-colors duration-300
                                      ${activeWhy === i ? 'text-white' : 'text-navy'}`}>
                      {item.title}
                    </span>
                    <svg
                      className={`ml-auto w-4 h-4 shrink-0 transition-all duration-300
                                   ${activeWhy === i ? 'text-accent' : 'text-gray-300'}`}
                      viewBox="0 0 16 16" fill="none">
                      <path d="M6 4l4 4-4 4" stroke="currentColor"
                            strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                ))}
              </div>
            </Animate>

            {/* Right — active content */}
            <Animate type="fade-left" delay={100}>
              <div key={activeWhy}
                   className="bg-white rounded-2xl border border-gray-100 p-8
                              shadow-[0_4px_32px_rgba(0,0,0,0.05)]
                              animate-fade-up">

                {/* Icon + title */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent
                                  flex items-center justify-center shrink-0">
                    {whyUs[activeWhy].icon}
                  </div>
                  <h3 className="font-display text-[20px] font-bold text-navy
                                 leading-tight">
                    {whyUs[activeWhy].title}
                  </h3>
                </div>

                {/* Points */}
                <div className="flex flex-col gap-4 mb-8">
                  {whyUs[activeWhy].points.map((point, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-accent/10
                                      flex items-center justify-center shrink-0 mt-0.5">
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="#15A7DC"
                                strokeWidth="1.5" strokeLinecap="round"
                                strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <p className="font-body text-[14px] text-gray-500
                                    leading-[1.7] font-light">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between pt-6
                                border-t border-gray-100">
                  <div className="flex gap-2">
                    {whyUs.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveWhy(i)}
                        className="h-1.5 rounded-full transition-all duration-300"
                        style={{
                          width: activeWhy === i ? '24px' : '8px',
                          background: activeWhy === i ? '#15A7DC' : '#e5e7eb',
                        }}
                      />
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setActiveWhy(p => Math.max(0, p - 1))}
                      disabled={activeWhy === 0}
                      className="w-8 h-8 rounded-lg border border-gray-200
                                 flex items-center justify-center text-gray-400
                                 transition-all duration-200 disabled:opacity-30
                                 hover:border-accent/40 hover:text-accent">
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                        <path d="M10 4L6 8l4 4" stroke="currentColor"
                              strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <button
                      onClick={() => setActiveWhy(p => Math.min(whyUs.length - 1, p + 1))}
                      disabled={activeWhy === whyUs.length - 1}
                      className="w-8 h-8 rounded-lg border border-gray-200
                                 flex items-center justify-center text-gray-400
                                 transition-all duration-200 disabled:opacity-30
                                 hover:border-accent/40 hover:text-accent">
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                        <path d="M6 4l4 4-4 4" stroke="currentColor"
                              strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>

              </div>
            </Animate>

          </div>
        </div>
      </section>

      {/* ── BECOME A VENDOR CTA ── */}
      <section className="py-20 px-6 border-t border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto">
          <Animate type="fade-up">
            <div className="rounded-2xl overflow-hidden relative"
                 style={{
                   background: 'linear-gradient(135deg, #0A1628 0%, #0F2040 100%)'
                 }}>
              <div className="absolute right-0 top-0 w-[400px] h-[400px]
                              rounded-full pointer-events-none"
                   style={{
                     background: 'radial-gradient(circle, rgba(21,167,220,0.12) 0%, transparent 60%)',
                     transform: 'translate(30%,-30%)',
                   }} />
              <div className="relative z-10 flex flex-col lg:flex-row
                              items-center justify-between gap-8 p-12">
                <div>
                  <p className="font-body text-[11px] font-medium tracking-[0.18em]
                                uppercase text-accent mb-3">
                    Partner With Us
                  </p>
                  <h2 className="font-display text-[clamp(22px,3vw,34px)] font-bold
                                 text-white leading-[1.2] max-w-lg">
                    Interested in becoming a Rookie Ninja vendor?
                  </h2>
                  <p className="font-body text-[14px] text-white/50 font-light
                                leading-[1.7] mt-3 max-w-md">
                    Join our growing family of world-class technology brands and
                    unlock access to our extensive distribution network across
                    MEA and CIS regions.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                  <a href="/contact"
                     className="inline-flex items-center justify-center gap-2
                                font-body text-[14px] font-medium text-white
                                bg-accent px-8 py-4 rounded-xl no-underline
                                transition-all duration-200
                                hover:opacity-85 hover:-translate-y-px
                                shadow-[0_4px_20px_rgba(21,167,220,0.35)]
                                whitespace-nowrap">
                    Get in Touch
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor"
                            strokeWidth="1.5" strokeLinecap="round"
                            strokeLinejoin="round"/>
                    </svg>
                  </a>
                  <a href="/about"
                     className="inline-flex items-center justify-center gap-2
                                font-body text-[14px] text-white/60
                                border border-white/15 px-8 py-4 rounded-xl
                                no-underline transition-all duration-200
                                hover:text-white hover:border-white/30
                                whitespace-nowrap">
                    About Us
                  </a>
                </div>
              </div>
            </div>
          </Animate>
        </div>
      </section>

    </main>
  );
}

/* ── Flip Card ── */
function FlipCard({
  name, logo, description, category, website,
}: {
  name: string;
  logo: string;
  description: string;
  category: string;
  website: string;
}) {
  return (
    <div className="group h-[140px]" style={{ perspective: '1000px' }}>
      <div className="relative w-full h-full transition-transform duration-500
                      [transform-style:preserve-3d]
                      group-hover:[transform:rotateY(180deg)]">

        {/* Front */}
        <div className="absolute inset-0 rounded-2xl bg-white border border-gray-100
                        flex flex-col items-center justify-center p-4 gap-2
                        shadow-[0_2px_12px_rgba(0,0,0,0.04)]
                        [backface-visibility:hidden]
                        hover:border-accent/20">
          <img
            src={logo}
            alt={name}
            className="max-h-8 max-w-[80px] w-auto object-contain
                       transition-all duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          {/* <span className="font-body text-[11px] text-gray-400 text-center
                           leading-tight">
            {name}
          </span> */}
        </div>

        {/* Back */}
        <div className="absolute inset-0 rounded-2xl p-4 flex flex-col
                        justify-between [backface-visibility:hidden]
                        [transform:rotateY(180deg)]"
             style={{
               background: 'linear-gradient(135deg, #0A1628 0%, #0F2040 100%)'
             }}>

          {/* Category badge */}
          <span className="font-body text-[9px] font-medium text-accent
                           uppercase tracking-[0.12em] bg-accent/15
                           px-2 py-1 rounded-md self-start">
            {category}
          </span>

          {/* Description */}
          <p className="font-body text-[10px] text-white/60 leading-[1.5]
                        font-light line-clamp-3">
            {description}
          </p>

          {/* Learn more */}
          <a href={website} target="_blank" rel="noopener noreferrer"
             className="font-body text-[10px] font-medium text-accent
                        flex items-center gap-1 no-underline
                        hover:text-white transition-colors duration-200">
            Learn More
            <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
              <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor"
                    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>

        </div>
      </div>
    </div>
  );
}