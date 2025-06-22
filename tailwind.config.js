/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        quicksand: ['Quicksand', 'sans-serif'],
      },
      colors: {
        'hushr-green': '#40F8AB',
        'hushr-gray': '#404040',
        'hushr-grayLess': '#808080',
      },
    },
  },
  plugins: [],
};
