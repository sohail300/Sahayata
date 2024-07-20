import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbURL = process.env.DB_URL;

export async function connectDB() {
  try {
    await mongoose.connect(dbURL as string);
    console.log("Database connected");
  } catch (err) {
    console.log("Error connecting to DB: " + err);
  }
}
