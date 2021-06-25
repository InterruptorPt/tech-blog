const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
})
const { i18n } = require('./next-i18next.config');

module.exports = withMDX({
  basePath: '',
  i18n,
  pageExtensions: ['ts', 'tsx', 'mdx'],
  reactStrictMode: true,
    serverRuntimeConfig: {
    rootDir: __dirname,
  },
})
