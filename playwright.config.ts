import { defineConfig, devices } from '@playwright/test'
import { env } from 'std-env'

const PORT = env.PORT || 4000
const baseURL = `http://localhost:${PORT}`

export default defineConfig({
  testDir: 'test/e2e',
  fullyParallel: true,
  forbidOnly: !!env.CI,
  retries: env.CI ? 2 : 0,
  workers: env.CI ? 1 : undefined,
  reporter: [
    ['list'],
    env.CI ? ['github'] : ['html', { outputFolder: 'coverage/e2e' }],
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
    },
    {
      name: 'Pixel Mobile',
      use: devices['Pixel 7'],
    }, */
  ],
  webServer: {
    command: `bun run start --port=${PORT}`,
    url: baseURL,
    timeout: 60 * 1000,
    reuseExistingServer: !env.CI,
    stderr: 'pipe',
    stdout: 'pipe',
  },
})
