import { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, EDIT_BORN } from '../queries/queries'

const SetBirthYear = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState(0)

  const [setAuthor] = useMutation(EDIT_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
  })
  const result = useQuery(ALL_AUTHORS)

  if (result.loading) {
    return <div>loading...</div>
  }
  const authors = result.data ? result.data.allAuthors : []

  const submit = (event) => {
    event.preventDefault()

    setAuthor({ variables: { name: name, born: Number(born) } })

    setName('')
    setBorn(0)
  }
  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <select
          name="authorName"
          onChange={({ target }) => setName(target.value)}
        >
          {authors.map((element) => (
            <option value={element.name}>{element.name}</option>
          ))}
        </select>
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
