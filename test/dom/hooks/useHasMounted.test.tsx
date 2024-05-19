import React from 'react'
import { expect, it } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import useHasMounted from '@/hooks/useHasMounted'

it('useHasMounted does not change after component state update without re-render', async () => {
  const Component = () => {
    const hasMounted = useHasMounted()
    return <div>{hasMounted.toString()}</div>
  }

  render(<Component />)

  // Wait for the component to mount
  await waitFor(() => {
    expect(screen.getByText('true')).toBeTruthy()
  })

  // Simulate a state update without re-render
  fireEvent.click(screen.getByText('true'))

  // Wait for the component to not change
  await waitFor(() => {
    expect(screen.getByText('true')).toBeTruthy()
  })
})
