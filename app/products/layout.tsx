import Navbar from "@/src/components/common/Navbar";
import Footer from "@/src/components/common/Footer";

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
