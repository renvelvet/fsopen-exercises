import { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({
  blogs,
  user,
  handleLogout,
  setMessage,
  setMessageType,
  setCreateTrigger,
  createTrigger,
}) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleCreate = (event) => {
    event.preventDefault();
    blogService.create({ title, author, url });
    setCreateTrigger(!createTrigger);
    setMessageType('info');
    setMessage(`a new blog ${title} by ${author} added`);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  return (
    <div>
      <h2>blogs</h2>
      <div>
        {user.username} logged in <button onClick={handleLogout}>logout</button>
      </div>
      <div>
        <h2>create new</h2>
        <form onSubmit={handleCreate}>
          <div>
            title:{' '}
            <input
              name="Title"
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
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url:{' '}
            <input
              type="text"
              name="Url"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button type="submit">create</button>
        </form>
      </div>
      <div>
        {blogs.map((blog) => (
          <div key={blog.id}>
            {blog.title} - {blog.author}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
