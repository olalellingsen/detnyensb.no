/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#bf1e2e",
        primaryBg: "#fae8e8",
      },
    },
  },
  plugins: [],
};
