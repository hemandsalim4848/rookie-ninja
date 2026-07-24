'use client';
import Animate from "../Animate";
import { BRAND_LOGOS } from "@/src/lib/brandLogos";

const clients = [
  { name: "Kodak Alaris", logo: BRAND_LOGOS.kodakAlaris },
  { name: "Brother",     logo: BRAND_LOGOS.brother },
  { name: "Canon",      logo: BRAND_LOGOS.canon },
  { name: "Czur",        logo: BRAND_LOGOS.czur },
  { name: "Colortrac",       logo: BRAND_LOGOS.colortrac },
  { name: "UNV",       logo: BRAND_LOGOS.unv },
  { name: "Silex",    logo: BRAND_LOGOS.silex },
  { name: "Viewsonic",  logo: BRAND_LOGOS.viewsonic },
  { name: "Dicota",    logo: BRAND_LOGOS.dicota },
  { name: "Belkin",    logo: BRAND_LOGOS.belkin },
  { name: "MSI",   logo: BRAND_LOGOS.msi },
  { name: "Aztech", logo: BRAND_LOGOS.aztech },
  { name: "Deli",    logo: BRAND_LOGOS.deli },
  { name: "Contex",     logo: BRAND_LOGOS.contex },
  { name: "Dahua",   logo: BRAND_LOGOS.dahua },
  { name: "Fujitsu",    logo: BRAND_LOGOS.fujitsu },
  { name: "Aerocool",   logo: BRAND_LOGOS.aerocool },
  // { name: "Rowe",    logo: BRAND_LOGOS.rowe },
  { name: "Ezofis",   logo: BRAND_LOGOS.ezofis },
  { name: "Ricoh",    logo: BRAND_LOGOS.ricoh },
  { name: "Readiris", logo: BRAND_LOGOS.iris },
];

export default function ClientLogos() {
  const marqueeItems = [...clients, ...clients];

  return (
    <section className="relative py-10 md:py-16 overflow-hidden bg-white border-t border-gray-100">

      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-[calc((100%-72rem)/2+3rem)] z-10 pointer-events-none min-w-16"
     style={{ background: 'linear-gradient(to right, white 60%, transparent)' }} />
<div className="absolute right-0 top-0 bottom-0 w-[calc((100%-72rem)/2+3rem)] z-10 pointer-events-none min-w-16"
     style={{ background: 'linear-gradient(to left, white 60%, transparent)' }} />


{/* Heading */}
<div className="max-w-6xl mx-auto px-6">
    <Animate type="fade-up">
<div className="text-center mb-12">
  <div className="inline-flex items-center gap-3">
    <span className="block w-8 h-px bg-accent shrink-0" />
    <span className="font-body text-[11px] font-medium
                     tracking-[0.22em] uppercase text-accent">
      Brands we represent
    </span>
    <span className="block w-8 h-px bg-accent shrink-0" />
  </div>
</div>
</Animate>

      {/* Marquee */}
      <Animate type="fade-up" delay={150}>
      <div className="flex">
        <div className="flex gap-8 animate-marquee whitespace-nowrap">
          {marqueeItems.map((client, i) => (
            <LogoCard key={`${client.name}-${i}`} name={client.name} logo={client.logo} />
          ))}
        </div>
      </div>
      </Animate>
      </div>
    </section>
  );
}

function LogoCard({ name, logo }: { name: string; logo: string }) {
  return (
    <div className="flex items-center justify-center px-8 shrink-0
                    rounded-xl
                    transition-all duration-300
                     w-[160px] h-[80px] group">
      <img
        src={logo}
        alt={name}
        className="max-h-8 max-w-[110px] w-auto object-contain
                    transition-all duration-300
                   group-hover:opacity-100 group-hover:grayscale-0"
      />
      {/* opacity-50 grayscale (in case if need grey logos) */} 
    </div>
  );
}