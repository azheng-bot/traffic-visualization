import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import './App.css'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Outlet></Outlet>
    </div>
  )
}

export default App

