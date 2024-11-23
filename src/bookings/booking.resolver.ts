// booking.resolver.ts
import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
} from "graphql";
import BookingType from "./booking.graphql";
import BookingService from "./booking.service";

const BookingMutations = {
  // Mutation for booking an order
  createBooking: {
    type: BookingType,
    args: {
      listingId: { type: GraphQLID },
    },
    resolve: async (
      parent: null,
      { listingId }: { listingId: string },
      context: any
    ) => {
      const buyerId = context.userId; // Assuming JWT has been decoded to get the buyerId
      if (!buyerId) {
        throw new Error("Unauthorized");
      }
      return await BookingService.createBooking(buyerId, listingId);
    },
  },

  // Mutation for rating a completed order
  rateOrder: {
    type: BookingType,
    args: {
      bookingId: { type: GraphQLID },
      rating: { type: GraphQLInt },
      review: { type: GraphQLString },
    },
    resolve: async (
      parent: null,
      {
        bookingId,
        rating,
        review,
      }: { bookingId: string; rating: number; review: string },
      context: any
    ) => {
      const buyerId = context.userId;
      if (!buyerId) {
        throw new Error("Unauthorized");
      }
      return await BookingService.rateOrder(buyerId, bookingId, rating, review);
    },
  },
};

export { BookingMutations };
