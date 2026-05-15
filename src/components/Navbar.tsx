'use client';

import { useState, useEffect } from 'react';

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen]     = useState<boolean>(false);
  const [mobileSubOpen, setMobileSubOpen] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!(e.target as Element).closest('nav')) setOpenDropdown(null);
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
  }, [mobileOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggle      = (name: string) => setOpenDropdown(p => p === name ? null : name);
  const openOn      = (name: string) => setOpenDropdown(name);
  const closeOn     = (name: string) => setOpenDropdown(p => p === name ? null : p);
  const toggleMobSub = (name: string) => setMobileSubOpen(p => p === name ? null : name);
  const [quoteOpen, setQuoteOpen] = useState<boolean>(false);
const [quoteVisible, setQuoteVisible] = useState<boolean>(false);

const closeQuote = () => {
  setQuoteVisible(false);
  setTimeout(() => setQuoteOpen(false), 300);
};

  return (
    <>
      {/* ── FLOATING NAVBAR ── */}
      <div className="fixed top-0 left-0 right-0 z-[1000] flex justify-center
                      pointer-events-none pt-4 px-4">
        <nav
  className={`pointer-events-auto w-full max-w-6xl
            flex items-center justify-between
            px-5 h-[60px] rounded-2xl
            transition-all duration-500
            ${mobileOpen
              ? 'bg-navy/95 backdrop-blur-xl border border-white/10 shadow-[0_4px_32px_rgba(0,0,0,0.2)]'
              : scrolled
                ? 'bg-white/90 backdrop-blur-xl shadow-[0_4px_32px_rgba(0,0,0,0.12)] border border-white/60'
                : 'bg-black/[0.3] backdrop-blur-md border border-black/[0.00]'
            }`}
>

          {/* Logo */}
          <a href="/" className="flex items-center shrink-0 z-[1001] relative">
            <img
              src="/logo.png"
              alt="Rookie Ninja"
              className={`h-10 w-auto object-contain relative z-[1002]
            transform-gpu will-change-transform transition-all duration-500
            ${scrolled && !mobileOpen ? 'brightness-0' : 'brightness-100'}`}
            />
          </a>

          {/* Desktop Links */}
          <ul className="hidden xl:flex items-center gap-0 list-none">

            {/* About Us */}
            <li
              className="relative"
              onMouseEnter={() => openOn('about')}
              onMouseLeave={() => closeOn('about')}
            >
              <div className="absolute left-0 right-0 h-[16px] top-full pointer-events-auto" />
              <button
                onClick={() => toggle('about')}
                className={`font-body text-[13px] px-3 py-1.5 rounded-lg
                            flex items-center gap-1 cursor-pointer
                            bg-transparent border-none transition-all duration-200
                            whitespace-nowrap
                            ${scrolled
                              ? 'text-navy/70 hover:text-navy hover:bg-navy/[0.06]'
                              : 'text-white hover:text-white/70 hover:bg-white/[0.1]'}`}
              >
                About Us
                <ChevronIcon className={`transition-transform duration-200
                  ${openDropdown === 'about' ? 'rotate-180 opacity-80' : 'opacity-45'}`} />
              </button>

              <div className={`font-body absolute top-[calc(100%+12px)] left-0 min-w-[200px]
                               bg-white border border-gray-100 rounded-xl p-1.5
                               shadow-[0_8px_40px_rgba(0,0,0,0.12)] z-[2000]
                               transition-all duration-200
                               ${openDropdown === 'about'
                                 ? 'opacity-100 translate-y-0 pointer-events-auto visible'
                                 : 'opacity-0 -translate-y-2 pointer-events-none invisible'}`}>
                                  <p className="font-body text-[10px] text-gray-400 uppercase
                                  tracking-[0.16em] px-4 pt-2 pb-3">
                      About Us
                    </p>
                <LightDropItem icon={<ClockIcon />} label="Mission & Vision" href="/about/mission" />
                <div className="h-px bg-gray-100 my-1 mx-1.5" />
                <LightDropItem icon={<TeamIcon />}  label="Team"             href="/about/team"    />
              </div>
            </li>

            {/* Portfolio */}
            <li
              className="relative"
              onMouseEnter={() => openOn('portfolio')}
              onMouseLeave={() => closeOn('portfolio')}
            >
              <div className="absolute left-0 right-0 h-[16px] top-full pointer-events-auto" />
              <button
                onClick={() => toggle('portfolio')}
                className={`font-body text-[13px] px-3 py-1.5 rounded-lg
                            flex items-center gap-1 cursor-pointer
                            bg-transparent border-none transition-all duration-200
                            whitespace-nowrap
                            ${scrolled
                              ? 'text-navy/70 hover:text-navy hover:bg-navy/[0.06]'
                              : 'text-white hover:text-white/70hover:bg-white/[0.1]'}`}
              >
                Portfolio
                <ChevronIcon className={`transition-transform duration-200
                  ${openDropdown === 'portfolio' ? 'rotate-180 opacity-80' : 'opacity-45'}`} />
              </button>

              <div className={`font-body absolute top-[calc(100%+12px)] left-0 z-[2000]
                               bg-white border border-gray-100 rounded-xl
                               shadow-[0_8px_40px_rgba(0,0,0,0.12)]
                               transition-all duration-200 overflow-visible
                               ${openDropdown === 'portfolio'
                                 ? 'opacity-100 translate-y-0 pointer-events-auto visible'
                                 : 'opacity-0 -translate-y-2 pointer-events-none invisible'}`}>
                <div className="flex">

                  {/* Left column */}
                  <div className="flex flex-col py-2 min-w-[190px]
                                  border-r border-gray-100">
                    <p className="font-body text-[10px] text-gray-400 uppercase
                                  tracking-[0.16em] px-4 pt-2 pb-3">
                      Portfolio
                    </p>

                    {/* Our Solutions with flyout */}
                    <div className="relative group/solutions">
                      <a href="/portfolio/solutions"
                         className="flex items-center justify-between gap-2 px-3 py-2
                                    text-[13px] text-gray-600 no-underline transition-all
                                    duration-150 hover:bg-accent/[0.07] hover:text-accent
                                    mx-1 rounded-lg group">
                        <div className="flex items-center gap-2.5">
                          <span className="w-7 h-7 rounded-[7px] bg-accent/10
                                           flex items-center justify-center shrink-0
                                           group-hover:bg-accent/20 transition-all">
                            <SolutionsIcon />
                          </span>
                          Our Solutions
                        </div>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
                             className="opacity-30 group-hover/solutions:opacity-70
                                        -rotate-90 transition-opacity duration-150 shrink-0">
                          <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor"
                                strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </a>

                      {/* Right flyout */}
                      <div className="absolute left-full top-0 ml-1 z-[2001]
                                      bg-white border border-gray-100 rounded-xl
                                      shadow-[0_8px_40px_rgba(0,0,0,0.12)]
                                      min-w-[210px] py-2
                                      opacity-0 pointer-events-none -translate-x-2
                                      group-hover/solutions:opacity-100
                                      group-hover/solutions:pointer-events-auto
                                      group-hover/solutions:translate-x-0
                                      transition-all duration-200">
                        <p className="font-body text-[10px] text-gray-400 uppercase
                                      tracking-[0.16em] px-4 pt-2 pb-3">
                          Our Solutions
                        </p>
                        <LightDropItem icon={<PrintIcon />}       label="Print Solutions"      href="/portfolio/print-solutions"       />
                        <LightDropItem icon={<ScanIcon />}        label="Scan"                 href="/portfolio/scan-solutions"        />
                        <LightDropItem icon={<ElectronicsIcon />} label="Consumer Electronics" href="/portfolio/solutions/electronics" />
                        <LightDropItem icon={<GamingIcon />}      label="Gaming"               href="/portfolio/solutions/gaming"      />
                        <LightDropItem icon={<ComponentsIcon />}  label="Components"           href="/portfolio/solutions/components"  />
                        <LightDropItem icon={<SoftwareIcon />}    label="Software"             href="/portfolio/solutions/software"    />
                        <LightDropItem icon={<AVIcon />}          label="Audio Visual"         href="/portfolio/solutions/av"          />
                        <LightDropItem icon={<AccessoriesIcon />} label="IT Accessories"       href="/portfolio/solutions/accessories" />
                      </div>
                    </div>

                    <LightDropItem icon={<SearchIcon />}    label="Product Finder" href="https://products.rookie-ninja.com/" />
                    
                    <LightDropItem icon={<TrainingIcon />}  label="Training"       href="/portfolio/training"       />
                  </div>
                </div>
              </div>
            </li>



            {/* Simple links */}
           {/* Vendors & Partners */}
{[
  { label: 'Vendors',  href: '/vendors'  },
  { label: 'Partners', href: '/partners' },
].map(({ label, href }) => (
  <li key={label}>
    <a href={href}
       className={`font-body text-[13px] px-3 py-1.5 rounded-lg
                   flex items-center transition-all duration-200
                   whitespace-nowrap no-underline
                   ${scrolled
                     ? 'text-navy/70 hover:text-navy hover:bg-navy/[0.06]'
                     : 'text-white hover:text-white/70 hover:bg-white/[0.1]'}`}>
      {label}
    </a>
  </li>
))}

{/* Careers */}
<li>
  <a href="/careers"
     className={`font-body text-[13px] px-3 py-1.5 rounded-lg
                 flex items-center transition-all duration-200
                 whitespace-nowrap no-underline
                 ${scrolled
                   ? 'text-navy/70 hover:text-navy hover:bg-navy/[0.06]'
                   : 'text-white hover:text-white/70 hover:bg-white/[0.1]'}`}>
    Careers
  </a>
</li>

{/* Contact Us */}
<li>
  <a href="/contact"
     className={`font-body text-[13px] px-3 py-1.5 rounded-lg
                 flex items-center transition-all duration-200
                 whitespace-nowrap no-underline
                 ${scrolled
                   ? 'text-navy/70 hover:text-navy hover:bg-navy/[0.06]'
                   : 'text-white hover:text-white/70 hover:bg-white/[0.1]'}`}>
    Contact Us
  </a>
</li>


          </ul>

          {/* Desktop Actions */}
          <div className="hidden xl:flex items-center gap-2">

            {/* Phone */}
            <button
              title="Call us"
              className={`w-8 h-8 rounded-lg border flex items-center
                          justify-center cursor-pointer transition-all duration-200
                          ${scrolled
                            ? 'border-navy/15 text-navy/50 hover:bg-navy/[0.06] hover:text-navy hover:border-navy/25'
                            : 'text-white hover:text-white/70 hover:bg-white/[0.1] hover:text-white hover:border-white/25'}`}>
              <PhoneIcon />
            </button>

            {/* Email */}
            <button
              title="Email us"
              className={`w-8 h-8 rounded-lg border flex items-center
                          justify-center cursor-pointer transition-all duration-200
                          ${scrolled
                            ? 'border-navy/15 text-navy/50 hover:bg-navy/[0.06] hover:text-navy hover:border-navy/25'
                            : 'text-white hover:text-white/70 hover:bg-white/[0.1] hover:text-white hover:border-white/25'}`}>
              <EmailIcon />
            </button>

            {/* CTA */}
            <button
  onClick={() => { setQuoteOpen(true); setTimeout(() => setQuoteVisible(true), 10); }}
  className={`font-body text-[13px] font-medium
              px-4 py-1.5 rounded-lg whitespace-nowrap
              transition-all duration-200 cursor-pointer
              hover:-translate-y-px
              ${scrolled
                ? 'text-accent border border-accent/50 bg-transparent hover:bg-accent hover:text-white hover:border-accent'
                : 'text-white border border-white/70 bg-transparent hover:bg-white/10 hover:text-white hover:border-white/30'
              }`}>
  Request a Quote
</button>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(p => !p)}
            className="flex xl:hidden flex-col justify-center items-center
                       gap-[5px] w-9 h-9 bg-transparent border-none
                       cursor-pointer z-[1001] p-1"
            aria-label="Toggle menu"
          >
            <span className={`block w-[20px] h-0.5 rounded-sm
                             transition-all duration-300 origin-center
                             ${scrolled && !mobileOpen ? 'bg-navy' : 'bg-white'}
                             ${mobileOpen ? 'translate-y-[6px] rotate-45' : ''}`} />
            <span className={`block h-0.5 rounded-sm transition-all duration-300
                             ${scrolled && !mobileOpen ? 'bg-navy' : 'bg-white'}
                             ${mobileOpen ? 'opacity-0 w-0' : 'w-[20px]'}`} />
            <span className={`block w-[20px] h-0.5 rounded-sm
                             transition-all duration-300 origin-center
                             ${scrolled && !mobileOpen ? 'bg-navy' : 'bg-white'}
                             ${mobileOpen ? '-translate-y-[6px] -rotate-45' : ''}`} />
          </button>

        </nav>
      </div>

      {/* ── MOBILE DRAWER ── */}
      <div className={`fixed inset-0 z-[999] pt-[80px]
                       bg-white/95 backdrop-blur-xl
                       px-5 pt-[84px] pb-10 overflow-y-auto
                       flex flex-col gap-1
                       transition-all duration-[250ms]
                       ${mobileOpen
                         ? 'opacity-100 translate-y-0 pointer-events-auto'
                         : 'opacity-0 -translate-y-2 pointer-events-none'}`}>

        {/* About Us */}
        <MobItem
          label="About Us"
          isOpen={mobileSubOpen === 'about'}
          onToggle={() => toggleMobSub('about')}
        >
          <MobSubLink href="/about/mission" icon={<ClockIconDark />} label="Mission & Vision" />
          <MobSubLink href="/about/team"    icon={<TeamIconDark />}  label="Team" />
        </MobItem>

        {/* Portfolio */}
        <MobItem
          label="Portfolio"
          isOpen={mobileSubOpen === 'portfolio'}
          onToggle={() => toggleMobSub('portfolio')}
        >
          <p className="font-body text-[10px] text-gray-400 uppercase
                        tracking-[0.16em] px-4 pt-2 pb-1">
            Portfolio
          </p>
          <MobSubLink href="/portfolio/product-finder" icon={<SearchIconDark />}    label="Product Finder" />
        
          <MobSubLink href="/portfolio/training"       icon={<TrainingIconDark />}  label="Training"       />

          <div className="h-px bg-gray-100 my-2 mx-4" />

          <p className="font-body text-[10px] text-gray-400 uppercase
                        tracking-[0.16em] px-4 pt-1 pb-1">
            Our Solutions
          </p>
          <MobSubLink href="/portfolio/print-solutions"       icon={<PrintIconDark />}       label="Print Solutions"      />
          <MobSubLink href="/portfolio/scan-solutions"        icon={<ScanIconDark />}        label="Scan"                 />
          <MobSubLink href="/portfolio/solutions/electronics" icon={<ElectronicsIconDark />} label="Consumer Electronics" />
          <MobSubLink href="/portfolio/solutions/gaming"      icon={<GamingIconDark />}      label="Gaming"               />
          <MobSubLink href="/portfolio/solutions/components"  icon={<ComponentsIconDark />}  label="Components"           />
          <MobSubLink href="/portfolio/solutions/software"    icon={<SoftwareIconDark />}    label="Software"             />
          <MobSubLink href="/portfolio/solutions/av"          icon={<AVIconDark />}          label="Audio Visual"         />
          <MobSubLink href="/portfolio/solutions/accessories" icon={<AccessoriesIconDark />} label="IT Accessories"       />
        </MobItem>

        <a href="#" className="font-body text-[15px] text-navy/70 px-4 py-3
                               rounded-xl flex items-center transition-all
                               duration-150 hover:bg-navy/[0.05] hover:text-navy
                               no-underline">
          Vendors
        </a>
        <a href="#" className="font-body text-[15px] text-navy/70 px-4 py-3
                               rounded-xl flex items-center transition-all
                               duration-150 hover:bg-navy/[0.05] hover:text-navy
                               no-underline">
          Partners
        </a>

       <a href="/careers/" className="font-body text-[15px] text-navy/70 px-4 py-3
                               rounded-xl flex items-center transition-all
                               duration-150 hover:bg-navy/[0.05] hover:text-navy
                               no-underline">
  Careers
</a>

        <a href="/contact" className="font-body text-[15px] text-navy/70 px-4 py-3
                               rounded-xl flex items-center transition-all
                               duration-150 hover:bg-navy/[0.05] hover:text-navy
                               no-underline">
          Contact Us
        </a>

        <div className="h-px bg-gray-100 my-2" />

        <div className="mt-4 flex flex-col gap-2.5">
          <button
  onClick={() => { setQuoteOpen(true); setMobileOpen(false); setTimeout(() => setQuoteVisible(true), 10); }}
  className="font-body text-sm font-medium text-white bg-accent
             py-3 rounded-xl text-center block w-full
             shadow-[0_4px_20px_rgba(21,167,220,0.28)]
             transition-all duration-200 cursor-pointer">
  Request a Quote
</button>
          <div className="flex gap-2.5">
            <a href="#"
               className="flex-1 flex items-center justify-center gap-2 py-2.5
                          rounded-xl border border-gray-200 text-navy/60
                          font-body text-[13px] no-underline transition-all
                          hover:bg-gray-50 hover:text-navy">
              <PhoneIconDark /> Call Us
            </a>
            <a href="#"
               className="flex-1 flex items-center justify-center gap-2 py-2.5
                          rounded-xl border border-gray-200 text-navy/60
                          font-body text-[13px] no-underline transition-all
                          hover:bg-gray-50 hover:text-navy">
              <EmailIconDark /> Email Us
            </a>
          </div>
        </div>
      </div>
    {/* ── QUOTE MODAL ── */}
      {quoteOpen && (
  <div
    className={`fixed inset-0 z-[9999] flex items-center justify-center
                px-4 py-6 transition-all duration-300
                ${quoteVisible ? 'opacity-100' : 'opacity-0'}`}
    onClick={(e) => {
      if (e.target === e.currentTarget) closeQuote();
    }}
    style={{ background: 'rgba(8,18,34,0.75)', backdropFilter: 'blur(6px)' }}
  >
    <div className={`relative bg-white rounded-2xl w-full max-w-lg
                     shadow-[0_24px_80px_rgba(0,0,0,0.3)]
                     overflow-hidden transition-all duration-300
                     ${quoteVisible
                       ? 'opacity-100 translate-y-0 scale-100'
                       : 'opacity-0 translate-y-6 scale-95'}`}>

            {/* Top accent bar */}
            <div className="h-1 bg-gradient-to-r from-accent/60 via-accent to-accent/60" />

            {/* Header */}
            <div className="flex items-start justify-between px-8 pt-7 pb-5
                            border-b border-gray-100">
              <div>
                <h2 className="font-display text-[22px] font-bold text-navy
                               tracking-[-0.01em]">
                  Request a Quote
                </h2>
                <p className="font-body text-[13px] text-gray-400 font-light mt-1">
                  Fill in your details and we'll get back to you shortly.
                </p>
              </div>
              <button
                onClick={() => closeQuote()}
                className="w-8 h-8 rounded-lg border border-gray-200 text-gray-400
                           flex items-center justify-center transition-all duration-200
                           hover:bg-gray-100 hover:text-gray-600 shrink-0 ml-4 mt-0.5"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor"
                        strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Form */}
            <form
              className="px-8 py-6 flex flex-col gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                closeQuote();
              }}
            >
              {/* Name row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-body text-[12px] font-medium
                                    text-gray-600 uppercase tracking-[0.08em]">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="John"
                    required
                    className="font-body text-[14px] text-navy placeholder:text-gray-300
                               border border-gray-200 rounded-xl px-4 py-2.5
                               outline-none transition-all duration-200
                               focus:border-accent focus:ring-2
                               focus:ring-accent/10"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-body text-[12px] font-medium
                                    text-gray-600 uppercase tracking-[0.08em]">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Doe"
                    required
                    className="font-body text-[14px] text-navy placeholder:text-gray-300
                               border border-gray-200 rounded-xl px-4 py-2.5
                               outline-none transition-all duration-200
                               focus:border-accent focus:ring-2
                               focus:ring-accent/10"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="font-body text-[12px] font-medium
                                  text-gray-600 uppercase tracking-[0.08em]">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="john@company.com"
                  required
                  className="font-body text-[14px] text-navy placeholder:text-gray-300
                             border border-gray-200 rounded-xl px-4 py-2.5
                             outline-none transition-all duration-200
                             focus:border-accent focus:ring-2
                             focus:ring-accent/10"
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1.5">
                <label className="font-body text-[12px] font-medium
                                  text-gray-600 uppercase tracking-[0.08em]">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+971 50 000 0000"
                  className="font-body text-[14px] text-navy placeholder:text-gray-300
                             border border-gray-200 rounded-xl px-4 py-2.5
                             outline-none transition-all duration-200
                             focus:border-accent focus:ring-2
                             focus:ring-accent/10"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label className="font-body text-[12px] font-medium
                                  text-gray-600 uppercase tracking-[0.08em]">
                  Message
                </label>
                <textarea
                  placeholder="Tell us what you're looking for..."
                  rows={3}
                  className="font-body text-[14px] text-navy placeholder:text-gray-300
                             border border-gray-200 rounded-xl px-4 py-2.5
                             outline-none transition-all duration-200
                             focus:border-accent focus:ring-2
                             focus:ring-accent/10 resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="font-body text-[14px] font-medium text-white
                           bg-accent py-3 rounded-xl transition-all duration-200
                           hover:opacity-85 hover:-translate-y-px
                           shadow-[0_4px_20px_rgba(21,167,220,0.3)]
                           mt-1 cursor-pointer"
              >
                Submit Request
              </button>

              <p className="font-body text-[11px] text-gray-400 text-center">
                We typically respond within 24 hours.
              </p>
            </form>

          </div>
        </div>
      )}

    </>
  );
}

/* ── Sub-components ── */

function ChevronIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor"
            strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* Light dropdown item — for white dropdown panel */
function LightDropItem({ icon, label, href }: {
  icon: React.ReactNode; label: string; href: string;
}) {
  return (
    <a href={href}
       className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px]
                  text-gray-600 no-underline transition-all duration-150
                  hover:bg-accent/[0.07] hover:text-accent group mx-1">
      <span className="w-7 h-7 rounded-[7px] bg-accent/10
                       flex items-center justify-center shrink-0 transition-all
                       group-hover:bg-accent/20">
        {icon}
      </span>
      {label}
    </a>
  );
}

