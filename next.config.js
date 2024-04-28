/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, context) => {
    config.resolve = {
      ...config.resolve,
      fallback: {
        fs: false,
        path: false,
      },
    }
    config.plugins.push(
      new context.webpack.NormalModuleReplacementPlugin(/^node:/, (resource) => {
        resource.request = resource.request.replace(/^node:/, '')
      }),
    )
    return config
  },
}

module.exports = nextConfig
