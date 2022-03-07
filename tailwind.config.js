const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['neuzeit-grotesk', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        custom: {
          gold: '#D5C283',
          'gold-light': '#EBDFB7',
          gray: '#F1EFEA',
          'gray-dark': '#707070',
          'gray-darker': '#2b2b2b',
          'green-light': '#B4F2B9',
          'red-light': '#F2C2B4',
        },
        gold: {
          100: '#FFFDF5',
          200: '#F1EFEA',
          600: '#EBDFB7',
          700: '#D5C283',
        },
      },
      lineHeight: {
        15: '3.75rem',
      },
      borderWidth: {
        6: '6px',
      },
      screens: {
        xs: '408px',
      },
      opacity: {
        15: '.15',
      },
      aspectRatio: {
        '9/10': '9 / 10',
      },
      boxShadow: {
        'inner-right': 'inset -5px -10px 15px 0px  rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [require('autoprefixer')],
}
