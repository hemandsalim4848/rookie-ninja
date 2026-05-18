'use client';

import Animate from '../Animate';
import SectionHeader from '../SectionHeader';

/* ── Brand partner logos ── */
const brandPartners = [
  { name: 'Ezofis', logo: '/logos/ezofis-logo.png' },
];

/* ── Main Page ── */
export default function SoftwareSolutionsPage() {
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
            { label: 'Software Solutions',  value: '10+' },
            { label: 'Brand Partners',      value: '5+'  },
            { label: 'Businesses Supported',value: '200+'},
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
              Software Solutions
            </div>
          </Animate>

          <Animate type="fade-up" delay={100}>
            <h1 className="font-display font-bold text-white leading-[1.1]
                           tracking-[-0.02em] mb-5 max-w-xl"
                style={{ fontSize: 'clamp(36px, 5vw, 60px)' }}>
              Premium Software for{' '}
              <span className="text-accent">Every Business</span>
            </h1>
          </Animate>

          <Animate type="fade-up" delay={200}>
            <p className="font-body text-white/60 leading-[1.8] max-w-lg"
               style={{ fontSize: '16px', fontWeight: 300 }}>
              At Rookie Ninja, we offer premium software solutions, each catering to
              your business requirement. We provide expert guidance and technical support
              to promote growth and business development.
            </p>
          </Animate>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          INTRO
      ══════════════════════════════════════════ */}
      <section className="py-24 px-6 border-t border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto">
          <Animate type="fade-up">
            <SectionHeader
              label="Software Solutions"
              heading="Simplifying Your Digital Journey"
              subheading="Rookie Ninja specializes in information management and information capture solutions. Our portfolio includes document management and solutions from multiple vendors that cater to your specific requirement, to help improve work performance and overall enhance efficiency."
              align="center"
            />
          </Animate>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          DARK HIGHLIGHT BAND
      ══════════════════════════════════════════ */}
      <section className="py-20 px-6" style={{ background: '#0A1628' }}>
        <div className="max-w-4xl mx-auto text-center">
          <Animate type="fade-up">

            {/* quote mark */}
            <div className="flex justify-center mb-6">
              <div className="w-10 h-10 rounded-xl bg-accent/20 text-accent
                              flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.3 5.1A9 9 0 005 14.3V19h4.7v-4.3h-3a5 5 0 014.6-5.4V5.1zM19.3 5.1A9 9 0 0013 14.3V19h4.7v-4.3h-3a5 5 0 014.6-5.4V5.1z"/>
                </svg>
              </div>
            </div>

            <p className="font-body text-white leading-[1.85] max-w-3xl mx-auto"
               style={{ fontSize: 'clamp(15px, 2vw, 18px)', fontWeight: 300 }}>
              Our dynamic software solutions revolutionize the way you do business,
              streamlining workflows and empowering your team with performance and speed
              for enhancing workflow capability. We seamlessly integrate with your existing
              system and ensure maximum productivity and growth while providing support and
              comprehensive training for a seamless experience.
            </p>

            {/* accent divider */}
            <div className="flex items-center justify-center gap-3 mt-8">
              <div className="w-8 h-[1px] bg-accent/40" />
              <div className="w-2 h-2 rounded-full bg-accent" />
              <div className="w-8 h-[1px] bg-accent/40" />
            </div>

          </Animate>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          BRAND PARTNERS
      ══════════════════════════════════════════ */}
      <section className="py-16 px-6 border-t border-gray-100"
               style={{ background: 'linear-gradient(180deg, #f8fbff 0%, #ffffff 100%)' }}>
        <div className="max-w-6xl mx-auto">
          <Animate type="fade-up">
            <p className="font-body text-center text-gray-400 mb-8 uppercase
                          tracking-[0.12em]"
               style={{ fontSize: '18px' }}>
              Our Brand Partners
            </p>
          </Animate>

          <Animate type="fade-up" delay={80}>
            <div className="flex flex-wrap justify-center items-center gap-4">
              {brandPartners.map(({ name, logo }) => (
                <div
                  key={name}
                  className="flex items-center justify-center px-8 py-5
                             rounded-xl border border-gray-100 bg-white
                             transition-all duration-200
                             hover:border-accent/30
                             hover:shadow-[0_4px_16px_rgba(21,167,220,0.08)]"
                  style={{ minWidth: '160px' }}
                >
                  <img
                    src={logo}
                    alt={name}
                    className="h-8 w-auto object-contain transition-opacity duration-200"
                    style={{ maxWidth: '120px' }}
                  />
                </div>
              ))}
            </div>
          </Animate>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          DOCUMENT MANAGEMENT SOLUTION
      ══════════════════════════════════════════ */}
      <section className="py-24 px-6 border-t border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left — content */}
            <Animate type="fade-right">
              <div className="flex flex-col">

                <p className="font-body font-semibold text-accent uppercase
                              tracking-wide mb-3"
                   style={{ fontSize: '12px', letterSpacing: '0.1em' }}>
                  Document Management
                </p>

                <h2 className="font-display font-bold text-navy leading-[1.15]
                               tracking-[-0.02em] mb-4"
                    style={{ fontSize: 'clamp(24px, 3vw, 38px)' }}>
                  Document Management Solution
                </h2>

                <div className="w-10 h-[2px] bg-accent rounded-full mb-6" />

                <p className="font-body text-gray-500 leading-[1.8] mb-8"
                   style={{ fontSize: '15px' }}>
                  We provide end-to-end document management software solutions that simplify
                  the capture, search, approval, security, and legal preservation of documents.
                  The flexible nature of our solution helps to adapt to each organization's
                  exact needs, rather than forcing end users to change the way they work.
                </p>

                {/* Feature pills */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {['Capture', 'Search', 'Approval', 'Security', 'Legal Preservation'].map((f) => (
                    <span
                      key={f}
                      className="font-body font-medium text-accent rounded-full"
                      style={{
                        fontSize: '12px',
                        padding: '5px 14px',
                        background: 'rgba(21,167,220,0.08)',
                        border: '0.5px solid rgba(21,167,220,0.25)',
                      }}
                    >
                      {f}
                    </span>
                  ))}
                </div>

                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 font-body font-medium
                             text-white bg-accent px-6 py-3 rounded-xl
                             transition-all duration-200 no-underline self-start
                             hover:opacity-85 hover:-translate-y-px
                             shadow-[0_4px_20px_rgba(21,167,220,0.3)]"
                  style={{ fontSize: '14px' }}
                >
                  Get in Touch
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4"
                          stroke="currentColor" strokeWidth="1.5"
                          strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </Animate>

            {/* Right — visual card */}
            <Animate type="fade-left" delay={100}>
              <div className="relative rounded-2xl overflow-hidden"
                   style={{
                     background: 'linear-gradient(135deg, #0A1628 0%, #0F2040 100%)',
                     padding: '40px',
                     minHeight: '380px',
                   }}>

                {/* Dot grid overlay */}
                <div className="absolute inset-0 opacity-30" style={{
                  backgroundImage: 'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }} />

                {/* Accent glow */}
                <div className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none"
                     style={{
                       background: 'radial-gradient(circle, rgba(21,167,220,0.15) 0%, transparent 70%)',
                     }} />

                <div className="relative z-10 flex flex-col h-full justify-between">

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-accent/20 text-accent
                                  flex items-center justify-center mb-6">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="1.6"
                         strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                      <line x1="16" y1="13" x2="8" y2="13"/>
                      <line x1="16" y1="17" x2="8" y2="17"/>
                      <polyline points="10 9 9 9 8 9"/>
                    </svg>
                  </div>

                  {/* Feature list */}
                  <div className="flex flex-col gap-4 flex-1">
                    {[
                      { icon: '📄', label: 'Intelligent Document Capture'   },
                      { icon: '🔍', label: 'Advanced Search & Retrieval'     },
                      { icon: '✅', label: 'Approval Workflow Automation'    },
                      { icon: '🔒', label: 'Enterprise-Grade Security'       },
                      { icon: '⚖️', label: 'Legal & Compliance Preservation' },
                    ].map(({ icon, label }) => (
                      <div key={label} className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/10
                                         flex items-center justify-center shrink-0 text-sm">
                          {icon}
                        </span>
                        <span className="font-body text-white/70"
                              style={{ fontSize: '13px' }}>
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Bottom label */}
                  <div className="mt-8 pt-5"
                       style={{ borderTop: '0.5px solid rgba(255,255,255,0.08)' }}>
                    <p className="font-body text-white/40 uppercase tracking-[0.1em]"
                       style={{ fontSize: '10px' }}>
                      Powered by Ezofis
                    </p>
                  </div>
                </div>
              </div>
            </Animate>

          </div>
        </div>
      </section>

    </main>
  );
}