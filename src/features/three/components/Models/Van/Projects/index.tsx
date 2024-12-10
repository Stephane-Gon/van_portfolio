'use client';

import * as THREE from 'three';
import dynamic from 'next/dynamic';
import { Html } from '@react-three/drei';
import { useRef } from 'react';
import { useZoom } from '@/features/three/hooks/useZoom';
import { useThreeStore } from '@/features/three/store/useThree';
import useViewportSize from '@/hooks/useViewport';
import { projectsZoomData } from '@/features/three/data/zoom';
import List from '@/features/projects/publicComponents/list';
import { SpaceValues } from '@/features/three/types';
const Point = dynamic(() => import('@/features/three/components/Html/Point'), { ssr: false });

export default function Projects() {
  const projectPointRef = useRef<THREE.Group>(null);
  const pointPosition = new THREE.Vector3(-0.6, 1.55, 2.05);
  const zoomedFeature = useThreeStore(state => state.zoomedFeature);
  const menuHoverLink = useThreeStore(state => state.menuHoverLink);
  const isZoomed = zoomedFeature === 'projects';
  const { width } = useViewportSize();

  let selector: keyof typeof projectsZoomData = 'default';

  if (width < 600) {
    selector = 600;
  } else if (width < 1000) {
    selector = 1000;
  } else if (width < 2500) {
    selector = 2500;
  }

  const position = projectsZoomData[selector].position;
  const rotation = projectsZoomData[selector].rotation;
  const html = projectsZoomData[selector].html as SpaceValues;

  const { toggleCameraZoom } = useZoom({
    newCameraPosition: new THREE.Vector3(position.x, position.y, position.z),
    newCameraRotation: new THREE.Euler(rotation.x, rotation.y, rotation.z),
    toZoomFeature: 'projects',
  });

  const _renderHtml = () => {
    return width >= 1000 ? (
      <Html position={[html.x, html.y, html.z]} className={`projects_wrapper ${isZoomed ? 'visible' : ''}`}>
        <div className='projects_container'>
          <List />
        </div>
      </Html>
    ) : null;
  };

  return (
    <>
      {_renderHtml()}
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
