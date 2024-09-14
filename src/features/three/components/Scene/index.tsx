'use client';
import { StrictMode } from 'react';
import { Canvas } from '@react-three/fiber';
import Experience from '../Experience';
import { Leva } from 'leva';
import * as THREE from 'three';
import { useThreeStore } from '../../store/useThree';

const Scene = () => {
  const setInitialCamera = useThreeStore(state => state.setInitialCamera);

  const cameraPosition = new THREE.Vector3(1.5, 4, 7);
  const cameraRotation = new THREE.Euler(-0.5, 0.18, 0.1);
  setInitialCamera(cameraPosition, cameraRotation);

  return (
    <StrictMode>
      <Leva collapsed />
      <Canvas
        shadows
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: cameraPosition,
          rotation: cameraRotation,
        }}>
        <Experience />
      </Canvas>
    </StrictMode>
  );
};

export default Scene;
