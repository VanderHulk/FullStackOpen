import { Alert } from '@mui/material'

const Notification = ({ message }) => {
    if (!message) {
      return null
    }

    const { text, severity } = message

    return (
      <Alert className='notification' severity={severity}>
          {text}
      </Alert>
    )
}

export default Notification