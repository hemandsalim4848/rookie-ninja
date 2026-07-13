import Navbar from "@/src/components/common/Navbar";
import Footer from "@/src/components/common/Footer";

export default function ViewSonicAVLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ '--color-accent': '#DA0026' } as React.CSSProperties}>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
