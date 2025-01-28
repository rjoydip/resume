import type {
  AboutType,
  EducationsType,
  ProjectsType,
  ResumeDataType,
  SkillsType,
  StrengthsType,
  WorksType,
} from '@/types'
import type { Metadata } from 'next'
import { env } from 'node:process'
import { Footer } from '@/components/footer'
import { About } from '@/components/pages/about'
import { Declaration } from '@/components/pages/declaration'
import { Educations } from '@/components/pages/educations'
import { Languages } from '@/components/pages/languages'
import { Projects } from '@/components/pages/projects'
import { Skills } from '@/components/pages/skills'
import { Strengths } from '@/components/pages/strengths'
import { Works } from '@/components/pages/works'
import { languages, metadata as meta } from '@/data'
import { fetchData } from '@/lib/utils'
import schema from '@/schema'
import { list } from '@vercel/blob'
import * as React from 'react'
import { parse } from 'valibot'

export const metadata: Metadata = {
  title: `${meta.name}`,
  description: meta.description,
}

async function getData(): Promise<ResumeDataType> {
  const { blobs } = await list({
    token: env.BLOB_READ_WRITE_TOKEN,
  })
  const [about, educations, projects, skills, strengths, works] = await Promise.all([
    await fetchData<AboutType>(blobs, 'about'),
    await fetchData<EducationsType>(blobs, 'educations'),
    await fetchData<ProjectsType>(blobs, 'projects'),
    await fetchData<SkillsType>(blobs, 'skills'),
    await fetchData<StrengthsType>(blobs, 'strengths'),
    await fetchData<WorksType>(blobs, 'works'),
  ])
  try {
    const data = parse(schema, { about, educations, projects, skills, strengths, works })
    return Promise.resolve(data)
  }
  catch (error) {
    throw new Error(`Error on data parsing: ${error}`)
  }
}

export default async function Page() {
  const { about, works, educations, skills, strengths, projects } = await getData()
  return (
    <main className="container relative mx-auto scroll-my-12 overflow-auto p-4 md:p-16 print:p-12">
      <div className="mx-auto w-full max-w-2xl space-y-4 print:space-y-6">
        <About data={about} />
        <Works data={works} />
        <Educations data={educations} />
        <Skills data={skills} />
        <Strengths data={strengths} />
        <Projects data={projects} />
        <Languages data={languages} />
        <Declaration location={about.location.city} name={about.name} />
      </div>
      <Footer />
    </main>
  )
}
