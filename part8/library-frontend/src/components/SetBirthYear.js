import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, EDIT_BORN } from '../queries/queries'

const SetBirthYear = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState(0)

  const [setAuthor] = useMutation(EDIT_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
  })

  const submit = (event) => {
    event.preventDefault()
    console.log('typeof Number(born', typeof Number(born))
    setAuthor({ variables: { name: name, born: Number(born) } })

    setName('')
    setBorn(0)
  }
  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name{' '}
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born{' '}
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default SetBirthYear
