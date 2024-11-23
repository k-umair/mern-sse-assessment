import { GraphQLObjectType, GraphQLSchema } from "graphql";

import { AuthMutations } from "./auth/auth.resolver";
import { AdminQueries } from "./admin/admin.resolver";
import { ListingMutations } from "./listings/listing.resolver";
import { BookingMutations } from "./bookings/booking.resolver";
import { UserQueries, UserMutations } from "./users/users.resolver";

const rootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    ...UserQueries,
    ...AdminQueries,
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
