/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        'primary-orange': '#ff9b3d',
        'secondary-blue': '#525FE1',
      },
      screens: {
        xs: '480px',
      }
    },
  },
  plugins: [],
}

