import { antfu } from '@antfu/eslint-config'

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
})
