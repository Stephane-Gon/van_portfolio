'use client';

import { useGLTF, Clone } from '@react-three/drei';
import useViewportSize from '@/hooks/useViewport';

export default function Sun() {
  const sun = useGLTF('./models/the_sun.glb');
  const { width } = useViewportSize();

  let positionX = 4.5;
  let scale = 0.5;

  if (width < 570) {
    positionX = 0.8;
    scale = 0.3;
  } else if (width < 1100) {
    positionX = 1.5;
    scale = 0.4;
  } else if (width < 1450) {
    positionX = 3;
  }

  return <Clone object={sun.scene} position={[positionX, 2.8, -0.2]} scale={scale} rotation={[0, 0, 0]} />;
}

useGLTF.preload('./models/the_sun.glb');
