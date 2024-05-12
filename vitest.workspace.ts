import { env } from 'std-env'
import { type UserConfig, defineWorkspace } from 'vitest/config'

const config: UserConfig['test'] = {
  reporters: env.GITHUB_ACTIONS ? ['dot', 'github-actions'] : ['dot'],
  coverage: {
    enabled: true,
    provider: 'istanbul',
    reporter: ['text', 'lcov'],
    exclude: [
      '**/.next',
      '**/*.config.js',
      '**/src/icons/*.tsx',
      '**/src/components/color/*.tsx',
      '**/src/components/ui/*.tsx',
    ],
    thresholds: {
      statements: 90,
      branches: 85,
      functions: 95,
      lines: 90,
    },
    reportOnFailure: true,
  },
  alias: {
    '@/': new URL('./src/', import.meta.url).pathname,
  },
}

export default defineWorkspace([
  {
    test: {
      name: 'Browser',
      browser: {
        enabled: true,
        name: 'chrome',
        headless: true,
      },
      include: ['./test/**/*.e2e.test.tsx'],
      setupFiles: ['./test/setup/vitest.browser.ts'],
      ...config,
    },
  },
  {
    test: {
      name: 'Edge',
      environment: 'edge-runtime',
      poolOptions: {
        forks: {
          singleFork: true,
        },
      },
      include: ['./test/**/*.spec.ts'],
      setupFiles: ['./test/setup/vitest.edge.ts'],
      ...config,
    },
  },
  {
    test: {
      name: 'JSDom',
      environment: 'jsdom',
      poolOptions: {
        forks: {
          singleFork: true,
        },
      },
      include: ['./test/**/*.test.tsx'],
      ...config,
    },
  },
  {
    test: {
      name: 'Node',
      environment: 'node',
      include: ['./test/**/*.node.ts'],
      ...config,
    },
  },
])
