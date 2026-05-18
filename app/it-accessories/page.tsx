import Navbar from '@/src/components/common/Navbar';
import Footer from '@/src/components/common/Footer';
import ITAccessoriesPage from '@/src/components/solutions/ITAccessories';

export const metadata = {
  title: 'IT Accessories | Rookie Ninja',
  description: 'Wide range of IT accessories including audio, mobile accessories, cables, adapters, Smart TVs, and surge protectors from Belkin and Aztech.',
};

export default function ITAccessories() {
  return (
    <>
      <Navbar />
      <ITAccessoriesPage />
      <Footer />
    </>
  );
}