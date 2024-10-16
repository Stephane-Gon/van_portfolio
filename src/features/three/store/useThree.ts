import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { ThreeStore } from '@/features/three/types';

export const useThreeStore = create<ThreeStore>()(
  subscribeWithSelector(set => ({
    initialCamera: {
      position: null,
      rotation: null,
    },
    startScene: false,
    debugMode: false,
    setDebugMode: value => set({ debugMode: value }),
    setStartScene: value => set({ startScene: value }),
    setInitialCamera: (position, rotation) => set({ initialCamera: { position, rotation } }),
  })),
);
