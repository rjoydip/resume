import { any, array, boolean, email, literal, maxLength, maxValue, minLength, minValue, nullable, nullish, number, object, picklist, regex, startsWith, string, transform, union, url } from 'valibot'

const today = new Date()
const companies = union([
  literal('Ascentspark'),
  literal('Infosys'),
  literal('Tech Mahindra'),
  literal('Webskitters'),
])

const techStackSchema = array(picklist([
  'angular',
  'aws',
  'bitbucket',
  'bootstrap',
  'bun',
  'cucumber',
  'cypress',
  'deno',
  'docker',
  'electron',
  'etl',
  'express',
  'firebase',
  'fastify',
  'git',
  'github',
  'github-actions',
  'gitlab',
  'gmc',
  'graphql',
  'instana',
  'ionic',
  'javascript',
  'jenkins',
  'jest',
  'jira',
  'kafka',
  'laravel',
  'linux',
  'mac',
  'mongodb',
  'mongoose',
  'mysql',
  'nextjs',
  'nodejs',
  'npm',
  'pnpm',
  'php',
  'playwright',
  'postgresql',
  'postman',
  'prisma',
  'react',
  'reactjs',
  'snyk',
  'springboot',
  'typescript',
  'vercel',
  'vitest',
  'windows',
  'yarn',
]))

export const keySkillsSchema = array(picklist([
  'Full Stack Development',
  'Project Leadership',
  'Team Building and Leadership',
  'Collaboration and Communication',
  'TypeScript',
  'JavaScript',
  'Node.js',
]))

export const educationsSchema = array(object({
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
}))

export const worksSchema = array(object({
  company: companies,
  position: string(),
  description: string(),
  link: string([url()]),
  mode: array(picklist(['Work from Home', 'Hybrid', 'Office'])),
  logo: any(),
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
}))

export const skillsSchema = object({
  'cloud': techStackSchema,
  'cross-platform': techStackSchema,
  'devOps': techStackSchema,
  'database': techStackSchema,
  'framework': techStackSchema,
  'languages': techStackSchema,
  'object-relational-mapping': techStackSchema,
  'operating-system': techStackSchema,
  'package-manager': techStackSchema,
  'test': techStackSchema,
  'tools': techStackSchema,
})

export const projectsSchema = array(object({
  title: string(),
  description: string(),
  techStacks: techStackSchema,
  links: nullish(array(object({
    type: picklist(['web', 'mobile']),
    label: string(),
    href: string([url()]),
  }))),
  company: companies,
  isClient: nullish(boolean()),
  client_country: nullish(string()),
}))

export const contactSchema = object({
  email: string([email()]),
  tel: string([startsWith('+')]),
  social: array(object({
    url: string([url()]),
    name: picklist(['gitHub', 'linkedIn', 'x']),
  })),
})

export const aboutSchema = object({
  name: string([minLength(4)]),
  initials: string([minLength(1), maxLength(4)]),
  location: string(),
  location_link: string([url()]),
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
