'use client';

import { useGLTF, Clone } from '@react-three/drei';
export default function Sun() {
  const sun = useGLTF('./models/the_sun.glb');

  return <Clone object={sun.scene} position={[2.7, 2.8, -0.2]} scale={0.5} rotation={[0, 0, 0]} />;
}

useGLTF.preload('./models/the_sun.glb');
