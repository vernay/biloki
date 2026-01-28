import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#04a4ff",
        'primary-dark': "#0284c7",
        biloki: {
          blue: "#04a4ff",
        },
      },
    },
  },
  plugins: [],
};

export default config;
