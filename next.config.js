const { uid } = require('uid')
const { isProduction, isDevelopment, env } = require('std-env')

/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  disable: isDevelopment,
})

module.exports = withPWA({
  reactStrictMode: true,
  swcMinify: true,
  cleanDistDir: true,
  compress: true,
  trailingSlash: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: isProduction,
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  devIndicators: {
    autoPrerender: isDevelopment,
  },
  generateBuildId: async () => env.GIT_HASH || uid(32),
  experimental: {
    webVitalsAttribution: ['CLS', 'LCP'],
    optimizePackageImports: [],
  },
})
