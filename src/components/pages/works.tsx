'use client'

import type { WorkType } from '@/types'
import * as React from 'react'
import titleize from 'titleize'
import { uid } from 'uid'
import { getIcon } from '../_shared/getIcon'
import MarkdownRender from '../_shared/markdown-render'
import { Badge } from '../ui/badge'
import { Label } from '../ui/label'
import { Section } from '../ui/section'

const WorkingModeBadge = React.memo(({ mode }: { mode: string }) => {
  return <Badge className="align-middle text-[12px]" key={uid(32)}>{mode}</Badge>
})

const TechnologyListItem = React.memo(({ techStack }: { techStack: string }) => {
  return <Badge key={uid(32)} variant="secondary" className="mx-0.5 my-0.5 align-middle text-[12px]">{titleize(techStack)}</Badge>
})

const WorksListItem = React.memo(({ data, index }: { data: WorkType, index: number }) => {
  return (
    <div className="relative pl-6">
      {getIcon('dot', {
        className: 'absolute -left-[12px] top-0',
        strokeWidth: 8,
      })}
      <div
        data-testid={`work_details_index_${index}`}
        className="flex flex-wrap items-center justify-between gap-x-2"
      >
        <div className="inline-flex items-center justify-center gap-x-1 font-semibold leading-none">
          <a className="hover:underline" href={data.link}>
            {data.company}
          </a>
          <span className="inline-flex gap-x-1">
            {data.mode.map(badge => <WorkingModeBadge key={uid(32)} mode={badge} />)}
          </span>
        </div>
        <div className="tabular-nums text-gray-700">
          {data.start}
          {' '}
          -
          {' '}
          {data.end ?? 'Present'}
        </div>
      </div>
      <div
        data-testid={`work_position_index_${index}`}
        className="text-sm font-semibold"
      >
        {data.position}
      </div>
      <div
        data-testid={`work_description_index_${index}`}
        className="flex flex-wrap mt-2 text-pretty text-gray-900 dark:text-gray-300"
      >
        <MarkdownRender content={data.description} />
      </div>
      <div
        data-testid={`work_technology_index_${index}`}
        className="flex flex-wrap mt-2 items-baseline"
      >
        <div className="text-sm font-bold">Technology: </div>
        {data.techStacks && data.techStacks.map((techStack: string) => <TechnologyListItem key={uid(32)} techStack={techStack} />)}
      </div>
    </div>
  )
})

export function Works({ data }: { data: WorkType[] }) {
  if (!data)
    return null
  return (
    <Section>
      <Label data-testid="work_title" className="text-xl font-bold">
        Work Experience
      </Label>
      <div
        data-testid="work_list"
        className="relative space-y-8 border-l border-gray-200 dark:border-gray-200"
      >
        {data.map((work, index) => <WorksListItem key={uid()} data={work} index={index} />)}
      </div>
    </Section>
  )
}
