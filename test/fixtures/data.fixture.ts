import type { AboutType, EducationsType, ProjectsType, ResumeType, SkillsType, StrengthsType, WorksType } from '@/types'
import { companies, declarationDetails, techStacks, workMode } from '@/data'
import { randBoolean, randCity, randCountry, randEmail, randFullName, randNumber, randPhoneNumber, randText } from '@ngneat/falso'

const generateArray = (length = 1) => Array.from({ length }, (_, i) => i)
function generateTechStacks(divide: number = 3) {
  return [
    ...new Set(
      generateArray(randNumber({ min: 1, max: techStacks.length / divide })).map(i => techStacks[i]),
    ),
  ]
}

export const about: AboutType = {
  name: randFullName(),
  initials: randText({ charCount: 2 }).toString().toUpperCase(),
  location: {
    city: randCity(),
    country: randCountry(),
    link: 'https://maps.app.goo.gl/random',
  },
  description: 'Quae suum membra, duc venit vel limite tribus digitosque arduus ego ictu iuvenale loqui. Liberioris adclivis sunt secus e [primus monimenta](http://www.eque.com/) saxa, sic Libye moenibus inde? Deae heros est quoque umeris sua restat fert **iuste posuerunt solus**. Et licebit equos est exitium, in tacuit femineae spumantia quaerit fatalia nudum mihi pudorque. Utque barbarica **suae*gerunt, mentes quae, fatentur numen est vitae etClymene cedere erat.',
  summary: 'Natum quaerit, alebat diffusum, aera nam decimum tu. *Ab posset contraamne hastae, et videre, et posuisset prior frequentat proxima: triplici alta quid inculpata. Harundine carpit sed mundi ruricolae utrimque calathis talis sacris. A Milete ille [lucoque](http://ille-quod.io/) sed Aeacus recipit me epulae vilibus officium **parvos numina**, et nec pereat ambo, veri.',
  avatar_url: 'https://www.shutterstock.com/shutterstock/photos/1290290470/display_1500/stock-vector-isolated-object-of-avatar-and-dummy-symbol-collection-of-avatar-and-image-vector-icon-for-stock-1290290470.jpg',
  website: 'https://example.com',
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

export const educations: EducationsType = [
  ...new Set(
    generateArray(3).map(i => ({
      name: randText({ charCount: 10 }),
      degree: randText({ charCount: 10 }),
      aggregate: i === 2 ? `${randNumber({ min: 0, max: 100 })}%` : null,
      cgpa: randNumber({ min: 0, max: 10, fraction: 2 }),
      location: `${randCity()}, ${randCountry()}`,
      start: randNumber({ min: 2005, max: 2012 }),
      end: randNumber({ min: 2012, max: 2016 }),
    })),
  ),
]

export const projects: ProjectsType = [
  ...new Set(
    generateArray(5).map(() => ({
      title: randText({ charCount: 8 }),
      description: randText(),
      techStacks: generateTechStacks(),
      isClient: randBoolean(),
      company: companies[randNumber({ min: 0, max: companies.length - 1 })],
      client_country: randCountry(),
      links: [{
        type: 'mobile',
        href: 'https://example.com',
        label: randText(),
      }, {
        type: 'web',
        href: 'https://example.com',
        label: randText(),
      }],
    })),
  ),
]

export const works: WorksType = [
  ...new Set(
    generateArray(3).map(() => ({
      company: companies[randNumber({ min: 0, max: companies.length - 1 })],
      link: `https://example.com`,
      mode: [workMode[randNumber({ min: 0, max: workMode.length - 1 })]],
      position: randText({ charCount: 5 }),
      start: randNumber({ min: 2016, max: new Date().getFullYear() }),
      end: null,
      description: '● Analyzed, designed, and developed applications effectively.<br/>● Built a batch processing application leveraging `Spring Boot` Batch.<br/>● Created and executed automation tests for batch processing applications using an internal `Node.js` testing framework.<br/>● Developed and maintained `Node.js` microservices.<br/>● Provided **technical guidance*and **mentorship*to junior team members.<br/>● Lead the development of a content-based factory designed using `Node.js` and `AWS` infrastructure.',
      techStacks: generateTechStacks(),
    })),
  ),
]

export const skills: SkillsType = generateTechStacks()
export const strengths: StrengthsType = [
  ...new Set(
    generateArray(5).map(() => randText()),
  ),
]
export { declarationDetails }

export const resumeData: ResumeType = {
  about,
  educations,
  strengths,
  projects,
  skills,
  works,
}
