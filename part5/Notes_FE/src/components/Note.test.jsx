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

const renderNote = (userId, noteId) => {
  return (
    render(
      <MemoryRouter initialEntries={[`/notes/${noteId}`]}>
        <Routes>
          <Route path='/notes/:id' element={
            <Note
              notes={notes}
              userId={userId}
              eventHandlers={eventHandlers}
            />
          }/>
        </Routes>
      </MemoryRouter>
    )
  )
}

test('renders content', () => {  
  renderNote(user.id, notes[0].id) 

  const element = screen.getByText('"Component testing is done with react-testing-library"')  

  expect(element).toBeDefined()
})

test('delete button is not visible without user', () => {
  renderNote(null, notes[0].id)

  const button = screen.queryByText('Delete')  

  expect(button).toBeNull()
})

test('clicking the button calls event handler once', async () => {
  renderNote(user.id, notes[0].id) 

  const userEventSetup = userEvent.setup()
  const button = screen.getByText('Make Important')
  await userEventSetup.click(button)  

  expect(eventHandlers.updateImportance).toHaveBeenCalledTimes(1)
})