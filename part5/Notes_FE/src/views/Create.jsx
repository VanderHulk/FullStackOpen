import NoteForm from '../components/NoteForm'

const Create = ({ addNote }) => {
  return (
    <div>      
      <NoteForm createNote={addNote} />      
    </div>
  )
}

export default Create