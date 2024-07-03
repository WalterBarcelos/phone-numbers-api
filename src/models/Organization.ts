import { Schema, model, Document } from 'mongoose';

export interface OrganizationDocument extends Document {
  name: string;
  description: string;
}

const OrganizationSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true }
});

export default model<OrganizationDocument>('Organization', OrganizationSchema);