const Hero = () => {
  return (
    <section
      className="h-screen flex flex-col justify-center items-center px-6 text-center"
      id="hero"
    >
      <h1 className="text-5xl font-bold text-gray-900">Yohannes Muluken</h1>
      <h2 className="text-lg text-gray-500 mt-3">
        Full Stack Developer & Problem Solver
      </h2>
      <p className="mt-4 max-w-xl text-gray-500 text-base mx-auto">
        I create digital experiences that combine beautiful design with robust
        functionality. Passionate about clean code, user experience, and
        innovative solutions.
      </p>

      <div className="mt-8 flex justify-center gap-4">
        <a
          href="#projects"
          className="px-6 py-3 bg-gray-900 text-gray-100 font-semibold rounded-md hover:bg-gray-800 transition"
        >
          View My Work
        </a>
        <a
          href="#contact"
          className="px-6 py-3 border border-gray-300 text-gray-900 font-semibold rounded-md hover:bg-gray-100 transition"
        >
          Get In Touch
        </a>
      </div>

      <div className="mt-8 text-2xl flex gap-4 text-gray-600">
        <a
          href="https://github.com/y0hannes/"
          className="hover:text-gray-900 transition"
          aria-label="GitHub"
        >
          <i className="ri-github-line"></i>
        </a>
        <a
          href="https://linkedin.com/in/yohannes-muluken/"
          className="hover:text-gray-900 transition"
          aria-label="LinkedIn"
        >
          <i className="ri-linkedin-box-line"></i>
        </a>
        <a
          href="mailto:your.email@example.com"
          className="hover:text-gray-900 transition"
          aria-label="Email"
        >
          <i className="ri-mail-line"></i>
        </a>
      </div>

      <div className="mt-8 text-3xl text-gray-400 animate-bounce">
        <a href="#about">
          <i className="ri-arrow-down-s-line"></i>
        </a>
      </div>
    </section>
  )
}

export default Hero