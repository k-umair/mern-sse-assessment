import bookingSchema, { IBooking } from "./booking.schema";
import listingSchema from "../listings/listing.schema";

class BookingService {
  public async createBooking(
    buyerId: string,
    listingId: string
  ): Promise<IBooking> {
    const listing = await listingSchema.findById(listingId);
    if (!listing) {
      throw new Error("Listing not found");
    }
    if (listing.sellerId.toString() === buyerId) {
      throw new Error("Cannot book your own listing");
    }

    const newBooking = new bookingSchema({
      listingId,
      buyerId,
      status: "pending",
    });

    await newBooking.save();
    return newBooking;
  }

  public async rateOrder(
    buyerId: string,
    bookingId: string,
    rating: number,
    review: string | null
  ): Promise<IBooking | null> {
    const booking = await bookingSchema.findOne({ _id: bookingId, buyerId });
    if (!booking) {
      throw new Error(
        "Booking not found or you do not have permission to rate this order"
      );
    }

    if (booking.status !== "completed") {
      throw new Error("Order must be completed before rating");
    }

    booking.rating = rating;
    booking.review = review || "";
    await booking.save();

    return booking;
  }
}

export default new BookingService();
