import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        h1: "3rem",
        h2: "2.625rem",
        h3: "2.25rem",
        h4: "1.875rem",
        h5: "1.5rem",
        h6: "1.25rem",
        l: "1.125rem",
        base: "1rem",
        s: "0.875rem",
      },
      fontFamily: {
        tmoney: ['"TmoneyRoundWind"', "sans-serif"],
        mice: ['"MICEGothic"', "sans-serif"],
        "m-h1": "var(--m-h1-font-family)",
        "m-h1-5": "var(--m-h1-5-font-family)",
        "m-h2": "var(--m-h2-font-family)",
        "m-h2-5": "var(--m-h2-5-font-family)",
        "m-h3": "var(--m-h3-font-family)",
        "m-h4": "var(--m-h4-font-family)",
        "m-large-text": "var(--m-large-text-font-family)",
        "m-paragraph": "var(--m-paragraph-font-family)",
        "m-small-bold": "var(--m-small-bold-font-family)",
        "m-small-small-text": "var(--m-small-small-text-font-family)",
        "m-small-text": "var(--m-small-text-font-family)",
        "m-SSS-texxt": "var(--m-SSS-texxt-font-family)",
        "t-h1": "var(--t-h1-font-family)",
        "t-h1-5": "var(--t-h1-5-font-family)",
        "t-h2": "var(--t-h2-font-family)",
        "t-h3": "var(--t-h3-font-family)",
        "t-h4": "var(--t-h4-font-family)",
        "t-large-text": "var(--t-large-text-font-family)",
        "t-paragraph": "var(--t-paragraph-font-family)",
        "t-small-text": "var(--t-small-text-font-family)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        red: {
          100: "#ff0000",
        },
        green: {
          100: "#F3FAF3",
          200: "#C9E9CC",
          300: "#6DBB76",
          400: "#388140",
          500: "#29522E",
        },
        gray: {
          100: "#F1F4F1",
          200: "#EAECEA",
          300: "#DDDEDD",
          350: "#B8BCB8",
          400: "#979A97",
          500: "#49554A",
        },
        black: {
          100: "#0F2413",
        },
        white: {
          100: "#FFFFFF",
        },
        yellow: {
          100: "#FFF3C2",
          200: "#FFCB3C",
        },
        brown: {
          100: "#723511",
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
export default config;
