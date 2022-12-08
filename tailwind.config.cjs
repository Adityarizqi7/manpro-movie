/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'error-color': '#B8351C',
        'indigo-low': '#f1f1ff',
        'dark-theme': '#1E1E2C',
      },
      screens: {
        '6xs': {'max': '240px'},
        '5xs': {'max': '320px'},
        '4xs': {'max': '375px'},
        '3xs': {'max': '411px'},
        '2xs': {'max': '480px'},
        'xs': {'max': '540px'},
      }
    }
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    require('@headlessui/tailwindcss')({ prefix: 'ui' }),
  ],
}