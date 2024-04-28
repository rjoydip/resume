import { defineConfig } from 'cypress'
import { env, isDevelopment, isProduction } from 'std-env'

export default defineConfig({
  env: {
    isDevelopment,
    isProduction,
    ...env,
  },
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
    supportFile: 'cypress/support/component.ts',
  },
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support/commands.ts',
  },
})
