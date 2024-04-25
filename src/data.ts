import { parse } from 'valibot'
import schema from './schema'
import type { DarkColorType, LightColorType } from './types'
import {
  GitHub,
  LinkedIn,
  X,
} from '@/components/icons'
import { getFixturesAsync } from './lib/utils'

export const contact = {
  email: "joydipand@gmail.com",
  tel: "+91-8697411233",
  social: [
    {
      name: "GitHub",
      url: "https://github.com/rjoydip",
      icon: GitHub,
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/rjoydip/",
      icon: LinkedIn,
    },
    {
      name: "X",
      url: "https://x.com/rjoydip11",
      icon: X,
    },
  ],
}

export default async function getDataAsync() {
  const about = await getFixturesAsync('about', 'prof_summery_title')
  const education = await getFixturesAsync('education')
  const work = await getFixturesAsync('work')
  const skills = await getFixturesAsync('skills')
  const key_skills = await getFixturesAsync('key_skills')
  const projects = await getFixturesAsync('projects')
  const payload = {
    about,
    contact,
    education,
    work,
    skills,
    key_skills,
    projects,
  }
  return parse(schema, payload)
}

export const metadata = {
  name: 'Joydip Roy',
  description: 'JR'
}

export function getLightThemeColors(): LightColorType[] {
  return ['yellow', 'blue', 'green', 'red', 'violet', 'zinc', 'orange', 'rose', 'slate', 'light']
}

export function getDarkThemeColors(): DarkColorType[] {
  return ['yellow-dark', 'blue-dark', 'green-dark', 'red-dark', 'violet-dark', 'zinc-dark', 'orange-dark', 'rose-dark', 'slate-dark', 'dark']
}
