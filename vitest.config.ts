import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { env } from 'std-env'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'jsdom',
    poolOptions: {
      forks: {
        singleFork: true,
      },
    },
    setupFiles: ['./test/vitest.setup.ts'],
    reporters: env.GITHUB_ACTIONS ? ['dot', 'github-actions'] : ['dot'],
    coverage: {
      reporter: ['text', 'json-summary', 'json', 'lcov'],
      exclude: [
        '**/.next',
        '**/*.config.js',
        '**/src/icons/*.tsx',
        '**/src/components/ui/*.tsx'
      ],
      reportOnFailure: true,
    },
  },
})
