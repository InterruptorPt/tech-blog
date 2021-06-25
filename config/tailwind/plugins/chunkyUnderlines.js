const plugin = require('tailwindcss/plugin')
const colors = require('../colors')

const chunkyUnderlines = plugin(({ addUtilities }) => {
  const underlines = Object.entries(colors).reduce(
    (result, [color, values]) => {
      if (!values['500'] || !values['200']) return result

      const classes = Object.entries(values).reduce(
        (colorResult, [key, value]) => {
          const className =
            key === 'DEFAULT'
              ? `.chunky-underline-${color}`
              : `.chunky-underline-${color}-${key}`

          return {
            ...colorResult,
            [className]: {
              'background-image': `linear-gradient(transparent 70%, ${value} 70%)`,
            },
          }
        },
        {},
      )

      return { ...result, ...classes }
    },
    {},
  )

  addUtilities(underlines, ['responsive', 'hover', 'dark'])
})

module.exports = chunkyUnderlines
