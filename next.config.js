/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  cleanDistDir: true,
  compress: true,
  trailingSlash: true,
  experimental: {
    webVitalsAttribution: ['CLS', 'LCP']
  }
}

module.exports = nextConfig
