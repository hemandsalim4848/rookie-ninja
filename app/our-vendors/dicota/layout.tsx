import Navbar from "@/src/components/common/Navbar";
import Footer from "@/src/components/common/Footer";

export default function DicotaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ '--color-accent': '#E2001A' } as React.CSSProperties}>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
