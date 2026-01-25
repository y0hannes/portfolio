import mongoose, { Document, Schema } from 'mongoose';
import validator from 'validator';

export interface IMessage extends Document {
  name: string;
  email: string;
  subject: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

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
