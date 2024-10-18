'use client';

import * as THREE from 'three';
import dynamic from 'next/dynamic';
import { useRef } from 'react';
import { useZoom } from '@/features/three/hooks/useZoom';
import { useThreeStore } from '@/features/three/store/useThree';
import useViewportSize from '@/hooks/useViewport';

const Point = dynamic(() => import('@/features/three/components/Html/Point'), { ssr: false });

export default function Works() {
  const worksPointRef = useRef<THREE.Group>(null);
  const pointPosition = new THREE.Vector3(-0.48, 1.23, 1.9);
  const zoomedFeature = useThreeStore(state => state.zoomedFeature);
  const isZoomed = zoomedFeature === 'works';
  const { width } = useViewportSize();

  const { toggleCameraZoom } = useZoom({
    newCameraPosition: new THREE.Vector3(-0.545, 1.12, 2.11),
    newCameraRotation: new THREE.Euler(-0.19, -0.02, 0),
    toZoomFeature: 'works',
  });

  return (
    <>
      {width > 800 && (
        <Point
          position={pointPosition}
          label='3'
          description='Check my different work experiences!'
          onZoom={e => {
            toggleCameraZoom(e, {
              ref: worksPointRef,
              newPosition: new THREE.Vector3(-0.55, 1.14, 2.01),
              oldPosition: pointPosition,
            });
          }}
          sizes='small'
          ref={worksPointRef}
          isZoomed={isZoomed}
        />
      )}
    </>
  );
}
