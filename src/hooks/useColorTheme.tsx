import type { DarkColorType, LightColorType } from '@/types'
import { getDarkThemeColors, getLightThemeColors } from '@/data'

import { useTheme } from 'next-themes'

function useColorTheme() {
  const { theme, setTheme } = useTheme()

  const setColorTheme = (color: LightColorType | DarkColorType | 'system') => {
    if (['light', 'dark', 'system'].includes(color)) {
      setTheme(color)
    }
    else if (
      getLightThemeColors().includes(color as LightColorType)
      && (theme === 'light' || theme === 'system')
    ) {
      setTheme(color)
    }
    else if (
      getDarkThemeColors().includes(color as DarkColorType)
      && theme?.includes('dark')
    ) {
      setTheme(`${color}-dark`)
    }
    else if (
      getLightThemeColors().includes(color as LightColorType)
      && theme?.includes('dark')
    ) {
      setTheme(`${color}-dark`)
    }
    else {
      setTheme(color)
    }
    window.dispatchEvent(new Event('storageChange'))
  }

  return { theme, setColorTheme }
}

export default useColorTheme
