import React from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx'
import Furniture from './pages/Furniture.jsx'
import Users from './pages/Users.jsx'

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Dashboard />} />
          </Routes>
        </BrowserRouter>

      </div>
    </>
  )
}

export default App