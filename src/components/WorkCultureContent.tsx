'use client';

import Animate from './Animate';
import SectionHeader from './SectionHeader';

const pillars = [
  {
    number: '01',
    title: 'Passion & Purpose',
    body: 'At Rookie Ninja, we tackle challenges head-on, fueled by a shared purpose and a relentless drive to make an impact. Our passion creates fiery energy that fuels innovation and pushes boundaries every single day.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Continuous Learning & Growth',
    body: 'We invest in your professional development through personalized growth plans, hands-on training, dedicated mentorship, and ongoing performance feedback — ensuring you continually grow and advance in your career.',
    image: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?w=800&q=80',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Work-Life Balance & Well-Being',
    body: 'We promote a healthy work-life balance through remote working and flexible hours. Prioritising physical and mental well-being with wellness programs and mindfulness initiatives to support holistic growth.',
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&q=80',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 010 8h-1"/>
        <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/>
        <line x1="6" y1="1" x2="6" y2="4"/>
        <line x1="10" y1="1" x2="10" y2="4"/>
        <line x1="14" y1="1" x2="14" y2="4"/>
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Fun & Celebrations',
    body: 'A positive work culture includes having fun together. We organise team-building activities, social events, hackathons, game nights, team outings and milestone celebrations — fostering camaraderie and lasting connections.',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
  },
  {
    number: '05',
    title: 'Giving Back to the Community',
    body: 'We are committed to making a difference beyond expectations. Our team actively engages with the community — volunteering, supporting causes aligned with our values, and participating in charity events and impactful initiatives.',
    image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&q=80',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
  },
  {
    number: '06',
    title: 'Challenging Projects & Responsibilities',
    body: 'We provide challenging projects to sharpen your skills from day one. We empower you with ownership, decision-making, and hands-on experiences — fostering both personal and professional growth at every stage.',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    number: '07',
    title: 'Leadership & Advancement',
    body: 'We nurture leaders from within. As you grow, we provide advancement opportunities and recognise achievements. Your dedication and contributions are celebrated as you take on increased responsibilities.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 20V10M12 20V4M6 20v-6"/>
      </svg>
    ),
  },
  {
    number: '08',
    title: 'Diversity & Inclusion',
    body: 'We celebrate diversity in all its forms. Our team is built on the belief that different perspectives, backgrounds, and experiences drive better ideas and stronger outcomes for everyone we work with.',
    image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&q=80',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
      </svg>
    ),
  },
];

const perks = [
  {
    label: 'Flexible Hours',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    label: 'Remote Working',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    label: 'Mentorship Program',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
  },
  {
    label: 'Team Events',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
  },
  {
    label: 'Wellness Programs',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
      </svg>
    ),
  },
  {
    label: 'Career Growth',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="20" x2="12" y2="10"/>
        <line x1="18" y1="20" x2="18" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="16"/>
      </svg>
    ),
  },
  {
    label: 'Community Impact',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
      </svg>
    ),
  },
  {
    label: 'Performance Rewards',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6"/>
        <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
      </svg>
    ),
  },
];

