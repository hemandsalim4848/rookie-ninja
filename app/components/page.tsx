import Navbar from '@/src/components/common/Navbar';
import Footer from '@/src/components/common/Footer';
import ComponentsPage from '@/src/components/solutions/Components';

export const metadata = {
  title: 'Components | Rookie Ninja',
  description: 'Top-tier PC components including motherboards, GPUs, monitors, coolers, PSUs, and more from leading brands.',
};

export default function Components() {
  return (
    <>
      <Navbar />
      <ComponentsPage/>
      <Footer />
    </>
  );
}