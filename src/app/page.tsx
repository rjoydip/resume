import humanizeString from 'humanize-string'

import type { Metadata } from 'next'
import { clsx } from 'clsx'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CommandMenu } from '@/components/command-menu'
import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import data from '@/data'
import type { IconType } from '@/components/icons/getIcon'
import { getIcon } from '@/components/icons/getIcon'
import { Label } from '@/components/ui/label'
import type {
  AboutType,
  ContactType,
  EducationType,
  KeySkillsType,
  ProjectType,
  SkillsType,
  WorkType,
} from '@/types'
import ThemeChange from '@/components/theme-change'

export const metadata: Metadata = {
  title: `${data.about?.name}`,
  description: data.about?.description,
}

function About({
  data,
  contact,
}: {
  data: AboutType
  contact: ContactType
}) {
  return (
    <Section>
      <Card className="border p-3">
        <CardHeader>
          <div data-cy="about_name" className="text-2xl font-bold text-primary">{data.name}</div>
        </CardHeader>
        <CardContent className="flex-1 space-y-1.5">
          <div className="flex items-center justify-between">
            <div data-cy="about_description" className="max-w-md text-pretty">
              {data.description}
            </div>
            <Avatar className="size-28">
              <AvatarImage
                data-cy="about_avatar_url"
                alt={data.name}
                src={data.avatar_url}
                className="rounded-full"
              />
              <AvatarFallback data-cy="about_initials">{data.initials}</AvatarFallback>
            </Avatar>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between gap-x-2">
          <Contact data={contact} />
          <div className="max-w-md items-center text-pretty text-base">
            <a
              data-cy="about_location_link"
              className="hover:point inline-flex"
              href={data.location_link}
              target="_blank"
            >
              {getIcon('map', {
                className:
                  "h-6 w-6 rounded-full inline-flex hover:underline text-green-500",
                href: data.location_link,
              })}
              <span data-cy="about_location" className="text-base">{data.location}</span>
            </a>
          </div>
        </CardFooter>
      </Card>
      <Label data-cy="about_prof_summery_title" className="text-primary">Professional Summary</Label>
      <Card className="border p-3">
        <CardHeader>
          <CardDescription data-cy="about_prof_summery" className="text-pretty">
            {data.professional_summary}
          </CardDescription>
        </CardHeader>
      </Card>
    </Section>
  )
}

function Contact({ data }: { data: ContactType }) {
  return (
    <Section>
      <div className="flex gap-x-1 pt-1 print:hidden">
        {data.email
          ? (
            <Button className="size-8" variant="outline" size="icon" asChild>
              <a href={`mailto:${data.email}`}>
                {getIcon('mail', {
                  className: 'size-4',
                })}
              </a>
            </Button>
            )
          : null}
        {data.tel
          ? (
            <Button className="size-8" variant="outline" size="icon" asChild>
              <a href={`tel:${data.tel}`}>
                {getIcon('phone', {
                  className: 'size-4',
                })}
              </a>
            </Button>
            )
          : null}
        {data.social.sort().map(social => (
          <Button
            key={social.name}
            className="size-8"
            variant="outline"
            size="icon"
            asChild
          >
            <a href={social.url}>
              <social.icon className="size-4" />
            </a>
          </Button>
        ))}
      </div>
      <div className="hidden flex-col gap-x-1 print:flex">
        {data.email
          ? (
            <a href={`mailto:${data.email}`}>
              <span className="underline">{data.email}</span>
            </a>
            )
          : null}
        {data.tel
          ? (
            <a href={`tel:${data.tel}`}>
              <span className="underline">{data.tel}</span>
            </a>
            )
          : null}
      </div>
    </Section>
  )
}

