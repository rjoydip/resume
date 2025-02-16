import antfu from '@antfu/eslint-config'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import { a11yRules } from './config/eslint/rules/a11y.mjs'
import { ignorePatterns } from './config/eslint/rules/ignore.mjs'

export default antfu({
  ignores: ignorePatterns,
  gitignore: true,
  typescript: true,
  markdown: true,
  yaml: true,
  react: true,
  jsx: true,
  javascript: true,
  test: true,
  stylistic: true,
  unicorn: true,
  formatters: true,
  regexp: true,
  plugins: {
    'jsx-a11y': jsxA11y,
  },
  rules: {
    ...a11yRules,
  },
})
