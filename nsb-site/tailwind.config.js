/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "380px",
      },
      colors: {
        primary: "#1c4e50",
        primaryDark: "#578a8c",
        primaryBg: "#f0f0f0",
        primaryBgDark: "#18181b",
      },
    },
  },
  plugins: [],
};
