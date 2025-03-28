/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#FFCE1A',
        'secondary': '#09062d',
        'blackBG': '#F3F3F3',
        'Favorite': '#FF5841',
      },
      fontFamily: {
        'primary': ["Nunito", "sans-serif"],
        'secondary': ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
}
