import mongoose, { Schema, Document } from 'mongoose';

export interface ICertificate extends Document {
  title: string;
  issuer: string;
  date: string;
  category: string;
  icon: string;
}

const certificateSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    issuer: { type: String, required: true },
    date: { type: String, required: true },
    category: { type: String, required: true },
    icon: { type: String, required: true, default: 'Award' },
  },
  { timestamps: true },
);

const Certificate = mongoose.model<ICertificate>(
  'Certificate',
  certificateSchema,
);

export default Certificate;
