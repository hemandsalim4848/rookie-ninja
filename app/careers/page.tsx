import Navbar from '@/src/components/common/Navbar';
import Footer from '@/src/components/common/Footer';
import JoinUsContent from '@/src/components/careerspage/JoinUsContent';

export const metadata = {
  title: 'Join Us — Rookie Ninja',
  description: 'Explore career opportunities at Rookie Ninja.',
};

export default function JoinUsPage() {
  return (
    <>
      <Navbar />
      <JoinUsContent />
      <Footer />
    </>
  );
}