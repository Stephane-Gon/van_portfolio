'use client';

import * as THREE from 'three';
import { Cloud, Clouds } from '@react-three/drei';

const DayClouds = () => {
  return (
    <Clouds material={THREE.MeshBasicMaterial} position={[0, 3.7, 0]}>
      <Cloud seed={2} segments={20} bounds={[5, 2, 2]} volume={1} color='#d1dff6' speed={0.1} />
      <Cloud seed={10} scale={1} volume={1} color='#b2cbf2' fade={10} speed={0.2} />
    </Clouds>
  );
};

export default DayClouds;
