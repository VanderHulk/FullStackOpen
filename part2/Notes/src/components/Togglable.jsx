import { useState } from 'react'

const Togglable = (props) => {
  const [visible, setVisible]= useState(false)

  const hide = { display: visible ? 'none' : '' }
  const show = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div className='togglable'>
      <div style={hide}>
        <button className='btn' onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={show}>        
        {props.children}
      </div>
      <button className='btn togglable-left' style={show} onClick={toggleVisibility}>Cancel</button>
    </div>
  )
}

export default Togglable