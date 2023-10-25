/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    colors: {
      'primary': '#4441E5',
      'prim-light': '#7C7AEC',
      'prim-light-1': '#A1A0F2',
      'prim-light-2': '#ECECFC',
      'prim-dark': '#2F2DA0',
      'prim-dark-1': '#1B1A5B',
      'prim-dark-2': '#0D0D2D',
      'secondary': '#37C234',
      'sec-light': '#73D470',
      'sec-light-1': '#AFE6AD',
      'sec-light-2': '#EBF8EA',
      'sec-dark': '#268724',
      'sec-dark-1': '#164D14',
      'sec-dark-2': '#051305',
      'transparent': 'transparent',
      'danger': '#D30E0E'
    },
    fontFamily: {
      'custom': ['Oxygen', 'Red Hat Display', 'sans-serif'],
    },
    extend: {
      screens: {
        '3xl': '1920px',
      },
    },
  },
  plugins: [],
}

