'use client'

import type { ProjectLinkType, ProjectsType, ProjectType } from '@/types'
import type { UseSuspenseQueryResult } from '@tanstack/react-query'
import { useSuspenseQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import React, { memo } from 'react'
import titleize from 'titleize'
import { getIcon } from '../components/_shared/getIcon'
import { TechnologyList } from '../components/_shared/technologyList'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card'
import { Label } from '../components/ui/label'
import { Section } from '../components/ui/section'
import { Skeleton } from '../components/ui/skeleton'

function ProjectLink({ links }: { links: ProjectLinkType[] }) {
  return links.map((link: ProjectLinkType) => (
    <a
      key={link.label}
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Project Link"
    >
      {getIcon(link.type === 'mobile' ? 'smartphone' : 'web', {
        className: 'size-6 text-red-600',
        href: link.href,
      })}
    </a>
  ))
}
ProjectLink.displayName = 'ProjectLink'

const ProjectsList = memo(({ data }: { data: ProjectType[] }) => {
  return data.map((project: ProjectType, index: number) => (
    <Card
      key={project.title}
      className={clsx(
        'flex flex-col overflow-hidden p-3',
        project.isClient ? 'border-2 border-green-500' : 'border',
      )}
    >
      <CardHeader>
        <CardTitle>
          <div className="flex flex-wrap">
            <Label
              data-testid={`project_title_index_${index}`}
              className="font-semibold text-primary dark:text-primary"
            >
              {project.title}
            </Label>
          </div>
        </CardTitle>
        <CardDescription
          data-testid={`project_description_index_${index}`}
          className="text-pretty text-sm"
        >
          {project.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-2">
        <div
          data-testid={`project_client_index_${index}`}
          className="flex flex-wrap items-center"
        >
          <div className="font-semibold text-primary dark:text-primary">Client: </div>
          <div className="mx-2 text-pretty text-sm">
            {project.isClient ? 'Yes' : 'No'}
            {' '}
            {project.client_country
              ? `(${project.client_country})`
              : ''}
          </div>
        </div>
        <div
          data-testid={`project_links_index_${index}`}
          className="flex items-center print:hidden"
        >
          {project.links && !!project.links.length
            ? (
                <div className="font-semibold text-primary dark:text-primary">Links: </div>
              )
            : null}
          <div className="mx-2 flex text-pretty text-sm">
            {project.links && !!project.links.length && <ProjectLink links={project.links} />}
          </div>
        </div>
        <div
          data-testid={`project_company_index_${index}`}
          className="flex flex-wrap items-center"
        >
          {project.company
            ? (
                <div className="font-semibold text-primary dark:text-primary">Company: </div>
              )
            : null}
          <div className="mx-2 text-pretty text-sm">{titleize(project.company)}</div>
        </div>
        <div
          data-testid={`project_tech_stacks_index_${index}`}
          className="flex flex-wrap items-center"
        >
          {project.techStacks && !!project.techStacks.length && (
            <div className="font-semibold text-primary dark:text-primary">Technology: </div>
          )}
          {project.techStacks && !!project.techStacks.length && <TechnologyList techStacks={project.techStacks} />}
        </div>
      </CardContent>
    </Card>
  ))
})
ProjectsList.displayName = 'ProjectsList'

export default function Projects() {
  const { isPending, data }: UseSuspenseQueryResult<ProjectsType, unknown> = useSuspenseQuery<ProjectsType, unknown>({
    queryKey: ['projects'],
  })

  if (isPending) {
    return <Skeleton data-testid="projects_skeleton" />
  }

  return (
    <Section>
      <Label data-testid="projects_title" className="text-xl font-bold">
        Projects
      </Label>
      <div className="print-force-new-page scroll-mb-16">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-2 print:grid-cols-2 print:gap-2">
          <ProjectsList data={data} />
        </div>
      </div>
    </Section>
  )
}
Projects.displayName = 'Projects'
