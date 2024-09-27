'use client';

import { PresentationControls } from '@react-three/drei';
import DirectionalLight from '../Lights/DirectionalLight';
import Tv from '../Models/Tv';

export default function Experience() {
  // TODO - Arranjar um environment map (fundo)
  // TODO - Tentar passar os models para um serviceworker

  return (
    <>
      <color attach='background' args={['#bdedfc']} />
      <DirectionalLight />

      <PresentationControls
        global
        polar={[-0.4, 0.2]}
        azimuth={[-1, 0.75]}
        config={{ mass: 2, tension: 400 }}
        snap={{ mass: 4, tension: 400 }}>
        <Tv />
      </PresentationControls>
    </>
  );
}
