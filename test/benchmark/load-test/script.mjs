import { check, fail } from 'k6'
import http from 'k6/http'

const apiEndpoint = 'http://localhost:3000/api'

export const options = {
  vus: 50,
  duration: '10s',
}

export default () => {
  const responses = http.batch([
    ['GET', `${apiEndpoint}/`, null, { tags: { ctype: 'html' } }],
    ['GET', `${apiEndpoint}/health`, null, { tags: { ctype: 'json' } }],
    // ['GET', `${apiEndpoint}/feature-flag`, null, { tags: { ctype: 'json' } }], // enable when serving mock feature flags
    // ['GET', `${apiEndpoint}/data/about`, null, { tags: { ctype: 'json' } }], // enable when serving mock about data
  ])
  responses.forEach((res) => {
    const checkResponse = check(res, {
      'status is 200': () => res.status === 200,
    })
    if (!checkResponse)
      fail(`Endpoint not having status ${res.status}`)
  })
}
