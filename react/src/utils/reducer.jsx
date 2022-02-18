import { useReducer, createContext } from 'react'

let cityInfoContext = createContext({})

let reducer = (state, action) => {
  console.log('action', action.payload.cityInfo)
  switch (action.type) {
    case 'setCityInfo':
      return { ...state, cityInfo: action.payload.cityInfo };
    default:
      return state
  }
}

let CityInfoContextProvider = props => {
  let [state, dispatch] = useReducer(reducer, { cityInfo: {} })
  return (
    <cityInfoContext.Provider value={{ state, dispatch }}>
      {props.children}
    </cityInfoContext.Provider>
  )
}

export { cityInfoContext, CityInfoContextProvider, reducer }