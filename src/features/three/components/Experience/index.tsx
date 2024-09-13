'use client';

import { GizmoHelper, GizmoViewport, PresentationControls } from '@react-three/drei';
import DirectionalLight from '../Lights/DirectionalLight';
import Tv from '../Models/Tv';
import TvZoom from '../Models/TvZoom';
import Boombox from '../Models/Boombox';

export default function Experience() {
  // TODO - Depois tenho que arranjar forma de saber se a scene já está completamente loaded
  // TODO - Arranjar um environment map (fundo)
  // TODO - Criar loading animation


  return (
    <>
      <color attach='background' args={['#bdedfc']} />
      <DirectionalLight />

      <PresentationControls
        global
        rotation={[0.13, 0.1, 0]}
        polar={[ -0.4, 0.2]}
        azimuth={[ -1, 0.75 ]}
        config={{ mass: 2, tension: 400 }}
        snap={{ mass: 4, tension: 400 }}
      >
        <TvZoom />
        <Tv />
        <Boombox />
      </PresentationControls>

      {/* TODO - Apagar este Gizmo */}
      <GizmoHelper alignment='bottom-right' margin={[80, 80]}>
        <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor='black' />
      </GizmoHelper>
    </>
  );
}
