import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { ThreeStore } from '@/features/three/types';

export const useThreeStore = create<ThreeStore>()(
  subscribeWithSelector(set => ({
    initialCamera: {
      position: null,
      rotation: null,
    },
    setInitialCamera: (position, rotation) => set({ initialCamera: { position, rotation } }),
  })),
);
