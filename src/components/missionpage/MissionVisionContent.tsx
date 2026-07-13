'use client';

import Animate from '../Animate';
import SectionHeader from '../SectionHeader';

export default function MissionVisionContent() {
  return (
    <main className="bg-white">

      {/* ── HERO BANNER ── */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">

        {/* Background */}
        <div className="absolute inset-0 z-0" style={{
          background: `
            radial-gradient(ellipse 60% 60% at 70% 50%, rgba(21,167,220,0.1) 0%, transparent 70%),
            linear-gradient(155deg, #0A1628 0%, #0F2040 60%, #0A1628 100%)`
        }} />

        {/* Dot grid */}
        <div className="absolute inset-0 z-[1]" style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)',
        }} />

        {/* Orb */}
        <div className="absolute right-[10%] top-1/2 w-[400px] h-[400px]
                        rounded-full z-[1] opacity-60"
             style={{
               transform: 'translateY(-50%)',
               background: 'radial-gradient(circle, rgba(21,167,220,0.12) 0%, transparent 70%)'
             }} />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-[120px] pb-20">
          <Animate type="fade-up">
            <div className="inline-flex items-center gap-2 text-[10.5px] font-medium
                            tracking-[0.15em] uppercase text-accent mb-6 px-3.5 py-1.5
                            pl-2 rounded-full border border-[rgba(21,167,220,0.25)]
                            bg-[rgba(21,167,220,0.12)]">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-blink-dot" />
              About Rookie Ninja
            </div>
          </Animate>

          <Animate type="fade-up" delay={100}>
            <h1 className="font-display font-bold text-white
                           text-[clamp(36px,5vw,62px)]
                           leading-[1.1] tracking-[-0.02em] mb-6 max-w-2xl">
              Mission &amp; <span className="text-accent">Vision</span>
            </h1>
          </Animate>

          <Animate type="fade-up" delay={200}>
            <p className="font-body text-[17px] font-light text-white/60
                          leading-[1.75] max-w-xl">
              We are driven by a relentless pursuit of innovation, a passion for technology, and an unwavering commitment to adapt quickly to the ever-evolving distribution landscape.
            </p>
          </Animate>

          {/* Two pill stats */}
          <Animate type="fade-up" delay={300}>
            <div className="flex flex-wrap gap-4 mt-10">
              {[
                { value: 'Since 2018', label: 'Established' },
                { value: 'MEA, CIS & India',  label: 'Coverage'    },
                { value: '20+ Brands', label: 'Vendor Network' },
              ].map(({ value, label }) => (
                <div key={label}
                     className="flex items-center gap-3 px-5 py-3 rounded-xl
                                border border-white/10 bg-white/[0.04]">
                  <div>
                    <div className="font-display text-[15px] font-bold text-accent">
                      {value}
                    </div>
                    <div className="font-body text-[10px] text-white/40
                                    uppercase tracking-[0.1em]">
                      {label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Animate>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section className="bg-white py-24 px-6 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">

          <Animate type="fade-up">
            <SectionHeader
              label="Our Mission"
              heading="Leading the Way Forward"
              subheading="Our mission as a dynamic and forward-thinking company is to lead by continuously adapting to changing trends and catering to the demands of our channel partners."
              align="center"
            />
          </Animate>

          {/* Mission statement */}
          <div className="flex flex-col lg:flex-row items-center gap-12 mt-16">
            <Animate type="fade-up" className="w-full lg:w-1/2">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                <img src="https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1783857793/photo-1600880292203-757bb62b4baf_cmbjv2.jpg"
                     alt="Rookie Ninja driving customer satisfaction"
                     className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-navy/10" />
              </div>
            </Animate>

            <Animate type="fade-up" delay={100} className="w-full lg:w-1/2">
              <p className="font-body text-[16px] text-gray-500 leading-[1.9]
                            font-light">
                Our mission is to stay ahead of an industry that never stands still — anticipating trends, embracing new technologies, and adapting with agility as the market shifts. We put customer satisfaction at the heart of everything we do, going beyond expectations on every delivery and every interaction. Through tailored solutions, competitive pricing, and a genuine culture of excellence, we create win-win outcomes for our partners and build a business built on reliability, collaboration, and trust.
              </p>
            </Animate>
          </div>
        </div>
      </section>

      {/* ── DIVIDER BANNER ── */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0" style={{
          background: 'linear-gradient(135deg, #0A1628 0%, #0F2040 100%)'
        }} />
        <div className="absolute inset-0 z-[1]" style={{
          backgroundImage: 'radial-gradient(rgba(21,167,220,0.06) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }} />
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <Animate type="fade-up">
            <p className="font-body text-[11px] font-medium tracking-[0.2em]
                          uppercase text-accent mb-4">
              Our Philosophy
            </p>
            <blockquote className="font-display text-[clamp(22px,3.5vw,38px)]
                                   font-bold text-white leading-[1.3]
                                   max-w-3xl mx-auto">
              "We don't just follow trends —
              <span className="text-accent"> we shape them.</span>"
            </blockquote>
            <p className="font-body text-[14px] text-white/40 mt-5">
              — Rookie Ninja
            </p>
          </Animate>
        </div>
      </section>

      {/* ── VISION ── */}
      <section className="py-24 px-6 border-t border-gray-100"
               style={{ background: 'linear-gradient(180deg, #f8fbff 0%, #ffffff 100%)' }}>
        <div className="max-w-6xl mx-auto">

          <Animate type="fade-up">
            <SectionHeader
              label="Our Vision"
              heading="Shaping the Future of IT"
              subheading="At Rookie Ninja, we are the vanguard of change — driven by innovation, passion for technology, and a commitment to lead the evolving distribution landscape."
              align="center"
            />
          </Animate>

          {/* Vision statement */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 mt-16">
            <Animate type="fade-up" className="w-full lg:w-1/2">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                <img src="https://res.cloudinary.com/df52xzi3y/image/upload/f_auto,q_auto/v1783857792/photo-1582213782179-e0d53f98f2ca_ibz3ip.jpg"
                     alt="Rookie Ninja building a connected partner ecosystem"
                     className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-navy/10" />
              </div>
            </Animate>

            <Animate type="fade-up" delay={100} className="w-full lg:w-1/2">
              <p className="font-body text-[16px] text-gray-500 leading-[1.9]
                            font-light">
                Our vision is to be at the forefront of the IT distribution landscape — not just observing change, but driving it. We aim to bring emerging technologies to market ahead of the curve, forge partnerships that empower businesses to thrive, and unlock new opportunities across untapped markets. Above all, we're committed to building a connected ecosystem — one where suppliers, resellers, and end-users grow together, and where every customer is treated as a true partner in our shared success.
              </p>
            </Animate>
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="bg-white py-20 px-6 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <Animate type="fade-up">
            <div className="rounded-2xl overflow-hidden relative"
                 style={{
                   background: 'linear-gradient(135deg, #0A1628 0%, #0F2040 100%)'
                 }}>

              {/* Glow */}
              <div className="absolute right-0 top-0 w-[400px] h-[400px]
                              rounded-full pointer-events-none"
                   style={{
                     background: 'radial-gradient(circle, rgba(21,167,220,0.12) 0%, transparent 60%)',
                     transform: 'translate(30%, -30%)'
                   }} />

              <div className="relative z-10 flex flex-col lg:flex-row
                              items-center justify-center gap-8 lg:gap-20 p-12">
                <div className="lg:ml-12">
                  <p className="font-body text-[11px] font-medium tracking-[0.18em]
                                uppercase text-accent mb-3">
                    Join Our Journey
                  </p>
                  <h2 className="font-display text-[clamp(24px,3vw,36px)] font-bold
                                 text-white leading-[1.2] max-w-lg">
                    Ready to grow with a partner who shares your ambition?
                  </h2>
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
                            strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
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

