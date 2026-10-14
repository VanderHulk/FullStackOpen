import { useNoteActions } from '../store/store'

const NoteForm = () => {
  const { add } = useNoteActions()

  const addNote = async (e) => {
    e.preventDefault()
    
    const content = e.target.note.value
    await add(content)
    e.target.reset()
  }

  return (
    <form className='m-5' onSubmit={addNote}>
      <input 
        name='note'
        type='text'
        placeholder='Write a new note'
        className='textbox'
      />
      <button className='btn btn-general' type='submit'>ADD</button>
    </form>
  )
}

export default NoteForm