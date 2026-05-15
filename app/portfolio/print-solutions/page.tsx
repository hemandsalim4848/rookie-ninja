import Navbar from '@/src/components/Navbar';
import Footer from '@/src/components/Footer';
import PrintSolutionsPage from '@/src/components/PrintSolutions';

export const metadata = {
  title: 'Print Solutions — Rookie Ninja',
  description: 'High-performance laser, inkjet, dot matrix, and multi-function printers for home, office, and industrial use.',
};

export default function TrainingPage() {
  return (
    <>
      <Navbar />
      <PrintSolutionsPage />
      <Footer />
    </>
  );
}