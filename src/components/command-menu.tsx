'use client'

import * as React from 'react'
import { useScrollData } from 'scroll-data-hook'
import { CommandIcon, Moon, Sun } from 'lucide-react'
import { Button } from './ui/button'
import { ColorPalette } from './color-palette'

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import useHasMounted from '@/hooks/hasMounted'
import useColorTheme from '@/hooks/useColorTheme'

export function CommandMenu() {
  const [open, setOpen] = React.useState(false)
  const hasMounter = useHasMounted()
  const { theme, setColorTheme } = useColorTheme()
  const { scrolling } = useScrollData({
    onScrollStart: () => {
      /* console.log('Started scrolling') */
    },
    onScrollEnd: () => {
      /* console.log('Finished scrolling') */
    },
  })

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'j' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(open => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const onToggle = () => {
    setColorTheme(theme === 'dark' ? 'light' : 'dark')
  }
  return (
    <>
      <Button
        onClick={onToggle}
        variant="outline"
        size="icon"
        className="fixed bottom-16 right-4 flex rounded-full shadow-2xl sm:bottom-20 print:hidden"
      >
        {hasMounter && theme === 'dark'
          ? (
            <Sun className="h-4 w-4" />
            )
          : (
            <Moon className="h-4 w-4" />
            )}
      </Button>
      <Button
        onClick={() => setOpen(open => !open)}
        variant="outline"
        size="icon"
        className="fixed bottom-4 right-4 flex rounded-full shadow-2xl sm:bottom-8 print:hidden"
      >
        <CommandIcon className="h-4 w-4" />
      </Button>
      {!scrolling && (
        <Button
          onClick={() => void 0}
          variant="outline"
          className="fixed bottom-2 left-1/2 -translate-x-1/2 transform rounded-lg p-1.5 text-center text-xs shadow-2xl hidden sm:block print:hidden"
        >
          Press
          {' '}
          <kbd className="border-1 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded bg-muted px-2 text-[10px] font-medium opacity-100">
            <span className="text-xs font-bold text-primary">⌘ J</span>
          </kbd>
          {' '}
          to open the command menu
        </Button>
      )}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Actions">
            <CommandItem
              onSelect={() => {
                setOpen(false)
                window.print()
              }}
            >
              <span>Print</span>
            </CommandItem>
          </CommandGroup>

          <CommandGroup heading="Colors">
            <ColorPalette />
          </CommandGroup>

          <div className="space-y-2"></div>
        </CommandList>
      </CommandDialog>
    </>
  )
}
