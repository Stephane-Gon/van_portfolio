'use client';

import * as THREE from 'three';
import dynamic from 'next/dynamic';
import { useRef } from 'react';
import { useZoom } from '@/features/three/hooks/useZoom';
import { useThreeStore } from '@/features/three/store/useThree';
import useViewportSize from '@/hooks/useViewport';
import { useZoomValues } from '@/features/three/hooks/useZoomValues';

const Point = dynamic(() => import('@/features/three/components/Html/Point'), { ssr: false });

export default function Projects() {
  const projectPointRef = useRef<THREE.Group>(null);
  const pointPosition = new THREE.Vector3(-0.6, 1.55, 2.05);
  const zoomedFeature = useThreeStore(state => state.zoomedFeature);
  const menuHoverLink = useThreeStore(state => state.menuHoverLink);
  const isZoomed = zoomedFeature === 'projects';
  const { width } = useViewportSize();
  const { positionProject, rotationProject } = useZoomValues();

  const { toggleCameraZoom } = useZoom({
    newCameraPosition: new THREE.Vector3(positionProject.x, positionProject.y, positionProject.z),
    newCameraRotation: new THREE.Euler(rotationProject.x, rotationProject.y, rotationProject.z),
    toZoomFeature: 'projects',
  });

  return (
    <>
      {width > 800 && (
        <Point
          position={pointPosition}
          label='2'
          description='Check the projects I worked on here!'
          onZoom={e => toggleCameraZoom(e)}
          sizes='small'
          innerRef={projectPointRef}
          isZoomed={isZoomed}
          forceDisplay={menuHoverLink === 'projects'}
        />
      )}
    </>
  );
}
