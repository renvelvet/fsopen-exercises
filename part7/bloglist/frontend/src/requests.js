import axios from 'axios'
import storageService from '../src/services/storage'

const baseUrl = 'http://localhost:3003/api/blogs'

const headers = {
  Authorization: storageService.loadUser()
    ? `Bearer ${storageService.loadUser().token}`
    : null,
}

export const getBlogs = () => axios.get(baseUrl).then((res) => res.data)

export const createNew = (newBlog) =>
  axios.post(baseUrl, newBlog, { headers }).then((res) => res.data)

export const updateLikes = (updatedBlog) =>
  axios
    .put(`${baseUrl}/${updatedBlog.id}`, updatedBlog, { headers })
    .then((res) => res.data)

export const removeBlog = (id) => axios.delete(`${baseUrl}/${id}`, { headers })
