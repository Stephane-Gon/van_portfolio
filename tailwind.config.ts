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
        neumorph: 'linear-gradient(145deg, #111111, #141414)',
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
        neumorph: '22px 22px 44px #101010, -22px -22px 44px #161616;',
      },
    },
  },
  plugins: [containerPlugin],
};

export default config;
