'use client';

import { Html } from '@react-three/drei';
import { useRef, useState, forwardRef, useImperativeHandle } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import type { PointT } from '@/features/three/types';
import { useThreeStore } from '@/features/three/store/useThree';
import { ArrowRight } from '@/design-system/icons';

interface PointProps {
  position: THREE.Vector3;
  label: string;
  description: string;
  onZoom?: (e: any, point: PointT) => void;
  isZoomed?: boolean;
  sizes?: 'small' | 'normal';
  onClick?: () => void;
  forwardedRef?: React.RefObject<THREE.Group> | ((instance: THREE.Group | null) => void);
}

// Helper function to get the ref's current value whether it's an object ref or callback ref
const useResolvedRef = (ref: any) => {
  const innerRef = useRef<THREE.Group>(null);

  // Use `useImperativeHandle` to make sure the ref from props is updated with the internal ref
  useImperativeHandle(ref, () => innerRef.current);

  return innerRef;
};

// eslint-disable-next-line react/display-name
const Point = forwardRef<THREE.Group, PointProps>((props, forwardedRef) => {
  const { position, label, description, onZoom, onClick, isZoomed = false, sizes = 'normal' } = props;

  // Use the ref passed in props or fallback to the internal ref
  const groupRef = useResolvedRef(forwardedRef);

  const startScene = useThreeStore(state => state.startScene);

  const [isOccluded, setOccluded] = useState<boolean>();
  const [isInRange, setInRange] = useState<boolean>();
  const isVisible = isInRange && !isOccluded;

  // Test distance
  const vec = new THREE.Vector3();
  useFrame(state => {
    if (groupRef.current) {
      const range = state.camera.position.distanceTo(groupRef.current.getWorldPosition(vec)) <= 10;
      if (range !== isInRange) setInRange(range);
    }
  });

  const handleZoom = (e: any) => {
    onZoom &&
      onZoom(e, {
        newPosition: new THREE.Vector3(0.33, 0.46, 0),
        ref: groupRef,
        oldPosition: position,
      });
  };

  return (
    <group ref={groupRef} position={position}>
      <Html
        occlude
        onOcclude={setOccluded}
        style={{
          transition: 'all 0.2s',
          opacity: isVisible ? 1 : 0,
          transform: `scale(${isVisible ? 1 : 0.25})`,
        }}>
        <div className={`point ${startScene ? 'block' : 'hidden'}`} onClick={() => onClick && onClick()}>
          <div className={`label ${sizes} ${isZoomed && 'zoomed'}`} onClick={handleZoom}>
            {isZoomed ? <ArrowRight width={20} height={20} className='rotate-180' /> : label}
          </div>
          <div className='text'>{isZoomed ? 'Go back' : description}</div>
        </div>
      </Html>
    </group>
  );
});

// You will use this exported component in parent components
export default Point;
