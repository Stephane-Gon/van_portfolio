'use client';

import { useGLTF, Clone } from '@react-three/drei';

export default function Tv() {
  const van = useGLTF('./van.glb');

  return (
    <group>
      <Clone object={van.scene} position={[0, 0, 0]} scale={1} rotation={[0, Math.PI / 4, 0]} />
    </group>
  );
}

useGLTF.preload('./van.glb');
