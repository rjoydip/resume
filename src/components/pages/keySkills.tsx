'use client'

import type { KeySkillsType } from '@/types'
import { Label } from '@radix-ui/react-label'
import * as React from 'react'
import { uid } from 'uid'
import { getIcon } from '../../icons/getIcon'
import { Card } from '../ui/card'
import { Section } from '../ui/section'

export function KeySkills({ data }: { data: KeySkillsType }) {
  return (
    <Section>
      <Label data-testid="key_skills_title" className="text-xl font-bold">Key Skills</Label>
      <Card className="border p-3">
        <ul data-testid="key_skills_list" className="space-y-4 text-left">
          {data.map(kSkills => (
            <li
              key={uid(32)}
              className="flex flex-wrap items-start items-baseline"
            >
              {getIcon('badge-check', {
                className: 'mr-1 h-4 w-4 text-green-500',
              })}
              <div className="mx-0.5 text-lg font-semibold text-gray-900 dark:text-gray-100">
                {kSkills}
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </Section>
  )
}
