const tailwindDefaults = require('tailwindcss/defaultTheme')

const colors = require('./config/tailwind/colors')
const spacing = require('./config/tailwind/spacing')
const typography = require('./config/tailwind/typography')

module.exports = {
  darkMode: 'media',
  important: true,
  theme: {
    fontFamily: {
      display: ['Manrope', ...tailwindDefaults.fontFamily.sans],
      body: ['Lora', ...tailwindDefaults.fontFamily.serif],
    },
    extend: {
      colors,
      screens: {
        'dark-mode': { raw: '(prefers-color-scheme: dark)' },
        // 'light-mode': { raw: '(prefers-color-scheme: light)' },
      },
      spacing,
      typography,
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/typography'),
    require('./config/tailwind/plugins/chunkyUnderlines'),
  ],
  purge: [
    './src/**/*.ts',
    './src/**/*.tsx',
    './src/**/*.css',
    './src/**/*.scss',
  ],
}
