import { useState, useEffect, useRef } from 'react'
import noteService from './services/notes'
import loginService from './services/login'

import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import NoteForm from './components/NoteForm'

const App = () => {
  const noteFormRef = useRef()

  /* states */
  const [notes, setNotes] = useState([])  
  const [showAll, setShowAll] = useState(true) 
  const [message, setMessage] = useState(null)  
  const [user, setUser] = useState(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUserJSON) {
      return JSON.parse(loggedUserJSON)
    }
    return null
  })

  useEffect( () => {
    const fetchNotes = async () => {
      const initialNotes = await noteService.getAll()
      setNotes(initialNotes)
    }
    
    fetchNotes()
  }, [])

  useEffect(() => {    
      if (user) {
        noteService.setToken(user.token)        
      }
  }, [user])

  const addNote = async (noteObject) => {
   
    try {
      noteFormRef.current.toggleVisibility()
      const returnedNote = await noteService.create(noteObject)
      setNotes(prev => prev.concat(returnedNote))      

      handleNotification(`"${returnedNote.content}" has been successfully added.`, 3000)
      
    } catch (error) {
      console.log(error)
      handleNotification(error.message, 5000)
    }
  }

  const updateImportance = async (id) => {
    const foundNote = notes.find(n => n.id === id)
    const updatedNote = {
      ...foundNote,
      important: !foundNote.important
    }
    
    const returnedNote = await noteService.update(id, updatedNote)
    setNotes(prev => prev.map(n => n.id === id ? returnedNote : n))
  }

  const deleteANote = async (id) => {
    const foundNote = notes.find(n => n.id === id)
    
    try {
      await noteService.remove(id)      
      setNotes(prev => prev.filter(n => n.id !== id))
 
      handleNotification(`"${foundNote.content}" has been successfully removed.`, 3000)

    } catch (error) {
      handleNotification(error.message, 5000)
    }
  }

  const handleLogin = async (loginObject) => {

    const { username, password } = loginObject
    
    try {
      const user = await loginService.login({
        username, password  
      })

      window.localStorage.setItem(
        'loggedNoteAppUser', JSON.stringify(user)
      )

      noteService.setToken(user.token)

      setUser(user)

    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message
      handleNotification(errorMessage, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteAppUser')
    noteService.setToken(null)
    setUser(null)

    handleNotification(`${user.username} logged out.`, 3000)
  }

  const handleNotification = (message, duration) => {
    if(!message) return

    setMessage(message)

    setTimeout(() => {
      setMessage(null)
    }, duration)
  }

  const handleNoteShow = showAll ? notes : notes.filter(note => note.important)

  return (
    <div>
      <div className='title-container'>
        <h1>Notes App</h1>
        {user && (         
          <div className='logout-container'>
            <p>{user.username} logged in</p>
            <button className='btn' onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>

      <Notification message={message}/>

      {!user && (
        <Togglable buttonLabel='Login' >
          <LoginForm loginUser={handleLogin} />
        </Togglable>
      )}     

      {user && (    
        <Togglable buttonLabel='New Note' ref={noteFormRef}>
          <NoteForm createNote={addNote} />
        </Togglable>
      )}

      <div>
        <h2 className='title-notes'>Notes</h2>
        <button className='btn show' type='button' onClick={() => setShowAll(!showAll)}>Show {showAll ? 'Important' : 'All'}</button>
      </div>
      
      <Note 
        notes={handleNoteShow}
        user={user}
        eventHandlers={{
          updateImportance,
          deleteANote
        }}
      />      

      <Footer />
    </div>
  )
}
 
export default App