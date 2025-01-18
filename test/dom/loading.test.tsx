import Loading from '@/components/loading' // Replace with the actual file path
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

describe('loading', () => {
  afterEach(() => {
    cleanup()
  })

  it('renders Loading component', () => {
    render(<Loading />)
    expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument()
  })

  it('applies custom className to Skeleton component', () => {
    const customClassName = 'custom-loading'
    render(<Loading className={customClassName} />)
    expect(screen.getByTestId('loading-skeleton')).toHaveClass(customClassName)
  })
})
