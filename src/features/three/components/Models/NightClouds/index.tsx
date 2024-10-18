'use client';

import * as THREE from 'three';
import { Cloud, Clouds } from '@react-three/drei';

const NightClouds = () => {
  return (
    <Clouds material={THREE.MeshBasicMaterial} position={[0, 3.7, 0]}>
      <Cloud seed={8} segments={10} bounds={[5, 1, 1]} volume={0.5} color='white' speed={0.1} />
    </Clouds>
  );
};

export default NightClouds;
