'use client';

import { useAppStore } from '@/features/app/store';
import { useControls } from 'leva';
import * as THREE from 'three';
import Point from '../../../Point';
import { Themes } from '@/features/app/types';
import { useZoom } from '@/features/three/hooks/useZoom';
import { useRef } from 'react';

export default function Points() {
  const projectPointRef = useRef<THREE.Group>(null);
  const toggleTheme = useAppStore(state => state.toggleTheme);
  const theme = useAppStore(state => state.theme);

  const { switcherPoint, projectsPoint } = useControls('van', {
    switcherPoint: {
      value: { x: -1.35, y: 1.45, z: 2.35 },
      step: 0.05,
    },
    projectsPoint: {
      value: { x: -0.6, y: 1.55, z: 2.05 },
      step: 0.01,
    },
  });

  const handleSwitchTheme = () => {
    if (theme === Themes.light) {
      toggleTheme(Themes.dark);
    } else if (theme === Themes.dark) {
      toggleTheme(Themes.light);
    }
  };

  const { toggleCameraZoom: toggleProjectsZoom } = useZoom({
    newCameraPosition: new THREE.Vector3(-0.67, 1.32, 2.24),
    newCameraRotation: new THREE.Euler(-0.07, 0.5, 0.04),
    route: '/projects/',
    routeId: 'monitor',
    newPointPosition: new THREE.Vector3(-0.65, 1.4, 1.95),
  });

  return (
    <>
      <Point
        position={new THREE.Vector3(switcherPoint.x, switcherPoint.y, switcherPoint.z)}
        label='1'
        description='Toggle the environment theme!'
        sizes='small'
        onClick={handleSwitchTheme}
      />
      <Point
        position={new THREE.Vector3(projectsPoint.x, projectsPoint.y, projectsPoint.z)}
        label='2'
        description='Check the projects I worked on here!'
        onZoom={e => {
          toggleProjectsZoom(e, {
            ref: projectPointRef,
            newPosition: new THREE.Vector3(-0.65, 1.4, 1.95),
            oldPosition: new THREE.Vector3(-0.6, 1.55, 2.05),
          });
        }}
        sizes='small'
        ref={projectPointRef}
      />
    </>
  );
}
