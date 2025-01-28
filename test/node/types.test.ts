import type { DarkColorType, IconType, LightColorType } from '@/types'
import { describe, expectTypeOf, it } from 'vitest'

describe('types and Interfaces', () => {
  describe('iconType', () => {
    it('should have valid values', () => {
      const validIcons: IconType[] = [
        'dot',
        'web',
        'map',
        'email',
        'mail',
        'smartphone',
        'mobile',
        'phone',
        'circle-dot',
        'badge-check',
        'twitter',
        'x',
      ]
      // eslint-disable-next-line ts/no-unused-expressions
      expectTypeOf(validIcons).toEqualTypeOf<IconType[]>
    })
  })

  describe('lightColorType', () => {
    it('should have valid values', () => {
      const validColors: LightColorType[] = [
        'light',
      ]
      // eslint-disable-next-line ts/no-unused-expressions
      expectTypeOf(validColors).toEqualTypeOf<LightColorType[]>
    })
  })

  describe('darkColorType', () => {
    it('should have valid values', () => {
      const validColors: DarkColorType[] = [
        'dark',
      ]
      expectTypeOf(validColors).toEqualTypeOf<DarkColorType[]>()
    })
  })
})
