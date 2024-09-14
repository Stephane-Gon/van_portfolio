'use client';

import { useGLTF, Clone } from '@react-three/drei';
import * as THREE from 'three';
import Zoom from '../Zoom';

export default function Boombox() {
  const screen = useGLTF('./boombox.glb');

  const name = 'boombox';
  const ratio = 1;

  return (
    <Zoom
      name={name}
      route='/item/'
      groupPosition={new THREE.Vector3(3, 3, 1)}
      groupRotation={new THREE.Euler(0, 0, 0)}
      localToWorld={[0, ratio / 2 + 0.2, 1]}>
      <Clone object={screen.scene} name={name} scale={ratio} position={[0, ratio / 2, 0]} />
    </Zoom>
  );
}
