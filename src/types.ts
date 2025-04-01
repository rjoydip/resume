import type { Output } from 'valibot'
import type { aboutSchema, contactSchema, declarationSchema, educationSchema, educationsSchema, footerSchema, languagesSchema, metaSchema, projectLinkSchema, projectSchema, projectsSchema, skillsSchema, socialMediaSchema, strengthsSchema, workSchema, worksSchema } from './schema'

export type EducationType = Output<typeof educationSchema>
export type EducationsType = Output<typeof educationsSchema>
export type AboutType = Output<typeof aboutSchema>
export type ContactType = Output<typeof contactSchema>
export type WorkType = Output<typeof workSchema>
export type WorksType = Output<typeof worksSchema>
export type SkillsType = Output<typeof skillsSchema>
export type StrengthsType = Output<typeof strengthsSchema>
export type ProjectType = Output<typeof projectSchema>
export type ProjectsType = Output<typeof projectsSchema>
export type ProjectLinkType = Output<typeof projectLinkSchema>
export type LanguagesType = Output<typeof languagesSchema>
export type DeclarationType = Output<typeof declarationSchema>
export type FooterType = Output<typeof footerSchema>
export type MetaType = Output<typeof metaSchema>
export type SocialMediaType = Output<typeof socialMediaSchema>
export interface ResumeType {
  about: AboutType
  educations: EducationsType
  strengths: StrengthsType
  projects: ProjectsType
  skills: SkillsType
  works: WorksType
  footer: FooterType
  languages: LanguagesType[]
  domains: string[]
  declarations: DeclarationType
}
export type SectionsType = keyof ResumeType
export type IconType =
  | 'dot'
  | 'web'
  | 'map'
  | 'email'
  | 'mail'
  | 'smartphone'
  | 'mobile'
  | 'phone'
  | 'circle-dot'
  | 'badge-check'
  | 'x'
  | 'twitter'
  | null
export type LightColorType = 'light' | 'system'
export type DarkColorType = 'dark'
