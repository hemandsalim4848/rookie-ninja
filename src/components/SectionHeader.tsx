interface SectionHeaderProps {
  label?: string;        // small accent text above  e.g. "Who We Are"
  heading: string;       // main title               e.g. "Value Added Distribution"
  subheading?: string;   // description below        e.g. "We empower businesses..."
  align?: 'left' | 'center';  // default: center
}

export default function SectionHeader({
  label,
  heading,
  subheading,
  align = 'center',
}: SectionHeaderProps) {
  const isCenter = align === 'center';

  return (
    <div className={`mb-12 ${isCenter ? 'text-center' : 'text-left'}`}>

      {/* Label */}
      {label && (
        <div className={`inline-flex items-center gap-3 mb-4
                         ${isCenter ? 'justify-center' : 'justify-start'}`}>
          <span className="block w-8 h-px bg-accent shrink-0" />
          <span className="font-body text-[11px] font-medium
                           tracking-[0.22em] uppercase text-accent">
            {label}
          </span>
          <span className="block w-8 h-px bg-accent shrink-0" />
        </div>
      )}

      {/* Heading */}
      <h2 className="font-display font-bold text-navy
                     text-[clamp(28px,4vw,42px)]
                     leading-[1.15] tracking-[-0.02em]">
        {heading}
      </h2>

      {/* Subheading */}
      {subheading && (
        <p className={`font-body text-[16px] font-light
                       text-gray-500 leading-[1.7] mt-4
                       ${isCenter ? 'max-w-2xl mx-auto' : 'max-w-xl'}`}>
          {subheading}
        </p>
      )}

    </div>
  );
}