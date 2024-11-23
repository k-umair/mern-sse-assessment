import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from "graphql";

import AuthService from "./auth.service";
import AuthResponseType from "./auth.graphql";

const AuthQueries = new GraphQLObjectType({
  name: "AuthQueryType",
  fields: {
    // We will add query here when needed
  },
});

const AuthMutations = {
  signUp: {
    type: AuthResponseType,
    args: {
      email: { type: GraphQLString },
      username: { type: GraphQLString },
      password: { type: GraphQLString },
    },
    resolve: async (
      parent: null,
      newUser: { email: string; username: string; password: string }
    ) => {
      return await AuthService.signUp(newUser);
    },
  },

  login: {
    type: AuthResponseType,
    args: {
      email: { type: GraphQLString },
      username: { type: GraphQLString },
      password: { type: GraphQLString },
    },
    resolve: async (
      parent: null,
      user: { email: string; username: string; password: string }
    ) => {
      return await AuthService.login(user);
    },
  },

  switchRole: {
    type: AuthResponseType,
    args: {
      token: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent: null, { token }: { token: string }) => {
      return await AuthService.switchRole(token);
    },
  },
};

export { AuthMutations, AuthQueries };
