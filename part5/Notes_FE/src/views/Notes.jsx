import { useState } from 'react'
import { Link } from 'react-router-dom'
import Note from '../components/Note'

const Notes = ({ notes }) => {
  
  const [showAll, setShowAll] = useState(true)

  const handleNoteShow = showAll ? notes : notes.filter(note => note.important)

  return (
    <div>
      <div>
        <h2 className='title-notes'>Notes</h2>
        <button className='btn show' type='button' onClick={() => setShowAll(!showAll)}> Show {showAll ? 'Important' : 'All'}</button>
      </div>

        <ul className='notes'>
          {handleNoteShow.map(note => {
            const color = note.important ? 'redText' : 'greyText'
            return (
              <li key={note.id} className={color}> 
                <Link style={{ color: 'inherit' }} to={`/notes/${note.id}`}><span>{note.content}</span></Link>
              </li>
            )
          })}
       </ul>
    </div>
  )
}

export default Notes