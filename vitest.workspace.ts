// import { env } from 'std-env'
import { type UserConfig, defineWorkspace } from 'vitest/config'

const config: UserConfig['test'] = {
  alias: {
    '@/': new URL('./src/', import.meta.url).pathname,
  },
}

// const provider = env.PROVIDER || 'playwright'

export default defineWorkspace([
  // {
  //   test: {
  //     name: 'Browser',
  //     environment: 'jsdom',
  //     browser: {
  //       enabled: true,
  //       name: env.BROWSER || (provider === 'playwright' ? 'chromium' : 'chrome'),
  //       headless: true,
  //       provider,
  //       isolate: false,
  //       slowHijackESM: true,
  //       fileParallelism: true,
  //     },
  //     include: ['test/e2e/**/*.test.tsx'],
  //     setupFiles: ['test/e2e/e2e-vitest.setup.ts'],
  //     exclude: ['node_modules'],
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
      include: ['test/edge/**/*.test.ts'],
      setupFiles: ['test/edge/edge-vitest.setup.ts'],
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
      include: ['test/jsdom/**/*.test.tsx'],
      ...config,
    },
  },
  {
    test: {
      name: 'Node',
      environment: 'node',
      include: ['test/node/**/*.test.ts'],
      ...config,
    },
  },
])
