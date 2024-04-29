import { parse } from 'valibot'
import schema from './schema'
import type { DarkColorType, LightColorType, ResumeDataType } from './types'
import { getFixturesAsync } from './lib/utils'

export async function getDataAsync(): Promise<ResumeDataType> {
  const about = await getFixturesAsync('about', 'prof_summery_title')
  const education = await getFixturesAsync('education')
  const works = await getFixturesAsync('works')
  const skills = await getFixturesAsync('skills')
  const key_skills = await getFixturesAsync('key_skills')
  const projects = await getFixturesAsync('projects')
  return parse(schema, {
    about,
    education,
    works,
    skills,
    key_skills,
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
