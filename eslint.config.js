const { antfu } = require('@antfu/eslint-config')

module.exports = antfu({
  gitignore: true,
  ignores: [
    'public',
    '**/mocks/**',
  ],
  javascript: true,
  typescript: true,
  json: true,
  markdown: true,
  yaml: true,
  react: true,
}, {
  rules: {},
})
