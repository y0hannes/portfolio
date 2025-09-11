import React from "react"

const projects = [

  {
    title: "E-Commerce Platform",
    image: "#",
    alt: "E-Commerce Platform",
    description:
      "A full-stack e-commerce solution with React, Django. Features include user authentication, payment processing, and admin dashboard.",
    tags: ["React", "Django", "MongoDB", "Rest-framework"],
    codeLink: "#",
    liveLink: "#",
  },
  {
    title: "Real-estate listing App",
    image: "#",
    alt: "Real-estate listing App",
    description:
      "A real estate listing app that let buyers and sellers find their dream home",
    tags: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    codeLink: "#",
    liveLink: "#",
  },
  {
    title: "Telegram Bot",
    image: "#",
    alt: "A telegram Bot for getting news",
    description:
      "A Telegram bot that fetch real time news data and let the users access to current events and stories.",
    tags: ["Python", "TelegramBot"],
    codeLink: "#",
    liveLink: "#",
  },
]

const Projects = () => {
  return (
    <section
      id="projects"
      className="flex flex-col justify-center items-center py-20 px-4 bg-gray-50 min-h-screen"
    >
      <h2 className="text-3xl font-semibold mb-12 text-gray-900">
        Featured Projects
      </h2>

      <div className="flex flex-wrap justify-center gap-8 max-w-6xl mb-12">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-gray-50 border border-gray-200 rounded-xl p-6 flex flex-col w-full max-w-sm shadow-sm transition-transform duration-300 hover:-translate-y-1"
          >
            <img
              src={project.image}
              alt={project.alt}
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
                href={project.liveLink}
                className="inline-flex items-center gap-1 text-sm bg-gray-900 text-gray-100 px-4 py-2 rounded-md hover:bg-gray-800 transition"
              >
                <i className="ri-external-link-line"></i> In Progress
              </a>
            </div>
          </div>
        ))}
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
    </section>
  )
}

export default Projects