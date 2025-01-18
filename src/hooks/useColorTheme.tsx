import { useTheme } from 'next-themes'
import type { DarkColorType, LightColorType } from '@/types'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'

import { getDarkThemeColors, getLightThemeColors } from '@/data'

function useColorTheme() {
  const { toast } = useToast()
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
      toast({
        variant: 'destructive',
        title: 'Uh oh!',
        description: 'Not falling in any case.',
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
    }
    window.dispatchEvent(new Event('storageChange'))
  }

  return { theme, setColorTheme }
}

export default useColorTheme
