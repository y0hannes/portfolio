import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import projectServices from "../services/projectServices"

const ProjectDetail = ({ project }) => {
  const { admin } = useContext(AuthContext)

  const updateProject = async (event) => {
    event.preventDefault()
    try {
      await projectServices.update(project._id)
      alert('Project updatedd successfully!')
    } catch (error) {
      console.error('Upload failed:', error)
      alert('Update operation failed')
    }
  }

  const deleteProject = async (event) => {
    event.preventDefault()
    try {
      await projectServices.remove(project._id)
      alert('Project Deleted successfully!')
    } catch (error) {
      console.error('Delete failed:', error)
      alert('Delete operation failed')
    }
  }

  return (
    <div className="relative bg-gray-50 border border-gray-200 rounded-xl p-6 flex flex-col w-full max-w-sm shadow-sm transition-transform duration-300 hover:-translate-y-1">

      {/* Admin Edit/Delete Buttons */}
      {admin && (
        <div className="absolute top-3 right-3 flex gap-2 z-10">
          <button
            onClick={updateProject}
            className="text-gray-500 hover:text-blue-600 transition"
            title="Edit Project"
          >
            <i className="ri-pencil-line text-lg"></i>
          </button>
          <button
            onClick={deleteProject}
            className="text-gray-500 hover:text-red-600 transition"
            title="Delete Project"
          >
            <i className="ri-delete-bin-line text-lg"></i>
          </button>
        </div>
      )}

      <img
        src={project.imageUrl}
        alt={project.title}
        className="rounded-md mb-4 w-full h-auto"
      />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {project.title}
      </h3>
      <p className="text-sm text-gray-600 mb-4">{project.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag, i) => (
          <span
            key={i}
            className="bg-gray-200 text-gray-900 text-xs font-medium px-2.5 py-0.5 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex justify-between mt-auto">
        <a
          href={project.codeLink}
          className="inline-flex items-center gap-1 text-sm border border-gray-900 text-gray-900 px-4 py-2 rounded-md hover:bg-gray-100 transition"
        >
          <i className="ri-code-line"></i> Code
        </a>
        <a
          href={project.link}
          className="inline-flex items-center gap-1 text-sm bg-gray-900 text-gray-100 px-4 py-2 rounded-md hover:bg-gray-800 transition"
        >
          <i className="ri-external-link-line"></i>
          {project.isFinished ? "View" : "In Progress"}
        </a>
      </div>
    </div>
  )
}

export default ProjectDetail