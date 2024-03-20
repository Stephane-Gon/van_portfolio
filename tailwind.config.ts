import type { Config } from "tailwindcss";
import defaultTheme from 'tailwindcss/defaultTheme'
import containerPlugin from "@tailwindcss/container-queries";

// TODO - Ver qual é a melhor forma de adicionar temas ao tailwind
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/design-system/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
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
    extend: {
      backgroundImage: {
        darkBackground: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2000 1500'%3E%3Cdefs%3E%3Cpath fill='none' stroke-width='1' stroke-opacity='0.08' id='a' d='M0-478l-413.96 717h827.92L0-478l-413.96 717h827.92z'/%3E%3C/defs%3E%3Cg style='transform-origin:center'%3E%3Cg transform='' style='transform-origin:center'%3E%3Cg transform='rotate(-160 0 0)' style='transform-origin:center'%3E%3Cg transform='translate(1000 750)'%3E%3Cuse stroke='%23EA9E8D' href='%23a' transform='rotate(-80 0 0) scale(0.2)'/%3E%3Cuse stroke='%23ed9e95' href='%23a' transform='rotate(-70 0 0) scale(0.3)'/%3E%3Cuse stroke='%23f09f9e' href='%23a' transform='rotate(-60 0 0) scale(0.4)'/%3E%3Cuse stroke='%23f1a1a7' href='%23a' transform='rotate(-50 0 0) scale(0.5)'/%3E%3Cuse stroke='%23f2a2b0' href='%23a' transform='rotate(-40 0 0) scale(0.6)'/%3E%3Cuse stroke='%23f1a4b9' href='%23a' transform='rotate(-30 0 0) scale(0.7)'/%3E%3Cuse stroke='%23f0a7c2' href='%23a' transform='rotate(-20 0 0) scale(0.8)'/%3E%3Cuse stroke='%23eeaaca' href='%23a' transform='rotate(-10 0 0) scale(0.9)'/%3E%3Cuse stroke='%23ebadd2' href='%23a' transform=''/%3E%3Cuse stroke='%23e7b1da' href='%23a' transform='rotate(10 0 0) scale(1.1)'/%3E%3Cuse stroke='%23e3b4e1' href='%23a' transform='rotate(20 0 0) scale(1.2)'/%3E%3Cuse stroke='%23deb8e8' href='%23a' transform='rotate(30 0 0) scale(1.3)'/%3E%3Cuse stroke='%23d8bcee' href='%23a' transform='rotate(40 0 0) scale(1.4)'/%3E%3Cuse stroke='%23d2c0f3' href='%23a' transform='rotate(50 0 0) scale(1.5)'/%3E%3Cuse stroke='%23ccc4f8' href='%23a' transform='rotate(60 0 0) scale(1.6)'/%3E%3Cuse stroke='%23c5c8fb' href='%23a' transform='rotate(70 0 0) scale(1.7)'/%3E%3Cuse stroke='%23bfccfe' href='%23a' transform='rotate(80 0 0) scale(1.8)'/%3E%3Cuse stroke='%23b9d0ff' href='%23a' transform='rotate(90 0 0) scale(1.9)'/%3E%3Cuse stroke='%23b4d4ff' href='%23a' transform='rotate(100 0 0) scale(2)'/%3E%3Cuse stroke='%23afd7ff' href='%23a' transform='rotate(110 0 0) scale(2.1)'/%3E%3Cuse stroke='%23aadbff' href='%23a' transform='rotate(120 0 0) scale(2.2)'/%3E%3Cuse stroke='%23a7deff' href='%23a' transform='rotate(130 0 0) scale(2.3)'/%3E%3Cuse stroke='%23a4e1ff' href='%23a' transform='rotate(140 0 0) scale(2.4)'/%3E%3Cuse stroke='%23a3e4fe' href='%23a' transform='rotate(150 0 0) scale(2.5)'/%3E%3Cuse stroke='%23A3E7FC' href='%23a' transform='rotate(160 0 0) scale(2.6)'/%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        lightBackground: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2000 1500'%3E%3Cdefs%3E%3Cpath fill='none' stroke-width='1' stroke-opacity='0.51' id='a' d='M0-478l-413.96 717h827.92L0-478l-413.96 717h827.92z'/%3E%3C/defs%3E%3Cg style='transform-origin:center'%3E%3Cg transform='' style='transform-origin:center'%3E%3Cg transform='rotate(-160 0 0)' style='transform-origin:center'%3E%3Cg transform='translate(1000 750)'%3E%3Cuse stroke='%23EA9E8D' href='%23a' transform='rotate(-80 0 0) scale(0.2)'/%3E%3Cuse stroke='%23ed9e95' href='%23a' transform='rotate(-70 0 0) scale(0.3)'/%3E%3Cuse stroke='%23f09f9e' href='%23a' transform='rotate(-60 0 0) scale(0.4)'/%3E%3Cuse stroke='%23f1a1a7' href='%23a' transform='rotate(-50 0 0) scale(0.5)'/%3E%3Cuse stroke='%23f2a2b0' href='%23a' transform='rotate(-40 0 0) scale(0.6)'/%3E%3Cuse stroke='%23f1a4b9' href='%23a' transform='rotate(-30 0 0) scale(0.7)'/%3E%3Cuse stroke='%23f0a7c2' href='%23a' transform='rotate(-20 0 0) scale(0.8)'/%3E%3Cuse stroke='%23eeaaca' href='%23a' transform='rotate(-10 0 0) scale(0.9)'/%3E%3Cuse stroke='%23ebadd2' href='%23a' transform=''/%3E%3Cuse stroke='%23e7b1da' href='%23a' transform='rotate(10 0 0) scale(1.1)'/%3E%3Cuse stroke='%23e3b4e1' href='%23a' transform='rotate(20 0 0) scale(1.2)'/%3E%3Cuse stroke='%23deb8e8' href='%23a' transform='rotate(30 0 0) scale(1.3)'/%3E%3Cuse stroke='%23d8bcee' href='%23a' transform='rotate(40 0 0) scale(1.4)'/%3E%3Cuse stroke='%23d2c0f3' href='%23a' transform='rotate(50 0 0) scale(1.5)'/%3E%3Cuse stroke='%23ccc4f8' href='%23a' transform='rotate(60 0 0) scale(1.6)'/%3E%3Cuse stroke='%23c5c8fb' href='%23a' transform='rotate(70 0 0) scale(1.7)'/%3E%3Cuse stroke='%23bfccfe' href='%23a' transform='rotate(80 0 0) scale(1.8)'/%3E%3Cuse stroke='%23b9d0ff' href='%23a' transform='rotate(90 0 0) scale(1.9)'/%3E%3Cuse stroke='%23b4d4ff' href='%23a' transform='rotate(100 0 0) scale(2)'/%3E%3Cuse stroke='%23afd7ff' href='%23a' transform='rotate(110 0 0) scale(2.1)'/%3E%3Cuse stroke='%23aadbff' href='%23a' transform='rotate(120 0 0) scale(2.2)'/%3E%3Cuse stroke='%23a7deff' href='%23a' transform='rotate(130 0 0) scale(2.3)'/%3E%3Cuse stroke='%23a4e1ff' href='%23a' transform='rotate(140 0 0) scale(2.4)'/%3E%3Cuse stroke='%23a3e4fe' href='%23a' transform='rotate(150 0 0) scale(2.5)'/%3E%3Cuse stroke='%23A3E7FC' href='%23a' transform='rotate(160 0 0) scale(2.6)'/%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      },
      spacing: {
        border: '3px',
      },
      fontFamily: {
        josefin: ['"Josefin Sans"', ...defaultTheme.fontFamily.sans]
      },
      containers: {
        "4xs": "4rem",
        "2xs": "18rem"
      }
    },
  },
  plugins: [
    containerPlugin
  ],
};

export default config;