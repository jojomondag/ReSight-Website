import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#1a1e1a",
          secondary: "#252a25",
          tertiary: "#2a302a",
        },
        accent: {
          DEFAULT: "#9CAB84",
          light: "#C5D89D",
          dark: "#89986D",
        },
        text: {
          primary: "#F6F0D7",
          secondary: "#89986D",
        },
        error: "#C4957A",
        border: "#3a3f3a",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
