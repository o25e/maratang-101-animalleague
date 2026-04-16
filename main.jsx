import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MaratangGame from './MaratangGame.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MaratangGame />
  </StrictMode>,
)
