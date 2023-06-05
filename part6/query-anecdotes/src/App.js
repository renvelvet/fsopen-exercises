import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { createAnecdote, getAnecdotes, voteAnecdote } from './requests'

const App = () => {
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newContent) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newContent))
    },
  })

  const voteAnecdoteMutation = useMutation(voteAnecdote, {
    onSuccess: (newUpdate) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      const newList = anecdotes.map((item) =>
        item.id !== newUpdate.id ? item : newUpdate
      )
      queryClient.setQueryData(['anecdotes'], newList)
    },
  })

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  const result = useQuery(['anecdotes'], getAnecdotes, {
    retry: 1,
    refetchOnWindowFocus: false,
  })

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm addAnecdote={addAnecdote} />

      {anecdotes?.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
