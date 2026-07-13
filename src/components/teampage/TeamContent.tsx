'use client';

import { useState } from 'react';
import Animate from '../Animate';
import SectionHeader from '../SectionHeader';

const management = [
  {
    name: 'Swathy Sunilkumar',
    role: 'Head of Vendor Relations & Brand Development',
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1783926744/swathy-02_jdjdfj.png',
    bio: 'Driving strategic vendor partnerships and brand growth across the MEA region with a passion for building lasting relationships.',
    initials: 'SS',
    color: '#15A7DC',
    linkedin: 'https://www.linkedin.com/in/swathy-sunilkumar-32948139/',
  },
  {
    name: 'Steffy Jacob',
    role: 'Product Manager',
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1783926744/steffy_aymvbh.png',
    bio: 'Leading product strategy and portfolio development to ensure we always bring the most relevant technology to our partners.',
    initials: 'SJ',
    color: '#0F8FBD',
    linkedin: 'https://www.linkedin.com/in/steffy-jacob-a16897157',
  },
  {
    name: 'Felix Simon',
    role: 'Senior Account Manager — Export Sales',
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1783926744/felix-simon_c6semk.png',
    bio: 'Managing key export accounts with precision and a deep understanding of cross-border technology distribution.',
    initials: 'FS',
    color: '#0A7AA8',
    linkedin: 'https://www.linkedin.com/in/felix-simon-312b3717',
  },
  {
    name: 'Garros Rolland',
    role: 'Retail Sales & Export',
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1783926744/garros_nmrrmh.png',
    bio: 'Bridging retail and export channels to maximise reach and deliver consistent value to our growing partner network.',
    initials: 'GR',
    color: '#15A7DC',
    linkedin: 'https://www.linkedin.com/in/garros-rolland-26b304b9',
  },
  {
    name: 'Catherine Robit',
    role: 'Senior Account Manager — Channel Sales',
    image: 'https://res.cloudinary.com/df52xzi3y/image/upload/v1783926744/cath-01_cmtxoc.png',
    bio: 'Building and nurturing channel partnerships with a customer-first approach and an eye for long-term growth.',
    initials: 'CR',
    color: '#0F8FBD',
    linkedin: 'https://www.linkedin.com/in/catherine-robit-8a8765111',
  },
];

