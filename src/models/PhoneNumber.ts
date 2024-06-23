import mongoose, { Document, Schema } from 'mongoose';

export interface PhoneNumber extends Document {
  number: string;
  allocatedTo: string | null;
}

const PhoneNumberSchema = new Schema({
  number: { type: String, required: true },
  allocatedTo: { type: String, default: null } // idPassport from the assigned user
});

export default mongoose.model<PhoneNumber>('PhoneNumber', PhoneNumberSchema);
