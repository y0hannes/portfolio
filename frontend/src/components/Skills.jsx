import React from "react"

const skillsData = [
  {
    category: "Frontend",
    tags: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "JavaScript",
      "HTML5",
      "CSS3",
    ],
  },
  {
    category: "Backend",
    tags: [
      "Node.js",
      "Express",
      "Python",
      "Django",
      "MongoDB",
      "REST APIs",
    ],
  },
  {
    category: "Tools & DevOps",
    tags: ["Git", "Docker", "Render", "Vite"],
  },
  {
    category: "Soft Skills",
    tags: [
      "Problem Solving",
      "Team Collaboration",
      "Project Management",
      "Code Review",
      // "Mentoring",
    ],
  },
]

const Skills = () => {
  return (
    <section
      id="skills"
      className="min-h-screen py-20 px-4 bg-gray-50 text-center"
    >
      <h2 className="text-3xl font-semibold text-gray-900 mb-12">
        Skills & Technologies
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {skillsData.map((skillCategory, index) => (
          <div
            key={index}
            className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-left shadow-sm"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {skillCategory.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {skillCategory.tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-gray-200 text-gray-900 text-sm font-medium px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills