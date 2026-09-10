import { useState, useImperativeHandle } from 'react'
import { Button } from '@mui/material'

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
        <Button className='btn' onClick={toggleVisibility} variant='contained'>{buttonLabel}</Button>
      </div>

      <div style={show}>
        {children}
      </div>
      
      <Button className='btn cancel' style={show} onClick={toggleVisibility} variant='contained'>Cancel</Button>
    </div>
  )
}

export default Togglable