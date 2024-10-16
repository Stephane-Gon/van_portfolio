'use client';

import { useGLTF, Clone } from '@react-three/drei';
export default function Moon() {
  const moon = useGLTF('./models/the_moon.glb');

  return <Clone object={moon.scene} position={[3, 2, -1]} scale={0.5} rotation={[0, 0, 0]} />;
}

useGLTF.preload('./models/the_moon.glb');
