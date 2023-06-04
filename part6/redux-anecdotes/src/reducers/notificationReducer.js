import { createSlice } from '@reduxjs/toolkit'

const initialState = ''
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    clearNotification(state, action) {
      return ''
    },
    addNotification(state, action) {
      return action.payload
    },
  },
})

export const { addNotification, clearNotification } = notificationSlice.actions

export const setNotification = (text, seconds) => {
  return async (dispatch) => {
    dispatch(addNotification(text))
    setTimeout(() => dispatch(clearNotification), seconds * 1000)
  }
}

export default notificationSlice.reducer
