import axios from 'axios'
const baseUrl = 'api/login'

let token = null

const setToken = (newTtoken) => {
  token = `Bearer ${newTtoken}`
}

const config = () => {
  return {
    headers: {
      Authorization: token,
      'Content-Type': 'multipart/form-data'
    }
  }
}

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login, setToken, config }