import mongoose, { Document, Schema } from 'mongoose';

export interface Organization extends Document {
  name: string;
}

const OrganizationSchema = new Schema({
  name: { type: String, required: true }
});

export default mongoose.model<Organization>('Organization', OrganizationSchema);
