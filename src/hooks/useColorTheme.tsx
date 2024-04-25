import { useTheme } from 'next-themes'
import { getDarkThemeColors, getLightThemeColors } from '@/data'
import type { DarkColorType, LightColorType } from '@/types'

import { useToast } from '@/components/ui/use-toast'
import { ToastAction } from '@/components/ui/toast'

function useColorTheme() {
  const { toast } = useToast()
  const { theme, setTheme } = useTheme()
  const previousTheme = theme

  const setColorTheme = (
    currentTheme: LightColorType | DarkColorType | 'system',
  ) => {
    if (currentTheme !== previousTheme) {
      if (['light', 'dark', 'system'].includes(currentTheme)) {
        setTheme(currentTheme)
      }
      else if (
        getLightThemeColors().includes(currentTheme as LightColorType)
        || previousTheme === 'light'
        || previousTheme === 'system'
      ) {
        setTheme(currentTheme)
      }
      else if (
        getDarkThemeColors().includes(currentTheme as DarkColorType)
        || previousTheme?.includes('dark')
      ) {
        setTheme(`${currentTheme}-dark`)
      }
      else {
        toast({
          variant: 'destructive',
          title: 'Uh oh!',
          description: 'Not falling in any case.',
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
      }
    }
    else {
      toast({
        variant: 'destructive',
        title: 'Uh oh!',
        description: 'Previous and selected color are same.',
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
    }
    window.dispatchEvent(new Event('storageChange'))
  }

  return { theme, setColorTheme }
}

export default useColorTheme
