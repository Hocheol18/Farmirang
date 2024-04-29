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
        h1 : '3rem',
        h2 : '2.625rem',
        h3 : '2.25rem',
        h4 : '1.875rem',
        h5 : '1.5rem',
        h6 : '1.25rem',
        l : '1.125rem',
        base : '1rem',
        s : '0.875rem'
      },
      fontFamily: {
        tmoney: ['"TmoneyRoundWind"', "sans-serif"],
        mice: ['"MICEGothic"', "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
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
  plugins: [],
};
export default config;
