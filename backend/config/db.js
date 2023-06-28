import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Conntected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.messsage}`);
    process.exit(1);
  }
}

export default connectDB;