const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
})
const { i18n } = require('./next-i18next.config')

module.exports = withMDX({
  basePath: '',
  i18n,
  images: {
    domains: [
      // 'example.com',
    ],
  },
  pageExtensions: ['ts', 'tsx', 'mdx'],
  reactStrictMode: true,
  serverRuntimeConfig: {
    rootDir: __dirname,
  },
  async rewrites() {
    return [
      {
        source: '/js/script.js',
        destination: 'https://plausible.io/js/plausible.js',
      },
      {
        source: '/api/event',
        destination: 'https://plausible.io/api/event',
      },
    ]
  },
})
