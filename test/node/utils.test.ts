import type { LightColorType } from '@/types'
import type { ListBlobResultBlob } from '@vercel/blob'
import { cn, fetchData, filterObject } from '@/lib/utils'
import { afterEach, beforeEach, describe, expect, expectTypeOf, it, vi } from 'vitest'

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

  describe('filterObject', () => {
    it('should remove keys from the object', () => {
      const obj: {
        [x: string]: string
      } = {
        a: 'apple',
        b: 'banana',
        c: 'cherry',
      }
      const deleteKey: string[] = ['b', 'c']
      const result = filterObject(obj, deleteKey)
      expectTypeOf(result).toMatchTypeOf<{ [key: string]: string }>()
      expect(result).toEqual(expect.objectContaining({ a: 'apple' }))
      expect(result).not.toHaveProperty('b')
      expect(result).not.toHaveProperty('c')
    })

    it('should remove key from the object', () => {
      const obj: {
        [x: string]: string
      } = {
        a: 'apple',
        b: 'banana',
        c: 'cherry',
      }
      const result = filterObject(obj, 'b')
      expectTypeOf(result).toMatchTypeOf<{ [key: string]: string }>()
      expect(result).toEqual(expect.objectContaining({ a: 'apple', c: 'cherry' }))
    })
  })

  describe('fetchData', () => {
    const blobs: ListBlobResultBlob[] = [
      {
        pathname: 'data.json',
        url: 'https://example.com/data.json',
        downloadUrl: 'https://example.com/data.json/downloadUrl',
        size: 1000,
        uploadedAt: new Date(),
      },
    ]
    const mockBlobs: ListBlobResultBlob[] = blobs

    it('should fetch data from a blob', async () => {
      globalThis.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({}),
      } as Response)

      const result = await fetchData(blobs, 'data.json')
      expect(typeof result).toBe('object')
      expect(result).toEqual(expect.objectContaining({}))
    })

    it('should return an empty object if no blob is found', async () => {
      const blobs: ListBlobResultBlob[] = []
      const result = await fetchData(blobs, 'data.json')
      expect(typeof result).toBe('object')
      expect(result).toEqual(expect.objectContaining({}))
    })

    it('should throw an error when the fetch fails', async () => {
      globalThis.fetch = vi.fn().mockRejectedValueOnce(new Error('Failed to fetch data'))

      try {
        await fetchData(mockBlobs, 'data')
        expect(globalThis.fetch).toHaveBeenCalledWith('https://example.com/data.json')
      }
      catch (error: any) {
        expect(error.message).toEqual('Failed to fetch data')
      }
    })

    it('fetchData with valid response', async () => {
      globalThis.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve('Valid data'),
      } as Response)

      const data = await fetchData(mockBlobs, 'data')
      expect(data).toEqual('Valid data')
    })

    it('fetchData with invalid response', async () => {
      globalThis.fetch = vi.fn().mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      } as Response)

      try {
        await fetchData(mockBlobs, 'invalid')
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

      const data = await fetchData(mockBlobs, 'invalid')
      expect(data).toEqual({})
    })
  })
})
