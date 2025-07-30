const Message = require('../models/messageModel')
const mongoose = require('mongoose')

const getMessages = async (req, res) => {
  try {

    const messages = await Message.find()
    res.status(200).json({ messages })
  }
  catch (err) {
    console.log(err)
    res.status(500).json({err: 'Server error'})
  }
}

module.exports = getMessages