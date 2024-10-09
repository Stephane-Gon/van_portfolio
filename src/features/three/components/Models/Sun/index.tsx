'use client';

import { useGLTF, Clone } from '@react-three/drei';
export default function Sun() {
  const sun = useGLTF('./the_sun.glb');

  return <Clone object={sun.scene} position={[3, 2.8, -0.2]} scale={0.5} rotation={[0, 0, 0]} />;
}

useGLTF.preload('./the_sun.glb');
