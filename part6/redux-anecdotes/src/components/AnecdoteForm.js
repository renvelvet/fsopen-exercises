import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import {
  addedNotification,
  removeNotification,
} from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newContent = await anecdoteService.createNew(content)
    dispatch(newAnecdote(newContent))
    dispatch(addedNotification(content))
    setTimeout(() => dispatch(removeNotification()), 5000)
  }
  return (
    <section>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </section>
  )
}

export default AnecdoteForm
