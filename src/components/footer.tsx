'use client'

import type { FooterType } from '@/types.ts'
import type { UseSuspenseQueryResult } from '@tanstack/react-query'
import { useSuspenseQuery } from '@tanstack/react-query'
import React from 'react'
import { Skeleton } from './ui/skeleton.tsx'

export default function Footer() {
  const { isPending, data }: UseSuspenseQueryResult<FooterType> = useSuspenseQuery({
    queryKey: ['dataFetch'],
    queryFn: async () => {
      const { metadata: { name }, today } = await import('@/data.ts')
      const year = today.getFullYear()
      return { name, year }
    },
  })

  if (isPending) {
    return <Skeleton data-testid="footer_skeleton" />
  }

  return (
    <div className="flex mx-auto justify-center p-4 print:hidden">
      ©
      {data.year}
      {' '}
      {data.name}
      {' '}
      ❤️
    </div>
  )
}
Footer.displayName = 'Footer'
