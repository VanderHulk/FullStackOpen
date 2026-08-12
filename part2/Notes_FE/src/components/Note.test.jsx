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

test('renders content', () => {
  render(
    <Note 
      notes={notes}
      user={user}
      eventHandlers={eventHandlers}
    />
  )  

  const element = screen.getByText('Component testing is done with react-testing-library')

  // shows the rendered component
  screen.debug(element) 

  expect(element).toBeDefined()
})

test('delete button is not visible without user', () => {
  render(
    <Note
      notes={notes}
      user={null}
      eventHandlers={eventHandlers}
    />  
  )

  const button = screen.queryByText('🗑️')

  screen.debug()

  expect(button).toBeNull()
})

test('clicking the button calls event handler once', async () => {
  const updateImportance = vi.fn()
  const deleteANote = vi.fn()

  render(
    <Note 
      notes={notes}
      user={user}
      eventHandlers={{      
        updateImportance,
        deleteANote
      }}
    />
  )

  const userEventSetup = userEvent.setup()
  const button = screen.getByText('📌')
  await userEventSetup.click(button)  

  expect(updateImportance).toHaveBeenCalledTimes(1)
})