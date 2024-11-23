import { GraphQLString } from "graphql";
import UserType from "./user.graphql";
import UserService from "./users.service";
import { IUser } from "./user.schema";
import { GraphQLContext } from "../types/express";

const UserQueries = {
  getUser: {
    type: UserType,
    resolve: async (parent: null, args: null, context: GraphQLContext) => {
      const userId = context?.user?._id;
      if (!userId) {
        throw new Error("Unauthorized");
      }
      return await UserService.getUser(userId);
    },
  },
};

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
      context: GraphQLContext
    ) => {
      const userId = context?.user?._id;
      if (!userId) {
        throw new Error("Unauthorized");
      }
      return await UserService.updateUser(userId, { username, email, role });
    },
  },

  deleteUser: {
    type: GraphQLString,
    resolve: async (parent: null, args: null, context: any) => {
      const userId = context?._id;
      const isAdmin = context?.isAdmin;

      if (!userId) {
        throw new Error("Unauthorized");
      }

      if (isAdmin) {
        throw new Error("Only admin is allowed to perform this operation.");
      }

      return await UserService.deleteUser(userId);
    },
  },
};

export { UserMutations, UserQueries };
