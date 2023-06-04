import { useDispatch } from 'react-redux'
import { filter } from '../reducers/filterReducer'

const AnecdoteFilter = () => {
  const dispatch = useDispatch()
  return (
    <div>
      <form>
        <label htmlFor="inputFilter">filter</label>
        <input
          type="text"
          id="inputFilter"
          name="inputFilter"
          onChange={(event) => dispatch(filter(event.target.value))}
        />
      </form>
    </div>
  )
}

export default AnecdoteFilter
