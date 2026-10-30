import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#081221",
          900: "#0A1628",
          800: "#0F213C",
          700: "#163B88",
        },
        brand: {
          blue: "#1D63EB",
          blueHover: "#1550C4",
          sky: "#5CA9FF",
          cyan: "#2CA4F4",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-merriweather)", "Georgia", "serif"],
      },
      boxShadow: {
        card: "0 4px 20px -2px rgba(10, 22, 40, 0.08), 0 2px 6px -1px rgba(10, 22, 40, 0.04)",
        stat: "0 10px 25px -4px rgba(10, 22, 40, 0.10), 0 4px 10px -2px rgba(10, 22, 40, 0.05)",
      },
    },
  },
  plugins: [],
};

export default config;
