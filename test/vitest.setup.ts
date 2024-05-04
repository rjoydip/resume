import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'
import { beforeAll, afterEach, afterAll } from 'vitest'
import parse from 'fast-json-parse'
import { cwd } from 'node:process'

const getJSONFixturePath = (name: string) => resolve(cwd(), 'test', 'fixtures', `${name}.json`)
const fixturesData = {
  about: readFileSync(getJSONFixturePath('about'), { encoding: 'utf8' }),
  educations: readFileSync(getJSONFixturePath('educations'), { encoding: 'utf8' }),
  KeySkills: readFileSync(getJSONFixturePath('key-skills'), { encoding: 'utf8' }),
  projects: readFileSync(getJSONFixturePath('projects'), { encoding: 'utf8' }),
  skills: readFileSync(getJSONFixturePath('skills'), { encoding: 'utf8' }),
  works: readFileSync(getJSONFixturePath('works'), { encoding: 'utf8' }),
}
const restHandlers = [
  http.get('/api/data/about', () => HttpResponse.json(parse(fixturesData.about), { status: 200 })),
  http.get('/api/data/educations', () => HttpResponse.json(parse(fixturesData.educations), { status: 200 })),
  http.get('/api/data/key-skills', () => HttpResponse.json(parse(fixturesData.KeySkills), { status: 200 })),
  http.get('/api/data/projects', () => HttpResponse.json(parse(fixturesData.projects), { status: 200 })),
  http.get('/api/data/skills', () => HttpResponse.json(parse(fixturesData.skills), { status: 200 })),
  http.get('/api/data/works', () => HttpResponse.json(parse(fixturesData.works), { status: 200 })),
  http.get('/api/data/feature-flag', () => HttpResponse.json({
    FF_SHOW_PROFILE_IMAGE: true
  }, { status: 200 })),
  http.get('/api/health', () => HttpResponse.json({ status: 'up' }, { status: 200 })),
  http.get('/api/invalid-route', () => HttpResponse.error())
]

const server = setupServer(...restHandlers)

server.events.on("request:start", ({ request }) => {
  console.log('MSW intercepted:', request.method, request.url)
})
server.events.on("request:match", ({ request }) => {
  console.log(request.method, request.url)
})
server.events.on("request:unhandled", ({ request }) => {
  console.log(request.method, request.url)
})

// Start server before all tests
beforeAll
  (() => server
    .listen({
      onUnhandledRequest
        : 'error'
    }))

//  Close server after all tests
afterAll
  (() => server
    .close())

// Reset handlers after each test `important for test isolation`
afterEach
  (() => server
    .resetHandlers())