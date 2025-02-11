'use client'

import type { EducationsType, EducationType } from '@/types'
import type { UseSuspenseQueryResult } from '@tanstack/react-query'
import { useSuspenseQuery } from '@tanstack/react-query'
import React from 'react'
import { getIcon } from '../_shared/getIcon'
import { Label } from '../ui/label'
import { Section } from '../ui/section'
import { Skeleton } from '../ui/skeleton'

function EducationList({ data }: { data: EducationsType }) {
  return (
    <div className="space-y-8">
      {data.map((education: EducationType, index: number) => (
        <div className="relative pl-6" key={`${education.name}-${education.start}-${education.end}`}>
          {getIcon('dot', {
            className: 'absolute -left-[12px] top-0',
            strokeWidth: 8,
          })}
          <div className="flex flex-wrap items-center justify-between text-base">
            <div
              data-testid={`education_name_index_${index}`}
              className="font-semibold leading-none"
            >
              {education.name}
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
            {education.aggregate ?? education.cgpa}
          </div>
        </div>
      ))}
    </div>
  )
}
EducationList.displayName = 'EducationList'

export default function Educations() {
  const { isPending, data }: UseSuspenseQueryResult<EducationsType> = useSuspenseQuery<EducationsType>({
    queryKey: ['educations'],
  })

  if (isPending) {
    return <Skeleton data-testid="educations_skeleton" />
  }

  return (
    <Section>
      <Label data-testid="education_title" className="text-xl font-bold">
        Education
      </Label>
      <div className="relative border-l border-gray-200 dark:border-gray-700">
        <EducationList data={data} />
      </div>
    </Section>
  )
}
Educations.displayName = 'Educations'
