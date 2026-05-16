import Navbar from '@/src/components/common/Navbar';
import Footer from '@/src/components/common/Footer';
import ContactContent from '@/src/components/homepage/ContactContent';

export const metadata = {
  title: 'Contact Us — Rookie Ninja',
  description: 'Connect with Rookie Ninja for all your technology distribution needs.',
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <ContactContent />
      <Footer />
    </>
  );
}