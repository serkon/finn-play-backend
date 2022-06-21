import { User } from '@/api/authorization/authentication.dtos';
import mongoose, { Model, Schema } from 'mongoose';

const schema: Schema<User> = new mongoose.Schema<User>({
  _id: { type: String, required: true },
  username: { type: String, required: true },
  name: { type: String, required: false },
  surname: { type: String, required: false },
  password: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, required: false },
});

export const UserModel: Model<User> = mongoose.model<User>('User', schema);
