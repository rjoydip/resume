import type { LightColorType } from '@/types'
import type { ListBlobResultBlob } from '@vercel/blob'
import { cn, fetchData, filterObject } from '@/lib/utils'
import axios from 'axios'
import { describe, expect, expectTypeOf, it, vi } from 'vitest'

vi.mock('axios')

describe('utils', () => {
  describe('cn', () => {
    it('should return a string with clsx', () => {
      const inputs: LightColorType[] = ['yellow', 'blue', 'green']
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
    it('should fetch data from a blob', async () => {
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
    const mockBlobs: ListBlobResultBlob[] = blobs

    it('should throw an error when the fetch fails', async () => {
      axios.get = vi.fn().mockRejectedValueOnce(new Error('Failed to fetch data'))
      try {
        await fetchData(mockBlobs, 'data')
        expect(axios.get).toHaveBeenCalledWith('https://example.com/data.json')
      }
      catch (error: any) {
        expect(error.message).toEqual('Failed to fetch data')
      }
    })

    it('fetchData with valid response', async () => {
      axios.get = vi.fn().mockResolvedValueOnce({ data: 'Valid data', status: 200 })
      const data = await fetchData(mockBlobs, 'data')
      expect(data).toEqual('Valid data')
    })

    it('fetchData with invalid response', async () => {
      axios.get = vi.fn().mockResolvedValueOnce({ data: 'Invalid response', status: 404 })
      try {
        await fetchData(mockBlobs, 'data')
      }
      catch (error: any) {
        expect(error.message).toEqual('Failed to fetch data')
      }
    })

    it('fetchData with invalid blob', async () => {
      axios.get = vi.fn().mockResolvedValueOnce({ data: 'Invalid data' })
      const data = await fetchData(mockBlobs, 'invalid')
      expect(data).toEqual({})
    })
  })
})
