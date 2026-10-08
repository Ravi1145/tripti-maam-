import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#FBF7EF",
        cream: "#F3ECDD",
        teal: { 950: "#08282A", 900: "#0F3D3E", 700: "#1F6F6B", 500: "#3F9A93", 100: "#DCE8E2" },
        gold: { DEFAULT: "#C9A24B", light: "#E6CF91", dark: "#7A5A12" },
        ink: "#12201F",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      keyframes: {
        float: { "0%,100%": { transform: "translateY(0) rotate(0)" }, "50%": { transform: "translateY(-24px) rotate(6deg)" } },
        shimmer: { "0%": { backgroundPosition: "0% 50%" }, "100%": { backgroundPosition: "200% 50%" } },
        marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
      },
      animation: {
        float: "float 9s ease-in-out infinite",
        shimmer: "shimmer 6s linear infinite",
        marquee: "marquee 40s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
