'use client'

import type { EducationsType } from '@/types'
import * as React from 'react'
import { uid } from 'uid'
import { getIcon } from '../../icons/getIcon'
import { Label } from '../ui/label'
import { Section } from '../ui/section'

export function Educations({ data }: { data: EducationsType }) {
  return (
    <Section>
      <Label data-testid="education_title" className="text-xl font-bold">
        Education
      </Label>
      <div className="relative border-l border-gray-200 dark:border-gray-700">
        <div className="space-y-8">
          {data.map((education, index) => (
            <div className="relative pl-6" key={uid(32)}>
              {getIcon('dot', {
                className: 'absolute -left-[12px] top-0',
                strokeWidth: 8,
              })}
              <div className="flex flex-wrap items-center justify-between text-base">
                <div
                  data-testid={`education_school_index_${index}`}
                  className="font-semibold leading-none"
                >
                  {education.school}
                </div>
                <div
                  data-testid={`education_start_end_index_${index}`}
                  className="tabular-nums text-gray-700"
                >
                  {education.start}
                  {' '}
                  -
                  {' '}
                  {education.end}
                </div>
              </div>
              <div data-testid={`education_degree_index_${index}`}>
                {education.degree}
              </div>
              <div
                data-testid={`education_aggregate_index_${index}`}
                className="text-sm font-semibold"
              >
                Aggregate:
                {' '}
                {education?.aggregate ?? education?.cgpa}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
