import { useEffect, useState } from "react"
import projectServices from "../services/projectServices"
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
      className="flex flex-col items-center py-20 px-4 bg-gray-50"
    >
      <h2 className="text-3xl font-semibold mb-12 text-gray-900">
        Featured Projects
      </h2>

      <div className="w-full max-w-7xl overflow-x-auto">
        <ul className="flex flex-nowrap gap-6 px-2">
          {projects.map((project, index) => (
            <li key={index} className="flex-shrink-0 w-80">
              <ProjectDetail project={project} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Projects