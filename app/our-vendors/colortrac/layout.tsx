import Navbar from "@/src/components/common/Navbar";
import Footer from "@/src/components/common/Footer";

export default function ColortracLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ '--color-accent': '#004E33' } as React.CSSProperties}>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
