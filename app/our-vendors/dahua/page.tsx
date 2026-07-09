import type { Metadata } from 'next';
import DahuaPage from '@/src/components/vendors/Dahua';

export const metadata: Metadata = {
  title:       'Dahua Smart Interactive Displays | Rookie Ninja',
  description: 'Official distributor of Dahua DeepHub smart interactive displays in UAE & MEA — MC420, MC470-P PRO, and ST420 Education Series.',
};

export default function Page() {
  return <DahuaPage />;
}
