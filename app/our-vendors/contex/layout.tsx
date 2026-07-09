import Navbar from "@/src/components/common/Navbar";
import Footer from "@/src/components/common/Footer";

export default function ContexLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ '--color-accent': '#f94e58' } as React.CSSProperties}>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
