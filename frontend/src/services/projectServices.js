import axios from 'axios'
import loginServices from './loginServices'

const API_URL = import.meta.env.VITE_API_URL;
const baseUrl = `${API_URL}/api/projects`

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (formData) => {
  const config = loginServices.config()
  const response = await axios.post(baseUrl, formData, config)
  return response.data
}

const update = async (id, formData) => {
  const config = loginServices.config()
  const response = await axios.put(`${baseUrl}/${id}`, formData, config)
  return response.data
}

const remove = async (id) => {
  const config = loginServices.config()
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, create, update, remove }