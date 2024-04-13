'use client';
import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
// Components
import { Header, Sidebar, MobileMenu } from '@/design-system/organism';
// Hooks
import { useAppStore } from '@/features/app/store';
// Utils
import { LinkT } from '@/features/app/types';
import { Links } from '@/features/app/utils';

const ReservedArea = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const { status } = useSession();
  const showMobileMenu = useAppStore(state => state.showMobileMenu);
  const setActiveLink = useAppStore(state => state.setActiveLink);

  useEffect(() => {
    const hasActive = Links.find((link: LinkT) => pathname.includes(link.href));
    if (hasActive) {
      setActiveLink(hasActive.id);
    } else setActiveLink(0);
  }, [pathname, setActiveLink]);

  const _renderSidebar = () => {
    return status === 'authenticated' && <Sidebar />;
  };

  const _renderMobileMenu = () => {
    return status === 'authenticated' && showMobileMenu && <MobileMenu />;
  };

  return (
    <main className='flex min-h-screen flex-col items-center bg-accent bg-background  bg-cover bg-fixed'>
      <Header />
      <div className='flex w-full'>
        {_renderSidebar()}
        <div className='no-scrollbar w-full overflow-y-auto p-2 md:p-8'>{children}</div>
      </div>
      {_renderMobileMenu()}
    </main>
  );
};

export default ReservedArea;
