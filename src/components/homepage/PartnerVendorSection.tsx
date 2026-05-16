'use client';

import Animate from '../Animate';

const items = [
  {
    tag: 'Partners',
    title: 'Partner With Us',
    body: 'We empower our partners with comprehensive support — from financing and marketing to certified training and end-to-end technical assistance. Join our growing network and unlock new opportunities.',
    cta: 'Become a Partner',
    href: '/partners',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80',
    flip: false,
  },
  {
    tag: 'Vendors',
    title: 'Become a Vendor',
    body: 'Partner with us to expand your reach. Join as a vendor and showcase your innovative solutions to a wide audience through our extensive distribution network across MEA and CIS.',
    cta: 'Become a Vendor',
    href: '/vendors',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80',
    flip: false,
  },
];

export default function PartnerVendorSection() {
  return (
    <section className="py-24 px-6 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto flex flex-col gap-5">
        {items.map((item, i) => (
          <Animate key={item.tag} type="fade-up" delay={i * 100}>
            <Card {...item} />
          </Animate>
        ))}
      </div>
    </section>
  );
}

function Card({
  tag, title, body, cta, href, image,
}: {
  tag: string;
  title: string;
  body: string;
  cta: string;
  href: string;
  image: string;
  flip: boolean;
}) {
  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden
                    border border-gray-100
                    shadow-[0_2px_24px_rgba(0,0,0,0.04)]
                    transition-all duration-300
                    hover:shadow-[0_8px_40px_rgba(21,167,220,0.08)]
                    hover:border-accent/20
                    grid grid-cols-1 lg:grid-cols-2 min-h-[320px]">

      {/* Left — content */}
      <div className="flex flex-col justify-center px-12 py-14
                      max-lg:px-8 max-lg:py-10">

        {/* Tag */}
        <div className="inline-flex items-center gap-2 mb-5 w-fit">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          <span className="font-body text-[11px] font-medium tracking-[0.18em]
                           uppercase text-accent">
            {tag}
          </span>
        </div>

        {/* Title */}
        <h2 className="font-display text-[clamp(28px,3vw,40px)] font-bold
                       text-navy leading-[1.15] tracking-[-0.02em] mb-4
                       transition-colors duration-300 group-hover:text-accent">
          {title}
        </h2>

        {/* Body */}
        <p className="font-body text-[14px] text-gray-500 font-light
                      leading-[1.8] mb-8 max-w-sm">
          {body}
        </p>

        {/* CTA */}
        <a href={href}
           className="inline-flex items-center gap-2 font-body text-[13px]
                      font-medium text-navy border border-navy/20
                      px-5 py-2.5 rounded-full no-underline w-fit
                      transition-all duration-200
                      hover:bg-accent hover:text-white hover:border-accent
                      group/btn">
          {cta}
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"
               className="transition-transform duration-200
                          group-hover/btn:translate-x-0.5">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor"
                  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>

      {/* Right — image */}
      <div className="relative overflow-hidden min-h-[260px] lg:min-h-0
                      rounded-b-3xl lg:rounded-b-none lg:rounded-r-3xl">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform
                     duration-700 group-hover:scale-105"
        />
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-navy/10
                        group-hover:bg-navy/0 transition-all duration-300" />

        {/* Accent corner badge */}
        <div className="absolute top-5 left-5 px-3 py-1.5 rounded-full
                        bg-white/90 backdrop-blur-sm border border-white/60
                        shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
          <span className="font-body text-[11px] font-medium text-navy
                           flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            Rookie Ninja
          </span>
        </div>
      </div>

    </div>
  );
}