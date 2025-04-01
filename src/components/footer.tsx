'use client'

import type { FooterType } from '@/types.ts'
import type { UseSuspenseQueryResult } from '@tanstack/react-query'
import { useSuspenseQuery } from '@tanstack/react-query'
import React from 'react'
import { Skeleton } from './ui/skeleton.tsx'

export default function Footer() {
  const { isPending, data }: UseSuspenseQueryResult<FooterType> = useSuspenseQuery({
    queryKey: ['footer'],
  })

  if (isPending) {
    return <Skeleton data-testid="footer_skeleton" />
  }

  return (
    <div className="flex mx-auto justify-center p-4 print:hidden">
      ©
      {data.today.getFullYear()}
      {' '}
      {data.meta.name}
      {' '}
      ❤️
    </div>
  )
}
Footer.displayName = 'Footer'
