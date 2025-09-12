const Message = require('../models/messageModel')
const mongoose = require('mongoose')

const getMessages = async (req, res) => {
  try {
    const messages = await Message.find()
    res.status(200).json(messages)
  }
  catch (err) {
    console.log(err)
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
    console.log(err)
    res.status(500).json({ err: 'Server error' })
  }
}

const deleteMessage = async (req, res) => {
  try {
    const id = req.params.id
    const message = await Message.findById(id)
    if (!message) {
      return res.status(404).json({ err: 'Message does not exist' })
    }
    await message.deleteOne()
    res.status(200).json({ msg: 'Message deleted successfully' })

  } catch (err) {
    console.log(err)
    res.status(500).json({ err: 'Server error' })
  }
}

module.exports = { getMessages, createMessage, deleteMessage }