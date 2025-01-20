import type { Output } from 'valibot'
import type { aboutSchema, contactSchema, educationSchema, educationsSchema, keySkillsSchema, locationSchema, projectSchema, projectsSchema, skillsSchema, workSchema, worksSchema } from './schema'
import type schema from './schema'

export type ResumeDataType = Output<typeof schema>
export type EducationType = Output<typeof educationSchema>
export type EducationsType = Output<typeof educationsSchema>
export type AboutType = Output<typeof aboutSchema>
export type ContactType = Output<typeof contactSchema>
export type WorkType = Output<typeof workSchema>
export type WorksType = Output<typeof worksSchema>
export type SkillsType = Output<typeof skillsSchema>
export type KeySkillsType = Output<typeof keySkillsSchema>
export type ProjectType = Output<typeof projectSchema>
export type ProjectsType = Output<typeof projectsSchema>
export type LocationType = Output<typeof locationSchema>

export interface FilterObjType<T> {
  [key: string]: T
}

export interface ProjectCardProps {
  title: string
  description: string
  techStacks: string[]
  links?: {
    type: 'web' | 'mobile'
    href: string
    label: string
  }[] | null
}

export type IconType =
  | 'api'
  | 'dot'
  | 'web'
  | 'map'
  | 'email'
  | 'mail'
  | 'smartphone'
  | 'mobile'
  | 'phone'
  | 'server'
  | 'backend'
  | 'circle-dot'
  | 'badge-check'
  | 'x'
  | 'twitter'
  | null
export type LightColorType = 'yellow' | 'blue' | 'green' | 'red' | 'violet' | 'zinc' | 'orange' | 'rose' | 'slate' | 'slate' | 'light' | 'system'
export type DarkColorType = 'yellow-dark' | 'blue-dark' | 'green-dark' | 'red-dark' | 'violet-dark' | 'zinc-dark' | 'orange-dark' | 'rose-dark' | 'slate-dark' | 'dark'

export interface FeatureFlagType {
  FF_SHOW_PROFILE_IMAGE: boolean
}
