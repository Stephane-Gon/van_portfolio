import { RefObject } from 'react';
import * as THREE from 'three';

type ThreeActions = {
  setInitialCamera: (position: THREE.Vector3, rotation: THREE.Euler) => void;
  setStartScene: (value: boolean) => void;
  setDebugMode: (value: boolean) => void;
  setZoomedFeature: (value: ZoomedFeaturesT | null) => void;
};

export type ThreeState = {
  initialCamera: {
    position: THREE.Vector3 | null;
    rotation: THREE.Euler | null;
  };
  startScene: boolean;
  debugMode: boolean;
  zoomedFeature: ZoomedFeaturesT | null;
};

export type ZoomedFeaturesT = 'projects' | 'tools' | 'works' | 'about';

export type ThreeStore = ThreeState & ThreeActions;

export type PointT = {
  ref: RefObject<THREE.Group<THREE.Object3DEventMap>>;
  newPosition: THREE.Vector3;
  oldPosition: THREE.Vector3;
};
