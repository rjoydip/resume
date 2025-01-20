'use client'

import type { SkillsType } from '@/types'
import * as React from 'react'
import titleize from 'titleize'
import { uid } from 'uid'
import { getIcon } from '../../icons/getIcon'
import { Badge } from '../ui/badge'
import { Card } from '../ui/card'
import { Label } from '../ui/label'
import { Section } from '../ui/section'

export function Skills({ data }: { data: SkillsType }) {
  return (
    <Section>
      <Label data-testid="skills_title" className="text-xl font-bold">
        Skills
      </Label>
      <Card className="border p-3">
        <ul data-testid="skills_list" className="space-y-4 text-left">
          {Object.entries(data).map(([skillCategory, skills]) => (
            <li
              key={skillCategory}
              className="flex flex-wrap items-start items-baseline"
            >
              {getIcon('circle-dot', {
                className: 'h-4 w-4 text-green-500 mt-2',
              })}
              <p className="m-0.5 ml-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                {titleize(skillCategory)}
                :
              </p>
              {skills.map(skill => (
                <div className="mx-0.5" key={uid(32)}><Badge variant="secondary">{titleize(skill)}</Badge></div>
              ))}
            </li>
          ))}
        </ul>
      </Card>
    </Section>
  )
}
