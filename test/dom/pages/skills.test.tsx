import type { SkillsType } from '@/types'
import { Skills } from '@/components/pages/skills'
import { render, screen } from '@testing-library/react'
import * as React from 'react'
import { beforeAll, describe, expect, it } from 'vitest'
import { skills as skillsFixture } from '../../mocks/fixtures'

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
  it('should validate skill', async () => {
    expect(
      container.querySelector('[data-testid=\'skills_list\'] > div'),
    ).toBeDefined()
  })
})
