import Navbar from '@/src/components/common/Navbar';
import Footer from '@/src/components/common/Footer';
import GamingPage from '@/src/components/solutions/Gaming';

export const metadata = {
  title: 'Gaming | Rookie Ninja',
  description: 'Premium gaming monitors, peripherals, CPU cabinets, coolers, and PSUs from top brands like ViewSonic, Aerocool, MSI, and Aztech.',
};

export default function TrainingPage() {
  return (
    <>
      <Navbar />
      <GamingPage/>
      <Footer />
    </>
  );
}