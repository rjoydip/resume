import type { SetupServerApi } from 'msw/node'
import process from 'node:process'
import { consola } from 'consola'
import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll } from 'vitest'

import { handlers } from './mocks/handlers'

import 'vitest-dom/extend-expect'

let mockServer: SetupServerApi

function mockServerEventHandler(mockServer: SetupServerApi) {
  mockServer.events.on('request:start', ({ request }) => {
    consola.log('MSW intercepted:', request.method, request.url)
  })
  mockServer.events.on('request:match', ({ request }) => {
    consola.log('MSW match:', request.method, request.url)
  })
  mockServer.events.on('request:unhandled', ({ request }) => {
    consola.log('MSW error:', request.method, request.url)
  })
}

// Start server before all tests
beforeAll(async () => {
  mockServer = setupServer(...handlers)
  mockServer.listen()
  mockServerEventHandler(mockServer)
})

// Reset handlers after each test `important for test isolation`
afterEach(() => mockServer.resetHandlers())

//  Close server after all tests
afterAll(() => {
  mockServer.close()
})

process.on('SIGINT', () => {
  mockServer.close()
  process.exit()
})
