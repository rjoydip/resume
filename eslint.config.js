import antfu from '@antfu/eslint-config'

export default antfu({
    stylistic: true,
    typescript: true,
    jsonc: true,
    markdown: true,
}, {
    "extends": "next/core-web-vitals"
})