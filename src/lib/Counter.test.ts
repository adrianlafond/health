import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/svelte'
import userEvent from '@testing-library/user-event'
import { expect, test, it, describe } from 'vitest'

import Counter from './Counter.svelte'

describe('Counter', () => {
  const user = userEvent.setup()

  it('displays an initial count of 0', () => {
    render(Counter)
    expect(screen.getByRole('button', { name: 'count is 0' })).toBeVisible()
  })
  it('increments the count when button is clicked', async () => {
    render(Counter)
    await user.click(screen.getByRole('button', { name: 'count is 0' }))
    expect(screen.queryByRole('button', { name: 'count is 0' })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'count is 1' })).toBeVisible()
  })
})
