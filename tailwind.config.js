/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: '30px',
      }
    },
    screens: {
      '2xl': {'max': '1535px'},
      'xl': {'max': '1279px'},
      'lg': {'max': '1023px'},
      'md': {'max': '767px'},
      'sm': {'max': '639px'},
      'xs': {'max': '399px'},
    },
    colors: {
      'green': {
        DEFAULT: '#87C23E',
      },
      'red': {
        DEFAULT: '#E31E24',
        'light': '#FDF3F4',
      },
      'gray': {
        '2c2d2f': '#2C2D2F',
        '848484': '#848484',
        'a1a4ad': '#A1A4AD',
        'f5f5f5': '#F5F5F5',
        'dcdcdc': '#DCDCDC',
        'c8c8c8': '#C8C8C8',
        '53565b': '#53565B',
        'd9d9d9': '#d9d9d9',
      },
      'white': '#FFFFFF',
      'black': {
        DEFAULT: '#080808',
        'true': '#000000',
      }
    },
    extend: {
      height: {
        'the-header': '60px'
      },
      margin: {
        'the-header': '40px',
      }
    },
  },
  plugins: []
}
