import mongoose, { Schema, Document } from "mongoose";

export interface IBooking extends Document {
  listingId: mongoose.Types.ObjectId;
  buyerId: mongoose.Types.ObjectId;
  status: string;
  rating: number | null;
  review: string | null;
}

const bookingSchema = new Schema<IBooking>(
  {
    listingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
      required: true,
    },
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: { type: String, default: "pending", required: true },
    rating: { type: Number, default: null },
    review: { type: String, default: null },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IBooking>("Booking", bookingSchema);
