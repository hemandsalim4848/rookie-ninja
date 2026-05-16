'use client';

import Animate from '../Animate';
import SectionHeader from '../SectionHeader';

const missionPoints = [
  {
    title: 'Staying Ahead of the Curve',
    body: 'In the fast-paced world of IT, staying ahead is crucial. We anticipate industry trends and proactively adapt to the changing technological landscape — embracing emerging technologies, identifying market shifts, and navigating new opportunities with agility and precision.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
  {
    title: 'Driving Customer Satisfaction',
    body: 'Customer satisfaction is at the heart of everything we do. Our dedicated team goes the extra mile to ensure every interaction, every delivery, and every solution exceeds expectations. We listen, we respond, and we continuously improve.',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80',
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
    title: 'Delivering Exceptional Value',
    body: 'We believe true success is achieved when we create win-win scenarios for all parties. Through comprehensive distribution services, tailored solutions, and competitive pricing, we maximize the value our partners derive from our collaboration.',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
  },
  {
    title: 'Cultivating a Culture of Excellence',
    body: 'We foster a culture of hard work, continuous improvement, and relentless pursuit of excellence. Through ongoing training, personal development, and a supportive environment, our passionate professionals push boundaries and achieve greatness.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 20V10M12 20V4M6 20v-6"/>
      </svg>
    ),
  },
  {
    title: 'Empowering Success Through Collaboration',
    body: 'We believe in the power of collaboration to drive success. By establishing strong partnerships with suppliers, resellers, and end-users, we foster a supportive ecosystem that thrives on mutual growth through open communication and shared goals.',
    image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&q=80',
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
    title: 'Providing Unparalleled Reliability',
    body: 'Reliability is the cornerstone of our mission. We consistently deliver on our promises, meet deadlines, and exceed expectations — with attention to detail, prompt response times, and a steadfast commitment to dependable service at every step.',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  
];

const visionPoints = [
  {
    title: 'Unleashing the Power of Adaptability',
    body: "We don't fear change — we embrace it. Our vision is to be at the forefront of industry trends, always one step ahead. With agility and the ability to pivot, disrupt, and transform, we empower businesses to thrive in a rapidly changing digital landscape.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
  },
  {
    title: 'Shaping the Next Technological Frontiers',
    body: 'Technology has the power to shape the world. Our vision is to be the catalyst for technological breakthroughs — identifying emerging trends, bringing cutting-edge solutions to market, and actively shaping the next frontiers rather than just observing them.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
      </svg>
    ),
  },
  {
    title: 'Empowering Businesses for Success',
    body: 'Our vision is to empower businesses to reach their full potential. By forging strategic partnerships, nurturing relationships, and providing exceptional distribution services, we enable businesses to thrive and remain competitive in the digital age.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
  },
  {
    title: 'Fueling Growth and Transformation',
    body: "We are not satisfied with the status quo. We actively seek new opportunities, explore untapped markets, and unlock hidden potential. By fostering an entrepreneurial mindset and encouraging calculated risks, we ignite innovation and create pathways for unlimited growth.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="20" x2="12" y2="10"/>
        <line x1="18" y1="20" x2="18" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="16"/>
      </svg>
    ),
  },
  {
    title: 'Championing Collaboration and Connectivity',
    body: 'In an interconnected world, collaboration is essential. Our vision is to champion partnerships that bridge the gap between suppliers, resellers, and end-users — creating a thriving ecosystem that fuels collective success across the IT distribution landscape.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
      </svg>
    ),
  },
  {
    title: 'Delivering Unrivaled Customer Experiences',
    body: 'Customer satisfaction is at the heart of our vision. By understanding unique needs, challenges, and aspirations, we provide tailored solutions, personalized support, and exceptional service. Our customers are not just clients — they are partners on the journey to mutual success.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
      </svg>
    ),
  },
];

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
              We are driven by a relentless pursuit of innovation, a passion for
              technology, and an unwavering commitment to adapt quickly to the
              ever-evolving distribution landscape.
            </p>
          </Animate>

          {/* Two pill stats */}
          <Animate type="fade-up" delay={300}>
            <div className="flex flex-wrap gap-4 mt-10">
              {[
                { value: 'Since 2009', label: 'Established' },
                { value: 'MEA & CIS',  label: 'Coverage'    },
                { value: '40+ Brands', label: 'Vendor Network' },
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

          {/* Mission cards — alternating layout */}
          <div className="flex flex-col gap-6 mt-16">
            {missionPoints.map((point, i) => (
              <Animate key={point.title} type="fade-up" delay={i * 60}>
                <MissionCard {...point} index={i} />
              </Animate>
            ))}
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

          {/* Vision grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-16">
            {visionPoints.map((point, i) => (
              <Animate key={point.title} type="fade-up" delay={i * 80}>
                <VisionCard {...point} index={i} />
              </Animate>
            ))}
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
                              items-center justify-between gap-8 p-12">
                <div>
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

/* ── Mission Card — alternating image/text layout ── */
function MissionCard({
  title, body, image, icon, index,
}: {
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
      <div className="relative w-full lg:w-[340px] h-[220px] lg:h-auto
                      shrink-0 overflow-hidden bg-gray-100">
        <img src={image} alt={title}
             className="w-full h-full object-cover transition-transform
                        duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-navy/30
                        group-hover:bg-navy/10 transition-all duration-300" />

        {/* Number overlay */}
        <div className="absolute top-4 left-4 w-9 h-9 rounded-lg
                        bg-accent flex items-center justify-center
                        text-white font-display font-bold text-[13px]">
          {String(index + 1).padStart(2, '0')}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-8 flex flex-col justify-center bg-white relative">
        {/* Top accent line */}
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

/* ── Vision Card ── */
function VisionCard({
  title, body, icon, index,
}: {
  title: string;
  body: string;
  icon: React.ReactNode;
  index: number;
}) {
  return (
    <div className="group relative bg-white rounded-2xl p-8
                    border border-gray-100 overflow-hidden
                    shadow-[0_2px_16px_rgba(0,0,0,0.04)]
                    transition-all duration-300
                    hover:-translate-y-1 hover:border-accent/20
                    hover:shadow-[0_12px_40px_rgba(21,167,220,0.1)]
                    flex flex-col">

      {/* Background number */}
      <span className="absolute right-5 top-4 font-display font-bold
                       text-[60px] leading-none select-none text-gray-50
                       pointer-events-none transition-all duration-300
                       group-hover:text-accent/[0.07]">
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Accent fill */}
      <div className="absolute inset-x-0 bottom-0 h-0 bg-accent/[0.03]
                      transition-all duration-300 group-hover:h-full
                      rounded-2xl pointer-events-none" />

      {/* Left border */}
      <div className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full
                      bg-gray-100 transition-all duration-300
                      group-hover:bg-accent group-hover:top-4 group-hover:bottom-4" />

      {/* Icon */}
      <div className="relative w-11 h-11 rounded-xl mb-6
                      bg-gray-50 border border-gray-100
                      flex items-center justify-center text-gray-400
                      transition-all duration-300 group-hover:scale-110
                      group-hover:bg-accent/10 group-hover:border-accent/20
                      group-hover:text-accent">
        {icon}
      </div>

      <h3 className="relative font-display text-[16px] font-bold text-navy
                     tracking-[-0.01em] mb-3 transition-colors duration-300
                     group-hover:text-accent">
        {title}
      </h3>

      <div className="w-6 h-px bg-gray-200 mb-3 transition-all duration-300
                      group-hover:w-10 group-hover:bg-accent/40" />

      <p className="relative font-body text-[13px] leading-[1.7] font-light
                    text-gray-400">
        {body}
      </p>
    </div>
  );
}