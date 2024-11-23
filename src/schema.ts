import { GraphQLObjectType, GraphQLSchema } from "graphql";

import { AuthMutations } from "./auth/auth.resolver";
import { UserQueries, UserMutations } from "./users/users.resolver";

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
  },
});

const schema = new GraphQLSchema({
  query: rootQuery,
  mutation: rootMutation,
});

export default schema;
