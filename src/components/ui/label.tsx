'use client'

import { cn } from '@/lib/utils'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cva, type VariantProps } from 'class-variance-authority'
import React from 'react'

const labelVariants = cva(
  'text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
)

export function Label({ className, ...props }: React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
  VariantProps<typeof labelVariants>) {
  return React.useMemo(() => (
    <LabelPrimitive.Root
      className={cn(labelVariants(), className)}
      {...props}
    />
  ), [className, props])
}
Label.displayName = LabelPrimitive.Root.displayName
