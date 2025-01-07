'use client';

import * as THREE from 'three';
import dynamic from 'next/dynamic';
import { useZoom } from '@/features/three/hooks/useZoom';
import { useRef } from 'react';
import { useThreeStore } from '@/features/three/store/useThree';
import useViewportSize from '@/hooks/useViewport';
import { useZoomValues } from '@/features/three/hooks/useZoomValues';

const Point = dynamic(() => import('@/features/three/components/Html/Point'), { ssr: false });

export default function Tools() {
  const toolsPointRef = useRef<THREE.Group>(null);
  const pointPosition = new THREE.Vector3(0.27, 1.7, 1.47);
  const zoomedFeature = useThreeStore(state => state.zoomedFeature);
  const menuHoverLink = useThreeStore(state => state.menuHoverLink);
  const isZoomed = zoomedFeature === 'projects';
  const { width } = useViewportSize();
  const { positionTool, rotationTool } = useZoomValues();

  const { toggleCameraZoom } = useZoom({
    newCameraPosition: new THREE.Vector3(positionTool.x, positionTool.y, positionTool.z),
    newCameraRotation: new THREE.Euler(rotationTool.x, rotationTool.y, rotationTool.z),
    toZoomFeature: 'tools',
  });

  return (
    <>
      {width > 800 && (
        <Point
          position={pointPosition}
          label='4'
          description='Check here the tools I use!'
          sizes='small'
          onZoom={e => {
            toggleCameraZoom(e, {
              ref: toolsPointRef,
              newPosition: new THREE.Vector3(0.3, 1.65, 1.46),
              oldPosition: pointPosition,
            });
          }}
          innerRef={toolsPointRef}
          isZoomed={isZoomed}
          forceDisplay={menuHoverLink === 'tools'}
        />
      )}
    </>
  );
}
