import { consola } from 'consola'
import { afterAll, afterEach, beforeAll } from 'vitest'
import { setupServer } from 'msw/node'
import { handlers } from './mocks/handlers'

import 'vitest-dom/extend-expect'

const server = setupServer(...handlers)

server.events.on('request:start', ({ request }) => {
  consola.log('MSW intercepted:', request.method, request.url)
})
server.events.on('request:match', ({ request }) => {
  consola.log('MSW match:', request.method, request.url)
})
server.events.on('request:unhandled', ({ request }) => {
  consola.log('MSW error:', request.method, request.url)
})

// Start server before all tests
beforeAll(() => server.listen())

//  Close server after all tests
afterAll(() => server.close())

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers())
