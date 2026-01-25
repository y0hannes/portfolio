import mongoose, { Document, Schema } from 'mongoose';
import validator from 'validator';

export interface IProject extends Document {
  title: string;
  description: string;
  tags: string[];
  codeLink: string;
  isFinished: boolean;
  link?: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema: Schema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for the project.'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a project description.'],
  },
  tags: {
    type: [String],
    default: [],
  },
  codeLink: {
    type: String,
    required: [true, 'Please provide a link to the project code.'],
    validate: {
      validator: (val: string) => validator.isURL(val),
      message: 'Please provide a valid URL.',
    },
  },
  isFinished: {
    type: Boolean,
    required: true,
    default: false
  },
  link: {
    type: String,
    required: function (this: IProject) {
      return this.isFinished;
    },
    validate: {
      validator: (val: string) => validator.isURL(val),
      message: 'Please provide a valid URL.',
    },
  },
  imageUrl: {
    type: String,
    validate: {
      validator: (val: string) => !val || validator.isURL(val), // allow empty/null if optional
      message: 'Please provide a valid URL.',
    },
  },
}, { timestamps: true })

export default mongoose.model<IProject>('Project', projectSchema);
