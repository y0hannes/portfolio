import axios from 'axios'
import loginServices from './loginServices'
const baseUrl = '/api/messages'

const getAll = async () => {
  const config = loginServices.config()
  const response = await axios.get(baseUrl, config)
  return response.data
}

const remove = async (id) => {
  const config = loginServices.config()
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, remove }
