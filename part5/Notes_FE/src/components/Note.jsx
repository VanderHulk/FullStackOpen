const Note = ({ notes, user, eventHandlers }) => {

  const { updateImportance, deleteANote } = eventHandlers
  
  return (              
    <ul className='notes'>
      {notes.map(note => {
        const color = note.important ? 'redText' : 'greyText'        
        return (
          <li key={note.id} className={color}> 
            <span>{note.content}</span>
            {user && (
              <div>
                <button className='btn-impt' type='button' onClick={() => updateImportance(note.id)}>
                  {!note.important ? '📌' : '📄'}
                </button>

                {note.user === user.id && (
                  <button className='btn-bin' type='button' onClick={() => deleteANote(note.id)}>🗑️</button>
                )}
              </div>
            )}
          </li>
        )
      })}
    </ul>    
  )
}

export default Note