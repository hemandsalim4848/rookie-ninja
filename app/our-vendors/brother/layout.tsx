import Navbar from "@/src/components/common/Navbar";
import Footer from "@/src/components/common/Footer";

export default function BrotherLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ '--color-accent': '#003087' } as React.CSSProperties}>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
