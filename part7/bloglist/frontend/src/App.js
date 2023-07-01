import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'

import loginService from './services/login'
import storageService from './services/storage'

import LoginForm from './components/Login'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { reset, setNotification } from './reducers/notificationReducer'
import {
  createNew,
  initializeBlogs,
  likeBlog,
  removeBlog,
} from './reducers/blogReducer'

const App = () => {
  const [user, setUser] = useState('')
  const info = useSelector((state) => state.notification)
  const blogs = useSelector((state) => state.blog)
  const dispatch = useDispatch()

  const blogFormRef = useRef()

  useEffect(() => {
    const user = storageService.loadUser()
    setUser(user)
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const notifyWith = (message, type = 'info') => {
    dispatch(setNotification({ message, notifType: type }))

    setTimeout(() => {
      dispatch(reset())
    }, 3000)
  }

  const login = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      storageService.saveUser(user)
      notifyWith('welcome!')
    } catch (e) {
      notifyWith('wrong username or password', 'error')
    }
  }

  const logout = async () => {
    setUser(null)
    storageService.removeUser()
    notifyWith('logged out')
  }

  const createBlog = async (newBlog) => {
    dispatch(createNew(newBlog))
    notifyWith(`A new blog '${newBlog.title}' by '${newBlog.author}' added`)
    blogFormRef.current.toggleVisibility()
  }

  const like = async (blog) => {
    dispatch(likeBlog(blog))
    notifyWith(`A like for the blog '${blog.title}' by '${blog.author}'`)
  }

  const remove = async (blog) => {
    const ok = window.confirm(
      `Sure you want to remove '${blog.title}' by ${blog.author}`
    )
    if (ok) {
      dispatch(removeBlog(blog))
      notifyWith(`The blog' ${blog.title}' by '${blog.author} removed`)
    }
  }

  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification info={info} />
        <LoginForm login={login} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification info={info} />
      <div>
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </div>
      <Togglable buttonLabel="new post" ref={blogFormRef}>
        <NewBlog createBlog={createBlog} />
      </Togglable>
      <div>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            like={() => like(blog)}
            canRemove={user && blog.user.username === user.username}
            remove={() => remove(blog)}
          />
        ))}
      </div>
    </div>
  )
}

export default App
