'use client';
import dynamic from 'next/dynamic';
import { Html } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useThreeStore } from '@/features/three/store/useThree';
import MenuToggler from '../MenuToggler';
import { Github, Linkedin, Mail } from '@/design-system/icons';
import { CopyToClipboard } from '@/design-system/molecules';

const MenuLink = dynamic(() => import('@/design-system/molecules/MenuLink'), { ssr: false });

// TODO - Ao dar hover do menu dev dár a entender de alguma forma o que vai fazer;

function Menu() {
  const [showLinks, setShowLinks] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const isMenuOpen = useThreeStore(state => state.isMenuOpen);

  useEffect(() => {
    const menuElement = menuRef.current;

    if (menuElement) {
      if (isMenuOpen) {
        gsap.to(menuElement, {
          opacity: 0.95,
          duration: 1,
          ease: 'power2.out',
          onStart: () => {
            gsap.set(menuElement, { display: 'flex' });
          },
          onComplete: () => {
            setShowLinks(true);
          },
        });
      } else {
        gsap.to(menuElement, {
          opacity: 0,
          duration: 1,
          ease: 'power2.in',
          onComplete: () => {
            gsap.set(menuElement, { display: 'none' });
          },
        });
      }
    }
  }, [isMenuOpen]);

  const _renderLinks = () => {
    return (
      showLinks && (
        <>
          <MenuLink text='Projects' hoveredLink='projects' />
          <MenuLink text='Works' indexOffeset={8} hoveredLink='works' />
          <MenuLink text='Tools' indexOffeset={13} hoveredLink='tools' />
          <MenuLink text='About me' indexOffeset={18} hoveredLink='about' />
        </>
      )
    );
  };

  return (
    <Html
      occlude={isMenuOpen}
      fullscreen
      center
      ref={menuRef}
      wrapperClass={`!fixed !inset-0 flex items-center justify-center transform-unset ${!isMenuOpen && 'pointer-events-none'}`}
      className='transform-unset !relative !left-[unset] !top-[unset] hidden h-full w-full bg-[#131313] opacity-0'>
      <div className='flex h-full w-full flex-col p-4'>
        <div className='flex w-full items-center justify-end'>
          <MenuToggler />
        </div>
        <div className='flex flex-grow items-center justify-start'>
          <div className='flex-grow'></div>
          <div className='flex h-full flex-col items-start justify-center gap-3 pl-4 pr-52'>{_renderLinks()}</div>
        </div>
        <div className='flex-start flex w-full items-center'>
          <div className='flex-start flex items-center gap-5 p-6'>
            <a href='https://www.linkedin.com/in/stephane-ribeiro-3293b624b' target='_blank' rel='noreferrer'>
              <Linkedin width={24} height={24} fill='#f5f5f5' />
            </a>
            <a href='https://github.com/Stephane-Gon' target='_blank' rel='noreferrer'>
              <Github width={27} height={27} fill='#f5f5f5' />
            </a>
            <CopyToClipboard text='stephane_work@outlook.com'>
              <Mail width={28} height={28} fill='#f5f5f5' />
            </CopyToClipboard>
          </div>
          <div className='flex-grow'></div>
        </div>
      </div>
    </Html>
  );
}

export default Menu;
