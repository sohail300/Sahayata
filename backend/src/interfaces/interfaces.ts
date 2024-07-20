import mongoose from "mongoose";

export interface Jwt {
  id: mongoose.Types.ObjectId;
  role: string;
}
