'use client'

import { cn } from '@/lib/utils'

import * as AvatarPrimitive from '@radix-ui/react-avatar'
import * as React from 'react'

function Avatar({ className, ...props }: React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      className={cn(
        'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-xl',
        className,
      )}
      {...props}
    />
  )
}
Avatar.displayName = AvatarPrimitive.Root.displayName

function AvatarImage({ className, ...props }: React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      className={cn('aspect-square h-full w-full', className)}
      {...props}
    />
  )
}
AvatarImage.displayName = AvatarPrimitive.Image.displayName

function AvatarFallback({ className, ...props }: React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      className={cn(
        'flex h-full w-full items-center justify-center rounded-xl bg-muted',
        className,
      )}
      {...props}
    />
  )
}
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarFallback, AvatarImage }
