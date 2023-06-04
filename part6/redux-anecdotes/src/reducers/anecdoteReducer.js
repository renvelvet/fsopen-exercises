import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const { appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newContent = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newContent))
  }
}

export const voteAnecdote = (content, id) => {
  return async (dispatch) => {
    await anecdoteService.vote(
      { content: content.content, votes: content.votes + 1 },
      id
    )
    const currentState = await anecdoteService.getAll()

    dispatch(setAnecdotes(currentState))
  }
}

export default anecdoteSlice.reducer
