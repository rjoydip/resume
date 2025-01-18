import { filterObject } from '@/lib/utils'
import { describe, expect, it } from 'vitest'

describe('filterObject', () => {
  it('filter string value', () => {
    const inputObj = { a: 1, b: 2, c: 3, d: 4 }
    const deleteKey = 'c'
    const expectedResult = { a: 1, b: 2, d: 4 }

    expect(filterObject(inputObj, deleteKey)).toEqual(expectedResult)
  })

  it('filter array element', () => {
    const inputObj = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9, j: 10 }
    const deleteKey = ['b', 'c']

    const result = filterObject(inputObj, deleteKey)
    expect(result).toEqual({ a: 1, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9, j: 10 })
  })
})