export default function WorkCultureContent() {
  return (
    <main className="bg-white">

      {/* ── HERO BANNER ── */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0" style={{
          background: `
            radial-gradient(ellipse 60% 60% at 70% 50%, rgba(21,167,220,0.1) 0%, transparent 70%),
            linear-gradient(150deg, #0A1628 0%, #0F2040 60%, #0A1628 100%)`
        }} />
        <div className="absolute inset-0 z-[1]" style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }} />

        {/* Floating perks on right */}
        <div className="absolute right-[5%] top-1/2 -translate-y-1/2 z-[2]
                        hidden xl:grid grid-cols-2 gap-3 max-w-[280px]">
          {perks.map((perk) => (
            <div key={perk.label}
                 className="flex items-center gap-2.5 px-4 py-3 rounded-xl
                            border border-white/10 bg-white/[0.05]
                            backdrop-blur-sm">
              <span className="text-white/70">{perk.icon}</span>
              <span className="font-body text-[12px] text-white/70 leading-tight">
                {perk.label}
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
              <span className="font-body w-1.5 h-1.5 rounded-full bg-accent animate-blink-dot" />
              Life at Rookie Ninja
            </div>
          </Animate>
          <Animate type="fade-up" delay={100}>
            <h1 className="font-display font-bold text-white
                           text-[clamp(36px,5vw,62px)]
                           leading-[1.1] tracking-[-0.02em] mb-6 max-w-2xl">
              A Culture Built on
              <span className="text-accent"> Passion &amp; Purpose</span>
            </h1>
          </Animate>
          <Animate type="fade-up" delay={200}>
            <p className="font-body text-[16px] font-light text-white/60
                          leading-[1.8] max-w-xl mb-10">
              At Rookie Ninja, we have built more than a company — we have built
              a community where talent thrives, ideas flourish, and every person
              is empowered to do their best work.
            </p>
          </Animate>
          <Animate type="fade-up" delay={300}>
            <div className="flex flex-wrap gap-4">
              <a href="/careers/join"
                 className="inline-flex items-center gap-2 font-body text-[13px]
                            font-medium text-white bg-accent px-6 py-3 rounded-xl
                            no-underline transition-all duration-200
                            hover:opacity-85 hover:-translate-y-px
                            shadow-[0_4px_16px_rgba(21,167,220,0.3)]">
                Join Our Team
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor"
                        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="/contact"
                 className="inline-flex items-center gap-2 font-body text-[13px]
                            font-medium text-white/70 border border-white/20
                            bg-white/[0.07] px-6 py-3 rounded-xl no-underline
                            transition-all duration-200
                            hover:bg-white/[0.12] hover:text-white">
                Get in Touch
              </a>
            </div>
          </Animate>
        </div>
      </section>

      {/* ── INTRO STRIP ── */}
      <section className="py-16 px-6 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <Animate type="fade-up">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                { value: '8+',    label: 'Culture Pillars'   },
                { value: '100%',  label: 'Team Commitment'   },
                { value: '5★',    label: 'Work Environment'  },
                { value: '∞',     label: 'Growth Potential'  },
              ].map(({ value, label }) => (
                <div key={label}
                     className="text-center py-6 px-4 rounded-2xl
                                border border-gray-100 bg-gray-50/50">
                  <div className="font-display text-[32px] font-bold
                                  text-accent leading-none mb-2">
                    {value}
                  </div>
                  <div className="font-body text-[11px] text-gray-400
                                  uppercase tracking-[0.1em]">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </Animate>
        </div>
      </section>

      {/* ── CULTURE PILLARS ── */}
      <section className="py-24 px-6 border-t border-gray-100"
               style={{ background: 'linear-gradient(180deg, #f8fbff 0%, #ffffff 100%)' }}>
        <div className="max-w-6xl mx-auto">
          <Animate type="fade-up">
            <SectionHeader
              label="Our Culture"
              heading="What Makes Us Different"
              subheading="Eight pillars that define how we work, grow, and thrive together at Rookie Ninja."
              align="center"
            />
          </Animate>

          {/* Alternating layout */}
          <div className="flex flex-col gap-6 mt-16">
            {pillars.map((pillar, i) => (
              <Animate key={pillar.number} type="fade-up" delay={i * 50}>
                <PillarCard {...pillar} index={i} />
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUOTE BANNER ── */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0" style={{
          background: 'linear-gradient(135deg, #0A1628 0%, #0F2040 100%)'
        }} />
        <div className="absolute inset-0 z-[1]" style={{
          backgroundImage: 'radial-gradient(rgba(21,167,220,0.05) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }} />
        <div className="absolute right-0 top-0 w-[500px] h-[500px]
                        rounded-full pointer-events-none z-[1]"
             style={{
               background: 'radial-gradient(circle, rgba(21,167,220,0.08) 0%, transparent 60%)',
               transform: 'translate(20%, -20%)',
             }} />
        <div className="relative z-10 max-w-6xl mx-auto">
          <Animate type="fade-up">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="font-body text-[11px] font-medium tracking-[0.2em]
                              uppercase text-accent mb-4">
                  Our Promise to You
                </p>
                <blockquote className="font-display text-[clamp(24px,3vw,38px)]
                                       font-bold text-white leading-[1.3]">
                  "We don't just offer jobs — we offer
                  <span className="text-accent"> careers worth building.</span>"
                </blockquote>
                <div className="flex items-center gap-3 mt-6">
                  <div className="w-10 h-px bg-accent" />
                  <span className="font-body text-[13px] text-white/40">
                    Rookie Ninja Management
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { title: 'Open Door Policy',     body: 'Leadership is always accessible. Ideas and feedback flow freely at every level.' },
                  { title: 'Merit-Based Growth',   body: 'Your performance and impact determine your growth — not politics or tenure.' },
                  { title: 'Safe to Fail',         body: 'We encourage bold ideas. Mistakes are learning opportunities, not setbacks.' },
                  { title: 'Transparent Culture',  body: 'We share company goals, challenges, and wins openly with the whole team.' },
                ].map(({ title, body }) => (
                  <div key={title}
                       className="p-5 rounded-xl border border-white/10
                                  bg-white/[0.04]">
                    <h4 className="font-display text-[14px] font-bold text-white
                                   mb-2">
                      {title}
                    </h4>
                    <p className="font-body text-[12px] text-white/50
                                  leading-[1.65] font-light">
                      {body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Animate>
        </div>
      </section>

      {/* ── PERKS ── */}
      <section className="py-24 px-6 border-t border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto">
          <Animate type="fade-up">
            <SectionHeader
              label="Perks & Benefits"
              heading="Why You'll Love It Here"
              subheading="Beyond the work, we make sure every team member feels valued, supported, and inspired."
              align="center"
            />
          </Animate>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-14">
            {[
              { icon: <ClockIcon />,      title: 'Flexible Hours',      body: 'Work when you are most productive.' },
{ icon: <HomeIcon />,       title: 'Remote Working',      body: 'Hybrid and remote options available.' },
{ icon: <MentorIcon />,     title: 'Mentorship',          body: 'Dedicated mentors to guide your path.' },
{ icon: <GrowthIcon />,     title: 'Career Growth',       body: 'Clear paths to advancement and leadership.' },
{ icon: <WellnessIcon />,   title: 'Wellness Programs',   body: 'Mind and body support initiatives.' },
{ icon: <CelebrationIcon />,title: 'Team Celebrations',   body: 'Regular events and milestone recognition.' },
{ icon: <GlobalIcon />,     title: 'Community Impact',    body: 'Give back through volunteering programs.' },
{ icon: <RewardIcon />,     title: 'Performance Rewards', body: 'Merit-based recognition and bonuses.' },
{ icon: <BookIcon />,       title: 'Learning Budget',     body: 'Annual budget for courses and conferences.' },
{ icon: <InclusionIcon />,  title: 'Inclusive Team',      body: 'Diverse backgrounds, one shared goal.' },
{ icon: <RocketIcon />,     title: 'Fast-Paced Growth',   body: 'Scale your skills in a dynamic environment.' },
{ icon: <WorkspaceIcon />,  title: 'Great Workspace',     body: 'A space designed for focus and creativity.' },
            ].map(({ icon, title, body }, i) => (
              <Animate key={title} type="fade-up" delay={i * 40}>
                <div className="group p-5 rounded-2xl border border-gray-100
                                bg-white transition-all duration-300
                                hover:border-accent/20
                                hover:shadow-[0_8px_32px_rgba(21,167,220,0.08)]
                                hover:-translate-y-0.5">
                  <span className="text-accent mb-3 block">{icon}</span>
                  <h4 className="font-display text-[14px] font-bold text-navy
                                 mb-1.5 transition-colors duration-200
                                 group-hover:text-accent">
                    {title}
                  </h4>
                  <p className="font-body text-[12px] text-gray-400
                                leading-[1.6] font-light">
                    {body}
                  </p>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* ── JOIN CTA ── */}
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
                    Ready to Join?
                  </p>
                  <h2 className="font-display text-[clamp(22px,3vw,34px)] font-bold
                                 text-white leading-[1.2] max-w-lg">
                    Become part of the Rookie Ninja family
                  </h2>
                  <p className="font-body text-[14px] text-white/50 font-light
                                leading-[1.7] mt-3 max-w-md">
                    We are always looking for passionate, skilled people who want
                    to push boundaries and redefine IT distribution.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                  <a href="/careers/join"
                     className="inline-flex items-center justify-center gap-2
                                font-body text-[14px] font-medium text-white
                                bg-accent px-8 py-4 rounded-xl no-underline
                                transition-all duration-200
                                hover:opacity-85 hover:-translate-y-px
                                shadow-[0_4px_20px_rgba(21,167,220,0.35)]
                                whitespace-nowrap">
                    View Open Roles
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor"
                            strokeWidth="1.5" strokeLinecap="round"
                            strokeLinejoin="round"/>
                    </svg>
                  </a>
                  <a href="/contact"
                     className="inline-flex items-center justify-center gap-2
                                font-body text-[14px] text-white/60
                                border border-white/15 px-8 py-4 rounded-xl
                                no-underline transition-all duration-200
                                hover:text-white hover:border-white/30
                                whitespace-nowrap">
                    Contact Us
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

/* ── Pillar Card — alternating layout ── */
function PillarCard({
  number, title, body, image, icon, index,
}: {
  number: string;
  title: string;
  body: string;
  image: string;
  icon: React.ReactNode;
  index: number;
}) {
  const isEven = index % 2 === 0;
  return (
    <div className={`group flex flex-col lg:flex-row gap-0 rounded-2xl
                     overflow-hidden border border-gray-100
                     transition-all duration-300
                     hover:shadow-[0_8px_40px_rgba(21,167,220,0.08)]
                     hover:border-accent/20
                     ${isEven ? '' : 'lg:flex-row-reverse'}`}>

      {/* Image */}
      <div className="relative w-full lg:w-[300px] h-[200px] lg:h-auto
                      shrink-0 overflow-hidden bg-gray-100">
        <img src={image} alt={title}
             className="w-full h-full object-cover transition-transform
                        duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-navy/30
                        group-hover:bg-navy/10 transition-all duration-300" />
        <div className="absolute top-4 left-4 font-display text-[11px]
                        font-bold text-white/60 tracking-[0.1em]">
          {number}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-8 flex flex-col justify-center bg-white relative">
        <div className="absolute top-0 left-0 right-0 h-[2px]
                        bg-gradient-to-r from-accent/60 via-accent to-accent/60
                        scale-x-0 group-hover:scale-x-100
                        transition-transform duration-300 origin-left" />
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent
                          flex items-center justify-center shrink-0
                          transition-all duration-300
                          group-hover:bg-accent group-hover:text-white">
            {icon}
          </div>
          <h3 className="font-display text-[18px] font-bold text-navy
                         leading-tight tracking-[-0.01em]
                         transition-colors duration-300
                         group-hover:text-accent">
            {title}
          </h3>
        </div>
        <p className="font-body text-[14px] text-gray-500 leading-[1.75]
                      font-light">
          {body}
        </p>
      </div>
    </div>
  );
}

function ClockIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
}
function HomeIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
}
function MentorIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>;
}
function GrowthIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>;
}
function WellnessIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>;
}
function CelebrationIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>;
}
function GlobalIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>;
}
function RewardIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>;
}
function BookIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>;
}
function InclusionIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>;
}
function RocketIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>;
}
function WorkspaceIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>;
}