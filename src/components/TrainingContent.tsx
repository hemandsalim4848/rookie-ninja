'use client';

import { useState } from 'react';
import Animate from './Animate';
import SectionHeader from './SectionHeader';

const programs = [
  {
    id: 'sales',
    label: 'Sales Training',
    title: 'Master the Art of Persuasion',
    body: 'In the fast-paced world of IT sales, effective communication and persuasive techniques are crucial. Our sales training programs are meticulously crafted to sharpen your sales acumen, enhance your negotiation skills, and equip you with the tools to connect with customers on a deeper level.',
    points: [
      'Consultative selling techniques',
      'Objection handling frameworks',
      'Relationship building strategies',
      'Customer psychology & buying behaviour',
      'Negotiation & closing skills',
    ],
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
      </svg>
    ),
    color: '#15A7DC',
  },
  {
    id: 'product',
    label: 'Product Training',
    title: 'Become a Product Guru',
    body: 'In the ever-changing world of technology, staying updated on the latest products and solutions is essential. Our comprehensive product training programs provide in-depth knowledge and hands-on experience with the cutting-edge technologies we distribute.',
    points: [
      'Hardware & software deep-dives',
      'Cloud platforms & emerging tech',
      'Live product demonstrations',
      'Competitive landscape analysis',
      'Trusted advisor certification',
    ],
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2"/>
        <path d="M9 7h6M9 11h6M9 15h4"/>
      </svg>
    ),
    color: '#0F8FBD',
  },
  {
    id: 'internal',
    label: 'Internal Training',
    title: 'Foster Continuous Learning',
    body: 'At Rookie Ninja, we believe in nurturing a culture of continuous learning and growth. Our internal training programs empower team members with the skills and knowledge needed to excel in their roles — from leadership development to technical deep-dives.',
    points: [
      'Leadership development programs',
      'Technical skills workshops',
      'Cross-functional team training',
      'Performance coaching sessions',
      'Personal development planning',
    ],
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
    color: '#0A7AA8',
  },
  {
    id: 'external',
    label: 'External Training',
    title: 'Empowering Partners for Success',
    body: 'We extend our training programs to our valued partners. Our external training initiatives are tailored to address the specific needs of resellers, distributors, and technology consultants — empowering them with the expertise to drive business growth.',
    points: [
      'Partner onboarding programs',
      'Reseller enablement sessions',
      'Go-to-market strategy training',
      'Co-selling & co-marketing skills',
      'Partner certification pathways',
    ],
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
      </svg>
    ),
    color: '#15A7DC',
  },
  {
    id: 'workshops',
    label: 'Workshops & Webinars',
    title: 'Learn & Connect Anytime, Anywhere',
    body: 'We understand the importance of flexibility in today\'s fast-paced world. Our blend of hands-on workshops and engaging webinars provide immersive learning experiences — product demos, real-world use cases, and connections with industry experts.',
    points: [
      'Live & recorded webinar library',
      'Hands-on lab environments',
      'Industry expert guest sessions',
      'Real-world use case walkthroughs',
      'Interactive Q&A and networking',
    ],
    image: 'https://images.unsplash.com/photo-1558008258-3256797b43f3?w=800&q=80',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    color: '#0F8FBD',
  },
];

const stats = [
  { value: '5+',    label: 'Training Programs'  },
  { value: '100+',  label: 'Sessions Delivered'  },
  { value: '40+',   label: 'Vendor Certifications' },
  { value: 'MEA',   label: 'Region Coverage'     },
];

