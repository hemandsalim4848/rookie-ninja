import Navbar from '@/src/components/Navbar';
import Footer from '@/src/components/Footer';
import ContactContent from '@/src/components/ContactContent';

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