import mongoose, { Schema, Document, Model } from 'mongoose';

// Define TypeScript interface for User
export interface IUser extends Document {
  name: string;
  email: string;
  image?: string;
  provider: 'google' | 'github' | 'credentials';
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

// Define Mongoose schema
const UserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String },
    provider: { type: String, enum: ['google', 'github', 'credentials'], required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
  },
  { timestamps: true }
);

// Export the model (prevents re-declaring if already declared)
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;