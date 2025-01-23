import type { KeySkillsType } from '@/types'
import { KeySkills } from '@/components/pages/keySkills'
import { render, screen, within } from '@testing-library/react'
import * as React from 'react'
import { beforeAll, describe, expect, it } from 'vitest'
import { keySkills as keySkillsFixture } from '../../../fixtures/data'

describe('<KeySkills />', () => {
  let keySkills: KeySkillsType

  beforeAll(async () => {
    keySkills = keySkillsFixture
    await render(<KeySkills data={keySkills} />)
  })

  it('should validate key skills title', () => {
    const ksTitle = screen.getByTestId('key_skills_title')
    expect(ksTitle.textContent).toBe('Key Skills')
  })

  it('should validate key skills list', () => {
    const ksTitle = screen.getByTestId('key_skills_list')
    const { queryByText } = within(ksTitle)
    expect(ksTitle.children).toHaveLength(5)
    keySkills.forEach((sk) => {
      expect(queryByText(sk)?.textContent).toBeDefined()
    })
  })
})
