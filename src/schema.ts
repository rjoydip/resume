import { any, array, boolean, email, maxLength, maxValue, minLength, minValue, nullable, nullish, number, object, picklist, regex, startsWith, string, transform, union, url } from 'valibot'
import { companies, projectLinkTypes, socialMedia, techStacks, workMode } from './data'

const today = new Date()
const techStackSchema = array(picklist(techStacks))
export const keySkillsSchema = array(string())

export const educationSchema = object({
  school: string(),
  degree: string(),
  location: string(),
  cgpa: nullable(number([minValue(0.0), maxValue(10.0)])),
  aggregate: nullable(transform(string([
    regex(/\d+%/),
  ]), str => `${Number.parseFloat(str.slice(0, -1)) / 100}`)),
  start: union([
    number([
      minValue(2005),
      maxValue(2016),
    ]),
    string([
      minValue('2005'),
      maxValue('2016'),
    ]),
  ]),
  end: union([
    number([
      minValue(2010),
      maxValue(2016),
    ]),
    string([
      minValue('2010'),
      maxValue('2016'),
    ]),
  ]),
})
export const educationsSchema = array(educationSchema)

export const workSchema = object({
  company: picklist(companies),
  position: string(),
  description: string(),
  link: string([url()]),
  mode: array(picklist(workMode)),
  techStacks: techStackSchema,
  start: union([
    number([
      minValue(2005),
      maxValue(today.getFullYear()),
    ]),
    string([
      minValue('2005'),
      maxValue(today.getFullYear().toString()),
    ]),
  ]),
  end: nullable(union([
    number([
      minValue(2017),
      maxValue(today.getFullYear()),
    ]),
    string([
      minValue('2017'),
      maxValue(today.getFullYear().toString()),
    ]),
  ])),
})
export const worksSchema = array(workSchema)
export const skillsSchema = techStackSchema

export const projectSchema = object({
  title: string(),
  description: string(),
  techStacks: techStackSchema,
  links: nullish(array(object({
    type: picklist(projectLinkTypes),
    label: string(),
    href: string([url()]),
  }))),
  company: picklist(companies),
  isClient: nullish(boolean()),
  client_country: nullish(string()),
})
export const projectsSchema = array(projectSchema)

export const contactSchema = object({
  email: string([email()]),
  tel: string([startsWith('+')]),
  social: array(object({
    url: string([url()]),
    name: picklist(socialMedia),
  })),
})
export const locationSchema = object({
  city: string(),
  country: string(),
  link: string([url()]),
})
export const aboutSchema = object({
  name: string([minLength(4)]),
  initials: string([minLength(1), maxLength(4)]),
  location: locationSchema,
  avatar_url: string([url()]),
  website: string([url()]),
  description: string([maxLength(1000)]),
  professional_summary: string(),
  contact: contactSchema,
})

export default object({
  about: aboutSchema,
  educations: educationsSchema,
  works: worksSchema,
  skills: skillsSchema,
  keySkills: keySkillsSchema,
  projects: projectsSchema,
})
