import type { LanguagesType } from '@/types'
import * as React from 'react'
import { getIcon } from '../_shared/getIcon'
import { Card } from '../ui/card'
import { Label } from '../ui/label'
import { Section } from '../ui/section'

function LanguagesList({ data }: { data: LanguagesType[] }) {
  return (
    <ul data-testid="language_list" className="space-y-4 text-left">
      {data.map((language: LanguagesType) => (
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

export function Languages({ data }: { data: LanguagesType[] }) {
  return (
    <Section>
      <Label data-testid="language_title" className="text-xl font-bold">Languages</Label>
      <Card className="border p-3">
        <LanguagesList data={data} />
      </Card>
    </Section>
  )
}
Languages.displayName = 'Languages'
