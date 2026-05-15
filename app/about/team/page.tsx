import Navbar from '@/src/components/Navbar';
import Footer from '@/src/components/Footer';
import TeamContent from '@/src/components/TeamContent';

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