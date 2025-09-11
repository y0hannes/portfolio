import { useState } from "react"
import loginServices from "../services/loginServices"

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const user = await loginServices.login({ username, password })
    loginServices.setToken(user.token)
    setUser(user)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <h2 className="text-xl font-semibold text-gray-800">Admin Login</h2>

          <div className="flex flex-col">
            <label className="text-sm text-gray-700">Username</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-gray-800 transition"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
