import type { Config } from "tailwindcss";

/**
 * "Warm & Bright" palette (inspired by the pattern of kinedu.com, with our own colours):
 * warm paper, one action colour (saffron) and soft colour-coded tints that mark sections.
 * Every text/background pair used on the site meets WCAG AA (4.5:1).
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: { DEFAULT: "#FBFAF8", 2: "#F4F2EC" },
        ink: { DEFAULT: "#1A1D2E", soft: "#4A4F66" },
        night: "#16133A",
        saffron: { DEFAULT: "#FF8A1F", hover: "#F57A08", deep: "#B84A00", tint: "#FFF0DF" },
        violet: { DEFAULT: "#6D5DF5", deep: "#4A3BD1", tint: "#EEECFF" },
        coral: { DEFAULT: "#FF6B6B", deep: "#C23A3A", tint: "#FFECEC" },
        sky: { DEFAULT: "#2B8BE4", deep: "#1763B0", tint: "#E6F2FD" },
        sun: { DEFAULT: "#FFC033", deep: "#8A5A00", tint: "#FFF6DB" },
        mint: { DEFAULT: "#22B07D", deep: "#0E7A54", tint: "#E3F6EE" },
        line: "#E7E3DA",
      },
      fontFamily: { sans: ["var(--font-sans)", "system-ui", "sans-serif"] },
      borderRadius: { card: "28px", pill: "999px" },
      boxShadow: {
        soft: "0 10px 40px -18px rgba(26,29,46,.22)",
        lift: "0 22px 50px -20px rgba(26,29,46,.30)",
        glow: "0 12px 30px -10px rgba(255,138,31,.55)",
      },
      keyframes: {
        orb1: { "0%,100%": { transform: "translate(0,0) scale(1)" }, "50%": { transform: "translate(18px,-26px) scale(1.06)" } },
        orb2: { "0%,100%": { transform: "translate(0,0) scale(1)" }, "50%": { transform: "translate(-22px,20px) scale(1.08)" } },
        sweep: { from: { transform: "scaleX(0)" }, to: { transform: "scaleX(1)" } },
      },
      animation: { orb1: "orb1 16s ease-in-out infinite", orb2: "orb2 20s ease-in-out infinite", sweep: "sweep .9s .35s cubic-bezier(.22,1,.36,1) both" },
    },
  },
  plugins: [],
};
export default config;
