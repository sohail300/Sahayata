import mongoose, { Schema } from "mongoose";

interface DistrictAdmin {
  name: string;
  email: string;
  password: string;
  number: string;
  latitude: number;
  longitude: number;
  forgotPasswordVerifyToken: string | null;
  forgotPasswordExpiryDate: Date | null;
}

// MongoDB Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  number: {
    type: String,
    require: true,
  },
  service_sid: {
    type: String,
  },
});

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  number: {
    type: String,
    require: true,
  },
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
  worker: [
    {
      profession: String,
      quantity: Number,
    },
  ],
  available: {
    type: Boolean,
    default: true,
  },
  EmergencyCases: [{ type: mongoose.Schema.Types.ObjectId, ref: "Emergency" }],
});

const districtSchema: Schema<DistrictAdmin> = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  number: {
    type: String,
    require: true,
  },
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
  forgotPasswordVerifyToken: {
    type: String,
    require: false,
  },
  forgotPasswordExpiryDate: {
    type: Date,
    require: false,
  },
});

const emergencySchema = new mongoose.Schema({
  name: String,
  number: String,
  latitude: Number,
  longitude: Number,
  cause: String,
  date: String,
  nearestCampId: String,
  solved: Boolean,
});

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  number: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  userId: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

// MongoDB Models
export const User = mongoose.model("User", userSchema);
export const Admin = mongoose.model("Admin", adminSchema);
export const District = mongoose.model("District", districtSchema);
export const Emergency = mongoose.model("Emergency", emergencySchema);
export const Contact = mongoose.model("Contact", contactSchema);
