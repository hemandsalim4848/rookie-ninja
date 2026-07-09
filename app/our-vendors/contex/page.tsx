import type { Metadata } from 'next';
import ContexPage from '@/src/components/vendors/Contex';

export const metadata: Metadata = {
  title:       'Contex Wide Format Scanners | Rookie Ninja',
  description: 'Official distributor of Contex wide format scanners in UAE & MEA — SD One X, HD Apeiron/42 and IQ FLEX.',
};

export default function Page() {
  return <ContexPage />;
}
