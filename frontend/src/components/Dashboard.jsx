import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import ProjectForm from './ProjectForm'
import ProjectList from './ProjectList'
import MessageList from './MessageList'

const Dashboard = () => {
  const { logout } = useContext(AuthContext)

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
      <ProjectForm />
      <ProjectList />
      {/* <MessageList /> */}
    </div>
  )
}

export default Dashboard
