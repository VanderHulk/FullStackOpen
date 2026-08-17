import { useState } from 'react'

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    createNote({
      content: newNote,
      important: true
    })

    setNewNote('')
  }

  return (
    <div className='frmNote-container'>
      <h2>Create New Note</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={newNote}
          onChange={event => setNewNote(event.target.value)}      
        />
        <button className='btn save' type='submit'>Save</button>
      </form>
    </div>
  )
}

export default NoteForm