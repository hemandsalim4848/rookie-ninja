import Navbar from '@/src/components/common/Navbar';
import Footer from '@/src/components/common/Footer';
import TeamContent from '@/src/components/teampage/TeamContent';

export const metadata = {
  title: 'Our Team — Rookie Ninja',
  description: 'Meet the people behind Rookie Ninja — the driving force of our growth.',
};

export default function TeamPage() {
  return (
    <>
      <Navbar />
      <TeamContent />
      <Footer />
    </>
  );
}