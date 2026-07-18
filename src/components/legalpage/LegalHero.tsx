import Animate from '../Animate';

export default function LegalHero({ title, meta }: { title: string; meta: string }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 z-0" style={{
        background: `
          radial-gradient(ellipse 60% 60% at 75% 50%, rgba(21,167,220,0.1) 0%, transparent 70%),
          linear-gradient(150deg, #0A1628 0%, #0F2040 60%, #0A1628 100%)`,
      }} />
      <div className="absolute inset-0 z-[1]" style={{
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize: '36px 36px',
      }} />
      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-[140px] pb-16 text-center">
        <Animate type="fade-up">
          <div className="inline-flex items-center gap-2 text-[10.5px] font-medium
                          tracking-[0.15em] uppercase text-accent mb-6 px-3.5
                          py-1.5 pl-2 rounded-full border border-[rgba(21,167,220,0.25)]
                          bg-[rgba(21,167,220,0.12)]">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-blink-dot" />
            Legal &amp; Compliance
          </div>
        </Animate>
        <Animate type="fade-up" delay={100}>
          <h1 className="font-display font-bold text-white
                         text-[clamp(32px,5vw,48px)]
                         leading-[1.1] tracking-[-0.02em] mb-4">
            {title}
          </h1>
        </Animate>
        <Animate type="fade-up" delay={200}>
          <p className="font-body text-[13px] text-white/50 tracking-wide">
            {meta}
          </p>
        </Animate>
      </div>
    </section>
  );
}
