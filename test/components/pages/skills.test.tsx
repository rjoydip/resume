import { getTestFixturesAsync } from 'test/test-utils'
import { beforeAll, describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import humanizeString from 'humanize-string'
import type { SkillsType } from '@/types'
import { Skills } from '@/components/pages'

describe('<Skills />', () => {
  let container: HTMLElement
  let skills: SkillsType
  beforeAll(async () => {
    skills = await getTestFixturesAsync('skills')
    const render$ = await render(<Skills data={skills} />)
    container = render$.container
  })
  it('should validate skill title', async () => {
    const ksTitle = screen.getByTestId('skills_title')
    expect(ksTitle.textContent).toBe('Skills')
  })
  it('should validate skill list', async () => {
    expect(
      container.querySelector('[data-testid=\'skills_list\'] > li'),
    ).toBeDefined()
  })
  describe('should validate projects items', async () => {
    const skills = await getTestFixturesAsync('skills')
    Object.keys(skills).forEach((key, index) => {
      it('should validate skill list', async () => {
        expect(
          container.querySelector(
            `[data-testid='skills_list'] > li:nth-child(${index + 1}) > div > p`,
          )?.textContent,
        ).toContain(humanizeString(key))

        expect(
          container.querySelector(
              `[data-testid='skills_list'] > li:nth-child(${index + 1}) > div > span`,
          )?.textContent,
        ).toBeDefined()
      })
    })
  })
})
