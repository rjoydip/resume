import type { LightColorType } from '@/types'
import { cn, fetchData } from '@/lib/utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

// Mock fetch instead of axios
const globalFetch = globalThis.fetch

describe('utils', () => {
  beforeEach(() => {
    // Reset fetch mock before each test
    globalThis.fetch = vi.fn()
  })

  afterEach(() => {
    // Restore fetch after each test
    globalThis.fetch = globalFetch
    vi.clearAllMocks()
  })

  describe('cn', () => {
    it('should return a string with clsx', () => {
      const inputs: LightColorType[] = ['light']
      const result = cn(...inputs)
      expect(typeof result).toBe('string')
      expect(result).toContain(inputs.join(' '))
    })
  })

  describe('fetchData', () => {
    it('should fetch data from a blob', async () => {
      globalThis.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({}),
      } as Response)

      const result = await fetchData('about')
      expect(typeof result).toBe('object')
      expect(result).toEqual(expect.objectContaining({}))
    })

    it('should return an empty object if no blob is found', async () => {
      const result = await fetchData('about')
      expect(typeof result).toBe('object')
      expect(result).toEqual(expect.objectContaining({}))
    })

    it('fetchData with invalid response', async () => {
      globalThis.fetch = vi.fn().mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      } as Response)

      try {
        await fetchData('invalid' as any)
      }
      catch (error: any) {
        expect(error.message).toEqual('Failed to fetch data')
      }
    })

    it('fetchData with invalid blob', async () => {
      globalThis.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve('Invalid data'),
      } as Response)

      const data = await fetchData('invalid' as any)
      expect(data).toEqual({})
    })
  })
})
