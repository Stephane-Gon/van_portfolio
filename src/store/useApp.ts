import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import type { Themes } from '@/utils/app';

interface AppState {
  showMobileMenu: boolean;
  activeLink: number;
  theme: Themes;
  setActiveLink: (activeLink: number) => void;
  toggleMobileMenu: () => void;
  toggleTheme: (theme: Themes) => void;
}

export const useAppStore = create<AppState>()(subscribeWithSelector((set) => ({
  showMobileMenu: false,
  activeLink: 0,
  theme: 'dark',
  setActiveLink: (activeLink) => set({ activeLink }),
  toggleMobileMenu: () => set((state) => ({ showMobileMenu: !state.showMobileMenu })),
  toggleTheme: (theme) => set(() => {
    // TODO - Aqui tbm tenho que adicionar a class no body
    // TODO - Depois criar um useEffect que corre quando o projeto inicia que vai buscar o tema do localStorage
    // TODO - E depois adicionar a class no body e altera o toggler
    localStorage.setItem('theme', theme)
    return { theme: theme }
  }),
})))
