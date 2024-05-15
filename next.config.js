const { env } = require('std-env')

/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: env.NODE_ENV === 'development',
})

module.exports = withPWA({
  reactStrictMode: true,
})
