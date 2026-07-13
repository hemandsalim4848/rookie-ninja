'use client';

import { useState } from 'react';
import Animate from '../Animate';

/* ── Partnership Benefits Tabs ── */
const partnerTabs = [
  {
    id: 'portfolio',
    label: 'Unparalleled Product Portfolio',
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1783857793/photo-1519389950473-47ba0277781c_jnqvro.jpg',
    body: 'Gain access to an extensive and diverse range of cutting-edge IT products and solutions. We curate a portfolio that encompasses the latest technologies and industry-leading brands, ensuring you have access to the right tools to meet your business needs.',
    stat: { value: '50+', label: 'Global Vendors' },
  },
  {
    id: 'trusted',
    label: 'Trusted, Collaborative Partnerships',
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1783857792/photo-1582213782179-e0d53f98f2ca_ibz3ip.jpg',
    body: 'We build long-term relationships, not one-off transactions. From your first conversation with us to years down the line, you\'ll have a dedicated team that\'s responsive, reliable, and genuinely invested in your success — working alongside you as a true extension of your business.',
    stat: { value: '20+', label: 'Years of Trust' },
  },
  {
    id: 'custom',
    label: 'Customized Solutions, Backed by Expertise',
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1783857793/photo-1521791136064-7986c2920216_ylsv1g.jpg',
    body: 'No two partners are the same, so we don\'t offer one-size-fits-all solutions. Our team brings deep market expertise to tailor the right product mix, pricing, and logistics for your business — backed by a streamlined supply chain that keeps things moving efficiently, wherever you\'re located.',
    stat: { value: '100%', label: 'Tailored Approach' },
  },
  {
    id: 'support',
    label: 'Training & Enablement',
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1783857788/photo-1558008258-3256797b43f3_cyuzf0.jpg',
    body: 'We also conduct regular training sessions for our partners, covering both sales and product knowledge. These sessions are designed to help your team get comfortable with the technologies we distribute, from hands-on product demos to real-world use cases. We run them in a mix of formats — in-person workshops and online webinars — so your team can learn in whatever way works best for them. Whether you\'re a reseller, distributor, or technology consultant, our goal is to help your team sell with more confidence and stay ahead of the competition.',
  },
];

/* ── Partner benefits summary ── */
const partnerBenefits = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10A15.3 15.3 0 0112 2z"/>
      </svg>
    ),
    title: 'Expanded Market Reach',
    desc: 'Access untapped markets across MEA and beyond with our established distribution network.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
    title: 'Enhanced Brand Visibility',
    desc: 'Elevate your brand presence through our marketing channels and strategic initiatives.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
    title: 'Comprehensive Support & Resources',
    desc: 'Get dedicated training, technical resources, and hands-on support from our expert team.',
  },
];

/* ── Geographies ── */
const geos = ['Middle East', 'Africa', 'CIS', 'India'];

