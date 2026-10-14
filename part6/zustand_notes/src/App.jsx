import { useNoteActions } from './store/store'

import NoteList from './components/NoteList'
import NoteForm from './components/NoteForm'
import VisibilityFilter from './components/VisibilityFilter'

import { useEffect } from 'react'

const App = () => { 
  const { initialize } = useNoteActions()  

  useEffect(() => {
    initialize()
  }, [initialize])

  return (
    <div>
      <h1 className='text-pink-500 text-3xl font-bold m-5'>Note App with Zustand</h1>
      <NoteForm />
      <VisibilityFilter />
      <NoteList />
    </div>
  )
}

export default App