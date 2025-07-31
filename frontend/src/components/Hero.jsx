import { Github, Linkedin, Mail, ArrowDown } from 'lucide-react';

const Hero = () => {
  return (
    <section className="h-screen flex flex-col justify-center items-center p-8 text-center bg-gray-50">
      <h1 className="text-5xl font-bold text-gray-900">Yohannes Muluken</h1>
      <h2 className="text-xl mt-3 text-gray-500">
        Full Stack Developer & Problem Solver
      </h2>
      <p className="mt-4 max-w-2xl mx-auto text-gray-500 text-base">
        I create digital experiences that combine beautiful design with robust
        functionality. Passionate about clean code, user experience, and
        innovative solutions.
      </p>

      <div className="mt-8 flex justify-center gap-4">
        <a
          href="#projects"
          className="py-3 px-6 rounded-lg font-semibold bg-gray-900 text-gray-100 hover:bg-gray-800 transition-colors"
        >
          View My Work
        </a>
        <a
          href="#contact"
          className="py-3 px-6 rounded-lg font-semibold bg-transparent border border-gray-300 text-gray-900 hover:bg-gray-100 transition-colors"
        >
          Get In Touch
        </a>
      </div>

      <div className="mt-8 flex justify-center gap-6 text-2xl">
        <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
          <Github size={24} />
        </a>
        <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
          <Linkedin size={24} />
        </a>
        <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
          <Mail size={24} />
        </a>
      </div>

      <div className="absolute bottom-10">
        <a href="#about" className="text-gray-500 hover:text-gray-800 animate-bounce">
          <ArrowDown size={24} />
        </a>
      </div>
    </section>
  )
}

export default Hero