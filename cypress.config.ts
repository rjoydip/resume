import { defineConfig } from 'cypress'
import { env, isDevelopment, isProduction } from 'std-env'

export default defineConfig({
  env: {
    isDevelopment,
    isProduction,
    ...env,
  },
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'reports/cypress',
    overwrite: false,
    html: false,
    json: true,
  },
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support/commands.ts',
  },
})
