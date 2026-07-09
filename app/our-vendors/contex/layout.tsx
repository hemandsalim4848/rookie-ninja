export default function ContexLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ '--color-accent': '#007A73' } as React.CSSProperties}>
      {children}
    </div>
  );
}
