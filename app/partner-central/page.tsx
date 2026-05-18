import Navbar from '@/src/components/common/Navbar';
import Footer from '@/src/components/common/Footer';
import PartnersPage from '@/src/components/partnerpage/PartnerCentral';

export const metadata = {
  title: 'Partner Central | Rookie Ninja',
  description: 'Join Rookie Ninja as a technology distribution partner and gain access to unparalleled product portfolios, expert support, and market reach across MEA.',
};

export default function PartnerCentral() {
  return (
    <>
      <Navbar />
      <PartnersPage />
      <Footer />
    </>
  );
}