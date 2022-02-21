import React, { useState, useEffect, useContext, createContext } from 'react'
import { Outlet } from 'react-router-dom'
import './App.less'
import Navigator from './components/Navigator/index.jsx';
import Weather from './components/Weather/index.jsx';
import BackBtn from './components/BackBtn/index.jsx';
import axios from 'axios'
import { addressContext } from "./utils/addressContext.js"

function App() {  
  return (
    <div className="App">
        {/* {state.city} */}
        <Navigator></Navigator> 
        <Weather></Weather>
        <BackBtn></BackBtn>
        <Outlet></Outlet>
    </div>
  )
}

export default App

