'use client'

import type { SkillsType } from '@/types'
import type { UseSuspenseQueryResult } from '@tanstack/react-query'
import { useSuspenseQuery } from '@tanstack/react-query'
import React from 'react'
import { getIcon } from '../_shared/getIcon'
import { TechnologyList } from '../_shared/technologyList'
import { Card } from '../ui/card'
import { Label } from '../ui/label'
import { Section } from '../ui/section'
import { Skeleton } from '../ui/skeleton'

function SkillsList({ skills }: { skills: SkillsType }) {
  return (
    <div data-testid="skills_list" className="flex flex-wrap flex-col gap-2 items-start">
      {skills.map(({ techs, category }) => (
        <div key={category} className="flex flex-wrap gap-2 items-center">
          {getIcon('badge-check', {
            className: 'h-4 w-4 text-green-500',
          })}
          <div className="font-semibold">
            {category}
            :
            {' '}
          </div>
          <TechnologyList techStacks={techs} />
        </div>
      ))}
    </div>
  )
}
SkillsList.displayName = 'SkillsList'

export default function Skills() {
  const { isPending, data }: UseSuspenseQueryResult<SkillsType> = useSuspenseQuery<SkillsType>({
    queryKey: ['skills'],
  })

  if (isPending) {
    return <Skeleton data-testid="skills_skeleton" />
  }

  return (
    <Section>
      <Label data-testid="skills_title" className="text-xl font-bold">
        Skills
      </Label>
      <Card className="border p-3">
        <SkillsList skills={data} />
      </Card>
    </Section>
  )
}
Skills.displayName = 'Skills'
