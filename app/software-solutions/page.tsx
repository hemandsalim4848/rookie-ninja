import Navbar from '@/src/components/common/Navbar';
import Footer from '@/src/components/common/Footer';
import SoftwareSolutionsPage from '@/src/components/solutions/Software';

export const metadata = {
  title: 'Software Solutions | Rookie Ninja',
  description: 'Premium document management and information capture software solutions to streamline workflows and enhance business efficiency.',
};

export default function Software() {
  return (
    <>
      <Navbar />
      <SoftwareSolutionsPage />
      <Footer />
    </>
  );
}