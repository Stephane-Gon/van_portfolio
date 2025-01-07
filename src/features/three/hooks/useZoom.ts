import { useThree } from '@react-three/fiber';
import gsap from 'gsap';
import * as THREE from 'three';
import { useThreeStore } from '../store/useThree';
import type { PointT, ZoomedFeaturesT } from '../types';

type useZoomProps = {
  newCameraPosition: THREE.Vector3;
  newCameraRotation: THREE.Euler;
  toZoomFeature: ZoomedFeaturesT | null;
};

export const useZoom = ({ newCameraPosition, newCameraRotation, toZoomFeature }: useZoomProps) => {
  const { camera } = useThree();

  const initialCamera = useThreeStore(state => state.initialCamera);
  const zoomedFeature = useThreeStore(state => state.zoomedFeature);
  const setZoomedFeature = useThreeStore(state => state.setZoomedFeature);

  const animateCameraZoom = (point?: PointT) => {
    // Animate the camera position
    gsap.to(camera.position, {
      x: newCameraPosition.x,
      y: newCameraPosition.y,
      z: newCameraPosition.z,
      duration: 1,
      ease: 'power2.inOut',
    });

    gsap.to(camera.rotation, {
      x: newCameraRotation.x,
      y: newCameraRotation.y,
      z: newCameraRotation.z,
      duration: 1,
      ease: 'power2.inOut',
    });

    if (point && point.ref.current) {
      gsap.to(point.ref.current?.position, {
        x: point.newPosition.x,
        y: point.newPosition.y,
        z: point.newPosition.z,
        duration: 1,
        ease: 'power2.inOut',
      });
    }

    setZoomedFeature(toZoomFeature);
  };

  const animateCameraReset = (point?: PointT) => {
    gsap.to(camera.position, {
      x: initialCamera.position ? initialCamera.position.x : 0,
      y: initialCamera.position ? initialCamera.position.y : 0,
      z: initialCamera.position ? initialCamera.position.z : 0,
      duration: 1,
      ease: 'power2.inOut',
    });

    gsap.to(camera.rotation, {
      x: initialCamera.rotation ? initialCamera.rotation.x : 0,
      y: initialCamera.rotation ? initialCamera.rotation.y : 0,
      z: initialCamera.rotation ? initialCamera.rotation.z : 0,
      duration: 1,
      ease: 'power2.inOut',
    });

    if (point && point.ref.current) {
      gsap.to(point.ref.current?.position, {
        x: point.oldPosition.x,
        y: point.oldPosition.y,
        z: point.oldPosition.z,
        duration: 1,
        ease: 'power2.inOut',
      });
    }

    setZoomedFeature(null);
  };

  const toggleCameraZoom = (e: any, point?: PointT) => {
    e.stopPropagation();
    if (zoomedFeature === toZoomFeature) {
      animateCameraReset(point);
    } else if (!zoomedFeature) {
      animateCameraZoom(point);
    }
  };

  return {
    toggleCameraZoom,
    animateCameraReset,
    animateCameraZoom,
  };
};
