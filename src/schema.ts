import { GraphQLList, GraphQLObjectType, GraphQLSchema } from "graphql";
import { AuthMutations } from "./auth/auth.resolver";
import UserType from "./users/user.graphql";

const rootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve: async () => {
        return [{ id: "1", username: "exampleUser" }];
      },
    },
  },
});

const rootMutation = new GraphQLObjectType({
  name: "RootMutation",
  fields: {
    ...AuthMutations,
  },
});

const schema = new GraphQLSchema({
  query: rootQuery,
  mutation: rootMutation,
});

export default schema;
