'use client';

import dynamic from 'next/dynamic';
import { StrictMode, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import FPSStats from 'react-fps-stats';
import { Leva } from 'leva';
import * as THREE from 'three';
import Experience from '../Experience';
import Loader from '../Html/Loader';
import MenuToggler from '../Html/MenuToggler';
import { useThreeStore } from '../../store/useThree';

const ProjectsMainSection = dynamic(() => import('@/features/projects/components/MainSection'), { ssr: false });
const WorksMainSection = dynamic(() => import('@/features/works/components/MainSection'), { ssr: false });

const Scene = () => {
  const setInitialCamera = useThreeStore(state => state.setInitialCamera);
  const debugMode = useThreeStore(state => state.debugMode);

  // Const { px, py, pz, rx, ry, rz } = useControls('camera', {
  //   Px: { value: -0.12, min: -10, max: 10, step: 0.1 },
  //   Py: { value: 1.26, min: -10, max: 10, step: 0.1 },
  //   Pz: { value: 2.2, min: -10, max: 10, step: 0.1 },

  //   Rx: { value: -0.2, min: -10, max: 10, step: 0.1 },
  //   Ry: { value: -0.02, min: -10, max: 10, step: 0.1 },
  //   Rz: { value: -1.58, min: -10, max: 10, step: 0.1 },
  // })

  // Const cameraPosition = new THREE.Vector3(px, py, pz);
  // Const cameraRotation = new THREE.Euler(rx, ry, rz);

  const cameraPosition = new THREE.Vector3(1.5, 4, 7);
  const cameraRotation = new THREE.Euler(-0.5, 0.18, 0.1);
  setInitialCamera(cameraPosition, cameraRotation);

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
      <Loader />
      <MenuToggler mainMenu className='text-text' />
      <ProjectsMainSection />
      <WorksMainSection />
    </StrictMode>
  );
};

export default Scene;
