import LoginForm from './LoginForm'
import Togglable from './Togglable'

import { Button } from '@mui/material'

const Login = ({ user, timer, handleLogout, handleLogin }) => {
  return (
    <div>
      {user && (         
        <div className='logout-container'>
          <p>{user.username} logged in [{timer}]</p>
          <Button className='btn logout' onClick={handleLogout} variant='contained'>Logout</Button>
        </div>
      )}
      
      {!user && (
        <Togglable buttonLabel='Login' >
          <LoginForm loginUser={handleLogin} />
        </Togglable>
      )} 
    </div>
  )
}

export default Login