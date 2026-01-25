import mongoose, { Document, Schema } from 'mongoose';
import validator from 'validator';
import { Message as SharedMessage } from '@shared';

export interface IMessage extends Omit<SharedMessage, '_id'>, Document {}

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
  subject: {
    type: String,
    required: [true, 'Please provide subject.'],
  },
  content: {
    type: String,
    required: [true, 'Please provide a message.'],
  },
}, { timestamps: true })

export default mongoose.model<IMessage>('Message', messageSchema);
