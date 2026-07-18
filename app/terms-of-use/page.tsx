import Navbar from '@/src/components/common/Navbar';
import Footer from '@/src/components/common/Footer';
import TermsOfUseContent from '@/src/components/legalpage/TermsOfUseContent';

export const metadata = {
  title: 'Terms of Use — Rookie Ninja',
  description: 'The terms governing your use of the Rookie Ninja Distribution website.',
};

export default function TermsOfUsePage() {
  return (
    <>
      <Navbar />
      <TermsOfUseContent />
      <Footer />
    </>
  );
}
