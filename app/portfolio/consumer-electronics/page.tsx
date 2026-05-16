import Navbar from '@/src/components/common/Navbar';
import Footer from '@/src/components/common/Footer';
import ConsumerElectronicsPage from '@/src/components/solutions/ConsumerElectronics';

export const metadata = {
  title: 'Consumer Electronics | Rookie Ninja',
  description: 'Cutting-edge consumer electronics and computing solutions from industry-leading brands, tailored for every lifestyle.',
};

export default function TrainingPage() {
  return (
    <>
      <Navbar />
      <ConsumerElectronicsPage/>
      <Footer />
    </>
  );
}