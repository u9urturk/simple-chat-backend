import mongoose, { Document, Schema } from 'mongoose';
import { User } from '../user';

const userSchema = new Schema<User & Document>({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
});

const UserModel = mongoose.model<User & Document>('User', userSchema);

export default UserModel;
