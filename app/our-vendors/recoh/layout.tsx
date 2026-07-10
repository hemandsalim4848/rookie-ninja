import Navbar from "@/src/components/common/Navbar";
import Footer from "@/src/components/common/Footer";

export default function RecohLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ '--color-accent': '#C8102E' } as React.CSSProperties}>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
