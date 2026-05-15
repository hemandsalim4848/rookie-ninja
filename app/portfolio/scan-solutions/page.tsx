import Navbar from '@/src/components/Navbar';
import Footer from '@/src/components/Footer';
import ScanSolutionsPage from '@/src/components/ScanSolutions';

export const metadata = {
  title: 'Scan Solutions — Rookie Ninja',
  description: 'Reliable document scanning and capture solutions — desktop, departmental, production, large format, and book scanners.',
};

export default function TrainingPage() {
  return (
    <>
      <Navbar />
      <ScanSolutionsPage />
      <Footer />
    </>
  );
}