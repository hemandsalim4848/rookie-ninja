'use client';

import { useState } from 'react';
import Animate from '../Animate';
import SectionHeader from '../SectionHeader';

const vendors = [
 {
    name: 'Kodak Alaris',
    logo: '/logos/Kodak-alaris-logo.png',
    description: 'Information capture and document scanning solutions.',
    category: 'Scan & Print',
    website: '/our-vendors/kodak-alaris',
},
{
    name: 'Canon',
    logo: '/logos/canon-logo.png',
    description: 'Global leader in imaging and printing technology.',
    category: 'Print & Imaging',
    website: '/our-vendors/canon',
},
{
    name: 'Brother',
    logo: '/logos/brother-logo.png',
    description: 'Printers, labelling and document management solutions.',
    category: 'Print',
    website: '/our-vendors/brother',
},
{
    name: 'Czur',
    logo: '/logos/czur-logo.webp',
    description: 'Smart scanners for efficient digital productivity.',
    category: 'Scan',
    website: '/our-vendors/czur',
},
{
    name: 'Colortrac',
    logo: '/logos/colortrac-logo.png',
    description: 'Wide-format scanning solutions for professionals.',
    category: 'Wide Format',
    website: '/our-vendors/colortrac',
},
{
    name: 'Viewsonic',
    logo: '/logos/viewsonic-logo.webp',
    description: 'Displays, projectors and collaboration solutions.',
    category: 'Audio Visual',
    website: '/our-vendors/viewsonic-av',
},
{
    name: 'Dicota',
    logo: '/logos/dicota-logo.webp',
    description: 'Premium laptop bags and IT accessories.',
    category: 'IT Accessories',
    website: '/our-vendors/dicota',
},
{
    name: 'UNV',
    logo: '/logos/unv-logo.svg',
    description: 'Professional IP video surveillance solutions.',
    category: 'Security',
    website: '/our-vendors/unv',
},
{
    name: 'Aerocool',
    logo: '/logos/aerocool-logo.svg',
    description: 'Gaming hardware, cooling and power solutions.',
    category: 'Gaming',
    website: '/our-vendors/aerocool',
},
{
    name: 'MSI',
    logo: '/logos/msi-logo.png',
    description: 'Gaming laptops, desktops and PC components.',
    category: 'Gaming',
    website: 'https://www.msi.com',
},
{
    name: 'Silex',
    logo: '/logos/silex-logo.png',
    description: 'Network connectivity and device sharing solutions.',
    category: 'Networking',
    website: 'https://www.silexeurope.com',
},
{
    name: 'Ezofis',
    logo: '/logos/ezofis-logo.png',
    description: 'Cloud document management and automation platform.',
    category: 'Software',
    website: 'https://www.ezofis.com',
},
{
    name: 'Aztech',
    logo: '/logos/aztech-logo.png',
    description: 'Networking and consumer electronics solutions.',
    category: 'Networking',
    website: 'https://www.aztechmea.com',
},
{
    name: 'Deli',
    logo: '/logos/deli-logo.png',
    description: 'Quality stationery and office supply products.',
    category: 'Office',
    website: 'https://www.deli.com',
},
{
    name: 'Contex',
    logo: '/logos/contex-logo.png',
    description: 'Leading manufacturer of wide-format scanners.',
    category: 'Wide Format',
    website: 'https://www.contex.com',
},
{
    name: 'Dahua',
    logo: '/logos/dahua-logo.png',
    description: 'Smart video surveillance and IoT solutions.',
    category: 'Security',
    website: 'https://www.dahuasecurity.com',
},
{
    name: 'Ricoh',
    logo: '/logos/ricoh-logo.svg',
    description: 'Printing, imaging and workplace technology solutions.',
    category: 'Printing Solutions',
    website: 'https://www.ricoh.com',
},
{
    name: 'Fujitsu',
    logo: '/logos/fujitsu-logo.svg',
    description: 'Advanced document scanning and IT solutions.',
    category: 'Document Scanners',
    website: 'https://www.fujitsu.com',
},
{
    name: 'IRIS',
    logo: '/logos/iris-logo.svg',
    description: 'AI-powered OCR and document scanning solutions.',
    category: 'Document Scanners',
    website: '/our-vendors/iris',
},
];

export default function VendorContent() {

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
                          lg:grid-cols-5 gap-4 mt-14">
            {vendors.map((vendor, i) => (
              <Animate key={vendor.name} type="fade-up" delay={i * 40}>
                <FlipCard {...vendor} />
              </Animate>
            ))}
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
          <a href={website} rel="noopener noreferrer"
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