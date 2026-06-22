const LoginForm = ({
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange,    
    username,
    password
  }) => {
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
              onChange={handleUsernameChange}
            />
          </label>
        </div>
        <div>
          <label>
          <span>Password</span>
          <input            
            type='password'
            value={password}
            onChange={handlePasswordChange}
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