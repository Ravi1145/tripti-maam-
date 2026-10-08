import type { Config } from "tailwindcss";

// "Quiet Luxury" palette. Token names are kept from earlier versions so every page re-skins at once:
//   ivory = stone paper, teal-* = bottle green, gold = brushed brass, ink = green-black.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#F6F1E7",
        cream: "#ECE4D4",
        teal: { 950: "#0A1F1B", 900: "#12332C", 700: "#1F5A4E", 500: "#4E8A7A", 100: "#DCE7E1" },
        gold: { DEFAULT: "#B8975A", light: "#D9C08A", dark: "#7A5F2A" },
        coral: "#8C3B2E",
        pink: { DEFAULT: "#D9B8B0", soft: "#EBD9D3" },
        mint: { DEFAULT: "#9DB8A9", soft: "#DCE7E1" },
        ink: "#14201D",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      keyframes: {
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-14px)" } },
        marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
        spinslow: { to: { transform: "rotate(360deg)" } },
      },
      animation: {
        float: "float 9s ease-in-out infinite",
        marquee: "marquee 60s linear infinite",
        spinslow: "spinslow 60s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
