import Navbar from '@/src/components/common/Navbar';
import Footer from '@/src/components/common/Footer';
import ViewSonicPage from '@/src/components/vendors/Viewsonic';

export const metadata = {
  title: 'ViewSonic | Rookie Ninja',
  description: 'Authorized ViewSonic distributor — interactive displays, monitors, projectors, video conferencing and commercial signage across MEA.',
};

export default function ViewsonicVendor() {
  return (
    <>
      <Navbar />
      <ViewSonicPage/>
      <Footer />
    </>
  );
}