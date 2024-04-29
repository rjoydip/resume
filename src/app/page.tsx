import type { Metadata } from 'next'
import { CommandMenu } from '@/components/command-menu'
import { getDataAsync, metadata as meta } from '@/data'
import { ThemeChange } from '@/components/color'
import {
  About,
  Education,
  KeySkills,
  Projects,
  Skills,
  Works,
} from '@/components/pages'

export const metadata: Metadata = {
  title: `${meta.name}`,
  description: meta.description,
}

export default async function Page() {
  const { about, works, education, skills, key_skills, projects }
    = await getDataAsync()
  return (
    <main className="container relative mx-auto scroll-my-12 overflow-auto p-4 md:p-16 print:p-12">
      <section className="mx-auto w-full max-w-2xl space-y-4 print:space-y-6">
        <About data={about} />
        <Works data={works} />
        <Education data={education} />
        <Skills data={skills} />
        <KeySkills data={key_skills} />
        <Projects data={projects} />
      </section>

      <section>
        <ThemeChange />
        <CommandMenu />
      </section>
    </main>
  )
}
