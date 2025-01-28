import type { StrengthsType } from '@/types'
import { Strengths } from '@/components/pages/strengths'
import { render, screen, within } from '@testing-library/react'
import * as React from 'react'
import { beforeAll, describe, expect, it } from 'vitest'
import { strengths as strengthsFixture } from '../../../fixtures/data'

describe('<Strengths />', () => {
  let strengths: StrengthsType

  beforeAll(async () => {
    strengths = strengthsFixture
    await render(<Strengths data={strengths} />)
  })

  it('should validate strengths title', () => {
    const title = screen.getByTestId('strengths_title')
    expect(title.textContent?.toLowerCase()).toBe('strengths')
  })

  it('should validate strengths list', () => {
    const title = screen.getByTestId('strengths_list')
    const { queryByText } = within(title)
    expect(title.children).toHaveLength(5)
    strengths.forEach((t) => {
      expect(queryByText(t)?.textContent).toBeDefined()
    })
  })
})
