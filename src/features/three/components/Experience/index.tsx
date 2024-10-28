'use client';

import dynamic from 'next/dynamic';
import DirectionalLight from '../Environment/Lights/DirectionalLight';
import Van from '../Models/Van';
import Day from '../Environment/Day';
import Night from '../Environment/Night';

const Menu = dynamic(() => import('../Html/Menu'), { ssr: false });

export default function Experience() {
  return (
    <>
      <Day />
      <Night />
      <DirectionalLight />
      <Van />
      <Menu />
    </>
  );
}
