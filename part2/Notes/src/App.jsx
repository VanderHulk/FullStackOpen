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
  const [selectedId, setSelectedId] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  /* noteService & event handler functions */
  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        // CHANGED        
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

  const updateImportance = () => {   
    const note = notes.find(n => n.id === selectedId)    
    const changedNote = { ...note, important: !note.important }
    
    noteService
      .update(selectedId, changedNote)
      .then(returnedNote => {        
        //  returnedNote contains note that was changed
        setNotes(prevNotes => prevNotes.map(n => n.id === selectedId ? returnedNote : n))
        setSelectedId(null)
      })
      .catch(error => {
        setErrorMessage(
          `Note "${note.content}" was already removed from the server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(note.filter(n => n.id !== selectedId))
        setSelectedId(null)
      })
  }

  const deleteNote = () => {
    noteService
      .remove(selectedId)
      .then(() => {
        setNotes(prevNotes => 
          prevNotes.filter(n => n.id !== selectedId))
          console.log(`${selectedId} was successfully deleted`)
          setSelectedId(null)
      })
      .catch(error => {
        setErrorMessage(
          `Note ID: "${selectedId}" was already removed from the server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  //  <input onChange={} />
  const handleNoteChange = (event) => {
    setNewNote(event.target.value)    
  }
  
  const handleRadioChoice = (id) => {    
    setSelectedId(id)
  }

  /* other functions */
  // showAll is a state when true ? all the notes : important only  
  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  const changeImpt = selectedId
    ? notes.find(n => n.id === selectedId).important
      ? "NOT Important"
      : "Important"
    : null
    
  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        {/* when button is clicked, showAll when false ? button label 'show important' : 'show all' */}
        <button onClick={() => deleteNote()}>Delete Note</button>       
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? 'Important' : 'All'}
        </button>
      </div>
      {
        selectedId && <button onClick={() => updateImportance()}>{`Mark ${changeImpt}`}</button>
      }  
      <ul>
        { notes && notesToShow.map(note =>          
          <Note 
            key={note.id}
            note={note}
            value={selectedId}
            onChange={handleRadioChoice}
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