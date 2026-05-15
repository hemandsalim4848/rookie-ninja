'use client';

import Animate from './Animate';
import SectionHeader from './SectionHeader';

const management = [
  {
    name: 'Swathy Sunilkumar',
    role: 'Head of Vendor Relations & Brand Development',
    image: '/team/swathy.jpg',
    bio: 'Driving strategic vendor partnerships and brand growth across the MEA region with a passion for building lasting relationships.',
    initials: 'SS',
    color: '#15A7DC',
  },
  {
    name: 'Steffy Jacob',
    role: 'Product Manager',
    image: '/team/steffy.jpg',
    bio: 'Leading product strategy and portfolio development to ensure we always bring the most relevant technology to our partners.',
    initials: 'SJ',
    color: '#0F8FBD',
  },
  {
    name: 'Felix Simon',
    role: 'Senior Account Manager — Export Sales',
    image: '/team/felix.jpg',
    bio: 'Managing key export accounts with precision and a deep understanding of cross-border technology distribution.',
    initials: 'FS',
    color: '#0A7AA8',
  },
  {
    name: 'Garros Rolland',
    role: 'Retail Sales & Export',
    image: '/team/garros.jpg',
    bio: 'Bridging retail and export channels to maximise reach and deliver consistent value to our growing partner network.',
    initials: 'GR',
    color: '#15A7DC',
  },
  {
    name: 'Catherine Robit',
    role: 'Senior Account Manager — Channel Sales',
    image: '/team/catherine.jpg',
    bio: 'Building and nurturing channel partnerships with a customer-first approach and an eye for long-term growth.',
    initials: 'CR',
    color: '#0F8FBD',
  },
];

const values = [
  {
    title: 'Innovation First',
    body: 'We constantly challenge the status quo, bringing fresh ideas and creative solutions to every partnership.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18h6M10 22h4M12 2a7 7 0 017 7c0 2.5-1.5 4.5-3 6l-1 3H9l-1-3C6.5 13.5 5 11.5 5 9a7 7 0 017-7z"/>
      </svg>
    ),
  },
  {
    title: 'People Driven',
    body: 'Our team is our greatest asset. We invest in people, foster growth, and celebrate every win together.',
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
    title: 'Relentless Reliability',
    body: 'We show up, we deliver, and we exceed expectations — every time, without compromise.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    title: 'Collaborative Spirit',
    body: 'Together we achieve more. Collaboration is embedded in how we think, work, and grow.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
      </svg>
    ),
  },
];

