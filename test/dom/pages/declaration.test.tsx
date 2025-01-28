import { Declaration } from '@/components/pages/declaration'
import { render, screen } from '@testing-library/react'
import * as React from 'react'
import { beforeAll, describe, expect, it } from 'vitest'
import { about } from '../../../fixtures/data'

describe('<Strengths />', () => {
  let strengths: { location: string, name: string }

  beforeAll(async () => {
    strengths = {
      location: about.location.city,
      name: about.name,
    }
    await render(<Declaration shouldShow location={strengths.location} name={strengths.name} />)
  })

  it('should validate declaration title', () => {
    const title = screen.getByTestId('declaration_title')
    expect(title.textContent?.toLowerCase()).toBe('declaration')
  })

  it('should validate declaration text', () => {
    const text = screen.getByTestId('declaration_text')
    expect(text.textContent).toBeDefined()
  })

  it('should validate declaration details', () => {
    const location = screen.getByTestId('declaration_location')
    const date = screen.getByTestId('declaration_date')
    const name = screen.getByTestId('declaration_name')

    expect(location.textContent).toBe(`Location: ${strengths.location}`)
    expect(date.textContent).toBe(`Date: ${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`)
    expect(name.textContent).toBe(`Name: ${strengths.name}`)
  })
})
