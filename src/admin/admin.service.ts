import bookingSchema from "../bookings/booking.schema";

class AdminService {
  public async getTopSellers() {
    return bookingSchema.aggregate([
      {
        $group: {
          _id: "$sellerId",
          avgRating: { $avg: "$rating" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "seller",
        },
      },
      { $unwind: "$seller" },
      {
        $sort: { avgRating: -1 },
      },
      { $limit: 5 },
    ]);
  }

  public async getTopRatedListings() {
    return bookingSchema.aggregate([
      {
        $group: {
          _id: "$listingId",
          avgRating: { $avg: "$rating" },
        },
      },
      {
        $lookup: {
          from: "listings",
          localField: "_id",
          foreignField: "_id",
          as: "listing",
        },
      },
      { $unwind: "$listing" },
      {
        $sort: { avgRating: -1 },
      },
      { $limit: 5 },
    ]);
  }

  public async getTopBuyers() {
    return bookingSchema.aggregate([
      {
        $group: {
          _id: "$buyerId",
          orderCount: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "buyer",
        },
      },
      { $unwind: "$buyer" },
      {
        $sort: { orderCount: -1 },
      },
      { $limit: 5 },
    ]);
  }
}

export default new AdminService();
