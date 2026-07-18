import Navbar from '@/src/components/common/Navbar';
import Footer from '@/src/components/common/Footer';
import PrivacyPolicyContent from '@/src/components/legalpage/PrivacyPolicyContent';

export const metadata = {
  title: 'Privacy Policy — Rookie Ninja',
  description: 'How Rookie Ninja Distribution collects, uses, and protects personal information collected through this website.',
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <PrivacyPolicyContent />
      <Footer />
    </>
  );
}
