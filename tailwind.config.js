/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // brand palette derived from the camp + church logos
        ink: "#0c1620",        // deep near-black blue (the "old world" night city)
        deep: "#12303b",       // dark teal
        teal: "#1d5b6e",       // primary brand teal (from "different")
        tealLight: "#3a7d92",
        gold: "#c9962f",       // church emblem gold
        goldLight: "#e3b855",
        dawn: "#f3d9a6",       // warm sunrise (the "new world" path)
        cream: "#f7f3ec",
        sand: "#efe6d6",
      },
      fontFamily: {
        display: ["'Baloo Bhaijaan 2'", "'Cairo'", "sans-serif"],
        body: ["'Cairo'", "'Tajawal'", "sans-serif"],
        latin: ["'Poppins'", "sans-serif"],
      },
      boxShadow: {
        card: "0 8px 30px -12px rgba(12, 22, 32, 0.25)",
        glow: "0 0 40px -8px rgba(29, 91, 110, 0.45)",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.55" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.6s ease both",
        shimmer: "shimmer 2.5s linear infinite",
        pulseSoft: "pulseSoft 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
