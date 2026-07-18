export default function LegalSection({
  num, id, title, children,
}: {
  num: string; id: string; title: string; children: React.ReactNode;
}) {
  return (
    <section id={id} className="py-8 border-t border-gray-100 scroll-mt-28">
      <div className="flex items-start gap-4 mb-4">
        <span className="shrink-0 w-9 h-9 rounded-xl bg-accent/10 text-accent
                         font-display font-bold text-[13px]
                         flex items-center justify-center mt-0.5">
          {num}
        </span>
        <h2 className="font-display text-[19px] font-bold text-navy leading-snug pt-1.5">
          {title}
        </h2>
      </div>
      <div className="font-body text-[14px] text-gray-500 leading-[1.8]
                      font-light space-y-4 pl-[52px]">
        {children}
      </div>
    </section>
  );
}
