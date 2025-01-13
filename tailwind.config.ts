import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        lamaSky: "#83c5be",
        lamaSkyLight: "#fcd6c7",
        lamaPurple: "#e29578",
        lamaPurpleLight: "#fcd6c7",
        lamaYellow: "#ffddd2",
        lamaYellowLight: "#fae7e1",
      },
    },
  },
  plugins: [],
};
export default config;