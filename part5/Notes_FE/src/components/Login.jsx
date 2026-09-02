import LoginForm from './LoginForm'
import Togglable from './Togglable'

const Login = ({ user, timer, handleLogout, handleLogin }) => {
  return (
    <div>
      {user && (         
        <div className='logout-container'>
          <p>{user.username} logged in [{timer}]</p>
          <button className='btn' onClick={handleLogout}>Logout</button>
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