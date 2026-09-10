import { useState } from 'react'

import { Button, TextField } from '@mui/material'

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
          <TextField
            className='input'
            label='username'
            type='text'
            value={username}
            onChange={event => setUsername(event.target.value)}
            size='small'
          />          
        </div>
        <div>          
          <TextField
            className='input'
            label='password'            
            type='password'
            value={password}
            onChange={event => setPassword(event.target.value)}
            size='small'
          />          
        </div>
        <div>
          <Button className='btn login' type='submit' variant="contained">Login</Button>          
        </div>
      </form>
    </div>
  )
}

  export default LoginForm