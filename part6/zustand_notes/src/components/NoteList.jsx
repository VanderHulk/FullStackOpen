import { useNotes } from '../store/store'
import Note from './Note'

const NoteList = () => {
  const notes = useNotes()  
  
  return (
    <ul className='list-disc pl-4'>
      {notes.map(note => (
        <Note key={note.id} note={note}  />
      ))}
    </ul>
  )
}

export default NoteList