import Projects from '@/components/modules/projects'
import { useSuspenseQuery } from '@tanstack/react-query'
import { render, screen, waitFor } from '@testing-library/react'
import * as React from 'react'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import { TQProvider } from '../../../_shared/test-provider'
import { projects } from '../../../fixtures/data.fixture'

vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual('@tanstack/react-query')
  return {
    ...actual,
    useSuspenseQuery: vi.fn(() => ({
      isPending: false,
      data: projects,
    })),
  }
})

describe('<Projects />', () => {
  let container: HTMLElement
  beforeAll(async () => {
    const render$ = await render(
      <TQProvider>
        <Projects />
      </TQProvider>,
    )
    container = render$.container
  })

  it('should validate project title', async () => {
    await waitFor(() => {
      expect(screen.getByTestId('projects_title').textContent?.toLowerCase()).toBe('projects')
    })
  })

  describe('should validate projects items', async () => {
    projects.forEach((p, index) => {
      it('should validate title', async () => {
        await waitFor(() => {
          expect(screen.getByTestId(`project_title_index_${index}`).textContent).toBe(p.title)
        })
      })
      it('should validate description', async () => {
        await waitFor(() => {
          expect(screen.getByTestId(`project_description_index_${index}`).textContent).toBe(p.description)
        })
      })
      if (p.isClient) {
        it('should validate client', async () => {
          await waitFor(() => {
            expect(screen.getByTestId(`project_client_index_${index}`).textContent).toBe(
              `Client: ${p.isClient ? 'Yes' : 'No'} ${
                p.client_country ? `(${p.client_country})` : ''
              }`,
            )
          })
        })
      }
      if (p.links && !!p.links.length) {
        it('should validate links', async () => {
          await waitFor(() => {
            expect(screen.getByTestId(`project_links_index_${index}`).textContent).toContain('Links:')
          })
          /* p.links &&
            p.links.map((link) => {
              expect(
                screen.getByTestId(`project_links_index_${index}`).closest("a")
                  ?.href,
              ).toBe(link.href);
            }); */
        })
      }
      it('should validate company', async () => {
        await waitFor(() => {
          expect(screen.getByTestId(`project_company_index_${index}`).textContent).toBe(`Company: ${p.company}`)
        })
      })
      if (p.techStacks && p.techStacks.length) {
        it('should validate tech stacks', async () => {
          await waitFor(() => {
            expect(
              container.querySelector(
                `[data-testid="project_tech_stacks_index_${index}"] > div`,
              ),
            ).toBeDefined()
            expect(container.querySelector(
              `[data-testid="project_tech_stacks_index_${index}"] > div`,
            )?.nodeType).toBeTruthy()
          })
        })
      }
    })
  })

  it('should render skeleton when data is pending', () => {
    vi.mocked(useSuspenseQuery).mockReturnValue({
      isPending: true,
      data: undefined,
      isError: false,
      error: null,
    } as any)

    render(
      <TQProvider>
        <Projects />
      </TQProvider>,
    )

    expect(screen.getByTestId('projects_skeleton')).toBeInTheDocument()
  })
})
