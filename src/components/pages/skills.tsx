'use client'

import * as React from 'react'
import { Label } from '@radix-ui/react-label'
import humanizeString from 'humanize-string'
import { getIcon } from '../../icons/getIcon'
import { Card } from '../ui/card'
import { Section } from '../ui/section'
import type { IconType, SkillsType } from '@/types'

export function Skills({ data }: { data: SkillsType }) {
  return (
    <Section>
      <Label data-testid="skills_title" className="text-xl font-bold">
        Skills
      </Label>
      <Card className="border p-3">
        <ul data-testid="skills_list" className="space-y-4 text-left">
          {Object.entries(data).map(([skillCategory, skills]) => (
            <li key={skillCategory}>
              <div className="flex items-baseline">
                {getIcon('circle-dot', {
                  className: 'h-4 w-4 text-green-500 mt-2',
                })}
                <p className="m-0.5 ml-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {humanizeString(skillCategory)}
                  :
                </p>
                {skills.map((skill, index) => (
                  <span key={index}>
                    {getIcon(skill as IconType, {
                      className: 'mx-0.5 size-4',
                    })}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </Section>
  )
}
