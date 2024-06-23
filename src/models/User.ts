import mongoose, { Document, Schema } from 'mongoose';

export interface User extends Document {
  idPassport: string;
  name: string;
  surname: string;
  organizationId: string | null;
  phoneNumbers: mongoose.Types.ObjectId[]; // Array of ObjectId references to PhoneNumber
}

const UserSchema = new Schema({
  idPassport: { type: String, required: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  organizationId: { type: String, default: null },
  phoneNumbers: [{ type: Schema.Types.ObjectId, ref: 'PhoneNumber' }] // Reference to PhoneNumber
});

export default mongoose.model<User>('User', UserSchema);
