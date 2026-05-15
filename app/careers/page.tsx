import Navbar from '@/src/components/Navbar';
import Footer from '@/src/components/Footer';
import JoinUsContent from '@/src/components/JoinUsContent';

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