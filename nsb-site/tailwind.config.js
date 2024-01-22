/** @type {import('tailwindcss').Config} */

const primaryColors = ["#bf1e2e", "#6D2121", "#1c4e50"];

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: primaryColors[2],
        primaryBg: "#f0e9e9",
      },
    },
  },
  plugins: [],
};
