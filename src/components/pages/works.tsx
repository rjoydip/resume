'use client'

import type { WorksType } from '@/types'
import * as React from 'react'
import titleize from 'titleize'
import { uid } from 'uid'
import { getIcon } from '../../icons/getIcon'
import { Badge } from '../ui/badge'
import { Label } from '../ui/label'
import { Section } from '../ui/section'

export function Works({ data }: { data: WorksType }) {
  return (
    <Section>
      <Label data-testid="work_title" className="text-xl font-bold">
        Work Experience
      </Label>
      <div
        data-testid="work_list"
        className="relative space-y-8 border-l border-gray-200 dark:border-gray-200"
      >
        {data.map((work, index) => (
          <div key={uid(32)} className="relative pl-6">
            {getIcon('dot', {
              className: 'absolute -left-[12px] top-0',
              strokeWidth: 8,
            })}
            <div
              data-testid={`work_details_index_${index}`}
              className="flex flex-wrap items-center justify-between gap-x-2"
            >
              <div className="inline-flex items-center justify-center gap-x-1 font-semibold leading-none">
                <a className="hover:underline" href={work.link}>
                  {work.company}
                </a>
                <span className="inline-flex gap-x-1">
                  {work.mode.map(badge => (
                    <Badge className="align-middle text-[12px]" key={uid(32)}>
                      {badge}
                    </Badge>
                  ))}
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
              className="mt-2 text-pretty text-gray-900 dark:text-gray-300"
              dangerouslySetInnerHTML={{ __html: work.description }}
            />
            <div
              data-testid={`work_technology_index_${index}`}
              className="flex flex-wrap mt-2 items-baseline"
            >
              <div className="text-sm font-bold">Technology: </div>
              {work.techStacks
              && work.techStacks.map(techStack => (
                <Badge key={uid(32)} variant="secondary" className="mx-0.5 my-0.5 align-middle text-[12px]">{titleize(techStack)}</Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
