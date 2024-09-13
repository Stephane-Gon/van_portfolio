'use client';

import { useGLTF, Clone } from '@react-three/drei';
import * as THREE from 'three';
import Zoom from '../../Zoom';

export default function TvZoom() {
  const screen = useGLTF('./tv.glb');

  const name = 'tv'
  const ratio = 1.5

  return (
    <Zoom
      name={name}
      route='/item/'
      groupPosition={new THREE.Vector3(1, 1, 1)}
      groupRotation={new THREE.Euler(0, -75, 0)}
      localToWorld={[0, ratio / 2 + 0.35, 1.25]}
    >
      <Clone
        object={screen.scene} 
        name={name}
        scale={ratio} 
        position={[0, ratio / 2, 0]}
      />
    </Zoom>
  )
}