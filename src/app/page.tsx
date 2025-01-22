import type {
  AboutType,
  EducationsType,
  KeySkillsType,
  ProjectsType,
  ResumeDataType,
  SkillsType,
  WorksType,
} from '@/types'
import type { Metadata } from 'next'
import { About } from '@/components/pages/about'
import { Educations } from '@/components/pages/education'
import { KeySkills } from '@/components/pages/keySkills'
import { Projects } from '@/components/pages/projects'
import { Skills } from '@/components/pages/skills'
import { Works } from '@/components/pages/works'
import { metadata as meta } from '@/data'
import { fetchData } from '@/lib/utils'
import schema from '@/schema'
import { list } from '@vercel/blob'
import * as React from 'react'
import { env } from 'std-env'
import { parse } from 'valibot'

export const metadata: Metadata = {
  title: `${meta.name}`,
  description: meta.description,
}

export default async function Page() {
  const { blobs } = await list({
    token: env.BLOB_READ_WRITE_TOKEN,
  })
  const about: AboutType = await fetchData(blobs, 'about')
  const works: WorksType = await fetchData(blobs, 'works')
  const educations: EducationsType = await fetchData(blobs, 'educations')
  const skills: SkillsType = await fetchData(blobs, 'skills')
  const keySkills: KeySkillsType = await fetchData(blobs, 'key-skills')
  const projects: ProjectsType = await fetchData(blobs, 'projects')
  const output: ResumeDataType = parse(schema, {
    about,
    educations,
    works,
    skills,
    keySkills,
    projects,
  })
  return (
    <main className="container relative mx-auto scroll-my-12 overflow-auto p-4 md:p-16 print:p-12">
      <section className="mx-auto w-full max-w-2xl space-y-4 print:space-y-6">
        <About data={output.about} />
        <Works data={output.works} />
        <Educations data={output.educations} />
        <Skills data={output.skills} />
        <KeySkills data={output.keySkills} />
        <Projects data={output.projects} />
      </section>
    </main>
  )
}
