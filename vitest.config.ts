import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { env } from 'std-env'

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  test: {
    alias: {
      '@/': new URL('./src/', import.meta.url).pathname,
    },
    reporters: env.GITHUB_ACTIONS ? ['dot', 'github-actions'] : ['dot'],
    environmentMatchGlobs: [
      ['test/{dom,e2e}/**', 'happy-dom'],
      ['test/edge/**', 'edge-runtime'],
      ['test/{node,benchmark}/**', 'node'],
    ],
    include: mode === 'unit' ? ['test/{node,dom,edge}/**/*.test.{ts,tsx}'] : mode === 'e2e' ? ['test/e2e/**/*.test.tsx'] : [],
    setupFiles: 'test/vitest.setup.ts',
    poolOptions: {
      forks: {
        singleFork: false,
      },
    },
    coverage: {
      enabled: mode === 'unit',
      provider: 'istanbul',
      reporter: ['text', 'html', 'json', 'json-summary'],
      exclude: [
        '**/{.next,public,test}',
        '**/*.{config,setup}.{mjs,js,ts,mts}',
        'test/mocks/*.js',
        '**/src/{app,components,icons}/**/*.{ts,tsx}',
      ],
      reportOnFailure: true,
    },
  },
}))
