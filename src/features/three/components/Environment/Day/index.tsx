'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import dynamic from 'next/dynamic';
import * as THREE from 'three';
import { Sky } from '@react-three/drei';
import Sun from '../../Models/Sun';
import { useAppStore } from '@/features/app/store';
import { Themes } from '@/features/app/types';
import { useThreeStore } from '@/features/three/store/useThree';
import useViewportSize from '@/hooks/useViewport';

const DayClouds = dynamic(() => import('../../Models/DayClouds'), { ssr: false });

const Day = () => {
  const [dayRotation, setDayRotation] = useState<number>(0);
  const groupRef = useRef<THREE.Group>(null);
  const theme = useAppStore(state => state.theme);
  const startScene = useThreeStore(state => state.startScene);
  const { width } = useViewportSize();

  useEffect(() => {
    if (groupRef.current && theme === Themes.dark) {
      groupRef.current.visible = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (theme === Themes.light && dayRotation === 0) {
      return; // Exit early, no animation will run
    }

    if (groupRef.current) {
      // Animate rotation using GSAP
      gsap.to(groupRef.current.rotation, {
        z: dayRotation - Math.PI,
        duration: startScene ? 1.5 : 0.2, // Duration of the animation (you can adjust it)
        ease: 'power2.inOut', // Smoother easing
        overwrite: true, // Prevents conflicting animations
        onStart: () => {
          if (theme === Themes.dark) {
            setTimeout(
              () => {
                if (groupRef.current) groupRef.current.visible = false;
              },
              startScene ? 750 : 100,
            );
          } else if (theme === Themes.light) {
            setTimeout(
              () => {
                if (groupRef.current) groupRef.current.visible = true;
              },
              startScene ? 750 : 100,
            );
          }
        },
        onComplete: () => {
          setDayRotation(dayRotation - Math.PI);
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  return (
    <group ref={groupRef}>
      <Sky distance={10} sunPosition={[0.9, 0.9, -0.3]} inclination={1} azimuth={0.25} />
      <Sun />
      {width > 600 && <DayClouds />}
    </group>
  );
};

export default Day;
