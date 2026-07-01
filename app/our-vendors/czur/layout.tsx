import Navbar from "@/src/components/common/Navbar";
import Footer from "@/src/components/common/Footer";

export default function CzurLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ '--color-accent': '#0057B8' } as React.CSSProperties}>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
