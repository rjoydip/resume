import { languages } from '@/data/index'
import { aboutSchema, educationsSchema, languagesSchema, projectsSchema, skillsSchema, strengthsSchema, worksSchema } from '@/schema'
import { describe, expect, it } from 'vitest'

describe('schema validation', () => {
  it('about schema', () => {
    const validData = {
      name: 'John Doe',
      initials: 'JD',
      location: {
        city: 'New York',
        country: 'USA',
        link: 'https://maps.app.goo.gl/random',
      },
      avatar_url: 'https://example.com/avatar.jpg',
      website: 'https://www.johndoe.com',
      description: 'Lorem ipsum dolor sit',
      summary: 'Lorem ipsum dolor sit',
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

  it('educations schema', () => {
    const validData = [
      {
        name: 'Harvard University',
        degree: 'Bachelor of Science',
        location: 'Cambridge, MA',
        cgpa: 3.8,
        aggregate: '85%',
        start: 2012,
        end: 2016,
      },
    ]

    expect(educationsSchema._parse(validData).output).toBeDefined()
    expect(educationsSchema._parse(validData).issues).toBeUndefined()
  })

  it('works schema', () => {
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

    expect(worksSchema._parse(validData).output).toBeDefined()
    expect(worksSchema._parse(validData).issues).toBeUndefined()
  })

  it('skills schema', () => {
    const validData = ['aws', 'docker', 'mysql', 'postgresql', 'mongodb', 'express', 'laravel', 'nextjs', 'javascript', 'typescript', 'jest', 'vitest', 'cypress', 'git', 'github', 'bitbucket']

    expect(skillsSchema._parse(validData).output).toBeDefined()
    expect(skillsSchema._parse(validData).issues).toBeUndefined()
  })

  it('projects schema', () => {
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

    expect(projectsSchema._parse(validData).output).toBeDefined()
    expect(projectsSchema._parse(validData).issues).toBeUndefined()
  })

  it('strengths schema', () => {
    const validData = ['JavaScript', 'TypeScript', 'Node.js']

    expect(strengthsSchema._parse(validData).output).toBeDefined()
    expect(strengthsSchema._parse(validData).issues).toBeUndefined()
  })

  it('languages schema', () => {
    expect(languagesSchema._parse(languages[0]).output).toBeDefined()
    expect(languagesSchema._parse(languages[0]).issues).toBeUndefined()
  })
})
