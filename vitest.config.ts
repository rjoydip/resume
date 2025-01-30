import react from '@vitejs/plugin-react'
import { env } from 'std-env'
import { defineConfig } from 'vitest/config'

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  test: {
    alias: {
      '@/': new URL('./src/', import.meta.url).pathname,
    },
    reporters: env.GITHUB_ACTIONS ? ['dot', 'github-actions'] : ['dot'],
    environmentMatchGlobs: [
      ['test/{dom,e2e}/**', 'happy-dom'],
      ['test/node/**', 'node'],
    ],
    include: [`test/${mode}/**/*.test.{ts,tsx}`],
    setupFiles: 'test/_shared/vitest.setup.ts',
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
        '**/{.next,public,test,fixtures}',
        '**/*.{config,setup}.{mjs,js,ts,mts}',
        '**/src/{app,components}/**/*.{ts,tsx}',
      ],
      reportOnFailure: true,
    },
  },
}))
