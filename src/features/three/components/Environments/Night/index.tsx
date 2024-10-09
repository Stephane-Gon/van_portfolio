'use client';

import React, { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Cloud, Clouds } from '@react-three/drei';
import { useControls } from 'leva';
import Moon from '../../Models/Moon';
import nightGradientVertexShader from '@/features/three/shaders/nightGradient/vertex.glsl';
import nightGradientFragmentShader from '@/features/three/shaders/nightGradient/fragment.glsl';
import { useFrame } from '@react-three/fiber';

const Night = () => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

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

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_intensity.value = intensity;
      materialRef.current.uniforms.u_amount.value = amount;
      materialRef.current.uniforms.u_shineStrength.value = shineStrength;
      materialRef.current.uniforms.u_shineChance.value = shineChance;
    }
  }, [intensity, amount, shineStrength, shineChance]);

  // Animation loop for time
  useFrame((_, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value += delta * shineSpeed;
    }
  });

  return (
    <>
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
    </>
  );
};

export default Night;
