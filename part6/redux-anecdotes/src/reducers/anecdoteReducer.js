import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    newAnecdote(state, action) {
      state.push(action.payload)
    },
    vote(state, action) {
      const currentState = state.filter((item) => item.id !== action.payload.id)
      return currentState.concat({
        content: action.payload.content,
        id: action.payload.id,
        votes: action.payload.votes + 1,
      })
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const { newAnecdote, vote, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions
export default anecdoteSlice.reducer
