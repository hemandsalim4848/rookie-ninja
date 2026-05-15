'use client';

import { useState } from 'react';
import Animate from './Animate';
import SectionHeader from './SectionHeader';

const regions = [
  {
    name: 'Middle East',
    color: '#15A7DC',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
      </svg>
    ),
    countries: [
      'UAE', 'Bahrain', 'Kuwait', 'Oman', 'Qatar',
      'Saudi Arabia', 'Jordan', 'Lebanon', 'Iraq', 'Yemen',
    ],
  },
  {
    name: 'Africa',
    color: '#0F8FBD',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
        <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
        <line x1="9" y1="9" x2="9.01" y2="9"/>
        <line x1="15" y1="9" x2="15.01" y2="9"/>
      </svg>
    ),
    countries: [
      'Congo', 'Namibia', 'Zimbabwe', 'DRC', 'Nigeria',
      'Somalia', 'Djibouti', 'Rwanda', 'Eritrea', 'Ethiopia',
      'Tanzania', 'Burundi', 'Gambia', 'Uganda', 'Ghana', 'Kenya',
    ],
  },
  {
    name: 'CIS & Others',
    color: '#0A7AA8',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <polygon points="3 11 22 2 13 21 11 13 3 11"/>
      </svg>
    ),
    countries: [
      'Kazakhstan', 'Turkmenistan', 'Uzbekistan', 'Pakistan', 'Afghanistan',
    ],
  },
];

const offices = [
  {
    type: 'Head Office',
    address: 'Al Nasr Sports Building 02, Oud Metha Road, Dubai — UAE',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    type: 'Warehouse',
    address: 'Jebel Ali Freezone, Dubai, United Arab Emirates',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="1"/>
        <path d="M16 8h4l3 4v4h-7V8z"/>
        <circle cx="5.5" cy="18.5" r="2.5"/>
        <circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
  },
];

