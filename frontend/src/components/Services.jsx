import axios from 'axios'

const url = 'http://localhost:3000/api'

export const getMessages = () => axios.get(`${url}/messages`).then(response => response.data)

export const createMessage = async (newMessage) => {
  const request = axios.post(`${url}/messages`, newMessage)
  return request.then(response => response.data)
}

// export default { getMessages, createMessage }