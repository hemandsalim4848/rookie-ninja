import Navbar from '@/src/components/common/Navbar';
import Footer from '@/src/components/common/Footer';
import SupportContent from '@/src/components/supportpage/SupportContent';

export const metadata = {
  title: 'Support — Rookie Ninja',
  description: 'Fast, reliable after-sales support for every brand Rookie Ninja distributes across the Middle East and Africa.',
};

export default function SupportPage() {
  return (
    <>
      <Navbar />
      <SupportContent />
      <Footer />
    </>
  );
}
