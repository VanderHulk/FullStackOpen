import { useParams } from 'react-router-dom'

const Note = ({ notes, userId, eventHandlers }) => {

  const { updateImportance, deleteANote } = eventHandlers

  const params = useParams()  
  const note = notes.find(note => note.id === params.id)

  const color = note?.important ? 'redText' : 'greyText'

  return (
    <div>
      {note &&
        <>                  
          <p className={`note ${color}`}>"{note.content}"</p>
          <button className='btn impt' type='button' onClick={() => updateImportance(note.id)}>
            {!note.important ? 'Make Important' : 'Make Unimportant'}
          </button>       
        
          {note.user === userId && (
            <button className='btn delete' type='button' onClick={() => deleteANote(note.id)}>Delete</button>
          )}
        </>
      }
    </div>
  )
}

export default Note