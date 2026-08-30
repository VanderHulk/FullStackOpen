import NoteForm from '../components/NoteForm'
import Togglable from '../components/Togglable'

const Create = ({ addNote, noteFormRef }) => {
  return (
    <div>
      <Togglable buttonLabel='New Note' ref={noteFormRef}>
        <NoteForm createNote={addNote} />
      </Togglable>
    </div>
  )
}

export default Create