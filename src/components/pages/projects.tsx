import type { ProjectLinkType, ProjectsType, ProjectType } from '@/types'
import clsx from 'clsx'
import * as React from 'react'
import titleize from 'titleize'
import { uid } from 'uid'
import { getIcon } from '../_shared/getIcon'
import MarkdownRender from '../_shared/markdown-render'
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

const ProjectLinkItem = React.memo(({ link }: { link: ProjectLinkType }) => {
  return (
    <a
      key={uid(32)}
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
  )
})

const TechnologyListItem = React.memo(({ techStack }: { techStack: string }) => {
  return <Badge key={uid(32)} variant="secondary" className="mx-0.5 my-0.5 align-middle text-[12px]">{titleize(techStack)}</Badge>
})

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
            <MarkdownRender content={project.description} />
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
              {project.links && !!project.links.length && project.links.map(link => <ProjectLinkItem key={uid(32)} link={link} />)}
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
            {project.techStacks && !!project.techStacks.length && project.techStacks.map(techStack => <TechnologyListItem key={uid(32)} techStack={techStack} />)}
          </div>
        </CardContent>
      </Card>
    )
  },
)

export function Projects({ data }: { data: ProjectsType }) {
  if (!data)
    return null
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
