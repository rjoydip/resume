'use client'

import type { ProjectsType, ProjectType } from '@/types'
import clsx from 'clsx'
import * as React from 'react'
import titleize from 'titleize'
import { uid } from 'uid'
import { getIcon } from '../../icons/getIcon'
import { Badge } from '../ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Label } from '../ui/label'
import { Section } from '../ui/section'

const ProjectsListItem = React.memo(
  ({ project, index }: { project: ProjectType, index: number }) => {
    return (
      <Card
        className={clsx(
          'flex flex-col overflow-hidden p-3',
          project.isClient ? 'border-2 border-green-500' : 'border',
        )}
        key={uid(32)}
      >
        <CardHeader>
          <CardTitle className="space-y-1">
            <div className="flex flex-wrap space-x-0.5">
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
        <CardContent className="mt-auto flex">
          <div className="mt-2">
            <div
              data-testid={`project_client_index_${index}`}
              className="flex items-center gap-1"
            >
              <Label className="font-medium">Client: </Label>
              <div className="text-pretty text-sm">
                {project.isClient ? 'Yes' : 'No'}
                {' '}
                {project.client_country
                  ? `(${project.client_country})`
                  : ''}
              </div>
            </div>
            <div
              data-testid={`project_links_index_${index}`}
              className="flex items-center gap-1 print:hidden"
            >
              {project.links && !!project.links.length
                ? (
                    <Label className="font-medium">Links: </Label>
                  )
                : null}
              {project.links
              && !!project.links.length
              && project.links.map(link => (
                <a
                  key={uid(32)}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {getIcon(link.type === 'mobile' ? 'smartphone' : 'web', {
                    className: 'size-5 text-red-600',
                    href: link.href,
                  })}
                </a>
              ))}
            </div>
            <div
              data-testid={`project_company_index_${index}`}
              className="flex items-center gap-1"
            >
              {project.company
                ? (
                    <Label className="font-medium">Company: </Label>
                  )
                : null}
              {titleize(project.company)}
            </div>
            <div
              data-testid={`project_tech_stacks_index_${index}`}
              className="flex items-center flex-wrap gap-1"
            >
              {project.techStacks && !!project.techStacks.length && (
                <Label className="font-medium">Technology: </Label>
              )}
              {project.techStacks
              && !!project.techStacks.length
              && project.techStacks.map(techStack => (
                <Badge key={uid(32)} variant="secondary" className="mx-0.5 my-0.5 align-middle text-[12px]">{titleize(techStack)}</Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  },
)

export function Projects({ data }: { data: ProjectsType }) {
  return (
    <Section>
      <Label data-testid="project_title" className="text-xl font-bold">
        Projects
      </Label>
      <div className="print-force-new-page scroll-mb-16">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-2 print:grid-cols-2 print:gap-2">
          {data.map((item, index) => (
            <ProjectsListItem key={uid(32)} project={item} index={index} />
          ))}
        </div>
      </div>
    </Section>
  )
}
