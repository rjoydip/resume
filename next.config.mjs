import { uid } from 'uid'
import { env, isDevelopment, isProduction } from 'std-env'
import nextPWA from 'next-pwa'
import MillionCompiler from '@million/lint'

/** @type {import('next').NextConfig} */
export const nextConfig = {
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
}

export default MillionCompiler.next({
  rsc: true,
})(nextPWA({
  disable: isDevelopment,
})(nextConfig))
