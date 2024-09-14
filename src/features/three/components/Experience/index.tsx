'use client';

import { GizmoHelper, GizmoViewport, PresentationControls } from '@react-three/drei';
import DirectionalLight from '../Lights/DirectionalLight';
import Tv from '../Models/Tv';

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
        polar={[-0.4, 0.2]}
        azimuth={[-1, 0.75]}
        config={{ mass: 2, tension: 400 }}
        snap={{ mass: 4, tension: 400 }}>
        <Tv />
      </PresentationControls>

      {/* TODO - Apagar este Gizmo */}
      <GizmoHelper alignment='bottom-right' margin={[80, 80]}>
        <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor='black' />
      </GizmoHelper>
    </>
  );
}
