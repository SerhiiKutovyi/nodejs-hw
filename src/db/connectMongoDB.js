import mongoose from 'mongoose';

export const connectMongoDB = async () => {
  try {
    const mongoUrl = process.env.MONGO_URL;
    await mongoose.connect(mongoUrl);
    console.log('✌️  Connected OK!');
  } catch (error) {
    console.log('❌ Error connecting!', error.message);
    process.exit(1);
  }
};
