import antfu from '@antfu/eslint-config'

export default antfu(
  {
    unocss: true,
    formatters: true,
  },
  {
    ignores: ['.env*', '*.svg', 'pnpm-lock.yaml', 'netlify.toml'],
  },
)
