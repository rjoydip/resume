'use client'

import type { UseSuspenseQueryResult } from '@tanstack/react-query'
import { useSuspenseQuery } from '@tanstack/react-query'
import React from 'react'
import { getIcon } from '../_shared/getIcon.tsx'
import { Card } from '../ui/card.tsx'
import { Label } from '../ui/label.tsx'
import { Section } from '../ui/section.tsx'
import { Skeleton } from '../ui/skeleton.tsx'

function DomainsList({ domains }: { domains: string[] }) {
  return (
    <ul data-testid="domains_list">
      {domains.map((domain: string) => (
        <li
          key={domain}
          className="flex flex-wrap gap-2 items-center"
        >
          {getIcon('badge-check', {
            className: 'h-4 w-4 text-green-500',
          })}
          <div className="font-semibold item-baseline">
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
