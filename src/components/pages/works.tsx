import type { WorkType } from '@/types'
import * as React from 'react'
import { getIcon } from '../_shared/getIcon'
import { TechnologyList } from '../_shared/technologyList'
import { Badge } from '../ui/badge'
import { Label } from '../ui/label'
import { Section } from '../ui/section'

interface WorksProps {
  data: WorkType[]
}

function WorkingMode({ modes }: { modes: string[] }) {
  return modes.map((mode: string) => <Badge key={mode} className="align-middle text-[12px]">{mode}</Badge>)
}
WorkingMode.displayName = 'WorksList'

function WorksList({ data }: { data: WorkType[] }) {
  return data.map((work: WorkType, index: number) => (
    <div className="relative pl-6" key={`${work.company}-${work.start}-${work.end}`}>
      {getIcon('dot', {
        className: 'absolute -left-[12px] top-0',
        strokeWidth: 8,
      })}
      <div
        data-testid={`work_details_index_${index}`}
        className="flex flex-wrap items-center justify-between gap-x-2"
      >
        <div className="inline-flex items-center justify-center gap-x-1 font-semibold leading-none">
          <a className="hover:underline" href={work.link} aria-label="Company Name" rel="noopener noreferrer">
            {work.company}
          </a>
          <span className="inline-flex gap-x-1">
            <WorkingMode modes={work.mode} />
          </span>
        </div>
        <div className="tabular-nums text-gray-700">
          {work.start}
          {' '}
          -
          {' '}
          {work.end ?? 'Present'}
        </div>
      </div>
      <div
        data-testid={`work_position_index_${index}`}
        className="text-sm font-semibold"
      >
        {work.position}
      </div>
      <div
        data-testid={`work_description_index_${index}`}
        className="flex flex-wrap mt-2 text-pretty text-gray-900 dark:text-gray-300"
      >
        <div dangerouslySetInnerHTML={{ __html: work.description }}></div>
      </div>
      <div
        data-testid={`work_technology_index_${index}`}
        className="flex flex-wrap mt-2 items-baseline"
      >
        <div className="text-sm font-bold">Technology: </div>
        {work.techStacks && <TechnologyList techStacks={work.techStacks} />}
      </div>
    </div>
  ))
}
WorksList.displayName = 'WorksList'

export function Works({ data }: WorksProps) {
  if (!data?.length)
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
        <WorksList data={data} />
      </div>
    </Section>
  )
}
Works.displayName = 'Works'
