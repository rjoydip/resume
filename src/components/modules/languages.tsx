'use client'

import type { LanguagesType } from '@/types'
import type { UseSuspenseQueryResult } from '@tanstack/react-query'
import { useSuspenseQuery } from '@tanstack/react-query'
import React from 'react'
import { getIcon } from '../_shared/getIcon.tsx'
import { Card } from '../ui/card.tsx'
import { Label } from '../ui/label.tsx'
import { Section } from '../ui/section.tsx'
import { Skeleton } from '../ui/skeleton.tsx'

function LanguagesList({ languages }: { languages: LanguagesType[] }) {
  return (
    <ul data-testid="language_list">
      {languages.map((language: LanguagesType) => (
        <li
          key={`${language.name}-${language.isNative ?? false}`}
          className="flex flex-wrap gap-2 items-center"
        >
          {getIcon('badge-check', {
            className: 'h-4 w-4 text-green-500',
          })}
          <div className="font-semibold">
            {language.name}
            {language.isNative && <span className="px-2 text-xs text-gray-500">(Native)</span>}
          </div>
        </li>
      ))}
    </ul>
  )
}
LanguagesList.displayName = 'LanguagesList'

export default function Languages() {
  const { isPending, data }: UseSuspenseQueryResult<LanguagesType[]> = useSuspenseQuery<LanguagesType[]>({
    queryKey: ['languages'],
  })

  if (isPending) {
    return <Skeleton data-testid="languages_skeleton" />
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
