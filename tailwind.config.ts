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
        black: "#0a0a0a",
        carbon: "#111111",
        anthracite: "#1a1a1a",
        smoke: "#2a2a2a",
        ember: "#E8650A",
        "ember-glow": "#FF8C42",
        gold: "#C9A96E",
        ash: "#888888",
        "light-ash": "#bbbbbb",
        cream: "#f5f0eb",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "serif"],
        ui: ["var(--font-syne)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
