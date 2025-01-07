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
    zoomedFeature: null,
    isMenuOpen: false,
    menuHoverLink: null,
    zoomFunction: null,
    setMenuHoverLink: value => set({ menuHoverLink: value }),
    setIsMenuOpen: value => set({ isMenuOpen: value }),
    setZoomedFeature: value => set({ zoomedFeature: value }),
    setDebugMode: value => set({ debugMode: value }),
    setStartScene: value => set({ startScene: value }),
    setInitialCamera: (position, rotation) => set({ initialCamera: { position, rotation } }),
    setZoomFunction: func => set({ zoomFunction: func }),
  })),
);
