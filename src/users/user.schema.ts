// Import necessary modules
import mongoose, { Schema, Document, Types } from "mongoose";
import { UserRoles } from "./enums/user-role.enum";

// Define the interface for User document
export interface IUser extends Document {
  email: string;
  username: string;
  password: string;
  isAdmin?: boolean;
  role?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Create a schema for the User model
const User: Schema<IUser> = new Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    role: { type: String, required: true, default: UserRoles.SELLER },
  },
  { timestamps: true }
);

// Create and export the User model
export default mongoose.model<IUser>("User", User);
