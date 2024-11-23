import { GraphQLID, GraphQLString, GraphQLFloat } from "graphql";

import ListingType from "./listing.graphql";
import ListingService from "./listing.service";

const ListingMutations = {
  createListing: {
    type: ListingType,
    args: {
      title: { type: GraphQLString },
      description: { type: GraphQLString },
      price: { type: GraphQLFloat },
    },
    resolve: async (
      parent: null,
      {
        title,
        description,
        price,
      }: { title: string; description: string; price: number },
      context: any
    ) => {
      const sellerId = context.userId; // Assuming JWT has been decoded to get the sellerId
      if (!sellerId) {
        throw new Error("Unauthorized");
      }
      return await ListingService.createListing(sellerId, {
        title,
        description,
        price,
      });
    },
  },

  updateListing: {
    type: ListingType,
    args: {
      id: { type: GraphQLID },
      title: { type: GraphQLString },
      description: { type: GraphQLString },
      price: { type: GraphQLFloat },
    },
    resolve: async (
      parent: null,
      {
        id,
        title,
        description,
        price,
      }: { id: string; title: string; description: string; price: number },
      context: any
    ) => {
      const sellerId = context.userId;
      if (!sellerId) {
        throw new Error("Unauthorized");
      }
      return await ListingService.updateListing(id, sellerId, {
        title,
        description,
        price,
      });
    },
  },

  deleteListing: {
    type: GraphQLString,
    args: {
      id: { type: GraphQLID },
    },
    resolve: async (parent: null, { id }: { id: string }, context: any) => {
      const sellerId = context.userId;
      if (!sellerId) {
        throw new Error("Unauthorized");
      }
      return await ListingService.deleteListing(id, sellerId);
    },
  },

  markOrderCompleted: {
    type: ListingType,
    args: {
      id: { type: GraphQLID },
    },
    resolve: async (parent: null, { id }: { id: string }, context: any) => {
      const sellerId = context.userId;
      if (!sellerId) {
        throw new Error("Unauthorized");
      }
      return await ListingService.markOrderCompleted(id, sellerId);
    },
  },
};

export { ListingMutations };