/* ── Main Page ── */
export default function PartnersPage() {
  const [activeTab, setActiveTab] = useState(0);
  const tab = partnerTabs[activeTab];

  const [form, setForm] = useState({
    name: '', company: '', email: '', phone: '', geos: [] as string[],
  });
  const [submitted, setSubmitted] = useState(false);

  const toggleGeo = (g: string) =>
    setForm(f => ({
      ...f,
      geos: f.geos.includes(g) ? f.geos.filter(x => x !== g) : [...f.geos, g],
    }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
            { label: 'Active Partners', value: '500+' },
            { label: 'Countries Served', value: '15+' },
            { label: 'Years of Experience', value: '20+' },
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
              Partner Central
            </div>
          </Animate>

          <Animate type="fade-up" delay={100}>
            <h1 className="font-display font-bold text-white leading-[1.1]
                           tracking-[-0.02em] mb-5 max-w-xl"
                style={{ fontSize: 'clamp(36px, 5vw, 60px)' }}>
              Grow Your Brand with{' '}
              <span className="text-accent">Rookie Ninja</span>
            </h1>
          </Animate>

          <Animate type="fade-up" delay={200}>
            <p className="font-body text-white/60 leading-[1.8] max-w-lg mb-8"
               style={{ fontSize: '16px', fontWeight: 300 }}>
              Ready to take your brand to new heights in the technology market?
              Join forces with Rookie Ninja, the leading IT distribution company
              that empowers vendors to thrive and succeed.
            </p>
          </Animate>

          <Animate type="fade-up" delay={300}>
            <a
              href="#become-partner"
              className="inline-flex items-center gap-2 font-body font-medium
                         text-white bg-accent px-6 py-3 rounded-xl
                         transition-all duration-200 no-underline
                         hover:opacity-85 hover:-translate-y-px
                         shadow-[0_4px_20px_rgba(21,167,220,0.4)]"
              style={{ fontSize: '14px' }}
            >
              Become a Partner
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor" strokeWidth="1.5"
                      strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </Animate>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          WHY PARTNER + VIDEO
      ══════════════════════════════════════════ */}
      <section className="py-24 px-6 border-t border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2
                        gap-12 lg:gap-20 items-center">

          {/* Left — text */}
          <Animate type="fade-right">
            <div>
              <p className="font-body font-semibold text-accent uppercase tracking-wide mb-3"
                 style={{ fontSize: '12px', letterSpacing: '0.1em' }}>
                Why Partner With Us
              </p>
              <h2 className="font-display font-bold text-navy leading-[1.15]
                             tracking-[-0.02em] mb-6"
                  style={{ fontSize: 'clamp(26px, 3.5vw, 40px)' }}>
                You Are at the Heart of Our Strategy
              </h2>
              <div className="w-10 h-[2px] bg-accent rounded-full mb-6" />
              <p className="font-body text-gray-500 leading-[1.8]"
                 style={{ fontSize: '15px' }}>
                At Rookie Ninja, we prioritize a partner-first approach. As a leading IT
                distributor based in Dubai, you are at the heart of our strategy. We are
                dedicated to your success and work closely with you as an extension of
                your team. Together, we drive growth and accelerate business outcomes.
              </p>
            </div>
          </Animate>

          {/* Right — YouTube embed */}
          <Animate type="fade-left" delay={100}>
            <div className="relative w-full rounded-2xl overflow-hidden bg-navy"
                 style={{ aspectRatio: '16/9' }}>
              <iframe
                src="https://www.youtube.com/embed/q_0cb9pEMxg"
                title="Rookie Ninja Partner Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>
          </Animate>

        </div>
      </section>

      {/* ══════════════════════════════════════════
          PARTNERSHIP BENEFITS — VERTICAL TABS
      ══════════════════════════════════════════ */}
      <section className="py-24 px-6 border-t border-gray-100"
               style={{ background: 'linear-gradient(180deg, #f8fbff 0%, #ffffff 100%)' }}>
        <div className="max-w-6xl mx-auto">

          <Animate type="fade-up">
            <div className="text-center mb-14">
              <p className="font-body font-semibold text-accent uppercase tracking-wide mb-3"
                 style={{ fontSize: '12px', letterSpacing: '0.1em' }}>
                Partnership Benefits
              </p>
              <h2 className="font-display font-bold text-navy leading-[1.15]
                             tracking-[-0.02em]"
                  style={{ fontSize: 'clamp(26px, 3.5vw, 40px)' }}>
                Why Choose Rookie Ninja
              </h2>
            </div>
          </Animate>

          {/* ── Vertical sidebar tab layout ── */}
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 lg:gap-10">

            {/* Tab list — vertical pills */}
            <Animate type="fade-right">
              <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible
                              pb-2 lg:pb-0">
                {partnerTabs.map((t, i) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(i)}
                    className={`text-left px-4 py-3 rounded-xl font-body font-medium
                                transition-all duration-200 shrink-0 lg:shrink
                                border whitespace-nowrap lg:whitespace-normal
                                ${activeTab === i
                                  ? 'bg-navy text-white border-navy shadow-[0_4px_20px_rgba(10,22,40,0.15)]'
                                  : 'bg-white text-gray-500 border-gray-200 hover:border-navy/30 hover:text-navy'}`}
                    style={{ fontSize: '13px' }}
                  >
                    <span className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0
                                        ${activeTab === i ? 'bg-accent' : 'bg-gray-300'}`} />
                      {t.label}
                    </span>
                  </button>
                ))}
              </div>
            </Animate>

            {/* Tab content panel */}
            <Animate type="fade-left" delay={80}>
              <div key={activeTab}
                   className="rounded-2xl border overflow-hidden"
                   style={{ border: '0.5px solid rgba(10,22,40,0.08)' }}>

                {/* Image */}
                <div className="w-full bg-[#EFF6FF]" style={{ aspectRatio: '560/320' }}>
                  <img
                    src={tab.image}
                    alt={tab.label}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex items-start justify-between gap-6 mb-4">
                    <h3 className="font-display font-bold text-navy leading-[1.2]
                                   tracking-[-0.01em]"
                        style={{ fontSize: 'clamp(18px, 2.5vw, 24px)' }}>
                      {tab.label}
                    </h3>
                    {/* Stat badge */}
                    {tab.stat && (
                      <div className="shrink-0 flex flex-col items-end">
                        <span className="font-display font-bold text-accent"
                              style={{ fontSize: '24px', lineHeight: 1 }}>
                          {tab.stat.value}
                        </span>
                        <span className="font-body text-gray-400"
                              style={{ fontSize: '11px' }}>
                          {tab.stat.label}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="w-8 h-[2px] bg-accent rounded-full mb-4" />

                  <p className="font-body text-gray-500 leading-[1.8]"
                     style={{ fontSize: '14px' }}>
                    {tab.body}
                  </p>
                </div>
              </div>
            </Animate>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          WHAT YOU WILL GET
      ══════════════════════════════════════════ */}
      <section className="py-24 px-6 border-t border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto">

          <Animate type="fade-up">
            <div className="text-center mb-14">
              <p className="font-body font-semibold text-accent uppercase tracking-wide mb-3"
                 style={{ fontSize: '12px', letterSpacing: '0.1em' }}>
                Partner Benefits
              </p>
              <h2 className="font-display font-bold text-navy leading-[1.15]
                             tracking-[-0.02em] mb-3"
                  style={{ fontSize: 'clamp(26px, 3.5vw, 40px)' }}>
                What You Will Get as a Partner
              </h2>
              <p className="font-body text-gray-400 max-w-md mx-auto"
                 style={{ fontSize: '14px' }}>
                Learn about the benefits you will get as a partner with us.
              </p>
            </div>
          </Animate>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {partnerBenefits.map((b, i) => (
              <Animate key={b.title} type="fade-up" delay={i * 80}>
                <div
                  className="group flex flex-col p-7 rounded-2xl border
                             transition-all duration-300 bg-white
                             hover:-translate-y-1
                             hover:shadow-[0_12px_40px_rgba(21,167,220,0.1)]"
                  style={{ border: '0.5px solid rgba(10,22,40,0.08)' }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(21,167,220,0.3)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(10,22,40,0.08)';
                  }}
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent
                                  flex items-center justify-center mb-5
                                  group-hover:bg-accent group-hover:text-white
                                  transition-all duration-300">
                    {b.icon}
                  </div>
                  <h3 className="font-display font-bold text-navy mb-3"
                      style={{ fontSize: '16px' }}>
                    {b.title}
                  </h3>
                  <p className="font-body text-gray-500 leading-[1.7]"
                     style={{ fontSize: '13px' }}>
                    {b.desc}
                  </p>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          BECOME A PARTNER FORM
      ══════════════════════════════════════════ */}
      <section id="become-partner"
               className="py-24 px-6 border-t border-gray-100"
               style={{ background: 'linear-gradient(180deg, #f8fbff 0%, #ffffff 100%)' }}>
        <div className="max-w-2xl mx-auto">

          <Animate type="fade-up">
            <div className="text-center mb-12">
              <p className="font-body font-semibold text-accent uppercase tracking-wide mb-3"
                 style={{ fontSize: '12px', letterSpacing: '0.1em' }}>
                Get Started
              </p>
              <h2 className="font-display font-bold text-navy leading-[1.15]
                             tracking-[-0.02em] mb-3"
                  style={{ fontSize: 'clamp(26px, 3.5vw, 40px)' }}>
                Become a Partner
              </h2>
              <p className="font-body text-gray-400"
                 style={{ fontSize: '14px' }}>
                Fill the form below to register as a partner with Rookie Ninja.
              </p>
            </div>
          </Animate>

          <Animate type="fade-up" delay={80}>
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 text-accent
                                flex items-center justify-center mb-5">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" strokeWidth="1.6"
                       strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h3 className="font-display text-[22px] font-bold text-navy mb-2">
                  Registration Received!
                </h3>
                <p className="font-body text-[14px] text-gray-400 font-light">
                  Thank you for your interest. Our team will reach out to you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 font-body text-[13px] text-accent border
                             border-accent/40 px-5 py-2.5 rounded-xl
                             transition-all duration-200 hover:bg-accent/10">
                  Submit Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                {/* Name */}
                <FormField
                  label="Partner Representative Name *"
                  type="text"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={v => setForm(f => ({ ...f, name: v }))}
                  required
                />

                {/* Company */}
                <FormField
                  label="Company *"
                  type="text"
                  placeholder="Your company name"
                  value={form.company}
                  onChange={v => setForm(f => ({ ...f, company: v }))}
                  required
                />

                {/* Email */}
                <FormField
                  label="Email *"
                  type="email"
                  placeholder="you@company.com"
                  value={form.email}
                  onChange={v => setForm(f => ({ ...f, email: v }))}
                  required
                />

                {/* Phone */}
                <FormField
                  label="Contact Number *"
                  type="tel"
                  placeholder="+971 50 000 0000"
                  value={form.phone}
                  onChange={v => setForm(f => ({ ...f, phone: v }))}
                  required
                />

                {/* Geographies */}
                <div className="flex flex-col gap-2">
                  <label className="font-body text-[12px] font-medium
                                    text-gray-600 uppercase tracking-[0.08em]">
                    Geographies Interested In *
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {geos.map(g => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => toggleGeo(g)}
                        className={`font-body font-medium px-5 py-2.5 rounded-xl
                                    border transition-all duration-200
                                    ${form.geos.includes(g)
                                      ? 'bg-accent text-white border-accent shadow-[0_4px_16px_rgba(21,167,220,0.3)]'
                                      : 'bg-white text-gray-500 border-gray-200 hover:border-accent/40 hover:text-accent'}`}
                        style={{ fontSize: '13px' }}
                      >
                        {form.geos.includes(g) && (
                          <span className="mr-1.5">✓</span>
                        )}
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="font-body text-[14px] font-medium text-white
                             bg-accent py-3.5 rounded-xl transition-all duration-200
                             hover:opacity-85 hover:-translate-y-px mt-2
                             shadow-[0_4px_20px_rgba(21,167,220,0.3)]">
                  Register as Partner →
                </button>

                <p className="font-body text-[11px] text-gray-400 text-center">
                  Our team will review your application and get back to you within 48 hours.
                </p>
              </form>
            )}
          </Animate>
        </div>
      </section>

    </main>
  );
}

/* ── Reusable form field ── */
function FormField({
  label, type, placeholder, value, onChange, required,
}: {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
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
        value={value}
        onChange={e => onChange(e.target.value)}
        required={required}
        className="font-body text-[14px] text-navy placeholder:text-gray-300
                   border border-gray-200 rounded-xl px-4 py-2.5
                   outline-none transition-all duration-200
                   focus:border-accent focus:ring-2 focus:ring-accent/10"
      />
    </div>
  );
}