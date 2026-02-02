import { useState } from 'react';
import Note from './components/Note.jsx'

const App = (props) => {
  //  destructuring notes, it is equal to:
  //  const notes = props.notes
  const { notes } = props
  
  console.log('props ', props);
  
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {/* when using JS, it must be wrapped in {} in a JSX template */}
        { notes.map(note =>
          //  each list item needs a unique `key` prop so React can track it efficiently
          //  the key can be a string or a number, but it is used internally by React
          //  and is NOT accessible as a prop inside the component
          //  JSX elements directly inside a map() call always need keys!
          //  index not recommended to be used as keys because when the array length changes, the key also changes
          //  Keys are required only on the direct elements returned by a map() call.
          // <li key={note.id}>
          //   {note.content}
          // </li>
          <Note key={note.id} note={note} />
        )}
      </ul>
    </div>
  )
}

export default App