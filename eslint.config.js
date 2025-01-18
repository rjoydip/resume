const { antfu } = require('@antfu/eslint-config')
const stylisticTs = require('@stylistic/eslint-plugin-ts')

module.exports = antfu({
  gitignore: true,
  ignores: [
    'public',
    '**/mocks/**',
  ],
  typescript: true,
  markdown: true,
  yaml: true,
  react: true,
}, {
  rules: {},
  plugins: {
    '@stylistic/ts': stylisticTs,
  },
})
