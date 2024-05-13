import { resolve } from 'node:path'
import { beforeAll } from 'vitest'
import { setupWorker } from 'msw/browser'
import { handlers } from '../mocks/handlers'

const worker = setupWorker(...handlers)

beforeAll(() => {
  worker.start({
    onUnhandledRequest: 'bypass',
    serviceWorker: {
      url: resolve('..', 'mocks', 'mockServiceWorker.js'),
    },
  })
})
