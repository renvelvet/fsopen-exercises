import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) =>
    filter
      ? anecdotes.filter((item) => item.content.includes(filter))
      : anecdotes
  )
  const dispatch = useDispatch()

  return (
    <section>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => dispatch(vote(anecdote))}>vote</button>
            </div>
          </div>
        ))}
    </section>
  )
}

export default AnecdoteList
