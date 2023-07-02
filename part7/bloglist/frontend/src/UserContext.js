import { createContext, useContext, useReducer } from 'react'

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'CLEAR':
      return null
    default:
      return state
  }
}

const UserContext = createContext()

export const UserContextProvider = (props) => {
  const [user, dispatch] = useReducer(reducer, null)

  return (
    <UserContext.Provider value={[user, dispatch]}>
      {props.children}
    </UserContext.Provider>
  )
}

export const useUserContextValue = () => {
  const [user] = useContext(UserContext)
  return user
}

export const useLogin = () => {
  const valueAndDispatch = useContext(UserContext)
  const dispatch = valueAndDispatch[1]

  return (payload) => {
    dispatch({ type: 'SET', payload })
  }
}

export const useLogout = () => {
  const valueAndDispatch = useContext(UserContext)
  const dispatch = valueAndDispatch[1]

  return () => {
    dispatch({ type: 'CLEAR' })
  }
}
