import type { Config } from "tailwindcss";
import defaultTheme from 'tailwindcss/defaultTheme'

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/design-system/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        smothDark: "#131313",
        smothDark200: "#1f1f1f",
        smothDark500: "#191919",
        smothWhite: "#f5f5f5",
        primaryBlue: "#A3E7FC",
        primaryGreen: "#8AEA92",
        primaryPink: "#EA9E8D",
        dangerRed: "#FF5A5F",
      },
      spacing: {
        border: '3px',
      },
      fontFamily: {
        josefin: ['"Josefin Sans"', ...defaultTheme.fontFamily.sans]
      }
    },
  },
  plugins: [],
};

export default config;
