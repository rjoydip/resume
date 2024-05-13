import { type UserConfig, defineWorkspace } from 'vitest/config'

const config: UserConfig['test'] = {
  alias: {
    '@/': new URL('./src/', import.meta.url).pathname,
  },
}

// const provider = env.PROVIDER || 'webdriverio'
// const browser = env.BROWSER || (provider === 'playwright' ? 'chromium' : 'chrome')

export default defineWorkspace([
  // {
  //   test: {
  //     name: 'Browser',
  //     browser: {
  //       enabled: true,
  //       name: browser,
  //       headless: true,
  //       provider,
  //       isolate: false,
  //       slowHijackESM: true,
  //       fileParallelism: true
  //     },
  //     include: ['test/e2e/**/*.test.tsx'],
  //     setupFiles: ['test/e2e/vitest.setup.ts'],
  //     ...config,
  //   }
  // },
  {
    test: {
      name: 'Edge',
      environment: 'edge-runtime',
      poolOptions: {
        forks: {
          singleFork: true,
        },
      },
      include: ['test/specs/**/*.test.ts'],
      setupFiles: ['test/specs/vitest.setup.ts'],
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
      include: ['test/**/*.test.tsx'],
      ...config,
    },
  },
  {
    test: {
      name: 'Node',
      environment: 'node',
      include: ['test/**/*.node.ts'],
      ...config,
    },
  },
])
