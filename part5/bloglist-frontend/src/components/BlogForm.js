import { useState } from 'react'

const BlogForm = ({ createForm }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = (event) => {
    event.preventDefault()

    createForm({ title, author, url })
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <div>
      <div>
        <h2>create new</h2>
        <form onSubmit={handleCreate}>
          <div>
            title:{' '}
            <input
              name="Title"
              data-testid="title"
              type="text"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author:{' '}
            <input
              type="text"
              name="Author"
              data-testid="author"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url:{' '}
            <input
              type="text"
              name="Url"
              data-testid="url"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button type="submit">create</button>
        </form>
      </div>
    </div>
  )
}

export default BlogForm