function MobItem({ label, isOpen, onToggle, children }: {
  label: string; isOpen: boolean; onToggle: () => void; children?: React.ReactNode;
}) {
  return (
    <>
      <button
        onClick={onToggle}
        className={`font-body text-[15px] px-4 py-3 rounded-xl w-full
                    flex items-center justify-between cursor-pointer
                    bg-transparent border-none transition-all duration-150
                    hover:bg-navy/[0.05] hover:text-navy
                    ${isOpen ? 'bg-navy/[0.05] text-navy' : 'text-navy/70'}`}
      >
        {label}
        <svg className={`w-4 h-4 opacity-40 transition-transform duration-200
                         ${isOpen ? 'rotate-180 opacity-70' : ''}`}
             viewBox="0 0 16 16" fill="none">
          <path d="M4 6l4 4 4-4" stroke="currentColor"
                strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {isOpen && children && (
        <div className="flex flex-col gap-0.5 pl-2 pb-1">{children}</div>
      )}
      
    </>
  );
}

function MobSubLink({ href, icon, label }: {
  href: string; icon: React.ReactNode; label: string;
}) {
  return (
    <a href={href}
       className="font-body flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-sm
                  text-navy/60 no-underline transition-all
                  hover:bg-accent/[0.07] hover:text-accent">
      <span className="w-7 h-7 rounded-[7px] bg-accent/10
                       flex items-center justify-center shrink-0">
        {icon}
      </span>
      {label}
    </a>
  );
}

