/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');


module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    colors: {
      primary: colors.indigo,
      secondary: colors.amber,
      accent: colors.amber,       //alias for secondary
      warn: colors.rose,
      neutral: colors.slate,
    },
    extend: {},
  },
  plugins: [],
}

