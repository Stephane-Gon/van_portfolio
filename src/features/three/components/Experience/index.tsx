'use client';

import DirectionalLight from '../Environment/Lights/DirectionalLight';
import Van from '../Models/Van';
import Day from '../Environment/Day';
import Night from '../Environment/Night';
import Menu from '../Html/Menu';

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
