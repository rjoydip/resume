import { faker } from '@faker-js/faker'
import { labels, statuses } from '.'

export const insightData = Array.from({ length: 100 }, () => ({
  id: `DATA-${faker.number.int({ min: 1000, max: 9999 })}`,
  title: faker.hacker.phrase().replace(/^./, letter => letter.toUpperCase()),
  status: faker.helpers.arrayElement(statuses).value,
  label: faker.helpers.arrayElement(labels).value,
}))
