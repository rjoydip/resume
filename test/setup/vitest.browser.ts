import { afterAll, afterEach, beforeAll, vi } from 'vitest'
import { worker } from '../mocks/browser'

beforeAll(() => {
  worker.start({
    onUnhandledRequest: 'bypass',
  })
})
//  Close server after all tests
afterAll(() => {
  vi.resetModules()
  worker.stop()
})

// Reset handlers after each test `important for test isolation`
afterEach(() => worker.resetHandlers())
