'use client';

import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
// Icons & Components
import { Menu } from '@/design-system/icons';
import { VanLogo, ThemeToggler } from '@/design-system/molecules';
// Hooks
import { useAppStore } from '@/store/useApp';

const Button = dynamic(() => import('@/design-system/atoms/Button'));

const Header = () => {
  const { status } = useSession();
  const toggleMobileMenu = useAppStore(state => state.toggleMobileMenu);
  const toggleTheme = useAppStore(state => state.toggleTheme);

  const _renderLogOutBtn = () => {
    if (status === 'authenticated') {
      return (
        <Button
          id='sidebar-logout-btn'
          onClick={async () => await import('next-auth/react').then(({ signOut }) => signOut())}
          label='Log Out'
        />
      );
    }
  };

  return (
    <header className='h-[70px] w-full border-b-4 border-secondary'>
      <div className='flex h-full items-center justify-between px-5 py-3'>
        <span className='block xl:hidden'>
          <Menu width='1.5rem' height='1.5rem' fill='#EA9E8D' cursor='pointer' onClick={() => toggleMobileMenu()} />
        </span>
        <span className='hidden xl:block'>
          <VanLogo />
        </span>

        <span className='flex items-center gap-2 p-1'>
          <ThemeToggler toggleTheme={toggleTheme} />
          <span className='hidden xl:block'>{_renderLogOutBtn()}</span>
        </span>
      </div>
    </header>
  );
};

export default Header;
