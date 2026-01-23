import { useEffect, useState } from 'react'
import messageServices from '../services/messageServices'

const MessageList = () => {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    messageServices.getAll().then(data => setMessages(data))
  }, [])

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await messageServices.remove(id)
        setMessages(messages.filter(m => m._id !== id))
      } catch (error) {
        console.error('Delete failed:', error)
        alert('Delete failed')
      }
    }
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Messages</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="w-full bg-gray-100 text-left text-sm font-semibold text-gray-600">
              <th className="px-4 py-2">Sender</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Message</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.map(message => (
              <tr key={message._id} className="border-b border-gray-200">
                <td className="px-4 py-2">{message.name}</td>
                <td className="px-4 py-2">{message.email}</td>
                <td className="px-4 py-2">{message.content}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDelete(message._id)}
                    className="text-gray-500 hover:text-red-600 transition"
                    title="Delete message"
                  >
                    <i className="ri-delete-bin-line text-lg"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MessageList