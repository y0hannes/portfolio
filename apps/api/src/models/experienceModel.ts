import mongoose, { Schema, Document } from 'mongoose';

export interface IExperience extends Document {
  role: string;
  company: string;
  period: string;
  description: string;
}

const experienceSchema: Schema = new Schema(
  {
    role: { type: String, required: true },
    company: { type: String, required: true },
    period: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true },
);

const Experience = mongoose.model<IExperience>('Experience', experienceSchema);

export default Experience;
