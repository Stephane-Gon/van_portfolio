'use client';

import * as THREE from 'three';
import dynamic from 'next/dynamic';
import { Html } from '@react-three/drei';
import { useRef } from 'react';
import { useZoom } from '@/features/three/hooks/useZoom';
import { useThreeStore } from '@/features/three/store/useThree';
import useViewportSize from '@/hooks/useViewport';
import List from '@/features/projects/publicComponents/list';

const Point = dynamic(() => import('@/features/three/components/Html/Point'), { ssr: false });

// TODO - Fazer a list dos projects e o responsive
// TODO - Arranjar forma de importar dinamicamente a lista de projects??

export default function Projects() {
  const projectPointRef = useRef<THREE.Group>(null);
  const pointPosition = new THREE.Vector3(-0.6, 1.55, 2.05);
  const zoomedFeature = useThreeStore(state => state.zoomedFeature);
  const isZoomed = zoomedFeature === 'projects';
  const { width } = useViewportSize();

  const { toggleCameraZoom } = useZoom({
    newCameraPosition: new THREE.Vector3(-0.65, 1.27, 2.23),
    newCameraRotation: new THREE.Euler(0.11, 0.47, -0.05),
    toZoomFeature: 'projects',
  });

  return (
    <>
      <Html position={[-4.74, 3.03, 0.4]} className={`projects_wrapper ${isZoomed ? 'visible' : ''}`}>
        <div className='projects_container'>
          <List />
        </div>
      </Html>
      {width > 800 && (
        <Point
          position={pointPosition}
          label='2'
          description='Check the projects I worked on here!'
          onZoom={e => {
            toggleCameraZoom(e, {
              ref: projectPointRef,
              newPosition: new THREE.Vector3(-0.63, 1.41, 1.91),
              oldPosition: pointPosition,
            });
          }}
          sizes='small'
          innerRef={projectPointRef}
          isZoomed={isZoomed}
        />
      )}
    </>
  );
}
