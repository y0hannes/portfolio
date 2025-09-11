import axios from 'axios'
const baseUrl = '/api/projects'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const remove = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

export default { getAll, create, remove }