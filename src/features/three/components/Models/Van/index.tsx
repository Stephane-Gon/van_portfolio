'use client';

import { useGLTF, Clone } from '@react-three/drei';
import Points from './Points';

export default function Tv() {
  const van = useGLTF('./models/van.glb');
  // TODO - Resize da van dependendo dos viewports;

  return (
    <group>
      <Clone object={van.scene} position={[0.5, 0.2, 2]} scale={0.6} rotation={[0, Math.PI * 0.65, 0]} />
      <Points />
    </group>
  );
}

useGLTF.preload('./models/van.glb');
