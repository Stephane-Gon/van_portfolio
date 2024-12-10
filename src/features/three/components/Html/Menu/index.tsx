'use client';
import dynamic from 'next/dynamic';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useThreeStore } from '@/features/three/store/useThree';
import MenuToggler from '../MenuToggler';
import { Github, Linkedin, Mail } from '@/design-system/icons';
import { useZoom } from '@/features/three/hooks/useZoom';
import { CopyToClipboard } from '@/design-system/molecules';
import { projectsZoomData } from '@/features/three/data/zoom';
import useViewportSize from '@/hooks/useViewport';

const MenuLink = dynamic(() => import('@/design-system/molecules/MenuLink'), { ssr: false });
const ContactForm = dynamic(() => import('../ContactForm'), { ssr: false });

function Menu() {
  const [showLinks, setShowLinks] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const isMenuOpen = useThreeStore(state => state.isMenuOpen);
  const setIsMenuOpen = useThreeStore(state => state.setIsMenuOpen);
  const { width } = useViewportSize();

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

  let selector: keyof typeof projectsZoomData = 'default';
  if (width < 600) {
    selector = 600;
  } else if (width < 1000) {
    selector = 1000;
  } else if (width < 2500) {
    selector = 2500;
  }

  const position = projectsZoomData[selector].position;
  const rotation = projectsZoomData[selector].rotation;

  const { toggleCameraZoom: ZoomProjects } = useZoom({
    newCameraPosition: new THREE.Vector3(position.x, position.y, position.z),
    newCameraRotation: new THREE.Euler(rotation.x, rotation.y, rotation.z),
    toZoomFeature: 'projects',
  });

  const { toggleCameraZoom: ZoomTools } = useZoom({
    newCameraPosition: new THREE.Vector3(0.7, 1.42, 1.8),
    newCameraRotation: new THREE.Euler(0.08, 0.49, -0.04),
    toZoomFeature: 'tools',
  });

  const { toggleCameraZoom: ZoomWorks } = useZoom({
    newCameraPosition: new THREE.Vector3(-0.545, 1.12, 2.11),
    newCameraRotation: new THREE.Euler(-0.19, -0.02, 0),
    toZoomFeature: 'works',
  });

  const _renderLinks = () => {
    return (
      showLinks && (
        <>
          <MenuLink
            text='Projects'
            hoveredLink='projects'
            onClick={e => {
              setIsMenuOpen(false);
              setShowLinks(false);
              ZoomProjects(e);
            }}
          />
          <MenuLink
            text='Works'
            indexOffeset={8}
            hoveredLink='works'
            onClick={e => {
              setIsMenuOpen(false);
              setShowLinks(false);
              ZoomWorks(e);
            }}
          />
          <MenuLink
            text='Tools'
            indexOffeset={13}
            hoveredLink='tools'
            onClick={e => {
              setIsMenuOpen(false);
              setShowLinks(false);
              ZoomTools(e);
            }}
          />
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
          <MenuToggler onAditionalClick={() => setShowLinks(!showLinks)} />
        </div>
        <div className='flex flex-grow flex-col-reverse items-center justify-start lg:flex-row'>
          <div className='flex-grow'>{showLinks && <ContactForm />}</div>
          <div className='flex h-full flex-col items-start justify-center gap-3 pl-4 lg:pr-52'>{_renderLinks()}</div>
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
        </div>
      </div>
    </Html>
  );
}

export default Menu;
