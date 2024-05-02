import type { AboutType, EducationsType, KeySkillsType, ProjectsType, SkillsType, WorksType } from '@/types'

const dataEndpoint = '/api/data'

describe('should validate data routes', () => {
  it('should validate valid routes \'/about\'', () => {
    cy.request(`${dataEndpoint}/about/`).then((response: { status: number, body: AboutType }) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.be.not.empty
      expect(response.body).to.have.property('name', 'Joydip Roy')
      expect(response.body).to.have.property('initials', 'JR')
      expect(response.body).to.have.property('location_link')
      expect(response.body).to.have.property('description')
      expect(response.body).to.have.property('professional_summary')
      expect(response.body).to.have.property('avatar_url')
      expect(response.body).to.have.property('website')
      expect(response.body).to.have.property('contact')
      expect(response.body.contact).to.have.property('email')
      expect(response.body.contact).to.have.property('tel')
      expect(response.body.contact).to.have.property('social')
      expect(response.body.contact.social).to.be.an('array')
      expect(response.body.contact.social).to.be.an('array')
      response.body.contact.social.forEach((s) => {
        expect(s).to.have.property('name')
        expect(s).to.have.property('url')
      })
    })
  })

  it('should validate valid routes \'/education\'', () => {
    cy.request(`${dataEndpoint}/educations/`).then((response: { status: number, body: EducationsType }) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.be.not.empty
      response.body.forEach((e) => {
        expect(e).to.have.property('school')
        expect(e).to.have.property('degree')
        expect(e).to.have.property('aggregate')
        expect(e).to.have.property('cgpa')
        expect(e).to.have.property('location')
        expect(e).to.have.property('start')
        expect(e.start).to.be.a('number')
        expect(e).to.have.property('end')
        expect(e.end).to.be.a('number')
      })
    })
  })

  it('should validate valid routes \'/key_skills\'', () => {
    cy.request(`${dataEndpoint}/key-skills/`).then((response: { status: number, body: KeySkillsType }) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.be.not.empty
      expect(response.body).to.have.lengthOf(7)
      expect(response.body[0]).to.be.eq('Full Stack Development')
      expect(response.body[response.body.length - 1]).to.be.eq('Node.js')
    })
  })

  it('should validate valid routes \'/projects\'', () => {
    cy.request(`${dataEndpoint}/projects/`).then((response: { status: number, body: ProjectsType }) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.be.not.empty
      expect(response.body).to.have.lengthOf(12)
      response.body.forEach((p) => {
        expect(p).to.have.property('title')
        expect(p).to.have.property('description')
        expect(p).to.have.property('techStacks')
        expect(p.techStacks).to.be.an('array')
        expect(p.techStacks).to.not.be.empty
        if (p.links) {
          expect(p).to.have.property('links')
          expect(p.links).to.be.an('array')
          p.links.forEach((l) => {
            expect(l).to.have.property('type')
            expect(l).to.have.property('label')
            expect(l).to.have.property('href')
          })
        }
        expect(p).to.have.property('company')
      })
    })
  })

  it('should validate valid routes \'/skills\'', () => {
    cy.request(`${dataEndpoint}/skills/`).then((response: { status: number, body: SkillsType }) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.be.not.empty
      expect(response.body).to.have.property('cloud')
      expect(response.body.cloud).to.be.eql(['vercel', 'aws'])
      expect(response.body).to.have.property('cross-platform')
      expect(response.body['cross-platform']).to.be.eql(['ionic', 'electron'])
      expect(response.body).to.have.property('devOps')
      expect(response.body.devOps).to.be.eql(['docker', 'jenkins'])
      expect(response.body).to.have.property('database')
      expect(response.body.database).to.be.eql(['mongodb', 'postgresql', 'mysql'])
      expect(response.body).to.have.property('framework')
      expect(response.body.framework).to.be.eql([
        'angular',
        'fastify',
        'react',
        'nextjs',
      ])
      expect(response.body).to.have.property('languages')
      expect(response.body.languages).to.be.eql([
        'javascript',
        'typescript',
        'nodejs',
        'deno',
        'bun',
      ])
      expect(response.body).to.have.property('object-relational-mapping')
      expect(response.body['object-relational-mapping']).to.be.eql(['prisma', 'mongoose'])
      expect(response.body).to.have.property('operating-system')
      expect(response.body['operating-system']).to.be.eql(['linux', 'mac', 'windows'])
      expect(response.body).to.have.property('package-manager')
      expect(response.body['package-manager']).to.be.eql(['pnpm', 'npm', 'yarn'])
      expect(response.body).to.have.property('test')
      expect(response.body.test).to.be.eql(['cucumber', 'jest', 'vitest', 'cypress', 'playwright'])
      expect(response.body).to.have.property('tools')
      expect(response.body.tools).to.be.eql([
        'postman',
        'jira',
        'graphql',
        'kafka',
        'bitbucket',
        'git',
        'github',
        'gitlab',
        'github-actions',
        'snyk',
        'instana',
      ])
    })
  })
  it('should validate valid routes \'/works\'', () => {
    cy.request(`${dataEndpoint}/works/`).then((response: { status: number, body: WorksType }) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.be.not.empty
      expect(response.body).to.have.lengthOf(4)
      response.body.forEach((work) => {
        expect(work).to.have.property('company')
        expect(work.company).to.be.an('string')
        expect(work).to.have.property('link')
        expect(work.link).to.be.an('string')
        expect(work).to.have.property('mode')
        expect(work.mode).to.be.an('array')
        expect(work).to.have.property('position')
        expect(work.position).to.be.an('string')
        expect(work).to.have.property('logo')
        expect(work).to.have.property('start')
        expect(work).to.have.property('end')
        expect(work).to.have.property('description')
        expect(work).to.have.property('techStacks')
        expect(work.techStacks).to.be.an('array')
      })
    })
  })
})
