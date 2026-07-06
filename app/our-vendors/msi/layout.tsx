import Navbar from "@/src/components/common/Navbar";
import Footer from "@/src/components/common/Footer";

export default function MSILayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ '--color-accent': '#e4001b' } as React.CSSProperties}>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
