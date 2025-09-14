const Message = require('../models/messageModel')
const mongoose = require('mongoose')

const getMessages = async (req, res) => {
  try {

    const messages = await Message.find()
    res.status(200).json(messages)
  }
  catch (err) {
    res.status(500).json({ err: 'Server error' })
  }
}

const createMessage = async (req, res) => {
  try {
    const { name, email, subject, content } = req.body
    if (!name || !email || !subject || !content) {
      return res.status(400).json({ err: 'All fields should be field' })
    }
    const message = new Message({ name, email, subject, content })
    await message.save()

    res.status(201).json({ msg: 'Message created' })
  } catch (err) {
    res.status(500).json({ err: 'Server error' })
  }
}

const deleteMessage = async (req, res, next) => {
  try {
    const { id } = req.params
    const message = await Message.findByIdAndDelete(id)
    if (!message) {
      return res.status(404).json({ err: 'Message does not exist' })
    }
    res.status(200).json({ msg: 'Message deleted' })
  }
  catch (err) {
    next(err)
    res.status(500).json({ err: 'Server error' })
  }
}

module.exports = { getMessages, createMessage, deleteMessage }