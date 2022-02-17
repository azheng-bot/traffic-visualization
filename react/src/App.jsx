import React, { useState, useEffect, useContext, createContext } from 'react'
import { Outlet } from 'react-router-dom'
import './App.less'
import Navigator from './components/Navigator/index.jsx';
import Weather from './components/Weather/index.jsx';
import BackBtn from './components/BackBtn/index.jsx';
import axios from 'axios'
import { addressContext } from "./utils/addressContext.js"
import { CityInfoContextProvider, cityInfoContext } from './utils/reducer'

function App() {
  let [addressInfo, setAddressInfo] = useState({ city: 1 })
  let {state, dispatch} = useContext(cityInfoContext)
  console.log('env', import.meta.env)
 



  return (
    <div className="App">
      <CityInfoContextProvider  >
        {/* {state.city} */}
        <Navigator></Navigator>
        <Weather></Weather>
        <BackBtn></BackBtn>
        <Outlet></Outlet>
      </ CityInfoContextProvider>
    </div>
  )
}

export default App

