
const Contact = () => {
  return (
    <section
      id="contact"
      className="min-h-screen py-20 px-6 bg-white flex flex-col items-center justify-center">
      <h2 className="text-3xl font-semibold text-gray-900 mb-12 text-center">
        Get In Touch
      </h2>

      <div className="grid md:grid-cols-2 gap-12 w-full max-w-6xl">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Let's Work Together
          </h3>
          <p className="text-gray-600 mb-6 max-w-md">
            I'm always interested in new opportunities and exciting projects.
            Whether you have a question or just want to say hi, I'll try my best
            to get back to you!
          </p>

          <ul className="text-gray-700 mb-6 space-y-4">
            <li className="flex items-center gap-3">
              <i className="ri-mail-line text-lg"></i>
              your.email@example.com
            </li>
            <li className="flex items-center gap-3">
              <i className="ri-phone-line text-lg"></i>
              +* (***) ***-****
            </li>
            <li className="flex items-centecenterr gap-3">
              <i className="ri-map-pin-line text-lg"></i>
              Addis Abeba, Ethiopia
            </li>
          </ul>

          <div className="flex gap-3">
            <a
              href="#"
              className="bg-gray-100 hover:bg-gray-200 p-2 rounded-md transition"
              aria-label="GitHub"
            >
              <i className="ri-github-line text-xl text-gray-700"></i>
            </a>
            <a
              href="#"
              className="bg-gray-100 hover:bg-gray-200 p-2 rounded-md transition"
              aria-label="LinkedIn"
            >
              <i className="ri-linkedin-box-line text-xl text-gray-700"></i>
            </a>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Send a Message
          </h3>

          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Your Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="your.email@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-1">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                placeholder="What's this about?"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                placeholder="Tell me about your project..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-gray-900"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-gray-800 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      <footer className="text-center mt-16 text-sm text-gray-500">
        © 2025
      </footer>
    </section>
  )
}

export default Contact