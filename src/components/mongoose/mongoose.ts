import { UserModel } from '@/components/mongoose/model/user.model';
import mongoose from 'mongoose';

export const mongoose_connect = async () => {
  try {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost:27017');
    mongoose.connection.on('error', (err) => {
      console.log('Mongoose error :', err);
    });
    console.log('Connected to MongoDB');
    const user = await UserModel.findOne({ username: 'serkon' }).exec();
    console.log('Really connected: ', user);
  } catch (err) {
    console.log('Mongoose connection error', err);
  }
};
