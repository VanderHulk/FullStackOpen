const NoteForm = ({ onSubmit }) => {
  return (
    <form className='m-5' onSubmit={onSubmit}>
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