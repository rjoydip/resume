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
    projects: [
      {
        pattern: 'test/{dom,e2e}/**/*.test.ts',
        config: { environment: 'happy-dom' },
      },
      {
        pattern: 'test/node/**/*.test.ts',
        config: { environment: 'node' },
      },
    ],
    include: [`test/${mode}/**/*.test.{ts,tsx}`],
    setupFiles: 'test/setup/vitest.setup.ts',
    poolOptions: {
      forks: {
        singleFork: false,
      },
    },
    coverage: {
      enabled: mode === 'dom' || mode === 'node',
      provider: 'istanbul',
      reportsDirectory: `./coverage/${mode}`,
      reporter: ['text', 'html', 'json', 'json-summary'],
      exclude: [
        ...new Set([
          '**/{.next,public,test*,fixtures,mocks,coverage,e2e}',
          '**/*.{config,setup}.{mjs,js,ts,mts,cts}',
          '**/src/{app,lib}/*.{ts,tsx}',
          mode === 'dom' ? '**/*.ts' : mode === 'node' ? '**/*.tsx' : '',
        ]),
      ],
      reportOnFailure: true,
    },
  },
}))
