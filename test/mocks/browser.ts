import { setupWorker } from 'msw/browser'
import { HttpResponse, http } from 'msw'

import about from '../fixtures/about.json' assert { type: 'json' }
import educations from '../fixtures/educations.json' assert { type: 'json' }
import KeySkills from '../fixtures/key-skills.json' assert { type: 'json' }
import projects from '../fixtures/projects.json' assert { type: 'json' }
import skills from '../fixtures/skills.json' assert { type: 'json' }
import works from '../fixtures/works.json' assert { type: 'json' }
import { apiURL } from '../constant'

const handlers = [
  http.get(`${apiURL}/data/about`, () => HttpResponse.json(about, { status: 200 })),
  http.get(`${apiURL}/data/educations`, () => HttpResponse.json(educations, { status: 200 })),
  http.get(`${apiURL}/data/key-skills`, () => HttpResponse.json(KeySkills, { status: 200 })),
  http.get(`${apiURL}/data/projects`, () => HttpResponse.json(projects, { status: 200 })),
  http.get(`${apiURL}/data/skills`, () => HttpResponse.json(skills, { status: 200 })),
  http.get(`${apiURL}/data/works`, () => HttpResponse.json(works, { status: 200 })),
  http.get(`${apiURL}/data/feature-flag`, () => HttpResponse.json({
    FF_SHOW_PROFILE_IMAGE: true,
  }, { status: 200 })),
  http.get(`${apiURL}/health`, () => HttpResponse.json({ status: 'up' }, { status: 200 })),
  http.get(`${apiURL}/invalid-route`, () => HttpResponse.error()),
]

export const worker = setupWorker(...handlers)
