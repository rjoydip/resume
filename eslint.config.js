const { antfu } = require('@antfu/eslint-config')

module.exports = antfu({
  gitignore: true,
  ignores: [
    'public',
    '**/mocks/**',
  ],
  stylistic: true,
  javascript: true,
  typescript: true,
  json: true,
  markdown: true,
  yaml: true,
  react: true,
}, {
  rules: {
    'ts/method-signature-style': ['off', 'never'],
    'no-unused-expressions': ['off', 'never'],
  },
})
