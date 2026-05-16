'use client';

import Animate from '../Animate';

const footerLinks = {
  Company: [
    { label: 'About Us',        href: '/about'        },
    { label: 'Mission & Vision', href: '/about/mission' },
    { label: 'Our Team',        href: '/about/team'    },
    { label: 'Careers',         href: '/careers'       },
  ],
  Solutions: [
    { label: 'Print',               href: '/portfolio' },
    { label: 'Scan',                href: '/portfolio' },
    { label: 'Consumer Electronics', href: '/portfolio' },
    { label: 'Gaming',              href: '/portfolio' },
    { label: 'Audio Visual',        href: '/portfolio' },
    { label: 'IT Accessories',      href: '/portfolio' },
  ],
  Partners: [
    { label: 'Vendors',   href: '/vendors'   },
    { label: 'Partners',  href: '/partners'  },
    { label: 'Portfolio', href: '/portfolio' },
  ],
  Contact: [
    { label: 'Contact Us',    href: '/contact'        },
    { label: 'Request a Quote', href: '/contact'      },
    { label: 'Support',       href: '/contact'        },
  ],
};

const socials = [
  {
    label: 'LinkedIn',
    href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.8"
           strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: 'Twitter / X',
    href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.8"
           strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4l16 16M4 20L20 4"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.8"
           strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.8"
           strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z"/>
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-white">

      {/* ── Main footer body ── */}
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr_1fr_1fr_1fr]
                        gap-12 lg:gap-8">

          {/* Brand column */}
          <Animate type="fade-up" delay={0}>
            <div className="flex flex-col gap-6">

              {/* Logo */}
              <a href="/" className="flex items-center gap-2.5 no-underline w-fit">
                <img
                  src="/logo.png"
                  alt="Rookie Ninja"
                  className="h-14 w-auto object-contain"
                />
              </a>

              {/* Tagline */}
              <p className="font-body text-[14px] text-white/50
                            leading-[1.75] font-light max-w-[220px]">
                Value Added Distribution across the Middle East &amp; Africa.
              </p>

              {/* Contact details */}
              <div className="flex flex-col gap-3">
                <a href="tel:+97144000000"
                   className="flex items-center gap-2.5 no-underline
                              text-white/50 hover:text-accent
                              transition-colors duration-200 group w-fit">
                  <span className="w-7 h-7 rounded-lg bg-white/[0.06]
                                   flex items-center justify-center
                                   group-hover:bg-accent/20
                                   transition-colors duration-200">
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                      <path d="M3 2h3l1.5 3.5L6 7a9 9 0 004 4l1.5-1.5L15 11v3a1 1 0 01-1 1A13 13 0 012 3a1 1 0 011-1z"
                            stroke="currentColor" strokeWidth="1.3" fill="none"
                            strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span className="font-body text-[13px]">+971 4 400 0000</span>
                </a>

                <a href="mailto:info@rookieninja.com"
                   className="flex items-center gap-2.5 no-underline
                              text-white/50 hover:text-accent
                              transition-colors duration-200 group w-fit">
                  <span className="w-7 h-7 rounded-lg bg-white/[0.06]
                                   flex items-center justify-center
                                   group-hover:bg-accent/20
                                   transition-colors duration-200">
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                      <rect x="1" y="3" width="14" height="10" rx="2"
                            stroke="currentColor" strokeWidth="1.3" fill="none"/>
                      <path d="M1 5l7 5 7-5" stroke="currentColor"
                            strokeWidth="1.3" strokeLinecap="round" fill="none"/>
                    </svg>
                  </span>
                  <span className="font-body text-[13px]">info@rookieninja.com</span>
                </a>
              </div>

              {/* Socials */}
              <div className="flex items-center gap-2">
                {socials.map((s) => (
                  <a key={s.label} href={s.href} title={s.label}
                     className="w-8 h-8 rounded-lg bg-white/[0.06]
                                text-white/40 flex items-center justify-center
                                transition-all duration-200
                                hover:bg-accent/20 hover:text-accent
                                no-underline">
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </Animate>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([group, links], i) => (
            <Animate key={group} type="fade-up" delay={(i + 1) * 80}>
              <div>
                <h4 className="font-display text-[13px] font-bold text-white
                               uppercase tracking-[0.12em] mb-5">
                  {group}
                </h4>
                <ul className="flex flex-col gap-3 list-none">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href}
                         className="font-body text-[13px] text-white/45
                                    no-underline transition-colors duration-200
                                    hover:text-accent flex items-center gap-1.5
                                    group w-fit">
                        <span className="w-0 h-px bg-accent transition-all
                                         duration-200 group-hover:w-3" />
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Animate>
          ))}

        </div>
      </div>

      {/* ── Divider ── */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-white/[0.07]" />
      </div>

      {/* ── Bottom bar ── */}
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex flex-col sm:flex-row items-center
                        justify-between gap-4">

          <p className="font-body text-[12px] text-white/30 text-center
                        sm:text-left">
            © {new Date().getFullYear()} Rookie Ninja. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            {['Privacy Policy', 'Terms of Use', 'Cookie Policy'].map((item) => (
              <a key={item} href="#"
                 className="font-body text-[12px] text-white/30
                            no-underline hover:text-white/60
                            transition-colors duration-200">
                {item}
              </a>
            ))}
          </div>

        </div>
      </div>

    </footer>
  );
}