/* ── Icons — accent stroke (for dark dropdowns / desktop) ── */
function PhoneIcon() {
  return <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M3 2h3l1.5 3.5L6 7a9 9 0 004 4l1.5-1.5L15 11v3a1 1 0 01-1 1A13 13 0 012 3a1 1 0 011-1z"
          stroke="currentColor" strokeWidth="1.3" fill="none"
          strokeLinecap="round" strokeLinejoin="round"/>
  </svg>;
}
function EmailIcon() {
  return <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <rect x="1" y="3" width="14" height="10" rx="2"
          stroke="currentColor" strokeWidth="1.3" fill="none"/>
    <path d="M1 5l7 5 7-5" stroke="currentColor" strokeWidth="1.3"
          strokeLinecap="round" fill="none"/>
  </svg>;
}
function ClockIcon() {
  return <svg width="13" height="13" viewBox="0 0 16 16" fill="none"
              stroke="#15A7DC" strokeWidth="1.4"
              strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="8" r="6"/><path d="M8 5v3l2 2"/>
  </svg>;
}
function TeamIcon() {
  return <svg width="13" height="13" viewBox="0 0 16 16" fill="none"
              stroke="#15A7DC" strokeWidth="1.4"
              strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="5" r="2"/><circle cx="11" cy="5" r="2"/>
    <path d="M2 14c0-2.21 1.79-4 4-4h4c2.21 0 4 1.79 4 4"/>
  </svg>;
}
function SolutionsIcon() {
  return <svg width="13" height="13" viewBox="0 0 16 16" fill="none"
              stroke="#15A7DC" strokeWidth="1.4"
              strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="1" width="6" height="6" rx="1"/>
    <rect x="9" y="1" width="6" height="6" rx="1"/>
    <rect x="1" y="9" width="6" height="6" rx="1"/>
    <rect x="9" y="9" width="6" height="6" rx="1"/>
  </svg>;
}
function SearchIcon() {
  return <svg width="13" height="13" viewBox="0 0 16 16" fill="none"
              stroke="#15A7DC" strokeWidth="1.4"
              strokeLinecap="round" strokeLinejoin="round">
    <circle cx="7" cy="7" r="4.5"/><path d="M10.5 10.5L14 14"/>
  </svg>;
}
function OfferingsIcon() {
  return <svg width="13" height="13" viewBox="0 0 16 16" fill="none"
              stroke="#15A7DC" strokeWidth="1.4"
              strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 4h12M2 8h8M2 12h5"/>
  </svg>;
}
function TrainingIcon() {
  return <svg width="13" height="13" viewBox="0 0 16 16" fill="none"
              stroke="#15A7DC" strokeWidth="1.4"
              strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 2h6a4 4 0 014 4v8a3 3 0 00-3-3H2z"/>
    <path d="M14 2h-2a4 4 0 00-4 4v8a3 3 0 013-3h3z"/>
  </svg>;
}
function PrintIcon() {
  return <svg width="13" height="13" viewBox="0 0 16 16" fill="none"
              stroke="#15A7DC" strokeWidth="1.4"
              strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 6 4 1 12 1 12 6"/>
    <path d="M4 12H2a1 1 0 01-1-1V7a1 1 0 011-1h12a1 1 0 011 1v4a1 1 0 01-1 1h-2"/>
    <rect x="4" y="9" width="8" height="6"/>
  </svg>;
}
function ScanIcon() {
  return <svg width="13" height="13" viewBox="0 0 16 16" fill="none"
              stroke="#15A7DC" strokeWidth="1.4"
              strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 5V3a1 1 0 011-1h2M11 2h2a1 1 0 011 1v2M14 11v2a1 1 0 01-1 1h-2M5 14H3a1 1 0 01-1-1v-2"/>
    <line x1="2" y1="8" x2="14" y2="8"/>
  </svg>;
}
function ElectronicsIcon() {
  return <svg width="13" height="13" viewBox="0 0 16 16" fill="none"
              stroke="#15A7DC" strokeWidth="1.4"
              strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="2" width="14" height="9" rx="1"/>
    <path d="M5 14h6M8 11v3"/>
  </svg>;
}
function GamingIcon() {
  return <svg width="13" height="13" viewBox="0 0 16 16" fill="none"
              stroke="#15A7DC" strokeWidth="1.4"
              strokeLinecap="round" strokeLinejoin="round">
    <path d="M11.5 3.5H4.5a3 3 0 00-2.98 2.7L1 10l.45 3.3A2.5 2.5 0 004 15h.5a1.5 1.5 0 001.2-.6L7 13h2l1.3 1.4a1.5 1.5 0 001.2.6h.5a2.5 2.5 0 002.55-1.7L15 10l-.52-3.8a3 3 0 00-2.98-2.7z"/>
    <path d="M5 7v2M4 8h2M10.5 8h1"/>
  </svg>;
}
function ComponentsIcon() {
  return <svg width="13" height="13" viewBox="0 0 16 16" fill="none"
              stroke="#15A7DC" strokeWidth="1.4"
              strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="1" width="8" height="14" rx="1"/>
    <path d="M7 4h2M7 7h2M7 10h2"/>
  </svg>;
}
function SoftwareIcon() {
  return <svg width="13" height="13" viewBox="0 0 16 16" fill="none"
              stroke="#15A7DC" strokeWidth="1.4"
              strokeLinecap="round" strokeLinejoin="round">
    <polyline points="10 12 14 8 10 4"/>
    <polyline points="6 4 2 8 6 12"/>
  </svg>;
}
function AVIcon() {
  return <svg width="13" height="13" viewBox="0 0 16 16" fill="none"
              stroke="#15A7DC" strokeWidth="1.4"
              strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="14" height="9" rx="1"/>
    <path d="M10 1l-3 3-3-3"/>
    <circle cx="8" cy="8.5" r="2"/>
  </svg>;
}
function AccessoriesIcon() {
  return <svg width="13" height="13" viewBox="0 0 16 16" fill="none"
              stroke="#15A7DC" strokeWidth="1.4"
              strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 1L2 4v9a1 1 0 001 1h10a1 1 0 001-1V4l-2-3z"/>
    <line x1="2" y1="4" x2="14" y2="4"/>
    <path d="M10 7a2 2 0 01-4 0"/>
  </svg>;
}

