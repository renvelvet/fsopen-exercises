import { useDispatch, useSelector } from 'react-redux'
import { vote, voteAnecdote } from '../reducers/anecdoteReducer'
import {
  removeNotification,
  setNotification,
  votedNotification,
} from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) =>
    filter
      ? anecdotes.filter((item) => item.content.includes(filter))
      : anecdotes
  )
  const dispatch = useDispatch()

  return (
    <section>
      {[...anecdotes]
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button
                onClick={() => {
                  dispatch(voteAnecdote(anecdote, anecdote.id))
                  dispatch(
                    setNotification(`you voted '${anecdote.content}'`, 5)
                  )
                }}
              >
                vote
              </button>
            </div>
          </div>
        ))}
    </section>
  )
}

export default AnecdoteList
