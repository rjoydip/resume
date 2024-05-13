import { loadJsonFileSync } from 'load-json-file'
import { HttpResponse, http } from 'msw'
import { apiURL } from '../constant'

export const handlers = [
  http.get(`${apiURL}/data/about`, () => HttpResponse.json(loadJsonFileSync('test/fixtures/about.json'), { status: 200 })),
  http.get(`${apiURL}/data/educations`, () => HttpResponse.json(loadJsonFileSync('test/fixtures/educations.json'), { status: 200 })),
  http.get(`${apiURL}/data/key-skills`, () => HttpResponse.json(loadJsonFileSync('test/fixtures/key-skills.json'), { status: 200 })),
  http.get(`${apiURL}/data/projects`, () => HttpResponse.json(loadJsonFileSync('test/fixtures/projects.json'), { status: 200 })),
  http.get(`${apiURL}/data/skills`, () => HttpResponse.json(loadJsonFileSync('test/fixtures/skills.json'), { status: 200 })),
  http.get(`${apiURL}/data/works`, () => HttpResponse.json(loadJsonFileSync('test/fixtures/works.json'), { status: 200 })),
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
