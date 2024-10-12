'use client';

import { useGLTF, Clone } from '@react-three/drei';
import { useAppStore } from '@/features/app/store';
import { useControls } from 'leva';
import * as THREE from 'three';
import Point from '../../Point';
import { Themes } from '@/features/app/types';

export default function Tv() {
  const van = useGLTF('./models/van.glb');
  const toggleTheme = useAppStore(state => state.toggleTheme);
  const theme = useAppStore(state => state.theme);

  // TODO - Tentar comprimir os glb files

  const { switcherPoint } = useControls('van', {
    switcherPoint: {
      value: { x: -1.4, y: 1.4, z: 2.3 },
      step: 0.01,
    },
  });

  const handleSwitchTheme = () => {
    if (theme === Themes.light) {
      toggleTheme(Themes.dark);
    } else if (theme === Themes.dark) {
      toggleTheme(Themes.light);
    }
  };

  return (
    <group>
      <Clone object={van.scene} position={[0.5, 0.2, 2]} scale={0.6} rotation={[0, Math.PI * 0.65, 0]} />
      <Point
        position={new THREE.Vector3(switcherPoint.x, switcherPoint.y, switcherPoint.z)}
        label='1'
        description='Toggle the environment theme!'
        sizes='small'
        onClick={handleSwitchTheme}
      />
    </group>
  );
}

useGLTF.preload('./models/van.glb');
