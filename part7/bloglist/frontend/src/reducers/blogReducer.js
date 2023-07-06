import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const byLikes = (b1, b2) => b2.likes - b1.likes

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    addBlog(state, action) {
      return state.concat(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    replaceBlog(state, action) {
      const replaced = action.payload
      return state
        .map((item) => (item.id === replaced.id ? replaced : item))
        .sort(byLikes)
    },
    deleteBlog(state, action) {
      const deleted = action.payload
      return state.filter((item) => item.id !== deleted.id)
    },
  },
})

export const { addBlog, setBlogs, replaceBlog, deleteBlog } = blogSlice.actions
export default blogSlice.reducer

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    blogs.sort(byLikes)
    dispatch(setBlogs(blogs))
  }
}

export const createNew = (object) => {
  return async (dispatch) => {
    const blog = await blogService.create(object)
    dispatch(addBlog(blog))
  }
}

export const likeBlog = (blog) => {
  const toLike = { ...blog, likes: blog.likes + 1 }
  return async (dispatch) => {
    const likedBlog = await blogService.update(toLike)
    dispatch(replaceBlog(likedBlog))
  }
}

export const removeBlog = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog.id)
    dispatch(deleteBlog(blog))
  }
}
