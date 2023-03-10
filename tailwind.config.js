/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: "'Roboto', serif",
        inter: "'Inter', serif",
      },
      colors: {
        bgCustom: "#141314",
      },
    },
  },
  plugins: [],
};
