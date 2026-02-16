const Note = ({ note, toggleImportance }) => {
    const label = note.important
        ? 'Make NOT Important' : 'Make Important'
    return (
        <li>
            {note.content + ' '}
            <button onClick={toggleImportance}>{label}</button>
        </li>
    )
}

export default Note