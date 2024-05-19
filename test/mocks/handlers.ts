import { HttpResponse, http } from 'msw'
import { apiURL } from '../constant'
import { about, educations, keySkills, projects, skills, works } from './fixtures'

export const handlers = [
  http.get(`${apiURL}/data/about`, () => HttpResponse.json(about, { status: 200 })),
  http.get(`${apiURL}/data/educations`, () => HttpResponse.json(educations, { status: 200 })),
  http.get(`${apiURL}/data/key-skills`, () => HttpResponse.json(keySkills, { status: 200 })),
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
