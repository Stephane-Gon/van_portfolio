'use client';

import { useGLTF, Clone } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';
import Point from '../../Point';
import { useZoom } from '@/features/three/hooks/useZoom';
import { useControls } from 'leva';

export default function Tv() {
  const modelRef = useRef<THREE.Group>(null);
  const screen = useGLTF('./models/tv.glb');

  const controls = useControls('zoom', {
    position: {
      value: { x: 0.55, y: 0.25, z: 0.55 },
      step: 0.01,
    },
  });

  const tvControls = useControls('tv', {
    position: {
      value: { x: 0, y: 0, z: 0 },
      step: 0.01,
    },
  });

  const pointControls = useControls('point', {
    position: {
      value: { x: 0.3, y: 0.6, z: 0 },
      step: 0.01,
    },
  });

  const { toggleCameraZoom } = useZoom({
    newCameraPosition: new THREE.Vector3(controls.position.x, controls.position.y, controls.position.z),
    newCameraRotation: new THREE.Euler(0, Math.PI / 4, 0),
    route: '/item/',
    routeId: 'tv',
  });

  return (
    <group>
      <Clone
        ref={modelRef}
        object={screen.scene}
        position={[tvControls.position.x, tvControls.position.y, tvControls.position.z]}
        scale={1}
        rotation={[0, Math.PI / 4, 0]}
      />
      <Point
        position={new THREE.Vector3(pointControls.position.x, pointControls.position.y, pointControls.position.z)}
        label='1'
        description='Just on old TV model for testing purposes'
        onZoom={toggleCameraZoom}
      />
    </group>
  );
}

useGLTF.preload('./models/tv.glb');
