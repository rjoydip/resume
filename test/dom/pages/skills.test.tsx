import { render, screen } from '@testing-library/react'
import * as React from 'react'
import titleize from 'titleize'
import { beforeAll, describe, expect, it } from 'vitest'
import { skills as skillsFixture } from '../../mocks/fixtures'
import { Skills } from '@/components/pages'
import type { SkillsType } from '@/types'

describe('<Skills />', () => {
  let container: HTMLElement
  let skills: SkillsType
  beforeAll(async () => {
    skills = skillsFixture
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
    const skills = skillsFixture
    Object.keys(skills).forEach((key, index) => {
      it('should validate skill list', async () => {
        expect(
          container.querySelector(
            `[data-testid='skills_list'] > li:nth-child(${index + 1}) > p`,
          )?.textContent,
        ).toContain(titleize(key))
      })
    })
  })
})
