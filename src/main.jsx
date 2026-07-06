import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* BrowserRouter enables client-side routing (page navigation without
        full page reloads) for the whole app. Every component inside it
        can now use useNavigate, useLocation, <Link>, <Routes>, etc. */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
