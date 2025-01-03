'use client';

import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';

import { useThreeStore } from '../../store/useThree';

import DirectionalLight from '../Environment/Lights/DirectionalLight';
import Van from '../Models/Van';
import Day from '../Environment/Day';
import Night from '../Environment/Night';
import Menu from '../Html/Menu';

export default function Experience() {
  const { camera } = useThree();
  const initialCamera = useThreeStore(state => state.initialCamera);
  const setZoomFunction = useThreeStore(state => state.setZoomFunction);
  const setZoomedFeature = useThreeStore(state => state.setZoomedFeature);

  useEffect(() => {
    const animateCameraReset = () => {
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

      setZoomedFeature(null);
    };

    setZoomFunction(animateCameraReset);
  }, [setZoomFunction, camera, initialCamera, setZoomedFeature]);

  return (
    <>
      <Day />
      <Night />
      <DirectionalLight />
      <Van />
      <Menu />
    </>
  );
}
