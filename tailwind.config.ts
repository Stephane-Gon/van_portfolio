import type { Config } from "tailwindcss";
import defaultTheme from 'tailwindcss/defaultTheme'
import containerPlugin from "@tailwindcss/container-queries";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/design-system/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'selector',
  theme: {
    // TODO - Aqui definir um esquema de prioridades para as 3 core que faltam
    colors: {
      primary: "rgba(var(--primary))",
      secondary: "rgba(var(--secondary))",
      primaryBlue: "#A3E7FC",
      primaryGreen: "#8AEA92",
      primaryPink: "#EA9E8D",
      dangerRed: "#FF5A5F",
      glassSidebar: "rgba(var(--glassSidebar))",
      glassBorder: "rgba(var(--glassBorder))",
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1200px',
      '2xl': '1500px',
    },
    extend: {
      backgroundImage: {
        background: `var(--bgImage)`,
      },
      scale: {
        "70": '0.70'
      },
      zIndex: {
        '1': '1',
        '2': '2',
      },
      spacing: {
        border: '3px',
      },
      fontFamily: {
        josefin: ['"Josefin Sans"', ...defaultTheme.fontFamily.sans]
      },
      containers: {
        "4xs": "4rem",
        "3xs": "14rem",
        "2xs": "18rem"
      },
      boxShadow: {
        glass: '0 4px 30px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [
    containerPlugin
  ],
};

export default config;