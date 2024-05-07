/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [{
      source: '/coverage',
      destination: '/coverage/lcov-report/index.html',
    }]
  }
}

module.exports = nextConfig
