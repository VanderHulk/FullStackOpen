import { useParams, useNavigate } from 'react-router-dom'

import { Button } from '@mui/material'

const Note = ({ note, userId, eventHandlers }) => {

  const { updateImportance, deleteANote } = eventHandlers

  const id = useParams().id
  const navigate = useNavigate()  

  const color = note?.important ? 'redText' : 'greyText'

  const handleDelete = () => {
    if (window.confirm(`Are you sure you would like to delete "${note.content}?"`)) {
      deleteANote(note.id)
      navigate('/notes')
    }
  }
  
  return (
    <div>
      {note &&
        <>                  
          <p className={`note ${color}`}>"{note.content}"</p>
          <Button className='btn impt' type='button' onClick={() => updateImportance(note.id)} variant='contained'>
            {!note.important ? 'Make Important' : 'Make Unimportant'}
          </Button>       
        
          {note.user.id === userId && (
            <Button className='btn delete' type='button' onClick={handleDelete} variant='contained'>Delete</Button>
          )}
        </>
      }
    </div>
  )
}

export default Note