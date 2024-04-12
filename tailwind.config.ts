import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
import containerPlugin from '@tailwindcss/container-queries';

const config: Config = {
  content: [
    './src/design-system/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'selector',
  theme: {
    colors: {
      accent: 'rgba(var(--accent))',
      text: 'rgba(var(--text))',
      primary: 'rgba(var(--primary))',
      secondary: 'rgba(var(--secondary))',
      tertiary: 'rgba(var(--tertiary))',
      dangerRed: '#FF5A5F',
      glassSidebar: 'rgba(var(--glassSidebar))',
      glassBorder: 'rgba(var(--glassBorder))',
      cardsBg: 'rgba(var(--cardsBg))',
    },
    screens: {
      '2sm': '450px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1200px',
      '2xl': '1500px',
    },
    extend: {
      backgroundImage: {
        background: `var(--bgImage)`,
        neumorph: 'var(--neumorphismBg)',
      },
      scale: {
        '70': '0.70',
      },
      zIndex: {
        '1': '1',
        '2': '2',
      },
      spacing: {
        border: '3px',
      },
      fontFamily: {
        josefin: ['"Josefin Sans"', ...defaultTheme.fontFamily.sans],
      },
      containers: {
        '4xs': '4rem',
        '3xs': '14rem',
        '2xs': '18rem',
      },
      boxShadow: {
        glass: '0 4px 30px rgba(0, 0, 0, 0.1)',
        neumorph: 'var(--neumorphismShadow)',
        strongInner: 'inset 3px 3px 10px 1px rgba(0, 0, 0, 0.5)',
        strongerInner: 'inset 3px 3px 10px 3px rgba(0, 0, 0, 0.5)',
        levelbar: '1px 3px 4px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [containerPlugin],
};

export default config;
