'use client'

import { cn } from '@/lib/utils'
import React from 'react'

function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return React.useMemo(() => (
    <div
      className={cn('rounded-lg bg-card text-card-foreground', className)}
      {...props}
    />
  ), [className, props])
}
Card.displayName = 'Card'

function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return React.useMemo(() => (
    <div
      className={cn('flex flex-col space-y-1.5', className)}
      {...props}
    />
  ), [className, props])
}
CardHeader.displayName = 'CardHeader'

function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return React.useMemo(() => (
    <h3
      className={cn(
        'text-2xl font-semibold leading-none tracking-tight',
        className,
      )}
      {...props}
    />
  ), [className, props])
}
CardTitle.displayName = 'CardTitle'

function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return React.useMemo(() => (
    <p
      className={cn('text-base', className)}
      {...props}
    />
  ), [className, props])
}
CardDescription.displayName = 'CardDescription'

function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return React.useMemo(() => (
    <div
      className={cn(
        'text-pretty text-base',
        className,
      )}
      {...props}
    />
  ), [className, props])
}
CardContent.displayName = 'CardContent'

function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return React.useMemo(() => (<div className={cn('flex items-center', className)} {...props} />), [className, props])
}
CardFooter.displayName = 'CardFooter'

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
}
