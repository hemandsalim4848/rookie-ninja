import Navbar from "@/src/components/common/Navbar";
import Footer from "@/src/components/common/Footer";

export default function AerocoolLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ '--color-accent': '#4594e1' } as React.CSSProperties}>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
