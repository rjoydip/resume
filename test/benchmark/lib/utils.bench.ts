import { expect, it } from 'vitest'
import { filterObject } from '@/lib/utils'

it('filterObject function', () => {
  const inputObj = { a: 1, b: 2, c: 3, d: 4 }
  const deleteKey = ['b', 'c']
  const expectedResult = { a: 1, d: 4 }

  expect(filterObject(inputObj, deleteKey)).toEqual(expectedResult)
})

it('filterObject benchmark', () => {
  const inputObj = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9, j: 10 }
  const deleteKey = ['b', 'c']

  const result = filterObject(inputObj, deleteKey)
  // Do not modify the following line
  expect(result).toEqual({ a: 1, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9, j: 10 })
})
