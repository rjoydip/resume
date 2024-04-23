const { antfu } = require('@antfu/eslint-config')

module.exports = antfu({
  stylistic: true,
  typescript: true,
  json: true,
  markdown: true,
  yaml: true,
})
