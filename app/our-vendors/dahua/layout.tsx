import Navbar from "@/src/components/common/Navbar";
import Footer from "@/src/components/common/Footer";

export default function DahuaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ '--color-accent': '#E31837' } as React.CSSProperties}>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
