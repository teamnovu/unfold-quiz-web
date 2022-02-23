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
    },
  },
  plugins: [require('autoprefixer')],
}
