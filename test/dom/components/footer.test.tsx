import Footer from '@/components/footer'
import { render, screen, waitFor } from '@testing-library/react'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import { TQProvider } from '../../_shared/test-provider'
import { today } from '../../_shared/test-utils'
import { declarationDetails } from '../../fixtures/data.fixture'

vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual('@tanstack/react-query')
  return {
    ...actual,
    useSuspenseQuery: vi.fn(() => ({
      isPending: false,
      data: { ...declarationDetails, date: `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}` },
    })),
  }
})

describe('<Footer />', () => {
  beforeAll(async () => {
    render(
      <TQProvider>
        <Footer />
      </TQProvider>,
    )
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
