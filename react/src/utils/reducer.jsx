import { useReducer, createContext } from 'react'

let cityInfoContext = createContext({})

let reducer = (state, action) => {
  switch (action.type) {
    case 'setCityInfo':
      return { ...state, ...action.payload };
    default:
      return state
  }
}

let CityInfoContextProvider = props => {
  let [state, dispatch] = useReducer(reducer, { city: 321 })
  return (
    <cityInfoContext.Provider value={{ state, dispatch }}>
      {props.children}
    </cityInfoContext.Provider>
  )
}

export { cityInfoContext, CityInfoContextProvider, reducer }