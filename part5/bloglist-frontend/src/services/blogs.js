import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (id, newChange) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(`${baseUrl}/${id}`, newChange, config)
  return response.data
}

const remove = (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then((response) => response)
}

export default { getAll, create, update, setToken, remove }
