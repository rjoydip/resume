import { defineConfig, devices } from '@playwright/test'
import { env, isCI } from 'std-env'

const PORT = env.PORT || 4000
const baseURL = `http://localhost:${PORT}`

const commonProjects = [
  {
    name: 'chrome',
    use: {
      ...devices['Desktop Chrome'],
    },
  },
  /* {
    name: 'iphone',
    use: {
      ...devices['iPhone 15 Pro Max'],
    },
  }, */
]

export default defineConfig({
  testDir: 'test/e2e',
  fullyParallel: true,
  forbidOnly: !!isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 2 : 1,
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
  projects: !isCI
    ? commonProjects
    : [
        ...commonProjects,
        {
          name: 'firefox',
          use: {
            ...devices['Desktop Firefox'],
          },
        },
        {
          name: 'webkit',
          use: {
            ...devices['Desktop Safari'],
          },
        },
        {
          name: 'pixel7',
          use: {
            ...devices['Pixel 7'],
          },
        },
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
