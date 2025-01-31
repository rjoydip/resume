'use client'

import type { LanguagesType } from '@/types'
import type { UseSuspenseQueryResult } from '@tanstack/react-query'
import { useSuspenseQuery } from '@tanstack/react-query'
import * as React from 'react'
import { getIcon } from '../components/_shared/getIcon'
import { Card } from '../components/ui/card'
import { Label } from '../components/ui/label'
import { Section } from '../components/ui/section'
import { Skeleton } from '../components/ui/skeleton.tsx'

function LanguagesList({ languages }: { languages: LanguagesType[] }) {
  return (
    <ul data-testid="language_list" className="space-y-4 text-left">
      {languages.map((language: LanguagesType) => (
        <li
          key={language.name}
          className="flex flex-wrap items-start items-baseline"
        >
          {getIcon('badge-check', {
            className: 'mr-1 h-4 w-4 text-green-500',
          })}
          <div className="mx-0.5 text-lg font-semibold text-gray-900 dark:text-gray-100">
            {language.name}
            {language.isNative && <span className="px-2 text-xs text-gray-500">(Native)</span>}
          </div>
        </li>
      ))}
    </ul>
  )
}
LanguagesList.displayName = 'LanguagesList'

export function Languages() {
  const { isPending, data }: UseSuspenseQueryResult<LanguagesType[], unknown> = useSuspenseQuery<LanguagesType[], unknown>({
    queryKey: [],
    queryFn: async () => {
      const { languages } = await import('../data.ts')
      return languages
    },
  })

  if (isPending) {
    return <Skeleton />
  }

  return (
    <Section>
      <Label data-testid="language_title" className="text-xl font-bold">Languages</Label>
      <Card className="border p-3">
        <LanguagesList languages={data} />
      </Card>
    </Section>
  )
}
Languages.displayName = 'Languages'