export default function TeamContent() {
  return (
    <main className="bg-white">

      {/* ── HERO BANNER ── */}
      <section className="relative min-h-[65vh] flex items-center overflow-hidden bg-white">
        <div className="absolute inset-0 z-0" style={{
          background: 'radial-gradient(ellipse 55% 55% at 80% 50%, rgba(21,167,220,0.06) 0%, transparent 70%)'
        }} />
        <div className="absolute inset-0 z-[1]" style={{
          backgroundImage: 'radial-gradient(rgba(10,22,40,0.05) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }} />

        {/* Decorative circles */}
        <div className="absolute right-[5%] top-1/2 -translate-y-1/2 z-[1]
                        hidden lg:block">
          <div className="relative w-[380px] h-[380px]">
            <div className="absolute inset-0 rounded-full border border-navy/[0.06]" />
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
            <h1 className="font-display font-bold text-navy
                           text-[clamp(36px,5vw,62px)]
                           leading-[1.1] tracking-[-0.02em] mb-6 max-w-xl">
              We Are <span className="text-accent">Rookie Ninja</span>
            </h1>
          </Animate>
          <Animate type="fade-up" delay={200}>
            <p className="font-body text-[16px] font-light text-gray-500
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
                         font-medium text-navy border border-gray-200
                         bg-gray-50 px-5 py-3 rounded-xl no-underline
                         transition-all duration-200
                         hover:bg-gray-100 hover:border-gray-300 group"
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
      <section className="py-20 px-6 bg-[#15A7DC]">
        <div className="max-w-6xl mx-auto">
          <Animate type="fade-up">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

              {/* Left — CEO image */}
              <div className="group relative mx-auto w-full max-w-[380px]
                              aspect-[5/6]">
                <div className="absolute inset-0 rounded-full bg-accent/25
                                blur-3xl scale-90 opacity-0
                                group-hover:opacity-100 group-hover:scale-100
                                transition-all duration-500" />
                <img src="https://res.cloudinary.com/df52xzi3y/image/upload/v1783926744/shashank-f-3_vqsby0.png"
                     alt="Shashank, Founder of Rookie Ninja"
                     className="relative w-full h-full object-contain grayscale
                                group-hover:grayscale-0 group-hover:scale-105
                                transition-all duration-500" />
              </div>

              {/* Right — quote */}
              <div className="relative">
                <div className="absolute -left-2 -top-2 text-[120px] leading-none
                                font-display font-bold text-white/15 select-none
                                pointer-events-none">
                  "
                </div>
                <div className="relative">
                  <p className="font-body text-[11px] font-medium tracking-[0.2em]
                                uppercase text-white/80 mb-4">
                    Message from our Founder
                  </p>
                  <blockquote className="font-display text-[clamp(22px,2.5vw,32px)]
                                         font-bold text-white leading-[1.35]
                                         tracking-[-0.01em] mb-6">
                    The first step toward success is taken when you refuse to be
                    a captive of your{' '}
                    <span className="text-navy">own mind's restrictions.</span>
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-px bg-white" />
                    <span className="font-body text-[13px] text-white/70 font-medium">
                      Founder, Rookie Ninja
                    </span>
                    <a href="https://www.linkedin.com/in/shashankpatel10/"
                       target="_blank"
                       rel="noopener noreferrer"
                       aria-label="Founder on LinkedIn"
                       className="inline-flex items-center justify-center w-8 h-8
                                  rounded-lg bg-white/10 text-white
                                  transition-all duration-300
                                  hover:bg-white hover:text-accent">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 11.01-4.13 2.07 2.07 0 01-.01 4.13zM7.12 20.45H3.56V9h3.56v11.45z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </Animate>
        </div>
      </section>

      {/* ── MANAGEMENT TEAM ── */}
      <section className="relative py-24 px-6 border-t border-gray-100 overflow-hidden">
        <div className="absolute inset-0 z-0" style={{
          backgroundImage: 'url(https://res.cloudinary.com/df52xzi3y/image/upload/v1783929135/4935872-scaled-1_cqwf33.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }} />
        <div className="relative z-10 max-w-6xl mx-auto">
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

    </main>
  );
}

/* ── Team Card ── */
function TeamCard({
  name, role, image, bio, initials, color, linkedin,
}: {
  name: string;
  role: string;
  image: string;
  bio: string;
  initials: string;
  color: string;
  linkedin: string;
}) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div className="group relative bg-white/50 rounded-2xl overflow-hidden
                    border border-gray-100 transition-all duration-300
                    hover:shadow-[0_8px_40px_rgba(21,167,220,0.12)]
                    hover:-translate-y-1 hover:border-accent/20">

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] z-10
                      bg-gradient-to-r from-accent/60 via-accent to-accent/60
                      scale-x-0 group-hover:scale-x-100
                      transition-transform duration-300 origin-left" />

      {/* Image / Avatar area */}
      <div className="relative w-[180px] h-[180px] sm:w-[220px] sm:h-[220px]
                      lg:w-[260px] lg:h-[260px] mx-auto mt-8 overflow-hidden rounded-full">
        {!imgFailed ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover grayscale scale-[1.15]
                       group-hover:grayscale-0 transition-all duration-500"
            onError={() => setImgFailed(true)}
          />
        ) : (
          /* Fallback avatar shown when image fails */
          <div className="absolute inset-0 flex items-center justify-center"
               style={{ background: `linear-gradient(135deg, #0A1628, #0F2040)` }}>
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center
                            text-[28px] font-display font-bold text-white"
                 style={{ background: color }}>
              {initials}
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 text-center flex flex-col items-center">
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
        <a href={linkedin}
           target="_blank"
           rel="noopener noreferrer"
           aria-label={`${name} on LinkedIn`}
           className="inline-flex items-center justify-center w-9 h-9
                      rounded-lg bg-accent/10 text-accent
                      transition-all duration-300
                      hover:bg-accent hover:text-white">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 11.01-4.13 2.07 2.07 0 01-.01 4.13zM7.12 20.45H3.56V9h3.56v11.45z"/>
          </svg>
        </a>
      </div>
    </div>
  );
}
