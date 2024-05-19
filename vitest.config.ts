import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { env } from 'std-env'

export default defineConfig(({ mode }) => ({
  plugins: [react(), tsconfigPaths()],
  test: {
    reporters: env.GITHUB_ACTIONS ? ['dot', 'github-actions'] : ['dot'],
    environmentMatchGlobs: [
      ['test/{dom,e2e}/**', 'happy-dom'],
      ['test/edge/**', 'edge-runtime'],
      ['test/node/**', 'node'],
    ],
    include: mode === 'unit' ? ['test/{node,dom,edge}/**/*.test.{ts,tsx}'] : mode === 'e2e' ? ['test/e2e/**/*.test.tsx'] : [],
    setupFiles: 'test/vitest.setup.ts',
    poolOptions: {
      forks: {
        singleFork: false,
      },
    },
    coverage: {
      enabled: true,
      provider: 'istanbul',
      reporter: ['text', 'html', 'json-summary'],
      exclude: [
        '**/{.next,public,test}',
        '**/*.{config,setup,bench}.{js,ts}',
        'test/mocks/mockServiceWorker.js',
        '**/src/{app,components,icons}/**/*.{ts,tsx}',
      ],
      reportOnFailure: true,
    },
  },
}))
