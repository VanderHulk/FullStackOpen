import { useState, useEffect, useRef } from 'react'
import noteService from './services/notes'
import loginService from './services/login'
import { jwtDecode } from 'jwt-decode'

import {  
  Routes, 
  Route, 
  Link,
  useMatch  
} from 'react-router-dom'

import Home from './views/Home.jsx'
import Create from './views/Create.jsx'
import Notes from './views/Notes.jsx'

import Note from './components/Note'
import Login from './components/Login'
import Notification from './components/Notification'
import Footer from './components/Footer'

const App = () => {
  const noteFormRef = useRef()

  /* states */
  const [notes, setNotes] = useState([])  
  const [message, setMessage] = useState(null)
  const [remainingTime, setRemainingTime] = useState(null)
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

  // log out user when time expires
  useEffect(() => {    
    if (user) {
      const decodedToken = jwtDecode(user.token)
      const remainingTime = decodedToken.exp * 1000 - Date.now()

      const interval = setInterval(() => {
        const remainingTime = decodedToken.exp * 1000 - Date.now()        
        const min = Math.floor(remainingTime / 60000)
        const sec = String(Math.floor((remainingTime % 60000) / 1000)).padStart(2, '0')        
        setRemainingTime(`${min}:${sec}`)  
      }, 1000)
      
      const timer = setTimeout(() => {
        handleLogout()
      }, remainingTime)

      return () => {
        clearInterval(interval)
        clearTimeout(timer)
      }
    }
  }, [user])

  const match = useMatch(`/notes/:id`)
  const note = match
    ? notes.find(note => note.id === match.params.id)
    : null  

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

  // styles temporary
  const padding = { padding: 10 }  
  
  return (
    <div>     
      <div className='title-container'>
        <h1>Notes App</h1>
        <Login user={user} timer={remainingTime} handleLogout={handleLogout} handleLogin={handleLogin} />        
      </div>

      <Notification message={message}/>

      
      <div style={padding}>
        <Link style={padding} to='/'>Home</Link>
        <Link style={padding} to='/notes'>Notes</Link>
        <Link style={padding} to='/create'>Create Note</Link>
      </div>        

      <Routes>
        <Route path='/notes/:id' element={
          user && 
            <Note
              note={note}
              userId={user.id}
              eventHandlers={{ updateImportance, deleteANote }}
            />
        }/>

        <Route path='/notes' element={
          <Notes notes={notes} />
         } />
        <Route path='/create' element={
            user && <Create addNote={addNote} noteFormRef={noteFormRef} />       
        } />
        
        <Route path='/' element={<Home />} />
      </Routes>

      <Footer />
    </div>
  )
}
 
export default App