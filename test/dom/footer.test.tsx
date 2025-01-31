import { Footer } from '@/components/footer'
import { render, screen, waitFor } from '@testing-library/react'
import { beforeAll, describe, expect, it } from 'vitest'
import { declarationDetails } from '../../fixtures/data'
import { today } from '../_shared/test-utils'

describe('<Footer />', () => {
  beforeAll(async () => {
    render(<Footer />)
  })

  it('should validate ©', async () => {
    await waitFor(() => expect(screen.findByText('©')).toBeDefined())
  })

  it('should validate year', async () => {
    await waitFor(() => expect(screen.findByText(today.getFullYear())).toBeDefined())
  })

  it('should validate name', async () => {
    await waitFor(() => expect(screen.findByText(declarationDetails.name)).toBeDefined())
  })
})
