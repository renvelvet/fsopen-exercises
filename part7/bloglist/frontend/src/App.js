import { useEffect, useRef } from 'react'

import loginService from './services/login'
import storageService from './services/storage'

import Blog from './components/Blog'
import LoginForm from './components/Login'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import { useNotify } from './NotificationContext'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getBlogs, createNew, updateLikes, removeBlog } from './requests'
import { useLogin, useLogout, useUserContextValue } from './UserContext'

const App = () => {
  const user = useUserContextValue()
  const loginUser = useLogin()
  const logoutUser = useLogout()

  const queryClient = useQueryClient()
  const newBlogMutation = useMutation(createNew, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    },
  })
  const updateLikesMutation = useMutation(updateLikes, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    },
  })
  const deleteBlogMutation = useMutation(removeBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    },
  })

  const blogFormRef = useRef()

  useEffect(() => {
    loginUser(storageService.loadUser())
  }, [])

  const result = useQuery('blogs', getBlogs)

  const notifyWith = useNotify()

  const login = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })
      loginUser(user)
      storageService.saveUser(user)
      notifyWith({ message: 'welcome!' })
    } catch (e) {
      notifyWith({ message: 'wrong username or password', type: 'error' })
    }
  }

  const logout = async () => {
    logoutUser()
    storageService.removeUser()
    notifyWith({ message: 'logged out' })
  }

  const createBlog = async (newBlog) => {
    newBlogMutation.mutate(newBlog)
    notifyWith({
      message: `A new blog '${newBlog.title}' by '${newBlog.author}' added`,
    })
    blogFormRef.current.toggleVisibility()
  }

  const like = async (blog) => {
    const blogToUpdate = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    updateLikesMutation.mutate(blogToUpdate)
    notifyWith({
      message: `A like for the blog '${blog.title}' by '${blog.author}'`,
    })
  }

  const remove = async (blog) => {
    const ok = window.confirm(
      `Sure you want to remove '${blog.title}' by ${blog.author}`
    )
    if (ok) {
      deleteBlogMutation.mutate(blog.id)
      notifyWith({
        message: `The blog '${blog.title}' by '${blog.author}' removed`,
      })
    }
  }

  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
        <LoginForm login={login} />
      </div>
    )
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  const blogs = result.data

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </div>
      <Togglable buttonLabel="new post" ref={blogFormRef}>
        <NewBlog createBlog={createBlog} />
      </Togglable>
      <div>
        {!result.isLoading &&
          blogs
            .sort(byLikes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                like={() => like(blog)}
                canRemove={user && blog.user.username === user.username}
                remove={() => remove(blog)}
              />
            ))
         }
      </div>
    </div>
  )
}

export default App
