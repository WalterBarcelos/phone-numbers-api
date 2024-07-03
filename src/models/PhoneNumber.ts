import { Schema, model, Document } from 'mongoose';

export interface PhoneNumberDocument extends Document {
  number: string;
  allocatedTo: string | null;
}

const PhoneNumberSchema = new Schema({
  number: { type: String, required: true, unique: true },
  allocatedTo: { type: String, default: null }
});

export default model<PhoneNumberDocument>('PhoneNumber', PhoneNumberSchema);