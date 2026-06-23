import Navbar from "@/src/components/common/Navbar";
import Footer from "@/src/components/common/Footer";

export default function CanonLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ '--color-accent': '#CC0000' } as React.CSSProperties}>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
