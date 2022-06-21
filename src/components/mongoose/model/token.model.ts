import { User } from '@/api/authorization/authentication.dtos';
import mongoose, { Model, Schema } from 'mongoose';

export interface TokenPayload {
  refreshToken: string;
  user: User;
}
const schema: Schema<TokenPayload> = new Schema({
  refreshToken: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
});

export const TokenModel: Model<TokenPayload> = mongoose.model('Token', schema);
