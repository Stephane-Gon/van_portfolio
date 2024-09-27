'use client';

import { Html } from '@react-three/drei';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import type { PointT } from '../../types';
import { useThreeStore } from '../../store/useThree';

interface PointProps {
  position: THREE.Vector3;
  label: string;
  description: string;
  onZoom?: (e: any, point: PointT) => void;
}

export default function Point({ position, label, description, onZoom }: PointProps) {
  const pointRef = useRef<THREE.Group>(null);
  const startScene = useThreeStore(state => state.startScene);

  const [isOccluded, setOccluded] = useState<boolean>();
  const [isInRange, setInRange] = useState<boolean>();
  const isVisible = isInRange && !isOccluded;

  // Test distance
  const vec = new THREE.Vector3();
  useFrame(state => {
    if (pointRef.current) {
      const range = state.camera.position.distanceTo(pointRef.current.getWorldPosition(vec)) <= 10;
      if (range !== isInRange) setInRange(range);
    }
  });

  const handleZoom = (e: any) => {
    onZoom &&
      onZoom(e, {
        newPosition: new THREE.Vector3(0.33, 0.46, 0),
        ref: pointRef,
        oldPosition: position,
      });
  };

  return (
    <group ref={pointRef} position={position}>
      <Html
        occlude
        onOcclude={setOccluded}
        style={{
          transition: 'all 0.2s',
          opacity: isVisible ? 1 : 0,
          transform: `scale(${isVisible ? 1 : 0.25})`,
        }}>
        <div className={`point ${startScene ? 'block' : 'hidden'}`}>
          <div className='label' onClick={handleZoom}>
            {label}
          </div>
          <div className='text'>{description}</div>
        </div>
      </Html>
    </group>
  );
}
