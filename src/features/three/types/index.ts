import { RefObject } from 'react';
import * as THREE from 'three';

type ThreeActions = {
  setInitialCamera: (position: THREE.Vector3, rotation: THREE.Euler) => void;
  setStartScene: (value: boolean) => void;
};

export type ThreeState = {
  initialCamera: {
    position: THREE.Vector3 | null;
    rotation: THREE.Euler | null;
  };
  startScene: boolean;
};

export type ThreeStore = ThreeState & ThreeActions;

export type PointT = {
  ref: RefObject<THREE.Group<THREE.Object3DEventMap>>;
  newPosition: THREE.Vector3;
  oldPosition: THREE.Vector3;
};
