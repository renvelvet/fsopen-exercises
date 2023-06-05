import { createContext, useContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload
    default:
      return ''
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ''
  )

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationState = () => {
  const stateAndDispatch = useContext(NotificationContext)
  return stateAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const stateAndDispatch = useContext(NotificationContext)
  return stateAndDispatch[1]
}

export default NotificationContext