export default function ContactContent() {
  const [submitted, setSubmitted] = useState(false);
  const [activeRegion, setActiveRegion] = useState(0);

  return (
    <main className="bg-white">

      {/* ── HERO BANNER ── */}
      <section className="relative min-h-[55vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0" style={{
          background: `
            radial-gradient(ellipse 60% 60% at 75% 50%, rgba(21,167,220,0.1) 0%, transparent 70%),
            linear-gradient(150deg, #0A1628 0%, #0F2040 60%, #0A1628 100%)`
        }} />
        <div className="absolute inset-0 z-[1]" style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }} />

        {/* Decorative element */}
        <div className="absolute right-[8%] top-1/2 -translate-y-1/2 z-[1]
                        hidden lg:flex flex-col gap-4">
          {offices.map((o) => (
            <div key={o.type}
                 className="flex items-start gap-3 px-5 py-4 rounded-xl
                            border border-white/10 bg-white/[0.05]
                            backdrop-blur-sm max-w-[280px]">
              <div className="w-8 h-8 rounded-lg bg-accent/20 text-accent
                              flex items-center justify-center shrink-0 mt-0.5">
                {o.icon}
              </div>
              <div>
                <p className="font-body text-[10px] text-accent uppercase
                               tracking-[0.14em] font-medium mb-1">
                  {o.type}
                </p>
                <p className="font-body text-[12px] text-white/60 leading-[1.6]">
                  {o.address}
                </p>
              </div>
            </div>
          ))}
          <div className="flex items-center gap-3 px-5 py-4 rounded-xl
                          border border-white/10 bg-white/[0.05] backdrop-blur-sm">
            <div className="w-8 h-8 rounded-lg bg-accent/20 text-accent
                            flex items-center justify-center shrink-0">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 2h3l1.5 3.5L6 7a9 9 0 004 4l1.5-1.5L15 11v3a1 1 0 01-1 1A13 13 0 012 3a1 1 0 011-1z"
                      stroke="currentColor" strokeWidth="1.3" fill="none"
                      strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <p className="font-body text-[10px] text-accent uppercase
                             tracking-[0.14em] font-medium mb-0.5">
                Phone
              </p>
              <a href="tel:+97142965256"
                 className="font-body text-[13px] text-white/70 no-underline
                            hover:text-accent transition-colors duration-200">
                +971 4 296 5256
              </a>
            </div>
          </div>
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-[120px] pb-20">
          <Animate type="fade-up">
            <div className="inline-flex items-center gap-2 text-[10.5px] font-medium
                            tracking-[0.15em] uppercase text-accent mb-6 px-3.5
                            py-1.5 pl-2 rounded-full border border-[rgba(21,167,220,0.25)]
                            bg-[rgba(21,167,220,0.12)]">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-blink-dot" />
              Get In Touch
            </div>
          </Animate>
          <Animate type="fade-up" delay={100}>
            <h1 className="font-display font-bold text-white
                           text-[clamp(36px,5vw,60px)]
                           leading-[1.1] tracking-[-0.02em] mb-5 max-w-lg">
              Let's <span className="text-accent">Connect</span>
            </h1>
          </Animate>
          <Animate type="fade-up" delay={200}>
            <p className="font-body text-[16px] font-light text-white/60
                          leading-[1.8] max-w-md">
              Ready to take your IT business to the next level? Whether you are
              a vendor, partner, or industry enthusiast — we are here to help.
            </p>
          </Animate>
        </div>
      </section>

      {/* ── CONTACT FORM + INFO ── */}
      <section className="py-24 px-6 border-t border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12">

            {/* Left — form */}
            <Animate type="fade-right">
              <div>
                <SectionHeader
                  label="Send a Message"
                  heading="How Can We Help?"
                  align="left"
                />

                {submitted ? (
                  <div className="flex flex-col items-center justify-center
                                  py-16 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-accent/10 text-accent
                                    flex items-center justify-center mb-5">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                           stroke="currentColor" strokeWidth="1.6"
                           strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                    <h3 className="font-display text-[22px] font-bold text-navy mb-2">
                      Message Sent!
                    </h3>
                    <p className="font-body text-[14px] text-gray-400 font-light">
                      Thank you for reaching out. We'll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-6 font-body text-[13px] text-accent border
                                 border-accent/40 px-5 py-2.5 rounded-xl
                                 transition-all duration-200 hover:bg-accent/10">
                      Send Another
                    </button>
                  </div>
                ) : (
                  <form
                    className="flex flex-col gap-4"
                    onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <FormField label="First Name" type="text" placeholder="John"    required />
                      <FormField label="Last Name"  type="text" placeholder="Doe"     required />
                    </div>
                    <FormField label="Email Address" type="email" placeholder="john@company.com" required />
                    <FormField label="Phone Number"  type="tel"   placeholder="+971 50 000 0000" />
                    <FormField label="Company"       type="text"  placeholder="Your company name" />

                    <div className="flex flex-col gap-1.5">
                      <label className="font-body text-[12px] font-medium
                                        text-gray-600 uppercase tracking-[0.08em]">
                        Message
                      </label>
                      <textarea
                        placeholder="Tell us what you're looking for..."
                        rows={4}
                        required
                        className="font-body text-[14px] text-navy placeholder:text-gray-300
                                   border border-gray-200 rounded-xl px-4 py-3
                                   outline-none transition-all duration-200
                                   focus:border-accent focus:ring-2 focus:ring-accent/10
                                   resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="font-body text-[14px] font-medium text-white
                                 bg-accent py-3.5 rounded-xl transition-all duration-200
                                 hover:opacity-85 hover:-translate-y-px
                                 shadow-[0_4px_20px_rgba(21,167,220,0.3)] mt-1">
                      Send Message
                      <span className="ml-2">→</span>
                    </button>

                    <p className="font-body text-[11px] text-gray-400 text-center">
                      We typically respond within 24 hours.
                    </p>
                  </form>
                )}
              </div>
            </Animate>

            {/* Right — office info */}
            <Animate type="fade-left" delay={100}>
              <div className="flex flex-col gap-5">

                {/* Office cards */}
                {offices.map((o) => (
                  <div key={o.type}
                       className="flex items-start gap-4 p-5 rounded-xl
                                  border border-gray-100 bg-gray-50/60
                                  transition-all duration-300
                                  hover:border-accent/20
                                  hover:shadow-[0_4px_20px_rgba(21,167,220,0.08)]">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent
                                    flex items-center justify-center shrink-0">
                      {o.icon}
                    </div>
                    <div>
                      <p className="font-body text-[11px] text-accent uppercase
                                     tracking-[0.12em] font-medium mb-1">
                        {o.type}
                      </p>
                      <p className="font-body text-[13.5px] text-navy font-medium
                                     leading-[1.5]">
                        {o.address}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Phone */}
                <div className="flex items-center gap-4 p-5 rounded-xl
                                border border-gray-100 bg-gray-50/60
                                transition-all duration-300
                                hover:border-accent/20
                                hover:shadow-[0_4px_20px_rgba(21,167,220,0.08)]">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent
                                  flex items-center justify-center shrink-0">
                    <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                      <path d="M3 2h3l1.5 3.5L6 7a9 9 0 004 4l1.5-1.5L15 11v3a1 1 0 01-1 1A13 13 0 012 3a1 1 0 011-1z"
                            stroke="currentColor" strokeWidth="1.3" fill="none"
                            strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-body text-[11px] text-accent uppercase
                                   tracking-[0.12em] font-medium mb-1">
                      Phone
                    </p>
                    <a href="tel:+97142965256"
                       className="font-body text-[13.5px] text-navy font-medium
                                  no-underline hover:text-accent
                                  transition-colors duration-200">
                      +971 4 296 5256
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-4 p-5 rounded-xl
                                border border-gray-100 bg-gray-50/60
                                transition-all duration-300
                                hover:border-accent/20
                                hover:shadow-[0_4px_20px_rgba(21,167,220,0.08)]">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent
                                  flex items-center justify-center shrink-0">
                    <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                      <rect x="1" y="3" width="14" height="10" rx="2"
                            stroke="currentColor" strokeWidth="1.3" fill="none"/>
                      <path d="M1 5l7 5 7-5" stroke="currentColor"
                            strokeWidth="1.3" strokeLinecap="round" fill="none"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-body text-[11px] text-accent uppercase
                                   tracking-[0.12em] font-medium mb-1">
                      Email
                    </p>
                    <a href="mailto:info@rookieninja.com"
                       className="font-body text-[13.5px] text-navy font-medium
                                  no-underline hover:text-accent
                                  transition-colors duration-200">
                      info@rookieninja.com
                    </a>
                  </div>
                </div>

              </div>
            </Animate>
          </div>
        </div>
      </section>

      {/* ── COUNTRIES WE CATER TO ── */}
      <section className="py-24 px-6 border-t border-gray-100"
               style={{ background: 'linear-gradient(180deg, #f8fbff 0%, #ffffff 100%)' }}>
        <div className="max-w-6xl mx-auto">
          <Animate type="fade-up">
            <SectionHeader
              label="Our Reach"
              heading="Countries We Cater To"
              subheading="Serving businesses across three major regions — Middle East, Africa, and CIS."
              align="center"
            />
          </Animate>

          {/* Region tabs */}
          <Animate type="fade-up" delay={100}>
            <div className="flex items-center justify-center gap-3 mt-10 mb-10
                            flex-wrap">
              {regions.map((r, i) => (
                <button
                  key={r.name}
                  onClick={() => setActiveRegion(i)}
                  className={`font-body text-[13px] font-medium px-5 py-2.5
                              rounded-xl border transition-all duration-200
                              flex items-center gap-2
                              ${activeRegion === i
                                ? 'bg-accent text-white border-accent shadow-[0_4px_16px_rgba(21,167,220,0.3)]'
                                : 'bg-white text-gray-500 border-gray-200 hover:border-accent/40 hover:text-accent'}`}
                >
                  <span className={activeRegion === i ? 'text-white' : 'text-accent'}>
                    {r.icon}
                  </span>
                  {r.name}
                  <span className={`text-[11px] px-1.5 py-0.5 rounded-md font-medium
                                    ${activeRegion === i
                                      ? 'bg-white/20 text-white'
                                      : 'bg-gray-100 text-gray-400'}`}>
                    {r.countries.length}
                  </span>
                </button>
              ))}
            </div>
          </Animate>

          {/* Countries grid */}
          <Animate type="fade-up" delay={150}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4
                            lg:grid-cols-5 gap-3">
              {regions[activeRegion].countries.map((country, i) => (
                <div
                  key={country}
                  className="group flex items-center gap-2.5 px-4 py-3
                             rounded-xl border border-gray-100 bg-white
                             transition-all duration-200
                             hover:border-accent/30
                             hover:shadow-[0_4px_16px_rgba(21,167,220,0.08)]"
                  style={{
                    animationDelay: `${i * 30}ms`,
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent/40
                                   group-hover:bg-accent transition-colors
                                   duration-200 shrink-0" />
                  <span className="font-body text-[13px] text-gray-600
                                   group-hover:text-accent transition-colors
                                   duration-200">
                    {country}
                  </span>
                </div>
              ))}
            </div>
          </Animate>

          {/* Total count */}
          <Animate type="fade-up" delay={200}>
            <div className="mt-10 flex items-center justify-center gap-2">
              <span className="font-body text-[13px] text-gray-400">
                Serving across
              </span>
              <span className="font-display text-[15px] font-bold text-accent">
                {regions.reduce((acc, r) => acc + r.countries.length, 0)}+ countries
              </span>
              <span className="font-body text-[13px] text-gray-400">
                in 3 regions
              </span>
            </div>
          </Animate>

        </div>
      </section>

    </main>
  );
}

/* ── Reusable form field ── */
function FormField({
  label, type, placeholder, required,
}: {
  label: string;
  type: string;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-body text-[12px] font-medium
                        text-gray-600 uppercase tracking-[0.08em]">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        className="font-body text-[14px] text-navy placeholder:text-gray-300
                   border border-gray-200 rounded-xl px-4 py-2.5
                   outline-none transition-all duration-200
                   focus:border-accent focus:ring-2 focus:ring-accent/10"
      />
    </div>
  );
}