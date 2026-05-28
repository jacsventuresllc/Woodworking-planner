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
        primary: {
          DEFAULT: "#2D5A27",
          light: "#4A7C44",
          dark: "#1E3D1A",
        },
        secondary: {
          DEFAULT: "#8B4513",
          light: "#A0522D",
          dark: "#5D2E0C",
        },
        accent: {
          DEFAULT: "#F5A623",
          light: "#F7B84C",
          dark: "#D4900F",
        },
        surface: "#FFFFFF",
        background: "#FDFBF7",
      },
      fontFamily: {
        heading: ["var(--font-playfair)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      boxShadow: {
        card: "0 2px 8px rgba(0,0,0,0.08)",
        "card-hover": "0 4px 16px rgba(0,0,0,0.12)",
      },
      borderRadius: {
        card: "8px",
        button: "6px",
        input: "4px",
      },
    },
  },
  plugins: [],
};

export default config;