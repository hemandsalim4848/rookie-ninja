'use client';

import Animate from '../Animate';
import SectionHeader from '../SectionHeader';

/* ── Featured Products ── */
const featuredProducts = [
  {
    id: 'monitor',
    image: 'https://placehold.co/400x300/EFF6FF/15A7DC?text=LED+Monitor&font=poppins',
    title: 'Aztech 22″ LED Monitor',
  },
  {
    id: 'charger',
    image: 'https://placehold.co/400x300/EFF6FF/15A7DC?text=GaN+Charger&font=poppins',
    title: 'GaN Car HyperCharger 3 Ports 95W',
  },
  {
    id: 'headset',
    image: 'https://placehold.co/400x300/EFF6FF/15A7DC?text=Gaming+Headset&font=poppins',
    title: 'Wireless Gaming Headset with LED',
  },
  {
    id: 'earbuds',
    image: 'https://placehold.co/400x300/EFF6FF/15A7DC?text=Wireless+Earbuds&font=poppins',
    title: 'Wireless Earbuds with LED Digital Display Charging Case',
  },
];

/* ── Showcase Products (alternating layout) ── */
const showcaseProducts = [
  {
    id: 'tv',
    image: 'https://placehold.co/560x400/EFF6FF/15A7DC?text=AZTECH+75%22+TV&font=poppins',
    title: 'AZTECH 75 inch 4K Ultra HD Smart TV',
    description:
      'Elevate your viewing experience with the AZTECH 75-inch Smart TV, featuring an ultra-slim borderless design and a suite of smart features that bring your entertainment to life. Powered by Android 11, this TV offers a sleek and modern look with an expansive display, providing a crystal-clear picture that immerses you in every scene. Enjoy seamless streaming, smooth performance, and ultimate convenience all in one stunning package.',
    imageLeft: false,
  },
  {
    id: 'soundbar',
    image: 'https://placehold.co/560x400/EFF6FF/15A7DC?text=AZTECH+Soundbar&font=poppins',
    title: 'AZTECH 201 Soundbar with Wired Subwoofer',
    description:
      'The AZTECH 201 Soundbar with Wired Subwoofer delivers an exceptional audio experience with powerful 120W output and 2.1 channel sound. Designed to enhance your movies, music, and news listening, it features deep bass and three adjustable EQ modes for tailored sound. With Bluetooth 5.3, you can easily connect your devices wirelessly, while the HDMI (ARC) support ensures seamless integration with your TV.',
    imageLeft: true,
  },
  {
    id: 'keyboard',
    image: 'https://placehold.co/560x400/EFF6FF/15A7DC?text=Gaming+Keyboard+RGB&font=poppins',
    title: 'Mechanical Gaming Keyboard RGB',
    description:
      'Upgrade your game with the AZTECH Mechanical Gaming Keyboard RGB. Featuring a sleek, customizable RGB design, this keyboard brings your gaming experience to life with vibrant colors and dynamic lighting effects. Its mechanical key switches provide rapid responsiveness for those fast-paced gaming moments, while anti-ghosting technology ensures you never miss a command.',
    imageLeft: false,
  },
];

