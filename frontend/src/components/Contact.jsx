import Form from './Form'
import Info from './Info'

const Contact = () => {
  return (
    <section
      id="contact"
      className="min-h-screen py-20 px-6 bg-white flex flex-col items-center justify-center">
      <h2 className="text-3xl font-semibold text-gray-900 mb-12 text-center">
        Get In Touch
      </h2>

      <div className="grid md:grid-cols-2 gap-12 w-full max-w-6xl">
        < Info />
        < Form />
      </div>

      <footer className="text-center mt-16 text-sm text-gray-500">
        © 2025
      </footer>
    </section>
  )
}

export default Contact