/* ── Dark versions for mobile drawer (white bg) ── */
function PhoneIconDark() {
  return <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M3 2h3l1.5 3.5L6 7a9 9 0 004 4l1.5-1.5L15 11v3a1 1 0 01-1 1A13 13 0 012 3a1 1 0 011-1z"
          stroke="#0A1628" strokeWidth="1.3" fill="none"
          strokeLinecap="round" strokeLinejoin="round"/>
  </svg>;
}
function EmailIconDark() {
  return <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <rect x="1" y="3" width="14" height="10" rx="2"
          stroke="#0A1628" strokeWidth="1.3" fill="none"/>
    <path d="M1 5l7 5 7-5" stroke="#0A1628" strokeWidth="1.3"
          strokeLinecap="round" fill="none"/>
  </svg>;
}
function ClockIconDark() {
  return <svg width="13" height="13" viewBox="0 0 16 16" fill="none"
              stroke="#15A7DC" strokeWidth="1.4"
              strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="8" r="6"/><path d="M8 5v3l2 2"/>
  </svg>;
}
function TeamIconDark() {
  return <svg width="13" height="13" viewBox="0 0 16 16" fill="none"
              stroke="#15A7DC" strokeWidth="1.4"
              strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="5" r="2"/><circle cx="11" cy="5" r="2"/>
    <path d="M2 14c0-2.21 1.79-4 4-4h4c2.21 0 4 1.79 4 4"/>
  </svg>;
}

function CultureIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none"
         stroke="#15A7DC" strokeWidth="1.4"
         strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 1a4 4 0 100 8A4 4 0 008 1z"/>
      <path d="M2 14s0-4 6-4 6 4 6 4"/>
      <path d="M12 6s1.5.5 1.5 2"/>
    </svg>
  );
}

function JoinIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none"
         stroke="#15A7DC" strokeWidth="1.4"
         strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 2H3a1 1 0 00-1 1v10a1 1 0 001 1h10a1 1 0 001-1V5l-3-3z"/>
      <path d="M11 2v3h3"/>
      <path d="M8 7v4M6 9h4"/>
    </svg>
  );
}

function CultureIconDark() { return <CultureIcon />; }
function JoinIconDark()    { return <JoinIcon />;    }

function SearchIconDark()      { return <SearchIcon />;      }
function OfferingsIconDark()   { return <OfferingsIcon />;   }
function TrainingIconDark()    { return <TrainingIcon />;    }
function PrintIconDark()       { return <PrintIcon />;       }
function ScanIconDark()        { return <ScanIcon />;        }
function ElectronicsIconDark() { return <ElectronicsIcon />; }
function GamingIconDark()      { return <GamingIcon />;      }
function ComponentsIconDark()  { return <ComponentsIcon />;  }
function SoftwareIconDark()    { return <SoftwareIcon />;    }
function AVIconDark()          { return <AVIcon />;          }
function AccessoriesIconDark() { return <AccessoriesIcon />; }