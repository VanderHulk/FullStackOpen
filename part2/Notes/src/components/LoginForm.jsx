import { useState } from 'react'

const LoginForm = ({ loginUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    loginUser({
      username,
      password
    })

    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>Login</h2>

      <form className='frmLogin-container' onSubmit={handleSubmit}>
        <div>
          <label>
            <span>Username</span>
            <input              
              type='text'
              value={username}
              onChange={event => setUsername(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
          <span>Password</span>
          <input            
            type='password'
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
          </label>
        </div>
        <div>
          <button className='btn' type='submit'>Login</button>          
        </div>
      </form>
    </div>
  )
}

  export default LoginForm