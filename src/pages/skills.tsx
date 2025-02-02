'use client'

import type { SkillsType } from '@/types'
import type { UseSuspenseQueryResult } from '@tanstack/react-query'
import { useSuspenseQuery } from '@tanstack/react-query'
import titleize from 'titleize'
import { Badge } from '../components/ui/badge'
import { Card } from '../components/ui/card'
import { Label } from '../components/ui/label'
import { Section } from '../components/ui/section'
import { Skeleton } from '../components/ui/skeleton'

function SkillsList({ skills }: { skills: string[] }) {
  return (
    <div data-testid="skills_list" className="flex flex-wrap items-center space-2">
      {skills.map((skill: string) => (
        <Badge key={skill} className="m-1 text-[14px]" variant="secondary" aria-label={`Show ${titleize(skill)} skill`}>
          {titleize(skill)}
        </Badge>
      ))}
    </div>
  )
}
SkillsList.displayName = 'SkillsList'

export default function Skills() {
  const { isPending, data }: UseSuspenseQueryResult<SkillsType, unknown> = useSuspenseQuery<SkillsType, unknown>({
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
