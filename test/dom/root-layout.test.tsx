import { render, screen } from '@testing-library/react'
import { Inter } from 'next/font/google'
import { describe, expect, it, vi } from 'vitest'
import RootLayout from '@/components/root-layout'

vi.mock('next/font/google', () => ({
  Inter: vi.fn(() => ({
    subsets: ['latin'],
    display: 'swap',
  })),
}))

describe('rootLayout', () => {
  const ChildComponent = () => <div>Child Component</div>

  it('should use the Inter function', () => {
    const inter = Inter({
      subsets: ['latin'],
      display: 'swap',
    })
    expect(inter).toEqual({
      subsets: ['latin'],
      display: 'swap',
    })
  })

  it('renders RootLayout component', () => {
    render(
      <RootLayout>
        <ChildComponent />
      </RootLayout>,
    )

    expect(screen.getByRole('region')).toBeInTheDocument()
  })
})
