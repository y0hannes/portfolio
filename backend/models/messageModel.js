const mongoose = require('mongoose')
const validator = require('validator')

const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name.'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email address.'],
    validate: [validator.isEmail, 'Please provide a valid email address.'],
  },
  message: {
    type: String,
    required: [true, 'Please provide a message.'],
  },
}, { timestamps: true })

const Message = mongoose.model('Message', messageSchema)

module.exports = Message
