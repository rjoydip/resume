import type { StrengthsType } from '@/types'
import * as React from 'react'
import { getIcon } from '../_shared/getIcon'
import { Card } from '../ui/card'
import { Label } from '../ui/label'
import { Section } from '../ui/section'

interface StrengthsProps {
  data: StrengthsType
}

function StrengthsList({ skills }: { skills: string[] }) {
  return (
    <ul data-testid="strengths_list" className="space-y-4 text-left">
      {skills.map(skill => (
        <li
          key={skill}
          className="flex flex-wrap items-start items-baseline"
        >
          {getIcon('badge-check', {
            className: 'mr-1 h-4 w-4 text-green-500',
          })}
          <div className="mx-0.5 text-lg font-semibold text-gray-900 dark:text-gray-100">
            {skill}
          </div>
        </li>
      ))}
    </ul>
  )
}
StrengthsList.displayName = 'StrengthsList'

export function Strengths({ data }: StrengthsProps) {
  if (!data?.length)
    return null
  return (
    <Section>
      <Label data-testid="strengths_title" className="text-xl font-bold">Strengths</Label>
      <Card className="border p-3">
        <StrengthsList skills={data} />
      </Card>
    </Section>
  )
}
Strengths.displayName = 'Strengths'
