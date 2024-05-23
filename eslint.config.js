const { antfu } = require('@antfu/eslint-config')

module.exports = antfu({
  ignores: [
    '.vercel',
    '.million',
    '.next',
    '.turbo',
    'coverage',
    'public',
    'node_modules',
    'reports',
    '**/*.js',
    '**/*.setup.ts',
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
