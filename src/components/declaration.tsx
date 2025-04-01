'use client'

import type { DeclarationType } from '@/types.ts'
import type { UseSuspenseQueryResult } from '@tanstack/react-query'
import { Skeleton } from '@/components/ui/skeleton.tsx'
import { useSuspenseQuery } from '@tanstack/react-query'
import React from 'react'
import { Card } from '../components/ui/card'
import { Label } from '../components/ui/label'
import { Section } from '../components/ui/section'

export default function Declaration() {
  const { isPending, data }: UseSuspenseQueryResult<DeclarationType, unknown> = useSuspenseQuery<DeclarationType, unknown>({
    queryKey: ['declaration'],
  })

  if (isPending) {
    return <Skeleton data-testid="declaration_skeleton" />
  }

  return (
    <Section className="hidden print:block">
      <Label data-testid="declaration_title" className="text-xl font-bold">Declaration</Label>
      <Card className="border p-3">
        <p className="text-pretty mb-8" data-testid="declaration_text">I hereby declare that the above-mentioned information is correct up to my knowledge and I bear the responsibility for the correctness of the above-mentioned particulars.</p>
        <div className="flex justify-between mb-8">
          <div className="space-y-2 text-pretty">
            <p data-testid="declaration_location">
              Location:
              {' '}
              {data.location}
              ,
              {data.country}
            </p>
            <p data-testid="declaration_name">
              Name:
              {' '}
              {data.name}
            </p>
          </div>
          <div className="space-y-2 text-right">
            <p></p>
            <p data-testid="declaration_date">
              Date:
              {' '}
              {`${data.today.getDate()}-${data.today.getMonth() + 1}-${data.today.getFullYear()}`}
            </p>
          </div>
        </div>
      </Card>
    </Section>
  )
}
Declaration.displayName = 'Declaration'
