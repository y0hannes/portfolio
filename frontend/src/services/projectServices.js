import axios from 'axios'
import loginServices from './loginServices'
const baseUrl = '/api/projects'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
const config = loginServices.config

const create = async (formData) => {
  const response = await axios.post(baseUrl, formData, config())
  return response.data
}

const remove = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

export default { getAll, create, remove }