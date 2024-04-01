/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'searchbg': "url('./src/assets/images/movies.jpg')",
      }
    },
    fontFamily: {
      'poppins': ['Poppins', 'sans-serif'],
      'Roboto': ['Roboto', 'sans-serif'],
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
    require("flowbite/plugin"),
  ],
}