function Education({ data }: { data: EducationType }) {
  return (
    <Section>
      <Label className="text-xl font-bold">Education</Label>
      <div className="relative border-l border-gray-200 dark:border-gray-700">
        <div className="space-y-8">
          {data.map((education, index) => (
            <div className="relative pl-6" key={index}>
              {getIcon('dot', {
                className: 'absolute -left-[12px] top-0',
                strokeWidth: 8,
              })}
              <div className="flex flex-wrap items-center justify-between text-base">
                <h3 className="font-semibold leading-none">
                  {education.school}
                </h3>
                <div className="tabular-nums text-gray-500">
                  {education.start}
                  {' '}
                  -
                  {education.end}
                </div>
              </div>
              <p>{education.degree}</p>
              <div className="text-sm font-semibold">
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

function Project({ data }: { data: ProjectType }) {
  return (
    <Section>
      <Label className="text-xl font-bold">Projects</Label>
      <div className="print-force-new-page scroll-mb-16">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 print:grid-cols-3 print:gap-2">
          {data.reverse().map((project, index) => {
            return (
              <Card
                className={clsx(
                  'flex flex-col overflow-hidden p-3',
                  project.isClient ? 'border-2 border-green-500' : 'border',
                )}
                key={index}
              >
                <CardHeader>
                  <CardTitle className="space-y-1">
                    <div className="flex flex-wrap space-x-0.5">
                      <Label className="font-semibold text-primary dark:text-primary">
                        {project.title}
                      </Label>
                    </div>
                  </CardTitle>
                  <CardDescription className="text-pretty text-sm">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto flex">
                  <div className="mt-2">
                    <div className="flex flex-wrap gap-1">
                      {project.isClient
                        ? (
                          <>
                            <Label className="text-sm font-semibold">
                              Client:
                              {' '}
                            </Label>
                            <div
                              key={index}
                              className="flex items-center justify-center "
                            >
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
                    <div className="flex flex-wrap gap-1">
                      {project.links && !!project.links.length
                        ? (
                          <Label className="text-sm font-semibold">Links: </Label>
                          )
                        : null}
                      {project.links && !!project.links.length
                        ? project.links.sort().map((link, index) =>
                          link.type === 'web'
                            ? (
                              <a
                                key={index}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {getIcon('web', {
                                  className:
                                    'size-4 rounded-full text-green-500',
                                  href: link.href,
                                })}
                              </a>
                              )
                            : link.type === 'mobile'
                              ? (
                                <a
                                  key={index}
                                  href={link.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {getIcon('smartphone', {
                                    className: 'size-4 rounded-full text-red-600',
                                    href: link.href,
                                  })}
                                </a>
                                )
                              : null,
                        )
                        : null}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {project.company
                        ? (
                          <Label className="text-sm font-semibold">
                            Company:
                            {' '}
                          </Label>
                          )
                        : null}
                      <div className="flex items-center justify-center ">
                        <Badge variant="secondary" className="text-xs">
                          {project.company}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {project.techStacks && !!project.techStacks.length
                        ? (
                          <Label className="text-sm font-semibold">
                            Technology:
                            {' '}
                          </Label>
                          )
                        : null}
                      {project.techStacks.sort().map((techStack, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-center "
                        >
                          {getIcon(techStack as IconType, {
                            className: 'size-4 rounded-full',
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </Section>
  )
}

function Skills({ data }: { data: SkillsType }) {
  return (
    <Section>
      <Label className="text-xl font-bold">Skills</Label>
      <Card className="border p-3">
        <ul className="space-y-4 text-left">
          {Object.entries(data).map(([skillCategory, skills]) => (
            <li key={skillCategory}>
              <div className="flex items-baseline">
                {getIcon('circle-dot', {
                  className: 'h-4 w-4 text-green-500 mt-2',
                })}
                <p className="m-0.5 ml-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {humanizeString(skillCategory)}
                  :

                </p>
                {skills.sort().map((skill, index) => (
                  <span key={index}>
                    {getIcon(skill as IconType, {
                      className: 'mx-0.5 size-4',
                    })}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </Section>
  )
}

function KeySkills({ data }: { data: KeySkillsType }) {
  return (
    <Section>
      <Label className="text-xl font-bold">Key Skills</Label>
      <Card className="border p-3">
        <ul className="space-y-4 text-left">
          {data.map((kSkills, index) => (
            <li
              key={index}
              className="flex flex-wrap items-start items-baseline"
            >
              {getIcon('badge-check', {
                className: 'mr-1 h-4 w-4 text-green-500',
              })}
              <div className="mx-0.5 text-lg font-semibold text-gray-900 dark:text-gray-100">
                {kSkills}
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </Section>
  )
}

function Work({ data }: { data: WorkType }) {
  return (
    <Section>
      <Label className="text-xl font-bold">Work Experience</Label>
      <div className="relative border-l border-gray-200 dark:border-gray-700">
        <div className="space-y-8">
          {data.map((work, index) => (
            <div key={index} className="relative pl-6">
              {getIcon('dot', {
                className: 'absolute -left-[12px] top-0',
                strokeWidth: 8,
              })}
              <div className="flex flex-wrap items-center justify-between gap-x-2">
                <h3 className="inline-flex items-center justify-center gap-x-1 font-semibold leading-none">
                  <a className="hover:underline" href={work.link}>
                    {work.company}
                  </a>
                  <span className="inline-flex gap-x-1">
                    {work.mode.sort().map((badge, index) => (
                      <Badge className="align-middle text-[12px]" key={index}>
                        {badge}
                      </Badge>
                    ))}
                  </span>
                </h3>
                <div className="tabular-nums text-gray-500">
                  {work.start}
                  {' '}
                  -
                  {work.end ?? 'Present'}
                </div>
              </div>
              <h4 className="text-sm font-semibold">{work.position}</h4>
              <p className="mt-2 text-pretty text-gray-700 dark:text-gray-300">
                {work.description}
              </p>
              <div className="mt-2 flex items-baseline">
                <div className="text-sm font-semibold">Skills: </div>
                {work.techStacks.sort().map((techStack, index) => (
                  <div key={index} className="mx-0.5">
                    {getIcon(techStack as IconType, {
                      className: 'size-4',
                    })}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

export default function Page() {
  return (
    <main className="container relative mx-auto scroll-my-12 overflow-auto p-4 md:p-16 print:p-12">
      <section className="mx-auto w-full max-w-2xl space-y-4 print:space-y-6">
        <About data={data.about} contact={data.contact} />
        <Work data={data.work} />
        <Education data={data.education} />
        <Skills data={data.skills} />
        <KeySkills data={data.key_skills} />
        <Project data={data.projects} />
      </section>

      <section>
        <ThemeChange />
        <CommandMenu
          links={[
            {
              url: data.about.website,
              title: 'Website',
            },
            ...data.contact.social.sort().map(socialMediaLink => ({
              url: socialMediaLink.url,
              title: socialMediaLink.name,
            })),
          ]}
        />
      </section>
    </main>
  )
}
