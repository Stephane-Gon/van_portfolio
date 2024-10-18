'use client';

import { useGLTF, Clone } from '@react-three/drei';
import dynamic from 'next/dynamic';
import Projects from './Projects';
import useViewportSize from '@/hooks/useViewport';
import Works from './Works';
import Tools from './Tools';

const ThemeToggler = dynamic(() => import('./ThemeToggler'), { ssr: false });

export default function Van() {
  const van = useGLTF('./models/van.glb');
  const { width } = useViewportSize();

  let scale = 0.6;
  let positionX = 0.5;
  let positionY = 0.2;

  if (width < 440) {
    scale = 0.35;
    positionX = 0.8;
    positionY = 0.7;
  } else if (width < 500) {
    scale = 0.35;
    positionY = 0.7;
  } else if (width < 650) {
    scale = 0.4;
  } else if (width < 800) {
    scale = 0.5;
  }

  return (
    <group>
      <Clone object={van.scene} position={[positionX, positionY, 2]} scale={scale} rotation={[0, Math.PI * 0.65, 0]} />
      {width > 800 && <ThemeToggler />}
      <Projects />
      <Works />
      <Tools />
    </group>
  );
}

useGLTF.preload('./models/van.glb');
