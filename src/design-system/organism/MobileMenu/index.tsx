'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
// Components
import { VanLogo, RouteLink } from '@/design-system/molecules';
import { Dashboard, Linkedin, Github } from '@/design-system/icons';
import { Button } from '@/design-system/atoms';
// Utils
import { Links, LinkT } from '@/utils/app';
// Hooks
import { useAppStore } from '@/store/useApp';

const MobileMenu = () => {
  const { status } = useSession();
  const activeLink = useAppStore(state => state.activeLink);

  const _renderMainLinks = () => {
    return Links.map((link: LinkT) => (
      <RouteLink key={`mobile-menu-link-${link.id}`} link={link} activeLink={activeLink} isMobile />
    ));
  };

  const _renderLogOutBtn = () => {
    if (status === 'authenticated') {
      return <Button id='logout-btn' onClick={() => signOut()} label='Log Out' />;
    }
  };

  return (
    <div className='absolute bottom-0 left-0 right-0 top-[70px] flex flex-col bg-accent p-4 xl:hidden'>
      <span className='flex w-full items-center justify-center'>
        <VanLogo width='150px' height='150px' />
      </span>
      <div className='flex flex-col items-start px-5 pt-10'>
        <Link className='flex items-end justify-start gap-1' href='/dashboard'>
          <span className='rounded-md bg-text/50 p-1'>
            <Dashboard stroke='white' width='2rem' height='2rem' />
          </span>
          <p className='font-josefin text-2xl font-bold text-text'>DASHBOARD</p>
        </Link>

        <div className='flex flex-col items-start gap-8 py-10 pl-5'>{_renderMainLinks()}</div>
      </div>

      <span className='w-full self-center 2sm:w-1/2 lg:w-2/12'>{_renderLogOutBtn()}</span>

      <section className='mb-5 mt-auto flex items-start justify-center gap-4'>
        <Linkedin
          onClick={() =>
            window.open('https://www.linkedin.com/in/stephane-ribeiro-3293b624b/', '_blank', 'noopener,noreferrer')
          }
          width='2rem'
          height='2rem'
          cursor='pointer'
          className='fill-primary'
        />
        <Github
          onClick={() => window.open('https://github.com/Stephane-Gon', '_blank', 'noopener,noreferrer')}
          width='2rem'
          height='2rem'
          cursor='pointer'
          className='fill-primary'
        />
      </section>
    </div>
  );
};

export default MobileMenu;