export default function TeamContent() {
  return (
    <main className="bg-white">

      {/* ── HERO BANNER ── */}
      <section className="relative min-h-[65vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0" style={{
          background: `
            radial-gradient(ellipse 55% 55% at 80% 50%, rgba(21,167,220,0.1) 0%, transparent 70%),
            linear-gradient(150deg, #0A1628 0%, #0F2040 60%, #0A1628 100%)`
        }} />
        <div className="absolute inset-0 z-[1]" style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }} />

        {/* Decorative circles */}
        <div className="absolute right-[5%] top-1/2 -translate-y-1/2 z-[1]
                        hidden lg:block">
          <div className="relative w-[380px] h-[380px]">
            <div className="absolute inset-0 rounded-full border border-white/[0.05]" />
            <div className="absolute inset-[40px] rounded-full border border-accent/10" />
            <div className="absolute inset-[80px] rounded-full border border-accent/15" />
            <div className="absolute inset-[120px] rounded-full bg-accent/[0.06]
                            flex items-center justify-center">
              <div className="w-16 h-16 rounded-2xl bg-accent/20
                              flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                     stroke="#15A7DC" strokeWidth="1.5"
                     strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
                </svg>
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
              The People Behind Rookie Ninja
            </div>
          </Animate>
          <Animate type="fade-up" delay={100}>
            <h1 className="font-display font-bold text-white
                           text-[clamp(36px,5vw,62px)]
                           leading-[1.1] tracking-[-0.02em] mb-6 max-w-xl">
              We Are <span className="text-accent">Rookie Ninja</span>
            </h1>
          </Animate>
          <Animate type="fade-up" delay={200}>
            <p className="font-body text-[16px] font-light text-white/60
                          leading-[1.8] max-w-lg mb-10">
              Since day one, our people have been the main driver of growth.
              Without them, it would have been impossible to guarantee the
              quality of service our customers expect and deserve.
            </p>
          </Animate>
          <Animate type="fade-up" delay={300}>
            
             <a href="/company-profile.pdf"
              download
              className="inline-flex items-center gap-2.5 font-body text-[13px]
                         font-medium text-white border border-white/20
                         bg-white/[0.07] px-5 py-3 rounded-xl no-underline
                         transition-all duration-200
                         hover:bg-white/[0.12] hover:border-white/30 group"
            >
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none"
                   className="transition-transform duration-200
                               group-hover:translate-y-0.5">
                <path d="M8 2v8M5 7l3 3 3-3M2 12v1a1 1 0 001 1h10a1 1 0 001-1v-1"
                      stroke="currentColor" strokeWidth="1.4"
                      strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Download Company Profile
            </a>
          </Animate>
        </div>
      </section>

      {/* ── FOUNDER MESSAGE ── */}
      <section className="py-20 px-6 border-t border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto">
          <Animate type="fade-up">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

              {/* Left — quote */}
              <div className="relative">
                <div className="absolute -left-2 -top-2 text-[120px] leading-none
                                font-display font-bold text-accent/10 select-none
                                pointer-events-none">
                  "
                </div>
                <div className="relative">
                  <p className="font-body text-[11px] font-medium tracking-[0.2em]
                                uppercase text-accent mb-4">
                    Message from our Founder
                  </p>
                  <blockquote className="font-display text-[clamp(22px,2.5vw,32px)]
                                         font-bold text-navy leading-[1.35]
                                         tracking-[-0.01em] mb-6">
                    The first step toward success is taken when you refuse to be
                    a captive of your{' '}
                    <span className="text-accent">own mind's restrictions.</span>
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-px bg-accent" />
                    <span className="font-body text-[13px] text-gray-400 font-medium">
                      Founder, Rookie Ninja
                    </span>
                  </div>
                </div>
              </div>

              {/* Right — about team text */}
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                <p className="font-body text-[14px] text-gray-500 leading-[1.85]
                              font-light mb-5">
                  Welcome to the management team at Rookie Ninja — where
                  extraordinary leadership converges with a vibrant work culture.
                  Led by our visionary ninja masters, we are on a relentless mission
                  to create the best place to work in IT distribution.
                </p>
                <p className="font-body text-[14px] text-gray-500 leading-[1.85]
                              font-light">
                  With strategic prowess and unwavering dedication, our management
                  team pioneers an environment where innovation thrives,
                  collaboration soars, and every team member flourishes.
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 text-accent
                                  flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none"
                         stroke="currentColor" strokeWidth="1.5"
                         strokeLinecap="round" strokeLinejoin="round">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                            transform="scale(0.8) translate(2,1)"/>
                    </svg>
                  </div>
                  <span className="font-body text-[12px] text-accent font-medium
                                   uppercase tracking-[0.1em]">
                    Unleashing Our Ninja Power
                  </span>
                </div>
              </div>

            </div>
          </Animate>
        </div>
      </section>

      {/* ── MANAGEMENT TEAM ── */}
      <section className="py-24 px-6 border-t border-gray-100"
               style={{ background: 'linear-gradient(180deg, #f8fbff 0%, #ffffff 100%)' }}>
        <div className="max-w-6xl mx-auto">
          <Animate type="fade-up">
            <SectionHeader
              label="Management Team"
              heading="Meet the Team"
              subheading="The certified, passionate professionals who show up every day ready to tackle your most challenging needs."
              align="center"
            />
          </Animate>

          {/* Team grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
            {management.map((member, i) => (
              <Animate key={member.name} type="fade-up" delay={i * 80}>
                <TeamCard {...member} />
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* ── CULTURE / VALUES ── */}
      <section className="py-24 px-6 border-t border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto">
          <Animate type="fade-up">
            <SectionHeader
              label="Our Culture"
              heading="What Drives Us"
              subheading="We never settle for less. Our values define how we work, how we treat each other, and how we serve our partners."
              align="center"
            />
          </Animate>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-14">
            {values.map((v, i) => (
              <Animate key={v.title} type="fade-up" delay={i * 80}>
                <ValueCard {...v} />
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* ── JOIN US CTA ── */}
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
                     transform: 'translate(30%,-30%)'
                   }} />
              <div className="relative z-10 flex flex-col lg:flex-row
                              items-center justify-between gap-8 p-12">
                <div>
                  <p className="font-body text-[11px] font-medium tracking-[0.18em]
                                uppercase text-accent mb-3">
                    Join Our Team
                  </p>
                  <h2 className="font-display text-[clamp(22px,3vw,34px)] font-bold
                                 text-white leading-[1.2] max-w-lg">
                    Want to be part of something extraordinary?
                  </h2>
                  <p className="font-body text-[14px] text-white/50 font-light
                                leading-[1.7] mt-3 max-w-md">
                    We're always looking for passionate, skilled people who want
                    to push boundaries and redefine IT distribution.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                  <a href="/careers"
                     className="inline-flex items-center justify-center gap-2
                                font-body text-[14px] font-medium text-white
                                bg-accent px-8 py-4 rounded-xl no-underline
                                transition-all duration-200
                                hover:opacity-85 hover:-translate-y-px
                                shadow-[0_4px_20px_rgba(21,167,220,0.35)]
                                whitespace-nowrap">
                    View Careers
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