export default function TrainingContent() {
  const [active, setActive] = useState(0);
  const current = programs[active];

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

        {/* Floating program badges */}
        <div className="absolute right-[5%] top-1/2 -translate-y-1/2 z-[2]
                        hidden lg:flex flex-col gap-3">
          {programs.map((p, i) => (
            <div key={p.id}
                 className="flex items-center gap-3 px-4 py-3 rounded-xl
                            border border-white/10 bg-white/[0.05]
                            backdrop-blur-sm cursor-pointer
                            transition-all duration-200
                            hover:border-accent/30 hover:bg-white/[0.08]"
                 onClick={() => setActive(i)}>
              <div className="w-7 h-7 rounded-lg bg-accent/20 text-accent
                              flex items-center justify-center shrink-0">
                {p.icon}
              </div>
              <span className="font-body text-[12px] text-white/60">
                {p.label}
              </span>
            </div>
          ))}
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6
                        pt-[120px] pb-20">
          <Animate type="fade-up">
            <div className="inline-flex items-center gap-2 text-[10.5px] font-medium
                            tracking-[0.15em] uppercase text-accent mb-6 px-3.5
                            py-1.5 pl-2 rounded-full border border-[rgba(21,167,220,0.25)]
                            bg-[rgba(21,167,220,0.12)]">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-blink-dot" />
              Knowledge is Power
            </div>
          </Animate>
          <Animate type="fade-up" delay={100}>
            <h1 className="font-display font-bold text-white
                           text-[clamp(36px,5vw,62px)]
                           leading-[1.1] tracking-[-0.02em] mb-6 max-w-xl">
              Training &amp;
              <span className="text-accent"> Enablement</span>
            </h1>
          </Animate>
          <Animate type="fade-up" delay={200}>
            <p className="font-body text-[16px] font-light text-white/60
                          leading-[1.8] max-w-lg mb-10">
              We are dedicated to equipping our team and partners with the
              skills and expertise needed to thrive in the ever-evolving
              technology landscape.
            </p>
          </Animate>
          <Animate type="fade-up" delay={300}>
            <div className="flex flex-wrap gap-4">
              {stats.map(({ value, label }) => (
                <div key={label}
                     className="px-5 py-3 rounded-xl border border-white/10
                                bg-white/[0.05] backdrop-blur-sm">
                  <div className="font-display text-[20px] font-bold text-accent
                                  leading-none mb-0.5">
                    {value}
                  </div>
                  <div className="font-body text-[10px] text-white/30 uppercase
                                  tracking-[0.1em]">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </Animate>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="py-20 px-6 border-t border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto">
          <Animate type="fade-up">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <SectionHeader
                  label="Our Approach"
                  heading="Built to Empower"
                  align="left"
                />
                <p className="font-body text-[15px] font-light text-gray-500
                              leading-[1.85] mb-6">
                  At Rookie Ninja, we believe that knowledge is power. As an
                  IT distribution company committed to excellence, we offer
                  diverse training programs designed to empower you with the
                  confidence to excel in sales and product expertise.
                </p>
                <p className="font-body text-[15px] font-light text-gray-500
                              leading-[1.85]">
                  Whether you are part of our team or one of our valued
                  partners — our programs are tailored to your specific needs,
                  delivered by industry experts, and designed for the real world.
                </p>
              </div>

              {/* Right — program count grid */}
              <div className="grid grid-cols-2 gap-4">
                {programs.map((p, i) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      setActive(i);
                      document.getElementById('programs')
                        ?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="group p-5 rounded-2xl border border-gray-100
                               cursor-pointer transition-all duration-300
                               hover:border-accent/30
                               hover:shadow-[0_4px_20px_rgba(21,167,220,0.08)]
                               hover:-translate-y-0.5 bg-gray-50/50">
                    <div className="w-9 h-9 rounded-xl bg-accent/10 text-accent
                                    flex items-center justify-center mb-3
                                    transition-all duration-300
                                    group-hover:bg-accent group-hover:text-white">
                      {p.icon}
                    </div>
                    <h4 className="font-display text-[14px] font-bold text-navy
                                   mb-1 transition-colors duration-300
                                   group-hover:text-accent leading-tight">
                      {p.label}
                    </h4>
                    <p className="font-body text-[11px] text-gray-400 font-light
                                  leading-[1.5]">
                      {p.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Animate>
        </div>
      </section>

      {/* ── PROGRAMS — TABBED ── */}
      <section id="programs" className="py-24 px-6 border-t border-gray-100"
               style={{ background: 'linear-gradient(180deg, #f8fbff 0%, #ffffff 100%)' }}>
        <div className="max-w-6xl mx-auto">
          <Animate type="fade-up">
            <SectionHeader
              label="Training Programs"
              heading="Explore Our Programs"
              subheading="Five comprehensive training tracks designed to cover every dimension of your growth."
              align="center"
            />
          </Animate>

          {/* Tab buttons */}
          <Animate type="fade-up" delay={100}>
            <div className="flex items-center justify-center gap-2.5 mt-10 mb-12
                            flex-wrap">
              {programs.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => setActive(i)}
                  className={`font-body text-[13px] font-medium px-4 py-2.5
                              rounded-xl border transition-all duration-200
                              flex items-center gap-2
                              ${active === i
                                ? 'bg-accent text-white border-accent shadow-[0_4px_16px_rgba(21,167,220,0.3)]'
                                : 'bg-white text-gray-500 border-gray-200 hover:border-accent/40 hover:text-accent'}`}
                >
                  <span className={active === i ? 'text-white' : 'text-accent'}>
                    {p.icon}
                  </span>
                  <span className="hidden sm:block">{p.label}</span>
                </button>
              ))}
            </div>
          </Animate>

          {/* Active program content */}
          <div key={current.id}
               className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center
                          animate-fade-up">

            {/* Left — image */}
            <div className="relative rounded-2xl overflow-hidden h-[380px]
                            shadow-[0_8px_40px_rgba(0,0,0,0.1)]">
              <img
                src={current.image}
                alt={current.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0"
                   style={{
                     background: 'linear-gradient(to top, rgba(10,22,40,0.7) 0%, transparent 50%)'
                   }} />
              {/* Label overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-accent/20 text-accent
                                  flex items-center justify-center">
                    {current.icon}
                  </div>
                  <span className="font-body text-[10px] text-accent uppercase
                                   tracking-[0.15em] font-medium">
                    {current.label}
                  </span>
                </div>
                <h3 className="font-display text-[22px] font-bold text-white
                               leading-tight">
                  {current.title}
                </h3>
              </div>
            </div>

            {/* Right — content */}
            <div>
              <p className="font-body text-[15px] font-light text-gray-500
                            leading-[1.85] mb-8">
                {current.body}
              </p>

              {/* Key points */}
              <div className="flex flex-col gap-3 mb-8">
                <p className="font-body text-[11px] font-medium text-gray-400
                              uppercase tracking-[0.12em] mb-1">
                  What you'll learn
                </p>
                {current.points.map((point, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent/10 text-accent
                                    flex items-center justify-center shrink-0">
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="currentColor"
                              strokeWidth="1.5" strokeLinecap="round"
                              strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="font-body text-[14px] text-gray-600">
                      {point}
                    </span>
                  </div>
                ))}
              </div>

              {/* <a href="/contact"
                 className="inline-flex items-center gap-2 font-body text-[13px]
                            font-medium text-white bg-accent px-6 py-3 rounded-xl
                            no-underline transition-all duration-200
                            hover:opacity-85 hover:-translate-y-px
                            shadow-[0_4px_16px_rgba(21,167,220,0.3)]">
                Enquire About This Program
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor"
                        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a> */}
            </div>
          </div>

          {/* Pagination dots */}
          <div className="flex items-center justify-center gap-2 mt-10">
            {programs.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: active === i ? '28px' : '8px',
                  background: active === i ? '#15A7DC' : '#e5e7eb',
                }}
              />
            ))}
          </div>

        </div>
      </section>

      {/* ── CTA ── */}
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
                    Get Started
                  </p>
                  <h2 className="font-display text-[clamp(22px,3vw,34px)] font-bold
                                 text-white leading-[1.2] max-w-lg">
                    Ready to level up your skills?
                  </h2>
                  <p className="font-body text-[14px] text-white/50 font-light
                                leading-[1.7] mt-3 max-w-md">
                    Contact us to learn more about our training programs,
                    schedules, and how to enrol your team or organisation.
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
                    Enquire Now
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor"
                            strokeWidth="1.5" strokeLinecap="round"
                            strokeLinejoin="round"/>
                    </svg>
                  </a>
                  <a href="/careers/culture"
                     className="inline-flex items-center justify-center gap-2
                                font-body text-[14px] text-white/60
                                border border-white/15 px-8 py-4 rounded-xl
                                no-underline transition-all duration-200
                                hover:text-white hover:border-white/30
                                whitespace-nowrap">
                    Our Culture
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