import type { NextConfig } from 'next'
import MillionLint from '@million/lint'
import { env, isDevelopment, isProduction } from 'std-env'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  cleanDistDir: true,
  compress: true,
  trailingSlash: false,
  poweredByHeader: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  productionBrowserSourceMaps: isProduction,
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  devIndicators: {
    buildActivity: isDevelopment,
    appIsrStatus: isDevelopment,
    buildActivityPosition: isDevelopment ? 'top-right' : undefined,
  },
  generateBuildId: async () => env.GIT_HASH || Math.random().toString(16).slice(2),
  experimental: {
    webVitalsAttribution: ['CLS', 'LCP'],
    optimizePackageImports: [],
  },
  env: {
    BLOB_READ_WRITE_TOKEN: env.BLOB_READ_WRITE_TOKEN,
  },
}

export default MillionLint.next({
  enabled: isDevelopment,
  rsc: true,
})(nextConfig)
