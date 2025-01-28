import type { DarkColorType, LightColorType } from '@/types'

import { useTheme } from 'next-themes'

function useColorTheme() {
  const { theme, setTheme } = useTheme()

  const setColorTheme = (color: LightColorType | DarkColorType | 'system') => {
    setTheme(color)
    window.dispatchEvent(new Event('storageChange'))
  }

  return { theme, setColorTheme }
}

export default useColorTheme
