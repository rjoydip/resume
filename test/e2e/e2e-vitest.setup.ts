import { beforeAll } from 'vitest'
import { setupWorker } from 'msw/browser'
import { handlers } from '../mocks/handlers'

const worker = setupWorker(...handlers)

beforeAll(async () => {
  worker.start({
    onUnhandledRequest: 'bypass',
    serviceWorker: {
      url: `${new URL('..', import.meta.url).pathname}/mocks/mockServiceWorker.js`,
    },
  })
})
