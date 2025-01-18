import { antfu } from '@antfu/eslint-config'
import stylisticTs from '@stylistic/eslint-plugin-ts'

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
