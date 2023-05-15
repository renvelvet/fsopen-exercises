import { useState } from 'react'

const Blog = ({ blog, user, likeBlog, removeBlog }) => {
  const [visibility, setVisibility] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleLike = (event) => {
    event.preventDefault()
    likeBlog(blog)
  }

  const handleRemove = (event) => {
    event.preventDefault()
    removeBlog(blog)
  }

  return (
    <div style={blogStyle}>
      <div className="blog">
        {blog.title} by {blog.author}{' '}
        <button type="button" onClick={() => setVisibility(!visibility)}>
          {visibility ? 'hide' : 'view'}
        </button>
      </div>
      {visibility && (
        <div>
          <div className="url">{blog.url}</div>
          <div className="likes">
            likes {blog.likes} <button onClick={handleLike}>like</button>
          </div>
          <div>{user.name}</div>
          {/* remark blog created by user */}
          {blog.user.id === user.id && (
            <button onClick={handleRemove}>remove</button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
