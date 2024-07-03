import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for User document
export interface UserDocument extends Document {
  idPassport: string;
  name: string;
  surname: string;
  organizationId: string | null;
  phoneNumber: string; //ObjectId references to PhoneNumber
}

// Define the schema for User
const UserSchema = new Schema({
  idPassport: { type: String, required: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  organizationId: { type: Schema.Types.ObjectId, ref: 'Organization', default: null },
  phoneNumber:  { type: String, required: true }
});

// Export the model with UserDocument interface
export default mongoose.model<UserDocument>('User', UserSchema);