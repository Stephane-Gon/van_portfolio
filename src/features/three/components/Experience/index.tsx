'use client';

import { OrbitControls, GizmoHelper, GizmoViewport } from '@react-three/drei';
import DirectionalLight from '../Lights/DirectionalLight';
import Tv from '../Models/Tv';
import useInfoPoints from '../../hooks/useInfoPoints';

export default function Experience() {
  // TODO - Depois tenho que arranjar forma de saber se a scene já está completamente loaded
  useInfoPoints({ sceneReady: true });

  return (
    <>
      <OrbitControls makeDefault />
      <color attach='background' args={['#bdedfc']} />
      <DirectionalLight />
      <Tv />

      {/* TODO - Apagar este Gizmo */}
      <GizmoHelper alignment='bottom-right' margin={[80, 80]}>
        <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor='black' />
      </GizmoHelper>
    </>
  );
}
