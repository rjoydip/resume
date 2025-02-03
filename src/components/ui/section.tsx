'use client'

import { cn } from '@/lib/utils'
import React from 'react'

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Section({ className, ...props }: BadgeProps) {
  return React.useMemo(() => (
    <section
      className={cn('flex min-h-0 flex-col gap-y-3', className)}
      {...props}
    />
  ), [className, props])
}
Section.displatName = 'Section'
