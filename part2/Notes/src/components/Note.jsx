const Note = ({ note, value, onChange }) => {    
    const color = note.important 
        ? 'redText' : 'greyText'

    return (
        <li className='note'>
            {/* NEW */}
            <label className={ color }>
                <input type="radio" name="notes" value={note.id} checked={value === note.id} onChange={() => onChange(note.id)}/> {note.content + ' '}                
            </label>           
        </li>
    )
}

export default Note