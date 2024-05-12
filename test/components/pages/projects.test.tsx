import * as React from 'react'
import { beforeAll, describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { getTestFixturesAsync } from '../../utils/test.unit'
import { Projects } from '@/components/pages'
import type { ProjectsType } from '@/types'

describe('<Projects />', () => {
  let container: HTMLElement
  beforeAll(async () => {
    const projects: ProjectsType = await getTestFixturesAsync('projects')
    const render$ = await render(<Projects data={projects} />)
    container = render$.container
  })
  it('should validate project title', async () => {
    const ksTitle = screen.getByTestId('project_title')
    expect(ksTitle.textContent).toBe('Projects')
  })
  describe('should validate projects items', async () => {
    const projects: ProjectsType = await getTestFixturesAsync('projects')
    projects.forEach((p, index) => {
      it('should validate title', () => {
        const ele = screen.getByTestId(`project_title_index_${index}`)
        expect(ele.textContent).toBeDefined()
        expect(ele.textContent).toBe(p.title)
      })
      it('should validate description', () => {
        const ele = screen.getByTestId(`project_description_index_${index}`)
        expect(ele.textContent).toBeDefined()
        expect(ele.textContent).toBe(p.description)
      })
      if (p.isClient) {
        it('should validate client', () => {
          const ele = screen.getByTestId(`project_client_index_${index}`)
          expect(ele.textContent).toBeDefined()
          expect(ele.textContent).toBe(
            `Client: ${p.isClient ? 'Yes' : 'No'} ${
              p.client_country ? `(${p.client_country})` : ''
            }`,
          )
        })
      }
      if (p.links && !!p.links.length) {
        it('should validate links', () => {
          const ele = screen.getByTestId(`project_links_index_${index}`)
          expect(ele.textContent).toBeDefined()
          expect(ele.textContent).toContain('Links:')
          /* p.links &&
            p.links.map((link) => {
              expect(
                screen.getByTestId(`project_links_index_${index}`).closest("a")
                  ?.href,
              ).toBe(link.href);
            }); */
        })
      }
      it('should validate company', () => {
        const ele = screen.getByTestId(`project_company_index_${index}`)
        expect(ele.textContent).toBeDefined()
        expect(ele.textContent).toBe(`Company: ${p.company}`)
      })
      if (p.techStacks && p.techStacks.length) {
        it('should validate tech stacks', async () => {
          const ele = screen.getByTestId(`project_tech_stacks_index_${index}`)
          expect(ele.textContent).toBeDefined()
          expect(ele.textContent).toContain('Technology:')
          expect(
            container.querySelector(
              `[data-testid="project_tech_stacks_index_${index}"] > div`,
            ),
          ).toBeDefined()
          expect(container.querySelector(
            `[data-testid="project_tech_stacks_index_${index}"] > div`,
          )?.nodeType).toBeTruthy()
        })
      }
    })
  })
})
