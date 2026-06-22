import Navbar from "@/src/components/common/Navbar";
import Footer from "@/src/components/common/Footer";

export default function UNVLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ '--color-accent': '#0088cc' } as React.CSSProperties}>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
