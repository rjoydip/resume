import antfu from '@antfu/eslint-config'
import stylisticTs from '@stylistic/eslint-plugin-ts'

export default antfu({
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
