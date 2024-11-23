import { GraphQLList } from "graphql";

import AdminService from "./admin.service";
import UserType from "../users/user.graphql";
import { GraphQLContext } from "../types/express";
import ListingType from "../listings/listing.graphql";

const AdminQueries = {
  topSellers: {
    type: new GraphQLList(UserType),
    resolve: async (parent: null, args: null, context: GraphQLContext) => {
      const userId = context?.user?._id;
      const isAdmin = context?.user?.isAdmin;

      if (!userId) {
        throw new Error("Unauthorized");
      }

      if (!isAdmin) {
        throw new Error("Unauthorized");
      }

      const topSellers = await AdminService.getTopSellers();
      return topSellers.map((seller: any) => seller.seller);
    },
  },

  topRatedListings: {
    type: new GraphQLList(ListingType),
    resolve: async (parent: null, args: null, context: GraphQLContext) => {
      const userId = context?.user?._id;
      const isAdmin = context?.user?.isAdmin;

      if (!userId) {
        throw new Error("Unauthorized");
      }

      if (!isAdmin) {
        throw new Error("Unauthorized");
      }

      const topListings = await AdminService.getTopRatedListings();
      return topListings.map((listing: any) => listing.listing);
    },
  },

  topBuyers: {
    type: new GraphQLList(UserType),
    resolve: async (parent: null, args: null, context: GraphQLContext) => {
      const userId = context?.user?._id;
      const isAdmin = context?.user?.isAdmin;

      if (!userId) {
        throw new Error("Unauthorized");
      }

      if (!isAdmin) {
        throw new Error("Unauthorized");
      }

      const topBuyers = await AdminService.getTopBuyers();
      return topBuyers.map((buyer: any) => buyer.buyer);
    },
  },
};

export { AdminQueries };
