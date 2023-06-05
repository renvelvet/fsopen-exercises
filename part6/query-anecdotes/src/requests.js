import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => axios.get(baseUrl).then((res) => res.data)

export const createAnecdote = (newContent) =>
  axios.post(baseUrl, newContent).then((res) => res.data)

export const voteAnecdote = (newContent) =>
  axios.put(`${baseUrl}/${newContent.id}`, newContent).then((res) => res.data)
