import { consola } from 'consola'
import { afterAll, afterEach, beforeAll } from 'vitest'

import { server } from '../mocks/server'

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
beforeAll(() => server.listen({
  onUnhandledRequest: 'bypass',
}))

//  Close server after all tests
afterAll(() => server.close())

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers())
