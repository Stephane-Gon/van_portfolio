'use client';

import { useAppStore } from '@/features/app/store';
import { useLocation } from 'wouter';
import { useControls } from 'leva';
import * as THREE from 'three';
import Point from '../../../Point';
import { Themes } from '@/features/app/types';
import { useZoom } from '@/features/three/hooks/useZoom';
import { useRef } from 'react';

// TODO - Melhorar a performance da zoom animation
// TODO - Importar dinamicamente o leva??

export default function Points() {
  const [location] = useLocation();
  const projectPointRef = useRef<THREE.Group>(null);
  const worksPointRef = useRef<THREE.Group>(null);
  const toolsPointRef = useRef<THREE.Group>(null);
  const toggleTheme = useAppStore(state => state.toggleTheme);
  const theme = useAppStore(state => state.theme);

  const { themePoint, projectsPoint, worksPoint, toolsPoint } = useControls('van', {
    themePoint: {
      value: { x: -1.35, y: 1.45, z: 2.35 },
      step: 0.05,
    },
    projectsPoint: {
      value: { x: -0.6, y: 1.55, z: 2.05 },
      step: 0.01,
    },
    worksPoint: {
      value: { x: -0.48, y: 1.23, z: 1.9 },
      step: 0.01,
    },
    toolsPoint: {
      value: { x: 0.27, y: 1.7, z: 1.47 },
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
    newPointPosition: new THREE.Vector3(-0.79, 1.4, 2.03),
  });

  const { toggleCameraZoom: toggleWorksZoom } = useZoom({
    newCameraPosition: new THREE.Vector3(-0.545, 1.12, 2.11),
    newCameraRotation: new THREE.Euler(-0.19, -0.02, 0),
    route: '/works/',
    routeId: 'laptop',
    newPointPosition: new THREE.Vector3(-0.55, 1.14, 2.01),
  });

  const { toggleCameraZoom: toggleToolsZoom } = useZoom({
    newCameraPosition: new THREE.Vector3(0.7, 1.42, 1.8),
    newCameraRotation: new THREE.Euler(0.08, 0.49, -0.04),
    route: '/tools/',
    routeId: 'board',
    newPointPosition: new THREE.Vector3(0.3, 1.65, 1.46),
  });

  return (
    <>
      <Point
        position={new THREE.Vector3(themePoint.x, themePoint.y, themePoint.z)}
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
            newPosition: new THREE.Vector3(-0.79, 1.4, 2.03),
            oldPosition: new THREE.Vector3(projectsPoint.x, projectsPoint.y, projectsPoint.z),
          });
        }}
        sizes='small'
        ref={projectPointRef}
        isZoomed={location === '/projects/monitor'}
      />
      <Point
        position={new THREE.Vector3(worksPoint.x, worksPoint.y, worksPoint.z)}
        label='3'
        description='Check my different work experiences!'
        onZoom={e => {
          toggleWorksZoom(e, {
            ref: worksPointRef,
            newPosition: new THREE.Vector3(-0.55, 1.14, 2.01),
            oldPosition: new THREE.Vector3(worksPoint.x, worksPoint.y, worksPoint.z),
          });
        }}
        sizes='small'
        ref={worksPointRef}
        isZoomed={location === '/works/laptop'}
      />
      <Point
        position={new THREE.Vector3(toolsPoint.x, toolsPoint.y, toolsPoint.z)}
        label='4'
        description='Check here the tools I use!'
        sizes='small'
        onZoom={e => {
          toggleToolsZoom(e, {
            ref: toolsPointRef,
            newPosition: new THREE.Vector3(0.3, 1.65, 1.46),
            oldPosition: new THREE.Vector3(toolsPoint.x, toolsPoint.y, toolsPoint.z),
          });
        }}
        ref={toolsPointRef}
        isZoomed={location === '/tools/board'}
      />
    </>
  );
}
