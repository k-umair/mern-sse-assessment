import { GraphQLString } from "graphql";
import UserType from "./user.graphql";
import UserService from "./users.service";

// Queries
const UserQueries = {
  getUser: {
    type: UserType,
    resolve: async (parent: null, args: null, context: any) => {
      const userId = context.userId;
      if (!userId) {
        throw new Error("Unauthorized");
      }
      return await UserService.getUser(userId);
    },
  },
};

// Mutations
const UserMutations = {
  updateUser: {
    type: UserType,
    args: {
      username: { type: GraphQLString },
      email: { type: GraphQLString },
      role: { type: GraphQLString },
    },
    resolve: async (
      parent: null,
      {
        username,
        email,
        role,
      }: { username: string; email: string; role: string },
      context: any
    ) => {
      const userId = context.userId; // Assuming userId is stored in context after auth
      if (!userId) {
        throw new Error("Unauthorized");
      }
      return await UserService.updateUser(userId, { username, email, role });
    },
  },

  // Only Admin user and the user himself can delete their account.
  deleteUser: {
    type: GraphQLString,
    resolve: async (parent: null, args: null, context: any) => {
      const userId = context.userId; // Assuming userId is stored in context after auth
      if (!userId) {
        throw new Error("Unauthorized");
      }
      return await UserService.deleteUser(userId);
    },
  },
};

export { UserMutations, UserQueries };
