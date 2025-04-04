import { companies, projectLinkTypes, socialMedia, techStacks, today, workMode } from '@/data/index'
import { array, boolean, date, email, maxLength, maxValue, minLength, minValue, nullable, nullish, number, object, picklist, regex, startsWith, string, transform, union, url } from 'valibot'

const socialMediaSchema = array(object({
  url: string([url()]),
  name: picklist(socialMedia),
}))
const contactSchema = object({
  email: string([email()]),
  tel: string([startsWith('+')]),
  social: socialMediaSchema,
})

export const techStackSchema = array(picklist(techStacks))
export const strengthsSchema = array(string([minLength(1)]))

export const educationSchema = object({
  name: string(),
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
export const metaSchema = object({
  name: string(),
  description: string(),
  generator: string(),
})
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

export const projectLinkSchema = object({
  type: picklist(projectLinkTypes),
  label: string(),
  href: string([url()]),
})

export const projectSchema = object({
  title: string(),
  description: string(),
  techStacks: techStackSchema,
  links: nullish(array(projectLinkSchema)),
  company: picklist(companies),
  isClient: nullish(boolean()),
  client_country: nullish(string()),
})
export const languagesSchema = object({
  name: string(),
  isNative: boolean(),
})
export const aboutSchema = object({
  name: string([minLength(4)]),
  initials: string([minLength(1), maxLength(4)]),
  location: object({
    city: string(),
    country: string(),
    link: string([url()]),
  }),
  avatar_url: string([url()]),
  website: string([url()]),
  description: string([maxLength(1000)]),
  summary: string(),
  contact: contactSchema,
})

export const worksSchema = array(workSchema)
export const skillsSchema = array(
  object({
    category: picklist(['Frontend', 'Backend', 'Database', 'DevOps', 'SVN', 'Tools', 'Testing']),
    techs: techStackSchema,
  }),
)
export const projectsSchema = array(projectSchema)

export const declarationSchema = object({
  name: string(),
  country: string(),
  location: string(),
  today: date(),
})
export const footerSchema = object({
  meta: metaSchema,
  today: date(),
})
