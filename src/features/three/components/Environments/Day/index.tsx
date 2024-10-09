'use client';

import React from 'react';
import * as THREE from 'three';
import { Cloud, Clouds, Sky } from '@react-three/drei';
import Sun from '../../Models/Sun';

const Day = () => {
  // TODO - Criar a rotation

  return (
    <>
      <Sky distance={8} sunPosition={[0.9, 0.9, -0.3]} inclination={1} azimuth={0.25} />
      <Sun />
      <Clouds material={THREE.MeshBasicMaterial} position={[0, 3.7, 0]}>
        <Cloud seed={2} segments={20} bounds={[5, 2, 2]} volume={1} color='#d1dff6' speed={0.1} />
        <Cloud seed={10} scale={1} volume={1} color='#b2cbf2' fade={10} speed={0.2} />
      </Clouds>
    </>
  );
};

export default Day;
