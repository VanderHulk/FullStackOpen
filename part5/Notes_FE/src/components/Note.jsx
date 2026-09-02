import { useParams, useNavigate } from 'react-router-dom'

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
          <button className='btn impt' type='button' onClick={() => updateImportance(note.id)}>
            {!note.important ? 'Make Important' : 'Make Unimportant'}
          </button>       
        
          {note.user === userId && (
            <button className='btn delete' type='button' onClick={handleDelete}>Delete</button>
          )}
        </>
      }
    </div>
  )
}

export default Note