import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import GlobalContextProvider from './contexts/GlobalContext.jsx'
import AuthContextProvider from './contexts/AuthContext.jsx'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
          <GlobalContextProvider>
            <App />
            <Toaster
              toastOptions={{
                position: "top-right",
              }}
            />
          </GlobalContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
