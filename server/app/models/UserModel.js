import mongoose from "mongoose";

const USER = new mongoose.Schema(
  {
    firstName: {
      type: String, // Corrected type
      required: true,
    },
    lastName: {
      type: String, // Corrected type
      required: true,
    },
    email: {
      type: String, // Corrected type
      required: true,
      unique: true,
    },
    username: {
      type: String, // Corrected type
      required: true,
      unique: true,
    },
    password: {
      type: String, // Corrected type
      required: true,
    },
    otp: {
      type: Number,
    },
    otpVerified: {
      type: Number,
      default: 0,
      enum: [0, 1],
    },
  },
  { timestamps: true, versionKey: false }
);

const USER_MODEL = mongoose.model("users", USER);
export default USER_MODEL;
