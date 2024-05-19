import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { env } from 'std-env'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    reporters: env.GITHUB_ACTIONS ? ['dot', 'github-actions'] : ['dot'],
    environmentMatchGlobs: [
      ['test/dom/**', 'happy-dom'],
      ['test/edge/**', 'edge-runtime'],
      ['test/node/**', 'node'],
    ],
    include: ['test/**/*.test.{ts,tsx}'],
    setupFiles: 'test/vitest.setup.ts',
    poolOptions: {
      forks: {
        singleFork: false,
      },
    },
    coverage: {
      enabled: true,
      provider: 'istanbul',
      reporter: ['text', 'html'],
      exclude: [
        '**/{.next,public}',
        '**/*.{config,setup,bench}.{js,ts}',
        'test/mocks/mockServiceWorker.js',
        '**/src/{app,components,icons}/**/*.{ts,tsx}',
      ],
      reportOnFailure: true,
    },
  },
})
