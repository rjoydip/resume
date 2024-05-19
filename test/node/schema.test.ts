import { describe, expect } from 'vitest'
import { aboutSchema, educationsSchema, keySkillsSchema, projectsSchema, skillsSchema, worksSchema } from '@/schema' // Replace with the actual file path

describe('schema', () => {
  it('aboutSchema validation', () => {
    const validData = {
      name: 'John Doe',
      initials: 'JD',
      location: 'New York',
      location_link: 'https://www.newyork.com',
      avatar_url: 'https://example.com/avatar.jpg',
      website: 'https://www.johndoe.com',
      description: 'Lorem ipsum dolor sit',
      professional_summary: 'Lorem ipsum dolor sit',
      contact: {
        email: 'john.doe@example.com',
        tel: '+1234567890',
        social: [
          {
            url: 'https://www.linkedin.com/in/johndoe',
            name: 'linkedIn',
          },
        ],
      },
    }

    expect(aboutSchema._parse(validData).issues).toBeUndefined()
  })

  it('educationsSchema validation', () => {
    const validData = [
      {
        school: 'Harvard University',
        degree: 'Bachelor of Science',
        location: 'Cambridge, MA',
        cgpa: 3.8,
        aggregate: '85%',
        start: 2012,
        end: 2016,
      },
    ]

    expect(educationsSchema._parse(validData).issues).toBeUndefined()
  })

  it('worksSchema validation', () => {
    const validData = [
      {
        company: 'Webskitters',
        position: 'Software Engineer',
        description: 'Lorem ipsum dolor sit',
        link: 'https://www.google.com/careers',
        mode: ['Hybrid', 'Office'],
        logo: 'https://example.com/google-logo.png',
        techStacks: ['instana', 'javascript'],
        start: 2018,
        end: 2021,
      },
    ]

    expect(worksSchema._parse(validData).issues).toBeUndefined()
  })

  it('skillsSchema validation', () => {
    const validData = {
      'cloud': ['aws'],
      'cross-platform': ['ionic'],
      'devOps': ['docker'],
      'database': ['mysql', 'postgresql', 'mongodb'],
      'framework': ['express', 'laravel', 'nextjs'],
      'languages': ['javascript', 'typescript'],
      'object-relational-mapping': ['mongoose', 'prisma'],
      'operating-system': ['linux', 'windows', 'mac'],
      'package-manager': ['npm', 'yarn', 'pnpm'],
      'test': ['jest', 'vitest', 'cypress'],
      'tools': ['git', 'github', 'bitbucket'],
    }

    expect(skillsSchema._parse(validData).issues).toBeUndefined()
  })

  it('projectsSchema validation', () => {
    const validData = [
      {
        title: 'Project 1',
        description: 'hello',
        techStacks: ['react', 'nodejs', 'express'],
        links: [
          {
            type: 'web',
            label: 'web',
            href: 'https://github.com/johndoe/project1',
          },
        ],
        company: 'Infosys',
        isClient: true,
        client_country: 'USA',
      },
    ]

    expect(projectsSchema._parse(validData).issues).toBeUndefined()
  })

  it('keySkillsSchema validation', () => {
    const validData = ['JavaScript', 'TypeScript', 'Node.js']

    expect(keySkillsSchema._parse(validData).issues).toBeUndefined()
  })
})
