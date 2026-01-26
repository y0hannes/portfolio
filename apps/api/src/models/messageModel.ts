import mongoose, { Document, Schema } from 'mongoose';
import validator from 'validator';
import { type Message } from '../../../types/Message';

export interface IMessage extends Omit<Message, '_id'>, Document {}

const messageSchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name.'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email address.'],
    validate: [(val: string) => val && validator.isEmail(val), 'Please provide a valid email address.'],
  },
  content: {
    type: String,
    required: [true, 'Please provide a message.'],
  },
}, { timestamps: true })

export default mongoose.model<IMessage>('Message', messageSchema);
