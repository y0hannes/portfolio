import { useState } from "react"
import projectServices from "../services/projectServices"

const EditProjectForm = ({ project, onClose, onUpdate }) => {

  const [title, setTitle] = useState(project.title)
  const [description, setDescription] = useState(project.description)
  const [codeLink, setCodeLink] = useState(project.codeLink)
  const [isFinished, setIsFinished] = useState(project.isFinished)
  const [link, setLink] = useState(project.link)
  const [tags, setTags] = useState(project.tags.join(', '))

  const handleSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('codeLink', codeLink)
    formData.append('isFinished', isFinished)
    formData.append('link', link)
    formData.append('tags', tags)
    if (event.target.image.files[0]) {
      formData.append('image', event.target.image.files[0])
    }

    try {
      const updatedProject = await projectServices.update(project._id, formData)
      onUpdate(updatedProject)
      onClose()
    } catch (error) {
      console.error('Update failed:', error)
      alert('Update failed')
    }
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="w-full max-w-sm p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
        <form className="space-y-4"
          encType="multipart/form-data"
          onSubmit={handleSubmit}>
          <h2 className="text-xl font-semibold text-gray-800">Edit Project</h2>

          <div className="flex flex-col">
            <label className="text-sm text-gray-700">Project title</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-700">Description</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-700">Code Link (Github, etc.)</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
              value={codeLink}
              onChange={(event) => setCodeLink(event.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-700">Tags (comma-separated)</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
              value={tags}
              onChange={(event) => setTags(event.target.value)}
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <label htmlFor="isFinished" className="text-sm text-gray-700">
              Is Finished
            </label>
            <input
              type="checkbox"
              id="isFinished"
              checked={isFinished}
              onChange={(event) => setIsFinished(event.target.checked)}
              className="h-4 w-4 text-gray-900 focus:ring-gray-900 border-gray-300 rounded"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-700">Link (if any)</label>
            <input
              type="link"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
              value={link}
              onChange={(event) => setLink(event.target.value)}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-700">Project Image</label>
            <input
              type="file"
              name='image'
              accept="image/*"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProjectForm
