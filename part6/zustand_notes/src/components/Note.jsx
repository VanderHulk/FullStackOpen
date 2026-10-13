import { useNoteActions } from '../store/store'

const Note = ({ note }) => {
  const { toggleImportance } = useNoteActions()
  const color = note.important ? 'btn-not-important' : 'btn-important'

  return (
    <li className='mb-4 ml-8'>
      {note.important ? <strong>{note.content}</strong> : note.content}
      <button className={`btn ${color} !rounded-full text-sm px-4 py-1`} onClick={() => toggleImportance(note.id)}>
        {note.important ? 'Make not important' : 'Make important'}
      </button>
    </li>
  )
}

export default Note