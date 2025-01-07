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
const ToolsMainSection = dynamic(() => import('@/features/tools/components/MainSection'), { ssr: false });

const Scene = () => {
  const setInitialCamera = useThreeStore(state => state.setInitialCamera);
  const debugMode = useThreeStore(state => state.debugMode);

  // Const { px, py, pz, rx, ry, rz } = useControls('camera', {
  //   Px: { value: 1.04, min: -10, max: 10, step: 0.1 },
  //   Py: { value: 1.4, min: -10, max: 10, step: 0.1 },
  //   Pz: { value: 2.07, min: -10, max: 10, step: 0.1 },

  //   Rx: { value: 0.08, min: -10, max: 10, step: 0.1 },
  //   Ry: { value: 0.49, min: -10, max: 10, step: 0.1 },
  //   Rz: { value: -0.04, min: -10, max: 10, step: 0.1 },
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
      <ToolsMainSection />
    </StrictMode>
  );
};

export default Scene;
