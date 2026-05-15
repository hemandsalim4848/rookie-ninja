import Navbar from '@/src/components/Navbar';
import Footer from '@/src/components/Footer';
import VendorContent from '@/src/components/VendorContent';

export const metadata = {
  title: 'Our Vendors — Rookie Ninja',
  description: 'Meet the world-class technology brands we partner with across MEA and beyond.',
};

export default function VendorsPage() {
  return (
    <>
      <Navbar />
      <VendorContent />
      <Footer />
    </>
  );
}