const { antfu } = require('@antfu/eslint-config')

module.exports = antfu({
  ignores: [
    '.vercel',
    '.next',
    '.turbo',
    'reports',
    '**/fixtures/**',
    'node_modules',
    '**/*mockServiceWorker.js',
  ],
  stylistic: true,
  typescript: true,
  json: true,
  markdown: true,
  yaml: true,
}, {
  rules: {
    'ts/method-signature-style': ['off', 'never'],
    'no-unused-expressions': ['off', 'never'],
  },
})