/* ── Main Page ── */
export default function ConsumerElectronicsPage() {
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
            { label: 'Product Categories', value: '10+' },
            { label: 'Brand Partners',     value: '15+' },
            { label: 'Products Available', value: '200+' },
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
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6
                        pt-[120px] pb-20">
          <Animate type="fade-up">
            <div className="inline-flex items-center gap-2 text-[10.5px] font-medium
                            tracking-[0.15em] uppercase text-accent mb-6 px-3.5
                            py-1.5 pl-2 rounded-full border border-[rgba(21,167,220,0.25)]
                            bg-[rgba(21,167,220,0.12)]">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-blink-dot" />
              Consumer Electronics
            </div>
          </Animate>

          <Animate type="fade-up" delay={100}>
            <h1 className="font-display font-bold text-white
                           leading-[1.1] tracking-[-0.02em] mb-5 max-w-xl"
                style={{ fontSize: 'clamp(36px, 5vw, 60px)' }}>
              Cutting-Edge{' '}
              <span className="text-accent">Computing Solutions</span>
            </h1>
          </Animate>

          <Animate type="fade-up" delay={200}>
            <p className="font-body text-white/60 leading-[1.8] max-w-lg"
               style={{ fontSize: '16px', fontWeight: 300 }}>
              Through our strategic partnerships with industry-leading brands,
              Rookie Ninja delivers an extensive range of innovative products
              tailored to your unique needs and preferences.
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
              label="Consumer Electronics"
              heading="Your Partner for Innovation"
              subheading="Through our strategic partnerships with some of the industry's foremost laptop and computing brands, Rookie Ninja proudly delivers an extensive range of cutting-edge computing solutions. Our commitment to excellence allows us to offer a wide array of innovative products, tailored to meet your unique needs and preferences."
              align="center"
            />
          </Animate>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FEATURED PRODUCTS GRID
      ══════════════════════════════════════════ */}
      <section className="py-24 px-6 border-t border-gray-100"
               style={{ background: 'linear-gradient(180deg, #f8fbff 0%, #ffffff 100%)' }}>
        <div className="max-w-6xl mx-auto">

          <Animate type="fade-up">
            <SectionHeader
              label="Featured Products"
              heading="Our Latest Offerings"
              align="center"
            />
          </Animate>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
            {featuredProducts.map((product, i) => (
              <Animate key={product.id} type="fade-up" delay={i * 70}>
                <div
                  className="group flex flex-col rounded-2xl bg-white border
                             overflow-hidden transition-all duration-300
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
                  {/* Image */}
                  <div className="relative overflow-hidden bg-[#EFF6FF]"
                       style={{ aspectRatio: '4/3' }}>
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform
                                 duration-500 group-hover:scale-[1.04]"
                    />
                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-accent
                                    opacity-0 group-hover:opacity-100
                                    transition-opacity duration-300" />
                  </div>

                  {/* Title + CTA */}
                  <div className="p-4 flex flex-col flex-1">
                    <p className="font-body font-semibold text-navy leading-[1.35] flex-1"
                       style={{ fontSize: '13px' }}>
                      {product.title}
                    </p>
                    <a
                      href="/products"
                      className="inline-flex items-center gap-1.5 font-body
                                 font-medium text-accent mt-3 no-underline
                                 transition-all duration-200 hover:gap-2.5"
                      style={{ fontSize: '12px' }}
                    >
                      Learn More
                      <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M9 4l4 4-4 4"
                              stroke="currentColor" strokeWidth="1.5"
                              strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </Animate>
            ))}
          </div>

          {/* View all */}
          <Animate type="fade-up" delay={120}>
            <div className="flex justify-center mt-12">
              <a
                href="/products"
                className="inline-flex items-center gap-2 font-body font-medium
                           text-white bg-accent px-6 py-3 rounded-xl
                           transition-all duration-200 no-underline
                           hover:opacity-85 hover:-translate-y-px
                           shadow-[0_4px_20px_rgba(21,167,220,0.3)]"
                style={{ fontSize: '14px' }}
              >
                View All Products
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4"
                        stroke="currentColor" strokeWidth="1.5"
                        strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </Animate>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ALTERNATING PRODUCT SHOWCASE
      ══════════════════════════════════════════ */}
      <section className="py-24 px-6 border-t border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col"
             style={{ gap: '96px' }}>

          {showcaseProducts.map((product) => (
            <div
              key={product.id}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
            >
              {/* Image — order changes based on imageLeft */}
              <Animate
                type={product.imageLeft ? 'fade-right' : 'fade-left'}
                className={product.imageLeft ? 'lg:order-1' : 'lg:order-2'}
              >
                <div className="relative w-full rounded-2xl overflow-hidden bg-[#EFF6FF]"
                     style={{ aspectRatio: '560/400' }}>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 pointer-events-none rounded-2xl"
                       style={{ boxShadow: 'inset 0 0 40px rgba(21,167,220,0.06)' }} />
                </div>
              </Animate>

              {/* Content */}
              <Animate
                type={product.imageLeft ? 'fade-left' : 'fade-right'}
                delay={100}
                className={product.imageLeft ? 'lg:order-2' : 'lg:order-1'}
              >
                <div className="flex flex-col">
                  <p className="font-body font-semibold text-accent uppercase
                                tracking-wide mb-3"
                     style={{ fontSize: '12px', letterSpacing: '0.1em' }}>
                    Featured Product
                  </p>

                  <h2 className="font-display font-bold text-navy leading-[1.15]
                                 tracking-[-0.02em] mb-4"
                      style={{ fontSize: 'clamp(22px, 3vw, 34px)' }}>
                    {product.title}
                  </h2>

                  <div className="w-10 h-[2px] bg-accent rounded-full mb-5" />

                  <p className="font-body text-gray-500 leading-[1.8] mb-8"
                     style={{ fontSize: '15px' }}>
                    {product.description}
                  </p>

                  <a
                    href="/products"
                    className="inline-flex items-center gap-2 font-body font-medium
                               text-accent border border-accent/40 px-5 py-2.5
                               rounded-xl transition-all duration-200 no-underline
                               self-start hover:bg-accent hover:text-white
                               hover:border-accent hover:-translate-y-px"
                    style={{ fontSize: '13px' }}
                  >
                    View Product
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4"
                            stroke="currentColor" strokeWidth="1.5"
                            strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              </Animate>
            </div>
          ))}

        </div>
      </section>

    </main>
  );
}