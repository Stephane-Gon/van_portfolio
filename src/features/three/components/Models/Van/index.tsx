'use client';

import { useGLTF, Clone } from '@react-three/drei';
import ThemeToggler from './ThemeToggler';
import Projects from './Projects';
import Works from './Works';
import Tools from './Tools';

export default function Van() {
  const van = useGLTF('./models/van.glb');
  // TODO - Resize da van dependendo dos viewports;

  return (
    <group>
      <Clone object={van.scene} position={[0.5, 0.2, 2]} scale={0.6} rotation={[0, Math.PI * 0.65, 0]} />
      <ThemeToggler />
      <Projects />
      <Works />
      <Tools />
    </group>
  );
}

useGLTF.preload('./models/van.glb');
