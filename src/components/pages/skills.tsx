import type { SkillsType } from '@/types'
import * as React from 'react'
import titleize from 'titleize'
import { Badge } from '../ui/badge'
import { Card } from '../ui/card'
import { Label } from '../ui/label'
import { Section } from '../ui/section'

interface SkillsProps {
  data: SkillsType
}

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

export function Skills({ data }: SkillsProps) {
  if (!data?.length)
    return null
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
