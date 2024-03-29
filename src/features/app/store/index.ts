import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { Themes } from '@/features/app/types';

interface AppState {
  showMobileMenu: boolean;
  activeLink: number;
  theme: Themes;
  setActiveLink: (activeLink: number) => void;
  toggleMobileMenu: () => void;
  toggleTheme: (theme: Themes) => void;
}

export const useAppStore = create<AppState>()(
  subscribeWithSelector(set => ({
    showMobileMenu: false,
    activeLink: 0,
    theme: Themes.dark,
    setActiveLink: activeLink => set({ activeLink }),
    toggleMobileMenu: () => set(state => ({ showMobileMenu: !state.showMobileMenu })),
    toggleTheme: theme =>
      set(() => {
        localStorage.setItem('theme', theme);

        const themesArray = Object.keys(Themes) as Array<keyof typeof Themes>;
        themesArray.forEach((key: any) => {
          if (key !== theme) {
            document.body.classList.remove(key);
          }
        });

        document.body.classList.add(theme);
        return { theme: theme };
      }),
  })),
);
