module.exports = (theme) => ({
  DEFAULT: {
    css: {
      h1: {
        fontWeight: 700,
      },
    },
  },
  dark: {
    css: {
      color: theme('colors.violet.50'),
      '[class~="lead"]': {
        color: theme('colors.violet.400'),
      },
      a: {
        color: theme('colors.violet.50'),
      },
      strong: {
        color: theme('colors.violet.50'),
      },
      'ol > li::before': {
        color: theme('colors.violet.400'),
      },
      'ul > li::before': {
        backgroundColor: theme('colors.violet.400'),
      },
      hr: {
        borderColor: theme('colors.violet.600'),
      },
      blockquote: {
        color: theme('colors.violet.50'),
        borderLeftColor: theme('colors.violet.700'),
      },
      h1: {
        color: theme('colors.violet.50'),
      },
      h2: {
        color: theme('colors.violet.50'),
      },
      h3: {
        color: theme('colors.violet.50'),
      },
      h4: {
        color: theme('colors.violet.50'),
      },
      'figure figcaption': {
        color: theme('colors.violet.400'),
      },
      code: {
        color: theme('colors.violet.50'),
      },
      'a code': {
        color: theme('colors.violet.50'),
      },
      pre: {
        color: theme('colors.violet.200'),
        backgroundColor: theme('colors.violet.900'),
      },
      thead: {
        color: theme('colors.violet.50'),
        borderBottomColor: theme('colors.violet.700'),
      },
      'tbody tr': {
        borderBottomColor: theme('colors.violet.800'),
      },
    },
  },
})
