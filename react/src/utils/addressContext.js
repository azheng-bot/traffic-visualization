import { createContext } from 'react'

export const addressContext = createContext({
  addressInfo: {},
  setAddressInfo: () => { }
})