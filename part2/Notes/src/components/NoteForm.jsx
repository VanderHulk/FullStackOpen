const NoteForm = ({ handleSubmit, handleChange, value }) => {
  return (
    <div className='frmNote-container'>
      <h2>Create New Note</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={value}
          onChange={handleChange}      
        />
        <button className='btn save' type='submit'>Save</button>
      </form>
    </div>
  )
}

export default NoteForm