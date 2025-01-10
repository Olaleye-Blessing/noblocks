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
        secondary: "#43B9FB",
        black: "#121217",
        outline: {
          gray: "#8A8AA3",
        },
        lavender: {
          50: "#F6F6FE",
          100: "#ECECFD",
          200: "#D8D7FB",
          300: "#C2BFF8",
          400: "#A9A5F6",
          500: "#8B85F4",
          600: "#7C77DA",
          700: "#6C67BD",
          800: "#58549A",
          900: "#3E3B6D",
        },
        surface: {
          overlay: "#202020",
        },
      },
    },
  },
  plugins: [],
  darkMode: "class",
};

export default config;
