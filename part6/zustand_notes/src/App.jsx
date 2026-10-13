import { useNoteActions } from './store/store'

import NoteList from './components/NoteList'
import NoteForm from './components/NoteForm'
import VisibilityFilter from './components/VisibilityFilter'

import noteService from './services/notes'

import { useEffect } from 'react'

const App = () => { 
  const { initialize } = useNoteActions()

  const { add } = useNoteActions()

  const generateId = () => Number((Math.random() * 1000000).toFixed(0))

  useEffect(() => {
    noteService.getAll().then(notes => initialize(notes))
  }, [initialize])

  const addNote = (e) => {
    e.preventDefault()

    const content = e.target.note.value

    if (content !== '') {
      add({ id: generateId(), content, important: false })
    }

    e.target.reset()
  }

  return (
    <div>
      <h1 className='text-pink-500 text-3xl font-bold m-5'>Note App with Zustand</h1>
      <NoteForm onSubmit={addNote} />
      <VisibilityFilter />
      <NoteList />
    </div>
  )
}

export default App