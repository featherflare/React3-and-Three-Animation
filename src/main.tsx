import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import Rain from './pages/RainEffect/rain.tsx'

import './assets/styles/index.css'

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/rain', element: <Rain /> },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
