'use client';

import { StrictMode, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import FPSStats from 'react-fps-stats';
import Experience from '../Experience';
import { Leva } from 'leva';
import * as THREE from 'three';
import { useThreeStore } from '../../store/useThree';
import dynamic from 'next/dynamic';

const Loader = dynamic(() => import('../Html/Loader'), { ssr: false });

// TODO - Fazer um Burger Menu

const Scene = () => {
  const setInitialCamera = useThreeStore(state => state.setInitialCamera);
  const startScene = useThreeStore(state => state.startScene);
  const debugMode = useThreeStore(state => state.debugMode);

  const cameraPosition = new THREE.Vector3(1.5, 4, 7);
  const cameraRotation = new THREE.Euler(-0.5, 0.18, 0.1);
  setInitialCamera(cameraPosition, cameraRotation);

  const _renderLoader = () => {
    return startScene ? null : <Loader />;
  };

  return (
    <StrictMode>
      <Leva collapsed hidden={!debugMode} />
      {debugMode && <FPSStats />}
      <Canvas
        shadows
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: cameraPosition,
          rotation: cameraRotation,
        }}>
        <Suspense fallback={null}>
          <Experience />
        </Suspense>
      </Canvas>
      {_renderLoader()}
    </StrictMode>
  );
};

export default Scene;
