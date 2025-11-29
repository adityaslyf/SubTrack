import mongoose from 'mongoose';
import { DB_URI, NODE_ENV } from '../config/env.js';

if(!DB_URI) {
  throw new Error('DB_URI is not defined');
}

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log(`MongoDB connected to ${NODE_ENV} mode`);
  } catch (error) {
    console.log(`MongoDB connection error: ${error.message}`);
    throw error;
  }
};

export default connectDB;