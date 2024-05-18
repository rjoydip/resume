import { describe, expect, expectTypeOf, it } from 'vitest'
import type { ListBlobResultBlob } from '@vercel/blob'
import { cn, fetchData, filterObject } from '@/lib/utils'
import type { LightColorType } from '@/types'

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
  })

  describe('fetchData', () => {
    it('should fetch data from a blob', async () => {
      const blobs: ListBlobResultBlob[] = [
        {
          pathname: 'data.json',
          url: 'https://example.com/data.json',
          downloadUrl: 'https://example.com/data.json/downloadUrl',
          size: 1000,
          uploadedAt: new Date(),
        },
      ]
      const name = 'data.json'
      const result = await fetchData(blobs, name)
      expect(typeof result).toBe('object')
      expect(result).toEqual(expect.objectContaining({}))
    })

    it('should return an empty object if no blob is found', async () => {
      const blobs: ListBlobResultBlob[] = []
      const name = 'data.json'
      const result = await fetchData(blobs, name)
      expect(typeof result).toBe('object')
      expect(result).toEqual(expect.objectContaining({}))
    })
  })
})
