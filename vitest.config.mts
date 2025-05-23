import type { ViteUserConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { isCI } from 'std-env'
import { defineConfig } from 'vitest/config'

export default defineConfig(({ mode }) => ({
  plugins: [react()] as ViteUserConfig['plugins'],
  test: {
    alias: {
      '@/': new URL('./src/', import.meta.url).pathname,
    },
    reporters: isCI ? ['dot', 'github-actions'] : ['dot'],
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
      reportsDirectory: `./coverage/unit/${mode}`,
      reporter: [...(isCI ? ['json', 'json-summary'] : ['text', 'html'])],
      include: mode === 'node'
        ? [
            '**/{lib,data}',
            '**/src/{schema,types}.ts',
          ]
        : mode === 'dom'
          ? [
              '**/**/{components,hooks}',
            ]
          : [],
      exclude: [
        '**/src/**/{ui,_shared}',
      ],
      reportOnFailure: true,
    },
  },
}))
