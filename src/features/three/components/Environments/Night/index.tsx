'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { Cloud, Clouds } from '@react-three/drei';
import { useControls } from 'leva';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '@/features/app/store';
import Moon from '../../Models/Moon';
import nightGradientVertexShader from '@/features/three/shaders/nightGradient/vertex.glsl';
import nightGradientFragmentShader from '@/features/three/shaders/nightGradient/fragment.glsl';
import { Themes } from '@/features/app/types';
import { useThreeStore } from '@/features/three/store/useThree';

const Night = () => {
  const [nightRotation, setNightRotation] = useState<number>(0);
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const theme = useAppStore(state => state.theme);
  const startScene = useThreeStore(state => state.startScene);

  const uniforms = useMemo(
    () => ({
      u_intensity: { value: 0.6 },
      u_amount: { value: 0.998 },
      u_time: { value: 0 },
      u_shineStrength: { value: 0.4 },
      u_shineChance: { value: 0.7 },
    }),
    [],
  );

  const { intensity, amount, shineStrength, shineSpeed, shineChance } = useControls('stars', {
    intensity: {
      min: 0,
      max: 1,
      value: uniforms.u_intensity.value,
      step: 0.01,
    },
    amount: {
      min: 0.99,
      max: 1,
      value: uniforms.u_amount.value,
      step: 0.001,
    },
    shineStrength: {
      min: 0,
      max: 1,
      value: uniforms.u_shineStrength.value,
      step: 0.01,
    },
    shineSpeed: {
      min: 1,
      max: 5,
      value: 1.5,
      step: 0.1,
    },
    shineChance: {
      min: 0,
      max: 1,
      value: uniforms.u_shineChance.value,
      step: 0.01,
    },
  });

  // TODO - Tentar fazer com que as estrelas só sejam pintadas até meio do screen

  useEffect(() => {
    if (groupRef.current && theme === Themes.light) {
      groupRef.current.visible = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_intensity.value = intensity;
      materialRef.current.uniforms.u_amount.value = amount;
      materialRef.current.uniforms.u_shineStrength.value = shineStrength;
      materialRef.current.uniforms.u_shineChance.value = shineChance;
    }
  }, [intensity, amount, shineStrength, shineChance]);

  useEffect(() => {
    if (theme === Themes.dark && nightRotation === 0) {
      return; // Exit early, no animation will run
    }

    if (groupRef.current) {
      // Animate rotation using GSAP
      gsap.to(groupRef.current.rotation, {
        z: nightRotation - Math.PI,
        duration: startScene ? 1.5 : 0.2, // Duration of the animation (you can adjust it)
        ease: 'power2.inOut', // Smoother easing
        overwrite: true, // Prevents conflicting animations
        onStart: () => {
          if (theme === Themes.light) {
            setTimeout(
              () => {
                if (groupRef.current) groupRef.current.visible = false;
              },
              startScene ? 750 : 100,
            );
          } else if (theme === Themes.dark) {
            setTimeout(
              () => {
                if (groupRef.current) groupRef.current.visible = true;
              },
              startScene ? 750 : 100,
            );
          }
        },
        onComplete: () => {
          setNightRotation(nightRotation - Math.PI);
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  // Animation loop for time
  useFrame((_, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value += delta * shineSpeed;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <boxGeometry args={[40, 40, 40]} />
        <shaderMaterial
          ref={materialRef}
          uniforms={uniforms}
          vertexShader={nightGradientVertexShader}
          fragmentShader={nightGradientFragmentShader}
          side={THREE.BackSide}
        />
      </mesh>
      <Clouds material={THREE.MeshBasicMaterial} position={[0, 3.8, 0]}>
        <Cloud seed={8} segments={10} bounds={[5, 1, 1]} volume={0.5} color='white' speed={0.1} />
      </Clouds>
      <Moon />
    </group>
  );
};

export default Night;
