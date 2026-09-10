import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Note from './Note'

const user = {
  username: 'testUser',
  name: 'Jester Koe',
  id: 'JK1357'
}

const notes = [
  {
    id: 'note-001',
    content: 'Component testing is done with react-testing-library',
    important: false,
    user: 'JK1357'
  }
]

const eventHandlers = {
  updateImportance: vi.fn(),
  deleteANote: vi.fn()
}

const renderNote = (note, user) => {  
  return (
    render(
      <MemoryRouter initialEntries={[`/notes/${note.id}`]}>
        <Routes>
          <Route path='/notes/:id' element={
            user && <Note
              note={note}
              userId={user.id}
              eventHandlers={eventHandlers}
            />
          }/>
        </Routes>
      </MemoryRouter>
    )
  )
}

test('renders content', () => {  
  renderNote(notes[0], user)  

  const element = screen.getByText('"Component testing is done with react-testing-library"')

  expect(element).toBeDefined()
})

test('delete button is not visible without user', () => {
  renderNote(notes[0], null)

  const button = screen.queryByText('Delete')  

  expect(button).toBeNull()
})

test('clicking the button calls event handler once', async () => {
  renderNote(notes[0], user) 

  const userEventSetup = userEvent.setup()
  const button = screen.getByText('Make Important')
  await userEventSetup.click(button)  

  expect(eventHandlers.updateImportance).toHaveBeenCalledTimes(1)
})