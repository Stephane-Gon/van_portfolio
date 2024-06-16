'use client';

// TODO - Verificar porque dá erro quando uso -> import { OrbitControls } from '@react-three/drei'
import DirectionalLight from '../Lights/DirectionalLight';

export default function Experience() {
  return (
    <>
      {/* <OrbitControls makeDefault /> */}
      <color attach='background' args={['#bdedfc']} />
      <DirectionalLight />
      <mesh>
        <boxGeometry attach='geometry' args={[1, 1, 1]} />
        <meshBasicMaterial attach='material' color='red' />
      </mesh>
    </>
  );
}
