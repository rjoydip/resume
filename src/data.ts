import { parse } from 'valibot'
import { list } from '@vercel/blob'
import schema from './schema'
import type { AboutType, DarkColorType, EducationType, KeySkillsType, LightColorType, ProjectsType, ResumeDataType, SkillsType, WorksType } from '@/types'
import { fetchData } from '@/lib/utils'

export async function getData(): Promise<ResumeDataType> {
  const { blobs } = await list()
  const about: AboutType = await fetchData(blobs, 'about')
  const works: WorksType = await fetchData(blobs, 'works')
  const education: EducationType = await fetchData(blobs, 'educations')
  const skills: SkillsType = await fetchData(blobs, 'skills')
  const keySkills: KeySkillsType = await fetchData(blobs, 'key-skills')
  const projects: ProjectsType = await fetchData(blobs, 'projects')
  return parse(schema, {
    about,
    education,
    works,
    skills,
    keySkills,
    projects,
  })
}

export const metadata = {
  name: 'Joydip Roy',
  description: 'JR',
}

export function getLightThemeColors(): LightColorType[] {
  return ['yellow', 'blue', 'green', 'red', 'violet', 'zinc', 'orange', 'rose', 'slate', 'light']
}

export function getDarkThemeColors(): DarkColorType[] {
  return ['yellow-dark', 'blue-dark', 'green-dark', 'red-dark', 'violet-dark', 'zinc-dark', 'orange-dark', 'rose-dark', 'slate-dark', 'dark']
}
