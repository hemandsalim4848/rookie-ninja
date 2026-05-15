// src/app/about/mission/page.tsx
import Navbar from '@/src/components/Navbar';
import Footer from '@/src/components/Footer';
import MissionVisionContent from '@/src/components/MissionVisionContent';

export const metadata = {
  title: 'Mission & Vision — Rookie Ninja',
  description: 'Driven by innovation, passion for technology, and an unwavering commitment to the evolving distribution landscape.',
};

export default function MissionVisionPage() {
  return (
    <>
      <Navbar />
      <MissionVisionContent />
      <Footer />
    </>
  );
}