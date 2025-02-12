/* eslint-disable no-console */
import type { SetupServerApi } from 'msw/node'
import process from 'node:process'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll } from 'vitest'
import { about, educations, projects, skills, strengths, works } from '../fixtures/data.fixture'
import 'vitest-dom/extend-expect'

let mockServer: SetupServerApi
const apiURL = 'http://localhost/api'

export const handlers = [
  http.get(`${apiURL}/data/about`, () => HttpResponse.json(about, { status: 200 })),
  http.get(`${apiURL}/data/educations`, () => HttpResponse.json(educations, { status: 200 })),
  http.get(`${apiURL}/data/strengths`, () => HttpResponse.json(strengths, { status: 200 })),
  http.get(`${apiURL}/data/projects`, () => HttpResponse.json(projects, { status: 200 })),
  http.get(`${apiURL}/data/skills`, () => HttpResponse.json(skills, { status: 200 })),
  http.get(`${apiURL}/data/works`, () => HttpResponse.json(works, { status: 200 })),
  http.get(`${apiURL}/data/feature-flag`, () => HttpResponse.json({
    FF_SHOW_PROFILE_IMAGE: true,
  }, {
    status: 200,
  })),
  http.get(`${apiURL}/health`, () => HttpResponse.json({ status: 'up' }, {
    status: 200,
  })),
  http.get(`${apiURL}/invalid-route`, () => HttpResponse.error()),
]

function mockServerEventHandler(mockServer: SetupServerApi) {
  mockServer.events.on('request:start', ({ request }) => {
    console.info('MSW intercepted:', request.method, request.url)
  })
  mockServer.events.on('request:match', ({ request }) => {
    console.info('MSW match:', request.method, request.url)
  })
  mockServer.events.on('request:unhandled', ({ request }) => {
    console.info('MSW error:', request.method, request.url)
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
