import { useEffect, useState } from "react"
import projectServices from '../services/projectServices'
import ProjectDetail from "./ProjectDetail"

const Projects = () => {
  const [projects, setProjects] = useState([])
  useEffect(() => {
    const fetchAll = async () => {
      const response = await projectServices.getAll()
      setProjects(response)
    }
    fetchAll()
  }, [])

  return (
    <section
      id="projects"
      className="flex flex-col justify-center items-center py-20 px-4 bg-gray-50 min-h-screen"
    >
      <h2 className="text-3xl font-semibold mb-12 text-gray-900">
        Featured Projects
      </h2>

      <div className="flex flex-wrap justify-center gap-8 max-w-6xl mb-12">
        <ul>
          {projects.map((project, index) => (
            <li key={index}>
              <ProjectDetail project={project} />
            </li>
          ))}
        </ul>
      </div>

      <div className="text-center mb-8">
        <a
          href="#"
          className="inline-block border border-gray-900 text-gray-900 px-6 py-2 rounded-md hover:bg-gray-100 transition"
        >
          View All Projects
        </a>
      </div>

      <div className="text-center animate-bounce">
        <a href="#skills" className="text-3xl text-gray-700">
          <i className="ri-arrow-down-s-line"></i>
        </a>
      </div>
    </section >
  )
}

export default Projects