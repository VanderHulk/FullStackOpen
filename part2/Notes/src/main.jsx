import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

//  index.html --> <div id="root"></div>
ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)