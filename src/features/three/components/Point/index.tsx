'use client';

import { Html } from '@react-three/drei';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface PointProps {
  position: THREE.Vector3
  label: string
  description: string
}

export default function Point({ position, label, description }: PointProps) {
  const pointRef = useRef<THREE.Group>(null);

  const [isOccluded, setOccluded] = useState<boolean>()
  const [isInRange, setInRange] = useState<boolean>()
  const isVisible = isInRange && !isOccluded

  // Test distance
  const vec = new THREE.Vector3()
  useFrame((state) => {
    if(pointRef.current) {
      const range = state.camera.position.distanceTo(pointRef.current.getWorldPosition(vec)) <= 10
      if (range !== isInRange) setInRange(range)
    }
  })

  return (
    <group ref={pointRef}>
      <Html
        position={position}
        occlude
        onOcclude={setOccluded}
        style={{ 
          transition: 'all 0.2s', 
          opacity: isVisible ? 1 : 0, 
          transform: `scale(${isVisible ? 1 : 0.25})` 
        }}
      >
        <div className='point'>
          <div className="label">{label}</div>
          <div className="text">{description}</div>
        </div>
      </Html>
    </group>
  );
}