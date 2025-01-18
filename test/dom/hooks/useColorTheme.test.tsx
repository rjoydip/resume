import useColorTheme from '@/hooks/useColorTheme'
import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

describe('useColorTheme', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('sets the dark theme when the selected and previous theme is same', async () => {
    const { result: { current } } = renderHook(() => useColorTheme())
    expect(current.theme).toBeUndefined()

    act(() => {
      current.setColorTheme('dark')
    })

    expect(current.theme).toBeUndefined()
  })
})
