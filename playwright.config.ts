import { join } from 'node:path'
import { cwd } from 'node:process'
import { defineConfig, devices } from '@playwright/test'
import { env, process } from 'std-env'

const isCI = env.CI
const PORT = env.PORT || 4000
const baseURL = `http://localhost:${PORT}`

if (isCI) {
  process.env.PLAYWRIGHT_JSON_OUTPUT_DIR = join(cwd(), 'coverage', 'e2e')
  process.env.PLAYWRIGHT_JSON_OUTPUT_NAME = 'coverage-final.json'
}

export default defineConfig({
  testDir: 'test/e2e',
  fullyParallel: true,
  forbidOnly: !!isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  reporter: [
    ['list'],
    isCI ? ['json'] : ['html', { outputFolder: 'coverage/e2e' }],
  ],
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    testIdAttribute: 'data-testid',
  },
  projects: [
    {
      name: 'Chrome Desktop',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Firefox Desktop',
      use: devices['Desktop Firefox'],
    },
    {
      name: 'Pixel Mobile',
      use: devices['Pixel 7'],
    },
    /* {
      name: 'Safari Desktop',
      use: devices['Desktop Safari'],
    },
    {
      name: 'iPad Tablet',
      use: devices['iPhone 15 Pro Max landscape'],
    },
    {
      name: 'iPhone Mobile',
      use: { ...devices['iPhone 12'] },
    }, */
  ],
  webServer: {
    command: `bun run start --port=${PORT}`,
    url: baseURL,
    timeout: 60 * 1000,
    reuseExistingServer: !isCI,
    stderr: 'pipe',
    stdout: 'pipe',
  },
})
