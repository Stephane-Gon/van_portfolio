'use client';

import { useGLTF, Clone } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';;
import Point from '../../Point';

export default function Tv() {
  const modelRef = useRef<THREE.Group>(null);
  const screen = useGLTF('./tv.glb');
  
  return (
    <group>
      <Clone 
        ref={modelRef}
        object={screen.scene} 
        position={[-1, 1, 1]} 
        scale={1.5} 
        rotation={[0, 45, 0]} 
      />
      <Point 
        position={new THREE.Vector3(-0.7, 1.8, 0.6)}
        label='1'
        description='Just on old TV model for testing purposes'
      />
    </group>
  );
}