export default function QuickNav({ items }: { items: { id: string; label: string }[] }) {
  return (
    <div className="bg-gray-50/60 border border-gray-100 rounded-2xl p-6 md:p-8">
      <p className="font-body text-[11px] font-semibold text-accent
                    uppercase tracking-[0.14em] mb-4">
        Quick Navigation
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2.5">
        {items.map((item, i) => (
          <a key={item.id} href={`#${item.id}`}
             className="font-body text-[13px] text-navy/70 no-underline
                        hover:text-accent transition-colors duration-200
                        flex items-center gap-2">
            <span className="text-accent/50 text-[11px] tabular-nums shrink-0">
              {String(i + 1).padStart(2, '0')}
            </span>
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}
