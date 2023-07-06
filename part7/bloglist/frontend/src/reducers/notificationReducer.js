import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: '', notifType: 'info' },
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    reset() {
      return { message: '', notifType: 'info' }
    },
  },
})

export const { setNotification, reset } = notificationSlice.actions
export default notificationSlice.reducer
