'use client'

import * as React from 'react'
import { useScrollData } from 'scroll-data-hook'

import { CommandIcon } from 'lucide-react'
import { Button } from './ui/button'
import { ColorPalette } from './color-palette'
import { Label } from './ui/label'
import type { CommandMenuProps } from '@/types'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'

export function CommandMenu({ links }: CommandMenuProps) {
  const [open, setOpen] = React.useState(false)
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

  return (
    <>
      <Button
        onClick={() => setOpen(open => !open)}
        variant="outline"
        size="icon"
        className="fixed bottom-4 right-4 flex rounded-full shadow-2xl print:hidden"
      >
        <CommandIcon className="h-4 w-4" />
      </Button>
      {!scrolling && (
        <Label className="fixed bottom-0 left-0 right-0 p-1 text-center text-sm xl:block print:hidden">
          Press
          {' '}
          <kbd className="border-1 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded bg-muted px-1.5 text-[10px] font-medium opacity-100">
            <span className="text-xs font-semibold">⌘ J</span>
          </kbd>
          {' '}
          to open the command menu
        </Label>
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

          <CommandGroup heading="Links">
            {links.map(({ url, title }) => (
              <CommandItem
                key={url}
                onSelect={() => {
                  setOpen(false)
                  window.open(url, '_blank')
                }}
              >
                <span>{title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
        </CommandList>
      </CommandDialog>
    </>
  )
}
