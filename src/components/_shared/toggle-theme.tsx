'use client'

import { Button } from '@/components/ui/button'
import useColorTheme from '@/hooks/useColorTheme'
import useHasMounted from '@/hooks/useHasMounted'
import { Moon, Sun } from 'lucide-react'

export function ToggleTheme() {
  const hasMounter = useHasMounted()
  const { theme, setColorTheme } = useColorTheme()

  const onToggle = () => {
    setColorTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <Button
      onClick={onToggle}
      variant="outline"
      size="icon"
      aria-label="Theme Toggle"
      className="fixed right-4 flex rounded-full shadow-2xl sm:bottom-5 print:hidden"
    >
      {hasMounter && theme === 'dark'
        ? (
            <Sun className="h-4 w-4" />
          )
        : (
            <Moon className="h-4 w-4" />
          )}
    </Button>
  )
}
