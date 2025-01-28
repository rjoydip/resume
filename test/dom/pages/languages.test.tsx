import type { LanguagesType } from '@/types'
import { Languages } from '@/components/pages/languages'
import { languages as languagesFixtures } from '@/data'
import { render, screen, within } from '@testing-library/react'
import * as React from 'react'
import { beforeAll, describe, expect, it } from 'vitest'

describe('<Languages />', () => {
  let languages: LanguagesType[]

  beforeAll(async () => {
    languages = languagesFixtures
    await render(<Languages data={languages} />)
  })

  it('should validate language_title', () => {
    const title = screen.getByTestId('language_title')
    expect(title.textContent?.toLowerCase()).toBe('languages')
  })

  it('should validate language list', () => {
    const title = screen.getByTestId('language_list')
    const { queryByText } = within(title)
    expect(title.children).toHaveLength(2)
    languages.forEach((t) => {
      expect(queryByText(t.name)?.textContent).toBeDefined()
    })
  })
})
