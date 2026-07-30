import type { Metadata } from "next";
import Navbar from "@/src/components/common/Navbar";
import Footer from "@/src/components/common/Footer";

export const metadata: Metadata = {
  title: "Browse Products by Brand & Category | Rookie Ninja",
};

export default function CatalogueLayout({
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