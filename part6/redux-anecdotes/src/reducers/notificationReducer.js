import { createSlice } from '@reduxjs/toolkit'

const initialState = ''
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    votedNotification(state, action) {
      return `you voted '${action.payload.content}'`
    },
    removeNotification(state, action) {
      return ''
    },
    addedNotification(state, action) {
      return `you added '${action.payload}' anecdote`
    },
  },
})

export const { votedNotification, removeNotification, addedNotification } =
  notificationSlice.actions
export default notificationSlice.reducer
