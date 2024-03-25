import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

interface AppState {
  showMobileMenu: boolean;
  activeLink: number;
  setActiveLink: (activeLink: number) => void;
  toggleMobileMenu: () => void;
}

export const useAppStore = create<AppState>()(subscribeWithSelector((set) => ({
  showMobileMenu: false,
  activeLink: 0,
  setActiveLink: (activeLink) => set({ activeLink }),
  toggleMobileMenu: () => set((state) => ({ showMobileMenu: !state.showMobileMenu }))
})))
