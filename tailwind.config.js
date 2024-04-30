/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        varela: ['Varela Round', 'sans-serif'],
      },

      colors: {
        primary: '#5356FF',
        secondary: '#378CE7',
        tertiary: '#67C6E3',
        accent: '#DFF5FF',
      },
    },
  },
  plugins: [],
};