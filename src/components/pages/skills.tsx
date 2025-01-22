'use client'

import type { SkillsType } from '@/types'
import * as React from 'react'
import titleize from 'titleize'
import { uid } from 'uid'
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
        <div data-testid="skills_list" className="flex flex-wrap items-center space-2">
          {data.map((skill) => {
            return (
              <Badge key={uid()} className="m-1 text-[14px]" variant="secondary" aria-label={`Show ${titleize(skill)} skill`}>
                {titleize(skill)}
              </Badge>
            )
          })}
        </div>
      </Card>
    </Section>
  )
}
