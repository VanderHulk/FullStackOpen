import { useState, useImperativeHandle } from 'react'

const Togglable = ({ buttonLabel, children, ref }) => {
  const [visible, setVisible]= useState(false)

  const hide = { display: visible ? 'none' : '' }
  const show = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return { toggleVisibility }
  })

  return (
    <div className='togglable'>
      <div style={hide}>
        <button className='btn' onClick={toggleVisibility}>{buttonLabel}</button>
      </div>

      <div style={show}>
        {children}
      </div>
      
      <button className='btn togglable-left' style={show} onClick={toggleVisibility}>Cancel</button>
    </div>
  )
}

export default Togglable