/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        ...colors,
        primary: "#79ef31",
      },
      borderWidth: {
        // default
        DEFAULT: "1px",
      },
    },
  },
  plugins: [],
};
