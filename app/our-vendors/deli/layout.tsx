import Navbar from "@/src/components/common/Navbar";
import Footer from "@/src/components/common/Footer";

export default function DeliLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ '--color-accent': '#C41E3A' } as React.CSSProperties}>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
