/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "rgb(var(--canvas) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        accentsoft: "rgb(var(--accent-soft) / <alpha-value>)",
      },
      fontFamily: {
        display: ["Libre Baskerville", "Georgia", "serif"],
        sans: ["Inter", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
