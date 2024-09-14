'use client';

import { useFrame } from '@react-three/fiber';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { easing } from 'maath';
import { useRoute, useLocation } from 'wouter';

interface ZoomProps {
  name: string;
  route: string;
  groupPosition: THREE.Vector3;
  groupRotation: THREE.Euler;
  children: React.ReactNode;
  localToWorld: number[];
}

// TODO - Talvez usar um useEffect que lida com os casos em que se escreva o url do item do zoom (http://localhost:3000/item/boombox)

export default function Zoom({ name, route, groupPosition, groupRotation, children, localToWorld }: ZoomProps) {
  const groupRef = useRef<THREE.Group>(null);
  const clicked = useRef<THREE.Object3D>();
  const [, params] = useRoute(`${route}:id`);
  const [, setLocation] = useLocation();

  const q = new THREE.Quaternion();
  const p = new THREE.Vector3();

  useEffect(() => {
    if (groupRef.current) {
      clicked.current = groupRef.current.getObjectByName(params?.id ?? name);
      if (clicked.current && clicked.current.parent && params?.id === name) {
        clicked.current.parent.updateWorldMatrix(true, true);
        clicked.current.parent.localToWorld(p.set(localToWorld[0], localToWorld[1], localToWorld[2]));
        clicked.current.parent.getWorldQuaternion(q);
      } else {
        p.set(1.5, 2.5, 9);
        q.identity();
      }
    }
  });

  useFrame((state, dt) => {
    if (params?.id === name || !params?.id) {
      easing.damp3(state.camera.position, p, 0.4, dt);
      easing.dampQ(state.camera.quaternion, q, 0.4, dt);
    }
  });

  const handleClick = (e: any) => {
    e.stopPropagation();
    if (clicked.current === e.object || params?.id) {
      setLocation('/');
    } else if (!params?.id) {
      setLocation(route + name);
    }
  };

  return (
    <group
      position={groupPosition}
      rotation={groupRotation}
      ref={groupRef}
      onClick={e => handleClick(e)}
      //T onPointerMissed={() => setLocation('/')}
    >
      {children}
    </group>
  );
}
