const { env } = require('std-env')

/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  disable: env.NODE_ENV === 'development',
})

module.exports = withPWA({
  reactStrictMode: true,
  swcMinify: true,
  cleanDistDir: true,
  compress: true,
  trailingSlash: true,
  experimental: {
    webVitalsAttribution: ['CLS', 'LCP'],
  },
})
