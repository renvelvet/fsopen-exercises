import { useState, useEffect, useRef } from 'react';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Toggleable from './components/Toggleable';

import blogService from './services/blogs';
import loginService from './services/login';
import Blog from './components/Blog';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    blogService.getAll().then((blog) => setBlogs(blog));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setMessageType('error');
      setMessage('wrong username or password');
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    setUser(null);
  };

  const noteFromRef = useRef();

  const createForm = (blogObject) => {
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      noteFromRef.current.toggleVisibility();
      setMessageType('info');
      setMessage(
        `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
      );
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    });
  };

  const likeBlog = (blogObject) => {
    const userInfo = {
      username: blogObject.username,
      name: blogObject.name,
      id: blogObject.id,
    };
    const newChange = {
      user: userInfo.id,
      title: blogObject.title,
      author: blogObject.author,
      url: blogObject.url,
      likes: blogObject.likes + 1,
    };
    const blogIndex = blogs.findIndex((blog) => blog.id === blogObject.id);

    blogService.update(blogObject.id, newChange).then((res) => {
      blogs.splice(blogIndex, 1, {
        author: res.author,
        title: res.title,
        url: res.url,
        id: res.id,
        likes: res.likes,
        user: userInfo,
      });

      setBlogs([...blogs]);
    });
  };

  const removeBlog = (blogObject) => {
    const id = blogObject.id;
    const newBlogs = blogs.filter((blog) => blog.id !== id);
    if (
      window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)
    ) {
      blogService.remove(id).then((res) => {
        if (res.status === 204) {
          setBlogs(newBlogs);
        }
      });
    }
  };

  return (
    <div>
      <h1>Blogs App</h1>
      <Notification message={message} type={messageType} />
      {user ? (
        <div>
          <p>
            {user.user.name} logged in{' '}
            <button onClick={handleLogout}>logout</button>
          </p>
          <Toggleable buttonLabel="create new blog" ref={noteFromRef}>
            <BlogForm createForm={createForm} />
          </Toggleable>

          {blogs
            .sort((a, b) => a.likes - b.likes)
            .map((blog) => (
              <Blog
                blog={blog}
                key={blog.id}
                user={user.user}
                likeBlog={likeBlog}
                removeBlog={removeBlog}
              />
            ))}
        </div>
      ) : (
        <Toggleable buttonLabel="login">
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            password={password}
            setPassword={setPassword}
            setUsername={setUsername}
          />
        </Toggleable>
      )}
    </div>
  );
};

export default App;
