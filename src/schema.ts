import { GraphQLObjectType, GraphQLSchema } from "graphql";

import { AuthMutations } from "./auth/auth.resolver";
import { ListingMutations } from "./listings/listing.resolver";
import { UserQueries, UserMutations } from "./users/users.resolver";
import { BookingMutations } from "./bookings/booking.resolver";

const rootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    ...UserQueries,
  },
});

const rootMutation = new GraphQLObjectType({
  name: "RootMutation",
  fields: {
    ...AuthMutations,
    ...UserMutations,
    ...ListingMutations,
    ...BookingMutations,
  },
});

const schema = new GraphQLSchema({
  query: rootQuery,
  mutation: rootMutation,
});

export default schema;
