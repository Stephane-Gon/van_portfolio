'use client';

import DirectionalLight from '../Lights/DirectionalLight';
import Van from '../Models/Van';
import Day from '../Environments/Day';
import Night from '../Environments/Night';

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
