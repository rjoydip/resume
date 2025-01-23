'use client'

import type { KeySkillsType } from '@/types'
import * as React from 'react'
import { uid } from 'uid'
import { getIcon } from '../_shared/getIcon'
import MarkdownRender from '../_shared/markdown-render'
import { Card } from '../ui/card'
import { Label } from '../ui/label'
import { Section } from '../ui/section'

const KeySkillsListItem = React.memo(({ skill }: { skill: string }) => {
  return (
    <>
      {getIcon('badge-check', {
        className: 'mr-1 h-4 w-4 text-green-500',
      })}
      <div className="mx-0.5 text-lg font-semibold text-gray-900 dark:text-gray-100">
        <MarkdownRender content={skill} />
      </div>
    </>
  )
})

export function KeySkills({ data }: { data: KeySkillsType }) {
  if (!data)
    return null
  return (
    <Section>
      <Label data-testid="key_skills_title" className="text-xl font-bold">Key Skills</Label>
      <Card className="border p-3">
        <ul data-testid="key_skills_list" className="space-y-4 text-left">
          {data.map(skill => (
            <li
              key={uid(32)}
              className="flex flex-wrap items-start items-baseline"
            >
              <KeySkillsListItem skill={skill} />
            </li>
          ))}
        </ul>
      </Card>
    </Section>
  )
}
