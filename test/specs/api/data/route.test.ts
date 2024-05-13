import axios from 'axios'
import { describe, expect, it } from 'vitest'
import { apiURL } from 'test/constant'
import type { AboutType, EducationsType, KeySkillsType, ProjectsType, SkillsType, WorksType } from '@/types'

const dataEndpoint = `${apiURL}/data`

describe('should validate data routes', () => {
  it('should validate valid routes \'/about\'', async () => {
    const { status, data }: { status: number, data: AboutType } = await axios.get(`${dataEndpoint}/about`)
    expect(status).toEqual(200)
    expect(data).toBeDefined()
    expect(data).toHaveProperty('name', 'John Doe')
    expect(data).toHaveProperty('initials', 'JD')
    expect(data).toHaveProperty('location_link')
    expect(data).toHaveProperty('description')
    expect(data).toHaveProperty('professional_summary')
    expect(data).toHaveProperty('avatar_url')
    expect(data).toHaveProperty('website')
    expect(data).toHaveProperty('contact')
    expect(data.contact).toHaveProperty('email')
    expect(data.contact).toHaveProperty('tel')
    expect(data.contact).toHaveProperty('social')
    expect(data.contact.social).toBeTypeOf('object')
    expect(data.contact.social).toBeTypeOf('object')
    data.contact.social.forEach((s) => {
      expect(s).toHaveProperty('name')
      expect(s).toHaveProperty('url')
    })
  })

  it('should validate valid routes \'/educations\'', async () => {
    const { status, data }: { status: number, data: EducationsType } = await axios.get(`${dataEndpoint}/educations`)
    expect(status).toEqual(200)
    expect(data).toBeDefined()
    data.forEach((e) => {
      expect(e).toHaveProperty('school')
      expect(e).toHaveProperty('degree')
      expect(e).toHaveProperty('aggregate')
      expect(e).toHaveProperty('cgpa')
      expect(e).toHaveProperty('location')
      expect(e).toHaveProperty('start')
      expect(e.start).toBeTypeOf('number')
      expect(e).toHaveProperty('end')
      expect(e.end).toBeTypeOf('number')
    })
  })

  it('should validate valid routes \'/key-skills\'', async () => {
    const { status, data }: { status: number, data: KeySkillsType } = await axios.get(`${dataEndpoint}/key-skills/`)
    expect(status).toEqual(200)
    expect(data).toBeDefined()
    expect(data.length).toEqual(5)
    expect(data[0]).toStrictEqual('foo')
    expect(data[data.length - 1]).toStrictEqual('baz_baz')
  })

  it('should validate valid routes \'/projects\'', async () => {
    const { status, data }: { status: number, data: ProjectsType } = await axios.get(`${dataEndpoint}/projects`)
    expect(status).toEqual(200)
    expect(data).toBeDefined()
    expect(data.length).toEqual(5)
    data.forEach((p) => {
      expect(p).toHaveProperty('title')
      expect(p).toHaveProperty('description')
      expect(p).toHaveProperty('techStacks')
      expect(p.techStacks).toBeTypeOf('object')
      expect(p.techStacks).toBeDefined()
      if (p.links) {
        expect(p).toHaveProperty('links')
        expect(p.links).toBeTypeOf('object')
        p.links.forEach((l) => {
          expect(l).toHaveProperty('type')
          expect(l).toHaveProperty('label')
          expect(l).toHaveProperty('href')
        })
      }
      expect(p).toHaveProperty('company')
    })
  })

  it('should validate valid routes \'/skills\'', async () => {
    const { status, data }: { status: number, data: SkillsType } = await axios.get(`${dataEndpoint}/skills`)
    expect(status).toEqual(200)
    expect(data).toBeDefined()
    expect(data).toHaveProperty('cloud')
    expect(data.cloud).toStrictEqual(['a', 'b'])
    expect(data).toHaveProperty('cross-platform')
    expect(data['cross-platform']).toStrictEqual(['c', 'd'])
    expect(data).toHaveProperty('devOps')
    expect(data.devOps).toStrictEqual(['e', 'f'])
    expect(data).toHaveProperty('database')
    expect(data.database).toStrictEqual(['g', 'h', 'i'])
    expect(data).toHaveProperty('framework')
    expect(data.framework).toStrictEqual([
      'j',
      'k',
    ])
    expect(data).toHaveProperty('languages')
    expect(data.languages).toStrictEqual([
      'm',
      'n',
    ])
    expect(data).toHaveProperty('object-relational-mapping')
    expect(data['object-relational-mapping']).toStrictEqual(['o', 'p'])
    expect(data).toHaveProperty('operating-system')
    expect(data['operating-system']).toStrictEqual(['q', 'r', 's'])
    expect(data).toHaveProperty('package-manager')
    expect(data['package-manager']).toStrictEqual(['t', 'u', 'v'])
    expect(data).toHaveProperty('test')
    expect(data.test).toStrictEqual(['w', 'x', 'y', 'z', 'aa'])
    expect(data).toHaveProperty('tools')
    expect(data.tools).toStrictEqual([
      'bb',
      'cc',
      'dd',
      'ee',
    ])
  })
  it('should validate valid routes \'/works\'', async () => {
    const { status, data }: { status: number, data: WorksType } = await axios.get(`${dataEndpoint}/works`)
    expect(status).toEqual(200)
    expect(data).toBeDefined()
    expect(data.length).toEqual(3)
    data.forEach((work) => {
      expect(work).toHaveProperty('company')
      expect(work.company).toBeTypeOf('string')
      expect(work).toHaveProperty('link')
      expect(work.link).toBeTypeOf('string')
      expect(work).toHaveProperty('mode')
      expect(work.mode).toBeTypeOf('object')
      expect(work).toHaveProperty('position')
      expect(work.position).toBeTypeOf('string')
      expect(work).toHaveProperty('logo')
      expect(work).toHaveProperty('start')
      expect(work).toHaveProperty('end')
      expect(work).toHaveProperty('description')
      expect(work).toHaveProperty('techStacks')
      expect(work.techStacks).toBeTypeOf('object')
    })
  })
})
