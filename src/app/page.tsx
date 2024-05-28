import type { Metadata } from 'next'
import { list } from '@vercel/blob'
import { parse } from 'valibot'
import { env, isDevelopment, isTest } from 'std-env'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { CommandMenu } from '@/components/command-menu'
import { metadata as meta } from '@/data'
import {
  About,
  Educations,
  KeySkills,
  Projects,
  Skills,
  Works,
} from '@/components/pages'
import { fetchData } from '@/lib/utils'
import schema from '@/schema'
import type {
  AboutType,
  EducationsType,
  KeySkillsType,
  ProjectsType,
  SkillsType,
  WorksType,
} from '@/types'
import { Toaster } from '@/components/ui/toaster'

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
  const data = parse(schema, {
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
        <About data={data.about} />
        <Works data={data.works} />
        <Educations data={data.educations} />
        <Skills data={data.skills} />
        <KeySkills data={data.keySkills} />
        <Projects data={data.projects} />
      </section>

      <section>
        <CommandMenu />
      </section>
      <Toaster />
      {!isDevelopment && !isTest && <SpeedInsights />}
    </main>
  )
}
