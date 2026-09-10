import { useState } from 'react'
import { Link } from 'react-router-dom'

import {
  Button,
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper 
} from '@mui/material'

const Notes = ({ notes }) => {
  
  const [showAll, setShowAll] = useState(true)

  const handleNoteShow = showAll ? notes : notes.filter(note => note.important)

  return (
    <div>
      <div>
        <h2 className='title-notes'>Notes</h2>
        <Button className='btn show' type='button' onClick={() => setShowAll(!showAll)} variant='contained'> Show {showAll ? 'Important' : 'All'}</Button>
      </div>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Content</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Important</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {handleNoteShow.map(note => {
              const color = note.important ? 'redText' : 'greyText'
              return (
                <TableRow key={note.id}>
                  <TableCell >
                    <Link style={{ color: 'inherit' }} to={`/notes/${note.id}`}>
                      <span className={color}>{note.content}</span>
                    </Link>
                  </TableCell>
                  <TableCell>
                    {note.user.name}
                  </TableCell>
                  <TableCell>
                    {note.important ? 'yes' : ''}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Notes