import mongoose, { Schema, Document, Types } from "mongoose";

export interface IListing extends Document {
  title: string;
  description: string;
  price: number;
  status: string;
  sellerId: mongoose.Types.ObjectId;
}

const listingSchema = new Schema<IListing>(
  {
    title: { type: String, required: true },
    description: { type: String, required: false },
    price: { type: Number, required: true },
    status: { type: String, default: "active" },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IListing>("Listing", listingSchema);
