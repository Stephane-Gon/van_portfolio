'use client';

import { useAppStore } from '@/features/app/store';
import * as THREE from 'three';
import Point from '../../../Point';
import { Themes } from '@/features/app/types';

export default function ThemeToggler() {
  const toggleTheme = useAppStore(state => state.toggleTheme);
  const theme = useAppStore(state => state.theme);

  const handleSwitchTheme = () => {
    if (theme === Themes.light) {
      toggleTheme(Themes.dark);
    } else if (theme === Themes.dark) {
      toggleTheme(Themes.light);
    }
  };

  return (
    <>
      <Point
        position={new THREE.Vector3(-1.35, 1.45, 2.35)}
        label='1'
        description='Toggle the environment theme!'
        sizes='small'
        onClick={handleSwitchTheme}
      />
    </>
  );
}
