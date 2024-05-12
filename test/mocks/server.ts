import { resolve } from 'node:path'
import { readFileSync } from 'node:fs'
import { cwd } from 'node:process'
import { setupServer } from 'msw/node'
import { HttpResponse, http } from 'msw'
import { apiURL } from 'test/constant'
import parseJSON from 'fast-json-parse'

const getJSONFixturePath = (name: string) => resolve(cwd(), 'test', 'fixtures', `${name}.json`)

const fixturesData = {
  about: readFileSync(getJSONFixturePath('about'), { encoding: 'utf8' }),
  educations: readFileSync(getJSONFixturePath('educations'), { encoding: 'utf8' }),
  KeySkills: readFileSync(getJSONFixturePath('key-skills'), { encoding: 'utf8' }),
  projects: readFileSync(getJSONFixturePath('projects'), { encoding: 'utf8' }),
  skills: readFileSync(getJSONFixturePath('skills'), { encoding: 'utf8' }),
  works: readFileSync(getJSONFixturePath('works'), { encoding: 'utf8' }),
}

const handlers = [
  http.get(`${apiURL}/data/about`, () => HttpResponse.json(parseJSON(fixturesData.about), { status: 200 })),
  http.get(`${apiURL}/data/educations`, () => HttpResponse.json(parseJSON(fixturesData.educations), { status: 200 })),
  http.get(`${apiURL}/data/key-skills`, () => HttpResponse.json(parseJSON(fixturesData.KeySkills), { status: 200 })),
  http.get(`${apiURL}/data/projects`, () => HttpResponse.json(parseJSON(fixturesData.projects), { status: 200 })),
  http.get(`${apiURL}/data/skills`, () => HttpResponse.json(parseJSON(fixturesData.skills), { status: 200 })),
  http.get(`${apiURL}/data/works`, () => HttpResponse.json(parseJSON(fixturesData.works), { status: 200 })),
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

export const server = setupServer(...handlers)
