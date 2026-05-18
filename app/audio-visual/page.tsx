import Navbar from '@/src/components/common/Navbar';
import Footer from '@/src/components/common/Footer';
import AudioVisualPage from '@/src/components/solutions/AudioVisual';

export const metadata = {
  title: 'Audio Visual | Rookie Ninja',
  description: 'Diversified audio and display solutions including projectors, monitors, commercial displays, interactive panels, and video conferencing systems.',
};

export default function AudioVisual() {
  return (
    <>
      <Navbar />
      <AudioVisualPage />
      <Footer />
    </>
  );
}