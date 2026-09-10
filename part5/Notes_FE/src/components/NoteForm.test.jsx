import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NoteForm from './NoteForm'

test('<NoteForm /> updates parent state and calls onSubmit', async () => {
  const addNote = vi.fn()
  const user = userEvent.setup()
  
  render(
    <MemoryRouter>
      <NoteForm createNote={addNote} />
    </MemoryRouter>
  )

  const input = screen.getByRole('textbox')
  const sendButton = screen.getByText('Save')

  await user.type(input, 'testing a form...')  
  await user.click(sendButton)

  console.log(addNote.mock.calls)
  screen.debug()

  expect(addNote).toHaveBeenCalledTimes(1)
  expect(addNote.mock.calls[0][0].content).toBe('testing a form...')
})