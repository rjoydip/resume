'use client'

import { Label } from '@radix-ui/react-label'
import { getIcon } from '../../icons/getIcon'
import { Badge } from '../ui/badge'
import { Section } from '../ui/section'
import type { IconType, WorksType } from '@/types'

export function Works({ data }: { data: WorksType }) {
  return (
    <Section>
      <Label data-cy="work_title" className="text-xl font-bold">
        Work Experience
      </Label>
      <div
        data-cy="work_list"
        className="relative space-y-8 border-l border-gray-200 dark:border-gray-700"
      >
        {data.map((work, index) => (
          <div key={index} className="relative pl-6">
            {getIcon('dot', {
              className: 'absolute -left-[12px] top-0',
              strokeWidth: 8,
            })}
            <div data-cy={`work_details_index_${index}`} className="flex flex-wrap items-center justify-between gap-x-2">
              <div className="inline-flex items-center justify-center gap-x-1 font-semibold leading-none">
                <a className="hover:underline" href={work.link}>
                  {work.company}
                </a>
                <span className="inline-flex gap-x-1">
                  {work.mode.map((badge, index) => (
                    <Badge className="align-middle text-[12px]" key={index}>
                      {badge}
                    </Badge>
                  ))}
                </span>
              </div>
              <div className="tabular-nums text-gray-500">
                {work.start}
                {' '}
                -
                {' '}
                {work.end ?? 'Present'}
              </div>
            </div>
            <div data-cy={`work_position_index_${index}`} className="text-sm font-semibold">{work.position}</div>
            <div data-cy={`work_description_index_${index}`} className="mt-2 text-pretty text-gray-700 dark:text-gray-300">
              {work.description}
            </div>
            <div data-cy={`work_skills_index_${index}`} className="mt-2 flex items-baseline">
              <div className="text-sm font-semibold">Skills: </div>
              {work.techStacks.map((techStack, index) => (
                <span key={index} className="mx-0.5">
                  {getIcon(techStack as IconType, {
                    className: 'size-4',
                  })}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
