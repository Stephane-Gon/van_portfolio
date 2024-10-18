'use client';

import DirectionalLight from '../Environment/Lights/DirectionalLight';
import Van from '../Models/Van';
import Day from '../Environment/Day';
import Night from '../Environment/Night';

export default function Experience() {
  return (
    <>
      <Day />
      <Night />

      <DirectionalLight />
      <Van />
    </>
  );
}