/* ── Team Card ── */
function TeamCard({
  name, role, image, bio, initials, color,
}: {
  name: string;
  role: string;
  image: string;
  bio: string;
  initials: string;
  color: string;
}) {
  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden
                    border border-gray-100 transition-all duration-300
                    hover:shadow-[0_8px_40px_rgba(21,167,220,0.12)]
                    hover:-translate-y-1 hover:border-accent/20">

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] z-10
                      bg-gradient-to-r from-accent/60 via-accent to-accent/60
                      scale-x-0 group-hover:scale-x-100
                      transition-transform duration-300 origin-left" />

      {/* Image / Avatar area */}
      <div className="relative h-[200px] overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover object-top
                     transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        {/* Fallback avatar shown when image fails */}
        <div className="absolute inset-0 flex items-center justify-center"
             style={{ background: `linear-gradient(135deg, #0A1628, #0F2040)` }}>
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center
                          text-[28px] font-display font-bold text-white"
               style={{ background: color }}>
            {initials}
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy/60
                        to-transparent opacity-0 group-hover:opacity-100
                        transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-display text-[17px] font-bold text-navy mb-1
                       tracking-[-0.01em] transition-colors duration-300
                       group-hover:text-accent">
          {name}
        </h3>
        <p className="font-body text-[11px] font-medium text-accent uppercase
                      tracking-[0.1em] mb-4 leading-[1.4]">
          {role}
        </p>
        <div className="w-6 h-px bg-gray-200 mb-4 transition-all duration-300
                        group-hover:w-10 group-hover:bg-accent/40" />
        <p className="font-body text-[13px] text-gray-400 leading-[1.7] font-light">
          {bio}
        </p>
      </div>
    </div>
  );
}

/* ── Value Card ── */
function ValueCard({
  title, body, icon,
}: {
  title: string;
  body: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="group relative bg-white rounded-2xl p-8
                    border border-gray-100 overflow-hidden
                    shadow-[0_2px_16px_rgba(0,0,0,0.04)]
                    transition-all duration-300
                    hover:-translate-y-1 hover:border-accent/20
                    hover:shadow-[0_12px_40px_rgba(21,167,220,0.1)]
                    flex gap-5 items-start">

      <div className="absolute inset-x-0 bottom-0 h-0 bg-accent/[0.03]
                      transition-all duration-300 group-hover:h-full
                      rounded-2xl pointer-events-none" />

      <div className="relative w-11 h-11 rounded-xl shrink-0
                      bg-gray-50 border border-gray-100
                      flex items-center justify-center text-gray-400
                      transition-all duration-300 group-hover:scale-110
                      group-hover:bg-accent/10 group-hover:border-accent/20
                      group-hover:text-accent">
        {icon}
      </div>

      <div className="relative">
        <h3 className="font-display text-[16px] font-bold text-navy mb-2
                       tracking-[-0.01em] transition-colors duration-300
                       group-hover:text-accent">
          {title}
        </h3>
        <p className="font-body text-[13px] text-gray-400 leading-[1.7] font-light">
          {body}
        </p>
      </div>
    </div>
  );
}