import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import './App.less'
import Navigator from './components/Navigator/index.jsx';
import BackBtn from './components/BackBtn/index.jsx';


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Navigator></Navigator>
      <BackBtn></BackBtn>
      <Outlet></Outlet>
    </div>
  )
}

export default App

