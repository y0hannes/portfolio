import { Code, Brush, Zap, ArrowDown } from 'lucide-react';

const About = () => {
  const currentYear = new Date().getFullYear()
  const years = currentYear - 2023
  return (
    <section id="about" className="min-h-screen flex flex-col justify-center items-center p-8 text-center bg-white">
      <h2 className="text-4xl font-bold text-gray-900 mb-12">About Me</h2>

      <div className="flex flex-wrap justify-center items-start gap-12 max-w-6xl mx-auto mb-12">
        <div className="flex-1 basis-96 max-w-xl text-gray-600 text-lg leading-relaxed text-left">
          <p className="mb-4">
            I'm a passionate developer with <span>{years}</span> years of experience creating web applications that solve real-world
            problems. I love turning complex challenges into simple, beautiful solutions.
          </p>
          <p className="mb-4">
            On my free time, you'll find me solving Data Structure and Algorithm problems, exploring new technologies,
            contributing to open-source projects, or sharing knowledge with the developer community.
          </p>
          <p>
            I believe in writing code that's not just functional, but also maintainable, scalable, and elegant.
          </p>
        </div>

        <div className="flex-1 basis-64 flex justify-center items-center">
          <div className="w-64 h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex justify-center items-center text-gray-400 text-xl">
            <img src="../public/photo.png" alt="Placeholder photo" />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
        <div className="flex-1 basis-64 bg-gray-50 border border-gray-200 rounded-xl p-8 text-center transition-transform duration-300 hover:-translate-y-1">
          <Code size={32} className="text-gray-900 mx-auto mb-4" />
          <h3 className="mb-2 text-xl font-semibold text-gray-900">Clean Code</h3>
          <p className="text-gray-600 text-base">Writing maintainable, scalable, and efficient code following best practices.</p>
        </div>
        <div className="flex-1 basis-64 bg-gray-50 border border-gray-200 rounded-xl p-8 text-center transition-transform duration-300 hover:-translate-y-1">
          <Brush size={32} className="text-gray-900 mx-auto mb-4" />
          <h3 className="mb-2 text-xl font-semibold text-gray-900">Design Focus</h3>
          <p className="text-gray-600 text-base">Creating beautiful, intuitive interfaces that enhance user experience.</p>
        </div>
        <div className="flex-1 basis-64 bg-gray-50 border border-gray-200 rounded-xl p-8 text-center transition-transform duration-300 hover:-translate-y-1">
          <Zap size={32} className="text-gray-900 mx-auto mb-4" />
          <h3 className="mb-2 text-xl font-semibold text-gray-900">Performance</h3>
          <p className="text-gray-600 text-base">Building fast, optimized applications that scale with your needs.</p>
        </div>
      </div>

      <div className="mt-12">
        <a href="#projects" className="text-gray-500 hover:text-gray-800 animate-bounce">
          <ArrowDown size={32} />
        </a>
      </div>
    </section>
  )
}

export default About