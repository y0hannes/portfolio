import { getMessages, createMessage } from "./Services"
import { useState } from "react"
const Form = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const newMessage = ({ name, email, subject, content })
    createMessage(newMessage)
      .then(response => {
        setName('')
        setEmail('')
        setSubject('')
        setContent('')
        alert('Message delivered ! ')
      })
      .catch(error => { alert("Error sending message") })
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Send a Message
      </h3>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Your Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
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
            value={content}
            onChange={(e) => setContent(e.target.value)}
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
  )
}

export default Form