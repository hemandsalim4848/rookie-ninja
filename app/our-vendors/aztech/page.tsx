import Navbar from '@/src/components/common/Navbar';
import Footer from '@/src/components/common/Footer';
import AztechPage from '@/src/components/vendors/Aztech';

export const metadata = {
  title: 'Aztech | Rookie Ninja',
  description: 'Authorized Aztech distributor — interactive displays, digital signage, gaming peripherals, power supply units, cables and audio products across UAE & MEA.',
};

export default function AztechVendor() {
  return (
    <>
      <Navbar />
      <AztechPage />
      <Footer />
    </>
  );
}
