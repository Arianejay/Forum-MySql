import { createContext, useEffect, useReducer } from 'react'
import Reducer from './Reducer'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

const INITIAL_STATE = {
  user: cookies.get('access-token') || '',
  isFetching: false,
  error: false,
}

export const Context = createContext(INITIAL_STATE)

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE)

  useEffect(() => {
    cookies.set('access-token', state.user)
  }, [state.user])

  return (
    <Context.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  )
}
