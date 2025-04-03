import type { NextConfig } from 'next'
import { v4 as uuid } from '@lukeed/uuid/secure'
import { env, isProduction } from 'std-env'

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
  generateBuildId: async () => env.GIT_HASH || uuid(),
  experimental: {
    webVitalsAttribution: ['CLS', 'LCP'],
    optimizePackageImports: [],
  },
  env: {
    BLOB_READ_WRITE_TOKEN: env.BLOB_READ_WRITE_TOKEN,
  },
  allowedDevOrigins: [],
}

export default nextConfig
