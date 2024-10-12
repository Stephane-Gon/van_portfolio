'use client';

import { PresentationControls } from '@react-three/drei';
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

      <PresentationControls
        global
        polar={[-0.4, 0.2]}
        azimuth={[-1, 0.75]}
        config={{ mass: 1, tension: 100 }}
        snap={{ mass: 2, tension: 200 }}>
        <Van />
      </PresentationControls>
    </>
  );
}
