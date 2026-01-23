import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL;
const baseUrl = `${API_URL}/api/login`

let token = null

const setToken = (newTtoken) => {
  token = `Bearer ${newTtoken}`
}

const config = () => {
  return {
    headers: {
      authorization: token,
      'Content-Type': 'multipart/form-data'
    }
  }
}

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login, setToken, config }