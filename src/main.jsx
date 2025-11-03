import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './i18n.js'
import DirectionController from './components/DirectionController.jsx'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DirectionController />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
