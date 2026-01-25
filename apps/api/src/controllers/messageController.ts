import { Request, Response, NextFunction } from 'express';
import Message from '../models/messageModel';

export const getMessages = async (req: Request, res: Response) => {
  try {
    const messages = await Message.find()
    res.status(200).json(messages)
  }
  catch (err) {
    res.status(500).json({ err: 'Server error' })
  }
}

export const createMessage = async (req: Request, res: Response) => {
  try {
    const { name, email, content } = req.body
    if (!name || !email || !content) {
      return res.status(400).json({ err: 'All fields should be field' })
    }
    const message = new Message({ name, email, content })
    await message.save()

    res.status(201).json({ msg: 'Message created' })
  } catch (err) {
    res.status(500).json({ err: 'Server error' })
  }
}

export const deleteMessage = async (req: Request, res: Response, next: NextFunction) => {
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