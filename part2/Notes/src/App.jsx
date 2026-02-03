import { useState } from 'react';
import Note from './components/Note.jsx'

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState(
    'a new note...'
  )
  const [showAll, setShowAll] = useState(true)

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  // event handler functions
  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: String(notes.length + 1)
    }
    
    setNotes(notes.concat(noteObject))
    setNewNote('')
    console.log("Button clicked", event.target)
    // extra: event.target.elements returns all form controls (inputs, button) inside the form
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }
  
  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {/* when using JS, it must be wrapped in {} in a JSX template */}
        { notesToShow.map(note =>
          //  each list item needs a unique `key` prop so React can track it efficiently
          //  the key can be a string or a number, but it is used internally by React
          //  and is NOT accessible as a prop inside the component
          //  JSX elements directly inside a map() call always need keys!
          //  index not recommended to be used as keys because when the array length changes, the key also changes
          //  Keys are required only on the direct elements returned by a map() call.
          // <li key={note.id}>
          //   {note.content}
          // </li>
          <Note key={note.id} note={note} />
        )}
      </ul>
      {/* target (form) stored in event.target */}
      <form onSubmit={addNote}>
        <input 
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App