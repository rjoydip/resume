import { randBoolean, randCity, randCompanyName, randCountry, randDomainName, randEmail, randFullName, randImg, randJobDescriptor, randNumber, randPhoneNumber, randProgrammingLanguage, randText } from '@ngneat/falso'
import type { AboutType, EducationsType, KeySkillsType, ProjectsType, SkillsType, WorksType } from '@/types'
import { companies, techStacks } from '@/data'

const generateArray = (length = 1) => Array.from({ length }, (_, i) => i)
const generateTechStacks = () => generateArray(randNumber({ min: 1, max: 10 })).map(() => randProgrammingLanguage())

export const about: AboutType & { prof_summery_title: string } = {
  name: randFullName(),
  initials: randText({ charCount: 2 }).toString().toUpperCase(),
  location: `${randCity()}, ${randCountry()}`,
  location_link: 'https://maps.app.goo.gl/random',
  description: randText(),
  professional_summary: randJobDescriptor(),
  avatar_url: randImg(),
  website: randDomainName(),
  prof_summery_title: randJobDescriptor(),
  contact: {
    email: randEmail(),
    tel: `+91-${randPhoneNumber()}`,
    social: [
      {
        name: 'gitHub',
        url: 'https://github.com/foo_bar',
      },
      {
        name: 'linkedIn',
        url: 'https://www.linkedin.com/in/foo_bar/',
      },
      {
        name: 'x',
        url: 'https://x.com/foo_bar',
      },
    ],
  },
}

export const educations: EducationsType = generateArray(3).map(i => ({
  school: randText({ charCount: 10 }),
  degree: randText({ charCount: 10 }),
  aggregate: i === 2 ? `${randNumber({ min: 0, max: 100 })}%` : null,
  cgpa: randNumber({ min: 0, max: 10, fraction: 2 }),
  location: `${randCity()}, ${randCountry()}`,
  start: randNumber({ min: 2005, max: 2012 }),
  end: randNumber({ min: 2012, max: 2016 }),
}))

export const keySkills: KeySkillsType = [
  'Project Leadership',
  'Team Building and Leadership',
  'Collaboration and Communication',
]
export const projects: ProjectsType = generateArray(5).map(() => ({
  title: randText({ charCount: 8 }),
  description: randText(),
  techStacks: generateTechStacks(),
  isClient: randBoolean(),
  company: companies[randNumber({ min: 0, max: companies.length - 1 })],
  client_country: randCountry(),
  links: [],
}))

export const skills: SkillsType = {
  'cloud': ['a', 'b'],
  'cross-platform': ['c', 'd'],
  'devOps': ['e', 'f'],
  'database': ['g', 'h', 'i'],
  'framework': [
    'j',
    'k',
  ],
  'languages': [
    'm',
    'n',
  ],
  'object-relational-mapping': ['o', 'p'],
  'operating-system': ['q', 'r', 's'],
  'package-manager': ['t', 'u', 'v'],
  'test': ['w', 'x', 'y', 'z', 'aa'],
  'tools': [
    'bb',
    'cc',
    'dd',
    'ee',
  ],
}

export const works: WorksType = generateArray(3).map(() => ({
  company: randCompanyName(),
  link: `https://${randDomainName()}/foo_bar`,
  mode: generateArray(randNumber({ min: 1, max: 3 })).map(() => randText({ charCount: 5 })),
  position: randText({ charCount: 5 }),
  logo: null,
  start: randNumber({ min: 2016, max: new Date().getFullYear() }),
  end: null,
  description: randJobDescriptor(),
  techStacks: generateArray(randNumber({ min: 1, max: 5 })).map(i => techStacks[randNumber({ min: i, max: techStacks.length - 1 })]),
}))
