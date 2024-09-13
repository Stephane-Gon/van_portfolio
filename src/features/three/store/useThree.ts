import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { ThreeStore } from '@/features/three/types';

export const useThreeStore = create<ThreeStore>()(
  subscribeWithSelector(set => ({
    isZooming: false,
    setIsZooming: isZooming => set({ isZooming })
  })),
);
