'use client'

import type { UseSuspenseQueryResult } from '@tanstack/react-query'
import { useSuspenseQuery } from '@tanstack/react-query'
import React from 'react'
import { Card } from '../ui/card.tsx'
import { Label } from '../ui/label.tsx'
import { Section } from '../ui/section.tsx'
import { Skeleton } from '../ui/skeleton.tsx'
import { getIcon } from '../_shared/getIcon.tsx'

function DomainsList({ domains }: { domains: string[] }) {
  return (
    <ul data-testid="domains_list" className="space-y-4 text-left">
      {domains.map((domain: string) => (
        <li
          key={domain}
          className="flex flex-wrap items-start items-baseline"
        >
          {getIcon('badge-check', {
            className: 'mr-1 h-4 w-4 text-green-500',
          })}
          <div className="mx-0.5 font-semibold text-gray-900 dark:text-gray-100">
            {domain}
          </div>
        </li>
      ))}
    </ul>
  )
}
DomainsList.displayName = 'DomainsList'

export default function Domains() {
  const { isPending, data }: UseSuspenseQueryResult<string[]> = useSuspenseQuery<string[]>({
    queryKey: ['domains'],
  })

  if (isPending) {
    return <Skeleton data-testid="domains_skeleton" />
  }

  return (
    <Section>
      <Label data-testid="domains_title" className="text-xl font-bold">Domains</Label>
      <Card className="border p-3">
        <DomainsList domains={data} />
      </Card>
    </Section>
  )
}
Domains.displayName = 'Domains'
