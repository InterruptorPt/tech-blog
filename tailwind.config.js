const tailwindDefaults = require('tailwindcss/defaultTheme')

const colors = require('./config/tailwind/colors')
const spacing = require('./config/tailwind/spacing')
const typography = require('./config/tailwind/typography')

module.exports = {
  mode: 'jit',
  darkMode: 'class',
  theme: {
    fontFamily: {
      display: [
        'ManropeVariable',
        'Manrope',
        ...tailwindDefaults.fontFamily.sans,
      ],
      body: ['LoraVariable', 'Lora', ...tailwindDefaults.fontFamily.serif],
    },
    extend: {
      colors,
      spacing,
      typography,
    },
  },
  variants: {
    typography: ['responsive', 'dark'],
  },
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
