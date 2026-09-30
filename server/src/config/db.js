import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/todo_app';

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2000
    });
    isConnected = true;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (err) {
    isConnected = false;
    console.warn('⚠️ MongoDB connection could not be established. Operating in-memory mode.');
    console.warn(`Reason: ${err.message}`);
    return false;
  }
};

export const getDBStatus = () => isConnected;
