import type { NextConfig } from 'next'
import MillionLint from '@million/lint'
import { env, isDevelopment, isProduction } from 'std-env'
import { uid } from 'uid'

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
  generateBuildId: async () => env.GIT_HASH || uid(32),
  experimental: {
    webVitalsAttribution: ['CLS', 'LCP'],
    optimizePackageImports: [],
  },
}

export default MillionLint.next({ rsc: true })(nextConfig)
