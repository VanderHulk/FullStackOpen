import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { TextField, Button } from '@mui/material'

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('')

  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    createNote({
      content: newNote,
      important: true
    })
    
    navigate('/notes')
    setNewNote('')
  }

  return (
    <div className='frmNote-container'>
      <h2>Create New Note</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label='note content'
          value={newNote}
          onChange={event => setNewNote(event.target.value)}
          size='small'
        />
        <Button className='btn save' type='submit' variant='contained'>
          Save
        </Button>
        {/* <input
          value={newNote}
          onChange={event => setNewNote(event.target.value)}
        />
        <button className='btn save' type='submit'>Save</button> */}
      </form>
    </div>
  )
}

export default NoteForm