import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { warnAboutPlaceholders } from './lib/placeholders'
import './styles/index.css'

if (import.meta.env.DEV) warnAboutPlaceholders()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
