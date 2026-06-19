import Navbar from "@/src/components/common/Navbar";
import Footer from "@/src/components/common/Footer";

export default function KodakAlarisLayout({
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
