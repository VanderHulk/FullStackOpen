import { useState, useEffect } from "react"
import axios from "axios"
import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import noteService from './services/notes'

const App = () => {
  /* states */
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  /* noteService & event handler functions */
  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  const addNote = (event) => {
    event.preventDefault()

    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  const toggleImportanceOf = (id) => {    
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        //  returnedNote contains note that was changed
        setNotes(notes.map(note => note.id === id ? returnedNote : note))
      })
      .catch(error => {
        setErrorMessage(
          `Note "${note.content}" was already removed from the server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(note.filter(n => n.id !== id))
      })
  }

  //  <input onChange={} />
  const handleNoteChange = (event) =>{
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  /* other functions */
  // showAll is a state when true ? all the notes : important only  
  const notesToShow = showAll ? notes : notes.filter(note => note.important)


  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        {/* when button is clicked, showAll when false ? button label 'show important' : 'show all' */}
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? 'Important' : 'All'}
        </button>
      </div>
      <ul>
        { notesToShow.map(note => 
          <Note 
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input 
          value={newNote}
          onChange={handleNoteChange}      
        />
        <button type='submit'>Save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App