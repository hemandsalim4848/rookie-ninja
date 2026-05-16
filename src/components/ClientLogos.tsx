'use client';
import Animate from "./Animate";

const clients = [
  { name: "Kodak Alaris", logo: "/logos/Kodak-alaris-logo.png" },
  { name: "Brother",     logo: "/logos/brother-logo.png" },
  { name: "Canon",      logo: "/logos/canon-logo.png" },
  { name: "Czur",        logo: "/logos/czur-logo.webp" },
  { name: "Colortrac",       logo: "/logos/colortrac-logo.png" },
  { name: "UNV",       logo: "/logos/unv-logo.svg" },
  { name: "Silex",    logo: "/logos/silex-logo.png" },
  { name: "Viewsonic",  logo: "/logos/viewsonic-logo.webp" },
  { name: "Dicota",    logo: "/logos/dicota-logo.webp" },
  { name: "Belkin",    logo: "/logos/belkin_logo.svg" },
  { name: "MSI",   logo: "/logos/msi-logo.png" },
  { name: "Aztech", logo: "/logos/aztech-logo.png" },
  { name: "Deli",    logo: "/logos/deli-logo.png" },
  { name: "Contex",     logo: "/logos/contex-logo.png" },
  { name: "Dahua",   logo: "/logos/dahua-logo.png" },
  { name: "Fujitsu",    logo: "/logos/fujitsu-logo.svg" },
  { name: "Aerocool",   logo: "/logos/aerocool-logo.svg" },
  { name: "Rowe",    logo: "/logos/rowe-logo.png" },
  
];

export default function ClientLogos() {
  const marqueeItems = [...clients, ...clients];

  return (
    <section className="relative py-16 overflow-hidden bg-white border-t border-gray-100">

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
      Trusted by leading brands
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