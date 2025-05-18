import mongoose from 'mongoose';

const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log('Mongodb already connect');
    return mongoose.connection.getClient();
  }

  const username = process.env.MONGO_USERNAME;
  const password = process.env.MONGO_PASSWORD;

  if (!username || !password) {
    throw new Error(
      'MONGO_USERNAME, MONGO_PASSWORD, or MONGO_DBNAME is not defined'
    );
  }

  const uri = `mongodb+srv://${username}:${password}@cluster0.sobp2no.mongodb.net/authentication?retryWrites=true&w=majority&appName=Cluster0`;

  try {
    const connection = await mongoose.connect(uri, {});
    console.log('MongoDB connected successfully');
    return connection.connection.getClient();
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

export default dbConnect;
