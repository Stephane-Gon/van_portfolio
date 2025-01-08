import { Metadata } from 'next';
import ProvidersWrapper from '../providers/ProvidersWrapper';
import ReservedArea from '@/design-system/templates/ReservedArea';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'My portfolio dashboard',
  robots: {
    index: false,
    follow: true,
  },
};

export default async function ReservedLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProvidersWrapper>
      <ReservedArea>{children}</ReservedArea>
    </ProvidersWrapper>
  );
}
