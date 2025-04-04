'use client'

import type { VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'
import React from 'react'

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2 py-0.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-nowrap',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary/80 text-primary-foreground hover:bg-primary/60',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/60',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
      },
    },

    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return React.useMemo(() => (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  ), [className, props, variant])
}
Badge.displayName = 'Badge'
