import { test as base } from '@playwright/test'
import { globalSetup, globalTeardown } from '../setup/e2e.setup'

export const test = base.extend({
  // Custom fixture to handle setup and teardown
  // eslint-disable-next-line no-empty-pattern
  page: async ({}, use) => {
    const { page } = await globalSetup()
    // eslint-disable-next-line react-hooks/rules-of-hooks
    await use(page)
    await globalTeardown()
  },
})
