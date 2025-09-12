import { useEffect, useState } from 'react'
import projectServices from '../services/projectServices'
import EditProjectForm from './EditProjectForm'

const ProjectList = () => {
  const [projects, setProjects] = useState([])
  const [editingProject, setEditingProject] = useState(null)

  useEffect(() => {
    projectServices.getAll().then(data => setProjects(data))
  }, [])

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await projectServices.remove(id)
        setProjects(projects.filter(p => p._id !== id))
      } catch (error) {
        console.error('Delete failed:', error)
        alert('Delete failed')
      }
    }
  }

  const handleUpdate = (updatedProject) => {
    setProjects(projects.map(p => p._id === updatedProject._id ? updatedProject : p))
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Projects</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="w-full bg-gray-100 text-left text-sm font-semibold text-gray-600">
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(project => (
              <tr key={project._id} className="border-b border-gray-200">
                <td className="px-4 py-2">{project.title}</td>
                <td className="px-4 py-2">{project.description}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => setEditingProject(project)}
                    className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 transition mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editingProject && (
        <EditProjectForm
          project={editingProject}
          onClose={() => setEditingProject(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  )
}

export default ProjectList
