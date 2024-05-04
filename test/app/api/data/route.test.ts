import axios from 'axios'
import { describe, it, expect } from 'vitest'
import type { AboutType, EducationsType, KeySkillsType, ProjectsType, SkillsType, WorksType } from '@/types'

const dataEndpoint = '/api/data'

describe('should validate data routes', () => {
  it('should validate valid routes \'/about\'', async () => {
    const { status, data }: { status: number, data: { value: AboutType } } = await axios.get(`${dataEndpoint}/about`)
    const { value } = data
    expect(status).toEqual(200)
    expect(value).toBeDefined()
    expect(value).toHaveProperty('name', 'John Doe')
    expect(value).toHaveProperty('initials', 'JD')
    expect(value).toHaveProperty('location_link')
    expect(value).toHaveProperty('description')
    expect(value).toHaveProperty('professional_summary')
    expect(value).toHaveProperty('avatar_url')
    expect(value).toHaveProperty('website')
    expect(value).toHaveProperty('contact')
    expect(value.contact).toHaveProperty('email')
    expect(value.contact).toHaveProperty('tel')
    expect(value.contact).toHaveProperty('social')
    expect(value.contact.social).toBeTypeOf('object')
    expect(value.contact.social).toBeTypeOf('object')
    value.contact.social.forEach((s) => {
      expect(s).toHaveProperty('name')
      expect(s).toHaveProperty('url')
    })
  })

  it('should validate valid routes \'/educations\'', async () => {
    const { status, data }: { status: number, data: { value: EducationsType } } = await axios.get(`${dataEndpoint}/educations`)
    const { value } = data
    expect(status).toEqual(200)
    expect(value).toBeDefined()
    value.forEach((e) => {
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
    const { status, data }: { status: number, data: { value: KeySkillsType } } = await axios.get(`${dataEndpoint}/key-skills/`)
    const { value } = data
    expect(status).toEqual(200)
    expect(value).toBeDefined()
    expect(value.length).toEqual(5)
    expect(value[0]).toStrictEqual('foo')
    expect(value[value.length - 1]).toStrictEqual('baz_baz')
  })

  it('should validate valid routes \'/projects\'', async () => {
    const { status, data }: { status: number, data: { value: ProjectsType } } = await axios.get(`${dataEndpoint}/projects`)
    const { value } = data
    expect(status).toEqual(200)
    expect(value).toBeDefined()
    expect(value.length).toEqual(5)
    value.forEach((p) => {
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
    const { status, data }: { status: number, data: { value: SkillsType } } = await axios.get(`${dataEndpoint}/skills`)
    const { value } = data
    expect(status).toEqual(200)
    expect(value).toBeDefined()
    expect(value).toHaveProperty('cloud')
    expect(value.cloud).toStrictEqual(['a', 'b'])
    expect(value).toHaveProperty('cross-platform')
    expect(value['cross-platform']).toStrictEqual(['c', 'd'])
    expect(value).toHaveProperty('devOps')
    expect(value.devOps).toStrictEqual(['e', 'f'])
    expect(value).toHaveProperty('database')
    expect(value.database).toStrictEqual(['g', 'h', 'i'])
    expect(value).toHaveProperty('framework')
    expect(value.framework).toStrictEqual([
      'j',
      'k',
    ])
    expect(value).toHaveProperty('languages')
    expect(value.languages).toStrictEqual([
      'm',
      'n',
    ])
    expect(value).toHaveProperty('object-relational-mapping')
    expect(value['object-relational-mapping']).toStrictEqual(['o', 'p'])
    expect(value).toHaveProperty('operating-system')
    expect(value['operating-system']).toStrictEqual(['q', 'r', 's'])
    expect(value).toHaveProperty('package-manager')
    expect(value['package-manager']).toStrictEqual(['t', 'u', 'v'])
    expect(value).toHaveProperty('test')
    expect(value.test).toStrictEqual(['w', 'x', 'y', 'z', 'aa'])
    expect(value).toHaveProperty('tools')
    expect(value.tools).toStrictEqual([
      'bb',
      'cc',
      'dd',
      'ee',
    ])
  })
  it('should validate valid routes \'/works\'', async () => {
    const { status, data }: { status: number, data: { value: WorksType } } = await axios.get(`${dataEndpoint}/works`)
    const { value } = data
    expect(status).toEqual(200)
    expect(value).toBeDefined()
    expect(value.length).toEqual(3)
    value.forEach((work) => {
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
