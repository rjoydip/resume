'use client'

import useColorTheme from '@/hooks/useColorTheme'
import { Moon, Sun } from 'lucide-react'
import React, { useCallback } from 'react'

export function ToggleTheme() {
  const { theme, setColorTheme } = useColorTheme()

  const onToggle = useCallback(() => {
    setColorTheme(theme === 'dark' ? 'light' : 'dark')
  }, [theme, setColorTheme])

  const icon = theme === 'dark'
    ? <Sun className="h-4 w-4" />
    : <Moon className="h-4 w-4" />

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label="Theme Toggle"
      className="fixed top-5 right-0 py-2 px-8 rounded-full shadow-2xl cursor-pointer print:hidden"
    >
      {icon}
    </button>
  )
}
ToggleTheme.displayName = 'ToggleTheme'
