export function Bullets({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function CheckCrossColumns({
  allowTitle, allowItems, denyTitle, denyItems,
}: {
  allowTitle: string; allowItems: string[];
  denyTitle: string; denyItems: string[];
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
      <div className="rounded-xl border border-accent/20 bg-accent/[0.04] p-5">
        <p className="font-body text-[12px] font-semibold text-accent
                      uppercase tracking-[0.1em] mb-3 flex items-center gap-1.5">
          <span>✓</span>{allowTitle}
        </p>
        <ul className="space-y-2">
          {allowItems.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-[13.5px] text-navy/70">
              <span className="text-accent mt-0.5 shrink-0">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl border border-red-200 bg-red-50/50 p-5">
        <p className="font-body text-[12px] font-semibold text-red-500
                      uppercase tracking-[0.1em] mb-3 flex items-center gap-1.5">
          <span>✕</span>{denyTitle}
        </p>
        <ul className="space-y-2">
          {denyItems.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-[13.5px] text-navy/70">
              <span className="text-red-400 mt-0.5 shrink-0">✕</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function IconGrid({ items }: { items: { icon: string; title: string; desc: string }[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 not-prose">
      {items.map((item) => (
        <div key={item.title}
             className="flex items-start gap-3 p-4 rounded-xl
                        border border-gray-100 bg-gray-50/60">
          <span className="w-8 h-8 rounded-lg bg-accent/10 text-accent
                           flex items-center justify-center shrink-0 text-[15px]">
            {item.icon}
          </span>
          <div>
            <p className="font-body text-[13.5px] font-semibold text-navy mb-0.5">
              {item.title}
            </p>
            <p className="font-body text-[13px] text-gray-500 leading-[1.6] font-light">
              {item.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function InfoCards({ items }: { items: { title: string; desc: string }[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 not-prose">
      {items.map((item) => (
        <div key={item.title}
             className="p-4 rounded-xl border border-gray-100 bg-gray-50/60">
          <p className="font-body text-[13.5px] font-semibold text-navy mb-1">
            {item.title}
          </p>
          <p className="font-body text-[13px] text-gray-500 leading-[1.6] font-light">
            {item.desc}
          </p>
        </div>
      ))}
    </div>
  );
}

export function ContactBlock() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16 border-t border-gray-100">
      <div className="rounded-2xl border border-gray-100 bg-gray-50/60 p-8 text-center">
        <p className="font-display text-[17px] font-bold text-navy mb-1">
          Rookie Ninja Distribution
        </p>
        <p className="font-body text-[13.5px] text-gray-500 mb-4">
          Al Nasr Sports Building 02, Oud Metha Road, Dubai — UAE
        </p>
        <div className="flex items-center justify-center gap-6 flex-wrap">
          <a href="tel:+97142965256"
             className="font-body text-[13.5px] text-accent no-underline
                        hover:text-[#0d8fb8] transition-colors">
            +971 4 296 5256
          </a>
          <a href="mailto:sales@rookie-ninja.com"
             className="font-body text-[13.5px] text-accent no-underline
                        hover:text-[#0d8fb8] transition-colors">
            sales@rookie-ninja.com
          </a>
          <a href="/"
             className="font-body text-[13.5px] text-accent no-underline
                        hover:text-[#0d8fb8] transition-colors">
            rookie-ninja.com
          </a>
        </div>
      </div>
    </div>
  );
}
