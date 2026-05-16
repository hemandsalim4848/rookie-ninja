import Navbar from '@/src/components/common/Navbar';
import Footer from '@/src/components/common/Footer';
import TrainingContent from '@/src/components/TrainingContent';

export const metadata = {
  title: 'Training — Rookie Ninja',
  description: 'Empowering teams and partners with the skills to thrive in the technology landscape.',
};

export default function TrainingPage() {
  return (
    <>
      <Navbar />
      <TrainingContent />
      <Footer />
    </>
  );
}