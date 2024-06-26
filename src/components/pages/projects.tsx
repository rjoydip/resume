import * as React from 'react'
import clsx from 'clsx'
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
import { Section } from '../ui/section'
import { Label } from '../ui/label'
import type { IconType, ProjectType, ProjectsType } from '@/types'

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
              className="flex flex-wrap gap-1"
            >
              {project.isClient
                ? (
                  <>
                    <Label className="text-sm font-semibold">Client: </Label>
                    <div className="flex items-center justify-center ">
                      {project.isClient ? 'Yes' : 'No'}
                      {' '}
                      {project.client_country
                        ? `(${project.client_country})`
                        : ''}
                    </div>
                  </>
                  )
                : null}
            </div>
            <div
              data-testid={`project_links_index_${index}`}
              className="flex flex-wrap gap-1"
            >
              {project.links && !!project.links.length
                ? (
                  <Label className="text-sm font-semibold">Links: </Label>
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
                    className: 'size-4 text-red-600',
                    href: link.href,
                  })}
                </a>
              ))}
            </div>
            <div
              data-testid={`project_company_index_${index}`}
              className="flex flex-wrap gap-1"
            >
              {project.company
                ? (
                  <Label className="text-sm font-semibold">Company: </Label>
                  )
                : null}
              <Badge
                variant="secondary"
                className="flex items-center justify-center text-xs"
              >
                {project.company}
              </Badge>
            </div>
            <div
              data-testid={`project_tech_stacks_index_${index}`}
              className="flex flex-wrap gap-1"
            >
              {project.techStacks && !!project.techStacks.length && (
                <Label className="text-sm font-semibold">Technology: </Label>
              )}
              {project.techStacks
              && !!project.techStacks.length
              && project.techStacks.map(techStack => (
                <div key={uid(32)} className="flex items-center justify-center">
                  {getIcon(techStack as IconType, {
                    className: 'size-4',
                  })}
                </div>
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
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 print:grid-cols-3 print:gap-2">
          {data.map((item, index) => (
            <ProjectsListItem key={uid(32)} project={item} index={index} />
          ))}
        </div>
      </div>
    </Section>
  )
}
