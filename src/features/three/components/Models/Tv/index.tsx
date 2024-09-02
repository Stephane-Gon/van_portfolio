'use client';

import { useGLTF, Clone } from '@react-three/drei';

export default function Tv() {
  const screen = useGLTF('./tv.glb');
  // Console.log("🚀 ~ Tv ~ screen:", screen)

  return (
    <>
      <Clone object={screen.scene} position-x={-1} scale={1.5} rotation={[0, 45, 0]} />
    </>
  );
}
