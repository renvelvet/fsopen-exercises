import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import {
  removeNotification,
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
                  dispatch(vote(anecdote))
                  dispatch(votedNotification(anecdote))
                  setTimeout(() => dispatch(removeNotification()), 5000)
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
