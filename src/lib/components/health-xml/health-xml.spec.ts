import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/svelte'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'

import HealthXml from './health-xml.svelte'
import { EMPTY_PATH, INVALID_FILENAME } from './errors'

describe('HealthXml', () => {
  const user = userEvent.setup()
  it('renders a text input and a submit button', () => {
    render(HealthXml)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Load data' })).toBeInTheDocument()
  })
  it('sets the value of the input to the "path" prop', () => {
    render(HealthXml, { path: 'path/export.xml' })
    expect(screen.getByRole('textbox')).toHaveValue('path/export.xml')
  })
  it('does not allow an empty path to be submitted', async () => {
    render(HealthXml)
    await user.click(screen.getByRole('textbox'))
    await user.paste(' ')
    expect(screen.getByRole('textbox')).toHaveValue(' ')
    await user.click(screen.getByRole('button', { name: 'Load data' }))
    expect(screen.getByText(EMPTY_PATH)).toBeInTheDocument()
  })
  it('does not allow a path that does not end with "export.xml" to be submitted', async () => {
    render(HealthXml)
    await user.click(screen.getByRole('textbox'))
    await user.paste('path/invalid.xml')
    expect(screen.getByRole('textbox')).toHaveValue('path/invalid.xml')
    await user.click(screen.getByRole('button', { name: 'Load data' }))
    expect(screen.getByText(INVALID_FILENAME)).toBeInTheDocument()
  })
})
