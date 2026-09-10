import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'

import { Container } from '@mui/material'

import App from './App'
import './index.css'

//  index.html --> <div id="root"></div>
ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Container>
        <App />
      </Container>
    </Router>
  </StrictMode>
)