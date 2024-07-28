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
        primaryBg: "#f0f0f0",
      },
    },
  },
  plugins: [],
};
